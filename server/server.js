const express = require('express');
const app = express();
const http = require('http');
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
    console.log('Connected to database');
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

    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const user = results[0];
  
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          console.error('Error during password comparison:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (!isValid) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.json({ success: true, message: 'Login successful' , userId: user.id});
      })
    });
  });

  app.post("/room", (req, res) => {
    const roomname = req.body.room;

    pool.execute("INSERT INTO rooms (roomname) VALUES (?)", [roomname],
    (err, result) => {
      if (err) {
        console.log('Error creating room:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error'});
        return;
      }
      const roomId = result.insertId;
      console.log('Room created successfully. Room ID:', roomId);
    res.json({ success: true, message: 'Room created successfully', roomId });
    })
  })



  
  
 