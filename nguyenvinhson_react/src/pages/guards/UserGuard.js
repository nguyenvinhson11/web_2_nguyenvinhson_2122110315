import { Navigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const UserGuard = ({ children }) => {
  const token = AuthService.getToken();
  const user = AuthService.getUser();

  if (!token || !user || user.role !== "customer") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserGuard;
