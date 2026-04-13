import React from "react";
import { useContext } from "react";
import { storeContext } from "@/context/StoreContextProvider";
import { Props } from "@/types/type";
import FoodItem from "./FoodItem";
const FoodDisplay = ({ category, searchQuery }: Props) => {
  const context = useContext(storeContext)!;
  const { foodList } = context;

  // Filter food items based on category and search query
  const filteredFoodList = foodList?.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch = !searchQuery || 
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mt-7.5">
      <h2 className="font-bold text-2xl pb-4">
        {searchQuery ? `Search results for "${searchQuery}"` : "Top dishes near you"}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-12 mt-7.5 gap-7.5 ">
        {filteredFoodList?.map((item, index) => (
          <FoodItem
            key={index}
            _id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
          />
        ))}
        {filteredFoodList?.length === 0 && searchQuery && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No items found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
