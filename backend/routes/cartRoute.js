import express from "express";
import { addToCart, deleteFromCart, listCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.delete('/delete', authMiddleware, deleteFromCart);
router.get('/list', authMiddleware, listCart);

export default router; 
