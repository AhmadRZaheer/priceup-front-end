import React from "react";
import { Routes, Route } from "react-router-dom";
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
import AddOns from "../../pages/AddOns/addOns";
import GlassType from "../../pages/GlassType/glassType";
import GlassTreatement from "../../pages/GlassTreatement/glassTreatement";
import Existing from "../../pages/Existing/Existing";

const AuthenticatedRoutesAdmin = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Overview />} />
        <Route path="/Estimates/">
          <Route index element={<Existing />} />
          <Route path="Steps" element={<Estimates />} />
        </Route>

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
        <Route path="Addons" element={<AddOns />} />
        <Route path="GlassType" element={<GlassType />} />
        <Route path="GlassTreatement" element={<GlassTreatement />} />
      </Route>
      <Route path="*" element={<Overview />}></Route>
    </Routes>
  );
};

export default AuthenticatedRoutesAdmin;
