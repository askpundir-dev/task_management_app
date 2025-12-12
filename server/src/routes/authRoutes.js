import express from "express";
import {
  register,
  login,
  logout,
  getAuthStatus,
} from "../controllers/authControllers.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", auth, logout);

router.get("/status", auth, getAuthStatus);

export default router;
