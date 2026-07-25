import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import tripRoutes from './trip.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', getHealth);

// Trip generation endpoints
router.use('/trips', tripRoutes);

export default router;
