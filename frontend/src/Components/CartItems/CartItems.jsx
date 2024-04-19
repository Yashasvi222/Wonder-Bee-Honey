import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {data_product, cartItems, removeFromCart} = useContext(ShopContext)
  return (
    <>
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>   
            <hr />
            {data_product?.map((e)=>{
                if(cartItems[e.id]>0)
                {
                    return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>₹{e.price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>₹{e.price*cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="remove_icon" />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })} 
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <p>Cart total</p>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>₹{0}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>₹{0}</p>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
            </div>    
        </div>
    </>
  )
}

export default CartItems
