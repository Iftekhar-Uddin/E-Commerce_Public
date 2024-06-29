import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import api from '../../api/api'
import CurrencyBD from '../../Tools/CurrencyBd'
import { Link } from 'react-router-dom'
import Context from '../../context/index'
import addToCart from '../cart/AddToCart'



const HorizontalCardProduct = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(15).fill(null);
    const scrollElement = useRef()
    const { fetchUserAddToCart, } = useContext(Context);

    console.log(data)


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

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


    // test-base md-text-lg
    // h-[152px] lg:h-[160px] min-w-[140px] md:min-w-[145px]

    return (
        <div className='container mx-auto px-2 py-1 md:px-5 lg:py-2 relative'>
            <h2 className=' text-lg md:text-2xl font-semibold pb-1.5 md:pb-4'>{heading}</h2>
    
            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
                <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 
                {
                    data?.map((da)=>{
                        return(
                            <Link to={`/product/${da?._id}`} className='gap-1 bg-white w-full h-40 min-w-[345px] md:min-w-[330px] max-w-[345px] md:max-w-[330px] flex rounded-md shadow'>
                                <div className='bg-zinc-200 h-40 p-1 md:p-2 max-w-[145px] md:max-w-[145px] flex justify-center items-center rounded-l-md'>
                                    <img className='object-scale-down h-40 hover:scale-110 transition-all' src={da.productImage[0]} alt=''/>
                                </div>
                                <div className='p-1 md:p-2 grid overflow-y-scroll scrollbar-none h-[148px] md:h-40  min-w-[180px] max-w-auto'>
                                    <h3 className='font-md text-ellipsis line-clamp-1'>{da.productName}</h3>
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

export default HorizontalCardProduct
