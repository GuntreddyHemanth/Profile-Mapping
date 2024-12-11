import React from 'react'
import { useAuth } from '../context/AuthContext'
import Profile from './Profile'

const Home = () => {
  const {logout, authUser} = useAuth()
  return (
    <div>
       <h1>Welcome, {authUser.id}</h1>
       <button onClick={() => logout()}>Log Out</button>
       <Profile/>
    </div>
  )
}

export default Home