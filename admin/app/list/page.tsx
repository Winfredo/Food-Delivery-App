"use client";
import React, { useState, useEffect, useRef } from "react";
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

const ITEMS_PER_PAGE = 10;

const page = () => {
  const [list, setList] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [editFood, setEditFood] = useState<Food | null>(null);
  const [editData, setEditData] = useState({ name: "", description: "", category: "Salad", price: "" });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const fetchData = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      setLoading(false);
    }
  };

  const openEditModal = (food: Food) => {
    setEditFood(food);
    setEditData({ name: food.name, description: food.description, category: food.category, price: String(food.price) });
    setNewImage(null);
  };

  const closeEditModal = () => { setEditFood(null); setNewImage(null); };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const updateFood = async () => {
    if (!editFood) return;
    setEditLoading(true);
    const formData = new FormData();
    formData.append("id", editFood._id);
    formData.append("name", editData.name);
    formData.append("description", editData.description);
    formData.append("category", editData.category);
    formData.append("price", editData.price);
    if (newImage) formData.append("image", newImage);
    const response = await axios.put(`${url}/api/food/update`, formData);
    if (response.data.success) {
      toast.success("Food updated successfully!", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, theme: "dark" });
      closeEditModal();
      fetchData();
    } else {
      toast.error("Failed to update food", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, theme: "dark" });
    }
    setEditLoading(false);
  };

  const deleteFood = async (_id: string) => {
    const response = await axios.delete(`${url}/api/food/delete/`, { data: { id: _id } });
    await fetchData();
    if (response.data.success) {
      toast.success(response.data.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" });
      const newTotal = list.length - 1;
      const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages) setCurrentPage(newTotalPages || 1);
    } else {
      toast.error(response.data.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" });
    }
  };

  // Pagination
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedList = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => { fetchData(); }, []);

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
            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900">All Foods</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your menu</p>
          </div>
        </div>

        {/* Edit Modal */}
        {editFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Edit — {editFood.name}</h2>
                <div className="flex flex-col gap-2 mb-5">
                  <p className="font-medium text-[#6d6d6d]">Image</p>
                  <label htmlFor="edit-image" className="cursor-pointer w-fit">
                    <img src={newImage ? URL.createObjectURL(newImage) : editFood.image} alt={editFood.name} className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg p-1 hover:border-orange-500 transition-colors" />
                  </label>
                  <input type="file" id="edit-image" ref={fileInputRef} accept="image/*" hidden onChange={(e) => setNewImage(e.target.files?.[0] || null)} />
                  <p className="text-xs text-gray-400">Click image to change</p>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <p className="font-medium text-[#6d6d6d]">Product Name</p>
                  <input type="text" name="name" value={editData.name} onChange={onChangeHandler} className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <p className="font-medium text-[#6d6d6d]">Description</p>
                  <textarea name="description" value={editData.description} onChange={onChangeHandler} rows={4} className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                </div>
                <div className="flex flex-col md:flex-row gap-5 mb-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <p className="font-medium text-[#6d6d6d]">Category</p>
                    <select name="category" value={editData.category} onChange={onChangeHandler} className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                      <option value="Salad">Salad</option>
                      <option value="Rolls">Rolls</option>
                      <option value="Desert">Desert</option>
                      <option value="Sandwich">Sandwich</option>
                      <option value="Cake">Cake</option>
                      <option value="Pure Veg">Pure Veg</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Noodles">Noodles</option>
                    </select>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <p className="font-medium text-[#6d6d6d]">Price</p>
                    <input type="number" name="price" value={editData.price} onChange={onChangeHandler} step="0.01" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={updateFood} disabled={editLoading} className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white px-4 py-3 text-sm font-medium rounded transition-colors">
                    {editLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button onClick={closeEditModal} className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 text-sm rounded transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {list.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No Food available</p>
            <p className="text-gray-400 text-sm mt-2">Add some foods to get started</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200">
            <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 text-gray-600 text-sm font-medium p-4 border-b border-gray-200">
              <div className="col-span-2">Image</div>
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-3">Action</div>
            </div>
            <div className="divide-y divide-gray-100">
              {paginatedList.map((food) => (
                <div key={food._id} className="p-4 hover:bg-gray-50 transition-colors">
                  {/* Mobile View */}
                  <div className="md:hidden space-y-3">
                    <div className="flex gap-4">
                      <img src={food.image} alt={food.name} className="w-20 h-20 object-cover border border-gray-200" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{food.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{food.category}</p>
                        <p className="text-base font-medium text-gray-900 mt-2">${food.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(food)} className="flex-1 border border-gray-900 text-gray-900 hover:bg-gray-100 active:scale-95 px-4 py-2 text-sm transition-all duration-150">Edit</button>
                      <button onClick={() => deleteFood(food._id)} className="flex-1 bg-gray-900 hover:bg-gray-800 active:scale-95 active:bg-gray-700 text-white px-4 py-2 text-sm transition-all duration-150">Delete</button>
                    </div>
                  </div>
                  {/* Desktop View */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center text-sm">
                    <div className="col-span-2">
                      <img src={food.image} alt={food.name} className="w-16 h-16 object-cover border border-gray-200" />
                    </div>
                    <div className="col-span-3 text-gray-900">{food.name}</div>
                    <div className="col-span-2 text-gray-600">{food.category}</div>
                    <div className="col-span-2 font-medium text-gray-900">${food.price}</div>
                    <div className="col-span-3 flex gap-2">
                      <button onClick={() => openEditModal(food)} className="border border-gray-900 text-gray-900 hover:bg-gray-100 active:scale-95 px-4 py-2 text-sm transition-all duration-150">Edit</button>
                      <button onClick={() => deleteFood(food._id)} className="bg-gray-900 hover:bg-gray-800 active:scale-95 active:bg-gray-700 text-white px-4 py-2 text-sm transition-all duration-150">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer with Pagination */}
        {list.length > 0 && (
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 pt-4">
            <span className="text-sm text-gray-500">
              Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, list.length)} of {list.length} items
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 text-sm border rounded transition-colors ${currentPage === page ? "bg-gray-900 text-white border-gray-900" : "border-gray-300 hover:bg-gray-50"}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
            <span className="text-sm text-gray-400">{new Date().toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;