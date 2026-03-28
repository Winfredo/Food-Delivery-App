import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/orderController.js';

router.post('/place', authMiddleware, placeOrder);
//route for verification

export default router;