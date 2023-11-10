CREATE DATABASE Kommunikationssystem;
USE Kommunikationssystem;

CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (username, email, password)
VALUES 
('bob', 'bob@gmail.com', '1234'),
('john', 'john@gmai.com', '1122');

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(255),
    messages TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
)

INSERT INTO messages (user, messages)
VALUES
('bob', 'Hi i am Bob');
