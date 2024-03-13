import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StartPage from "../pages/StartPage/StartPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { CreateEventPage } from "../pages/CreateEventPage/CreateEventPage";
import { VisitEventQRScanner } from "../pages/VisitEventQRScanner/VisitEventQRScanner";

const Pages = () => {
  const userIsAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<StartPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/registration" element={<AuthPage />} />
        <Route path="/unauthorized" element={<StartPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/test" element={<AuthPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route
            path="/visit-event-qr-scanner"
            element={<VisitEventQRScanner />}
          />
        </Route>
        <Route path="*" element={<StartPage />} />
      </Route>
    </Routes>
  );
};

export default Pages;
