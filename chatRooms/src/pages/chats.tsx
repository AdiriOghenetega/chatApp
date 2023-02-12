import React,{useState,useEffect} from 'react' 
import { io, Socket } from "socket.io-client";
import { useAuth } from '../contexts/auth_context';
import {Nav} from "../components"



const socket: Socket = io("http://localhost:3001");

const Chats = () => {

  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const user = useAuth()
  console.log(user)

  if(!user) return <h1>loading ... </h1>


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: user.displayName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const joinRoom = () => {
    if (user && room !== "") {
      socket.emit("join_room", room)
    }
  };

  return (
    <div>
        <Nav />
        <div>
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
        </div>
    </div>
  )
}

export default Chats