import React, { useState } from 'react'
import './LoginSignupComponent.css'
import BeeFarm from '../Assets/pexels-anete-lusina-5247962.jpg'


const LoginSignupComponent = () => {

  const [state, setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () =>{
    console.log("Login func exec", formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }

  }

  const signup = async () =>{
    console.log("Sin func exec", formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <>
      <div className="loginsignup-container">
        <div className="loginsignup-img-container">
          <img src={BeeFarm} alt="Bee Farm" />
        </div>
        <div className="loginsignup-form">
          <p className="signup">{state}</p>
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler}type="text" placeholder='Username'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address'/>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>
          <button onClick={()=>{state==="Login"?login():signup()}}className="signup-button">Continue</button>
          <div className="login-here-container">
            {state==="Sign Up"?<p className="login-ask">Already have an account? <span className="loginsignup-span" onClick={()=>{setState("Login")}}>Login here</span></p>
            :<p className="login-ask">New User? <span className="loginsignup-span" onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
          </div>
            
        </div>
      </div>
    </>
  )
}

export default LoginSignupComponent
