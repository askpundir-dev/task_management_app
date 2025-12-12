import express from "express";
import {
  register,
  login,
  logout,
  getAuthStatus,
} from "../controllers/authControllers.js";
import { auth } from "../middlewares/auth.js";
import { loginLimiter, registerLimiter } from "../middlewares/authLimiters.js";

const router = express.Router();

router.post("/register", registerLimiter, register);

router.post("/login", loginLimiter, login);

router.get("/logout", auth, logout);

router.get("/status", auth, getAuthStatus);

export default router;
