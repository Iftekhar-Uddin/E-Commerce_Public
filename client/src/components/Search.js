import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../api/api';
import SearchProduct from './SearchProduct';

const Search = () => {
    const query = useLocation();
    const search = query.search;
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchProduct = async()=>{
        setLoading(true)
        const res = await fetch(api.searchProduct.url+`${search}`)
        const resdata = await res.json()
        setLoading(false)

        setData(resdata.data)
    };

    useEffect(()=>{
        fetchProduct()
    },[search])

    return (
      <div className='container mx-auto p-1 lg:p-3'>
          {
              loading && (
                  <p className='text-lg text-center'>Loading...</p>
              )
          }
        <p className='text-xl lg:text-2xl font-semibold pb-1.5 px-auto mb-0 lg:py-1 lg:px-2 lg:mb-3 text-green-500 w-fit rounded-full'>Search Results : {data.length} items</p>
        {
          data ===0 && !loading (
              <p className='bg-white text-lg text-center p-4'>No items found</p>
          )
        }
  
        {
          data.length !==0 && !loading &&
          <div className=' overflow-y-scroll h-[calc(100vh-146px)] lg:h-[calc(100vh-208px)]'>
            <SearchProduct data={data} loading={loading}/>
          </div>
        }
  
      </div>
    )
  }

export default Search
// overflow-y-scroll h-[calc(100vh-208px)]