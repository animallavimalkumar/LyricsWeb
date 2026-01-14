import { executeQuery } from '../config/mysqlDb.js';

// Create a new song request
export async function createSongRequest(req, res) {
  try {
    const { songName, artist } = req.body;

    // Basic validation
    if (!songName || !artist) {
      return res.status(400).json({
        success: false,
        error: 'Song name and artist are required'
      });
    }

    const result = await executeQuery(
      'INSERT INTO song_requests (song_name, artist, status) VALUES (?, ?, ?)',
      [songName, artist, 'pending']
    );

    const songRequest = {
      id: result.insertId,
      song_name: songName,
      artist,
      status: 'pending',
      created_at: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Song request submitted successfully',
      data: songRequest,
    });
  } catch (error) {
    console.error('Error creating song request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit song request'
    });
  }
}

// Get all song requests
export async function getSongRequests(req, res) {
  try {
    const requests = await executeQuery(
      'SELECT * FROM song_requests ORDER BY created_at DESC'
    );

    res.status(200).json({
      success: true,
      message: 'Song requests retrieved successfully',
      data: requests,
    });
  } catch (error) {
    console.error('Error retrieving song requests:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve song requests'
    });
  }
}
