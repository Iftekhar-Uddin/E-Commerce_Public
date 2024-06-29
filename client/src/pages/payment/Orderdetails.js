import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import moment from 'moment';
import CurrencyBD from '../../Tools/CurrencyBd'

const OrderDetails = () => {
  const [data, setData] = useState([]);

  const orderDataFetch = async ()=>{
    const response = await fetch(api.order.url,{
      method : api.order.method,
      credentials : 'include',
      headers : {
        "content-type" : 'application/json'
      }
    });
    const responseData = await response.json()
    if(responseData){
        setData(responseData.data)
    }
  };

  useEffect(()=>{
    orderDataFetch()
  },[])



  return (
    <div className=''>
      <div className='text-center pt-4 lg:pt-2 text-lg'>
        {
          !data[0] && (
            <p className='bg-yellow-400 text-red-600 w-fit py-3 text-lg px-4 lg:py-5 lg:text-3xl lg:px-6 flex mx-auto text-center rounded-full '>No Order Available!</p>
          )
        }
      </div>

      <div className='h-[calc(100vh-128px)] overflow-y-scroll scrollbar-none'>
        {
          data?.map((item, ind)=>(
            <div key={ind} className='container mx-auto px-2 pb-2'>

              <div className='flex flex-col lg:flex-row w-lg max-w-full justify-around items-center'>

                <div className='flex flex-col w-full max-w-6xl'>
                  <div><p className='font-medium text-md text-yellow-500'>{moment(item.createdAt).format('LL')}</p></div>
                  <div className='flex flex-col lg:flex-row gap-1 lg:gap-2'>

                    <div className='w-full flex flex-col gap-1'>
                      {
                        item?.productDetails?.map((itm, ind)=>(
                          <div key={ind} className='bg-slate-200 flex justify-between rounded-md'>
                            <div className='flex flex-col justify-evenly px-1'>
                              <div className='text-lg lg:text-2xl text-green-500'>{itm.name}</div>
                              <div className='text-md lg:text-lg text-blue-600'>{CurrencyBD(itm.price)}</div>
                              <p className='text-red-500 text-sm lg:text-md'>Qty: {itm.quantity}</p>
                            </div>
                            <img className='w-32 h-32 bg-white rounded-r-md' src={itm?.image} alt=''/>
                          </div>
                        ))
                      }
                    </div>

                    <div className='w-full flex flex-col px-2 bg-white rounded-md'>
                      <div className='flex w-full justify-between'>
                        <div className=''>
                          <div className='underline flex text-green-500 text-lg font-semibold'>Payment details</div>
                          <p className='text-md text-slate-400'>Payment method: {(item.paymentDetails.payment_method_type[0])?.charAt(0).toUpperCase() + (item.paymentDetails.payment_method_type[0])?.slice(1)} </p>
                          <p className='text-md text-slate-400 '>Payment status: {(item.paymentDetails.payment_status)?.charAt(0).toUpperCase() + (item.paymentDetails.payment_status)?.slice(1)} </p>
                        </div>
                        <div >
                          <p className='underline justify-end flex text-lg font-semibold text-yellow-500'>Sipping info</p>
                          {
                            item.shipping_options.map((ship, ind)=>{
                              return(
                                <div className='text-blue-400' key={ship.shipping_rate}>
                                  Shipping Amount: {ship.shipping_amount}
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className='text-lg text-end text-red-500'>Total Amount: {CurrencyBD(item.total_amount)} Taka</div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          ))
        }
      </div>
    </div>
  )
}

export default OrderDetails
