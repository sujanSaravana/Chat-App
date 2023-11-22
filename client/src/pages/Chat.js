import React, { useState, useEffect } from "react";
import './Chat.css';
import { useUser } from '../components/Usercontext';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Chat() {
  const [leftContainerVisible, setLeftContainerVisible] = useState(true);
  const { loggedIn, logout } = useUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { username, id, roomId } = useParams();

  const sendMsg = async () => {
    try {
      if (!message.trim()) {
        return;
      }

      console.log('Sending message with:', { id, roomId, message });
      const response = await axios.post('http://localhost:3000/send-message', {
        senderId: id,
        roomId: roomId,
        content: message
      });

      console.log('Message sent successfully:', response.data);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-messages/${roomId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    };
  
    fetchMessages();
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 10);
    return () => clearInterval(intervalId);
  }, [roomId]);
  

  return (
    <div className="container">
      {leftContainerVisible && (
        <div className="left-container">
          <div className="title-container">
            <p className="logo">Chat App</p>
            {/*<p className="logo1">{username}</p>*/}
          </div>
          <div className="user-container">
            <h1>{username}</h1>
          </div>
        </div>
      )}
      <div className="right-container">
        <div className="logout-container">
          {window.innerWidth <= 768 && (
            <div>
               <input onClick={handleToggle} className="toggle-btn" type="checkbox" id="checkbox"/>
                <label htmlFor="checkbox" className="toggle">
                  <div className="bars" id="bar1"></div>
                  <div className="bars" id="bar2"></div>
                  <div className="bars" id="bar3"></div>
                </label>
            </div>
          )}
          <Link to={`/room/${username}/${id}`}>
              <button className="create-room">Create a new Room</button>
          </Link>
          <p>
            <button className="logout-btn" onClick={handlelogout}>logout</button>
          </p>
        </div>
        <div className="chat-container">
          <h3>Chat</h3>
          <div className="messages-container">
            {messages.map(message => (
              <div key={message.id} className={message.senderId === id ? 'sent-message' : 'received-message'}>
                {message.content}
              </div>
            ))}
          </div>
        </div>
        <div className="input-container">
          <input className="msg-input" name="text" placeholder="Type something..." type="search" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button onClick={sendMsg}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
