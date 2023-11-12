import React, { useState, useEffect } from "react";
import './Chat.css';
import { useUser } from '../components/Usercontext';
import { useNavigate } from "react-router-dom";

function Chat() {
  const [leftContainerVisible, setLeftContainerVisible] = useState(true);
  const { loggedIn, logout } = useUser();
  const navigate = useNavigate();

  const handleToggle = () => {
    setLeftContainerVisible(!leftContainerVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setLeftContainerVisible(false);
      } else {
        setLeftContainerVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  const handlelogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 10)
    console.log("successfully logged out")
  };

  return (
    <div className="container">
      {leftContainerVisible && (
        <div className="left-container">
          <div className="title-container">
            <p className="logo">Chat App</p>
          </div>
          <div className="user-container">
            <h1>skdfjsld</h1>
          </div>
        </div>
      )}
      <div className="right-container">
        <div className="logout-container">
          {window.innerWidth <= 768 && (
            <button onClick={handleToggle}>☰</button>
          )}
          <p>
            <button className="logout-btn" onClick={handlelogout}>logout</button>
          </p>
        </div>
        <div className="chat-container">
          <h3>chat</h3>
        </div>
        <div className="input-container">
          <input class="msg-input" name="text" placeholder="Type something..." type="search"/>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
