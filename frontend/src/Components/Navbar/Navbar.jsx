import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../Assets/sample_logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {

    const [menu, setMenu] = useState("home");
    const {getTotalCartItems} = useContext(ShopContext);


  return (
    <>
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="logo" />
            </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("home")}}><Link style={{ textDecoration: 'none'}}to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("store")}}><Link style={{ textDecoration: 'none'}}to='/store'>Store</Link>{menu==="store"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("journey")}}><Link style={{ textDecoration: 'none'}}to='/journey'>Journey</Link>{menu==="journey"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("contact")}}><Link style={{ textDecoration: 'none'}}to='/contact'>Contact</Link>{menu==="contact"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link style={{ textDecoration: 'none'}}to='/login'><button>Login</button></Link>}
                <Link style={{ textDecoration: 'none'}}to='/cart'><img src={cart_icon} alt="cart-icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    </>
    
  )
}

export default Navbar
