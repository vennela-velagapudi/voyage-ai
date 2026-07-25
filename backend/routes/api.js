import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import tripRoutes from './trip.routes.js';
import placesRoutes from './places.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', getHealth);

// Trip generation endpoints
router.use('/trips', tripRoutes);

// Google Places interactive location endpoints
router.use('/places', placesRoutes);

export default router;
