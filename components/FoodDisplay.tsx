import React from "react";
import { useContext } from "react";
import { storeContext } from "@/context/StoreContextProvider";
import { Props } from "@/types/type";
import FoodItem from "./FoodItem";
const FoodDisplay = ({ category }: Props) => {
  const context = useContext(storeContext)!;
  const { foodList } = context;
  return (
    <div className="mt-7.5">
      <h2 className="font-bold text-2xl pb-4">Top dishes near you</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-12 mt-7.5 gap-7.5 ">
        {foodList?.map((item, index) => {
          if (category === "All" || item.category === category) {
            return (
              <FoodItem
                key={index}
                _id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
