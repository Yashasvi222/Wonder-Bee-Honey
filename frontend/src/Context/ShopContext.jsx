import React, {createContext, useState} from "react";
import data_product from '../Components/Assets/data'

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index=0; index<data_product.length+1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {


    const [cartItems, setCartItems] = useState(getDefaultCart())
    

    const addToCart = (ItemId) => {
        setCartItems((prev)=>({...prev, [ItemId]:prev[ItemId]+1}))
        console.log(cartItems);
    }
    const removeFromCart = (ItemId) => {
        setCartItems((prev)=>({...prev, [ItemId]:prev[ItemId]-1}))
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = data_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = () =>{
        let totalItems = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItems+=cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, data_product, cartItems, addToCart, removeFromCart}
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider