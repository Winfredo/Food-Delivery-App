import CartService from "../services/cart.service.js";

const addToCart = async (req, res, next) => {
  try {
    const user = await CartService.addToCart(req, res);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const user = await CartService.removeFromCart(req, res);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const result = await CartService.getCart(req, res);
    if (!result || !result.userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: true, cartData: result.cartData });
  } catch (error) {
    console.error("Error in getCart:", error);
    next(error);
  }
};

export { addToCart, removeFromCart, getCart };
