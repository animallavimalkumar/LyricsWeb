// Validate song request data
export function validateSongRequest(req, res, next) {
  const { songName, artist } = req.body;

  if (!songName || !songName.trim()) {
    return res.status(400).json({ error: 'Song name is required' });
  }

  if (!artist || !artist.trim()) {
    return res.status(400).json({ error: 'Artist name is required' });
  }

  if (songName.trim().length < 2) {
    return res.status(400).json({ error: 'Song name must be at least 2 characters' });
  }

  if (artist.trim().length < 2) {
    return res.status(400).json({ error: 'Artist name must be at least 2 characters' });
  }

  next();
}

// Validate contact data
export function validateContact(req, res, next) {
  const { name, email, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters' });
  }

  if (message.trim().length < 5) {
    return res.status(400).json({ error: 'Message must be at least 5 characters' });
  }

  next();
}
