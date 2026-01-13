import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, '../data/contacts.json');

// Ensure data file exists
async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2));
  }
}

// Create a new contact message
export async function createContact(req, res) {
  try {
    await ensureDataFile();
    const { name, email, message } = req.body;

    const contact = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    const data = await fs.readFile(dataFile, 'utf8');
    const contacts = JSON.parse(data);
    contacts.push(contact);

    await fs.writeFile(dataFile, JSON.stringify(contacts, null, 2));

    res.status(201).json({
      message: 'Contact message submitted successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to submit contact message' });
  }
}

// Get all contact messages
export async function getContacts(req, res) {
  try {
    await ensureDataFile();
    const data = await fs.readFile(dataFile, 'utf8');
    const contacts = JSON.parse(data);

    res.status(200).json({
      message: 'Contact messages retrieved successfully',
      data: contacts,
    });
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).json({ error: 'Failed to retrieve contact messages' });
  }
}
