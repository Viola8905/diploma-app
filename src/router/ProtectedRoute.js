import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const userIsAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );
  const userRole = useSelector((state) => state.user.userRole);

  if (!userIsAuthenticated) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  } else if (allowedRoles && !allowedRoles.includes(userRole)) {
    // User role not authorized, redirect to an unauthorized page or another appropriate page
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Render children routes if authenticated and authorized
};

export default ProtectedRoute;