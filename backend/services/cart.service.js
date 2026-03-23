import userModel from "../models/userModel.js";

class CartService {
  static async addToCart(req, res) {
    const userId = req.body.userId;
    const foodId = req.body.itemId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
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
    const userId = req.body.userId;
    const foodId = req.body.itemId;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    let cartObject = userData.cartObject || {};

    if (cartObject[foodId] > 0) {
      cartObject[foodId] -= 1;
    }

    if (cartObject[foodId] === 0) {
      delete cartObject[foodId];
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartObject: cartObject },
      { returnDocument: "after" },
    );
    return updatedUser;
  }

  static async getCart(req, res) {
    const userId = req.body.userId;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartObject;
    res.json({ success: true, cartData });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return userData;
  }
}

export default CartService;
