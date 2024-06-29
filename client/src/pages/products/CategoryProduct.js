import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import CategoryWiseRecommendedProduct from './CategoryWiseRecommendedProduct'
import VerticalProduct from './VerticalProduct'
import api from '../../api/api'
import SearchProduct from '../../components/SearchProduct';
// const context = useContext(Context)
// const loadingCart = new Array(4).fill(null);
// const params = useParams();

const CategoryProduct = () => {
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
    { id : 17, label : "Washmachine", value : "washer"},
    { id : 18, label : "Laptops", value : "laptops"},
  ];

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const UrlSearch = new URLSearchParams(location.search);
  const URLCategoryListArray = UrlSearch.getAll("category");

  const URLCategoryListObject = {}
  URLCategoryListArray.forEach(el =>{
    URLCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(URLCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleSelectCategory = (e) => {
    const {name, value, checked} = e.target;

    setSelectCategory((prev)=>{
      return{
        ...prev,
       [value] : checked
      }
    })
  };

  useEffect(()=>{
    const categoriesArray = Object.keys(selectCategory)?.map(cateName=>{
      if(selectCategory[cateName]){
        return cateName
      }
      return null
    })?.filter(el => el);

    setFilterCategoryList(categoriesArray);

    const UrlFormat = categoriesArray?.map((category, index)=>{
      if((categoriesArray?.length-1) === index){
        return `category=${category}`
      }
      return `category=${category}&&`
    });

    navigate(`/productcategory?${UrlFormat.join("")}`)

  },[selectCategory]);

  const handleChangeSortBy = (e)=>{
    const {value} = e.target;
    setSortByPrice(value)

    if(value === "ascending"){
      setData(prev => prev.sort((a,b)=> a.price - b.price))
    }

    if(value === "descending"){
      setData(prev => prev.sort((a,b)=> b.price - a.price))
    }
  }

  useEffect(()=>{

  },[sortByPrice])


  const fetchData = async() =>{
    const response = await fetch(api.filterProduct.url,{
      method : api.filterProduct.method,
      credentials : 'include',
      headers : {
          "content-type" : 'application/json'
      },
      body : JSON.stringify({
        category : filterCategoryList
      })
    })

    const responseData = await response.json()
    if(responseData){
      setData(responseData.data)
    }
  };

  useEffect(()=>{
    fetchData()
  },[filterCategoryList])


  return (
    <div className='container mx-auto p-1 lg:p-2'>
      <div className='lg:grid grid-cols-[200px,1fr] gap-6'>
        <div className='bg-white p-2 md:min-h-[calc(100vh-144px)]'>

          <div>

            <h3 className='text-sm lg:text-lg uppercase font-medium pb-0.5 text-slate-500 border-b border-black'>Sort By Price</h3>
            <form className='grid grid-cols-2 lg:flex lg:flex-col lg:gap-0 py-2'>
              <div className='flex items-center gap-2'>
                <input type='radio' name='sort' checked={sortByPrice === "ascending"} value={"ascending"} onChange={handleChangeSortBy}/>
                <label className='text-[15px] lg:text-[17px]'> {"Low <====> High"}</label>
              </div>
              <div className='flex items-center gap-2'>
                <input type='radio' name='sort' checked={sortByPrice === "descending"} value={"descending"} onChange={handleChangeSortBy}/>
                <label className='text-[15px] lg:text-[17px]'> {"High <====> Low"}</label>
              </div>
            </form>

          </div>

          <div className='pt-0 lg:pt-3'>

            <h3 className='text-sm lg:text-lg uppercase font-medium pb-0.5 text-slate-500 border-b border-black'>Filter By Category</h3>
            <form className='grid grid-cols grid-flow-col overflow-x-scroll gap-x-2 lg:flex lg:flex-col lg:gap-2 py-1 lg:p-2'>
              {
                productCategory.map((category)=>(
                  <div className='flex items-center gap-1 lg:gap-3'>
                    <input type='checkbox' name={"category"} checked={selectCategory[category?.value]} value={category.value} id={category.value} onChange={handleSelectCategory}/>
                    <label htmlFor={category.value} className='text-[15px] lg:text-[17px]'>{category.label}</label>
                  </div>
                ))
              }
            </form>

          </div>
        </div>

        <div className='h-[calc(100vh-160px)] overflow-y-scroll mt-2'>
          {
            data?.length !==0 && !loading && (
              <SearchProduct data={data} loading={loading}/>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default CategoryProduct;

// grid grid-cols-[repeat(auto-fit,minmax(0px,190px))]