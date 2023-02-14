import {useState,useEffect} from "react"
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import { Login,Chats } from "./pages";
import { io, Socket } from "socket.io-client";
import { useAuth } from './contexts/auth_context';
import './App.css'



function App() {
  const [socket, setSocket] = useState<Socket | null>(null)

  const user = useAuth()

  useEffect(() => {
    
  if(user){
    const newSocket = io("http://localhost:3001")
  setSocket(newSocket)
}
},[])


  return (
    <div className="bg-gray-500 text-center">
<Routes>
<Route  path='/' element={<Login />} />
<Route  path='/chats' element={<Chats socket={socket} />} />
</Routes>
    </div>
    
  )
}

export default App
