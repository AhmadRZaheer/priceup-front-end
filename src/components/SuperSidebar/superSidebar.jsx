import React, { useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, IconButton, Tooltip, Popover, Typography } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { backendURL } from "../../utilities/common";
import TremIcon from "../../Assets/users.svg";
import { FmdGoodOutlined } from "@mui/icons-material";
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import { Link } from "react-router-dom";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const SuperSidebar = () => {
  const { data: AdminData, refetch: teamMemberRefetch } = useFetchDataAdmin();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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

  const filteredAdminData = AdminData.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAdminNameClick = (adminId) => {
    navigate(`/?adminID=${adminId}`);
    const urlWithoutQuery = window.location.pathname;
    window.history.replaceState({}, document.title, urlWithoutQuery);
  };
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
                <li style={{ padding: 10 }}>
                  <IconButton
                    sx={{ color: "white", padding: 0.2 }}
                    onClick={handleSeeLocationsClick}
                  >
                    <PeopleOutlineIcon sx={{ color: "white", mr: 1 }} />
                    <span>See Locations</span>
                  </IconButton>
                </li>

                <NavLink to="/admin" className="link">
                  <li
                    className={` ${
                      location.pathname === "/admin" ? "active" : ""
                    }`}
                  >
                    <IconButton sx={{ color: "white", padding: 0.2 }}>
                      <FmdGoodOutlined sx={{ color: "white", mr: 1 }} />
                      <span>Location</span>
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
                      <span>Team</span>
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
                <img
                  src={`${backendURL}/${decodedToken?.image}`}
                  width="50"
                  height="50"
                  alt="no"
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

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopup}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <input
          type="text"
          placeholder="Search Admin Names"
          style={{
            width: "200px",
            padding: "8px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            paddingX: "20px",
            width: "240px",
          }}
        >
          {filteredAdminData.map((admin) => (
            <Typography
              key={admin.id}
              sx={{
                marginBottom: "5px",
                textTransform: "lowercase",
                marginLeft: "20px",
                borderBottom: "1px solid #7d7d7d",
                ":hover":{
                  bgcolor: "rgba(0, 0, 0, 0.2)",
                  cursor: "pointer"
                }
              }}
            >
              <a
                onClick={() => handleAdminNameClick(admin._id)}
                style={{ cursor: "pointer" }}
              >
                {admin.name}
              </a>
            </Typography>
          ))}
        </div>
      </Popover>

      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default SuperSidebar;
