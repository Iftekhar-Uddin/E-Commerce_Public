import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import api from '../../api/api';
import { toast } from 'react-toastify';



const Updateuser = ({name, email, role, userId, onClose, callFunc,}) => {
    const [roles, setRoles] = useState(role);
    const [names, setNames] = useState(name);
    const [emails, setEmails] = useState(email);

    const ROLE = {
        ADMIN : "ADMIN",
        GENERAL : "GENERAL"
    }

    const handleusernameChange = (e) => {
        setNames(e.target.value)
    };

    const handleuseremailChange = (e) => {
        setEmails(e.target.value)
    };


    const handleRoleChange = (e)=>{
        setRoles(e.target.value);
    }

    const updateUserRole = async() =>{
        const fetchResponse = await fetch(api.updateUser.url,{
            method : api.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                email: emails,
                name: names,
                role : roles,
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated",responseData)

    }


    return (
        <div className='absolute  w-[calc(100vw-20px)] h-[calc(100vh-680px)] flex justify-center items-center lg:justify-center lg:items-center lg:w-[calc(100vw-264px)] lg:h-[calc(100vh-175px)]'>
          <div className=' relative w-96 h-48 lg:w-96 lg:h-72 bg-slate-300 flex gap-3 flex-col rounded-md items-center justify-center'>
            <button className=' absolute top-2 right-2 text-lg text-red-600' onClick={onClose}><IoMdClose/></button>
            <div>
                <h2 className='text-center mb-2 lg:mb-4 text-slate-800 rounded-sm text-md lg:rounded-sm lg:text-lg'>Update user info</h2>
                <div className='grid h-16 gap-2'>
                    <input className='rounded-md bg-slate-100 pl-1 text-sm lg:text-md outline-none' type='text' name='name'  placeholder='Enter youe name' onChange={handleusernameChange}/>
                    <input className='rounded-md bg-slate-100 pl-1 text-sm lg:text-md outline-none' type='email' name='email' placeholder='Enter you email' onChange={handleuseremailChange}/>
                </div>
                <p className='pt-1 text-sm lg:text-md'>Role: &nbsp;
                    <select className='bg-slate-300' onChange={handleRoleChange}>
                        {
                            Object.values(ROLE).map((val)=>(
                                <option value={val} key={val}>{val}</option>
                            ))
                        }
                    </select>
                </p>
            </div>
            <button className='lg:mt-4 mb-0 py-1 lg:py-1 px-3 bg-green-400 hover:bg-green-500 hover:text-white rounded-md text-sm lg:text-md' onClick={updateUserRole}>Update</button>
          </div>
        </div>
    )
}

export default Updateuser


