// Vercel Serverless Function for Contact API
// Uses MySQL database for persistent storage

import { executeQuery } from '../server/config/mysqlDb.js';

// Validate contact data
function validateContact(body) {
  const { name, email, message } = body;

  if (!name || !name.trim()) {
    return { valid: false, error: 'Name is required' };
  }

  if (!email || !email.trim()) {
    return { valid: false, error: 'Email is required' };
  }

  if (!message || !message.trim()) {
    return { valid: false, error: 'Message is required' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (message.trim().length < 5) {
    return { valid: false, error: 'Message must be at least 5 characters' };
  }

  return { valid: true };
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const validation = validateContact(req.body);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: validation.error
        });
      }

      const { name, email, message } = req.body;

      const result = await executeQuery(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name.trim(), email.trim(), message.trim()]
      );

      const contact = {
        id: result.insertId,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        created_at: new Date()
      };

      return res.status(201).json({
        success: true,
        message: 'Contact message submitted successfully',
        data: contact,
      });
    } catch (error) {
      console.error('Error creating contact:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to submit contact message'
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const contacts = await executeQuery(
        'SELECT * FROM contacts ORDER BY created_at DESC'
      );

      return res.status(200).json({
        success: true,
        message: 'Contact messages retrieved successfully',
        data: contacts,
      });
    } catch (error) {
      console.error('Error retrieving contacts:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve contact messages'
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
