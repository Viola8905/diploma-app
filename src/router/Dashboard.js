import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { FloatButton } from 'antd';

const Dashboard = () => {
  return (
    <div className="wrapper" style={{ boxShadow: "box-shadow: 0 0 35px #eee" }}>
      <NavBar />
      <div className="main">
        <Outlet />
        <FloatButton.BackTop />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;