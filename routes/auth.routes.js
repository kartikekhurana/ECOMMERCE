import express from "express";
import { registerController } from "../controller/auth.controller.js";
const router = express.Router();

//router
router.post("/register", registerController);

export default router;
