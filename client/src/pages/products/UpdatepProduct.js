import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CloudinaryUpload from "../../Tools/CloudinaryUpload";
import api from '../../api/api';
import {toast} from 'react-toastify'
import ShowPicture from '../../Tools/ShowPicture';


const UpdatepProduct = ({productData, onClose, fetchdata}) => {
    const [openViewImage, setOpenViewImage] = useState(false)
    const [viewImage, setviewImage] = useState("");
    const [data, setData] = useState({...productData, productName : productData.productName, model: productData.model, brandName : productData.brandName, category : productData.category, productImage : productData.productImage, description : productData.description, regularPrice : productData.regularPrice, price : productData.price, availability: productData.availability});


    const productCategory = [
        { id : 1, label : "Airpods", value : "airpods"},
        { id : 2, label : "Camera", value : "camera"},
        { id : 3, label : "Earphones", value : "earphones"},
        { id : 4, label : "Mobiles", value : "mobiles"},
        { id : 5, label : "Mouse", value : "mouse"},
        { id : 6, label : "Printers", value : "printers"},
        { id : 7, label : "Headphones", value : "headphones"},
        { id : 8, label : "Refrigerator", value : "refrigerator"},
        { id : 9, label : "Speakers", value : "speakers"},
        { id : 10, label : "Trimmers", value : "trimmers"},
        { id : 11, label : "Televisions", value : "televisions"},
        { id : 12, label : "Watches", value : "watches"},
        { id : 13, label : "Monitors", value : "monitors"},
        { id : 14, label : "Airconditions", value : "airconditions"},
        { id : 15, label : "Lights", value : "lights"},
        { id : 16, label : "Fans", value : "fans"},
        { id : 17, label : "Washingmachine", value : "washer"},
        { id : 18, label : "Laptops", value : "laptops"},
    ]

    const handleOnChange = (e)=>{
        const { name, value} = e.target

        setData((preve)=>{
          return{
            ...preve,
            [name]  : value
          }
        })
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await CloudinaryUpload(file)

        setData((preve)=>{
          return{
            ...preve,
            productImage : [ ...preve.productImage, uploadImageCloudinary.url]
          }
        })
    }

    const DeleteProductImage = async (ind)=>{
        const addedProductImg = [...data.productImage];
        addedProductImg.splice(ind, 1);
        setData((prev)=>({...prev, productImage: [...addedProductImg]}));
    }

    const handleUpdate = async(e) =>{
        e.preventDefault()
        
        const response = await fetch(api.updateProduct.url,{
            method : api.updateProduct.method,
            credentials : 'include',
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
    
        const resData = await response.json()
    
        if(resData){
            toast.success(resData?.message)
            onClose()
            // window.location.reload()
            fetchdata()
        }
    
        if(resData.error){
          toast.error(resData?.message)
        }
    }


    return (
        <div className='fixed   bottom-0 top-0 left-0 right-0 lg:bottom-0 lg:top-0 lg:left-64 lg:right-0 flex justify-center items-center'>
        <div className='fixed bg-zinc-100 bg-opacity-100 w-[calc(100vw-0px)] h-[calc(100vh-0px)] lg:w-[calc(100vw-260px)] lg:h-[calc(100vh-130px)] flex justify-center items-center rounded'>
          <div className='bg-white p-2 rounded w-full max-w-xl h-5/6 overflow-hidden'>
            <div className='flex justify-between items-center p-2'>
                <h2 className='font-semibold text-lg text-yellow-500'>Edit product</h2>
                <div className='w-fit ml-auto text-lg hover:text-red-600 cursor-pointer' onClick={onClose}><CgClose/></div>
            </div>
            <form className='grid p-3 gap-4 overflow-y-scroll h-[90%]' onSubmit={handleUpdate}>
    
                <div className='grid gap-1'>
                    <label htmlFor='productName'>Product Name :</label>
                    <input type='text' id='productName' name='productName' placeholder='Enter product name' value={data.productName} onChange={handleOnChange}
                        className='p-1 bg-slate-200 border rounded outline-none pl-2'
                    />
                </div>
    
                <div className='grid gap-1'>
                    <label htmlFor='model'>Model :</label>
                    <input type='text' id='model' name='model' placeholder='Enter product name' value={data.model} onChange={handleOnChange}
                        className='p-1 bg-slate-200 border rounded outline-none pl-2'
                    />
                </div>
    
                <div className='grid gap-1'>
                    <label htmlFor='brandName'>Brand Name :</label>
                    <input type='text' id='brandName' name='brandName' placeholder='Enter brand name' value={data.brandName} required onChange={handleOnChange}
                        className='p-1 bg-slate-200 border rounded outline-none pl-2'
                    />
                </div>
    
                <div className='grid gap-1'>
                    <label htmlFor='description'>Description :</label>
                    <textarea type='text' name='description' placeholder='Enter product description' rows={3} value={data.description} onChange={handleOnChange}
                        className='p-1 bg-slate-200 border rounded outline-none pl-2'
                    ></textarea>
                </div>
    
                <div className='grid gap-1'>
                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-200 border rounded'>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((cat, ind)=>{
                                return(
                                    <option value={cat.value} key={cat.value+ind}>{cat.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
    
                <div className='grid gap-1'>
                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-200 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            {
                            data.productImage.length < 5 ?
                            (<div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt/></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' multiple id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                            </div>) : (<div className='cursor-disabled text-red-600 text-lg'><h2>Maximum image exceeded!</h2></div>)
                            }
                        </div>
                    </label>
                    <div className='flex gap-2 justify-between'>
                        {
                            data?.productImage[0] ? (data.productImage.map((img, ind)=>(
                                <div className='relative group'>
                                    <img className='bg-slate-200 border rounded-md cursor-pointer w-32 h-32' src={img} alt='img' onClick={()=>{setOpenViewImage(true); setviewImage(img)}}/>
                                    <div className='absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=> DeleteProductImage(ind)}><MdDelete className='h-3 w-3'/></div>
                                </div>))
                            ) : <p className='text-red-600'>*Upload product image</p>
                        }
                    </div>
                </div>
    
                <div className='grid gap-1'>
                    <label htmlFor='regularPrice'>Regular price :</label>
                    <input type='number' id='regularPrice' name='regularPrice' placeholder='Enter regular price' value={data.regularPrice} required onChange={handleOnChange}
                        className='p-1 bg-slate-200 border rounded outline-none pl-2'
                    />
                </div>
    
                <div className='grid gap-1'>
                    <label htmlFor='price'>Price :</label>
                    <input type='number' name='price' placeholder='Enter product price' value={data.price} onChange={handleOnChange}
                        className='p-1 bg-slate-200 border rounded outline-none pl-2'
                    />
                </div>
    
                <div className='grid gap-1'>
                    <label htmlFor='availability' className='mt-3'>Availability :</label>
                    <select required value={data.availability} name='availability' onChange={handleOnChange} className='p-2 bg-slate-200 border rounded'>
                        <option value={""}>Select Category</option>
                        <option value={"In Stock"}>In stock</option>
                        <option value={"Stock Out"}>Out of stock</option>
                        {/* {
                            productCategory.map((cat, ind)=>{
                                return(
                                    <option value={cat.value} key={cat.value+ind}>{cat.label}</option>
                                )
                            })
                        } */}
                    </select>
                </div>
    
                <button className='px-3 py-2 bg-yellow-400 text-black transition-all mb-2 hover:bg-green-500 hover:text-black border rounded'>Upload Product</button>
            </form>
          </div>
          {openViewImage &&
            <ShowPicture onClose={()=>setOpenViewImage(false)} imgUrl={viewImage}/>
          }
        </div>
        </div>
    )
}

export default UpdatepProduct
