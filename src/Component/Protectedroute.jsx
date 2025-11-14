import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAdminAuth = localStorage.getItem("admin_auth");

  if (!isAdminAuth) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;
