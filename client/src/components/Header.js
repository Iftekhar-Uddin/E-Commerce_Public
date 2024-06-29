import React, {useContext, useState} from 'react'
import logo from '../assets/Epu Sign.png'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice.js';
import api from '../api/api';
import { toast } from 'react-toastify';
import Context from '../context/index.js';


const Header = () => {
  const user = useSelector(state=> state.user.user);
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate()
  const searchValue = useLocation();
  const URLSearch = new URLSearchParams(searchValue?.search);
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)
  // const [search, setSearch] = useState(searchValue.search.split("=")[1]);


  const handleLogout = async () => {
    const fetchdata = await fetch(api.logout_user.url, {
      method: api.logout_user.method,
      credentials: "include"
    });
    const data = await fetchdata.json()
    if(data){
      toast.success(data.message)
      dispatch(setUserDetails(null));
      localStorage.removeItem('user');
      navigate("/");
    }
    if(data.error){
      toast.error(data.message)
    }
  };


  const handleSearch =(e)=>{
    const {value}  = e.target;
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else if(value === ""){
      // navigate(`/search?q=${null}`)
      navigate("/")
    }else{
      navigate("/search")

    }
  }


  return (
    <header className='h-16 shadow-md'>
      <div className={user? "container mx-auto h-full flex justify-evenly  items-center lg:justify-between" : "container mx-auto h-full flex items-center justify-between px-1"}>
        <div className='w-16 lg:w-28 -rotate-6'>
            <Link to={"/"}><img className='h-[24px] lg:h-[38px] rounded-full' src={logo} alt=''/></Link>
        </div>
        <div className='flex items-center w-36 lg:w-80 h-[26px] lg:h-8 justify-between max-w-sm border bg-gray-200 rounded-full focus-within:shadow-sm'>
            <input className='w-full outline-none text-sm lg:text-lg pl-1 lg:pl-2 rounded-full bg-gray-200' type='text' placeholder='Search product' onChange={handleSearch} value={search}/>
            <div className='text-lg min-w-[34px] lg:min-w-[50px]  h-[26px] lg:h-8 flex items-center justify-center rounded-r-full bg-gray-600 text-white' onClick={handleSearch}><GrSearch className='cursor-pointer'/></div>
        </div>
        <div className='flex items-center gap-2 lg:gap-6'>
            { user?._id &&
              <Link to={"/cart"} className='relative'>
                <span className='text-2xl lg:text-3xl text-gray-600'><FaShoppingCart/></span>
                <div>
                  <p className='absolute text-sm lg:text-md bg-red-500 text-white h-4 w-4 lg:h-5 lg:w-5 rounded-full flex items-center justify-center -top-2 -right-2'>{context.cartProductCount}</p>
                </div>
              </Link>
            }
            <div className='relative group flex justify-center'>
              {!user ? null : 
                <div className='text-3xl cursor-pointer text-gray-600' onClick={()=> setMenuDisplay(prev=> !prev)}>
                  <>{user?.profilePic ? ( <img src={user?.profilePic} className='w-8 h-8 md:w-12 md:h-12 rounded-full' alt=''/>) : (<FaRegCircleUser/>)}</>
                </div>
              }
              {menuDisplay &&
                <div className='absolute top-[33px] lg:top-0 lg:left-12'>
                    <nav >{user?.role === "ADMIN" && <Link to={"/adminpanel"} className='flex text-center justify-center delay-100 transition-colors cursor-pointer px-1.5 whitespace-nowrap text-yellow-400 hover:text-white bg-gray-600 hover:bg-black' onClick={()=> setMenuDisplay(prev=> !prev)}>Admin panel</Link>}</nav>
                    <Link to={"/order"} className='flex text-center justify-center delay-100 transition-colors cursor-pointer px-1.5 whitespace-nowrap text-yellow-400 hover:text-white bg-gray-600 hover:bg-black ' onClick={()=> setMenuDisplay(prev=> !prev)}>See order</Link>
                </div>
              }
            </div>
            <div>
              {user?._id ? (<button onClick={handleLogout} className='text-md lg:text-1xl bg-gray-600 hover:bg-red-600 hover:text-yellow-300 cursor-pointer text-white px-1 md:px-2.5 py-0 md:py-1 rounded-full'>Logout</button>) : 
              (<Link to={"/login"}><button className='text-1xl bg-gray-600 hover:bg-gray-900 cursor-pointer text-white px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full'>Login</button></Link>)}
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header
