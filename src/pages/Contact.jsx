import { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Message sent successfully! We\'ll get back to you soon.');
        setMessageType('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setMessage(`Error: ${data.error}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`Failed to send message: ${error.message}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="contact-header">
        <h1>📧 Contact Us</h1>
        <p className="contact-subtitle">We'd love to hear from you! Send us a message anytime.</p>
      </div>

      <div className="contact-container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name..."
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                <span className="label-icon">💬</span>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us what's on your mind..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                required
              ></textarea>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <span className="btn-icon">✉️</span>
                  Send Message
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

        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">💌</div>
            <h3>Email Us</h3>
            <p>support@lyrics.com</p>
            <a href="mailto:support@lyrics.com" className="contact-link">Send Email</a>
          </div>

          <div className="info-card">
            <div className="info-icon">📱</div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <a href="tel:+15551234567" className="contact-link">Call Now</a>
          </div>

          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Hours</h3>
            <p>Mon - Fri: 9AM - 6PM</p>
            <p style={{ margin: '5px 0 0 0' }}>Sat - Sun: 10AM - 4PM</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🌍</div>
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-icon" title="Facebook">f</a>
              <a href="#" className="social-icon" title="Twitter">𝕏</a>
              <a href="#" className="social-icon" title="Instagram">📷</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
