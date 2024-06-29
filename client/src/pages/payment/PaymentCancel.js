import React from 'react'
import faildPic from "../../assets/faild/faild.png"
import { Link } from 'react-router-dom'

const PaymentCancel = () => {
  return (
    <div className='py-2'>
      <div className='bg-slate-200 w-full max-w-md mx-auto flex flex-col py-2 justify-center items-center rounded-t-md'>
        <img src={faildPic} alt='' width={200} height={200}/>
        <p className='text-lg text-red-500 font-semibold'>Payment Failed</p>
      </div>
      <Link to={"/cart"} className='w-full max-w-md mx-auto flex justify-center py-0.5 mt-0.5 delay-100 transition-colors bg-yellow-400 hover:bg-blue-500 text-black-400 hover:text-white rounded-b-md font-semibold'>Go to cart</Link>
    </div>
  )
}

export default PaymentCancel
