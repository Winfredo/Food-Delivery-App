"use client"
import React from 'react'
import { FoodType } from '@/types/type'
import Image from 'next/image'
const FoodItem = ({_id,name,image,price,description,category}: FoodType) => {
  return (
    <div className='w-full m-auto rounded-[15px] shadow-[0px_0px_10px_#00000015] animation-fadeIn cursor-pointer'>
      <div>
        <img className='w-full rounded-t-[15px]' src={image} alt={name} />
      </div>
      <div className='p-3'>
        <div className='flex justify-between items-center mb-2.5'>
      <h3 className='font-bold text-[17px]'>{name}</h3>
      <Image className='w-16' src="/assets/rating_starts.png" alt="rating" width={70} height={70} />

        </div>
      <p className='text-[12px] text-[#676767]'>{description}</p>
      <div className='text-[18px] my-2 font-semibold text-[#FF6347]'>${price}</div>
      <p>{category}</p>

      </div>
    </div>
  )
}

export default FoodItem
