import { getLogoutResponse } from "../api/userApi";
import { useAuth } from "../context-provider/AuthContext";

const Home = () => {
  const { setIsAuthenticated } = useAuth();
  const handelLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;
    try {
      const res = await getLogoutResponse();
      if (res.success) {
        alert(res.message);
        setIsAuthenticated(false);
        // navigate("/login");
      }
    } catch (error) {
      alert(error.message || "Logout failed");
    }
  };

  return (
    <div>
      Home
      <button onClick={() => handelLogout()}>logout</button>
    </div>
  );
};

export default Home;
