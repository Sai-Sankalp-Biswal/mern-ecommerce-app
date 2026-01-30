import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./auth";

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
