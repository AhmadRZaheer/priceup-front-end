import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logo from "../../Assets/purplelogo.svg";
import "./mobileNavBar.scss";
import CustomerIcon from "../../Assets/Customer-icon.svg";
import TremIcon from "../../Assets/users.svg";
import React, { useEffect, useMemo, useState } from "react";
import {
  setNavigation,
  setNavigationDesktop,
} from "../../redux/estimateCalculations";
import {
  Drawer,
  IconButton,
  Box,
  Button,
  Tooltip,
  Popover,
  Typography,
} from "@mui/material";
import logout from "../../Assets/logout.svg";
import { backendURL } from "../../utilities/common";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { logoutHandler } from "../../redux/userAuth";
import EstimsteIcon from "../../Assets/bar.svg";
import {
  FiberManualRecord,
  LocationSearching,
  PinDrop,
  Search,
  UnfoldMore,
} from "@mui/icons-material";
import {
  useFetchStaffHaveAccessTo,
  useSwitchStaffLocation,
} from "../../utilities/ApiHooks/team";
import { setDataRefetch } from "../../redux/staff";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 280;

function MobileBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("esti");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { data: haveAccess, isFetched: haveAccessFetched } =
    useFetchStaffHaveAccessTo();
  const {
    mutate: switchLocation,
    data: switchLocationData,
    isLoading: switchLocationLoading,
    isSuccess: switchLocationSuccess,
    isError: switchLocationError,
  } = useSwitchStaffLocation();
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const [activeLocation, setActiveLocation] = useState(null);
  const staffhaveAccessTo = useMemo(() => {
    let result = haveAccess?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return result ? result : [];
  }, [haveAccess, searchQuery]);
  const handleSeeLocationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleBackdropClick = () => {
    setIsSidebarOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logoutHandler());
    window.location.href = "/login";
  };

  const handleCustomerClick = () => {
    setActiveButton("customr");
    dispatch(setNavigationDesktop("customerTable"));
  };
  const handleStaffClick = () => {
    setActiveButton("staff");
    dispatch(setNavigationDesktop("staffTable"));
  };
  const handleEstimateClick = () => {
    setActiveButton("esti");
    dispatch(setNavigationDesktop("existing"));
  };
  const handleSwitchLocation = (location) => {
    if (location.id !== activeLocation.id) {
      setActiveLocation(location);
      switchLocation({ staffId: decodedToken?.id, companyId: location.id });
      handleClosePopup();
      toggleSidebar();
    }
  };
  useEffect(() => {
    if (switchLocationSuccess) {
      localStorage.setItem("token", switchLocationData);
      dispatch(setDataRefetch());
    }
  }, [switchLocationSuccess, switchLocationError]);
  useEffect(() => {
    if (haveAccessFetched) {
      setActiveLocation(
        haveAccess?.find((item) => item?.id === decodedToken?.company_id)
      );
    }
  }, [haveAccessFetched]);
  const location = useLocation();
  const drawer = (
    <Box
      sx={{
        backgroundColor: "#100d24",
        width: "100%",
        height: "100vh",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <div className="top2">
          <span className="logo2">
            <img src={Logo} alt="" />
          </span>
        </div>
        <Box
          sx={{
            height: "65vh",
            overflow: "auto",
            width: drawerWidth,
            paddingTop: "20px",
          }}
        >
          <Box>
            <Tooltip title="Switch Location">
              <Button
                sx={{
                  width: 245,
                  color: "white",
                  marginX: 2,
                  marginY: 1,
                  paddingY: "10px",
                  textTransform: "capitalize",
                  ":hover": {
                    backgroundColor: "#8477da",
                  },
                  display: "flex",
                  justifyContent: "start",
                }}
                onClick={handleSeeLocationsClick}
              >
                <PinDrop sx={{ color: "white" }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "16px" }}>
                    {activeLocation?.name}
                  </Typography>
                  Locations
                </Box>
                {/* <UnfoldMore sx={{ color: "white", mr: 1 }} /> */}
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Button
              sx={{
                width: 245,
                color: "white",
                marginX: 2,
                marginY: 1,
                paddingY: "10px",
                textTransform: "capitalize",
                backgroundColor:
                  activeButton === "esti" ? "#8477da" : "transprent",
                ":hover": {
                  backgroundColor: "#8477da",
                },
                display: "flex",
                justifyContent: "start",
              }}
              onClick={() => handleEstimateClick()}
            >
              <img
                style={{ paddingRight: 10 }}
                src={EstimsteIcon}
                alt="image of customer"
              />{" "}
              Estimates
            </Button>
          </Box>
          <Box>
            <Button
              sx={{
                width: 245,
                color: "white",
                marginX: 2,
                marginY: 1,
                paddingY: "10px",
                textTransform: "capitalize",

                backgroundColor:
                  activeButton === "customr" ? "#8477da" : "transprent",
                ":hover": {
                  backgroundColor: "#8477da",
                },
                display: "flex",
                justifyContent: "start",
              }}
              onClick={() => handleCustomerClick()}
            >
              <img
                style={{ paddingRight: 10 }}
                src={CustomerIcon}
                alt="image of customer"
              />{" "}
              Customer
            </Button>
          </Box>
          <Box>
            <Button
              sx={{
                width: 245,
                color: "white",
                marginX: 2,
                marginY: 1,
                paddingY: "10px",
                textTransform: "capitalize",
                backgroundColor:
                  activeButton === "staff" ? "#8477da" : "transprent",
                ":hover": {
                  backgroundColor: "#8477da",
                },
                display: "flex",
                justifyContent: "start",
              }}
              onClick={handleStaffClick}
            >
              <img
                style={{ paddingRight: 10 }}
                src={TremIcon}
                alt="image of customer"
              />{" "}
              Team
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "start",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#100d24",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <Tooltip title="Logout" placement="top" arrow>
            <Button
              sx={{
                width: 240,
                color: "white",
                margin: 2,
                backgroundColor: "#8477da",
                ":hover": {
                  backgroundColor: "#8477da",
                },
              }}
              variant="contained"
              onClick={Logout}
            >
              Logout
            </Button>
          </Tooltip>
        </Box>

        <div className="bottom">
          <div className="UserIcon">
            <img
              src={`${backendURL}/${decodedToken?.image}`}
              width="50"
              height="50"
              alt="no"
            />
          </div>
          <div
            className="userInSidebar"
            style={{
              width: "155px",
            }}
          >
            {decodedToken?.name}
            <div className="emailUser">{decodedToken?.email}</div>
          </div>{" "}
          <Box sx={{ display: { xs: "none", sm: "block" }, marginTop: "10px" }}>
            <Tooltip title="Logout" placement="top-start" arrow>
              <Box
                sx={{
                  fontSize: 16,
                  marginLeft: "2px",
                  width: 50,
                  height: 30,
                  textAlign: "center",
                }}
                onClick={Logout}
              >
                <img src={logout} alt="image" />
              </Box>
            </Tooltip>
          </Box>
        </div>
      </Box>
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div>
                <span className="logo">
                  <img src={Logo} alt="" />
                </span>
              </div>
              <div>
                <IconButton sx={{ borderRadius: "full" }}>
                  <SearchOutlinedIcon
                    sx={{
                      fontSize: 40,
                      padding: 0.2,
                      fontWeight: 2,
                      color: "white",
                    }}
                  />
                </IconButton>
              </div>
            </Box>
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
                overflowX: "hidden",
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
                overflowX: "hidden",
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
        sx={{ left: 13 }}
      >
        <input
          type="text"
          placeholder="Search Locations"
          style={{
            width: "230px",
            padding: "8px",
            paddingLeft: "35px",
            height: "26px",
            // marginBottom: "10px",
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
        <div
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            paddingX: 25,
            width: "310px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            pt: 100,
            position: "relative",
            marginTop: 4,
            marginBottom: 10,
          }}
        >
          {/* <Box
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
              All Locations
            </Typography>
          </Box> */}
          {staffhaveAccessTo.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#8f8f8f", py: 2 }}>
              No location found
            </Typography>
          ) : (
            staffhaveAccessTo.map((location) => (
              <Box
                key={location.id}
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
              >
                <Box className="UserIcon-1">
                  <img
                    src={`${backendURL}/${location?.image}`}
                    width="32"
                    height="32"
                    alt="no"
                  />
                </Box>
                <Box
                  style={{ flexGrow: 1 }}
                  onClick={() => handleSwitchLocation(location)}
                  sx={{ paddingLeft: "12px" }}
                >
                  <a style={{ cursor: "pointer" }}>
                    <Typography
                      sx={{ textTransform: "uppercase", fontSize: "16px" }}
                    >
                      {location?.name}
                    </Typography>
                  </a>
                  <Typography style={{ fontSize: "10px" }}>
                    {location?.email}
                  </Typography>
                </Box>

                {activeLocation?.id === location?.id && (
                  <Box>
                    <FiberManualRecord
                      sx={{ color: "#5cb85c", mr: 1, mb: -0.6 }}
                    />
                  </Box>
                )}
              </Box>
            ))
          )}
        </div>
      </Popover>
    </>
  );
}

export default MobileBar;
