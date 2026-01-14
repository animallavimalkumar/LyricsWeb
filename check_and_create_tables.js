import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Vimal@509',
  database: process.env.MYSQL_DATABASE || 'my_react_app',
  port: process.env.MYSQL_PORT || 3306,
};

async function checkAndCreateTables() {
  let connection;

  try {
    // Connect to MySQL
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    // Check if contacts table exists
    const [contactsTables] = await connection.execute(
      "SHOW TABLES LIKE 'contacts'"
    );

    if (contactsTables.length === 0) {
      console.log('Creating contacts table...');
      await connection.execute(`
        CREATE TABLE contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Contacts table created successfully');
    } else {
      console.log('Contacts table already exists');
    }

    // Check if song_requests table exists
    const [songRequestTables] = await connection.execute(
      "SHOW TABLES LIKE 'song_requests'"
    );

    if (songRequestTables.length === 0) {
      console.log('Creating song_requests table...');
      await connection.execute(`
        CREATE TABLE song_requests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          song_name VARCHAR(255) NOT NULL,
          artist VARCHAR(255) NOT NULL,
          status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Song requests table created successfully');
    } else {
      console.log('Song requests table already exists');
    }

    // Create indexes if they don't exist
    try {
      await connection.execute('CREATE INDEX idx_contacts_email ON contacts(email)');
      console.log('Index on contacts.email created');
    } catch (error) {
      if (!error.message.includes('Duplicate key name')) {
        console.log('Index on contacts.email already exists or error:', error.message);
      }
    }

    try {
      await connection.execute('CREATE INDEX idx_contacts_created_at ON contacts(created_at)');
      console.log('Index on contacts.created_at created');
    } catch (error) {
      if (!error.message.includes('Duplicate key name')) {
        console.log('Index on contacts.created_at already exists or error:', error.message);
      }
    }

    try {
      await connection.execute('CREATE INDEX idx_song_requests_status ON song_requests(status)');
      console.log('Index on song_requests.status created');
    } catch (error) {
      if (!error.message.includes('Duplicate key name')) {
        console.log('Index on song_requests.status already exists or error:', error.message);
      }
    }

    try {
      await connection.execute('CREATE INDEX idx_song_requests_created_at ON song_requests(created_at)');
      console.log('Index on song_requests.created_at created');
    } catch (error) {
      if (!error.message.includes('Duplicate key name')) {
        console.log('Index on song_requests.created_at already exists or error:', error.message);
      }
    }

    console.log('Database setup completed successfully!');

  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the setup
checkAndCreateTables();
