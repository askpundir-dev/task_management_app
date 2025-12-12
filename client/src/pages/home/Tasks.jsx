const Tasks = ({
  tasks,
  setEditId,
  setTitle,
  setDescription,
  handleDelete,
}) => {
  return tasks.map((task) => (
    <div key={task.id} className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-700">{task.description}</p>
          <p className="text-xs text-gray-400 mt-1">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
            onClick={() => {
              setEditId(task.id);
              setTitle(task.title);
              setDescription(task.description);
            }}
          >
            Edit
          </button>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));
};

export default Tasks;
