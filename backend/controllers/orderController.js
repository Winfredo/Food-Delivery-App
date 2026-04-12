import orderService from "../services/order.service.js";

const placeOrder = async (req, res, next) => {
  try {
    const order = await orderService.placeOrder(req, res);
    if (!order) {
      return res
        .status(400)
        .json({ message: "Failed to place order", success: false });
    }
    res.status(201).json(order);
  } catch (error) {
    console.error("Error in placeOrder:", error);
    next(error);
  }
};

// orderController.js
const verifyOrder = async (req, res, next) => {
  const { success, orderId } = req.body;
  if (!success || !orderId) {
    return res.status(400).json({
      message: "Missing required fields: success and orderId",
      success: false,
    });
  }

  try {
    const result = await orderService.verifyOrder(success, orderId);
    
    return res.status(200).json({
      message: result.message,
      success: result.success
    });
  } catch (error) {
    console.log("Error in verifyOrder:", error);
    next(error);
  }
};

const userOrder = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    
    if (!userId) {
      return res.status(400).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const orders = await orderService.userOrder(userId);
    return res.status(200).json({ success: true, data: orders, message: "User orders fetched successfully" });
  } catch (error) {
    console.error("Error in userOrder:", error);
    next(error);
  }
};

const listOrders = async (req, res, next) => {
  try {
    const orders = await orderService.listOrders();
    return res.status(200).json({ success: true, data: orders, message: "Orders fetched successfully" });
  } catch (error) {
    console.error("Error in listOrders:", error);
    next(error);
  }
};

const statusUpdate = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({
        message: "Missing required fields: orderId and status",
        success: false,
      });
    }

    const result = await orderService.statusUpdate(orderId, status);
    return res.status(200).json({
      message: result.message,
      success: result.success
    });
  } catch (error) {
    console.error("Error in statusUpdate:", error);
    next(error);
  }
}

const retryPayment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({
        message: "Missing required field: orderId",
        success: false,
      });
    }

    const result = await orderService.retryPayment(orderId);
    if (result.success) {
      return res.status(200).json({
        success: true,
        checkoutUrl: result.checkoutUrl,
        message: result.message
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error("Error in retryPayment:", error);
    next(error);
  }
}

export { placeOrder, verifyOrder, userOrder,listOrders,statusUpdate,retryPayment };
