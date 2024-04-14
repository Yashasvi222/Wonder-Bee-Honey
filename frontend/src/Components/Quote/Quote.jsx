import React from 'react'
import Honey from '../Assets/Group 18.png'
import './Quote.css'

const Quote = () => {
  return (
    <>
      <div className="container">
        <div className="quote">
          <p className="line-one">"Life is the flower for which</p>
          <p className="line-two">love is the honey"</p>
          <p className="line-three">-Victor Hugo</p>
        </div>
        <div className="honeyimg">
            <img src={Honey} alt="honey-bottle" />
        </div>
      </div>
    </>
  )
}

export default Quote
