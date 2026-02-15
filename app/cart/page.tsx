import React,{useContext} from 'react'
import {storeContext} from "@/context/StoreContextProvider";

const page = () => {

  const {cartItems,foodList, removeFromCart,addToCart} = useContext(storeContext)!
  return (
    <div>
      <p>cart page</p>
    </div>
  )
}

export default page
