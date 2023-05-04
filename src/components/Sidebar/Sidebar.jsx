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

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">
          <img src={Logo} alt="" />
        </span>
      </div>
      <div className="center">
        <ul>
          <li className="estimates">
            <LeaderboardSharpIcon className="icon" />
            <span>Estimates</span>
          </li>
          <li>
            <AdjustIcon className="icon" />
            <span>Customers</span>
          </li>
          <li>
            <PeopleOutlineIcon className="icon" />
            <span>Team</span>
          </li>
          <li>
            <ViewInArOutlinedIcon className="icon" />
            <span>Hardware</span>
          </li>
          <li>
            <AddBoxOutlinedIcon className="icon" />
            <span>Default</span>
          </li>
          <li className="settings">
            <SettingsOutlinedIcon className="icon" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
      <div className="line">
      </div>
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
