/**
 * Modular service for Destination Intelligence and Trip Duration Validation.
 * Allows easy configuration and addition of destination categories, visit duration limits, and replacement suggestions.
 */

// Modular rule definitions for destination categorization and recommended visit durations
export const DESTINATION_CATEGORY_RULES = {
  // Broad geographical destinations (cities, countries, islands) where extended trips are natural
  country_region: {
    priority: 1,
    types: ['country', 'administrative_area_level_1', 'political', 'colloquial_area'],
    label: 'Country / Region',
    maxRecommendedDays: 60,
    typicalDuration: 'multiple days to several weeks',
  },
  island: {
    priority: 2,
    types: ['island', 'archipelago'],
    label: 'Island / Coastal Region',
    maxRecommendedDays: 21,
    typicalDuration: '3 to 10 days',
  },
  city: {
    priority: 3,
    types: [
      'locality',
      'postal_town',
      'sublocality',
      'sublocality_level_1',
      'administrative_area_level_2',
      'administrative_area_level_3',
      'neighborhood',
    ],
    label: 'City / Urban District',
    maxRecommendedDays: 30,
    typicalDuration: '2 to 7 days or more',
  },

  // Specific landmarks, venues, and attractions with bounded typical visit times
  national_park: {
    priority: 4,
    types: ['national_park', 'campground', 'hiking_area', 'natural_feature'],
    label: 'National Park / Natural Reserve',
    maxRecommendedDays: 7,
    typicalDuration: '1 to 4 days',
  },
  theme_park: {
    priority: 5,
    types: ['amusement_park', 'water_park', 'theme_park'],
    label: 'Theme Park & Resort',
    maxRecommendedDays: 3,
    typicalDuration: '1 to 2 days',
  },
  museum_art: {
    priority: 6,
    types: ['museum', 'art_gallery', 'cultural_center', 'library'],
    label: 'Museum / Gallery',
    maxRecommendedDays: 1,
    typicalDuration: 'a few hours to half a day',
  },
  temple_worship: {
    priority: 7,
    types: ['place_of_worship', 'hindu_temple', 'church', 'mosque', 'synagogue', 'shrine'],
    label: 'Temple / Place of Worship',
    maxRecommendedDays: 1,
    typicalDuration: '1 to 3 hours',
  },
  restaurant_dining: {
    priority: 8,
    types: ['restaurant', 'cafe', 'bakery', 'bar', 'food', 'night_club'],
    label: 'Restaurant / Dining Experience',
    maxRecommendedDays: 1,
    typicalDuration: '2 to 3 hours',
  },
  shopping_market: {
    priority: 9,
    types: ['shopping_mall', 'market', 'store', 'department_store'],
    label: 'Shopping Area / Market',
    maxRecommendedDays: 1,
    typicalDuration: 'a few hours',
  },
  monument_landmark: {
    priority: 10,
    types: [
      'monument',
      'historical_landmark',
      'landmark',
      'tourist_attraction',
      'point_of_interest',
      'establishment',
    ],
    label: 'landmark',
    maxRecommendedDays: 1,
    typicalDuration: 'a few hours',
  },
};

/**
 * Determines the primary place category and duration rule based on Google Places types array
 */
export function determineCategoryAndRule(types = []) {
  if (!Array.isArray(types) || types.length === 0) {
    return DESTINATION_CATEGORY_RULES.monument_landmark;
  }

  const sortedKeys = Object.keys(DESTINATION_CATEGORY_RULES).sort(
    (a, b) => DESTINATION_CATEGORY_RULES[a].priority - DESTINATION_CATEGORY_RULES[b].priority
  );

  for (const key of sortedKeys) {
    const rule = DESTINATION_CATEGORY_RULES[key];
    if (types.some((t) => rule.types.includes(t))) {
      return rule;
    }
  }

  return DESTINATION_CATEGORY_RULES.monument_landmark;
}

/**
 * Extracts a suitable broader destination (e.g. City or Region) from Google Places address components
 */
export function extractSuggestedCity(place) {
  if (!place) return null;

  const currentName = place.displayName?.text?.trim() || '';

  // Extract city/locality from addressComponents
  if (Array.isArray(place.addressComponents)) {
    const cityComp = place.addressComponents.find((comp) => {
      const types = comp.types || [];
      return (
        types.includes('locality') ||
        types.includes('postal_town') ||
        types.includes('administrative_area_level_2')
      );
    });
    if (
      cityComp &&
      cityComp.longText &&
      cityComp.longText.toLowerCase() !== currentName.toLowerCase()
    ) {
      let suggested = cityComp.longText;
      // Friendly alias mapping for popular metro areas (e.g., New Delhi -> Delhi, New York -> New York City)
      if (suggested.toLowerCase() === 'new delhi' && currentName.toLowerCase().includes('gate')) {
        suggested = 'Delhi';
      } else if (
        suggested.toLowerCase() === 'new york' &&
        currentName.toLowerCase().includes('liberty')
      ) {
        suggested = 'New York City';
      }
      return suggested;
    }
  }

  // Fallback parsing from formattedAddress if addressComponents is incomplete
  if (place.formattedAddress) {
    const parts = place.formattedAddress
      .split(',')
      .map((p) => p.trim())
      .filter(
        (p) => p.toLowerCase() !== currentName.toLowerCase() && p.length > 2 && !/^\d+$/.test(p)
      );
    if (parts.length >= 2) {
      let candidate = parts[parts.length - 2];
      // Strip postal codes if mixed with city names
      candidate = candidate.replace(/\b\d+\b/g, '').trim();
      if (candidate && candidate.length > 2) return candidate;
    }
  }

  return null;
}

/**
 * Evaluates requested trip duration against intelligent place rules and returns structural guidance or approval
 */
export function analyzeDestinationDuration({ place, requestedDays, forceGenerate = false }) {
  const days = parseInt(requestedDays, 10) || 1;
  const placeName = place?.displayName?.text || 'Selected destination';
  const types = place?.types || [];

  const rule = determineCategoryAndRule(types);
  const isUnrealistic = days > rule.maxRecommendedDays;

  // Case 1: Unrealistic duration requested and user has not elected to bypass
  if (isUnrealistic && !forceGenerate) {
    const suggestedCity = extractSuggestedCity(place);
    const categoryName = rule.label === 'landmark' ? 'a landmark' : `a ${rule.label.toLowerCase()}`;
    const explanation = `${placeName} is ${categoryName} typically visited in ${rule.typicalDuration}. A ${days}-day itinerary is not suitable.`;

    return {
      suitable: false,
      requiresConfirmation: true,
      placeName,
      placeCategory: rule.label,
      recommendedDuration: rule.typicalDuration,
      requestedDays: days,
      message: explanation,
      suggestedDestination: suggestedCity,
      suggestedDays: rule.maxRecommendedDays,
    };
  }

  // Case 2: Duration is realistic OR user explicitly chose "Continue anyway"
  let expansionNote = null;
  if (isUnrealistic && forceGenerate) {
    expansionNote = `Note: ${placeName} is typically visited in ${rule.typicalDuration}. This itinerary has been thoughtfully expanded beyond the destination's typical visit duration to encompass surrounding cultural highlights, local dining, and regional attractions over ${days} days.`;
  }

  return {
    suitable: true,
    placeName,
    placeCategory: rule.label,
    isExpanded: Boolean(expansionNote),
    expansionNote,
  };
}
