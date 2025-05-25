import bcrypt from 'bcrypt';
import pool from '../db/connection.js';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, nome, cognome, email, telefono, indirizzo, patente FROM users WHERE id = ?',
      [req.user.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = users[0];
    
    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        drivingLicense: user.driving_license,
        profileImage: user.profile_image
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { firstName, lastName, phone, address, drivingLicense } = req.body;
  
  try {
    // Update user in database
    await pool.query(
      'UPDATE utenti SET name = ?, cognome = ?, telefono = ?, indirizzo = ?, patente = ? WHERE id = ?',
      [firstName, lastName, phone, address, drivingLicense, req.user.id]
    );
    
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide current and new password' });
  }
  
  try {
    // Get user with password
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = users[0];
    
    // Verify current password
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password in database
    await pool.query('UPDATE utenti SET password_hash = ? WHERE id = ?', [hashedPassword, req.user.id]);
    
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const [bookings] = await pool.query(
      `SELECT b.id, b.data_inzio, b.data_fine, b.prezzi, b.stato,
      v.modello, v.marca, v.targa
      FROM prenotazioni b
      JOIN veicoli v ON b.veicoli_id = v.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};