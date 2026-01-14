-- MySQL Database Setup Script for React App
-- Run this script in your MySQL server to create the database and tables

-- Create the database
CREATE DATABASE IF NOT EXISTS my_react_app;
USE my_react_app;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create song_requests table
CREATE TABLE IF NOT EXISTS song_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  song_name VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create indexes for better performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_song_requests_status ON song_requests(status);
CREATE INDEX idx_song_requests_created_at ON song_requests(created_at);

-- Show success message
SELECT 'Database and tables created successfully!' AS status;
