import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder, userOrder, listOrders, statusUpdate, retryPayment } from '../controllers/orderController.js';

/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: Order management endpoints
 */

/**
 * @swagger
 * /api/order/place:
 *   post:
 *     summary: Place a new order and initialize payment checkout
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewOrder'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 orderId:
 *                   type: string
 *                 checkoutUrl:
 *                   type: string
 *                 sessionId:
 *                   type: string
 *                 clientSecret:
 *                   type: string
 *       400:
 *         description: Failed to place order
 */
router.post('/place', authMiddleware, placeOrder);

/**
 * @swagger
 * /api/order/verify:
 *   post:
 *     summary: Verify a payment and update order status
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOrderRequest'
 *     responses:
 *       200:
 *         description: Order verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields or verification failed
 */
router.post('/verify', verifyOrder);

/**
 * @swagger
 * /api/order/userorders:
 *   get:
 *     summary: Get orders for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: User not authenticated
 */
router.get('/userorders', authMiddleware, userOrder);

/**
 * @swagger
 * /api/order/list:
 *   get:
 *     summary: List all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 */
router.get('/list', listOrders);

/**
 * @swagger
 * /api/order/status:
 *   post:
 *     summary: Update the status of an order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderStatusRequest'
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields
 */
router.post('/status', statusUpdate);

/**
 * @swagger
 * /api/order/retry:
 *   post:
 *     summary: Retry payment for an existing order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RetryPaymentRequest'
 *     responses:
 *       200:
 *         description: Payment retry initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 checkoutUrl:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required field or retry failed
 */
router.post('/retry', authMiddleware, retryPayment);

export default router;