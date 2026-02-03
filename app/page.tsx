"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Exploremenu from "@/components/Exploremenu";
import FoodDisplay from "@/components/FoodDisplay"

const page = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
        <Header />
        <Exploremenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
    </div>
  );
};

export default page;
 