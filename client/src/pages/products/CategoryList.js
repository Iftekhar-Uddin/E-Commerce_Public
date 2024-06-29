import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(15).fill(null);

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        const response = await fetch(api.categoryProduct.url)
        const resData = await response.json()
        setLoading(false)
        setCategoryProduct(resData.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])


  return (
    <div className='container mx-auto  px-2 py-1.5 lg:px-5 lg:py-3'>
        <div className='p-1 lg:p-1.5 flex items-center gap-4 lg:gap-6 justify-between overflow-x-scroll md:overflow-x-scroll'>
            {loading ? (
                categoryLoading.map((el,index)=>{
                    return(
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full p-8 md:p-0 overflow-hidden bg-slate-300 animate-pulse' key={1+index}></div>
                        )
                    })
                ) : 
                (
                    categoryProduct?.map((catProduct)=>(
                        <Link className='cursor-pointer'  to={`/productcategory?category=${catProduct?.category}`} key={catProduct?.category}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' src={catProduct.productImage[0]} alt=''/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{catProduct.category}</p>
                        </Link>
                    ))
                )
            }
        </div>
    </div>
  )
}

export default CategoryList
