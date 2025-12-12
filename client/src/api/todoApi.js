import api from "./userApi";
import { throwAPIError } from "../utils/apiError";

// ------------------------------
// CREATE TASK
// ------------------------------
export const createTaskRequest = async (title, description) => {
  try {
    const response = await api.post("/tasks/create", {
      title,
      description,
    });
    return response.data; // { success, message, task }
  } catch (error) {
    throwAPIError(error);
  }
};

// ------------------------------
// GET ALL TASKS
// ------------------------------
export const getAllTasksRequest = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data; // { success, tasks,count }
  } catch (error) {
    throwAPIError(error);
  }
};

// ------------------------------
// UPDATE TASK
// ------------------------------
export const updateTaskRequest = async (taskId, updatedFields) => {
  // updatedFields = { title, description }
  try {
    const response = await api.put(`/tasks/update/${taskId}`, updatedFields);
    return response.data; // { success, message }
  } catch (error) {
    throwAPIError(error);
  }
};

// ------------------------------
// DELETE TASK
// ------------------------------
export const deleteTaskRequest = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/delete/${taskId}`);
    return response.data; // { success, message }
  } catch (error) {
    throwAPIError(error);
  }
};
