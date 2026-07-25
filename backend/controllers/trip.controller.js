import { generateTripItinerary } from '../services/gemini.service.js';

/**
 * Controller to handle AI trip itinerary generation requests.
 * Route: POST /api/trips/generate
 */
export async function createTripItinerary(req, res) {
  try {
    const { destination, days, budget, travelStyle, interests, notes } = req.body;

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

    // 2. Execute AI Generation via Service Layer
    const itinerary = await generateTripItinerary({
      destination: destination.trim(),
      days: parsedDays,
      budget: budget.trim(),
      travelStyle: travelStyle.trim(),
      interests: Array.isArray(interests) ? interests : [interests],
      notes: typeof notes === 'string' ? notes.trim() : '',
    });

    // 3. Return Clean Success Payload
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
