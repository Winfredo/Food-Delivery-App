import foodModel from '../models/foodModel.js';

class FoodService {
 static async createFood(payload, file = null) {
    const { name, description, price, category } = payload;
    const imageFilename = file ? file.path : null;
    
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
      const urlParts = food.image.split("/");
      const filename = urlParts[urlParts.length - 1];
      const publicId = `food-delivery-app/${filename.split(".")[0]}`;

      cloudinary.uploader.destroy(publicId, (err) => {
        if (err) {
          console.error("Error deleting image from Cloudinary:", err);
        }
      });
    }

    return food; 
  }
}

export default FoodService;