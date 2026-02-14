"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Exploremenu from "@/components/Exploremenu";
import FoodDisplay from "@/components/FoodDisplay";
import Navbar from "@/components/Navbar";
import LoginPopup from "@/components/LoginPopup";

const page = () => {
  const [category, setCategory] = useState("All");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <div >
      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} />}
      <Navbar setShowLoginPopup={setShowLoginPopup} />

      <div className="pt-16">
      <section id="herosection"><Header /></section>
      <section id="explore" className="pt-5"><Exploremenu category={category} setCategory={setCategory} /></section>
      <FoodDisplay category={category} />

      </div>
    </div>
  );
};

export default page;
