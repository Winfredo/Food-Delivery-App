import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Cart management endpoints
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the authenticated user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartRequest'
 *     responses:
 *       200:
 *         description: Item added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.post("/add", authMiddleware, addToCart);

/**
 * @swagger
 * /api/cart/remove:
 *   post:
 *     summary: Remove one unit of an item from the authenticated user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartRequest'
 *     responses:
 *       200:
 *         description: Item removed from cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found or item not found in cart
 */
router.post("/remove", authMiddleware, removeFromCart);

/**
 * @swagger
 * /api/cart/list:
 *   get:
 *     summary: Get the authenticated user's cart contents
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 cartData:
 *                   type: object
 *                   additionalProperties: true
 *       404:
 *         description: User not found
 */
router.get("/list", authMiddleware, getCart);

export default router;
