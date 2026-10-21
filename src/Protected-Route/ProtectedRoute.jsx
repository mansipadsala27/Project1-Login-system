import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const ProtectedRoute = () => {
 
    const {user}=useAuth()
    
     if(!user || user.role != "admin"){     
        return <Navigate to='/' replace/>
    }
   
    return <Outlet/>
  
}

export default ProtectedRoute
