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

const verifyOrder = async (req,res,next) => {
    const {success, orderId} = req.body;

    try {
        if (success === "true") {
            await orderService.verifyOrder(req, res);
            return res.status(200).json({ message: "Order verified successfully", success: true });
        } else {
            await orderService.verifyOrder(req, res);
            return res.status(200).json({ message: "Order verification failed", success: false });
        }

    }catch (error) {
        console.log("Error in verifyOrder:", error);
        next(error);
    }
}

export { placeOrder, verifyOrder };