import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import Logo from "../../Assets/purplelogo.svg";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import EstimsteIcon from "../../Assets/bar.svg";
import CustomerIcon from "../../Assets/Customer-icon.svg";
import TeamIcon from "../../Assets/users.svg";
import HardWairIcon from "../../Assets/box.svg";
import DefaultIcon from "../../Assets/columns.svg";
import SettingsIcon from "../../Assets/settings.svg";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import {
  Box,
  IconButton,
  Tooltip,
  Popover,
  Typography,
  Drawer,
  CircularProgress,
} from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { backendURL } from "../../utilities/common";
import { AttachMoney, PinDrop, Search, UnfoldMore } from "@mui/icons-material";
import {
  useDataCustomUser,
  useFetchDataAdmin,
  useHaveAccessCustomUser,
  useSwitchLocationUser,
} from "../../utilities/ApiHooks/superAdmin";
import BackIcon from "../../Assets/back.svg";
import EyeIcon from "../../Assets/eye-icon.svg";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { setDataRefetch } from "../../redux/staff";
import DefaultImage from "../ui-components/defaultImage";

const drawerWidth = 320;

const Sidebar = () => {
  const { data: AdminData, refetch } = useFetchDataAdmin();
  const { mutate: haveAccessSet, data: haveAccessData } =
    useHaveAccessCustomUser();
  const {
    mutate: switchLocationUser,
    data: useToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchLocationUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const superAdminToken = localStorage.getItem("superAdminToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [CustomActiveUser, setCustomActiveUser] = useState(""); // State for search query
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
  const [activeLocation, setActiveLocation] =
    useState(null); /** Added for branch PD-28 */

  const filteredAdminData = AdminData?.filter((admin) =>
    admin?.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredCustomUser = haveAccessData?.filter((data) =>
    data?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAdminNameClick = (admin) => {
    /** Added for branch PD-28 */
    setActiveLocation(admin);
    /** Added for branch PD-28 */
    navigate(`/?userID=${admin?._id}`);
    const urlWithoutQuery = window.location.pathname;
    window.history.replaceState({}, document.title, urlWithoutQuery);
  };
  const handleCustomUserClick = async (userData) => {
    if (!userData || !decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (userData.id !== decodedToken.company_id) {
      await switchLocationUser(userData);
    }
  };
  const [refetchKey, setRefetchKey] = useState(0);
  useEffect(() => {
    if (switched) {
      localStorage.setItem("token", useToken);
      dispatch(setDataRefetch());
      setRefetchKey((prevKey) => prevKey + 1);
    }
  }, [switched]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    haveAccessSet(decodedToken?.id);
  }, []);
  /** Added for branch PD-28 */
  useEffect(() => {
    const fetchData = async () => {
      if (filteredAdminData && filteredAdminData.length) {
        const record = await filteredAdminData.find(
          (admin) => admin?.company?._id === decodedToken?.company_id
        );
        if (record?.user) {
          setActiveLocation(record?.user);
        }
        console.log(record?.user?.name, "record?.user");
      }
    };

    fetchData();
  }, [filteredAdminData]);
  /** Added for branch PD-28 */
  // console.log(token, "token");
  // console.log(decodedToken, "decodedToken");
  // console.log(haveAccessData, "haveAccsessData");
  useEffect(() => {
    if (filteredCustomUser) {
      const user = filteredCustomUser.find(
        (item) => item.id === decodedToken?.company_id
      );

      setCustomActiveUser(user?.name, "user");
    }
  }, [filteredCustomUser, decodedToken]);

  const drawer = (
    <Box
      sx={{
        // position: { xs: "absolute", md: "static" },
        top: "0px",
        zIndex: 10,
      }}
    >
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
                  <img src={Logo} alt="price up logo" />
                </span>
              </div>
            </NavLink>
            <div className="center">
              <ul>
                {superAdminToken && (
                  /** Added for branch PD-28 */
                  <li
                    style={{ marginBottom: 0 }}
                    className={` ${Boolean(anchorEl) ? "active" : ""}`}
                    onClick={handleSeeLocationsClick}
                  >
                    <Tooltip title="Switch Location">
                      <IconButton
                        sx={{
                          color: "white",
                          padding: 0.2,
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <PinDrop sx={{ color: "white" }} />
                        <span style={{ flexGrow: 1 }}>
                          {" "}
                          {activeLocation?.name}
                        </span>
                        <UnfoldMore sx={{ color: "white", mr: 1 }} />
                      </IconButton>
                    </Tooltip>
                  </li>
                  /** Added for branch PD-28 */
                )}
                {decodedToken?.role === "admin" &&
                haveAccessData?.length > 0 ? (
                  <li
                    style={{ padding: 10, marginBottom: 0 }}
                    className={` ${Boolean(anchorEl) ? "active" : ""}`}
                    onClick={handleSeeLocationsClick}
                  >
                    <IconButton
                      sx={{
                        color: "white",
                        padding: 0.2,
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        borderRadius: 0,
                      }}
                    >
                      <PinDrop sx={{ color: "white" }} />
                      <span>{CustomActiveUser}</span>
                      <UnfoldMore sx={{ color: "white", mr: 1 }} />
                    </IconButton>
                  </li>
                ) : (
                  ""
                )}
                <NavLink to="/" className="link">
                  <li
                    style={{ padding: 10, marginTop: 10 }}
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
                        src={TeamIcon}
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
                        src={DefaultIcon}
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
                p: 1,
              }}
            >
              <Box sx={{ marginLeft: 1, mr: 1.2 }}>
                <DefaultImage
                  image={decodedToken?.image}
                  name={decodedToken?.name}
                />
              </Box>
              <Box sx={{ fontSize: 18 }}>
                {decodedToken?.name}
                <Box
                  sx={{
                    fontSize: 16,
                    color: "white",
                    whiteSpace: "nowrap",
                    width: 160,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap", // Added this line to ensure text doesn't wrap
                  }}
                >
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
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            display: { sm: "none" },
          }}
        >
          <Toolbar sx={{ backgroundColor: "#100d24" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox "
        >
          {/* for mobile */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* for desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>

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
        sx={{ left: 30, top: -72 }}
      >
        {superAdminToken && (
          <IconButton
            sx={{
              fontSize: "15px",
              borderRadius: 1,
              ml: 2.2,
              mt: 2,
              color: "#667085",
              position: "sticky",
              bg: "white",
              top: 0,
              display: "flex",
              gap: 2,
              bgcolor: "white",
              ":hover": {
                bgcolor: "white",
              },
              p: 1,
            }}
            onClick={() => {
              localStorage.setItem("token", superAdminToken);
              localStorage.removeItem("superAdminToken");

              window.location.href = "/";
            }}
          >
            <img src={BackIcon} alt="back icon" />
            Back to super admin view
          </IconButton>
        )}
        <Box sx={{ position: "relative" }}>
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
              borderRadius: "14px",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span style={{ position: "absolute", left: "28px", top: "30px" }}>
            <Search sx={{ color: "#8477DA" }} />
          </span>
        </Box>
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            paddingX: 25,
            width: "315px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            pt: 100,
            position: "relative",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {filteredAdminData.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#8f8f8f", py: 2 }}>
              No location found
            </Typography>
          ) : (
            decodedToken?.role === "admin" &&
            (isSwitching ? (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  height: "100px",
                  alignItems: "center",
                }}
              >
                <CircularProgress sx={{ color: "#8477DA" }} />
              </Box>
            ) : (
              filteredCustomUser?.map((item) => (
                <Typography
                  key={item?.id}
                  sx={{
                    width: "83.8%",
                    ml: "10px",
                    marginBottom: "5px",
                    textTransform: "lowercase",
                    marginLeft: "20px",
                    display: "flex",
                    border: "1px solid #D9D9D9",
                    ":hover": {
                      bgcolor: "rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                    },
                    py: 0.4,
                    px: 1,
                    borderRadius: "14px",
                  }}
                  onClick={() => handleCustomUserClick(item)}
                >
                  <div style={{ width: "20%" }}>
                    <DefaultImage image={item?.image} name={item?.name} />
                  </div>
                  <div style={{ paddingLeft: "10px", width: "100%" }}>
                    <a style={{ cursor: "pointer" }}>{item?.name}</a>
                    <p style={{ fontSize: "10px" }}>{item?.email}</p>
                  </div>
                  {item.id === decodedToken?.company_id ? (
                    <Box
                      sx={{
                        width: "10%",
                        display: "flex",
                        justifyContent: "end",
                        mt: 1.4,
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "100%",
                          background: "#4de369",
                        }}
                      ></div>
                    </Box>
                  ) : (
                    ""
                  )}
                </Typography>
              ))
            ))
          )}
          {superAdminToken &&
            filteredAdminData.map((admin) => (
              <Typography
                key={admin?.user?._id}
                sx={{
                  width: "83.8%",
                  ml: "10px",
                  marginBottom: "5px",
                  textTransform: "lowercase",
                  marginLeft: "20px",
                  display: "flex",
                  border: "1px solid #D9D9D9",
                  ":hover": {
                    bgcolor: "rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  },
                  py: 0.4,
                  px: 1,
                  borderRadius: "14px",
                }}
                onClick={() => handleAdminNameClick(admin?.user)}
              >
                <div>
                  <DefaultImage
                    image={admin?.user?.image}
                    name={admin?.user?.name}
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <a style={{ cursor: "pointer" }}>{admin?.user?.name}</a>
                  <p style={{ fontSize: "10px" }}>{admin?.user?.email}</p>
                </div>
              </Typography>
            ))}
        </div>
      </Popover>
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default Sidebar;
