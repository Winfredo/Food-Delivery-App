"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Exploremenu from "@/components/Exploremenu";
import FoodDisplay from "@/components/FoodDisplay";
import { useContext } from "react";
import { storeContext } from "@/context/StoreContextProvider";

const page = () => {
  const [category, setCategory] = useState("All");
  const { searchQuery } = useContext(storeContext)!;
  
  return (
    <div>
      <div className="pt-3">
        <section id="herosection">
          <Header />
        </section>
        <section id="explore" className="pt-5">
          <Exploremenu category={category} setCategory={setCategory} />
        </section>
        <FoodDisplay category={category} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default page;
