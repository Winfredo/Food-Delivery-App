import fs from 'fs';
import foodModel from '../models/foodModel.js';

class FoodService {
 static async createFood(payload, file = null) {
    const { name, description, price, category } = payload; // Destructure here
    const imageFilename = file ? file.filename : null;
    
    const foodDoc = new foodModel({
        name,
        description,
        price,
        category,
        image: imageFilename,
    });

    const savedFood = await foodDoc.save();
    return savedFood;
}

  static async listFood() {
    const foods = await foodModel.find({});
    return foods;
  }

  static async deleteFood(foodId) {
    const food = await foodModel.findByIdAndDelete(foodId);
    if (!food) return null;

    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        }
      });
    }

    return food;
  }
}

export default FoodService;