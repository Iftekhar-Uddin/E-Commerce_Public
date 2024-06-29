import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import pic1 from "../../assets/banner/1.jpg"
import pic2 from "../../assets/banner/2.jpg"
import pic3 from "../../assets/banner/3.jpg"
import pic4 from "../../assets/banner/4.jpg"
import pic5 from "../../assets/banner/5.jpg"
import pic6 from "../../assets/banner/6.jpg"
import pic7 from "../../assets/banner/7.jpg"
import pic8 from "../../assets/banner/8.png"
import pic9 from "../../assets/banner/9.png"
import img1 from '../../assets/banner/img1.webp'
import img2 from '../../assets/banner/img2.webp'
import img3 from '../../assets/banner/img3.jpg'
import img4 from '../../assets/banner/img4.jpg'
import img5 from '../../assets/banner/img5.webp'

import img1Mob from '../../assets/banner/img1_mobile.jpg'
import img2Mob from '../../assets/banner/img2_mobile.webp'
import img3Mob from '../../assets/banner/img3_mobile.jpg'
import img4Mob from '../../assets/banner/img4_mobile.jpg'
import img5Mob from '../../assets/banner/img5_mobile.png'


const AdvertiseProduct = () => {
  const desktopImgfor = [ img1, img2, img3, img4, img5];
  const desktopImg = [ pic1, pic4, pic3, pic9, pic5 ];
  const mobileImgfor = [ img1, img2Mob, img3Mob, img4Mob, img5];
  const mobileImg = [ pic1, pic4, pic3, pic9, pic5 ];
  const [curImg, setCurImg] = useState(0);

  const nextImg =()=>{
    if(curImg !== desktopImg.length-1){
      setCurImg(prev=> prev + 1);
    }else if(curImg === desktopImg.length-1){
      setCurImg(0);
    }
  }

  const prevImg =()=>{
    if(curImg !== 0){
      setCurImg(prev=> prev - 1);
    }else if(curImg === 0){
      setCurImg(desktopImg.length-1)
    }
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(curImg <= desktopImg.length-1){
        nextImg()
      }else if(curImg >= desktopImg.length-1){
        prevImg()
      }
    },2500)
    return ()=>clearInterval(interval)
  },[curImg]);

  return (
    <div className='container mx-auto px-2 lg:px-5'>
      <div className=' w-full h-[calc(100vh-590px)] lg:h-[calc(100vh-650px)] bg-slate-200 rounded relative'>

        <div className='h-full w-full absolute z-10 flex items-center'>
          <div className='flex justify-between w-full text-xl lg:text-2xl'>
            <button className='text-white bg-inherit shadow-md rounded-full p-0.5 lg:p-1 transition-all' onClick={prevImg}><FaAngleLeft/></button>
            <button className='text-white bg-inherit shadow-md rounded-full p-0.5 lg:p-1 transition-all' onClick={nextImg}><FaAngleRight/></button>
          </div>
        </div>

        <div className='hidden md:flex w-full h-full overflow-hidden'>
          {
            desktopImg.map((img, ind)=> {return(
              <div className='w-full h-full min-w-full min-h-full transition-opacity ease-in-out' key={ind} style={{transform: `translateX(-${curImg * 100}%)`}}>
                <img className='w-full h-full rounded' src={img}/>
              </div>
            )})
          }
        </div>

        <div className=' flex w-full h-full overflow-hidden md:hidden'>
          {
            mobileImg.map((img, ind)=> {return(
              <div className='w-full h-full min-w-full min-h-full transition-opacity ease-in-out' key={ind} style={{transform: `translateX(-${curImg * 100}%)`}}>
                <img className='w-full h-full rounded' src={img}/>
              </div>
            )})
          }
        </div>

      </div>
    </div>
  )
}

export default AdvertiseProduct
 