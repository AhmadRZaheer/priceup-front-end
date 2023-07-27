import { Navigate, Route, Routes } from "react-router-dom";
import Staff from "../../pages/EstimatesMobile/Staff";
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
import Login from "../Login/login";
import SuperAdminLogin from "../superLogin/superAdmin";
import { parseJwt } from "./AuthVerify";
import Admin from "../../pages/Admin/Admin";
import { useMemo } from "react";

const AppRoutes = () => {
  const token = localStorage.getItem("token");
  const decodedToken = useMemo(() => {
    return parseJwt(token);
  }, [token]);

  // Function to check if the user is authenticated based on the presence of the JWT token
  const isAuthenticated = () => {
    return !!decodedToken;
  };

  // Function to check if the user is a Super Admin
  const isSuperAdmin = () => {
    return decodedToken?.role === "super_admin";
  };

  // Function to check if the user is an Admin or Staff
  const isAdmin = () => {
    return decodedToken?.role === "admin";
  };

  const isStaff = () => {
    return decodedToken?.role === "staff";
  };

  // Function to get the appropriate homepage URL based on the user role
  const getHomepageURL = () => {
    if (isSuperAdmin()) {
      return "/admin";
    } else if (isAdmin()) {
      return "/overview";
    } else if (isStaff()) {
      return "/staff";
    } else {
      return "/login"; // Redirect to login page for unauthenticated users
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
      {/* Catch-all route for wrong URLs */}
      <Route path="*" element={<Navigate to={getHomepageURL()} />} />
    </Routes>
  );
};

export default AppRoutes;
