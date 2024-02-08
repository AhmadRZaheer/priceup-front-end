import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, IconButton, Tooltip, Popover, Typography } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
// import { backendURL } from "../../utilities/common";
import TremIcon from "../../Assets/users.svg";
import { FmdGoodOutlined, Search } from "@mui/icons-material";
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
// import { Link } from "react-router-dom";
import EyeIcon from "../../Assets/eye-icon.svg";
import DefaultImage from "../ui-components/defaultImage";
import SingleUser from "../ui-components/SingleUser";

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
  useEffect(() => {
    teamMemberRefetch();
  }, []);
  const filteredAdminData = AdminData.filter((admin) =>
    admin.user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                <li
                  style={{ padding: 10 }}
                  className={` ${Boolean(anchorEl) ? "active" : ""}`}
                  onClick={handleSeeLocationsClick}
                >
                  <IconButton sx={{ color: "white", padding: 0.2 }}>
                    <img
                      src={EyeIcon}
                      alt="eye icon"
                      style={{ marginRight: 12 }}
                    />
                    <span>See Locations</span>
                  </IconButton>
                </li>

                <NavLink to="/admin" className="link">
                  <li
                    className={` ${
                      location.pathname === "/admin"
                        ? "active"
                        : location.pathname === "/"
                        ? "active"
                        : ""
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
                      <span>Users</span>
                    </IconButton>
                  </li>
                </NavLink>
                <NavLink to="/user" className="link">
                  <li
                    className={` ${
                      location.pathname === "/user" ? "active" : ""
                    }`}
                  >
                    <IconButton sx={{ color: "white", padding: 0.2 }}>
                      <img
                        style={{ paddingRight: 10 }}
                        src={TremIcon}
                        alt="image of customer"
                      />
                      <span>Admin</span>
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
                <DefaultImage
                  image={decodedToken?.image}
                  name={decodedToken?.name}
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
        PaperProps={{
          style: {
            borderRadius: "34px",
            width: "317px",
          },
        }}
        sx={{ left: 30, top: -73 }}
      >
        <input
          type="text"
          placeholder="Search Admin Names"
          style={{
            width: "230px",
            padding: "8px",
            paddingLeft: "35px",
            height: "26px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "20px",
            position: "relative",
            borderRadius: "14px",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span style={{ position: "absolute", left: "28px", top: "30px" }}>
          <Search sx={{ color: "#8477DA" }} />
        </span>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            paddingX: 25,
            width: "315px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginBottom: 10,
          }}
        >
          {filteredAdminData.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#8f8f8f", py: 2 }}>
              No location found
            </Typography>
          ) : (
            filteredAdminData.map((admin) => (
              <SingleUser
                key={admin?.user?._id}
                item={admin?.user}
                active={false}
                handleClick={() => handleAdminNameClick(admin.user._id)}
              />
              // <Typography
              //   onClick={() => handleAdminNameClick(admin.user._id)}
              //   key={admin.user._id}
              //   sx={{
              //     width: "83%",
              //     ml: "10px",
              //     marginBottom: "5px",
              //     textTransform: "lowercase",
              //     marginLeft: "20px",
              //     display: "flex",
              //     border: "1px solid #D9D9D9",
              //     ":hover": {
              //       bgcolor: "rgba(0, 0, 0, 0.1)",
              //       cursor: "pointer",
              //     },
              //     py: 0.4,
              //     px: 1,
              //     borderRadius: "14px",
              //   }}
              // >
              //   <div>
              //     <DefaultImage
              //       image={decodedToken?.image}
              //       name={admin.user.name}
              //     />
              //   </div>
              //   <div style={{ paddingLeft: "10px" }}>
              //     <a style={{ cursor: "pointer" }}>{admin.user.name}</a>
              //     <p style={{ fontSize: "10px" }}>{admin.user.email}</p>
              //   </div>
              // </Typography>
            ))
          )}
        </div>
      </Popover>

      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default SuperSidebar;
