import React from 'react'
import './ProductCard.css'
import Honey from '../Assets/Group 18.png'

const ProductCard = () => {
  return (
    <>
      <div className="card">
        <div className="card-container">
            <img src={Honey} alt="Honey" />
            <p className="flavor">Lorem Ipsum</p>
            <hr className="line" />
            <p className="price">₹1200/-</p>
            <div className="weights">
                <div className="w-one">
                    500gm
                </div>
                <div className="w-two">
                    1kg
                </div>
            </div>
            <button>Add to Cart</button>
        </div>
      </div>
    </>
  )
}

export default ProductCard
