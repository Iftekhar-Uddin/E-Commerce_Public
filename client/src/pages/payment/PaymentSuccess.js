import React from 'react'
import donePic from "../../assets/done/done1.png"
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <div className='py-2'>
      <div className='bg-slate-200 w-full max-w-md mx-auto flex flex-col py-2 justify-center items-center rounded-t-md'>
        <img src={donePic} alt='' width={200} height={200}/>
        <p className='text-lg text-green-500 font-semibold'>Payment Successful</p>
      </div>
      <Link to={"/order"} className='w-full max-w-md mx-auto flex justify-center py-0.5 mt-0.5 delay-100 transition-colors bg-yellow-400 hover:bg-green-500 text-black-400 hover:text-white rounded-b-md font-semibold'>Order details</Link>
    </div>

  )
}

export default PaymentSuccess
