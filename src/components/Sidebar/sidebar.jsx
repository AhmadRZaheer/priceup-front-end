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
import TremIcon from "../../Assets/users.svg";
import HardWairIcon from "../../Assets/box.svg";
import DefaltIcon from "../../Assets/columns.svg";
import SettingsIcon from "../../Assets/settings.svg";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import { Box, IconButton, Tooltip, Popover, Typography } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { backendURL } from "../../utilities/common";
import { AttachMoney, KeyboardBackspace, Search } from "@mui/icons-material";
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import { Link } from "react-router-dom";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const Sidebar = () => {
  const { data: AdminData, refetch: teamMemberRefetch } = useFetchDataAdmin();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const superAdminToken = localStorage.getItem("superAdminToken");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logoutHandler());
    window.location.href = "/login";
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
    navigate(`/?userID=${adminId}`);
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
            <NavLink to="/">
              <div className="top">
                <span className="logo">
                  <img src={Logo} alt="" />
                </span>
              </div>
            </NavLink>
            <div className="center">
              <ul>
                {superAdminToken && (
                  <li style={{ padding: 10 }} onClick={handleSeeLocationsClick}>
                    <IconButton sx={{ color: "white", padding: 0.2 }}>
                      <PeopleOutlineIcon sx={{ color: "white", mr: 1 }} />
                      <span>See Locations</span>
                    </IconButton>
                  </li>
                )}
                <NavLink to="/" className="link">
                  <li
                    style={{ padding: 10 }}
                    className={`estimates ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
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
                    className={` ${
                      location.pathname === "/estimates" ? "active" : ""
                    }`}
                  >
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
                      <AttachMoney />

                      <span>Estimates</span>
                    </IconButton>
                  </li>
                </NavLink>
                <NavLink to="/customers" className="link">
                  <li
                    className={` ${
                      location.pathname === "/customers" ? "active" : ""
                    }`}
                  >
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
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
                    className={` ${
                      location.pathname === "/team" ? "active" : ""
                    }`}
                  >
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
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
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
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
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
                      <FormatColorFillIcon
                        sx={{
                          fontSize: 30,
                          marginLeft: -0.2,
                          p: 0,
                          marginRight: 0.8,
                        }}
                      />

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
                    className={` ${
                      location.pathname === "/glass-types" ? "active" : ""
                    }`}
                  >
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
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
                    className={` ${
                      location.pathname === "/glass-addons" ? "active" : ""
                    }`}
                  >
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
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
                    className={` ${
                      location.pathname === "/layouts" ? "active" : ""
                    }`}
                  >
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
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
                    className={` ${
                      location.pathname === "/settings" ? "active" : ""
                    }`}
                  >
                    <IconButton
                      sx={{ color: "white", padding: 0.2, borderRadius: 0 }}
                    >
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingX: 2,
                pt: 1,
              }}
            >
              <Box sx={{ marginRight: 1 }}>
                <img
                  src={`${backendURL}/${decodedToken?.image}`}
                  width="50"
                  height="50"
                  alt="no"
                />
              </Box>
              <Box sx={{ fontSize: 18 }}>
                {decodedToken?.name}
                <Box sx={{ fontSize: 16, color: "white" }}>
                  {" "}
                  {decodedToken?.email}
                </Box>
              </Box>
              <Tooltip title="Logout" placement="top-start" arrow>
                <Box
                  sx={{
                    fontSize: 16,
                    marginLeft: 2,
                    width: 50,
                    height: 30,
                    textAlign: "center",
                  }}
                  onClick={() => setOpen(!open)}
                >
                  <img src={logout} alt="image" />
                </Box>
              </Tooltip>
            </Box>
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
        sx={{ left: 12 }}
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
            pt: 100,
            position: "relative",
          }}
        >
          {superAdminToken && (
            <IconButton
              sx={{
                fontSize: "15px",
                borderRadius: 1,
                ml: 2.2,
                color: "black",
                position: "sticky",
                bg: "white",
                top: 0,
                bgcolor: "white",
                ":hover": {
                  bgcolor: "white",
                },
                pb: 2,
                borderBottom: "1px solid #babab8",
                borderRadius: 0,
              }}
              onClick={() => {
                localStorage.setItem("token", superAdminToken);
                localStorage.removeItem("superAdminToken");

                window.location.href = "/";
              }}
            >
              <KeyboardBackspace sx={{ mr: 0.5 }} />
              Back to admin
            </IconButton>
          )}
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
      {/* <Popover
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
        <div style={{ display: "flex", flexDirection: "column" }}>
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
        </div>
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
                ":hover": {
                  bgcolor: "rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                },
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
      </Popover> */}
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default Sidebar;
