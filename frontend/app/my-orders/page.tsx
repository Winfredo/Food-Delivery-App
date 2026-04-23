"use client";
import { storeContext } from "@/context/StoreContextProvider";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 5;

const page = () => {
  const { url, token } = useContext(storeContext)!;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/order/userorders`, {
      headers: { token },
    });
    setData(response.data.data);
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    try {
      const response = await axios.delete(`${url}/api/order/${orderToDelete}`, {
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
        setOrderToDelete(null);
        fetchOrders();
        // Go back a page if deleting last item on current page
        const newTotal = data.length - 1;
        const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages) setCurrentPage(newTotalPages || 1);
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
      const response = await axios.post(`${url}/api/order/retry`, { orderId }, { headers: { token } });
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

  // Pagination
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-full">

      {/* Delete Confirmation Modal */}
      {orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Order?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setOrderToDelete(null)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">My Orders</h2>

      <div className="space-y-4 md:space-y-6">
        {data.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-linear-to-b from-gray-50 to-white p-8 md:p-12 text-center transition-all duration-300 hover:border-orange-200">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">No orders yet</h3>
            <p className="text-sm md:text-base text-gray-500">Hungry? Start exploring our menu and place your first order!</p>
          </div>
        ) : (
          <>
            {paginatedData.map((order: any, index: any) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-gray-200">
                <img src="/assets/parcel_icon.png" alt="Order Image" className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md mx-auto md:mx-0" />
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-3 md:mb-4">
                    {order.items.map((item: any, index: any) => (
                      <span key={index} className="inline-block mr-2 mb-2 text-gray-700 font-medium text-sm md:text-base">
                        {index === order.items.length - 1 ? (
                          <>{item.name} x {item.quantity}</>
                        ) : (
                          <>{item.name} x {item.quantity}, </>
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-base md:text-lg font-bold text-gray-800">
                    Total: ${order.totalAmount % 1 === 0 ? `${order.totalAmount}.00` : order.totalAmount}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base font-bold">Items: {order.items.length}</p>
                  <p className={`font-semibold text-sm md:text-base ${order.payment ? (order.status === "Food Processing" ? "text-yellow-600" : order.status === "Delivered" ? "text-green-500" : "text-blue-500") : "text-red-500"}`}>
                    Status: {order.payment ? order.status : "Payment Pending"}
                  </p>
                  {order.payment ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={fetchOrders}
                        className="mt-2 w-full md:w-auto px-3 md:px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:scale-95 transition-all duration-150 text-sm md:text-base"
                      >
                        Track Order
                      </button>
                      {order.status === "Delivered" && (
                        <button
                          onClick={() => setOrderToDelete(order._id)}
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
                        className="mt-2 w-full md:w-auto px-3 md:px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 active:scale-95 transition-all duration-150 text-sm md:text-base"
                      >
                        Pay Now
                      </button>
                      <button
                        onClick={() => setOrderToDelete(order._id)}
                        className="mt-2 w-full md:w-auto px-3 md:px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 active:bg-red-700 transition-all duration-150 text-sm md:text-base"
                      >
                        Delete Order
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${currentPage === page ? "bg-[#FF6347] text-white border-[#FF6347]" : "border-gray-300 hover:bg-gray-100"}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default page;