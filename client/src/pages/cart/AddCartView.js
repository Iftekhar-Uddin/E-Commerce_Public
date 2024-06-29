import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/api';
import Context from '../../context';
import CurrencyBD from '../../Tools/CurrencyBd'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
// import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const AddCartView = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    console.log(data)

    const fetchData = async() =>{
        const response = await fetch(api.addToCartProductView.url,{
            method : api.addToCartProductView.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
        })
       
        const responseData = await response.json()
        if(responseData){
            setData(responseData.data)
        }
    };

    const handleLoading = async() =>{
        await fetchData()
    };

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[]);

    const increaseQty = async(id, quantity) =>{
        const response = await fetch(api.updateCartProduct.url,{
            method : api.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : quantity + 1
                }
            )
        })

        const resData = await response.json()
        if(resData){
            // fetchData()
            handleLoading()
        }
    };


    const decraseQty = async(id, quantity) =>{
       if(quantity >= 2){
            const response = await fetch(api.updateCartProduct.url,{
                method : api.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : quantity - 1
                    }
                )
            })

            const resData = await response.json()
            if(resData){
                // fetchData()
                handleLoading()
            }
        }
    }

    const deleteCartProduct = async (id)=> {
        const response = await fetch(api.deleteCartProduct.url,{
            method : api.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({   _id : id}
            )
        })
        const resData = await response.json()
        if(resData){
            // fetchData()
            context.fetchUserAddToCart()
            handleLoading()
        }
    };

    const totalQuantity = data?.reduce((prevValue, curValue)=> prevValue + curValue.quantity, 0);
    // if(data.productId.price){
    //     const totalPrice =  data?.reduce((prev, cur)=> prev + (cur.quantity * cur.productId.price), 0)
    // }else{
    //     const totalPrice =  data?.reduce((prev, cur)=> prev + (cur.quantity * cur.productId.regularPrice), 0)
    // }


    const handlePayment= async ()=>{
        const stripePromise = await loadStripe("pk_test_51MyRqlLUYFz6Oorgr9I37K41D8fiKkWeopejwhjiSsFEEH5z3gmStv6uujHBDLr1gzx7ySff83qza49d6RROyOwp00nhhBEWjS")
        const response = await fetch(api.payment.url,{
            method : api.payment.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({cartItems:data})
        })

        const resData = await response.json();
        if(resData?.id){
            stripePromise.redirectToCheckout({sessionId: resData.id})
        }
    }



    return (
        <div className='container mx-auto'>
            <div className='text-center pt-2 text-lg'>
                {
                    data?.length === 0 && !loading &&(
                        <p className='bg-red-500 text-yellow-300 w-fit py-2 text-xl px-3 lg:py-5 lg:text-3xl lg:px-6 flex mx-auto text-center rounded-full'>Cart is empty</p>
                    )
                }
            </div>
            <div className='flex flex-col-reverse lg:flex-row gap-10 lg:justify-between p-2'>
                <div className='w-full mx-auto max-w-xl h-[calc(100vh-356px)] lg:h-[calc(100vh-244px)] overflow-y-scroll scrollbar-none'>
                    {
                        loading? ( loadingCart.map((el, ind)=> {
                            return (
                                <div className='w-full bg-slate-300 h-32 my-2 border-slate-200 animate-pulse rounded grid grid-cols-[128px,1fr]' key={el+ "Add to cart loading"+ind}>
                                    <h1>Loading...</h1>
                                </div>
                            )
                        })
                        ):(
                               
                            data?.map((el, ind)=>(
                                <div className=' w-full bg-white h-32 my-2 border-slate-600 rounded-lg grid grid-cols-[130px,1fr] ' key={ind+ "Add to cart loading"}>
                                    <div className='w-32 h-32 bg-white rounded-l-lg flex items-center justify-center'>
                                        <img src={el?.productId.productImage[0]} className='w-full h-28 object-scale-down mix-blend-multiply'/>
                                    </div>
                                    <div className='px-2 py-0.5 lg:px-4 lg:py-1 relative'>
                                        <div className='absolute right-1 text-red-600 text-md lg:text-xl rounded-full p-1 lg:p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(el?._id)}>
                                            <MdDelete className='text-xl lg:text-2xl'/>
                                        </div>
                                        <h2 className='text-md lg:text-xl text-ellipsis line-clamp-1'>{el.productId.productName}</h2>
                                        <p className='text-blue-500 capitalize'>{el.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            {el?.productId?.price? (
                                                <p className='text-teal-500 text-[15px]'>{CurrencyBD(el.productId.price)}</p>
                                            ):(
                                                <p className='text-teal-500 text-[15px]'>{CurrencyBD(el.productId.regularPrice)}</p>
                                            )
                                            }
    
                                            {el?.productId?.price? (
                                                <p className='text-yellow-500 text-[15px]'>{el?.quantity} x {el.productId.price}</p>
                                            ):(
                                                <p className='text-yellow-500 text-[15px]'>{el?.quantity} x {el.productId.regularPrice}</p>
                                            )
                                            }
                                        </div>
                                        <div className='flex items-center gap-1 lg:gap-2 mt-2'>
                                            <button className='p-1 border border-red-600 text-red-500 w-5 h-5 md:w-6 md:h-6 flex text-center justify-center items-center rounded hover:bg-red-600 hover:text-white'onClick={()=>decraseQty(el?._id, el?.quantity)}>-</button>
                                            <span>{el?.quantity}</span>
                                            <button className='p-1 border border-red-600 text-red-500 w-5 h-5 md:w-6 md:h-6 flex text-center justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>increaseQty(el?._id, el?.quantity)}>+</button>
                                        </div>
    
                                        {el?.productId?.price? (
                                            <p className=' text-[15px] absolute right-2 top-[92px] lg:right-4 lg:top-[85px]'>{CurrencyBD(el.productId.price * el?.quantity)} Taka</p>
                                            ):(
                                            <p className=' text-[15px] absolute right-2 top-[92px] lg:right-4 lg:top-[85px]'>{CurrencyBD(el.productId.regularPrice * el?.quantity)} Taka</p>
                                            )
                                        }
                                        <Link to={`/product/${el?.productId?._id}`} className='text-[12px] absolute right-2 top-[110px] text-slate-400 hover:underline hover:text-red-400'>See details</Link>
                                    </div>
                                </div>
                            ))
                                
                        )
                    }
                </div>
                <div className='mt-0 lg:mt-0 w-full lg:max-w-sm flex items-center justify-center lg:justify-normal lg:items-start'>
                    {
                        loading? (
                            <div className='h-36 bg-green-500 border-slate-700 animate-pulse'>
                                it is loading total
                            </div>
                        ): (
                            <div className='max-h-44 min-h-40 bg-white rounded-lg'>
                                <h2 className='text-white bg-red-500 flex justify-center py-1 rounded-t-lg'>Product summery</h2>
                                <div className='grid w-80 row py-4 gap-4'>
                                    <div className='px-6 flex w-full justify-between'>
                                        <p className='text-yellow-500 text-xl'>Total Items :</p>
                                        <p className='text-blue-500 text-xl'>{totalQuantity}</p>
                                    </div>
                                    <div className='px-6 flex w-full justify-between'>
                                        <p className='text-red-500 text-xl'>Total Amount :</p>
                                        {!data?.productId?.regularPrice ? 
                                            (
                                                <p className='text-green-500 text-lg'>{CurrencyBD(data?.reduce((prev, cur)=> prev + (cur.quantity * cur.productId.price), 0))}</p>
                                            )
                                            : 
                                            (
                                                <p className='text-green-500 text-lg'>{CurrencyBD(data?.reduce((prev, cur)=> prev + (cur.quantity * cur.productId.regularPrice), 0))}</p>
                                            )
                                        }
                                    </div>
                                    {(totalQuantity === 0) ?
                                        <Link to={"/"} className='font-semibold text-lg hover:text-white hover:bg-blue-500 bg-yellow-400 delay-100 transition-colors flex block m-auto justify-center items-center h-[30px] rounded-sm w-72' onClick={handlePayment} >Add To Cart</Link> :
                                        <button className='font-semibold text-lg hover:text-white hover:bg-blue-400 bg-green-400 delay-100 transition-colors flex block m-auto justify-center items-center h-[30px] rounded-sm w-72' onClick={handlePayment} >Payment</button>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AddCartView
