import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {logout, user} = useAuth()
  const navigate = useNavigate()

  if (user !== 'OK') {
    return <div>
       <h1>Please log in to access this page.</h1>
       <button onClick={() => navigate("/api/v1/signup")}>Sign Up</button>
      </div>
  }

  return (
    <div>
       <h1>Welcome, {user}</h1>
       <button onClick={() => logout()}>Log Out</button>
    </div>
  )
}

export default Home