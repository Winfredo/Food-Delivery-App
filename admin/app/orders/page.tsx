"use client";
import React, { use, useEffect } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const page = () => {
  const [orders, setOrders] = React.useState([]);
  const url = "http://localhost:4000";

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
      console.log("Fetched orders:", response.data.data);
    } 
  };

  const statusHandler = async (orderId:any, status:any) => {
    const response = await axios.post(`${url}/api/order/status`,{orderId, status});
    if (response.data.success) {
      fetchOrders();
    } else {
      console.error("Failed to update order status:", response.data.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8 flex items-center gap-4">
          <a href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
          </a>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Order Management
            </h1>
            <p className="text-gray-600">
              Monitor and manage all customer orders
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 md:w-12 md:h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
              There are currently no orders in the system. Orders will appear
              here once customers start placing them.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Recent Orders
              </h2>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden">
              {orders.map((order: any, index: any) => (
                <div
                  key={index}
                  className="border-b border-gray-200 p-4 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                      src="/assets/parcel_icon.png"
                      alt="Order"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          Order #{index + 1}
                        </h3>
                        <select
                          onChange={(e) => statusHandler(order._id, e.target.value)}
                          defaultValue={order.status}
                          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-800"
                        >
                          <option>Food Processing</option>
                          <option>Out for Delivery</option>
                          <option>Delivered</option>
                        </select>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {order.items.map((item: any, idx: any) => (
                          <span key={idx} className="inline-block mr-2 mb-1">
                            {item.name} ({item.quantity})
                            {idx < order.items.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        {order.address?.address && (
                          <div>{order.address.address}</div>
                        )}
                        {order.address?.city && (
                          <div>{order.address.city}, {order.address.country}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          $
                          {order.totalAmount % 1 === 0
                            ? `${order.totalAmount}.00`
                            : order.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order: any, index: any) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="shrink-0 w-12 h-12">
                            <img
                              className="w-12 h-12 rounded-lg object-cover"
                              src="/assets/parcel_icon.png"
                              alt="Order"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Order #{index + 1}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {order.items.map((item: any, idx: any) => (
                            <span key={idx} className="inline-block mr-2 mb-1">
                              {item.name} ({item.quantity})
                              {idx < order.items.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-gray-900">
                          $
                          {order.totalAmount % 1 === 0
                            ? `${order.totalAmount}.00`
                            : order.totalAmount}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                        {order.address?.address && <div>{order.address.address}</div>}
                        {order.address?.city && (
                          <div>{order.address.city}, {order.address.country}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          onChange={(e) => statusHandler(order._id, e.target.value)}
                          defaultValue={order.status}
                          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                        >
                          <option>Food Processing</option>
                          <option>Out for Delivery</option>
                          <option>Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

