import { Navigate, Route, Routes } from "react-router-dom";
// import Staff from "../../pages/EstimatesMobile/staff";
import Overview from "@/pages/home/overview";
import Customers from "@/pages/Customers/customers";
import Single from "@/pages/singlle/single";
import New from "@/pages/new/new";
import Team from "@/pages/Team/team";
import Hardware from "@/pages/Hardware/hardware";
import Finishes from "@/pages/Finishes/finishes";
import Defaults from "@/pages/Layouts/defaults";
import Estimates from "@/pages/Estimates";
import Settings from "@/pages/Settings/settings";
import AddOns from "@/pages/AddOns/addOns";
import GlassType from "@/pages/GlassType/glassType";
import GlassAddon from "@/pages/GlassAddon/glassAddon";
// import Existing from "@/pages/Existing/existing";
import Login from "@/components/Login/login";
// import SuperAdminLogin from "../superLogin/superAdmin";
import { parseJwt } from "./authVerify";
import Admin from "@/pages/Admin/admin";
import { useMemo } from "react";
import LandingPage from "@/pages/LandingPage/landingPage";
import AdminTeam from "@/pages/TeamAdmin/adminTeam";
import AdminUser from "@/pages/UserSuperAdmin/userAdmin";
import Super_SuperAdmin from "@/pages/Super_Super-Admin/superAdmins";

import {
  getHomepageURL,
  isAdmin,
  isAuthenticated,
  isCustomAdmin,
  isStaff,
  isSuperAdmin,
} from "@/utilities/authentications";
import CustomAdminPage from "@/pages/CustomAdmins/customAdmin";
import StaffLocationPage from "@/pages/stafffLocations/staffLocationPage";
import PDFPreview from "@/pages/PDFPreview";
import MirrorsEdgeWork from "@/pages/Mirrors/EdgeWorks";
import MirrorsGlassType from "@/pages/Mirrors/GlassTypes";
import MirrorsGlassAddon from "@/pages/Mirrors/GlassAddons";
import MirrorsHardware from "@/pages/Mirrors/Hardwares";

import EstimateCategory from "@/pages/EstimateCategory";
import EstimateLayouts from "@/pages/EstimateLayouts";
import EstimateDimensions from "@/pages/EstimateDimensions";
import EstimateReview from "@/pages/EstimateReview";
import Notification from "@/pages/Notification";
import Projects from "@/pages/Projects";
import ProjectCreate from "@/pages/Projects/Create";
import ProjectDetail from "@/pages/Projects/Detail";
import EditLayout from "../ShowerLayout/EditLayout";
import EidtCustomersPage from "@/pages/EditCustomer/editCustomer";

