"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
const page = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });
  const onChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    if (image) {
      formData.append("image", image);
    }
    const response = await axios.post(`${url}/api/food/create`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      });
      setImage(null);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
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
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-12 text-[#6d6d6d] text-base">
      <div className="mb-6 flex items-center gap-4">
        <a href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </a>
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
      </div>
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        {/* Upload Image */}
        <div className="flex flex-col gap-2">
          <p className="font-medium">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={
                image ? URL.createObjectURL(image) : "/assets/upload_area.png"
              }
              alt="Upload Area"
              className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-orange-500 transition-colors"
            />
          </label>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <p className="font-medium">Product Name</p>
          <input
            onChange={onChangeHandler}
            type="text"
            name="name"
            value={data.name}
            placeholder="Enter product name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <p className="font-medium">Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Enter product description"
            className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          ></textarea>
        </div>

        {/* Category and Price Row */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category */}
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-medium">Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="desert">desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-medium">Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white py-3 px-8 rounded font-medium cursor-pointer  transition-colors w-full md:w-auto md:self-start"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default page;
