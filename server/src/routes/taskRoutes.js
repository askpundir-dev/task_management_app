import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";

const router = express.Router();

// CREATE
router.post("/create", auth, createTask);

// GET / READ
router.get("/", auth, getAllTasks);

// UPDATE
router.put("/update/:id", auth, updateTask);

// DELETE
router.delete("/delete/:id", auth, deleteTask);

export default router;
