import express from 'express';
import { 
  getAllVehicles,
  getVehicleById,
  getVehiclesByCategory,
  getAllCategories,
  checkVehicleAvailability
} from '../controllers/vehicleController.js';

const router = express.Router();

// Public routes
router.get('/', getAllVehicles);
router.get('/categories', getAllCategories);
router.get('/category/:categoryId', getVehiclesByCategory);
router.get('/:id', getVehicleById);
router.post('/check-availability', checkVehicleAvailability);

export default router;