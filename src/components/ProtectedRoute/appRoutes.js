import { Navigate, Route, Routes } from "react-router-dom";
import Staff from "../../pages/EstimatesMobile/staff";
import Overview from "../../pages/home/overview";
import Customers from "../../pages/Customers/customers";
import Single from "../../pages/singlle/single";
import New from "../../pages/new/new";
import Team from "../../pages/Team/team";
import Hardware from "../../pages/Hardware/hardware";
import Finishes from "../../pages/Finishes/finishes";
import Defaults from "../../pages/Layouts/defaults";
import Estimates from "../../pages/Estimates/estimates";
import Settings from "../../pages/Settings/settings";
import AddOns from "../../pages/AddOns/addOns";
import GlassType from "../../pages/GlassType/glassType";
import GlassTreatement from "../../pages/GlassTreatement/glassTreatement";
import Existing from "../../pages/Existing/existing";
import Login from "../Login/login";
import SuperAdminLogin from "../superLogin/superAdmin";
import { parseJwt } from "./authVerify";
import Admin from "../../pages/Admin/admin";
import { useMemo } from "react";

const AppRoutes = () => {
  const token = localStorage.getItem("token");
  const decodedToken = useMemo(() => {
    return parseJwt(token);
  }, [token]);

  const isAuthenticated = () => {
    return !!decodedToken;
  };

  const isSuperAdmin = () => {
    return decodedToken?.role === "super_admin";
  };

  const isAdmin = () => {
    return decodedToken?.role === "admin";
  };

  const isStaff = () => {
    return decodedToken?.role === "staff";
  };

  const getHomepageURL = () => {
    if (isSuperAdmin()) {
      return "/admin";
    } else if (isAdmin()) {
      return "/overview";
    } else if (isStaff()) {
      return "/staff";
    } else {
      return "/login"; 
    }
  };

  return (
    <Routes>
      <Route
        path="/adminlogin"
        element={
          !isAuthenticated() ? (
            <SuperAdminLogin />
          ) : (
            <Navigate to={getHomepageURL()} />
          )
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated() ? <Login /> : <Navigate to={getHomepageURL()} />
        }
      />
      {isAdmin() ? (
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
          <Route path="*" element={<Overview />}></Route>
        </Route>
      ) : isStaff() ? (
        <Route path="/">
          <Route index element={<Staff />} />
          <Route path="*" element={<Staff />}></Route>
        </Route>
      ) : isSuperAdmin() ? (
        <Route path="/">
          <Route index element={<Admin />} />
          <Route path="*" element={<Admin />} />
        </Route>
      ) : (
        ''
      )}
      <Route path="*" element={<Navigate to={getHomepageURL()} />} />
    </Routes>
  );
};

export default AppRoutes;
