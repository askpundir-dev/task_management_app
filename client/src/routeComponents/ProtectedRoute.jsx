import { useAuth } from "../context-provider/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log("isAuthenticated:", isAuthenticated);
  console.log("loading is:", loading);

  if (loading) return <Loading />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
