import React from "react";
import ErrorPopup from "../components/ErrorPopup";
import './Signup.css'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Room () {
    const [room, setRoom] = useState("");
    const [error, setError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const { username: paramUsername, id: paramId } = useParams();

    useEffect(() => {
        setUsername(paramUsername);
        setId(paramId);
    }, [paramUsername, paramId]);

    const createRoom = async() => {
     try {
      if (!room) {
        setError('Please fill in all fields.');
        setShowErrorPopup(true);
        return;
      }

      const response = await axios.post('http://localhost:3000/room', { username, id, room });
      console.log('Room created successfully:', response.data);
      setTimeout(() => {
        navigate(`/chat/${username}/${id}/${room}`);
      }, 10);
    } catch (error) {
      console.log('room creation failed:', error);
      setError('room creation failed.'); 
      setShowErrorPopup(true);
    }
    }

    return(
        <div className="room">
            <h1 className="signup-title">Create a Room</h1>
           <div className="signup-input">
                <input className="signup" type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter Room number"></input>
                <label for="signup-username" className="signup-label">Enter Room Number</label>
                <span className="signup-highlight"></span>
              </div>
              <div className="signup-btn-container">
                <button onClick={createRoom} className="signup-btn">Create Room</button>
              </div>
        </div>
    )
}

export default Room;