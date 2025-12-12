import { db } from "../db/db.js";
import { checkTaskOwnership } from "../utils/checkTaskOwnership.js";

/**
 * Creates a new task for the authenticated user.
 */
export const createTask = async (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    return res
      .status(400)
      .json({ success: false, message: "Request Body missing." });
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Title and description are required." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO todos (title, description, userId) VALUES (?, ?, ?)",
      [title, description, req.userId]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      todo: {
        id: result.insertId,
        title,
        description,
        userId: req.userId,
      },
    });
  } catch (err) {
    console.error("Error creating task:", err);
    res
      .status(500)
      .json({ success: false, message: "An internal server error occurred." });
  }
};

/**
 * Retrieves all tasks for the authenticated user.
 */

export const getAllTasks = async (req, res) => {
  try {
    const [tasks] = await db.query(
      "SELECT id, title, description, createdAt FROM todos WHERE userId = ?",
      [req.userId]
    );

    res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500)
      .json({ success: false, message: "An internal server error occurred." });
  }
};

/**
 * Updates a specific task belonging to the authenticated user.
 */

export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const { id: taskId } = req.params;

  // 1. Validation
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required for update.",
    });
  }

  try {
    // 2. Check if the task exists and belongs to the user before attempting update
    if (!(await checkTaskOwnership(taskId, req.userId))) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you do not have permission to update it.",
      });
    }

    // 3. Database Update
    const [result] = await db.query(
      "UPDATE todos SET title=?, description=? WHERE id=? AND userId=?",
      [title, description, taskId, req.userId]
    );
    console.log(result);

    // 4. Success Response with 200 status
    res
      .status(200)
      .json({ success: true, message: "Task updated successfully." });
  } catch (err) {
    console.error("Error updating task:", err);
    res
      .status(500)
      .json({ success: false, message: "An internal server error occurred." });
  }
};

export const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  try {
    // 1. Check if the task exists and belongs to the user before attempting deletion
    if (!(await checkTaskOwnership(taskId, req.userId))) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you do not have permission to delete it.",
      });
    }

    // 2. Database Delete
    const [result] = await db.query(
      "DELETE FROM todos WHERE id=? AND userId=?",
      [taskId, req.userId]
    );

    // 3. Success Response with 200 status
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully." });
  } catch (err) {
    console.error("Error deleting task:", err);
    res
      .status(500)
      .json({ success: false, message: "An internal server error occurred." });
  }
};
