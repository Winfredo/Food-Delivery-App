import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

//db connection
connectDB();

app.get("/", (req,res)=> {
    res.send('Hello World!');
})

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
});

//mongodb+srv://winfred_db_user:sWRbm5OS0eB4IAMu@cluster0.vkyv9wk.mongodb.net/?