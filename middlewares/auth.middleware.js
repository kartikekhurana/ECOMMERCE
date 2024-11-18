import jwt from "jsonwebtoken";
import { users } from "../models/user.models.js";
//protected

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = users.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({ message: "You are not an admin" });
    }
  } catch (error) {
    console.log(error);
  }
};
