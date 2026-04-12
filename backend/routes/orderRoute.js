import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import { placeOrder,verifyOrder,userOrder,listOrders,statusUpdate,retryPayment } from '../controllers/orderController.js';

router.post('/place', authMiddleware, placeOrder);
router.post('/verify', verifyOrder);
router.get('/userorders', authMiddleware, userOrder);
router.get('/list', listOrders);
router.post('/status',statusUpdate)
router.post('/retry', authMiddleware, retryPayment);

export default router;