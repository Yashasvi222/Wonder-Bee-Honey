import React from 'react'
import './LoginSignupComponent.css'
import BeeFarm from '../Assets/pexels-anete-lusina-5247962.jpg'


const LoginSignupComponent = () => {
  return (
    <>
      <div className="loginsignup-container">
        <div className="loginsignup-img-container">
          <img src={BeeFarm} alt="Bee Farm" />
        </div>
        <div className="loginsignup-form">
          <p className="signup">Signup</p>
          <input type="text" placeholder='Username'/>
          <input type="password" placeholder='Password'/>
          <input type="password" placeholder='Confirm Password'/>
          <button className="signup-button">Sign Up</button>
          <div className="login-here-container">
            <p className="login-ask">Already have an account?</p>
            <button className='login-here'>Login Here</button>
          </div>
            
        </div>
      </div>
    </>
  )
}

export default LoginSignupComponent
