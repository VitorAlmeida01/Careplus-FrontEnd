// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("authToken");

  console.log(token)

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}