import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
      <BrowserRouter>
         <AuthProvider>
          <Routes>
            <Route path='/api/v1/signin' element={<Signin/>}/>
            <Route path='/api/v1/signup' element={<Signup/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
