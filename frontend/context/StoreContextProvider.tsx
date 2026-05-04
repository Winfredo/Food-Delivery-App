"use client";
import React, { createContext, useEffect, useState } from "react";
import { CartItems, FoodType } from "@/types/type";
import { StoreContextType } from "@/types/type";
import axios from "axios";
import useSWR from 'swr';

export const storeContext = createContext<StoreContextType | null>(null);

const StoreContextProvider = (props: any) => {
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [token, setToken] = useState<string>("");
  const [foodList, setFoodList] = useState<FoodType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // Fetcher function for SWR
  const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

  // Use SWR for food list caching
  const { data: swrFoodList, error: foodListError, isLoading: foodListLoading } = useSWR(`${url}/api/food/list`, fetcher);

  // Update foodList state when SWR data is available
  useEffect(() => {
    if (swrFoodList) {
      setFoodList(swrFoodList);
    }
  }, [swrFoodList]);


  const { data: cartData, error: cartError } = useSWR(
    token ? [`${url}/api/cart/list`, token] : null,
    ([url, token]) => axios.get(url, { headers: { token } }).then(res => res.data.cartData || {})
  );


  useEffect(() => {
    if (cartData) {
      setCartItems(cartData);
    }
  }, [cartData]);
  

  const addToCart = async (foodId: string) => {
    if (!cartItems[foodId]) {
      setCartItems((prev) => ({ ...prev, [foodId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [foodId]: prev[foodId] + 1 }));
    }

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId: foodId }, {
        headers: { token }
      }); 
    }
  }; 

  const removeFromCart = async (foodId: string) => {
    setCartItems((prev) => {
      if (prev[foodId] === 1) {
        const newItems = { ...prev };
        delete newItems[foodId];
        return newItems;
      }
      return { ...prev, [foodId]: prev[foodId] - 1 };
    });

   if (token) {
      await axios.post(url + "/api/cart/remove", { itemId: foodId }, {
        headers: { token }
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const foodId in cartItems) {
      const item = foodList?.find((food: any) => food._id === foodId);
      if (item) {
        totalAmount += item.price * cartItems[foodId];
      }
    }
    return Math.round(totalAmount * 100) / 100;
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  
  const storeValue: StoreContextType = {
    foodList: foodList || [],
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    searchQuery,
    setSearchQuery,
    foodListLoading
  };

  return (
    <storeContext.Provider value={storeValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
