import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom';
import bee from '../Assets/enlarge_Mountain-Valley-Honey-How-Do-Bees-Make-Honey-1-1024x683-removebg-preview_1.png'

const hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-left">
          <img src={bee} alt="bee" />
        </div>
        <div className="hero-right">
          <div className="text-container">
            <div className='welcome'>
              <p>Welcome to</p>
              <p className='wonder'>Wonder Bee Honey</p>
            </div>
          <p className="tagline">Lorem ipsum dolor sit amet consectetur</p>
          </div>
        <div className="intro-div">
          <p className="intro">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Eos debitis praesentium aliquid ab et, unde perspiciatis minus vero nisi soluta 
          facilis totam explicabo necessitatibus non. Ipsum reprehenderit quaerat unde impedit 
          dignissimos fugiat nobis ex eos deserunt? Voluptatibus placeat consectetur eum adipisci 
          possimus, ea harum assumenda?</p>
          
            <button className="shop-now"><Link style={{ textDecoration: 'none', color: 'inherit'}} to='/store'>Shop Now</Link></button>
          
          
        </div>
        
        </div>
      </div>
    </>
  )
}

export default hero
