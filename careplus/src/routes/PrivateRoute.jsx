import { Navigate } from "react-router-dom";
import { getToken, getUserRoles } from "../service/login/jwtDecoder"

export default function PrivateRoute({ children, allowedRoles }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRoles = getUserRoles();

    const hasPermission = allowedRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}