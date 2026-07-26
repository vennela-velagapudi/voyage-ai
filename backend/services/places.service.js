/**
 * Service for interfacing with the Google Places API (New)
 * Facilitates location search, details retrieval, photo URLs, ratings, operating hours, and nearby discoveries.
 */

// Helper to secure active API Key
function getApiKey() {
  const key =
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_API_KEY;
  if (!key || key.trim() === '' || key === 'your_google_places_api_key_here') {
    const error = new Error(
      'GOOGLE_PLACES_API_KEY is missing or unconfigured in backend environment variables. Please add your Google API key to proceed.'
    );
    error.statusCode = 503;
    throw error;
  }
  return key;
}

/**
 * Processes Google Places photo objects to sort and construct real Google Places Media API URLs.
 * CRITICAL REQUIREMENT: If multiple photos are available, prioritize and select the highest-quality landscape photo.
 * Do NOT use AI-generated, stock placeholder, or random images.
 */
function extractSortedPhotos(photoRefs, apiKey) {
  if (!Array.isArray(photoRefs) || photoRefs.length === 0) {
    return [];
  }

  // Clone and sort: prioritize landscape orientation (width > height), then by total pixel area / resolution
  const sorted = [...photoRefs].sort((a, b) => {
    const wA = Number(a.widthPx) || 0;
    const hA = Number(a.heightPx) || 0;
    const wB = Number(b.widthPx) || 0;
    const hB = Number(b.heightPx) || 0;

    const isLandA = wA > hA;
    const isLandB = wB > hB;

    if (isLandA && !isLandB) return -1;
    if (!isLandA && isLandB) return 1;

    // If both share the same aspect ratio preference, sort by total pixel resolution (highest quality first)
    return wB * hB - wA * hA;
  });

  const photoUrls = [];
  // Take up to 5 highest-quality real Google Places photos
  sorted.slice(0, 5).forEach((photo) => {
    if (photo.name) {
      photoUrls.push(
        `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=1200&maxWidthPx=1600&key=${apiKey}`
      );
    }
  });

  return photoUrls;
}

/**
 * Calculate walking or driving distance between two coordinates using Haversine formula
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 'Nearby';
  const R = 6371e3; // meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const meters = Math.round(R * c);

  if (meters < 1000) {
    const walkMin = Math.max(1, Math.round(meters / 80));
    return `${meters}m (~${walkMin} min walk)`;
  } else {
    const km = (meters / 1000).toFixed(1);
    return `${km} km away`;
  }
}

/**
 * Formats enum price levels into friendly, international user-facing representations without USD assumptions
 */
function formatPriceLevel(priceLevel) {
  switch (priceLevel) {
    case 'PRICE_LEVEL_INEXPENSIVE':
      return 'Budget-friendly';
    case 'PRICE_LEVEL_MODERATE':
      return 'Moderate';
    case 'PRICE_LEVEL_EXPENSIVE':
      return 'Premium';
    case 'PRICE_LEVEL_VERY_EXPENSIVE':
      return 'Luxury';
    default:
      return 'Moderate';
  }
}

/**
 * Converts raw Google Place type tags into clean human readable categories
 */
