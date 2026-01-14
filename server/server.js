import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/mysqlDb.js';
import songRequestRoutes from './routes/songRequest.js';
import contactRoutes from './routes/contact.js';
import translateRoutes from './routes/translate.js';

dotenv.config();

// Connect to MySQL
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Connected');
    connection.release();
  } catch (error) {
    console.error('MySQL Connection Error:', error);
  }
})();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/song-request', songRequestRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/translate', translateRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Ensure we always send JSON response with proper status
  if (res.headersSent) {
    return next(err);
  }
  
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!',
    details: err.message 
  });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
