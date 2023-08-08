import React, { useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Model/logOut";
import EstimsteIcon from "../../Assets/bar.svg";
import CustomerIcon from "../../Assets/Customer-icon.svg";
import TremIcon from "../../Assets/users.svg"
import HardWairIcon from "../../Assets/box.svg"
import DefaltIcon from "../../Assets/columns.svg"
import SettingsIcon from "../../Assets/settings.svg"
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { Box, IconButton, Tooltip } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { backendURL } from "../../utilities/common";
import { AttachMoney } from "@mui/icons-material";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logoutHandler());
    window.location.href = '/login';
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
            height: "96vh",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ marginTop: 2 }}>
        <NavLink to="/">
          <div className="top">
            <span className="logo">
              <img src={Logo} alt="" />
            </span>
          </div>
        </NavLink>
        <div className="center">
          <ul>
            <NavLink to="/" className="link">
              <li
                className={`estimates ${location.pathname === "/" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={EstimsteIcon}
                    alt="image of customer"
                  />

                  <span>Dashboard</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/Estimates" className="link">
              <li
                className={` ${location.pathname === "/Estimates" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <AttachMoney />

                  <span>Estimates</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/Customers" className="link">
              <li
                className={` ${location.pathname === "/Customers" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={CustomerIcon}
                    alt="image of customer"
                  />

                  <span>Customers</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/team" className="link">
              <li
                className={` ${location.pathname === "/team" ? "active" : ""}`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={TremIcon}
                    alt="image of customer"
                  />

                  <span>Team</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/hardware" className="link">
              <li
                className={` ${location.pathname === "/hardware" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={HardWairIcon}
                    alt="image of customer"
                  />

                  <span>Hardware</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/finishes" className="link">
              <li
                className={` ${location.pathname === "/finishes" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <FormatColorFillIcon sx={{ fontSize: 30, marginLeft: -0.2, p: 0, marginRight: 0.8 }} />

                  <span>Finishes</span>
                </IconButton>
              </li>
            </NavLink>
            {/* <NavLink to="/Addons" className="link">
              <li
                className={` ${location.pathname === "/Addons" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
                  <LayersOutlinedIcon sx={{ fontSize: 30, marginLeft: -0.2, p: 0, marginRight: 0.8 }} />

                  <span>Add ons</span>
                </IconButton>
              </li>
            </NavLink> */}
            <NavLink to="/GlassType" className="link">
              <li
                className={` ${location.pathname === "/GlassType" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={HardWairIcon}
                    alt="image of customer"
                  />

                  <span>Glass Type</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/GlassTreatement" className="link">
              <li
                className={` ${location.pathname === "/GlassTreatement" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={HardWairIcon}
                    alt="image of customer"
                  />

                  <span>Glass Treatement</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/Defaults" className="link">
              <li
                className={` ${location.pathname === "/Defaults" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={DefaltIcon}
                    alt="image of customer"
                  />

                  <span>Default</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/settings" className="link">
              <li
                className={` ${location.pathname === "/settings" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={SettingsIcon}
                    alt="image of customer"
                  />

                  <span>Settings</span>
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
          <Tooltip title="Logout" placement="top-start" arrow >
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
export default Sidebar;
