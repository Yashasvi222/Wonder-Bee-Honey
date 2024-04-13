import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/sample_logo.png'
import cart_icon from '../Assets/cart_icon.png'

const Navbar = () => {

    const [menu, setMenu] = useState("home");

  return (
    <>
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="logo" />
            </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("home")}}>Home{menu==="home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("store")}}>Store{menu==="store"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("journey")}}>Journey{menu==="journey"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("contact")}}>Contact{menu==="contact"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <button>Login</button>
                <img src={cart_icon} alt="cart-icon" />
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    </>
    
  )
}

export default Navbar
