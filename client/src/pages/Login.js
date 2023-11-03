import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../components/Navbar";
import './Login.css'
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log('login successful:', response.data);
    } catch (error) {
      console.log('login failed:', error);
    }
  }
  
    return (
      <Container className="login">
        <Navbar />
        <Row>
            <Col className="login-column">
                <h1 className="login-title">Log in</h1>
                <input className="login-username" type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"></input>
                <br />
                <input className="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"></input>
                <br />
                <input className="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
                <br />
                <button onClick={login}>Log in</button>
            </Col>
            <Col className="signup-column">
                <h1 className="signup-title">Dont have an account yet?</h1>
                <Link to={"/Signup"}>
                  <button>Create a new account</button>
                </Link>
            </Col>
        </Row>
      </Container>
    );
  }
  
  export default Login;