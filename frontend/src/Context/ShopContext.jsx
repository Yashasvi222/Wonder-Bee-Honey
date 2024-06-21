import React, {createContext, useState, useEffect} from "react";
import data_product from "../Components/Assets/data";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = {};
    }
    return cart;
}


const ShopContextProvider = (props) => {
    
    const [data_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart())
    
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart', {
                method:'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data))
        }
        
    },[])

    const addToCart = (itemId, weight) => {
        setCartItems((prev) => ({
            ...prev, 
            [itemId]: { 
                ...prev[itemId], 
                [weight]: (prev[itemId]?.[weight] || 0) + 1 
            }
        }));

        console.log(cartItems)
        
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId, "weight": weight }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    };
    
    const removeFromCart = (itemId, weight) => {
        setCartItems((prev) => {
            const updatedItem = { ...prev[itemId] };
            if (updatedItem[weight] > 1) {
                updatedItem[weight] -= 1;
            } else {
                delete updatedItem[weight];
            }
            
            if (Object.keys(updatedItem).length === 0) {
                const { [itemId]: removed, ...rest } = prev;
                return rest;
            } else {
                return { ...prev, [itemId]: updatedItem };
            }
        });
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId, "weight": weight }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    };
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const itemInfo = data_product.find((product) => product.id === Number(item));
            if (itemInfo) {
                for (const weight in cartItems[item]) {
                    totalAmount += itemInfo.price * cartItems[item][weight];
                }
            }
        }
        return totalAmount;
    };
    
    const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
        for (const weight in cartItems[item]) {
            totalItems += cartItems[item][weight];
        }
    }
    return totalItems;
};


    const contextValue = {getTotalCartItems, getTotalCartAmount, data_product, cartItems, addToCart, removeFromCart}
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider