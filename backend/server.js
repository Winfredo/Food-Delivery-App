import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import foodRoute from './routes/foodRoute.js';
import userRoute from './routes/userRoute.js';
import cartRoute from './routes/cartRoute.js';

const app = express();
const PORT = 4000;

app.use(cors());
dotenv.config({quiet: true});
app.use(express.json());

//db connection
await connectDB();

app.use('/api/food', foodRoute);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRoute);
app.use('/api/cart', cartRoute);

app.get("/", (req,res)=> {
    res.send('Hello World!');
})

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
});
