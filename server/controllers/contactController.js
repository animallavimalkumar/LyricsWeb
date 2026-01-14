import pool from '../config/mysqlDb.js';

// Create a new contact message
export async function createContact(req, res) {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    const contact = {
      id: result.insertId,
      name,
      email,
      message,
      created_at: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact message'
    });
  }
}

// Get all contact messages
export async function getContacts(req, res) {
  try {
    const [contacts] = await pool.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    res.status(200).json({
      success: true,
      message: 'Contact messages retrieved successfully',
      data: contacts,
    });
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve contact messages'
    });
  }
}

// Get a single contact by ID
export async function getContactById(req, res) {
  try {
    const [contacts] = await pool.execute(
      'SELECT * FROM contacts WHERE id = ?',
      [req.params.id]
    );

    if (contacts.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contacts[0],
    });
  } catch (error) {
    console.error('Error retrieving contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve contact'
    });
  }
}

// Delete a contact
export async function deleteContact(req, res) {
  try {
    const [result] = await pool.execute(
      'DELETE FROM contacts WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact'
    });
  }
}
