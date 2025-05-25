import pool from '../db/connection.js';

// Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const [vehicles] = await pool.query(
      `SELECT v.*, c.name as category 
       FROM veicoli v
       LEFT JOIN vehicle_categories c ON v.categoria = c.id
       WHERE v.stato = 'disponibile'
       ORDER BY v.id ASC`
    );
    
    res.status(200).json({ vehicles });
  } catch (error) {
    console.error('Get all vehicles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get vehicle by ID
export const getVehicleById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [vehicles] = await pool.query(
      `SELECT v.*, c.name as category 
       FROM veicoli v
       LEFT JOIN vehicle_categories c ON v.categoria = c.id 
       WHERE v.id = ?`,
      [id]
    );
    
    if (vehicles.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    res.status(200).json({ vehicle: vehicles[0] });
  } catch (error) {
    console.error('Get vehicle by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check vehicle availability
export const checkVehicleAvailability = async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;
  
  if (!vehicleId || !startDate || !endDate) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  try {
    // Check if vehicle exists and is available
    const [vehicles] = await pool.query(
      'SELECT * FROM veicoli WHERE id = ? AND stato = "disponibile"',
      [vehicleId]
    );
    
    if (vehicles.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found or not available' });
    }
    
    // Check if vehicle is already booked for the requested period
    const [bookings] = await pool.query(
      `SELECT * FROM prenotazioni 
       WHERE veicolo_id = ? 
       AND stato IN ('pending', 'confirmed') 
       AND ((data_inizio BETWEEN ? AND ?) 
       OR (data_fine BETWEEN ? AND ?) 
       OR (data_inizio <= ? AND data_fine >= ?))`,
      [vehicleId, startDate, endDate, startDate, endDate, startDate, endDate]
    );
    
    if (bookings.length > 0) {
      return res.status(400).json({ 
        available: false,
        message: 'Vehicle is not available for the selected dates' 
      });
    }
    
    // Calculate total price
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const durationHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
    
    let totalPrice;
    if (durationHours < 24) {
      totalPrice = vehicles[0].tariffa_oraria * durationHours;
    } else {
      const durationDays = Math.ceil(durationHours / 24);
      totalPrice = vehicles[0].tariffa_giornaliera * durationDays;
    }
    
    res.status(200).json({
      available: true,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      vehicle: vehicles[0]
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};