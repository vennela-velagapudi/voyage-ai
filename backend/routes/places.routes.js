import { Router } from 'express';
import {
  searchPlaceController,
  getPlaceDetailsController,
  searchNearbyController,
  autocompleteController,
} from '../controllers/places.controller.js';

const router = Router();

// GET /api/places/autocomplete?input=...
router.get('/autocomplete', autocompleteController);

// GET /api/places/search?query=...&destination=...
router.get('/search', searchPlaceController);

// GET /api/places/nearby?lat=...&lng=...&category=...
router.get('/nearby', searchNearbyController);

// GET /api/places/details/:placeId
router.get('/details/:placeId', getPlaceDetailsController);

export default router;
