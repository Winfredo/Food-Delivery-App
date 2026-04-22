import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

let stripe;

function getStripe() {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

class OrderService {
  static async placeOrder(req, res, next) {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:3000";

    try {
      // Create and save the order
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        address: req.body.address,
        status: "Food Processing",
        deliveryFee: req.body.deliveryFee,
      });
      const savedOrder = await newOrder.save();

      await userModel.findByIdAndUpdate(req.body.userId, { cartObject: {} });

      const lineItems = req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      }));

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Delivery Charge",
          },
          unit_amount: Math.round(req.body.deliveryFee * 100),
        },
        quantity: 1,
      });

      const stripeInstance = getStripe();
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${savedOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${savedOrder._id}`,
        customer_email: req.body.email,
      });

      return {
        success: true,
        message: "Order placed successfully",
        orderId: savedOrder._id,
        checkoutUrl: session.url,
        sessionId: session.id,
        clientSecret: session.payment_intent,
      };
    } catch (error) {
      console.error("Error in placeOrder:", error.message);
      console.error("Full error:", error);
      res.json({ success: false, message: "Failed to place order" });
    }
  }

  static async verifyOrder(success, orderId) {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Payment Successful",
      });
      return { success: true, message: "Order verified successfully" };
    } else {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: false,
        status: "Payment Failed",
      });
      return { success: false, message: "Order verification failed" };
    }
  }

  static async deleteOrder(orderId) {
    try {
      const deletedOrder = await orderModel.findByIdAndDelete(orderId);
      if (!deletedOrder) return { success: false, message: "Order not found" };
      return { success: true, message: "Order deleted successfully" };
    } catch (error) {
      return { success: false, message: "Failed to delete order" };
    }
  }

  static async userOrder(userId) {
    try {
      const orders = await orderModel
        .find({ userId: userId })
        .sort({ createdAt: -1 });
      return orders;
    } catch (error) {
      return { success: false, message: "Failed to fetch user orders" };
    }
  }

  static async listOrders() {
    try {
      const orders = await orderModel.find().sort({ createdAt: -1 });
      return orders;
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch orders",
      };
    }
  }

  static async statusUpdate(orderId, newStatus) {
    try {
      const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
        status: newStatus,
      });

      if (!updatedOrder) {
        return {
          success: false,
          message: "Order not found",
        };
      }

      return {
        success: true,
        message: "Order status updated successfully",
      };
    } catch (error) {
      console.error("Error in statusUpdate:", error);
      return {
        success: false,
        message: "Failed to update order status",
      };
    }
  }

  static async retryPayment(orderId) {
    const frontend_url = "http://localhost:3000";

    try {
      const order = await orderModel.findById(orderId);
      if (!order) {
        return { success: false, message: "Order not found" };
      }

      const lineItems = order.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      }));

      const deliveryFee = order.deliveryFee || 2;
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Delivery Charge",
          },
          unit_amount: Math.round(deliveryFee * 100),
        },
        quantity: 1,
      });

      const stripeInstance = getStripe();
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${orderId}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${orderId}`,
      });

      return {
        success: true,
        message: "Payment retry initiated",
        checkoutUrl: session.url,
      };
    } catch (error) {
      console.error("Error in retryPayment:", error);
      return { success: false, message: "Failed to retry payment" };
    }
  }
}

export default OrderService;
