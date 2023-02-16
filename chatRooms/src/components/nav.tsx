import React from 'react'
import {GrChatOption} from "react-icons/gr"
import { auth } from '../firebase'
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const navigate = useNavigate()

  function handleSignOut(){
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
  return (
    <div className='bg-gray-100 flex w-full items-center justify-between p-[1em] shadow-xl '>
      <div className='flex items-center'>
        <GrChatOption size="25px"  />
        <h1 className='text-2xl font-black ml-2'>chatRooms</h1>
      </div>
      <div>
        <button className='text-sm hover:bg-gray-200 p-2 rounded-lg hover:text-red-500' onClick={handleSignOut}>signOut</button>
      </div>
    </div>
  )
}

export default Nav