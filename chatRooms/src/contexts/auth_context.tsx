import React,{useContext,useState,useEffect,createContext} from "react"
import { useNavigate } from "react-router-dom"
import {auth} from "../firebase"

type childrenProps = {
    children: string | JSX.Element | JSX.Element[] 
  }
  type contextProps = {
    displayName : string | null |undefined,
    email : string | null | undefined,
    uid : string | null | undefined
  }

const UserContext = createContext<contextProps | null>(null)

export const useAuth = ()=> useContext(UserContext)


export const AuthProvider = ({children}:childrenProps) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState<contextProps>({
      displayName : "",
    email : "",
    uid : ''
    })
    const navigate = useNavigate();

    useEffect(() => {
      
        auth.onAuthStateChanged((user)=>{
          console.log(user)
       setUser({
        displayName : user?.displayName,
        email : user?.email,
        uid: user?.uid
       });
       setLoading(false);
       if(user){
         navigate("/chats");
       }
     }
     )
      
      
    }, [])

    

    return (
      <UserContext.Provider value={user}>
      {!loading && children}
      </UserContext.Provider>
    )
    
}