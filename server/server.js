const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3000;
const dotenv = require('dotenv'); 
dotenv.config();

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT)
  });

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
    connection.release();
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });