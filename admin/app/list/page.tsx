"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  __v?: number;
}

const page = () => {
  const [list, setList] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:4000";

  const fetchData = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log("API response:", response.data);
    if (response.data.success) {
      console.log("Foods array:", response.data.data);
      setList(response.data.data);
      setLoading(false);
    }
  };

  const deleteFood = async (_id: string) => {
    const response = await axios.delete(`${url}/api/food/delete/`, {
      data: { id: _id },
    });
    await fetchData();
    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      fetchData();
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4 flex items-center gap-4">
          <a href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors shrink-0">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
          </a>
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900">
              All Foods
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your menu</p>
          </div>
        </div>

        {/* Show message if no foods */}
        {list.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No Food available</p>
            <p className="text-gray-400 text-sm mt-2">
              Add some foods to get started
            </p>
          </div>
        ) : (
          /* Table Container - Only shows when there are foods */
          <div className="bg-white border border-gray-200">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 text-gray-600 text-sm font-medium p-4 border-b border-gray-200">
              <div className="col-span-2">Image</div>
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-3">Action</div>
            </div>

            {/* Food Items */}
            <div className="divide-y divide-gray-100">
              {list.map((food) => (
                <div
                  key={food._id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Mobile View */}
                  <div className="md:hidden space-y-3">
                    <div className="flex gap-4">
                      <img
                        src={`${url}/images/${food.image}`}
                        alt={food.name}
                        className="w-20 h-20 object-cover border border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {food.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {food.category}
                        </p>
                        <p className="text-base font-medium text-gray-900 mt-2">
                          ${food.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteFood(food._id)}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center text-sm">
                    <div className="col-span-2">
                      <img
                        src={`${url}/images/${food.image}`}
                        alt={food.name}
                        className="w-16 h-16 object-cover border border-gray-200"
                      />
                    </div>
                    <div className="col-span-3 text-gray-900">{food.name}</div>
                    <div className="col-span-2 text-gray-600">
                      {food.category}
                    </div>
                    <div className="col-span-2 font-medium text-gray-900">
                      ${food.price}
                    </div>
                    <div className="col-span-3">
                      <button
                        onClick={() => deleteFood(food._id)}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer - Only shows when there are foods */}
        {list.length > 0 && (
          <div className="mt-6 text-sm text-gray-500 flex justify-between items-center border-t border-gray-200 pt-4">
            <span>Total Items: {list.length}</span>
            <span className="text-gray-400">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
