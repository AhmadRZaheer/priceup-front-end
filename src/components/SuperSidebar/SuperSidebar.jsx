import React, { useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import AdjustIcon from "@mui/icons-material/Adjust";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Model/Logout";
import { Box } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/AuthVerify";
import { backendURL } from "../../utilities/common";

const SuperSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logoutHandler());

    navigate("/adminlogin");
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
            height: "95vh",
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
              <ul style={{ marginTop: 80 }}>
                <NavLink to="/admin" className="link">
                  <li
                    className={` ${location.pathname === "/admin" ? "active" : ""
                      }`}
                  >
                    <AdjustIcon className="icon" />
                    <span>Admin</span>
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
              <div className="logOutIcon" onClick={() => setOpen(!open)}>
                <img src={logout} alt="image" />
              </div>
            </div>
          </Box>
        </Box>
      </div>
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default SuperSidebar;
