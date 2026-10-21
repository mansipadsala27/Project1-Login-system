import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {
  const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userlogin');
        setUser(null);
        alert('Logged out successfully!');
        navigate('/');
    };
  return (
    <div>
      <h2>User name : {user?.name}</h2>
      <button onClick={()=>handleLogout()}>Log out</button>
    </div>
  )
}

export default Dashboard
