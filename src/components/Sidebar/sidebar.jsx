import React, { useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
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
            height: "100vh",
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
              style={{padding: 10}}
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
            <NavLink to="/estimates" className="link">
              <li
                className={` ${location.pathname === "/estimates" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <AttachMoney />

                  <span>Estimates</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/customers" className="link">
              <li
                className={` ${location.pathname === "/customers" ? "active" : ""
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
            <NavLink to="/glass-types" className="link">
              <li
                className={` ${location.pathname === "/glass-types" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={HardWairIcon}
                    alt="image of customer"
                  />

                  <span>Glass Types</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/glass-addons" className="link">
              <li
                className={` ${location.pathname === "/glass-addons" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={HardWairIcon}
                    alt="image of customer"
                  />

                  <span>Glass Addons</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/layouts" className="link">
              <li
                className={` ${location.pathname === "/layouts" ? "active" : ""
                  }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2, borderRadius: 0 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={DefaltIcon}
                    alt="image of customer"
                  />

                  <span>Layouts</span>
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
        <Box sx={{
          display: "flex",
          alignItems: "center",
          padding: 2
        }}>
          <Box sx={{marginRight: 1}}>
            <img src={`${backendURL}/${decodedToken?.image}`} width="50" height="50" alt="no" />
          </Box>
          <Box sx={{ fontSize: 18}}>
            {decodedToken?.name}
            <Box sx={{fontSize: 16, color: "white",}}> {decodedToken?.email}</Box>
          </Box>
          <Tooltip title="Logout" placement="top-start" arrow >
            <Box sx={{
                fontSize: 16,
                marginLeft: 2,
                width: 50,
                height: 30,
                textAlign: "center"
            }} onClick={() => setOpen(!open)}>
              <img src={logout} alt="image" />
            </Box>
          </Tooltip>
        </Box>
        </Box>
        </Box>
      </div>
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default Sidebar;
