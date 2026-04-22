"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!", { theme: "dark" });
    router.push("/login");
  };

  return (
    <div className="w-full h-20 flex items-center justify-between px-8 py-7 mb-4">
      <Link href="/" className="flex items-center">
        <img src="/assets/logo.png" alt="Logo" className="w-20 md:w-32 lg:w-40" />
      </Link>
      <div className="flex items-center gap-4">
        <img
          src="/assets/profile_image.png"
          alt="Profile picture"
          className="w-10 h-10 rounded-full"
        />
        <button
          onClick={handleLogout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;