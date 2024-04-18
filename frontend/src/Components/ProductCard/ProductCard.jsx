import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import './ProductCard.css'

const ProductCard = (props) => {

  const {addToCart} = useContext(ShopContext);

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
            <button onClick={()=>{addToCart(props.id)}}>Add to Cart</button>
        </div>
      </div>
    </>
  )
}

export default ProductCard
