"use client";
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  return (
    <div className="w-full h-16">
      <div className="flex w-[80%] h-full  mx-auto items-center justify-between">
        {/* Div for the logo image. */}
        <div>
          <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
        </div>

        {/* Div for the nav links */}

        <ul className="flex items-center gap-4">
          <li
            className={`pb-2 cursor-pointer transition duration-300 border-b-2 ${activeItem === "home" ? "border-[#FF6347]" : "border-transparent hover:border-[#FF6347]"}`}
            onClick={() => setActiveItem("home")}
          >
            home
          </li>
          <li
            className={`pb-2 cursor-pointer transition duration-300 border-b-2 ${activeItem === "menu" ? "border-[#FF6347]" : "border-transparent hover:border-[#FF6347]"}`}
            onClick={() => setActiveItem("menu")}
          >
            menu
          </li>
          <li
            className={`pb-2 cursor-pointer transition duration-300 border-b-2 ${activeItem === "mobile-app" ? "border-[#FF6347]" : "border-transparent hover:border-[#FF6347]"}`}
            onClick={() => setActiveItem("mobile-app")}
          >
            mobile app
          </li>
          <li
            className={`pb-2 cursor-pointer transition duration-300 border-b-2 ${activeItem === "contact" ? "border-[#FF6347]" : "border-transparent hover:border-[#FF6347]"}`}
            onClick={() => setActiveItem("contact")}
          >
            contact us
          </li>
        </ul>

        {/* div for icons and sign in button */}
        <div className="flex items-center gap-10 text-white">
          <Image
            src="/assets/search_icon.png"
            alt="search icon"
            width={20}
            height={20}
          />
          <Image
            src="/assets/basket_icon.png"
            alt="basket icon"
            width={20}
            height={20}
          />
          <button className="border border-[#FF6347] hover:bg-[#fff4f2] cursor-pointer text-black py-2 px-4 rounded-full">
            sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
