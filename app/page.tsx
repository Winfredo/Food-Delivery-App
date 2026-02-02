"use client"
import React,{useState} from "react";
import Header from "@/components/Header";
import Exploremenu from "@/components/Exploremenu";


const page = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <Exploremenu category={category} setCategory={setCategory} />

    </div>
  );
};

export default page;
