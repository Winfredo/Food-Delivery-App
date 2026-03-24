import userModel from "../models/userModel.js";

class CartService {
  static async addToCart(req, res) {
    const userId = req.body.userId;
    const foodId = req.body.foodId;

    if (!userId) {
      return null;
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return null;
    }

    let cartObject = userData.cartObject || {};

    if (!cartObject[foodId]) {
      cartObject[foodId] = 1;
    } else {
      cartObject[foodId] += 1;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartObject: cartObject },
      { returnDocument: "after" },
    );

    return updatedUser;
  }

static async removeFromCart(req, res) {
    try {
        const userId = req.body.userId;
        const foodId = req.body.foodId;

        if (!userId || !foodId) {
            return res.status(400).json({
                success: false,
                message: "User ID and Food ID are required"
            });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let cartObject = userData.cartObject || {};

        if (!cartObject[foodId]) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        cartObject[foodId] -= 1;
        if (cartObject[foodId] === 0) {
            delete cartObject[foodId];
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartObject: cartObject },
            { returnDocument: "after" }
        );

        return res.json({
            success: true,
            message: "Item removed from cart",
            cart: updatedUser.cartObject
        });

    } catch (error) {
        console.error("Error in removeFromCart:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

  static async getCart(req, res) {
    const userId = req.body.userId;

    if (!userId) {
      return null;
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return null;
    }

    const cartData = userData.cartObject || {};
    return { userData, cartData };
  }
}

export default CartService;
