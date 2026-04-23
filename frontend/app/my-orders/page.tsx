"use client";
import { storeContext } from "@/context/StoreContextProvider";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const page = () => {
  const { url, token } = useContext(storeContext)!;
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/order/userorders`, {
      headers: { token },
    });
    setData(response.data.data);
    console.log("Fetched orders:", response.data.data);
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await axios.delete(`${url}/api/order/${orderId}`, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success("Order deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        fetchOrders();
      } else {
        toast.error("Failed to delete order", { theme: "dark" });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order", { theme: "dark" });
    }
  };

  const handleRetryPayment = async (orderId: string) => {
    try {
      const response = await axios.post(
        `${url}/api/order/retry`,
        {
          orderId,
        },
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        window.location.href = response.data.checkoutUrl;
      } else {
        alert("Failed to retry payment");
      }
    } catch (error) {
      console.error("Error retrying payment:", error);
      alert("Error retrying payment");
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6  min-h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">
        My Orders
      </h2>

      <div className="space-y-4 md:space-y-6">
        {data.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-linear-to-b from-gray-50 to-white p-8 md:p-12 text-center transition-all duration-300 hover:border-orange-200">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              No orders yet
            </h3>
            <p className="text-sm md:text-base text-gray-500">
              Hungry? Start exploring our menu and place your first order!
            </p>
          </div>
        ) : (
          data.map((order: any, index: any) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-gray-200"
              >
                <img
                  src="/assets/parcel_icon.png"
                  alt="Order Image"
                  className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-3 md:mb-4">
                    {order.items.map((item: any, index: any) => (
                      <span
                        key={index}
                        className="inline-block mr-2 mb-2 text-gray-700 font-medium text-sm md:text-base"
                      >
                        {index === order.items.length - 1 ? (
                          <>
                            {item.name} x {item.quantity}
                          </>
                        ) : (
                          <>
                            {item.name} x {item.quantity},{" "}
                          </>
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-base md:text-lg font-bold text-gray-800">
                    Total: $
                    {order.totalAmount % 1 === 0
                      ? `${order.totalAmount}.00`
                      : order.totalAmount}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base font-bold ">
                    Items: {order.items.length}
                  </p>
                  <p
                    className={`font-semibold text-sm md:text-base ${order.payment ? (order.status === "Food Processing" ? "text-yellow-600" : order.status === "Delivered" ? "text-green-500" : "text-blue-500") : "text-red-500"}`}
                  >
                    Status: {order.payment ? order.status : "Payment Pending"}
                  </p>
                  {order.payment ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={fetchOrders}
                        className="mt-2 w-full md:w-auto px-3 md:px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm md:text-base"
                      >
                        Track Order
                      </button>
                      {order.status === "Delivered" && (
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="mt-2 w-full md:w-auto px-3 md:px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 active:bg-red-700 transition-all duration-150 text-sm md:text-base"
                        >
                          Delete Order
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleRetryPayment(order._id)}
                        className="mt-2 w-full md:w-auto px-3 md:px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm md:text-base"
                      >
                        Pay Now
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="mt-2 w-full md:w-auto px-3 md:px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 active:bg-red-700 transition-all duration-150 text-sm md:text-base"
                      >
                        Delete Order
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default page;
