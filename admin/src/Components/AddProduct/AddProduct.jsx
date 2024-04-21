import React, {useState} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [imageUpload, setImageUpload] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        price:""
    })

    const imageHandler = (e) =>{
        setImageUpload(e.target.files[0]);
    }
    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const Add_Product = async ()=>{
        console.log(productDetails);
    }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.price} onChange={changeHandler} type="text" name='price' placeholder='Type Here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={imageUpload?URL.createObjectURL(imageUpload):upload_area} alt="" className="addproduct-thumbnail-img" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
      
    </div>
  )
}

export default AddProduct
