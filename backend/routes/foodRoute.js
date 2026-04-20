import express from "express";
const router = express.Router();
import {
  createFood,
  deleteFood,
  listFood,
} from "../controllers/foodController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//image storage configuration
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food-delivery-app",
    allowed_formats: ["jpg", "jpeg", "png"],
    use_filename: true,
    unique_filename: false,
    overwrite: true,
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
