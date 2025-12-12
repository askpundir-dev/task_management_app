const Header = ({ handleLogout }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl lg:text-3xl font-bold">Task Management App</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
