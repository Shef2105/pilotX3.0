import express from 'express';
import { getUserProfile, updateUserProfile, changePassword, getUserBookings } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/change-password', changePassword);
router.get('/bookings', getUserBookings);

export default router;