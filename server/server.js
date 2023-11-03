const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv'); 
const { connection } = require('mongoose');
dotenv.config();
const port = 3000;


  app.use(bodyParser.json());

  app.use(cors({
    origin : ["http://localhost:3001"],
    methods : ["GET", "POST", "DELETE"]
  }))

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT)
  })

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

  app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
  
    pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, results) => {
      if (err) {
        console.error('Error creating user: ' + err.stack);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      res.json({ success: true, message: 'User created successfully' });
    });
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (results.length > 0) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    });
  });
  
 