import React from 'react'
import './Navbar.css'
import Logo from '../../assets/sample_logo.png'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={Logo} alt="Logo" className="nav-logo" />
      <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
