import express from "express";
import { addToCart, deleteFromCart, listCart } from "../controllers/cartController.js";
const router = express.Router();

router.post('/add', addToCart);
router.delete('/delete', deleteFromCart);
router.get('/list', listCart);

export default router; 
