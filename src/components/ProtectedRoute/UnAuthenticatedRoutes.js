import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/login";
import SuperAdminLogin from "../superLogin/superAdmin";

const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/adminlogin" element={<SuperAdminLogin />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default UnAuthenticatedRoutes;
