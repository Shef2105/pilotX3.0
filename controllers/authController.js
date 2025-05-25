import bcrypt from 'bcrypt';
import pool from '../db/connection.js';
import { generateToken } from '../middleware/auth.js';

// Register new user
export const register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  try {
    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM utenti WHERE email = ?', [email]);
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert new user into database
    const [result] = await pool.query(
      'INSERT INTO utenti (name, cognome, email, telefono, passowrd) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, hashedPassword || null]
    );
    
    // Get the newly created user
    const [newUser] = await pool.query('SELECT id, nome, cognome, email, telefono FROM utenti WHERE id = ?', [result.insertId]);
    
    // Generate JWT token
    const token = generateToken(newUser[0]);
    
    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser[0].id,
        firstName: newUser[0].first_name,
        lastName: newUser[0].last_name,
        email: newUser[0].email
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  
  try {
    // Find user by email
    const [utenti] = await pool.query('SELECT * FROM utenti WHERE email = ?', [email]);
    
    if (utenti.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    const user = utenti[0];
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      console.log(await bcrypt.hash(password, 10));
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const [utenti] = await pool.query(
      'SELECT id, first_name, last_name, email, phone, address, profile_image FROM utenti WHERE id = ?',
      [req.user.id]
    );
    
    if (utenti.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = utenti[0];
    
    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profileImage: user.profile_image
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};