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
                <LeaderboardSharpIcon className="icon" />
                <span>Estimates</span>
              </li>
            </NavLink>
            <NavLink to="/Customers" className="link">
              <li
                className={` ${
                  location.pathname === "/Customers" ? "active" : ""
                }`}
              >
                <AdjustIcon className="icon" />
                <span>Customers</span>
              </li>
            </NavLink>
            <NavLink to="/team" className="link">
              <li
                className={` ${location.pathname === "/team" ? "active" : ""}`}
              >
                <AdjustIcon className="icon" />
                <span>Team</span>
              </li>
            </NavLink>
            <NavLink to="/hardware" className="link">
              <li
                className={` ${
                  location.pathname === "/hardware" ? "active" : ""
                }`}
              >
                <ViewInArOutlinedIcon className="icon" />
                <span>Hardware</span>
              </li>
            </NavLink>
            <NavLink to="/finishes" className="link">
              <li
                className={` ${
                  location.pathname === "/finishes" ? "active" : ""
                }`}
              >
                <AddBoxOutlinedIcon className="icon" />
                <span>Finishes</span>
              </li>
            </NavLink>
            <NavLink to="/Defaults" className="link">
              <li
                className={` ${
                  location.pathname === "/Defaults" ? "active" : ""
                }`}
              >
                <AddBoxOutlinedIcon className="icon" />
                <span>Default</span>
              </li>
            </NavLink>
            <NavLink to="/settings" className="link">
              <li
                style={{ marginTop: "300px" }}
                className={` ${
                  location.pathname === "/settings" ? "active" : ""
                }`}
              >
                <SettingsOutlinedIcon className="icon" />
                <span>Settings</span>
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
