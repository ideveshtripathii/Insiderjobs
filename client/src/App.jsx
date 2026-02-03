import { useContext } from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applyjobs from './pages/Applyjob'
import Applications from './pages/Applications'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<Applyjobs />}/>
        <Route path='/applications' element={<Applications />}/>
        
      </Routes>
      
    </div>
  )
}

export default App
