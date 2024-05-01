import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StartPage from "../pages/StartPage/StartPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { CreateEventPage } from "../pages/CreateEventPage/CreateEventPage";
import { VisitEventQRScannerPage } from "../pages/VisitEventQRScannerPage/VisitEventQRScannerPage";
import { EventsToVisitPage } from "../pages/EventsToVisitPage/EventsToVisitPage";
import { CreatedEventsPage } from "../pages/CreatedEventsPage/CreatedEventsPage";
import UserDataPage from "../pages/UserDataPage/UserDataPage";
import { OpenEventForVisitorsByScanner } from "../pages/OpenEventForVisitorsByScanner/OpenEventForVisitorsByScanner";
import OpenEventForVisitorsByQRCode from "../pages/OpenEventForVisitorsByQRCode/OpenEventForVisitorsByQRCode";
import EventDetails from "../pages/EventDetails/EventDetails";

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
            element={<VisitEventQRScannerPage />}
          />
          <Route path="/events-to-visit" element={<EventsToVisitPage />} />
          <Route path="/created-events" element={<CreatedEventsPage />} />
          <Route path="/user-data" element={<UserDataPage />} />
          <Route exact path="/visit-event-scanner/:id" element={<VisitEventQRScannerPage />} />
          <Route exact path="/start-event-by-scanner/:id" element={<OpenEventForVisitorsByScanner />} />
          <Route exact path="/start-event-by-qrcode/:id" element={<OpenEventForVisitorsByQRCode />} />
          <Route exact path="/event-details/:id/:isVisior" element={<EventDetails/>} />
        </Route>
        <Route path="*" element={<StartPage />} />
      </Route>
    </Routes>
  );
};

export default Pages;
