import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: 0,
    },
    role: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

export const users = mongoose.model("users", userSchema);
