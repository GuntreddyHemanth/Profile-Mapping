import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import {useAuth } from './context/AuthContext'

function App() {
  const {authUser} = useAuth()
  return (
          <Routes>
            <Route path='/api/v1/signin' element={authUser ? <Navigate to="/"/> : <Signin/>}/>
            <Route path='/api/v1/signup' element={authUser ? <Navigate to="/"/> : <Signup/>}/>
            <Route path='/' element={authUser ? <Home/> : <Navigate to= "/api/v1/signin"/>}/>          
          </Routes>
  )
}

export default App
