import React from 'react'
import Shoppingbee from '../Assets/shopping_bee.png'
import './StoreHead.css'

const Store_head = () => {
  return (
    <>
      <div className="store-head">
        <img src={Shoppingbee} alt="Shopping Bee" />
        <p className="store">STORE</p>
      </div>
    </>
  )
}

export default Store_head
