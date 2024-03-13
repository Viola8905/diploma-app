import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({}) => {
  const userIsAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );

  if (!userIsAuthenticated) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render children routes if authenticated and authorized
};

export default ProtectedRoute;
