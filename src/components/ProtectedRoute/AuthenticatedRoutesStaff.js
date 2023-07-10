import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "../../pages/home/Overview";
import Customers from "../../pages/Customers/Customers";
import Single from "../../pages/singlle/Single";
import New from "../../pages/new/New";
import Team from "../../pages/Team/Team";
import Hardware from "../../pages/Hardware/Hardware";
import Finishes from "../../pages/Finishes/Finishes";
import Defaults from "../../pages/Layouts/Defaults";
import Estimates from "../../pages/Estimates/Estimates";
import Settings from "../../pages/Settings/Settings";
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
