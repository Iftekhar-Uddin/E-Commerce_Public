import React, { useContext, useEffect, useState} from 'react'
import './App.css';
import {Outlet } from "react-router-dom";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api/api.js';
import Context from './context/index.js';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice.js';



function App() {
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({});
  const [cartProductCount, setCartProductCount] = useState(0)


  const fetchUserDetails = async ()=>{
    try {
      const dataResponse = await fetch(api.details_user.url,{
        method : api.details_user.method,
        credentials : 'include'
      });
      const dataApi = await dataResponse.json();
      console.log(dataApi)
      if(dataApi){
        dispatch(setUserDetails(dataApi?.data))
      }
      setUserInfo(dataApi);
    } catch (error) {
      console.log(error.message)
    }
  }


  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(api.addToCartProductCount.url,{
      method : api.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails();
    /**user Details cart product */
    fetchUserAddToCart()
  },[])

  
  return (
    <>
      <Context.Provider value={{cartProductCount, fetchUserAddToCart, fetchUserDetails}}>
        <ToastContainer position='top-center'/>
        <Header/>
          <main className='min-h-[calc(100vh-128px)]'>
            <Outlet/>
          </main>
        <Footer/>
      </Context.Provider>
    </>  
  );
}

export default App;
