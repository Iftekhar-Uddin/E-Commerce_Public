import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import Updateuser from './Updateuser';
import { useNavigate } from 'react-router-dom';


const Alluser = () => {
    const user = useSelector(state=> state.user.user);
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({ email : "", name : "", role : "", _id  : ""})
    const navigate = useNavigate();

    if(user === null)(
        navigate("/")
    );


    const fetchAllUsers = async() =>{
        const fetchData = await fetch(api.allUser.url,{
            method : api.allUser.method,
            credentials : 'include'
        })
        const dataResponse = await fetchData.json()
        if(dataResponse){
            setAllUsers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
    };

    useEffect(()=>{
        fetchAllUsers()
    },[])


    return (
        <div className='pb-2 overflow-x-scroll h-[200px] lg:h-full'>
          <table className='w-full usertable'>
            <thead>
                <tr className=''>
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Create Date</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {allUser.map((user, index)=>(
                    <tr className='text-center'>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{moment(user.createdAt).format("LL")}</td>
                        <td><button className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-600 hover:text-white' onClick={()=>{setUpdateUserDetails(user); setOpenUpdateRole(true)}}><MdModeEdit/></button></td>
                    </tr>
                ))}
            </tbody>
          </table>
            {
                openUpdateRole && (
                    <Updateuser 
                        onClose={()=>setOpenUpdateRole(false)} 
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                    />
                )      
            }
        </div>
    )
}

export default Alluser
