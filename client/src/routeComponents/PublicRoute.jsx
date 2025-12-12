import { useAuth } from "../context-provider/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loading />;

  return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
