import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../components/Navbar";
import './Login.css'
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from '../components/Usercontext';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log('login successful:', response.data);
      login();
      setTimeout(() => {
        navigate("/chat");
      }, 5000)
    } catch (error) {
      console.log('login failed:', error);
    }
  }
  
    return (
      <Container>
        <Navbar />
        <Row>
            <Col className="login-column">
                <h1 className="login-title">Log in</h1>
                  <div className="login-input">
                    <input className="login" type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"></input>
                    <label for="login-username" className="login-label">Enter Username</label>
                    <span class="login-highlight"></span>
                  </div>
                  <div className="login-input">
                    <input className="login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
                    <label for="login-username" className="login-label">Enter Password</label>
                    <span class="login-highlight"></span>
                  </div>
                  <div className="login-btn-container">
                    <button onClick={handlelogin} className="login-btn">Log in</button>
                  </div>
            </Col>
            <Col className="signup-column">
                <h1 className="signup-title">Don't have an account yet?</h1>
                <Link to={"/Signup"}>
                  <button>Create a new account</button>
                </Link>
            </Col>
        </Row>
      </Container>
    );
  }
  
  export default Login;