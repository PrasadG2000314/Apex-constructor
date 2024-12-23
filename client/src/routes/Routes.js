import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import Login from "../pages/UserManagement/Login.js";
import Signup from "../pages/UserManagement/SignUp.js";
import UserDashboard from "../pages/UserManagement/UserDashboard.js";
import AddSiteDetails from "../pages/SiteManagement/SiteDetails.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Site Management Routes */}
        <Route path="/details" element={<AddSiteDetails />} />

        {/* User Management Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userDashboard" element={<UserDashboard />} />

        {/* General Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
