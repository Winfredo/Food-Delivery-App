"use client"
import React from 'react'
import { FoodType } from '@/types/type'
import Image from 'next/image'
const FoodItem = ({_id,name,image,price,description,category}: FoodType) => {
  return (
    <div className='w-full m-auto rounded-[15px] shadow-[0px_0px_10px_#000015] animation-fadeIn  hover:shadow-[0px_0px_20px_#000015] cursor-pointer p-3'>
      <div className=''>
        <img src={image} alt={name} />
      </div>
      <div>
      <h3>{name}</h3>
      <Image src="/assets/rating_starts.png" alt="rating" width={70} height={70} />
      <p>{description}</p>
      <div className='food-item-price'>${price}</div>
      <p>{category}</p>

      </div>
    </div>
  )
}

export default FoodItem
