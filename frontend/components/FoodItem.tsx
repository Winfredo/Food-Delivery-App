"use client";
import React, { useContext } from "react";
import { FoodType } from "@/types/type";
import Image from "next/image";
import { storeContext } from "@/context/StoreContextProvider";
const FoodItem = ({ _id, name, image, price, description }: FoodType) => {
  const { addToCart, removeFromCart, cartItems,url } = useContext(storeContext)!;

  return (
    <div className="w-full m-auto rounded-[15px] shadow-[0px_0px_10px_#00000015] animation-fadeIn cursor-pointer">
      <div className="relative">
        <img className="w-full rounded-t-[15px]" src={image}   alt={name} />

        {!cartItems?.[_id] ? (
          <img
            className="absolute right-2 cursor-pointer bottom-2 w-8"
            onClick={() => addToCart(_id)}
            src="/assets/add_icon_white.png"
            alt="add icon"
          />
        ) : (
          <div className="flex items-center justify-start gap-1 absolute right-2 cursor-pointer bottom-2 bg-white rounded-full">
            <img
              className="w-8 m-1"
              onClick={() => removeFromCart(_id)}
              src="/assets/remove_icon_red.png"
              alt="remove icon"
            />
            <p>{cartItems[_id]}</p>
            <img
              className="w-8 m-1"
              onClick={() => addToCart(_id)}
              src="/assets/add_icon_green.png"
              alt="add icon"
            />
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-[17px]">{name}</h3>
          <Image
            className="w-16"
            src="/assets/rating_starts.png"
            alt="rating"
            width={70}
            height={70}
          />
        </div>
        <p className="text-[12px] text-[#676767]">{description}</p>
        <div className="text-[18px] my-2 font-semibold text-[#FF6347]">
          ${price}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;