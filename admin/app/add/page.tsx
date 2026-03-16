"use client";
import React, { useEffect, useState } from "react";
const page = () => {
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-12 text-[#6d6d6d] text-base">
      <form className="flex flex-col gap-5">
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
          />{" "}
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
              <option value="Desert">Desert</option>
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
          className="bg-black text-white py-3 px-8 rounded font-medium  transition-colors w-full md:w-auto md:self-start"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default page;
