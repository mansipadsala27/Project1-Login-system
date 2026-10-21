import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Regestration from './Pages/Regestration'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'

import ProtectedRoute from '../src/Protected-Route/ProtectedRoute'
import UserDashboard from './Pages/UserDashboard'
function App() {
 

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/reg' element={<Regestration/>}></Route>
      <Route path='/dash' element={<UserDashboard/>}></Route>


      <Route element={<ProtectedRoute/>}>
        <Route path='/admindash' element={<Dashboard/>}></Route>

      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
