import FoodService from '../services/food.service.js';
 const createFood = async (req, res, next) => {
    try {
      const food = await FoodService.createFood(req.body, req.file);
      if (!food) {
        return res.status(400).json({ message: 'Failed to create food', success: false });
      }

      res.status(201).json({ message: 'Food created successfully', success: true, data: food });
    } catch (error) {
      console.error('Error creating food:', error);
      return next(error);
    }
 }

 const listFood = async (req,res, next) => {
     try {
        const foods = await FoodService.listFood();
        res.status(200).json({message: 'Foods listed successfully', success: true, data: foods || [] });
     }catch (error) {
        console.error('Error listing food:', error);
        return next(error);
     }
 }

 const deleteFood = async (req, res, next) => {
    try {
        const foodId = req.body.id;
        const food = await FoodService.deleteFood(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food not found', success: false });
        }
        res.status(200).json({ message: 'Food deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting food:', error);
        return next(error);
    }
 }

 export const updateFood = async (req, res) => {
  try {
    const { id, name, description, category, price } = req.body;
    const updateData = { name, description, category, price };
    if (req.file) {
      updateData.image = req.file.path;
    }
    const food = await FoodService.updateFood(id, updateData);
    if (!food) return res.json({ success: false, message: "Food not found" });
    res.json({ success: true, message: "Food updated successfully", data: food });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

 export { createFood, listFood, deleteFood, updateFood }