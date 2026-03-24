import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
class OrderService {
    static async placeOrder(req, res) {
            const newOrder = new orderModel({
                userId: req.body.userId,
                items: req.body.items,
                totalAmount: req.body.totalAmount,
                address: req.body.address,
                status: "pending",
            });
            const savedOrder = await newOrder.save();
            return savedOrder;
    }
}

export default OrderService;