import React from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardSharpIcon from "@mui/icons-material/LeaderboardSharp";
import AdjustIcon from "@mui/icons-material/Adjust";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import UserIcon from "../../Assets/username1.svg";
import Logout from "../../Assets/logout.svg";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">
          <img src={Logo} alt="" />
        </span>
      </div>
      <div className="center">
        {/* <ul>
          <li className="estimates">
            <LeaderboardSharpIcon className="icon" />
            <span>Estimates</span>
          </li>
          <li>
            <Link to="/Customers" className="link">
              <AdjustIcon className="icon" />
              <span>Customers</span>
            </Link>
          </li>
          <li>
            <Link to="/team" className="link">
              <PeopleOutlineIcon className="icon" />
              <span>Team</span>
            </Link>
          </li>
          <li>
            <Link to="/hardware" className="link">
              <ViewInArOutlinedIcon className="icon" />
              <span>Hardware</span>
            </Link>
          </li>
          <li>
            <Link to="/Defaults" className="link">
              <AddBoxOutlinedIcon className="icon" />
              <span>Default</span>
            </Link>
          </li>
          <li className="settings">
            <Link to="/setting" className="link">
              <SettingsOutlinedIcon className="icon" />
              <span>Settings</span>
            </Link>
          </li>
        </ul> */}
        <ul>
          <li className="estimates">
            <LeaderboardSharpIcon className="icon" />
            <span>Estimates</span>
          </li>
          <li>
            <NavLink to="/Customers" activeClassName="active" className="link">
              <AdjustIcon className="icon" />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/team" activeClassName="active" className="link">
              <PeopleOutlineIcon className="icon" />
              <span>Team</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/hardware" activeClassName="active" className="link">
              <ViewInArOutlinedIcon className="icon" />
              <span>Hardware</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Defaults" activeClassName="active" className="link">
              <AddBoxOutlinedIcon className="icon" />
              <span>Default</span>
            </NavLink>
          </li>
          <li className="settings">
            <NavLink to="/setting" activeClassName="active" className="link">
              <SettingsOutlinedIcon className="icon" />
              <span>Settings</span>
            </NavLink>
          </li>
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
        <div className="logOutIcon">
          <img src={Logout} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
