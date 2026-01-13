import express from 'express';
import { validateContact } from '../middleware/validation.js';
import { createContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

// POST - Submit a new contact message
router.post('/', validateContact, createContact);

// GET - Get all contact messages
router.get('/', getContacts);

export default router;
