import userModel from "../models/userModel.js";

class CartService {
  static async addToCart(req, res) {
    const userId = req.body.userId;
    const foodId = req.body.itemId;

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
    const userId = req.body.userId;
    const foodId = req.body.itemId;

    if (!userId || !foodId) {
        return null;
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
        return null;
    }
    let cartObject = userData.cartObject || {};

    if (!cartObject[foodId]) {
        return null;
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

    return updatedUser;
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
