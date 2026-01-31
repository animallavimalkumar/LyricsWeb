import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import pool from './config/mysqlDb.js';
import songRequestRoutes from './routes/songRequest.js';
import contactRoutes from './routes/contact.js';
import translateRoutes from './routes/translate.js';

dotenv.config();

// Database configuration for table creation
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Vimal@509',
  database: process.env.MYSQL_DATABASE || 'my_react_app',
  port: process.env.MYSQL_PORT || 3306,
};

// Function to create tables if they don't exist
async function createTablesIfNotExist() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL for table creation');

    // Check and create contacts table
    const [contactsTables] = await connection.execute("SHOW TABLES LIKE 'contacts'");
    if (contactsTables.length === 0) {
      await connection.execute(`
        CREATE TABLE contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Contacts table created');
    }

    // Check and create song_requests table
    const [songRequestTables] = await connection.execute("SHOW TABLES LIKE 'song_requests'");
    if (songRequestTables.length === 0) {
      await connection.execute(`
        CREATE TABLE song_requests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          song_name VARCHAR(255) NOT NULL,
          artist VARCHAR(255) NOT NULL,
          status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Song requests table created');
    }

    // Create indexes
    try {
      await connection.execute('CREATE INDEX idx_contacts_email ON contacts(email)');
    } catch (e) {}
    try {
      await connection.execute('CREATE INDEX idx_contacts_created_at ON contacts(created_at)');
    } catch (e) {}
    try {
      await connection.execute('CREATE INDEX idx_song_requests_status ON song_requests(status)');
    } catch (e) {}
    try {
      await connection.execute('CREATE INDEX idx_song_requests_created_at ON song_requests(created_at)');
    } catch (e) {}

    console.log('Database setup completed');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    if (connection) await connection.end();
  }
}

// Initialize database and connect
(async () => {
  try {
    await createTablesIfNotExist();
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
