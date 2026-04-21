import jwt from "jsonwebtoken";

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const adminController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const token = generateToken(email);
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    next(error);
  }
};