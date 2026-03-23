import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
class UserService {
  static async createUser({ name, email, password }) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return null;
    }
    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    return savedUser;
  }

  static async loginUser({ email, password }) {
    if (!email || !password) {
      return null;
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return null;
    }
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}

export default UserService;
