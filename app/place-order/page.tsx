"use client";
import React from "react";
import { useContext } from "react";
import { storeContext } from "@/context/StoreContextProvider";
const page = () => {
  const { getTotalCartAmount } = useContext(storeContext)!;
  return (
    <form className="place-order flex items-start justify-between gap-12 mt-25">
      {/* left side */}
      <div className="place-order-left w-full max-w-[max(30%,500px)]">
        <p className="title text-[30px] font-bold mb-12.5">
          Delivery Information
        </p>
        <div className="multi-fields flex gap-2.5">
          <input
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="First Name"
          />
          <input
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
          type="text"
          placeholder="Street Address"
        />
        <div className="multi-fields flex gap-2.5">
          <input
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="City"
          />
          <input
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="Zip Code"
          />
        </div>
        <div className="multi-fields flex gap-2.5">
          <input
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="City Code"
          />
          <input
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
          type="text"
          placeholder="Phone Number"
        />
      </div>

      {/* right side */}
      <div className="place-order-right w-full max-w-[max(40%,500px)]">
        <div className="cart-total flex-1 flex flex-col gap-5">
          <h2 className="text-[30px] font-bold mb-7">Cart Totals</h2>
          <div className=" flex justify-between text-[#555]">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr className="my-1  border-none bg-[#e2e2e2] h-px" />
          <div className=" flex justify-between text-[#555]">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
          </div>
          <hr className="my-1  border-none bg-[#e2e2e2] h-px" />

          <div className=" flex justify-between text-[#555] text-[max(1.3vw,16px)] font-bold">
            <p>Total</p>
            <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</p>
          </div>
          <button className="px-0 rounded-lg py-3.5 border-none mt-10 text-white bg-[#FF6347] w-[max(15vw,200px)] cursor-pointer">
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
