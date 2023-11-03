import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../components/Navbar";
import './Signup.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signup', { username, email, password });
      console.log('user created successfully:', response.data);
      navigate("/");
    } catch (error) {
      console.log('user creation failed:', error);
    }
  }
  
    return (
      <Container className="signup">
        <Navbar />
                <h1 className="signup-title">Signup</h1>
                <input className="signup-username" type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"></input>
                <br />
                <input className="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"></input>
                <br />
                <input className="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
                <br />
                <button onClick={createUser}>Signup</button>
      </Container>
    );
  }
  
  export default Signup;