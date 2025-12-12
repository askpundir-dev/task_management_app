const FormCard = ({editId,handleSubmit,title,setTitle,description,setDescription}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editId ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded px-3 py-2 focus:outline-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border rounded px-3 py-2 h-24 focus:outline-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default FormCard;
