import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, '../data/songRequests.json');

// Ensure data file exists
async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2));
  }
}

// Create a new song request
export async function createSongRequest(req, res) {
  try {
    await ensureDataFile();
    const { songName, artist } = req.body;

    const songRequest = {
      id: Date.now(),
      songName,
      artist,
      createdAt: new Date().toISOString(),
    };

    const data = await fs.readFile(dataFile, 'utf8');
    const requests = JSON.parse(data);
    requests.push(songRequest);

    await fs.writeFile(dataFile, JSON.stringify(requests, null, 2));

    res.status(201).json({
      message: 'Song request submitted successfully',
      data: songRequest,
    });
  } catch (error) {
    console.error('Error creating song request:', error);
    res.status(500).json({ error: 'Failed to submit song request' });
  }
}

// Get all song requests
export async function getSongRequests(req, res) {
  try {
    await ensureDataFile();
    const data = await fs.readFile(dataFile, 'utf8');
    const requests = JSON.parse(data);

    res.status(200).json({
      message: 'Song requests retrieved successfully',
      data: requests,
    });
  } catch (error) {
    console.error('Error retrieving song requests:', error);
    res.status(500).json({ error: 'Failed to retrieve song requests' });
  }
}
