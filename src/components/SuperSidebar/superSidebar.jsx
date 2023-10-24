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
import { FmdGoodOutlined, Search } from "@mui/icons-material";
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
                <li style={{ padding: 10 }} onClick={handleSeeLocationsClick}>
                  <IconButton sx={{ color: "white", padding: 0.2 }}>
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
        sx={{left: 15}}
      >
        <input
          type="text"
          placeholder="Search Admin Names"
          style={{
            width: "270px",
            padding: "8px",
            paddingLeft: "35px",
            height: "26px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "20px",
            position: "relative",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span style={{ position: "absolute", left: "28px", top: "30px" }}>
          <Search sx={{ color: " #100d24" }} />
          {/* You can use an icon library like Font Awesome */}
        </span>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            paddingX: 25,
            width: "340px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid #babab8",
              width: "94%",
              ml: "auto",
              py: 0.6,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "#8f8f8f",
              }}
            >
              Locations
            </Typography>
          </Box>
          {filteredAdminData.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#8f8f8f", py: 2 }}>
              No location found
            </Typography>
          ) : (
            filteredAdminData.map((admin) => (
              <Typography
                key={admin.id}
                sx={{
                  width: "88%",
                  ml: "10px",
                  marginBottom: "5px",
                  textTransform: "lowercase",
                  marginLeft: "20px",
                  display: "flex",
                  border: "1px solid #babab8",
                  ":hover": {
                    bgcolor: "rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  },
                  py: 0.4,
                  px: 1,
                  borderRadius: 1,
                }}
              >
                <div className="UserIcon-1">
                  <img
                    src={`${backendURL}/${decodedToken?.image}`}
                    width="32"
                    height="32"
                    alt="no"
                  />
                </div>
                <div
                  style={{ paddingLeft: "10px" }}
                  onClick={() => handleAdminNameClick(admin._id)}
                >
                  <a style={{ cursor: "pointer" }}>{admin.name}</a>
                  <p style={{ fontSize: "10px" }}>{admin.email}</p>
                </div>
              </Typography>
            ))
          )}
        </div>
      </Popover>

      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default SuperSidebar;
