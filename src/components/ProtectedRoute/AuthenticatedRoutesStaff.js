import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Staff from "../../pages/EstimatesMobile/Staff";
import Login from "../Login/login";
import ExitingQuotes from "../ExtimatesMoblie/existingQuotes";
import Exiting from "../../pages/StaffMobile/ExitingQuotes";

const AuthenticatedRouteStaff = () => {
  return (
    <Routes>
      {/* <Route path="/">
        <Route path="/" element={<Staff />} />
        <Route path="/login" element={<Login />} />
      </Route> */}
      <Route path="/Quotes/">
        <Route index element={<Exiting />} />
        <Route path="staff" element={<Staff />} />
      </Route>

      <Route path="*" element={<Exiting />}></Route>
    </Routes>
  );
};

export default AuthenticatedRouteStaff;
