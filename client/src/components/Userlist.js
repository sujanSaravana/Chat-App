import { useState } from "react";
import "./Userlist.css";
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3000")

function Userlist () {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () =>{
        if  (username !== "" && room !== ""){
            socket.emit("join_room", room)
        }
    }

    return (
        <div>
            <input type="text" placeholder="name" onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder="Room id" onChange={(e) => setRoom(e.target.value)}/>
            <button>Join a Room</button>
        </div>
    )

}

export default Userlist;