import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StartPage from "../pages/StartPage/StartPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";

const Pages = () => {
  const userIsAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );
  const userRole = useSelector((state) => state.user.userRole);
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<StartPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/registration" element={<AuthPage />} />
        <Route path="/unauthorized" element={<StartPage />} />
        <Route element={<ProtectedRoute allowedRoles={[userRole]} />}>
          <Route path="/test" element={<AuthPage />} />
        </Route>
        <Route path="*" element={<StartPage />} />
      </Route>
    </Routes>
  );
};

export default Pages;