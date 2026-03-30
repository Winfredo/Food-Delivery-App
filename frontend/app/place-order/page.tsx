"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { storeContext } from "@/context/StoreContextProvider";
import axios from "axios";
const page = () => {
  const { getTotalCartAmount, token, cartItems, foodList, url } =
    useContext(storeContext)!;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cityCode: "",
    country: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let orderItems: any[] = [];

    foodList.forEach((foodItem: any) => {
      if (cartItems[foodItem._id] > 0) {
        orderItems.push({
          _id: foodItem._id,
          name: foodItem.name,
          price: foodItem.price,
          quantity: cartItems[foodItem._id],
        });
      }
    });

    if (orderItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const deliveryFee = getTotalCartAmount() === 0 ? 0 : 5;

    const orderData = {
      address: data,
      items: orderItems,
      totalAmount: Math.round((getTotalCartAmount() + deliveryFee) * 100) / 100,
      deliveryFee: deliveryFee,
      email: data.email,
      successUrl: `${url}`,
      cancelUrl: `${url}`,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { checkoutUrl } = response.data;
        window.location.href = checkoutUrl;
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <form
      className="place-order flex items-start justify-between gap-12 mt-25"
      onSubmit={handleSubmitOrder}
    >
      {/* left side */}
      <div className="place-order-left w-full max-w-[max(30%,500px)]">
        <p className="title text-[30px] font-bold mb-12.5">
          Delivery Information
        </p>
        <div className="multi-fields flex gap-2.5">
          <input
            required
            name="firstName"
            onChange={handleInputChange}
            value={data.firstName}
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={handleInputChange}
            value={data.lastName}
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={handleInputChange}
          value={data.email}
          className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="address"
          onChange={handleInputChange}
          value={data.address}
          className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
          type="text"
          placeholder="Street Address"
        />
        <div className="multi-fields flex gap-2.5">
          <input
            required
            name="city"
            onChange={handleInputChange}
            value={data.city}
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="City"
          />
          <input
            required
            name="zipCode"
            onChange={handleInputChange}
            value={data.zipCode}
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="Zip Code"
          />
        </div>
        <div className="multi-fields flex gap-2.5">
          <input
            required
            name="cityCode"
            onChange={handleInputChange}
            value={data.cityCode}
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="City Code"
          />
          <input
            required
            name="country"
            onChange={handleInputChange}
            value={data.country}
            className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phoneNumber"
          onChange={handleInputChange}
          value={data.phoneNumber}
          className="mb-6 w-full p-2.5 rounded-sm border border-[#c5c5c5] outline-[#FF6347 ]"
          type="number"
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
            <p>
              $
              {getTotalCartAmount() === 0
                ? 0
                : Math.round((getTotalCartAmount() + 5) * 100) / 100}
            </p>
          </div>
          <button
            type="submit"
            className="px-0 rounded-lg py-3.5 border-none mt-10 text-white bg-[#FF6347] w-[max(15vw,200px)] cursor-pointer"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
