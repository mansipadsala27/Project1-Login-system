import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Regestration.css';
import { useAuth } from '../Context/AuthContext';


const Regestration = () => {

    const API='http://localhost:3000/users'
    const navigate=useNavigate()
    const {user}=useAuth()
  useEffect(()=>{
        
         if(user?.role=="admin"){
        navigate('/admindash')
        }
        else if(user?.role=="user")
        {
          navigate('/dash')
        }
        else{
          navigate('/')
        }
     
      },[])
    const [formdata,setFormData]=useState({
        name:'',
        email:'',
        role:'user',
        password:''
    });

    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData({
            ...formdata,
            [name]:value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
      
        try{
            let res= await fetch(`${API}`,{
                headers:{
                    'Content-Type':'Application/json'
                },
                method:'POST',
                body:JSON.stringify(formdata)

            })
            let result= await res.json()
            
        }
        catch(err){
            console.log(err);
            return false
            
        }

          setFormData({
            name:'',
            email:'',
            password:''
        })

        navigate(`/`)
        
    }
  
return (
  <div className="register-page">
    <div className="register-card">

      <div className="text-center mb-4">
        
        <h2 className="fw-bold mt-3">Regestration User</h2>
        <p className="text-muted">
          Sign up to get started with us
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control custom-input"
            value={formdata.name}
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control custom-input"
            value={formdata.email}
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control custom-input"
            value={formdata.password}
            placeholder="Create a password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn register-btn w-100">
          Create Account →
        </button>

      </form>

      <div className="text-center mt-4">
        <span className="text-muted">
          Already have an account?{" "}
        </span>
        <Link to="/" className="login-link">
          Login
        </Link>
      </div>

    </div>
  </div>
);

}

export default Regestration