const AppRoutes = () => {
  const token = localStorage.getItem("token");
  const decodedToken = useMemo(() => {
    return parseJwt(token);
  }, [token]);
  const superSuperAdminsList =
    JSON.parse(process.env.REACT_APP_SUPER_USER_ADMIN) ?? [];

  return (
    <Routes>
      {/* <Route
        path="/adminlogin"
        element={
          !isAuthenticated(decodedToken) ? (
            <SuperAdminLogin />
          ) : (
            <Navigate to={getHomepageURL(decodedToken)} />
          )
        }
      /> */}
      <Route
        path="/login"
        element={
          !isAuthenticated(decodedToken) ? (
            <Login />
          ) : (
            <Navigate to={getHomepageURL(decodedToken)} />
          )
        }
      />
      {isAdmin(decodedToken) ||
      (isCustomAdmin(decodedToken) && decodedToken?.company_id?.length) ? (
        <Route path="/">
          <Route index element={<Overview />} />
          <Route path="projects/">
            <Route index element={<Projects />} />
            <Route path="create" element={<ProjectCreate />} />
            <Route path=":id" element={<ProjectDetail />} />
          </Route>
          <Route path="/estimates/">
            <Route index element={<Estimates />} />
            <Route path="category" element={<EstimateCategory />} />
            <Route path="layouts" element={<EstimateLayouts />} />
            <Route path="dimensions" element={<EstimateDimensions />} />
            <Route path="review" element={<EstimateReview />} />
            <Route path=":id/pdf-preview" element={<PDFPreview />} />
          </Route>
          <Route path="/customers/">
            <Route index element={<Customers />} />
            <Route path="edit" element={<EidtCustomersPage />} />

            {/* <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New />} /> */}
            {/* <Route path="steps" element={<Estimates />} /> */}
          </Route>
          <Route path="team" element={<Team />} />
          <Route path="hardware" element={<Hardware />} />
          <Route path="finishes" element={<Finishes />} />

          <Route path="/layouts/">
            <Route index element={<Defaults />} />
            <Route path="edit" element={<EditLayout />} />
          </Route>
          {/* <Route path="layouts" element={<Defaults />} /> */}
          <Route path="settings" element={<Settings />} />
          <Route path="hardware-addons" element={<AddOns />} />
          <Route path="glass-types" element={<GlassType />} />
          <Route path="glass-addons" element={<GlassAddon />} />
          {/** Mirros */}
          <Route path="mirrors/">
            <Route index element={<MirrorsHardware />} />
            <Route path="hardwares" element={<MirrorsHardware />} />
            <Route path="edge-works" element={<MirrorsEdgeWork />} />
            <Route path="glass-types" element={<MirrorsGlassType />} />
            <Route path="glass-addons" element={<MirrorsGlassAddon />} />
            <Route path="*" element={<MirrorsHardware />} />
          </Route>
          {/** End */}
          <Route path="*" element={<Overview />}></Route>
        </Route>
      ) : isStaff(decodedToken) && decodedToken?.company_id === "" ? (
        <Route path="/">
          <Route index element={<StaffLocationPage />} />
          <Route path="/locations" element={<StaffLocationPage />} />
          <Route path="*" element={<StaffLocationPage />} />
        </Route>
      ) : isStaff(decodedToken) && decodedToken?.company_id.length ? (
        <Route path="/">
          <Route index element={<Projects />} />
          <Route path="projects/">
            <Route index element={<Projects />} />
            <Route path="create" element={<ProjectCreate />} />
            <Route path=":id" element={<ProjectDetail />} />
          </Route>
          {/* <Route path="/customers" element={<Customers />} /> */}
          <Route path="/estimates/">
            <Route index element={<Estimates />} />
            <Route path="category" element={<EstimateCategory />} />
            <Route path="layouts" element={<EstimateLayouts />} />
            <Route path="dimensions" element={<EstimateDimensions />} />
            <Route path="review" element={<EstimateReview />} />
            <Route path=":id/pdf-preview" element={<PDFPreview />} />
          </Route>
          <Route path="*" element={<Estimates />} />
        </Route>
      ) : isSuperAdmin(decodedToken) ? (
        <Route path="/">
          <Route index element={<Admin />} />
          <Route path="/users" element={<AdminTeam />} />
          {/* <Route path="/user" element={<AdminUser />} /> */}
          {/* {superSuperAdminsList?.includes(decodedToken.email) && (
            <Route path="/superadmins" element={<Super_SuperAdmin />} />
          )} */}
          <Route path="*" element={<Admin />} />
        </Route>
      ) : isCustomAdmin(decodedToken) && decodedToken?.company_id === "" ? (
        <Route path="/">
          <Route index element={<CustomAdminPage />} />
          <Route path="/locations" element={<CustomAdminPage />} />
        </Route>
      ) : (
        ""
      )}
      {/** Notification */}
      {isAdmin(decodedToken) ||
      isCustomAdmin(decodedToken) ||
      isStaff(decodedToken) ||
      isSuperAdmin(decodedToken) ? (
        <Route path="/notification" element={<Notification />} />
      ) : (
        ""
      )}
      {/* <Route path="*" element={<Navigate to={getHomepageURL()} />} /> */}
      <Route path="/*" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRoutes;
