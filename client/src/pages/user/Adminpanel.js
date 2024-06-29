import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Adminpanel = () => {
  const user = useSelector(state=> state.user.user);
  const navigate = useNavigate();


  if(user === null)(
      navigate("/")
  );

    

  return (
    <div className=' min-h-[calc(100vh-128px)] md:flex  '>
      <aside className=' w-full min-h-[calc(100vh-715px)] md:min-h-[calc(100vh-128px)] md:max-w-64 customShadow'>
        <div className='h-32  flex flex-col items-center justify-center'>
            <div className='text-3xl cursor-pointer relative flex justify-center text-gray-600'>
                {user?.profilePic ? ( <img src={user?.profilePic} className='w-16 h-16 rounded-full' alt=''/>) : (<FaRegCircleUser/>)}
            </div>
            <p className='capitalize text-lg font-medium'>{user?.name}</p>
            <p className='text-sm'>{user?.role}</p>
        </div>
        <div className='grid'>
            <Link to={"/adminpanel/alluser"} className='px-2 py-1 hover:bg-slate-300'>All Users</Link>
            <Link to={"/adminpanel/getproduct"} className='px-2 py-1 hover:bg-slate-300'>Products</Link>
        </div>
      </aside>
      <main className='h-full w-full p-2'>
        <Outlet/>
      </main>
    </div>
  )
}

export default Adminpanel
