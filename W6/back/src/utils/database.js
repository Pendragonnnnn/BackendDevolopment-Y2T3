import mysql from "mysql2/promise";
import dotenv from "dotenv";
 
dotenv.config();
 
// TODO
// Create the pool to connect to the database
// Use the database settings from the .env file

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// ... some query

// Close the pool
//await pool.end();

export { pool };
