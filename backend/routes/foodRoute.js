import express from 'express';
const router = express.Router();
import { createFood, deleteFood, listFood } from '../controllers/foodController.js';
import multer from 'multer';


//image storage configuration
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
       return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'),createFood);
router.get('/list', listFood);
router.delete('/delete/:id', deleteFood);


export default router; 