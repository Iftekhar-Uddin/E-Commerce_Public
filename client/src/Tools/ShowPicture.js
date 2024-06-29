import React from 'react'

const ShowPicture = ({imgUrl, onClose}) => {
  return (
    <div className='block w-full max-w-lg h-5/6'>
        <div className='relative flex justify-center pt-1 pl-2'>
            <img src={imgUrl} className='h-[580px] w-full border rounded'/>
            <div className='absolute top-1 right-0'><h3 className='text-white text-md px-1 bg-red-500 rounded-lg cursor-pointer' onClick={onClose}>Close</h3></div>
        </div>
    </div>
  )
}

export default ShowPicture
