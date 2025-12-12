import { db } from "../db/db.js";

// Helper function to check if a task exists and belongs to the user
export const checkTaskOwnership = async (taskId, userId) => {
  const [rows] = await db.query(
    "SELECT id FROM todos WHERE id = ? AND userId = ?",
    [taskId, userId]
  );
  return rows && rows.length > 0;
};
