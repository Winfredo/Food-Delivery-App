import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import { placeOrder,verifyOrder } from '../controllers/orderController.js';

router.post('/place', authMiddleware, placeOrder);
router.post('/verify', verifyOrder);

export default router;