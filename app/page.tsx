"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Exploremenu from "@/components/Exploremenu";
import FoodDisplay from "@/components/FoodDisplay";

const page = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="pt-16">

      <section id="herosection"><Header /></section>
      <section id="explore" className="pt-5"><Exploremenu category={category} setCategory={setCategory} /></section>
      <FoodDisplay category={category} />
    </div>
  );
};

export default page;
