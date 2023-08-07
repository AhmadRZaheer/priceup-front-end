import React, { useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Model/logOut";
import { Box, IconButton, Tooltip } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { backendURL } from "../../utilities/common";
import TremIcon from "../../Assets/users.svg"

const SuperSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logoutHandler());
    // navigate("/adminlogin");
    window.location.href = '/adminlogin';
  };
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
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
                <NavLink to="/admin" className="link">
                  <li
                    className={` ${location.pathname === "/admin" ? "active" : ""
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
              </ul>
            </div>
          </Box>
          <Box>
            <div className="line"></div>
            <div className="bottom">
              <div className="UserIcon">
                <img src={`${backendURL}/${decodedToken?.image}`} width="50" height="50" alt="no" />
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
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default SuperSidebar;
