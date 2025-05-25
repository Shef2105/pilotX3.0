import express from 'express';
import { createBooking, getBookingDetails, cancelBooking } from '../controllers/bookingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', createBooking);
router.get('/:id', getBookingDetails);
router.put('/:id/cancel', cancelBooking);

export default router;