// Vercel Serverless Function for Song Request API
// Note: In serverless environment, we can't use file system for persistent storage
// This implementation uses in-memory storage for demo purposes
// For production, use a database like MongoDB, PostgreSQL, or Vercel KV

let songRequests = [];

// Validate song request data
function validateSongRequest(body) {
  const { songName, artist } = body;

  if (!songName || !songName.trim()) {
    return { valid: false, error: 'Song name is required' };
  }

  if (!artist || !artist.trim()) {
    return { valid: false, error: 'Artist name is required' };
  }

  if (songName.trim().length < 2) {
    return { valid: false, error: 'Song name must be at least 2 characters' };
  }

  if (artist.trim().length < 2) {
    return { valid: false, error: 'Artist name must be at least 2 characters' };
  }

  return { valid: true };
}

export default function handler(req, res) {
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
      const validation = validateSongRequest(req.body);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
      }

      const { songName, artist } = req.body;

      const songRequest = {
        id: Date.now(),
        songName: songName.trim(),
        artist: artist.trim(),
        createdAt: new Date().toISOString(),
      };

      songRequests.push(songRequest);

      return res.status(201).json({
        message: 'Song request submitted successfully',
        data: songRequest,
      });
    } catch (error) {
      console.error('Error creating song request:', error);
      return res.status(500).json({ error: 'Failed to submit song request' });
    }
  }

  if (req.method === 'GET') {
    try {
      return res.status(200).json({
        message: 'Song requests retrieved successfully',
        data: songRequests,
      });
    } catch (error) {
      console.error('Error retrieving song requests:', error);
      return res.status(500).json({ error: 'Failed to retrieve song requests' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
