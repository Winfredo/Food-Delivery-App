import React from "react";
import { useContext } from "react";
import { storeContext } from "@/context/StoreContextProvider";
import { Props } from "@/types/type";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category, searchQuery }: Props) => {
  const context = useContext(storeContext)!;
  const { foodList, foodListLoading } = context;

  const filteredFoodList = foodList?.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch =
      !searchQuery ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (foodListLoading) {
    return (
      <div className="mt-7.5">
        <h2 className="font-bold text-2xl pb-4">Top dishes near you</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-12 mt-7.5 gap-7.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-full rounded-[15px] shadow-[0px_0px_10px_#00000015] animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-t-[15px]" />
              <div className="p-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-5 bg-gray-200 rounded w-1/4 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-7.5">
      <h2 className="font-bold text-2xl pb-4">
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : "Top dishes near you"}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-12 mt-7.5 gap-7.5">
        {filteredFoodList?.map((item, index) => (
          <FoodItem
            key={index}
            _id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
            priority={index < 4}
            loading={index < 4 ? "eager" : "lazy"}
          />
        ))}
        {filteredFoodList?.length === 0 && searchQuery && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">
              No items found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
