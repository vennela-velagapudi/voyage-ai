import { Router } from 'express';
import {
  createTripItinerary,
  replaceTripActivity,
  regenerateTripDay,
} from '../controllers/trip.controller.js';

const router = Router();

// POST /api/trips/generate - Create AI-powered itinerary
router.post('/generate', createTripItinerary);

// POST /api/trips/replace-activity - Replace a single activity
router.post('/replace-activity', replaceTripActivity);

// POST /api/trips/regenerate-day - Regenerate a single day schedule
router.post('/regenerate-day', regenerateTripDay);

export default router;
