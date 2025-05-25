import pool from '../db/connection.js';

// Get all veicoli
export const getAllVehicles = async (req, res) => {
  try {
    const [veicoli] = await pool.query(
      `SELECT v.*, c.name as category_name 
       FROM veicoli v
       JOIN vehicle_categories c ON v.category_id = c.id
       WHERE v.status = 'available'
       ORDER BY v.hourly_rate ASC`
    );
    
    res.status(200).json({ veicoli });
  } catch (error) {
    console.error('Get all veicoli error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get vehicle by ID
export const getVehicleById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [veicoli] = await pool.query(
      `SELECT v.*, c.name as category_name 
       FROM veicoli v
       JOIN vehicle_categories c ON v.category_id = c.id
       WHERE v.id = ?`,
      [id]
    );
    
    if (veicoli.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    res.status(200).json({ vehicle: veicoli[0] });
  } catch (error) {
    console.error('Get vehicle by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get veicoli by category
export const getVehiclesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  
  try {
    const [veicoli] = await pool.query(
      `SELECT v.*, c.name as category_name 
       FROM veicoli v
       JOIN vehicle_categories c ON v.category_id = c.id
       WHERE v.category_id = ? AND v.status = 'available'
       ORDER BY v.hourly_rate ASC`,
      [categoryId]
    );
    
    res.status(200).json({ veicoli });
  } catch (error) {
    console.error('Get veicoli by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM vehicle_categories ORDER BY name ASC');
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Get all categories error:', error);
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
    const [veicoli] = await pool.query(
      'SELECT * FROM veicoli WHERE id = ? AND status = "available"',
      [vehicleId]
    );
    
    if (veicoli.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found or not available' });
    }
    
    // Check if vehicle is already booked for the requested period
    const [prenotazioni] = await pool.query(
      `SELECT * FROM prenotazioni 
       WHERE vehicle_id = ? 
       AND status IN ('pending', 'confirmed') 
       AND ((start_date BETWEEN ? AND ?) 
       OR (end_date BETWEEN ? AND ?) 
       OR (start_date <= ? AND end_date >= ?))`,
      [vehicleId, startDate, endDate, startDate, endDate, startDate, endDate]
    );
    
    if (prenotazioni.length > 0) {
      return res.status(400).json({ 
        available: false,
        message: 'Vehicle is not available for the selected dates' 
      });
    }
    
    // Calculate total price
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const durationHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
    const durationDays = durationHours / 24;
    
    let totalPrice;
    if (durationHours < 24) {
      totalPrice = veicoli[0].hourly_rate * durationHours;
    } else {
      totalPrice = veicoli[0].daily_rate * Math.ceil(durationDays);
    }
    
    res.status(200).json({
      available: true,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      vehicle: veicoli[0]
    });
  } catch (error) {
    console.error('Check vehicle availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};