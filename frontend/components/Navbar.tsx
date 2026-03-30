"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginPopupProps } from "@/types/type";
import { storeContext } from "@/context/StoreContextProvider";
import { useRouter } from "next/navigation";

const Navbar = ({ setShowLoginPopup }: LoginPopupProps) => {
  const [activeItem, setActiveItem] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(storeContext)!;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const logOut = () => {
    console.log("Logging out...");
    setToken("");
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    //adjust the height after finalizing the design.
    <div className="w-full h-20 px-4 fixed top-0 left-0 z-50 sm:px-6 bg-white shadow-md">
      <div className="flex h-full items-center justify-between max-w-7xl mx-auto">
        <div className="w-30 sm:w-37.5 md:w-50">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="w-full h-auto cursor-pointer"
            />
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-4 lg:gap-5">
          <Link href="/">
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
            <Link href="/cart">
              <Image
                src="/assets/basket_icon.png"
                alt="basket icon"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
            </Link>
            <div
              className={
                getTotalCartAmount() === 0
                  ? ""
                  : "absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#FF6347] rounded-full -top-1.5 -right-1.5 sm:-top-2 sm:-right-2"
              }
            ></div>
          </div>
          {!token ? (
            <button
              onClick={() => setShowLoginPopup(true)}
              className="border border-[#FF6347] hover:bg-[#fff4f2] cursor-pointer text-black py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-base whitespace-nowrap"
            >
              sign in
            </button>
          ) : (
            <div className="relative" ref={profileRef}>
              <div className="cursor-pointer">
                <Image
                  src="/assets/profile_icon.png"
                  alt="Profile"
                  width={24}
                  height={24}
                  onClick={() => setIsProfileOpen((open) => !open)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 transition-all duration-300 ${
                    isProfileOpen ? "border-orange-500" : "border-transparent"
                  }`}
                />

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 mt-3 w-48 transition-all duration-300 transform ${
                    isProfileOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-2"
                  }`}
                >
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>

                  <ul className="bg-white rounded-xl shadow-2xl py-3 border border-gray-100 overflow-hidden">
                    <li className="px-5 py-3 hover:bg-orange-50 cursor-pointer transition-colors duration-200 flex items-center gap-3 text-gray-700 hover:text-orange-600">
                      <img
                        src="/assets/basket_icon.png"
                        alt="orders"
                        className="w-5 h-5 object-contain transition-transform hover:scale-110"
                      />
                      <span className="text-sm font-medium">My Orders</span>
                    </li>

                    <li className="border-t border-gray-100 my-1"></li>

                    <li
                      onClick={logOut}
                      className="px-5 py-3 hover:bg-red-50 cursor-pointer transition-colors duration-200 flex items-center gap-3 text-gray-700 hover:text-red-600"
                    >
                      <img
                        src="/assets/logout_icon.png"
                        alt="logout"
                        className="w-5 h-5 object-contain transition-transform hover:scale-110"
                      />
                      <span className="text-sm font-medium">Logout</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