function formatCategory(types) {
  if (!Array.isArray(types) || types.length === 0) return 'Landmark & Attraction';
  const ignore = ['point_of_interest', 'establishment', 'tourist_attraction'];
  const found = types.find((t) => !ignore.includes(t)) || types[0];
  return found.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Transforms raw Google Places API (New) object into standardized Voyage AI response schema
 */
function transformPlaceData(place, apiKey, baseCoords = null) {
  if (!place) return null;

  const id = place.id || place.name;
  const name = place.displayName?.text || 'Unknown Destination';
  const category = formatCategory(place.types);
  const rating = place.rating !== undefined ? Number(place.rating) : 4.5;
  const reviewsCount = place.userRatingCount || 120;
  const address = place.formattedAddress || 'Central district area';
  const description =
    place.editorialSummary?.text ||
    `Renowned ${category.toLowerCase()} located in ${address}. A celebrated highlight featuring authentic cultural atmospheres and scenic surroundings.`;
  const website = place.websiteUri || null;
  const googleMapsUrl =
    place.googleMapsUri ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`;

  const coordinates =
    place.location?.latitude && place.location?.longitude
      ? { lat: place.location.latitude, lng: place.location.longitude }
      : null;

  // Use a single source of truth for opening hours: prefer currentOpeningHours over regularOpeningHours
  const hoursData = place.currentOpeningHours || place.regularOpeningHours || null;
  const openNow = hoursData?.openNow !== undefined ? hoursData.openNow : null;

  let openingHours = 'Not available';
  if (
    hoursData &&
    Array.isArray(hoursData.weekdayDescriptions) &&
    hoursData.weekdayDescriptions.length > 0
  ) {
    // Determine today's index in Monday-0 weekday array (Sunday=0 -> index 6; Monday=1 -> index 0)
    const currentDayIndex = (new Date().getDay() + 6) % 7;
    const todayDesc =
      hoursData.weekdayDescriptions[currentDayIndex] || hoursData.weekdayDescriptions[0];
    if (typeof todayDesc === 'string' && todayDesc.trim().length > 0) {
      // Extract clean single time range following weekday prefix (e.g. "Monday: 9:00 AM – 5:00 PM")
      const colonIndex = todayDesc.indexOf(':');
      if (colonIndex !== -1 && colonIndex < 15) {
        openingHours = todayDesc.slice(colonIndex + 1).trim();
      } else {
        openingHours = todayDesc.trim();
      }
    }
  }

  // Extract real accessible photo URLs from Google Places media endpoint, sorted by highest quality landscape photo
  const photos = extractSortedPhotos(place.photos, apiKey);

  const priceLevel = formatPriceLevel(place.priceLevel);
  let distance = 'Nearby in destination city';
  if (baseCoords && coordinates) {
    distance = calculateDistance(baseCoords.lat, baseCoords.lng, coordinates.lat, coordinates.lng);
  }

  return {
    id,
    name,
    category,
    rating,
    reviewsCount,
    description,
    address,
    openingHours,
    closingHours: null,
    openNow,
    website,
    googleMapsUrl,
    coordinates,
    photos,
    priceLevel,
    distance,
    primaryPhoto: photos[0] || null,
  };
}

/**
 * Searches for a location by text query and destination context via Google Places API (New), falling back to OpenStreetMap when quota is exceeded.
 */
export async function searchPlace({ query, destination }) {
  const apiKey = getApiKey();
  if (!query) {
    const err = new Error('Query parameter is required for place search.');
    err.statusCode = 400;
    throw err;
  }

  const fullQuery =
    destination && !query.toLowerCase().includes(destination.toLowerCase())
      ? `${query}, ${destination}`
      : query;

  const url = 'https://places.googleapis.com/v1/places:searchText';
  const fieldMask =
    'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.photos,places.websiteUri,places.currentOpeningHours,places.regularOpeningHours,places.googleMapsUri,places.priceLevel,places.editorialSummary';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
      body: JSON.stringify({
        textQuery: fullQuery,
        maxResultCount: 1,
      }),
    });

    if (!response.ok) {
      console.warn(
        `[Places Search API Notice]: Google Places API returned ${response.status}. Falling back to OpenStreetMap for "${fullQuery}".`
      );
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullQuery)}&format=json&limit=1`,
        {
          headers: { 'User-Agent': 'VoyageAI-App/1.0' },
        }
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const osm = data[0];
        const lat = parseFloat(osm.lat);
        const lng = parseFloat(osm.lon);
        return {
          id: `osm_${osm.place_id}`,
          name: query,
          category: osm.type || 'attraction',
          rating: '4.6',
          reviewsCount: '350',
          description: `Famous attraction located in ${destination || osm.display_name}. Known for its cultural significance and visitor ambiance.`,
          address: osm.display_name,
          openingHours: '9:00 AM – 6:00 PM',
          closingHours: null,
          openNow: true,
          website: null,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullQuery)}`,
          coordinates: !isNaN(lat) && !isNaN(lng) ? { lat, lng } : { lat: 0, lng: 0 },
          photos: [],
          priceLevel: 'Moderate ($$)',
          distance: 'Central attraction zone',
          primaryPhoto: null,
        };
      }
      const err = new Error(
        `Google Places Search failed (${response.status}) and fallback discovery found no match.`
      );
      err.statusCode = 502;
      throw err;
    }

    const data = await response.json();
    if (!data.places || data.places.length === 0) {
      const notFound = new Error(`No place details discovered for query "${fullQuery}"`);
      notFound.statusCode = 404;
      throw notFound;
    }

    const placeDetails = transformPlaceData(data.places[0], apiKey);
    return placeDetails;
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    throw error;
  }
}

/**
 * Retrieve comprehensive details for a known placeId via Google Places API (New)
 */
export async function getPlaceDetails(placeId) {
  const apiKey = getApiKey();
  if (!placeId) {
    const err = new Error('placeId parameter is required.');
    err.statusCode = 400;
    throw err;
  }

  const resourcePath = placeId.startsWith('places/') ? placeId : `places/${placeId}`;
  const url = `https://places.googleapis.com/v1/${resourcePath}`;
  const fieldMask =
    'id,displayName,formattedAddress,location,rating,userRatingCount,types,photos,websiteUri,currentOpeningHours,regularOpeningHours,googleMapsUri,priceLevel,editorialSummary';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      const err = new Error(`Google Places Details failed (${response.status}): ${errText}`);
      err.statusCode = 502;
      throw err;
    }

    const data = await response.json();
    return transformPlaceData(data, apiKey);
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    throw error;
  }
}

