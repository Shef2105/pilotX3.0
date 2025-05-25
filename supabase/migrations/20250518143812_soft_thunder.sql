-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS pilotx_db;

-- Use database
USE pilotx_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  driving_license VARCHAR(100),
  profile_image VARCHAR(255) DEFAULT 'default-profile.jpg',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create vehicle_categories table
CREATE TABLE IF NOT EXISTS vehicle_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  model VARCHAR(100) NOT NULL,
  make VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  color VARCHAR(50) NOT NULL,
  license_plate VARCHAR(20) NOT NULL UNIQUE,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  daily_rate DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) DEFAULT 'default-car.jpg',
  status ENUM('available', 'booked', 'maintenance') DEFAULT 'available',
  description TEXT,
  features TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES vehicle_categories(id) ON DELETE SET NULL
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(100),
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Insert sample vehicle categories
INSERT INTO vehicle_categories (name, description) VALUES
('Economy', 'Fuel-efficient compact cars perfect for city driving'),
('SUV', 'Spacious vehicles with higher ground clearance for versatile driving conditions'),
('Luxury', 'Premium vehicles with advanced features and superior comfort'),
('Electric', 'Environment-friendly electric vehicles with zero emissions');

-- Insert sample vehicles
INSERT INTO vehicles (category_id, model, make, year, color, license_plate, hourly_rate, daily_rate, image, status, description, features) VALUES
(1, 'Corolla', 'Toyota', 2022, 'Silver', 'ABC123', 10.99, 49.99, 'toyota-corolla.jpg', 'available', 'Reliable and fuel-efficient compact sedan', 'Bluetooth, Backup Camera, USB Ports'),
(2, 'RAV4', 'Toyota', 2021, 'Blue', 'DEF456', 15.99, 69.99, 'toyota-rav4.jpg', 'available', 'Versatile SUV with ample cargo space', 'All-Wheel Drive, Lane Departure Warning, Adaptive Cruise Control'),
(3, 'S-Class', 'Mercedes-Benz', 2023, 'Black', 'GHI789', 29.99, 149.99, 'mercedes-sclass.jpg', 'available', 'Luxurious sedan with premium features', 'Leather Seats, Premium Sound System, Advanced Safety Features'),
(4, 'Model 3', 'Tesla', 2022, 'White', 'JKL012', 19.99, 89.99, 'tesla-model3.jpg', 'available', 'High-performance electric vehicle with impressive range', 'Autopilot, All-Glass Roof, 15" Touchscreen');