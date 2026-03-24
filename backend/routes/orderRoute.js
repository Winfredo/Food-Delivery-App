import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/orderController.js';

router.post('/order', authMiddleware, placeOrder);

export default router;