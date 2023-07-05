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

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Overview />} />
        <Route path="estimates" element={<Estimates />} />

        <Route path="customers">
          <Route index element={<Customers />} />
          <Route path=":userId" element={<Single />} />
          <Route path="new" element={<New />} />
        </Route>
        <Route path="team" element={<Team />} />
        <Route path="hardware" element={<Hardware />} />
        <Route path="finishes" element={<Finishes />} />

        <Route path="defaults" element={<Defaults />} />
        <Route path="settings" element={<Settings />} />
        <Route path="staff" element={<Staff />} />
      </Route>
      <Route path="*" element={<Overview />}></Route>
    </Routes>
  );
};

export default AuthenticatedRoutes;
