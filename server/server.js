const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const port = 3000;
const saltRound = 10;

  app.use(bodyParser.json());

  app.use(cors({
    origin : ["http://localhost:3001"],
    methods : ["GET", "POST", "DELETE"],
    credentials: true,
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
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    bcrypt.hash(password, saltRound, (err, hash) => {
      if(err) {
        console.log(err)
      }
      pool.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, hash],
      (err, result) => {
        console.log(err);
      })
      res.json({ success: true, message: 'User created successfully' });
    })
  });

  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    pool.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (results.length > 0) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    });
  });



  
  
 