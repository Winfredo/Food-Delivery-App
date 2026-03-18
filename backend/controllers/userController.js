import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import UserService from "../services/user.service.js";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.loginUser({ email, password });
        if (!user) {
            res.status(401).json({ success: false, message: "Invalid email or password" });``
        }
        const token = generateToken(user._id);
        console.log("Generated Token:", token);
        res.json({ success: true, message: "Login successful", user, token });

    } catch (error) {
        console.error("Error in loginUser:", error);
        next(error);
    }
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    if(!validator.isEmail(email)) {
        return res.json({success:false, message: "Enter valid email" });
    }

    if (password.length < 7) {
        return res.json({success:false, message: "Password must be at least 6 characters long" });
    }
    const user = await UserService.createUser({ name, email, password });
    const token = generateToken(user._id);
    console.log("Generated Token:", token);
    res.status(201).json({ success: true, message: "User created successfully", user, token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    next(error);    
  }
};



