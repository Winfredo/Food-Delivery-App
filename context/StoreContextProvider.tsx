"use client";
import React, { createContext, useEffect, useState } from "react";
import { foodList } from "@/constants/constants";
import { CartItems } from "@/types/type";
import { StoreContextType } from "@/types/type";

export const storeContext = createContext<StoreContextType | null>(null);

const StoreContextProvider = (props: any) => {
  const [cartItems, setCartItems] = useState<CartItems>({});

  const addToCart = (foodId: string) => {
    if (!cartItems[foodId]) {
      setCartItems((prev) => ({ ...prev, [foodId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [foodId]: prev[foodId] + 1 }));
    }
  };

 const removeFromCart = (foodId: string) => {
  setCartItems((prev) => {
    if (prev[foodId] === 1) {
      const newItems = { ...prev }
      delete newItems[foodId] 
      return newItems
    }
    return { ...prev, [foodId]: prev[foodId] - 1 }
  })
};

useEffect(()=> {
    console.log(cartItems)
},[cartItems])
  const storeValue: StoreContextType = {
    foodList: foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <storeContext.Provider value={storeValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
