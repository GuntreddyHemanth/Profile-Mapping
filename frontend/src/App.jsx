import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api/v1/signin' element={<Signin/>}/>
        <Route path='/api/v1/signup' element={<Signup/>}/>
        {/* <Route path='/logout'/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
