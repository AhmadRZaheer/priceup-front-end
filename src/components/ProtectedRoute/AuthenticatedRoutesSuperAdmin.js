import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "../../pages/Admin/Admin";
import SuperAdminLogin from "../superLogin/superAdmin";

const AuthenticatedRouteSuperAdmin = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Admin />} />
        <Route path="/adminlogin" element={<SuperAdminLogin />} />
      </Route>
      <Route path="admin" element={<Admin />} />
    </Routes>
  );
};

export default AuthenticatedRouteSuperAdmin;
