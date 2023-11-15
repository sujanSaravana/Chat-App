import React from "react";
import ErrorPopup from "../components/ErrorPopup";
import './Signup.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      if (!username || !email || !password) {
        setError('Please fill in all fields.');
        setShowErrorPopup(true);
        return;
      }

      const response = await axios.post('http://localhost:3000/signup', { username, email, password });
      console.log('user created successfully:', response.data);
      setTimeout(() => {
        navigate("/chat");
      }, 10);
    } catch (error) {
      console.log('user creation failed:', error);
      setError('User creation failed.'); 
      setShowErrorPopup(true);
    }
  }

  const closeErrorPopup = () => {
    console.log('close popup')
    setShowErrorPopup(false);
  }
  
    return (
      <div>
          <div classname="signup-column">
            <h1 className="signup-title">Signup</h1>
              <div className="signup-input">
                <input className="signup" type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"></input>
                <label for="signup-username" className="signup-label">Enter Username</label>
                <span className="signup-highlight"></span>
              </div>
              <div className="signup-input">
                <input className="signup" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"></input>
                <label for="signup-email" className="signup-label">Enter Email</label>
                <span className="signup-highlight"></span>
              </div>
              <div className="signup-input">
                <input className="signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
                <label for="signup-password" className="signup-label">Enter Password</label>
                <span className="signup-highlight"></span>
              </div>
              <div className="signup-btn-container">
                <button onClick={createUser} className="signup-btn">Signup</button>
              </div>
              <div>
                {showErrorPopup && <ErrorPopup message={error} onClose={closeErrorPopup} />}
              </div>
          </div>
      </div>
    );
  }
  
  export default Signup;