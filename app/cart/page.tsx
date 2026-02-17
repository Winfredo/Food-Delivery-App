"use client";
import React, { useContext } from "react";
import { storeContext } from "@/context/StoreContextProvider";
import { useRouter } from "next/navigation";
const page = () => {
  const { cartItems, foodList, removeFromCart,getTotalCartAmount } =
    useContext(storeContext)!;
    const router = useRouter();

    const handleRouteToCheckout = () => {
      router.push("/place-order");
    }
  return (
    <div className="mt-25">
      <div className="cart-items">
        <div className=" grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className="my-2.5 mx-auto border-none bg-[#e2e2e2] h-0.5" />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div  
                  className=" my-2.5 mx-0 text-black grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)]"
                >
                  <img src={item.image} className="md:w-12.5 w-10" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button onClick={() => removeFromCart(item._id)} className="bg-[#FF6347] text-white p-1 rounded-[50px] cursor-pointer">
                    Remove
                  </button>
                </div>
                <hr className="my-2.5 mx-auto border-none bg-[#e2e2e2] h-px" />
              </div>
            );
          }
        })}
      </div>
      {/* div for the subtotal beneath */}
      <div className="mt-20 flex md:flex-row flex-col-reverse justify-between gap-[max(12vw,20px)]">
        <div className="cart-total flex-1 flex flex-col gap-5">
          <h2>Cart Totals</h2>
          <div className=" flex justify-between text-[#555]">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr className="my-1  border-none bg-[#e2e2e2] h-px" />
          <div className=" flex justify-between text-[#555]">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()=== 0 ? 0 : 5}</p>
          </div>
          <hr className="my-1  border-none bg-[#e2e2e2] h-px" />

          <div className=" flex justify-between text-[#555] text-[max(1.3vw,16px)] font-bold">
            <p>Total</p>
            <p>${getTotalCartAmount()=== 0 ? 0 : getTotalCartAmount() + 5}</p>
          </div>
          <button onClick={()=>handleRouteToCheckout()} className="px-0 rounded-lg py-3.5 border-none text-white bg-[#FF6347] w-[max(15vw,200px)] cursor-pointer">Proceed to Checkout</button>
        </div>
        <div className="cart-promo-code justify-start md:justify-end flex-1">
          <div>
            <h2 className="text-[#555]">Have a promo code? Enter it here:</h2>
            <div className=" mt-2.5 flex justify-between align-center bg-[#eaeaea] rounded-sm">
            <input type="text" placeholder="promo code" className="bg-transparent border-none outline-none pl-2.5" />
            <button className="w-[max(10vw,150px)] py-3 px-1.25 bg-black text-white border-none rounded-sm">submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
