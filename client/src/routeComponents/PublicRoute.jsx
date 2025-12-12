import { useAuth } from "../context-provider/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p>LOADING...</p>;

  return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
