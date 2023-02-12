import React,{useState,useEffect} from 'react' 
import { io, Socket } from "socket.io-client";
import { useAuth } from '../contexts/auth_context';
import ScrollToBottom from "react-scroll-to-bottom";
import {Nav} from "../components"

type messageDataProps = {
  room: string;
  author: string | null | undefined;
  message: string;
  time: string;
}


const socket: Socket = io("http://localhost:3001");

const Chats = () => {

  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<messageDataProps[]>([]);
  const [showChat, setShowChat] = useState(false);
  const user = useAuth()


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
      setShowChat(true);
    }
  };
  const caption = messageList.filter(item=>item.author !== user.displayName)
  

  return (
    <div className=' h-screen'>
        <Nav />
        {
          showChat ? (<div className="">
          <div className="flex flex-col  w-full h-[77vh] overflow-scroll ">
            <div className='flex items-center p-2 shadow-xl font-black fixed w-full z-10 bg-gray-300 '>
              <button onClick={()=>setShowChat(false)} className=' hover:bg-gray-100 px-2 rounded-lg flex flex-col items-center justify-center mr-2 text-xs'>back</button>
              <h1>{caption[0]?.author}</h1>
            </div>
            <ScrollToBottom className="">
              {messageList.map((messageContent,index) => {
                return (
                  <div
                    className={user.displayName === messageContent.author ? "flex flex-col items-end w-full p-2 " : "flex flex-col items-start w-full p-2 "}
                    key={index}
                  >
                    <div>
                      <div className={user.displayName === messageContent.author ? "bg-green-500 p-2 rounded-lg":"bg-gray-200 p-2 rounded-lg"}>
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="text-xs">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 pb-4 mb-2 sm:mb-0 flex items-center justify-between">
            <input
            className='w-[90%] focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3'
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyDown={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage} className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg></button>
          </div>
        </div>) : (<div className=''>
        <div className="">
          <h3>Join A Chat</h3>
          <input
            type="text"
            value={room}
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
        </div>)
        }
        
        
    </div>
  )
}

export default Chats