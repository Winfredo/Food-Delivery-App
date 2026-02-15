"use client"
import React,{useContext} from 'react'
import {storeContext} from "@/context/StoreContextProvider";

const page = () => {

  const {cartItems,foodList, removeFromCart,addToCart} = useContext(storeContext)!
  return (
    <div className='cart'>
     <div className='cart-items'>
      <div className='cart-items-title'>
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
     <hr className="my-2.5 mx-auto border-none bg-[#e2e2e2] h-0.5 w-[90%]" />

     </div>
    </div>
  )
}

export default page
