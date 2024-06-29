import React, { useEffect, useState } from 'react'
import Uploadproduct from './Uploadproduct'
import api from '../../api/api';
import ProductCart from './ProductCart';


const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([]);
  const [displayNone, setDisplayNone] = useState(false);


  const fetchAllProduct = async() =>{
    const response = await fetch(api.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])


  // h-[calc(100vh-188px)]
  return (
    <div>
      <div className='w-full bg-white flex justify-between py-1 px-1.5 lg:py-2 lg:px-3'>
        <h2 className='font-semibold text-xl'>All products</h2>
        <button className='bg-green-400 px-2 rounded-full text-white hover:text-slate-800 hover:bg-green-500 transition-all' onClick={()=>{setOpenUploadProduct(prev=> !prev); setDisplayNone(prev=>!prev)}}>Upload Product</button>
      </div>
      
      <div className=''>
        <div className= {displayNone? 'hidden' : 'flex flex-wrap min-h-fit justify-between gap-y-2 lg:gap-3 py-1.5 lg:py-3 max-h-[calc(100vh-188px)] overflow-y-scroll scrollbar-none lg:overflow-y-scroll'} >
          {allProduct.map((product, ind)=>(
            <ProductCart productData={product} fetchdata={fetchAllProduct} key={ind+"AllProduct"}/>
          ))}
        </div>
      </div>

      
      {openUploadProduct && <Uploadproduct fetchData={fetchAllProduct} onClose={()=>{setOpenUploadProduct(false); setDisplayNone(false)}} />}
    </div>
  )
}

export default AllProduct
 