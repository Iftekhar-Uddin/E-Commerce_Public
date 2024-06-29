import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import api from '../../api/api'
import CurrencyBD from '../../Tools/CurrencyBd'
import { Link } from 'react-router-dom'
import Context from '../../context/index'
import addToCart from '../cart/AddToCart'



const CategoryWiseRecommendedProduct = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(15).fill(null);
    const scrollElement = useRef()
    const { fetchUserAddToCart } = useContext(Context);


    const fetchCategoryWiseProduct = async(category)=>{
        const response = await fetch(api.categoryWiseProduct.url,{
            method : api.categoryWiseProduct.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                category : category
            })
        })
    
        return await response.json();
    }

    useEffect(()=>{
        const fetch = async ()=>{
            setLoading(true)
            const datas = await fetchCategoryWiseProduct(category);
            setLoading(false)
            setData(datas.data)
        }
        fetch();
    },[])

    const handleAddToCart = async(e,id)=>{
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const scrollTop = () =>{
        window.scrollTo({ top : 0 , behavior : 'smooth'})
    }


    return (
        <div className='container mx-auto relative'>
            <h2 className='text-xl lg:text-2xl font-semibold pl-1 lg:pl-0 pt-3 lg:pt-6'>{heading}</h2>
    
            <div className='grid grid-cols-[repeat(auto-fit,minmax(0px,162px))] md:gap-6 gap-3 justify-around transition-all overflow-y-scroll scrollbar-none pt-3 lg:pt-5'>
                {
                    data?.map((da)=>{
                        return(
                            <Link to={`/product/${da?._id}`} className='bg-white min-w-[160px] max-w-[160px] md:min-w-[180px] md:max-w-[180px] rounded-md shadow' onClick={scrollTop}>
                                <div className='bg-zinc-200 h-48 p-2 min-w-[160px] md:min-w-[145px] flex justify-center items-center'>
                                    <img className=' object-scale-down h-full hover:scale-110 transition-all' src={da.productImage[0]} alt=''/>
                                </div>
                                <div className='p-2 grid w-full'>
                                    <h3 className='font-medium test-base md-text-lg text-ellipsis line-clamp-1'>{da.productName}</h3>
                                    <p className='capitalize text-slate-500'>{da.category}</p>
                                    <div className='flex w-full justify-between items-center'>
                                    <div className='w-[70px]'>
                                        {da.price? (
                                            <><p className='text-red-400 line-through font-md'>{CurrencyBD(da.regularPrice)}</p>
                                            <p className='text-teal-500 font-md'>{CurrencyBD(da.price)}</p></>

                                        ):(
                                            <p className='text-teal-500 font-md'>{CurrencyBD(da.regularPrice)}</p>
                                        )
                                        }
                                    </div>
                                    <div className='pb-2'>
                                        {!da.price && da.regularPrice ? (
                                            <p className='px-[8px] py-[8px] w-12 rounded-full bg-green-300 text-xs text-center'>No Offer</p>
                                        ) : (
                                            <p className='px-[8px] py-[8px] w-12 rounded-full bg-green-300 text-xs'>{((100-(da.price/(da.regularPrice))*100)).toFixed(2)}% &nbsp;&nbsp;Off</p>
                                        )
                                            
                                        }
                                        {(da.availability === "In Stock")? (
                                            <p className='text-xs text-blue-400'>In Stock</p>
                                        ):(
                                            <p className='text-xs text-yellow-500'>Stock out</p>
                                        )

                                        }
                                    </div>
                                    </div>
                                    {(da.availability === "In Stock")? <button className='py-0.5 px-2 text-sm bg-red-500 mx-auto text-white rounded-full' onClick={(e)=>handleAddToCart(e, da?._id)}>Add to Cart</button> 
                                        : <button className='py-0.5 px-2 text-sm bg-yellow-400 mx-auto cursor-not-allowed rounded-full'>Not Available</button>
                                    }
                                </div>
                            </Link>
                        )
                    })
                }
            
            </div>
    
        </div>
      )
}

export default CategoryWiseRecommendedProduct
