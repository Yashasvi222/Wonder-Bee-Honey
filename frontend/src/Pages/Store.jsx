import React from 'react'
import './Store.css'
import StoreHead from '../Components/StoreHead/StoreHead'
import ProductCard from '../Components/ProductCard/ProductCard'
import data_product from '../Components/Assets/data'


const Store = () => {
  return (
    <div>
      <StoreHead/>
      <div className='store-all-products'>
        {data_product.map((product,i)=>{
            return <ProductCard key={i} id={product.id} name={product.name} image={product.image} price={product.price}/>
        })}
      </div>
    </div>
  )
}

export default Store
