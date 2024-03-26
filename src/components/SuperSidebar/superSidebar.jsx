import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, IconButton, Tooltip, Popover, Typography } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
// import { backendURL } from "../../utilities/common";
import TremIcon from "../../Assets/users.svg";
import { FmdGoodOutlined, Search } from "@mui/icons-material";
import {
  useFetchDataAdmin,
  useSwitchLocationSuperAdmin,
} from "../../utilities/ApiHooks/superAdmin";
// import { Link } from "react-router-dom";
import EyeIcon from "../../Assets/eye-icon.svg";
import DefaultImage from "../ui-components/defaultImage";
import { super_superAdmin } from "../../utilities/constants";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";

const SuperSidebar = () => {
  const { data: AdminData, refetch: teamMemberRefetch } = useFetchDataAdmin();
  const {
    mutate: switchLocationSuperAdmin,
    data: useTokenSuperAdmin,
    isSuccess: switchedSuperAdmin,
    isLoading: isSwitchingSuperAdmin,
  } = useSwitchLocationSuperAdmin();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const Logout = () => {
    dispatch(logoutHandler());
    window.location.href = "/adminlogin";
  };
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);

  const handleSeeLocationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    teamMemberRefetch();
  }, []);
  const handleAdminNameClick = (admin) => {
    switchLocationSuperAdmin(admin.user._id);
  };
  useEffect(() => {
    if (switchedSuperAdmin) {
      localStorage.removeItem("token");
      localStorage.setItem("userReference", decodedToken.id);
      localStorage.setItem("token", useTokenSuperAdmin);
      window.location.href = "/";
    }
  }, [switchedSuperAdmin]);
  return (
    <>
      <div className="sidebar">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            height: "100vh",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ marginTop: 2 }}>
            <NavLink style={{ marginTop: 20 }} to="/">
              <div className="top">
                <span className="logo">
                  <img src={Logo} alt="" />
                </span>
              </div>
            </NavLink>
            <div className="center">
              <ul>
                <li
                  style={{ padding: 10 }}
                  className={` ${Boolean(anchorEl) ? "active" : ""}`}
                  onClick={handleSeeLocationsClick}
                >
                  <IconButton sx={{ color: "white", padding: 0.2 }}>
                    <img
                      src={EyeIcon}
                      alt="eye icon"
                      style={{ marginRight: 12 }}
                    />
                    <span>See Locations</span>
                  </IconButton>
                </li>

                <NavLink to="/admin" className="link">
                  <li
                    className={` ${
                      location.pathname === "/admin"
                        ? "active"
                        : location.pathname === "/"
                        ? "active"
                        : ""
                    }`}
                  >
                    <IconButton sx={{ color: "white", padding: 0.2 }}>
                      <FmdGoodOutlined sx={{ color: "white", mr: 1 }} />
                      <span>Locations</span>
                    </IconButton>
                  </li>
                </NavLink>
                <NavLink to="/team" className="link">
                  <li
                    className={` ${
                      location.pathname === "/team" ? "active" : ""
                    }`}
                  >
                    <IconButton sx={{ color: "white", padding: 0.2 }}>
                      <img
                        style={{ paddingRight: 10 }}
                        src={TremIcon}
                        alt="image of customer"
                      />
                      <span>Users</span>
                    </IconButton>
                  </li>
                </NavLink>
                <NavLink to="/user" className="link">
                  <li
                    className={` ${
                      location.pathname === "/user" ? "active" : ""
                    }`}
                  >
                    <IconButton sx={{ color: "white", padding: 0.2 }}>
                      <img
                        style={{ paddingRight: 10 }}
                        src={TremIcon}
                        alt="image of customer"
                      />
                      <span>Admins</span>
                    </IconButton>
                  </li>
                </NavLink>
                {super_superAdmin.includes(decodedToken.email) && (
                  <NavLink to="/superadmins" className="link">
                    <li
                      className={` ${
                        location.pathname === "/superadmins" ? "active" : ""
                      }`}
                    >
                      <IconButton sx={{ color: "white", padding: 0.2 }}>
                        <img
                          style={{ paddingRight: 10 }}
                          src={TremIcon}
                          alt="image of customer"
                        />
                        <span>Super Admins</span>
                      </IconButton>
                    </li>
                  </NavLink>
                )}
              </ul>
            </div>
          </Box>
          <Box>
            <div className="line"></div>
            <div className="bottom">
              <div className="UserIcon">
                <DefaultImage
                  image={decodedToken?.image}
                  name={decodedToken?.name}
                />
              </div>
              <div className="userInSidebar">
                {decodedToken?.name}
                <div className="emailUser">{decodedToken?.email}</div>
              </div>
              <Tooltip title="Logout" arrow>
                <div className="logOutIcon" onClick={() => setOpen(!open)}>
                  <img src={logout} alt="image" />
                </div>
              </Tooltip>
            </div>
          </Box>
        </Box>
      </div>
      <SwitchLocationPopup
        anchorEl={anchorEl}
        handleClosePopup={handleClosePopup}
        handleUserClick={handleAdminNameClick}
        isSwitching={isSwitchingSuperAdmin}
        data={AdminData}
      />

      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default SuperSidebar;
