import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import dotenv from "dotenv";

dotenv.config();

const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/food-delivery-app`;

const updateImageUrls = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const foods = await foodModel.find({});
    console.log(`Found ${foods.length} food items`);

  for (const food of foods) {
  if (food.image && !food.image.endsWith(".png")) {
    const newImageUrl = `${food.image}.png`;

    await foodModel.findByIdAndUpdate(food._id, { image: newImageUrl });
    console.log(`Updated: ${food.name} → ${newImageUrl}`);
  }
}

    console.log("All images updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating images:", error);
    process.exit(1);
  }
};

updateImageUrls();