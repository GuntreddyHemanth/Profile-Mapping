import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'


const Signup = () => {
    const [username , setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signup} = useAuth()
  return (
    <div>
        <input placeholder='username' onChange={(e) => {
            setUsername(e.target.value) 
        }} type='text'/>
        <input placeholder='password' onChange={(e) => {
            setPassword(e.target.value) 
        }} type='password'/>
        <button onClick={() => signup(username, password)}>Sign up</button>
    </div>
  )
}

export default Signup