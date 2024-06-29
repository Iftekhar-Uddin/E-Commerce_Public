import React from 'react'
import { useSelector } from 'react-redux'
import CategoryProduct from '../products/CategoryList';
import AdvertiseProduct from '../products/AdvertiseProduct';
import CategoryWiseProduct from '../products/CategoryWiseProduct';
import HorizontalCardProduct from '../products/HorizontalCardProduct';
import VerticalProduct from '../products/VerticalProduct';



const Home = () => {
  const userDetails = useSelector(state=> state.user.user);
  console.log(userDetails);

  return (
    <div>

      <CategoryProduct/>
      <div className='w-full h-[calc(100vh-212px)] lg:h-[calc(100vh-268px)] overflow-y-scroll scrollbar-none'>
      <AdvertiseProduct/>
      <HorizontalCardProduct category={"airpods"} heading={"Airpods"}/>
      <VerticalProduct category={"mobiles"} heading={"Popular Mobiles"}/>
      <HorizontalCardProduct category={"headphones"} heading={"Top Headphones"}/>
      <VerticalProduct category={"monitors"} heading={"Famous Monitors"}/>
      <HorizontalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalProduct category={"trimmers"} heading={"Trimmers"}/>
      <HorizontalCardProduct category={"printers"} heading={"Printers"}/>
      <VerticalProduct category={"fans"} heading={"Fans"}/>
      <HorizontalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalProduct category={"mouse"} heading={"Mouses"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Eairphones"}/>
      <VerticalProduct category={"lights"} heading={"Lights"}/>
      <HorizontalCardProduct category={"watches"} heading={"Watches"}/>
      <VerticalProduct category={"speakers"} heading={"Speakers"}/>
      <HorizontalCardProduct category={"camera"} heading={"Cameras"}/>
      <VerticalProduct category={"laptops"} heading={"Laptops"}/>
      <HorizontalCardProduct category={"airconditions"} heading={"Airconditions"}/>
      {/* <CategoryWiseProduct category={"airconditions"} heading={"New Arrivals"}/> */}
      </div>

    </div>
  )
}

export default Home
