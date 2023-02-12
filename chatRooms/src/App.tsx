import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import { Login,Chats } from "./pages";
import { AuthProvider } from "./contexts/auth_context";

import './App.css'



function App() {

  return (
   
    <div className="bg-gray-500 text-center">
    <BrowserRouter>
    <AuthProvider>
<Routes>
<Route  path='/' element={<Login />} />
<Route  path='/chats' element={<Chats />} />
</Routes>
    </AuthProvider>

</BrowserRouter>
    </div>
    
  )
}

export default App
