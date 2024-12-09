import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Signin = () => {
    const [username , setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signin} = useAuth()

  return (
    <div>
        <input placeholder='username' onChange={(e) => {
            setUsername(e.target.value) 
        }} type='text'/>
        <input placeholder='password' onChange={(e) => {
            setPassword(e.target.value) 
        }} type='password'/>
        <button onClick={() => signin(username, password)}>Sign In</button>
    </div>
  )
}

export default Signin