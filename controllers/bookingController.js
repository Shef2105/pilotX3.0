import pool from '../db/connection.js';
import { v4 as uuidv4 } from 'uuid';

// Create new booking
export const createBooking = async (req, res) => {
  const { vehicleId, startDate, endDate, totalAmount, paymentMethod } = req.body;
  const userId = req.user.id;
  
  if (!vehicleId || !startDate || !endDate || !totalAmount || !paymentMethod) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  try {
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Check if vehicle is available
      const [vehicles] = await connection.query(
        'SELECT * FROM veicoli WHERE id = ? AND stato = "disponibile"',
        [vehicleId]
      );
      
      if (vehicles.length === 0) {
        await connection.rollback();
        connection.release();
        return res.status(404).json({ message: 'Vehicle not found or not available' });
      }
      
      // Check if vehicle is already booked for the requested period
      const [existingBookings] = await connection.query(
        `SELECT * FROM prenotazioni 
         WHERE veicolo_id = ? 
         AND stato IN ('pending', 'confirmed') 
         AND ((data_inizio BETWEEN ? AND ?) 
         OR (data_fine BETWEEN ? AND ?) 
         OR (data_inizio <= ? AND data_fine >= ?))`,
        [vehicleId, startDate, endDate, startDate, endDate, startDate, endDate]
      );
      
      if (existingBookings.length > 0) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ message: 'Vehicle is not available for the selected dates' });
      }
      
      // Create booking
      const [bookingResult] = await connection.query(
        `INSERT INTO prenotazioni (utente_id, veicolo_id, data_inizio, data_fine, importo_totale, stato)
         VALUES (?, ?, ?, ?, ?, 'pending')`,
        [userId, vehicleId, startDate, endDate, totalAmount]
      );
      
      const bookingId = bookingResult.insertId;
      
      // Create payment record
      const transactionId = uuidv4();
      await connection.query(
        `INSERT INTO pagamenti (prenotazione_id, importo, metodo_pagamento, transazione_id, stato)
         VALUES (?, ?, ?, ?, 'pending')`,
        [bookingId, totalAmount, paymentMethod, transactionId]
      );
      
      // Update vehicle status
      await connection.query(
        'UPDATE veicoli SET stato = "prenotato" WHERE id = ?',
        [vehicleId]
      );
      
      // Commit transaction
      await connection.commit();
      connection.release();
      
      res.status(201).json({
        message: 'Booking created successfully',
        bookingId,
        transactionId
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};