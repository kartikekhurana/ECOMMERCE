import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/auth.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
const router = express.Router();

//router
//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);
export default router;
