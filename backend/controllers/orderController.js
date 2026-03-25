import orderService from "../services/order.service.js";

const placeOrder = async (req, res, next) => {
    try {
        const order = await orderService.placeOrder(req, res);
        if (!order) {
            return res.status(400).json({ message: "Failed to place order", success: false });
        }
        res.status(201).json(order);
    } catch (error) {
        console.error("Error in placeOrder:", error);
        next(error);
    }
}

export { placeOrder };