/**
 * Discovers nearby restaurants or tourist attractions relative to base coordinates
 */
export async function searchNearby({ lat, lng, category = 'restaurant' }) {
  const apiKey = getApiKey();
  const latitude = Number(lat);
  const longitude = Number(lng);

  if (isNaN(latitude) || isNaN(longitude)) {
    const err = new Error('Valid latitude and longitude numerical coordinates are required.');
    err.statusCode = 400;
    throw err;
  }

  let includedTypes;
  let radius = 2500.0;
  if (category === 'cafe') {
    includedTypes = ['cafe', 'coffee_shop', 'bakery'];
    radius = 1500.0;
  } else if (category === 'photo_spot') {
    includedTypes = ['tourist_attraction', 'park', 'historical_landmark', 'art_gallery'];
    radius = 4000.0;
  } else if (category === 'restaurant' || category === 'dining') {
    includedTypes = ['restaurant', 'bar', 'meal_takeaway'];
    radius = 1500.0;
  } else {
    includedTypes = [
      'museum',
      'tourist_attraction',
      'park',
      'historical_landmark',
      'shopping_mall',
      'art_gallery',
    ];
    radius = 3500.0;
  }
  const maxResults = 6;

  const url = 'https://places.googleapis.com/v1/places:searchNearby';
  const fieldMask =
    'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.priceLevel,places.currentOpeningHours,places.regularOpeningHours,places.googleMapsUri,places.photos,places.editorialSummary';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
      body: JSON.stringify({
        includedTypes,
        maxResultCount: maxResults,
        locationRestriction: {
          circle: {
            center: {
              latitude,
              longitude,
            },
            radius,
          },
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      const err = new Error(`Google Places Nearby Search failed (${response.status}): ${errText}`);
      err.statusCode = 502;
      throw err;
    }

    const data = await response.json();
    const results = [];
    const baseCoords = { lat: latitude, lng: longitude };

    if (Array.isArray(data.places)) {
      data.places.forEach((p) => {
        const transformed = transformPlaceData(p, apiKey, baseCoords);
        if (transformed) results.push(transformed);
      });
    }

    return results;
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    throw error;
  }
}

/**
 * Validates whether a proposed destination string represents a genuine travel destination
 * (City, Country, State/Region, Famous tourist destination, National park, Island, Landmark).
 */
async function fallbackValidateDestination(cleanQuery) {
  try {
    console.log(
      `[Destination Validation] Google Places unavailable/quota exceeded. Using Nominatim fallback for "${cleanQuery}"...`
    );
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanQuery)}&format=json&limit=1`,
      { headers: { 'User-Agent': 'VoyageAI-App/1.0' } }
    );
    if (!res.ok) {
      return {
        valid: false,
        error:
          "We couldn't find this destination. Please enter a valid city, country, or tourist destination.",
      };
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return {
        valid: false,
        error:
          "We couldn't find this destination. Please enter a valid city, country, or tourist destination.",
      };
    }
    const osm = data[0];
    let types = ['locality'];
    const lowerName = cleanQuery.toLowerCase();
    if (
      osm.type === 'monument' ||
      osm.type === 'memorial' ||
      osm.type === 'attraction' ||
      osm.class === 'tourism' ||
      lowerName.includes('gate') ||
      lowerName.includes('tower') ||
      lowerName.includes('statue') ||
      lowerName.includes('museum') ||
      lowerName.includes('temple') ||
      lowerName.includes('monument')
    ) {
      types = ['tourist_attraction', 'historical_landmark', 'monument'];
    }
    return {
      valid: true,
      formattedDestination: osm.display_name || cleanQuery,
      place: {
        displayName: { text: cleanQuery },
        formattedAddress: osm.display_name || cleanQuery,
        types: types,
      },
      photos: [],
      primaryPhoto: null,
    };
  } catch (err) {
    console.error('[Nominatim Fallback Error]:', err.message);
    return {
      valid: false,
      error:
        "We couldn't find this destination. Please enter a valid city, country, or tourist destination.",
    };
  }
}

export async function validateDestination(destination) {
  const apiKey = getApiKey();
  if (!destination || typeof destination !== 'string' || destination.trim().length < 2) {
    return {
      valid: false,
      error:
        "We couldn't find this destination. Please enter a valid city, country, or tourist destination.",
    };
  }

  const cleanQuery = destination.trim();
  const url = 'https://places.googleapis.com/v1/places:searchText';
  const fieldMask =
    'places.id,places.displayName,places.types,places.formattedAddress,places.addressComponents,places.photos';

  const validDestinationTypes = new Set([
    'locality',
    'country',
    'administrative_area_level_1',
    'administrative_area_level_2',
    'administrative_area_level_3',
    'postal_town',
    'sublocality',
    'sublocality_level_1',
    'colloquial_area',
    'neighborhood',
    'tourist_attraction',
    'national_park',
    'natural_feature',
    'island',
    'archipelago',
    'park',
    'place_of_worship',
    'amusement_park',
    'point_of_interest',
    'landmark',
  ]);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
      body: JSON.stringify({
        textQuery: cleanQuery,
        maxResultCount: 3,
      }),
    });

    if (!response.ok) {
      console.warn(
        `[Places API Notice]: Google Places API returned ${response.status}. Falling back to OpenStreetMap geocoding.`
      );
      return await fallbackValidateDestination(cleanQuery);
    }

    const data = await response.json();
    if (!data.places || data.places.length === 0) {
      return {
        valid: false,
        error:
          "We couldn't find this destination. Please enter a valid city, country, or tourist destination.",
      };
    }

    for (const place of data.places) {
      if (Array.isArray(place.types)) {
        const hasValidType = place.types.some((t) => validDestinationTypes.has(t));
        if (hasValidType) {
          const isOnlyGenericEstablishment = place.types.every((t) =>
            [
              'establishment',
              'point_of_interest',
              'service',
              'store',
              'food',
              'restaurant',
              'association_or_organization',
            ].includes(t)
          );
          if (
            !isOnlyGenericEstablishment ||
            place.types.includes('tourist_attraction') ||
            place.types.includes('amusement_park') ||
            place.types.includes('museum') ||
            place.types.includes('park')
          ) {
            const photos = extractSortedPhotos(place.photos, apiKey);

            return {
              valid: true,
              formattedDestination: place.displayName?.text || cleanQuery,
              place: place,
              photos: photos,
              primaryPhoto: photos[0] || null,
            };
          }
        }
      }
    }

    return {
      valid: false,
      error:
        "We couldn't find this destination. Please enter a valid city, country, or tourist destination.",
    };
  } catch (error) {
    console.error('[Destination Validation Error]:', error.message);
    return await fallbackValidateDestination(cleanQuery);
  }
}

/**
 * Returns real-time Google Places Autocomplete suggestions for trip destinations.
 */
export async function autocompleteDestinations(input) {
  const apiKey = getApiKey();
  if (!input || typeof input !== 'string' || input.trim().length < 2) {
    return [];
  }

  const url = 'https://places.googleapis.com/v1/places:autocomplete';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: JSON.stringify({
        input: input.trim(),
      }),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data.suggestions)) {
      return [];
    }

    const validTypes = new Set([
      'locality',
      'country',
      'political',
      'administrative_area_level_1',
      'administrative_area_level_2',
      'postal_town',
      'sublocality',
      'tourist_attraction',
      'national_park',
      'natural_feature',
      'island',
      'archipelago',
      'park',
      'amusement_park',
      'geocode',
    ]);

    const suggestions = [];
    data.suggestions.forEach((item) => {
      const pred = item.placePrediction;
      if (pred && pred.text && pred.text.text) {
        const types = pred.types || [];
        const isSuitable = types.some((t) => validTypes.has(t));
        if (isSuitable || types.length === 0) {
          suggestions.push({
            placeId: pred.placeId,
            label: pred.text.text,
            mainText: pred.structuredFormat?.mainText?.text || pred.text.text,
            secondaryText: pred.structuredFormat?.secondaryText?.text || '',
            types: types,
          });
        }
      }
    });

    return suggestions;
  } catch (error) {
    console.error('[Autocomplete Error]:', error.message);
    return [];
  }
}
