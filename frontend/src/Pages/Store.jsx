import React, {useContext} from 'react'
import './Store.css'
import StoreHead from '../Components/StoreHead/StoreHead'
import ProductCard from '../Components/ProductCard/ProductCard'
// import data_product from '../Components/Assets/data'
import { ShopContext } from '../Context/ShopContext'


const Store = () => {

  const { data_product } = useContext(ShopContext)

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
