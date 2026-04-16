import express from "express";
const router = express.Router();
import {
  createFood,
  deleteFood,
  listFood,
} from "../controllers/foodController.js";
import multer from "multer";

//image storage configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   - name: Food
 *     description: API endpoints for managing food items
 */

/**
 * @swagger
 * /api/food/create:
 *   post:
 *     summary: Create a new food item
 *     tags: [Food]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewFood'
 *     responses:
 *       201:
 *         description: Food item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Food'
 *       400:
 *         description: Bad request, invalid input data
 */
router.post("/create", upload.single("image"), createFood);

/**
 * @swagger
 * /api/food/list:
 *   get:
 *     summary: List all food items
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: Foods listed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Food'
 */
router.get("/list", listFood);

/**
 * @swagger
 * /api/food/delete:
 *   delete:
 *     summary: Delete a food item by id
 *     tags: [Food]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the food item to delete
 *     responses:
 *       200:
 *         description: Food deleted successfully
 *       404:
 *         description: Food not found
 */
router.delete("/delete", deleteFood);

export default router;
