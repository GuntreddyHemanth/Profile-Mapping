import React, { useState } from 'react'
import axios from "axios"

const Signin = () => {
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
            await axios.post('http://localhost:3000/api/v1/signin', {
                username,
                password
            }, {
                withCredentials: true,
            });
            alert("your are logged in ")
        }}>Sign In</button>
    </div>
  )
}

export default Signin