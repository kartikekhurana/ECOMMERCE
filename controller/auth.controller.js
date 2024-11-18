import { hashPassword } from "../helpers/auth.helper.js";
import { users } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      throw new ApiError("name is required");
    }
    if (!password) {
      throw new ApiError("password is required");
    }
    if (!email) {
      throw new ApiError("email is required");
    }
    if (!phone) {
      throw new ApiError("phone is required");
    }
    if (!address) {
      throw new ApiError("address is required");
    }

    const exisitingUser = await users.findOne({ email });

    // Check if user already exists
    if (exisitingUser) {
      console.log("User already exists");
      return res.status(201).send({
        success: true,
        message: "user already exists",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new users({
      name,
      email,
      password: hashedPassword,
      phone,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};
