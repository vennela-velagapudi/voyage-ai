import {
  searchPlace,
  getPlaceDetails,
  searchNearby,
  autocompleteDestinations,
} from '../services/places.service.js';

/**
 * GET /api/places/search?query=...&destination=...
 */
export async function searchPlaceController(req, res, next) {
  try {
    const { query, destination } = req.query;
    const result = await searchPlace({ query, destination });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/places/details/:placeId
 */
export async function getPlaceDetailsController(req, res, next) {
  try {
    const { placeId } = req.params;
    const result = await getPlaceDetails(placeId);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/places/nearby?lat=...&lng=...&category=...
 */
export async function searchNearbyController(req, res, next) {
  try {
    const { lat, lng, category } = req.query;
    const results = await searchNearby({ lat, lng, category });
    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/places/autocomplete?input=...
 */
export async function autocompleteController(req, res, next) {
  try {
    const { input } = req.query;
    const suggestions = await autocompleteDestinations(input);
    return res.status(200).json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    next(error);
  }
}
