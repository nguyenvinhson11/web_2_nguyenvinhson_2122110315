import { Navigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const AdminGuard = ({ children }) => {
  const token = AuthService.getToken();
  const user = AuthService.getUser();

  if (!token || !user) {
    return <Navigate to="/loginadmin" replace />;
  }

  return children;
};

export default AdminGuard;
