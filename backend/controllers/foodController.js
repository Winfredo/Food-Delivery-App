import fs from 'fs';
import foodModel from '../models/foodModel.js';

 const createFood = async (req, res, next) => {
    
    let image_filename = req.file ? `${req.file.filename}` : null;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })
    try {
         await food.save();
         res.status(201).json({ message: 'Food created successfully',success: true });
    } catch (error) {
        console.error('Error creating food:', error);
        return next(error);
    }
 }

 const listFood = async (req,res, next) => {
     try {
        const foods = await foodModel.find({});
        res.status(200).json({ foods, success: true });
     }catch (error) {
        console.error('Error listing food:', error);
        return next(error);
     }
 }

 const deleteFood = async (req, res, next) => {
    try {
        const foodId = req.params.id;
        const food = await foodModel.findByIdAndDelete(foodId);
        res.status(200).json({ message: 'Food deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting food:', error);
        return next(error);
    }
 }

 export { createFood, listFood, deleteFood }