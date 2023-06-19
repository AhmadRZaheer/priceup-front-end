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
        <Route path="Team" element={<Team />} />
        <Route path="Hardware" element={<Hardware />} />
        <Route path="Finishes" element={<Finishes />} />

        <Route path="Defaults" element={<Defaults />} />
      </Route>
      <Route path="*" element={<Overview />}></Route>
    </Routes>
  );
};

export default AuthenticatedRoutes;
