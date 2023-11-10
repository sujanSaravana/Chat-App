import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"

function Chat() {

    return (
      <div className="home">
        <button>Logout</button>
        <Navbar />
        <h1>Chat</h1>
      </div>
    );
  }
  
  export default Chat;