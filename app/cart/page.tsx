"use client";
import React, { useContext } from "react";
import { storeContext } from "@/context/StoreContextProvider";

const page = () => {
  const { cartItems, foodList, removeFromCart, addToCart } =
    useContext(storeContext)!;
  return (
    <div className="cart mt-25">
      <div className="cart-items">
        <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)]">
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
              <div>
                <div
                  key={index}
                  className="cart-items-title my-2.5 mx-0 text-black grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)]"
                >
                  <img src={item.image} className="w-12.5" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button onClick={() => removeFromCart(item._id)}>
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
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="card-details-total">
            <p>Subtotal</p>
            <p>{0}</p>
          </div>
          <hr className="my-2.5 mx-auto border-none bg-[#e2e2e2] h-px" />
          <div className="card-details-total">
            <p>Delivery Fee</p>
            <p>{20}</p>
          </div>
          <hr className="my-2.5 mx-auto border-none bg-[#e2e2e2] h-px" />

          <div className="card-details-total">
            <p>Total</p>
            <p>{10}</p>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <h2>Have a promo code? Enter it here:</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
