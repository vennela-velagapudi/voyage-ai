import {
  generateTripItinerary,
  generateAlternativeActivity,
  generateSingleDay,
} from '../services/gemini.service.js';
import { validateDestination } from '../services/places.service.js';
import { analyzeDestinationDuration } from '../services/destinationIntelligence.service.js';

/**
 * Controller to handle AI trip itinerary generation requests.
 * Route: POST /api/trips/generate
 */
export async function createTripItinerary(req, res) {
  try {
    const {
      destination,
      days,
      budget,
      travelStyle,
      interests,
      notes,
      forceGenerate,
      existingItinerary,
    } = req.body;

    // 1. Rigorous Request Validation
    if (!destination || typeof destination !== 'string' || destination.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error:
          'Invalid or missing "destination". Please provide a valid city or country name (min 2 characters).',
      });
    }

    const parsedDays = parseInt(days, 10);
    if (isNaN(parsedDays) || parsedDays < 1 || parsedDays > 60) {
      return res.status(400).json({
        success: false,
        error: 'Invalid "days" parameter. Please provide a trip duration between 1 and 60 days.',
      });
    }

    if (!budget || typeof budget !== 'string' || budget.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Missing required field "budget" (e.g., budget, moderate, luxury).',
      });
    }

    if (!travelStyle || typeof travelStyle !== 'string' || travelStyle.trim() === '') {
      return res.status(400).json({
        success: false,
        error:
          'Missing required field "travelStyle" (e.g., solo, couple, family, friends, business).',
      });
    }

    if (
      !interests ||
      (!Array.isArray(interests) && typeof interests !== 'string') ||
      (Array.isArray(interests) && interests.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        error:
          'Missing required field "interests". Must be a non-empty array or descriptive string of travel interests.',
      });
    }

    // 2. Strict Destination Validation via Google Places API BEFORE calling Gemini
    const validationResult = await validateDestination(destination.trim());
    if (!validationResult.valid) {
      return res.status(400).json({
        success: false,
        error:
          validationResult.error ||
          "We couldn't find this destination. Please enter a valid city, country, or tourist destination.",
      });
    }

    // 3. Destination Intelligence & Visit Duration Validation
    const durationAnalysis = analyzeDestinationDuration({
      place: validationResult.place,
      requestedDays: parsedDays,
      forceGenerate: Boolean(forceGenerate),
    });

    // If unrealistic duration is requested without manual continuation bypass, halt and return structured feedback
    if (!durationAnalysis.suitable && durationAnalysis.requiresConfirmation) {
      return res.status(422).json({
        success: false,
        requiresConfirmation: true,
        validationWarning: {
          destination:
            durationAnalysis.placeName ||
            validationResult.formattedDestination ||
            destination.trim(),
          placeCategory: durationAnalysis.placeCategory,
          requestedDays: durationAnalysis.requestedDays,
          recommendedDuration: durationAnalysis.recommendedDuration,
          message: durationAnalysis.message,
          suggestedDestination: durationAnalysis.suggestedDestination,
          suggestedDays: durationAnalysis.suggestedDays,
        },
      });
    }

    // 4. Execute AI Generation via Gemini Service Layer using validated destination and intelligent expansion instructions
    const itinerary = await generateTripItinerary({
      destination: validationResult.formattedDestination || destination.trim(),
      days: parsedDays,
      budget: budget.trim(),
      travelStyle: travelStyle.trim(),
      interests: Array.isArray(interests) ? interests : [interests],
      notes: typeof notes === 'string' ? notes.trim() : '',
      expansionNote: durationAnalysis.isExpanded ? durationAnalysis.expansionNote : null,
      placeCategory: durationAnalysis.placeCategory || 'Destination',
      existingItinerary,
    });

    if (validationResult.primaryPhoto) {
      itinerary.destinationImage = validationResult.primaryPhoto;
    }
    if (Array.isArray(validationResult.photos) && validationResult.photos.length > 0) {
      itinerary.destinationPhotos = validationResult.photos;
    }

    // 5. Return Clean Success Payload
    return res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    console.error('[Trip Controller Error]:', error.message);
    const status = error.statusCode || 500;
    return res.status(status).json({
      success: false,
      error: error.message || 'Internal server error while generating trip itinerary.',
    });
  }
}

/**
 * Controller to replace a single activity in an itinerary via AI.
 * Route: POST /api/trips/replace-activity
 */
export async function replaceTripActivity(req, res) {
  try {
    const { activity, destination, budget, travelStyle, interests, notes } = req.body;
    if (!activity || !destination) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields "activity" or "destination".',
      });
    }

    const newActivity = await generateAlternativeActivity({
      activity,
      destination,
      budget,
      travelStyle,
      interests,
      notes,
    });

    return res.status(200).json({
      success: true,
      activity: newActivity,
    });
  } catch (error) {
    console.error('[Replace Activity Error]:', error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Failed to replace activity.',
    });
  }
}

/**
 * Controller to regenerate a single day schedule in an itinerary via AI.
 * Route: POST /api/trips/regenerate-day
 */
export async function regenerateTripDay(req, res) {
  try {
    const {
      dayNumber,
      theme,
      destination,
      budget,
      travelStyle,
      interests,
      notes,
      existingDay,
      existingItinerary,
    } = req.body;
    if (!destination) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field "destination".',
      });
    }

    const newDay = await generateSingleDay({
      dayNumber: parseInt(dayNumber, 10) || 1,
      theme,
      destination,
      budget,
      travelStyle,
      interests,
      notes,
      existingDay,
      existingItinerary,
    });

    return res.status(200).json({
      success: true,
      day: newDay,
    });
  } catch (error) {
    console.error('[Regenerate Day Error]:', error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Failed to regenerate day schedule.',
    });
  }
}
