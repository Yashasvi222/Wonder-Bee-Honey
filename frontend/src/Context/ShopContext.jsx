import React, {createContext, useState} from "react";
import data_product from "../Components/Assets/data";
// import data_product from '../Components/Assets/data'

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
    
    // useEffect(()=>{
    //     fetch('http://localhost:4000/allproducts')
    //     .then((response)=>response.json())
    //     .then((data)=>setAll_product(data))
    // },[])

    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
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