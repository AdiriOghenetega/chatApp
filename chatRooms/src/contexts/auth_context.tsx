import React,{useContext,useState,useEffect,createContext} from "react"
import { useNavigate } from "react-router-dom"
import {auth} from "../firebase"

type childrenProps = {
    children: string | JSX.Element | JSX.Element[] 
  }
  type contextProps = {
    displayName : string,
    email : string
  }

const UserContext = createContext<contextProps | null>(null)

export const useAuth = ()=> useContext(UserContext)


export const AuthProvider = ({children}:childrenProps) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState<contextProps | null>(null)
console.log(user)
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
       setUser(user);
       setLoading(false);
       
      if(user){
         navigate("/chats");}
     }
     )
      
    }, [user,navigate])

    

    return (
      <UserContext.Provider value={user}>
      {!loading && children}
      </UserContext.Provider>
    )
    
}