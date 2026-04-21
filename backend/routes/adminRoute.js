import express from "express";
const router = express.Router();
import { adminController } from "../controllers/adminController.js";

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: API endpoints for admin authentication
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin email address
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 description: Admin password
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: JWT token for admin authentication
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", adminController);

export default router;