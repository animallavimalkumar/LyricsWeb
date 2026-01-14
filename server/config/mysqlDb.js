import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// For Vercel serverless functions, we need to create connections per request
// instead of using a persistent pool
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Vimal@509',
  database: process.env.MYSQL_DATABASE || 'my_react_app',
  port: process.env.MYSQL_PORT || 3306,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create a connection pool for local development
let pool;

if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  // In production/serverless, we'll create connections per request
  pool = null;
} else {
  // In development, use connection pool
  pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

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
