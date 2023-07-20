import React from "react";
import { Routes, Route } from "react-router-dom";

import Staff from "../../pages/EstimatesMobile/Staff";
import Login from "../Login/login";

const AuthenticatedRouteStaff = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Staff />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<Staff />}></Route>
    </Routes>
  );
};

export default AuthenticatedRouteStaff;
