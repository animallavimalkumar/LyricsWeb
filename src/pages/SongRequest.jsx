import { useState } from 'react';
import '../styles/SongRequest.css';

function SongRequest() {
  const [formData, setFormData] = useState({ songName: '', artist: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Get API base URL from environment variable or use relative path
  const apiBaseUrl = import.meta.env.VITE_API_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${apiBaseUrl}/api/song-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Song request submitted successfully!');
        setMessageType('success');
        setFormData({ songName: '', artist: '' });
      } else {
        setMessage(`Error: ${data.error}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`Failed to submit request: ${error.message}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="request-header">
        <h1>🎤 Request a Song</h1>
        <p className="request-subtitle">Can't find your favorite song? Request it here!</p>
      </div>

      <div className="request-container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="song-request-form">
            <div className="form-group">
              <label htmlFor="songName" className="form-label">
                <span className="label-icon">🎵</span>
                Song Name
              </label>
              <input
                id="songName"
                type="text"
                name="songName"
                placeholder="Enter the song name..."
                value={formData.songName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="artist" className="form-label">
                <span className="label-icon">🎤</span>
                Artist Name
              </label>
              <input
                id="artist"
                type="text"
                name="artist"
                placeholder="Enter the artist name..."
                value={formData.artist}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <span className="btn-icon">📤</span>
                  Submit Request
                </>
              )}
            </button>
          </form>

          {message && (
            <div className={`message-box ${messageType}`}>
              <span className="message-icon">
                {messageType === 'success' ? '✓' : '✗'}
              </span>
              <p className="message-text">{message}</p>
            </div>
          )}
        </div>

        <div className="request-info">
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h3>Quick Process</h3>
            <p>Your request will be reviewed and added soon</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🎵</div>
            <h3>Wide Library</h3>
            <p>Help us expand our collection of songs</p>
          </div>

          <div className="info-card">
            <div className="info-icon">❤️</div>
            <h3>Community Driven</h3>
            <p>Your feedback helps us improve</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongRequest;
