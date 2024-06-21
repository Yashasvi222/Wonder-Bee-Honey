import React, { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import './ProductCard.css'

const ProductCard = (props) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedWeight, setSelectedWeight] = useState("250gms"); // Default weight
  const [isHover, setIsHover] = useState(false)

  const ProductCardDescription = () => {
    return (
      <div className="description">
        <p className='description-heading'>What's inside the Jar</p>
        <p className='description-content'>Lorem ipsum dolor sit amet consectetur adipisicing 
          elit. Asperiores ratione animi qui magnam porro tenetur et cum vitae reiciendis est 
          ipsam, corrupti nulla voluptatem sit dolorem quam voluptate totam excepturi.</p>
      </div>
    )
  }

  const handleOnMouseOver = () => {
    setIsHover(true);
  }

  const handleOnMouseOut = () => {
    setIsHover(false);
  }

  const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
  };

  return (
    <div className="card">
      <div className="card-container">
        <img src={props.image} alt="Honey" />
        <p className="flavor">{props.name}</p>
        <hr className="line" />
        <p className="price">₹{props.price}</p>
        <div className="weights">
          <select className="card-dropdown" value={selectedWeight} onChange={handleWeightChange}>
            <option value="250gms">250gms</option>
            <option value="500gms">500gms</option>
            <option value="1kg">1kg</option>
          </select>
        </div>
        <div className='card-lower-section'>
          <div className='description-div' onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>What's inside?</div>
          <button onClick={() => { addToCart(props.id, selectedWeight) }}>Add to Cart</button>
        </div>
      </div>
      {isHover && (
        <div className="description-container" onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>
          <ProductCardDescription />
        </div>
      )}
    </div>
  )
}

export default ProductCard
