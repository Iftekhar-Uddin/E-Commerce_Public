import React, { useState } from 'react'
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import UpdatepProduct from './UpdatepProduct';
import CurrencyBd from '../../Tools/CurrencyBd'
import api from '../../api/api';
import { toast } from 'react-toastify';


const ProductCart = ({productData, fetchdata, onClose}) => {
  const [editProduct, setEditProduct] = useState(false);
  const [displayNone, setDisplayNone] = useState(false);

  const handleDeleteProduct = async (e, id) => {
    e.preventDefault()
        
    const response = await fetch(api.deleteProduct.url,{
        method : api.deleteProduct.method,
        credentials : 'include',
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({_id:id})
    })

    const resData = await response.json()

    if(resData){
      fetchdata();
      toast.success("Product delete successfully")
    }

    if(resData.error){
      toast.error(resData?.message)
    }

  }


  return (
    <div  className='p-2 rounded-md bg-white md:w-64 w-40'>
        <div className={displayNone? 'hidden' : ''}>
            <div className='flex justify-center items-center'>
                <img className='w-[197px] h-[197px] rounded-md' src={productData.productImage[0]}/>
            </div>
            <h1 className='text-lg text-ellipsis line-clamp-2'>{productData.productName}</h1>
            <p className='font-semibold'>{CurrencyBd(productData.regularPrice)}</p>
            <div className='h-[25px] w-[150px] lg:h-[25px] lg:w-[236px] flex justify-between items-center'>
              <div className='w-fit mr-auto p-1 bg-red-500 cursor-pointer rounded-full text-slate-200 hover:text-white hover:bg-red-600' onClick={(e)=>handleDeleteProduct(e, productData._id)}><MdDelete/></div>
              <div className='w-fit ml-auto p-1 bg-green-300 cursor-pointer rounded-full hover:text-white hover:bg-green-600' onClick={()=>{setEditProduct(true) ; setDisplayNone(false) }}><MdModeEditOutline/></div>
            </div>

        </div>
        {editProduct && <UpdatepProduct productData={productData} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>}
    </div>
  )
}

export default ProductCart;