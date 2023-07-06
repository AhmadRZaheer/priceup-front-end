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
import { Box } from "@mui/material";

const SuperSidebar = () => {
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
      <Box sx={{display: "flex", flexDirection: "column" , alignItems: "space-between", height: "95vh", justifyContent: "space-between"}}>
      <Box sx={{marginTop: 2}} >

        <NavLink style={{marginTop: 20}} to="/">
          <div className="top">
            <span className="logo">
              <img src={Logo} alt="" />
            </span>
          </div>
        </NavLink>
        <div className="center">
          <ul style={{marginTop: 80}}>
            <NavLink  to="/admin" className="link">
              <li
                className={` ${location.pathname === "/admin" ? "active" : ""}`}
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
        </Box>
        </Box>
      </div>
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default SuperSidebar;
