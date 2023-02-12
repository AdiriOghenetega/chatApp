import React from 'react'
import {FcGoogle} from "react-icons/fc"
import {AiFillFacebook} from "react-icons/ai"
import {auth} from "../firebase"
import { signInWithRedirect,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import "firebase/app"

const Login = () => {
  const googleprovider = new GoogleAuthProvider();
  const fbprovider = new FacebookAuthProvider()
  return (
    <div className="h-screen login flex flex-col justify-center items-center" >
      <div className='bg-[rgb(255,255,255,.5)] w-72 h-52 p-[2em] rounded-[1em]'>
        <div>
          <h1 className='font-bold'>Welcome to chatRooms!</h1>
        </div>
        <div className="flex flex-col justify-between h-20 mt-4 items-center">
          <button
          onClick={()=> signInWithRedirect(auth,googleprovider)}
          className='bg-gray-300 hover:bg-gray-100 p-2 rounded-lg text-sm w-40 flex items-center justify-around'><FcGoogle />Sign In with Google</button>
          <button
          onClick={()=> signInWithRedirect(auth,fbprovider)}
          className='bg-gray-300 hover:bg-gray-100 p-2 rounded-lg text-sm w-44 flex items-center justify-around'><AiFillFacebook className='text-[rgb(72,103,170)]' />Sign In with Facebook</button>
        </div>
      </div>
    </div>
  )
}

export default Login