CREATE DATABASE Kommunikationssystem;
USE Kommunikationssystem;

CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
    UNIQUE (username)
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomname VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  UNIQUE (roomname)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  senderId INT,
  roomId INT,
  content TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (senderId) REFERENCES users(id),
  FOREIGN KEY (roomId) REFERENCES rooms(id)
);

CREATE TABLE user_room (
  userId INT,
  roomId INT,
  PRIMARY KEY (userId, roomId),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (roomId) REFERENCES rooms(id)
);

