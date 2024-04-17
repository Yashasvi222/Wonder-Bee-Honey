import React from 'react'
import './ProductCard.css'
// import Honey from '../Assets/Group 18.png'

const ProductCard = (props) => {
  return (
    <>
      <div className="card">
        <div className="card-container">
            <img src={props.image} alt="Honey" />
            <p className="flavor">{props.name}</p>
            <hr className="line" />
            <p className="price">₹{props.price}</p>
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
