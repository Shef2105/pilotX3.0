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
        'SELECT * FROM vehicles WHERE id = ? AND status = "available"',
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
         WHERE veicoli.id = ? 
         AND status IN ('attesa', 'conferma') 
         AND ((data_inizio BETWEEN ? AND ?) 
         OR (data_fine BETWEEN ? AND ?) 
         OR (data_inizio <= ? AND data_fine >= ?))`,
        [veicolo_id, data_inizio, data_fine, data_fine, data_fine, data_inizio, data_fine]
      );
      
      if (existingBookings.length > 0) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ message: 'Vehicle is not available for the selected dates' });
      }
      
      // Create booking
      const [bookingResult] = await connection.query(
        `INSERT INTO prenotazioni (utente_id, veicolo_id, data_inizio, data_fine, prezzi, stato)
         VALUES (?, ?, ?, ?, ?, 'confirmed')`,
        [userId, vehicleId, startDate, endDate, totalAmount]
      );
      
      const bookingId = bookingResult.insertId;
      
      // Create payment record
      const transactionId = uuidv4();
      await connection.query(
        `INSERT INTO payments (prenotazione_id, importo, metodo_pagamento, transazione, stato)
         VALUES (?, ?, ?, ?, 'completed')`,
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

// Get booking details
export const getBookingDetails = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  try {
    const [bookings] = await pool.query(
      `SELECT prenotazioni.*, v.modello, v.marca, v.targa 
       p.metodo_pagamento, p.transazioni, p.stato as payment_status
       FROM prenotazioni
       JOIN veicoli v ON prenotazioni.veicoli_id = v.id
       LEFT JOIN pagamenti p ON p.booking_id = b.id
       WHERE b.id = ? AND b.utente_id = ?`,
      [id, userId]
    );
    
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.status(200).json({ booking: bookings[0] });
  } catch (error) {
    console.error('Get booking details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  try {
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Check if booking exists and belongs to user
      const [bookings] = await connection.query(
        'SELECT * FROM prenotazioni WHERE id = ? AND utente_id = ?',
        [id, userId]
      );
      
      if (bookings.length === 0) {
        await connection.rollback();
        connection.release();
        return res.status(404).json({ message: 'Booking not found' });
      }
      
      const booking = bookings[0];
      
      // Check if booking can be canceled
      if (booking.status === 'completed' || booking.status === 'cancelled') {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ message: `Cannot cancel booking with status: ${booking.status}` });
      }
      
      // Update booking status
      await connection.query(
        'UPDATE prenotazioni SET stato = "cancelled" WHERE id = ?',
        [id]
      );
      
      // Update payment status
      await connection.query(
        'UPDATE pagamenti SET stato = "refunded" WHERE prenotazione_id = ?',
        [id]
      );
      
      // Update vehicle status
      await connection.query(
        'UPDATE veicoli SET stato = "disponibile" WHERE id = ?',
        [booking.veicoli_id]
      );
      
      // Commit transaction
      await connection.commit();
      connection.release();
      
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};