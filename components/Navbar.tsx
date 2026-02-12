"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginPopupProps } from "@/types/type";

const Navbar = ({ setShowLoginPopup,showLoginPopup }: LoginPopupProps) => {
  const [activeItem, setActiveItem] = useState("home");
  return (
    <div className="w-full h-16 px-4 sm:px-6 fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="flex h-full items-center justify-between max-w-7xl mx-auto">
        <div className="w-30 sm:w-37.5 md:w-50">
          <Link href="#hero"><Image
            src="/assets/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="w-full h-auto cursor-pointer"
          /></Link>
        </div>
        
        <ul className="hidden md:flex items-center gap-4 lg:gap-5">
         <Link href="#hero">
         <li
            className={`pb-2 cursor-pointer transition duration-300 border-b-2 ${activeItem === "home" ? "border-[#FF6347]" : "border-transparent hover:border-[#FF6347]"}`}
            onClick={() => setActiveItem("home")}
          >
            home
          </li>
         
         </Link>

          <Link href="#explore">
            <li
              className={`pb-2 cursor-pointer transition duration-300 border-b-2 ${activeItem === "menu" ? "border-[#FF6347]" : "border-transparent hover:border-[#FF6347]"}`}
              onClick={() => setActiveItem("menu")}
            >
              menu
            </li>
          </Link>
          {/* <li
            className={`pb-2 cursor-pointer transition duration-300 border-b-2 ${activeItem === "mobile-app" ? "border-[#FF6347]" : "border-transparent hover:border-[#FF6347]"}`}
            onClick={() => setActiveItem("mobile-app")}
          >
            mobile app
          </li> */}
          <Link href="#footer">
            <li
              className={`pb-2 cursor-pointer transition duration-300 border-b-2 ${activeItem === "contact" ? "border-[#FF6347]" : "border-transparent hover:border-[#FF6347]"}`}
              onClick={() => setActiveItem("contact")}
            >
              contact us
            </li>
          </Link>
        </ul>

        {/* Icons and sign in button */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
          <Image
            src="/assets/search_icon.png"
            alt="search icon"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          />

          <div className="relative">
            <Image
              src="/assets/basket_icon.png"
              alt="basket icon"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            />
            <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#FF6347] rounded-full -top-1.5 -right-1.5 sm:-top-2 sm:-right-2"></div>
          </div>

          {/* Sign in - visible on all screens */}
          <button onClick={()=> setShowLoginPopup(true)} className="border border-[#FF6347] hover:bg-[#fff4f2] cursor-pointer text-black py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-base whitespace-nowrap">
            sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
