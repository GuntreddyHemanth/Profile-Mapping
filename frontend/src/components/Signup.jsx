import React, { useState } from 'react'
import axios from "axios"

const Signup = () => {
    const [username , setUsername] = useState("")
    const [password, setPassword] = useState("")
  return (
    <div>
        <input placeholder='username' onChange={(e) => {
            setUsername(e.target.value) 
        }} type='text'/>
        <input placeholder='password' onChange={(e) => {
            setPassword(e.target.value) 
        }} type='text'/>
        <button onClick={async () => {
            await axios.post('http://localhost:3000/api/v1/signup', {
                username,
                password
            }, {
                withCredentials: true,
            });
            alert("your are account created")
        }}>Sign up</button>
    </div>
  )
}

export default Signup