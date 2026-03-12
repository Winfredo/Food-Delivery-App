import fs from 'fs';
import foodModel from '../models/foodModel.js';

 const createFood = async (req, res, next) => {
     console.log("req.body:", req.body);  // Add this
    console.log("req.file:", req.file);  // Add this
    
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

 export { createFood }