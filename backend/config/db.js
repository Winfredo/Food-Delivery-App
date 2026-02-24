import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)

}
//mongoose.connect('mongodb+srv://winfred_db_user:sWRbm5OS0eB4IAMu@cluster0.vkyv9wk.mongodb.net/food-delivery-app'