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
import { Box, IconButton, Tooltip, Drawer } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { AttachMoney, PinDrop, UnfoldMore } from "@mui/icons-material";
import {
  useBackToCustomAdminLocations,
  useBackToSuperAdmin,
  useFetchCustomAdminHaveAccessTo,
  useFetchDataAdmin,
  useSwitchLocationSuperAdmin,
  useSwitchLocationUser,
} from "../../utilities/ApiHooks/superAdmin";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import DefaultImage from "../ui-components/defaultImage";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";
import { userRoles } from "../../utilities/constants";

const drawerWidth = 320;

const Sidebar = () => {
  const { data: AdminData, refetch } = useFetchDataAdmin();
  const { mutate: haveAccessSet, data: haveAccessData } =
    useFetchCustomAdminHaveAccessTo();
  const {
    mutate: switchLocationUser,
    data: useToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchLocationUser();
  const {
    mutate: switchLocationSuperAdmin,
    data: useTokenSuperAdmin,
    isSuccess: switchedSuperAdmin,
    isLoading: isSwitchingSuperAdmin,
  } = useSwitchLocationSuperAdmin();
  const {
    mutate: backRefetch,
    data: useTokenBack,
    isSuccess: switchedBack,
  } = useBackToCustomAdminLocations();
  const {
    mutate: backToSuperAdmin,
    data: useTokenBackSuperAdmin,
    isSuccess: switchedBackSuperAdmin,
  } = useBackToSuperAdmin();
  const [open, setOpen] = useState(false);
  const superAdminToken = localStorage.getItem("superAdminToken");
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

  const handleAdminNameClick = (admin) => {
    setActiveLocation(admin);
    switchLocationSuperAdmin({
      company_id: admin?.company?._id,
      adminId: admin?.company?.user_id,
    });
  };
  const handleCustomUserClick = async (companyId) => {
    if (!companyId || !decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (companyId !== decodedToken.company_id) {
      await switchLocationUser(companyId);
      console.log("user changed");
    }
  };
  const handleBackCustomAdminClick = async () => {
    if (!decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (decodedToken.company_id) {
      await backRefetch();
      console.log("user backed");
    }
  };
  const handleBackToSuperAdmin = async () => {
    if (!decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (decodedToken.company_id) {
      const superAdminReference = localStorage.getItem("userReference");
      await backToSuperAdmin(superAdminReference);
      console.log("user backed");
    }
  };
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (switched) {
      localStorage.setItem("token", useToken);
      window.location.href = "/";
    }
    if (switchedBack) {
      localStorage.setItem("token", useTokenBack.token);
      window.location.href = "/locations";
    }
    if (switchedSuperAdmin) {
      if (decodedToken.role === userRoles.SUPER_ADMIN) {
        localStorage.setItem("userReference", decodedToken.id);
      }
      localStorage.setItem("token", useTokenSuperAdmin);
      window.location.href = "/";
    }
    if (switchedBack) {
      localStorage.setItem("token", useTokenBack.token);
      window.location.href = "/locations";
    }
    if (switchedBackSuperAdmin) {
      localStorage.removeItem("userReference");
      localStorage.setItem("token", useTokenBackSuperAdmin.token);
      window.location.href = "/";
    }
  }, [switched, switchedBack, switchedBackSuperAdmin, switchedSuperAdmin]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    haveAccessSet();
  }, []);
  /** Added for branch PD-28 */
  useEffect(() => {
    const fetchData = async () => {
      if (AdminData && AdminData.length) {
        const record = await AdminData.find(
          (admin) => admin?.company?._id === decodedToken?.company_id
        );
        if (record) {
          setActiveLocation(record);
        }
      }
    };

    fetchData();
  }, [AdminData]);
  /** Added for branch PD-28 */
  useEffect(() => {
    if (haveAccessData) {
      const user = haveAccessData.find(
        (item) => item?.company?._id === decodedToken?.company_id
      );

      setCustomActiveUser(user?.company?.name);
    }
  }, [haveAccessData, decodedToken]);

  const userReference = localStorage.getItem("userReference");
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
                <div style={{ paddingLeft: 20 }}>
                  <DefaultImage
                    image={activeLocation?.company?.image}
                    name={activeLocation?.company?.name}
                  />
                </div>
              </div>
            </NavLink>
            <div className="center">
              <ul>
                {userReference && (
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
                        <span
                          style={{
                            flexGrow: 1,
                            whiteSpace: "nowrap",
                            display: "block",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {" "}
                          {activeLocation?.company?.name}
                        </span>
                        <UnfoldMore sx={{ color: "white", mr: 1 }} />
                      </IconButton>
                    </Tooltip>
                  </li>
                )}

                {decodedToken?.role === userRoles.CUSTOM_ADMIN ? (
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
                      <span
                        style={{
                          flexGrow: 1,
                          whiteSpace: "nowrap",
                          display: "block",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {CustomActiveUser}
                      </span>
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

                      <span>Users</span>
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

      {decodedToken.role === userRoles.CUSTOM_ADMIN ? (
        <SwitchLocationPopup
          anchorEl={anchorEl}
          data={haveAccessData}
          handleClosePopup={handleClosePopup}
          handleUserClick={handleCustomUserClick}
          isSwitching={isSwitching}
          handleBack={handleBackCustomAdminClick}
        />
      ) : (
        <SwitchLocationPopup
          anchorEl={anchorEl}
          handleClosePopup={handleClosePopup}
          handleUserClick={handleAdminNameClick}
          isSwitching={isSwitchingSuperAdmin}
          handleBack={handleBackToSuperAdmin}
          data={AdminData}
        />
      )}

      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default Sidebar;
