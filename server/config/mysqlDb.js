import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration for persistent servers like Railway
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Vimal@509',
  database: process.env.MYSQL_DATABASE || 'my_react_app',
  port: process.env.MYSQL_PORT || 3306,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
  waitForConnections: true,
  connectionLimit: process.env.NODE_ENV === 'production' ? 20 : 10,
  queueLimit: 0
};

// Create a connection pool (always use pool for persistent servers)
const pool = mysql.createPool(dbConfig);

// Function to get a connection
export async function getConnection() {
  if (pool) {
    // Use pool in development
    return await pool.getConnection();
  } else {
    // Create new connection for serverless/production
    return await mysql.createConnection(dbConfig);
  }
}

// Function to execute queries with automatic connection management
export async function executeQuery(query, params = []) {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    if (connection && !pool) {
      // Close connection in serverless/production
      await connection.end();
    } else if (connection && pool) {
      // Release connection back to pool in development
      connection.release();
    }
  }
}

export default pool;
