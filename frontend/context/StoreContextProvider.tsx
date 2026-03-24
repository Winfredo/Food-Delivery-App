"use client";
import React, { createContext, useEffect, useState } from "react";
import { CartItems, FoodType } from "@/types/type";
import { StoreContextType } from "@/types/type";
import axios from "axios";

export const storeContext = createContext<StoreContextType | null>(null);

const StoreContextProvider = (props: any) => {
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [token, setToken] = useState<string>("");
  const [foodList, setFoodList] = useState<FoodType[]>([]);
  const url = "http://localhost:4000";
  

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
      await axios.delete(url + "/api/cart/remove", {
        data: { itemId: foodId },
        headers: { token }
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const foodId in cartItems) {
      const item = foodList.find((food) => food._id === foodId);
      if (item) {
        totalAmount += item.price * cartItems[foodId];
      }
    }
    return totalAmount;
  }

  const fetchFoodList = async () => {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
  }

  const loadCartData = async (token: string) => {
    if (!token) return;

    try {
      const response = await axios.get(url + "/api/cart/list", {
        headers: { token },
      });

      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("loadCartData failed:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    fetchData();
  }, []);
  
  const storeValue: StoreContextType = {
    foodList: foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <storeContext.Provider value={storeValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
