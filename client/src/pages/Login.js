import './Login.css'
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from '../components/Usercontext';
import ErrorPopup from "../components/ErrorPopup";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      if (!username || !password){
        setError('Please fil in all fieds')
        setShowErrorPopup(true);
        return;
      }
      const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log('login successful:', response.data);
      login();
      setTimeout(() => {
        navigate("/chat");
      }, 10)
    } catch (error) {
      console.log('login failed:', error);
      setError('login failed');
      setShowErrorPopup(true);
    }
  }

  const closeErrorPopup = () => {
    console.log('close popup')
    setShowErrorPopup(false);
  }
  
    return (
      <div>
        <div className="login-column">
         <h1 className="login-title">Log in</h1>
          <div className="login-input">
            <input className="login" type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"></input>
            <label for="login-username" className="login-label">Enter Username</label>
            <span class="login-highlight"></span>
          </div>
          <div className="login-input">
            <input className="login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
            <label for="login-password" className="login-label">Enter Password</label>
            <span class="login-highlight"></span>
          </div>
          <div className="login-btn-container">
            <button onClick={handlelogin} className="login-btn">Log in</button>
          </div>
        </div>
        <div className="signup-column">
          <h1 className="signup-title">Don't have an account yet?</h1>
            <Link to={"/Signup"}>
              <div className="signup-btn-container">
              <button className="signup-btn">Create a new account</button>
              </div>
            </Link>
        </div>
        <div>
          {showErrorPopup && <ErrorPopup message={error} onClose={closeErrorPopup} />}
        </div>
      </div>
    );
  }
  
  export default Login;