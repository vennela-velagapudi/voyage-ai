import { Router } from 'express';
import { createTripItinerary } from '../controllers/trip.controller.js';

const router = Router();

// POST /api/trips/generate - Create AI-powered itinerary
router.post('/generate', createTripItinerary);

export default router;
