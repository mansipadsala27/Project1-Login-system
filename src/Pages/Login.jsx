import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Login.css'
import { useAuth } from '../Context/AuthContext';

const Login = () => {
    const API='http://localhost:3000/users'
    const navigate=useNavigate()
    const {user,setUser}=useAuth()
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
            let res= await fetch(`${API}?email=${formdata.email}`,{
                headers:{
                    'Content-Type':'Application/json'
                },
                method:'GET',
            })
            let result= await res.json()

         
            if(result.length > 0 && result[0].email==formdata.email && result[0].password==formdata.password){
                const storeuser=result[0]
                setUser(storeuser)   
                localStorage.setItem('userlogin',JSON.stringify(storeuser))
                alert("login succefull")
                if(storeuser?.role=="admin"){
                  navigate('/admindash')
                }
                else{
                navigate(`/dash`)

                }
            }
            else{
              navigate('/')
              alert("Invalid email or password")
            }
            
            
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
            
        }
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="text-center mb-4">
          <h2 className="fw-bold mt-3">Welcome Back!</h2>
          <p className="text-muted">
            Login to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="form-control login-input"
              placeholder="Enter your email"
              value={formdata.email}
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
              className="form-control login-input"
              placeholder="Enter your password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn login-btn w-100">
            Login →
          </button>

        </form>

        <div className="text-center mt-4">
          <span className="text-muted">
            Don't have an account?{' '}
          </span>

          <Link to="/reg" className="signup-link">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login
