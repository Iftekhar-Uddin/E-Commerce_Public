import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from "../../Tools/imageTobase64";
import api from '../../api/api';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';


const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({ email : "", password : "", name : "", confirmPassword : "", profilePic : ""});


    const handleUploadPic = async (e)=>{
        const file = e.target.files[0];
        const newFile = new File([file], 'image', { type: file.type });
        const imagePic = await imageTobase64(newFile)
        
        setData((preve)=>{
          return{
            ...preve,
            profilePic : imagePic
          }
        })
    }

    const handleChange = (e)=>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(data.password === data.confirmPassword){

            const dataResponse = await fetch(api.signUp.url,{
                method : api.signUp.method,
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
            const resdata = await dataResponse.json();
            if(data){
                toast.success(resdata.message)
                navigate("/login")
            }
        }else{
            toast.error("Please check password and confirm password")
        }
    };


    // pt-2 pl-5 pr-5 mt-5 


    return (
        <section id='signup' >
          <div className='mx-auto min-h-[calc(100vh-128px)] flex items-center justify-center'>
            <div className='bg-gray-600 pt-2 px-4 pb-1 w-full h-auto max-w-xs mx-auto rounded-lg md:pt-7 md:px-7 md:pb-3 md:w-full md:h-auto md:max-w-sm md:mx-auto md:rounded-xl'>
                <div className='w-20 h-20 lg:w-24 lg:h-24 mx-auto relative overflow-hidden rounded-full bg-white'>
                    <div>
                        <img src={data?.profilePic} alt=''/>
                    </div>
                    <form>
                        <label>
                            <div className='text-sm pb-0.5 md:pb-1 bg-opacity-80 bg-gray-400 pt-0.5 md:pt-1 cursor-pointer text-center absolute bottom-0 w-full'>Upload</div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                        </label>
                    </form>
                </div>
                <form className='flex flex-col gap-1.5 md:gap-3' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label className='text-white'>Name: </label>
                        <div className='bg-white p-1 md:p-2 rounded-md'>
                            <input className='w-full h-full outline-none' type='text' placeholder='Enter your name' name='name' value={data.name} onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className='grid'>
                        <label className='text-white'>Email: </label>
                        <div className='bg-white p-1 md:p-2 rounded-md'>
                            <input className='w-full h-full outline-none' type='email' placeholder='Enter your email' name='email' value={data.email} onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className='grid relative'>
                        <label className='text-white'>Password: </label>
                        <div className='bg-white p-1 md:p-2 rounded-md flex'>
                            <input className='w-full h-full outline-none' type={showPassword ? "text" : "password"} placeholder='Enter your password' name='password' value={data.password} onChange={handleChange} required/>
                        </div>
                        <div className='cursor-pointer text-lg absolute top-[30px] right-4 md:text-xl md:top-9 md:right-5' onClick={()=>setShowPassword((preve)=>!preve)}>
                            <span>{showPassword ? <FaEyeSlash/> : <FaEye/>}</span>
                        </div>
                    </div>
                    <div className='grid relative'>
                        <label className='text-white'>Confirm Password: </label>
                        <div className='bg-white p-1 md:p-2 rounded-md flex'>
                            <input className='w-full h-full outline-none' type={showConfirmPassword ? "text" : "password"} placeholder='Repeat your name' name='confirmPassword' value={data.confirmPassword} onChange={handleChange} required/>
                        </div>
                        <div className='cursor-pointer text-lg absolute top-[30px] right-4 md:text-xl md:top-9 md:right-5' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                            <span>{showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}</span>
                        </div>
                    </div>
                    <button className='bg-white w-full max-w-[150px] rounded-lg transition-all p-1 md:p-2 mt-5 mx-auto'>Sign Up</button>
                </form>
                <p className='pt-3 md:pt-5 w-fit ml-auto text-green-500'>Already have account ? <Link to={"/login"} className=' text-yellow-400 hover:underline'>Login</Link></p>
            </div>
          </div>
        </section>
    )
}

export default Register

