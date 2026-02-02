"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Exploremenu from "@/components/Exploremenu";
import StoreContextProvider from "@/context/StoreContextProvider";

const page = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <StoreContextProvider>
        <Header />
        <Exploremenu category={category} setCategory={setCategory} />
      </StoreContextProvider>
    </div>
  );
};

export default page;
 