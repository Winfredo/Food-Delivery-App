import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import { placeOrder,verifyOrder,userOrder,listOrders } from '../controllers/orderController.js';

router.post('/place', authMiddleware, placeOrder);
router.post('/verify', verifyOrder);
router.get('/userorders', authMiddleware, userOrder);
router.get('/list', listOrders);

export default router;