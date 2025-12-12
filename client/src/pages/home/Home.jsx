import { useEffect, useState } from "react";
import { useAuth } from "../../context-provider/AuthContext";
import { getLogoutResponse } from "../../api/userApi";
import {
  createTaskRequest,
  getAllTasksRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../../api/todoApi";
import Header from "./Header";
import FormCard from "./FormCard";
import Tasks from "./Tasks";

const Home = () => {
  const { setIsAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    // FETCH ALL TASKS
    const fetchTasks = async () => {
      try {
        const res = await getAllTasksRequest();
        if (res.success) {
          setTasks(res.tasks);
        }
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchTasks();
  }, [reload]);

  // CREATE OR UPDATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await updateTaskRequest(editId, { title, description });
        if (res.success) {
          // alert("Task updated!");
          setEditId(null);
        }
      } else {
        const res = await createTaskRequest(title, description);
        if (res.success) {
          // alert("Task created!");
          console.log(res.message);
        }
      }

      setTitle("");
      setDescription("");
      setReload((prev) => !prev); // retriggers useEffect();
    } catch (error) {
      alert(error.message);
    }
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;

    try {
      const res = await deleteTaskRequest(id);
      if (res.success) {
        alert("Task deleted!");
        setReload((prev) => !prev);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    if (!confirm("Are you sure?")) return;

    const res = await getLogoutResponse();
    if (res.success) {
      alert(res.message);
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Header handleLogout={handleLogout} />

      <FormCard
        {...{
          editId,
          handleSubmit,
          title,
          setTitle,
          description,
          setDescription,
        }}
      />

      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create one!</p>
      ) : (
        <div className="space-y-4">
          <Tasks
            {...{
              tasks,
              setEditId,
              setTitle,
              setDescription,
              handleDelete,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
