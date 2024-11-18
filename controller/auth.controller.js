import { comparePassword, hashPassword } from "../helpers/auth.helper.js";
import { users } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Invalid email or password");
    }
    const user = await users.findOne({ email });
    if (!user) {
      throw new ApiError(404, "email not registered");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      throw new ApiError(200, "Invalid password");
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).send({
      success: true,
      message: "user logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while logging in",
    });
  }
};

export const testController = async (req, res) => {
  res.send("protected route");
};
