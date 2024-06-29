import React, { useContext, useState } from 'react'
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import Context from '../../context';



const Signin = () => {
    const {normal} = useContext(Context)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({email : "", password : ""});
    const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);

    console.log(normal)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prev)=>{
            return {...prev, [name] : value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(api.signIn.url,{
            method : api.signIn.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify(data)
        })

        const resData = await dataResponse.json()
        console.log(resData)

        if(resData.success){
            toast.success(resData.message)
            navigate('/')
            // window.location.reload()
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(resData.error){
            toast.error(resData.message)
        }
    }


    return (
        <section id='login'>
            <div className='min-h-[calc(100vh-128px)] flex items-center justify-center'>
                <div className='bg-gray-600 pt-2 px-4 pb-1 w-full h-auto max-w-xs mx-auto rounded-lg md:pt-7 md:px-7 md:pb-3 md:w-full md:h-auto md:max-w-sm md:mx-auto md:rounded-xl'>
                    <div className='h-32 mx-auto'>
                        <HiMiniUserCircle className="size-24 md:size-28 mx-auto text-white"/>
                    </div>
                    <form className='flex flex-col gap-1.5 md:gap-3' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label className="text-white">Email :</label>
                            <div className='bg-white p-1 md:p-2 rounded-md'>
                                <input className='w-full h-full outline-none' type='email' placeholder='Enter your email' name='email' value={data.email} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='grid relative'>
                            <label className="text-white">Password :</label>
                            <div className=' bg-white p-1 md:p-2 rounded-md'>
                                <input className='w-full h-full outline-none' type={showPassword ? "text" : "password"} placeholder='Enter your password' name='password' value={data.password} onChange={handleChange}/>
                            </div>
                            <div className='cursor-pointer text-lg absolute top-[32px] right-4 md:text-xl md:absolute md:top-9 md:right-5' onClick={()=>setShowPassword((preve)=>!preve)}>
                                <span>{showPassword ? <FaEyeSlash/> : <FaEye/>}</span>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit mr-auto pt-1 md:pt-2 text-gray-300 hover:underline hover:text-yellow-500'>
                                Forgot password ?
                            </Link>
                        </div>
                        <button className='bg-white w-full max-w-[150px] rounded-lg transition-all p-1 md:p-2 mx-auto'>Login</button>
                    </form>
                    <p className='pt-3 md:pt-5 w-fit ml-auto text-green-500'>Create an account? <Link to={"/signup"} className='text-yellow-400 hover:underline'>SignUp</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Signin
