import React, { useCallback, useContext, useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import api from '../../api/api';
import CurrencyBD from '../../Tools/CurrencyBd'
import Context from '../../context/index'
import VerticalProduct from './VerticalProduct';
import CategoryWiseRecommendedProduct from './CategoryWiseRecommendedProduct';
import addToCart from '../cart/AddToCart'
import { useSelector } from 'react-redux';


const ProductDetails = () => {
  const { fetchUserAddToCart } = useContext(Context);
  const userDetails = useSelector(state=> state.user.user);
  const navigate = useNavigate()
  const [data, setData] = useState({ productName : "", model: "", brandName : "", category : "", productImage : [], description : "", regularPrice : "", price : "", availability: ""});
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  // console.log(userDetails)

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x : 0, y : 0 });

  const [zoomImage, setZoomImage] = useState(false);

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({ x, y})
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }


  const fetchProductDetails = async()=>{
    setLoading(false)
    const res = await fetch(api.productDetails.url,{
      method : api.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataRes = await res.json()

    setData(dataRes?.data)
    setActiveImage(dataRes?.data?.productImage[0])
  }

  useEffect(()=>{
      fetchProductDetails()
  },[params]);

  const handleMouseEnter = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleBuyProduct = async (e, id)=> {
    await addToCart(e, id)
    fetchUserAddToCart();
    navigate("/cart")
  }

  const handleAddToCart = async (e, id)=> {
    await addToCart(e, id)
    fetchUserAddToCart()
  }
  

  // overflow-y-scroll h-[calc(100vh-128px)] *can be added at firsr line className*
  return (
    <div className='container mx-auto p-1 lg:p-3'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-1.5 lg:gap-4'>
        <div className='h-fit lg:h-[430px] flex flex-col lg:flex-row-reverse'>

          <div className='flex items-center justify-center h-[250px] lg:h-[430px] lg:w-[400px] p-1 lg:p-2 relative'>
            <img className='h-full w-full object-scale-down mix-blend-multiply' src={activeImage} onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
            {
              zoomImage && (
                <div className=' hidden lg:block absolute min-w-[450px] min-h-[430px] overflow-hidden z-10 -right-[470px] top-0 bg-white rounded-md'>
                  <div
                    className='flex w-full h-full min-h-[430px] min-w-[430px] rounded mix-blend-multiply scale-100'
                      style={{
                        background : `url(${activeImage})`,
                        backgroundRepeat : 'no-repeat',
                        backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                      }}
                    >
                  </div>
                </div>
              )
            }
          </div>

          <div className='h-fit lg:h-[430px]'>
            {
              loading? (
                <div className='flex gap-1 lg:gap-1.5 lg:flex-col overflow-scroll scrollbar-none h-full lg:h-[420px]'>
                  {
                    productImageListLoading?.map((proimg, ind)=>(
                      <div className='h-20 w-20  bg-slate-100 animate-pulse rounded' key={ind}>
                      </div>
                    ))
                  }
                </div>
                ):(
                <div className='flex justify-between pt-1 lg:pt-0 lg:pr-1 lg:gap-1.5 lg:flex-col overflow-scroll scrollbar-none h-full lg:h-[430px]'>
                  {
                    data?.productImage?.map((imgURL, ind)=>(
                      <div className='flex justify-center items-center h-16 w-16 lg:h-20 lg:w-20 p-1 rounded bg-gray-200' key={ind}>
                        <img className='w-16 h-16 object-scale-down mix-blend-multiply cursor-pointer rounded-sm lg:rounded-md' src={imgURL} onMouseEnter={()=> handleMouseEnter(imgURL)} onClick={()=> handleMouseEnter(imgURL)}/>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>

        <div className='grid lg:flex-col lg:max-h-[430px] w-full lg:min-w-[250px]'>
          <h2 className='text-2xl lg:text-3xl px-1'>{data.productName}</h2>
          <div className='w-full flex px-1'>
            <div className='w-full flex flex-col gap-0.5 lg:gap-1'>
              <p className=' py-0.5 text-blue-500'>Model : {data?.model}</p>
              <p className='capitalize text-slate-500'>{data.category}</p>
              <div className='flex'>
                <h4 className=''>Brand :</h4>
                <p className='px-0.5 ml-1.5 rounded-full'>{data.brandName}</p>
              </div>
              <div className='text-yellow-400 flex items-center gap-1 pt-2'>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStarHalf/>
              </div>
              {(data.availability === "In Stock")?
                (
                  <div className='flex items-center'><label className='text-sm'>Availability :&nbsp;</label><p className='text-center text-sm text-green-600'>{data.availability}</p></div>
                ):(
                  <div className='flex items-center'><label className='text-sm'>Availability :&nbsp;</label><p className='text-center text-sm text-red-500'>{data.availability}</p></div>
                )
              }
            </div>

            <div className='h-[180px] w-full justify-center lg:justify-evenly items-center flex flex-col'>
              <div className='rotate-12 w-16 h-16 rounded-full bg-red-500 text-yellow-200 flex flex-col text-center justify-center'>
                {!data.price && data.regularPrice ? (
                  <p className=' text-sm text-center'>No Offer</p>
                  ) : (
                    <p className=' text-sm'>{((100-(data.price/(data.regularPrice))*100)).toFixed(2)}% Discount</p>
                  )                            
                }
              </div>
              <div className='grid'>
                {data.price? (
                  <>
                    <p className='text-red-400 line-through text-xl lg:text-2xl'>{CurrencyBD(data.regularPrice)}</p>
                    <p className='text-teal-500 text-xl lg:text-2xl'>{CurrencyBD(data.price)}</p>
                  </>
                  ):(
                    <p className='text-teal-500 text-xl lg:text-2xl'>{CurrencyBD(data.regularPrice)}</p>
                  )
                }
              </div>
            </div>

          </div>

          <div className='flex items-center gap-3 lg:gap-5 my-2 px-1'>
                {(data.availability === "In Stock")?
                  (<><button className='border-2 border-red-600 rounded px-2 py-0.5 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e, data?._id)}>Buy</button>
                  <button className='border-2 border-red-600 rounded px-2 py-0.5 min-w-[100px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e)=>handleAddToCart(e, data?._id)}>Add To Cart</button></>)
                  :
                  (<><button className='border-2 border-red-600 hover:border-green-600 rounded px-2 py-0.5 min-w-[100px] text-red-600 font-medium hover:bg-green-600 hover:text-white'>Notify</button>
                  <button className='cursor-not-allowed border-2 border-yellow-400 hover:border-blue-500 rounded px-2 py-0.5 min-w-[100px] font-medium bg-yellow-400 hover:bg-blue-500 hover:text-white'>Not Available</button></>)
                }

          </div>
          <article className='px-1'>Description:<p className='text-zinc-700'> {data.description}</p></article>
        </div>

      </div>
      {
        data?.category && <CategoryWiseRecommendedProduct category={data?.category} heading={"Recommended Product"}/>
      }
    </div>

  )
}

export default ProductDetails
