import React, { useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import LeaderboardSharpIcon from "@mui/icons-material/LeaderboardSharp";
import AdjustIcon from "@mui/icons-material/Adjust";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import UserIcon from "../../Assets/username1.svg";
import logout from "../../Assets/logout.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Model/Logout";
import { useHistory } from "react-router-dom";
import EstimsteIcon from "../../Assets/bar.svg";
import CustomerIcon from "../../Assets/Customer-icon.svg";
import TremIcon from "../../Assets/users.svg"
import HardWairIcon from "../../Assets/box.svg"
import DefaltIcon from "../../Assets/columns.svg"
import SettingsIcon from "../../Assets/settings.svg"
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { Box, IconButton } from "@mui/material";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const Logout = () => {
    console.log("hello world");
    dispatch(logoutHandler());

    navigate("/login");
  };

  return (
    <>
      <div className="sidebar">
        <NavLink to="/">
          <div className="top">
            <span className="logo">
              <img src={Logo} alt="" />
            </span>
          </div>
        </NavLink>
        <div className="center">
          <ul>
            <NavLink to="/estimates" className="link">
              <li
                className={`estimates ${
                  location.pathname === "/estimates" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
                  <img
                    style={{ paddingRight: 10 }}
                    src={EstimsteIcon}
                    alt="image of customer"
                  />

                  <span>Estimates</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/Customers" className="link">
              <li
                className={` ${
                  location.pathname === "/Customers" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
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
                <IconButton sx={{ color: "white", padding: 0.2 }}>
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
                className={` ${
                  location.pathname === "/hardware" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
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
                className={` ${
                  location.pathname === "/finishes" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
                <FormatColorFillIcon sx={{fontSize: 30, marginLeft: -0.2, p: 0,marginRight: 0.8 }} />

                  <span>Finishes</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/Addons" className="link">
              <li
                className={` ${
                  location.pathname === "/Addons" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
                  <LayersOutlinedIcon sx={{fontSize: 30, marginLeft: -0.2, p: 0,marginRight: 0.8 }} />

                  <span>Add ons</span>
                </IconButton>
              </li>
            </NavLink>
            <NavLink to="/GlassType" className="link">
              <li
                className={` ${
                  location.pathname === "/GlassType" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
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
                className={` ${
                  location.pathname === "/GlassTreatement" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
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
                className={` ${
                  location.pathname === "/Defaults" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
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
                style={{ marginTop: "210px" }}
                className={` ${
                  location.pathname === "/settings" ? "active" : ""
                }`}
              >
                <IconButton sx={{ color: "white", padding: 0.2 }}>
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
        <div className="line"></div>
        <div className="bottom">
          <div className="UserIcon">
            <img src={UserIcon} alt="" />
          </div>
          <div className="userInSidebar">
            Olivia Rhye
            <div className="emailUser">Olivia@glassexperts.com</div>
          </div>
          <div className="logOutIcon" onClick={() => setOpen(!open)}>
            {/* <a href="/login"> */}
            <img src={logout} alt="image" />
            {/* </a> */}
          </div>
        </div>
      </div>
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default Sidebar;
