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
  useBackToStaffLocations,
  useFetchStaffHaveAccessTo,
  useSwitchStaffLocation,
} from "../../utilities/ApiHooks/team";
import { setDataRefetch } from "../../redux/staff";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import DefaultImage from "../ui-components/defaultImage";
import SingleUser from "../ui-components/SingleUser";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";
import NotificationButton from "../ui-components/NotificationButton";

const drawerWidth = 280;

function MobileBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("esti");
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: haveAccess, isFetched: haveAccessFetched } =
    useFetchStaffHaveAccessTo();
  const {
    mutate: switchLocation,
    data: switchLocationData,
    isSuccess: switchLocationSuccess,
    isError: switchLocationError,
    isLoading: isSwitchingLocation,
  } = useSwitchStaffLocation();
  const {
    mutate: backToStaffLocationsRefetch,
    data: useTokenBack,
    isSuccess: switchedBack,
  } = useBackToStaffLocations();
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const [activeLocation, setActiveLocation] = useState(null);
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
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logoutHandler());
    window.location.href = "/login";
  };

  const handleCustomerClick = () => {
    // setActiveButton("customr");
    // dispatch(setNavigationDesktop("customerTable"));
    navigate('/customers');
  };
  
  const handleEstimateClick = () => {
    // setActiveButton("esti");
    // dispatch(setNavigationDesktop("existing"));
    navigate('/estimates');
  };
  const handleProjectClick = () => {
    navigate("/projects");
  }
  const handleSwitchLocation = (location) => {
    if (location?.company?._id !== activeLocation?.company?._id) {
      setActiveLocation(location);
      switchLocation(location.company._id);
      handleClosePopup();
      toggleSidebar();
    }
  };
  const handleBacktoStaffLocation = () => {
    backToStaffLocationsRefetch();
  };
  useEffect(() => {
    if (switchLocationSuccess) {
      localStorage.setItem("token", switchLocationData);
      window.location.href = "/locations";
    }
    if (switchedBack) {
      localStorage.setItem("token", useTokenBack.token);
      window.location.href = "/";
    }
    if (haveAccessFetched) {
      setActiveLocation(
        haveAccess?.find(
          (item) => item?.company?._id === decodedToken?.company_id
        )
      );
    }
  }, [
    switchLocationSuccess,
    switchLocationError,
    haveAccessFetched,
    switchedBack,
  ]);
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
        <hr style={{border:'1px solid rgba(217, 217, 217, 0.34)',marginTop:'1px'}} />
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
                  width: 263,
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
                    width: "82%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      paddingLeft: "2px",
                      whiteSpace: "nowrap",
                      display: "block",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      textTransform: "capitalize"
                    }}
                  >
                    {activeLocation?.company?.name}
                  </Typography>
                </Box>
                <UnfoldMore sx={{ color: "white", mr: 1 }} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Button
              sx={{
                width: 263,
                color: "white",
                marginX: 2,
                marginY: 1,
                paddingY: "10px",
                textTransform: "capitalize",
                backgroundColor:
                location.pathname.includes("/projects") || location.pathname === '/' ? "#8477da" : "transprent",
                ":hover": {
                  backgroundColor: "#8477da",
                },
                display: "flex",
                justifyContent: "start",
                fontSize: "16px",
              }}
              onClick={() => handleProjectClick()}
            >
              <img
                style={{ paddingRight: 10 }}
                src={EstimsteIcon}
                alt="image of customer"
              />{" "}
              Projects
            </Button>
          </Box>
          <Box>
            <Button
              sx={{
                width: 263,
                color: "white",
                marginX: 2,
                marginY: 1,
                paddingY: "10px",
                textTransform: "capitalize",
                backgroundColor:
                location.pathname.includes("/estimates") ? "#8477da" : "transprent",
                ":hover": {
                  backgroundColor: "#8477da",
                },
                display: "flex",
                justifyContent: "start",
                fontSize: "16px",
              }}
              onClick={() => handleEstimateClick()}
            >
              <img
                style={{ paddingRight: 10 }}
                src={EstimsteIcon}
                alt="image of customer"
              />{" "}
              Old Estimates
            </Button>
          </Box>
          <Box>
            <Button
              sx={{
                width: 263,
                color: "white",
                marginX: 2,
                marginY: 1,
                paddingY: "10px",
                textTransform: "capitalize",
                fontSize: "16px",
                backgroundColor:
                location.pathname === "/customers" ? "#8477da" : "transprent",
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
          {/* <Box>
            <Button
              sx={{
                width: 263,
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
                fontSize: "16px",
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
          </Box> */}
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

        <div className="bottom" style={{opacity:0}}>
          <div className="UserIcon">
            <DefaultImage
              image={decodedToken?.image}
              name={decodedToken?.name}
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
     <NotificationButton  />
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
                width: '304px',
                overflowX: "hidden",
                backgroundColor:'#100D24',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <SwitchLocationPopup
        anchorEl={anchorEl}
        handleClosePopup={handleClosePopup}
        data={haveAccess}
        handleUserClick={handleSwitchLocation}
        isSwitching={isSwitchingLocation}
        handleBack={handleBacktoStaffLocation}
      />

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
        PaperProps={{
          style: {
            borderRadius: "34px",
            width: "317px",
          },
        }}
        sx={{ left: 30, top: -72 }}
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
          </Box> 
          {staffhaveAccessTo.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#8f8f8f", py: 2 }}>
              No location found
            </Typography>
          ) : (
            staffhaveAccessTo.map((location) => (
              <SingleUser
                key={location?.id}
                item={location}
                active={activeLocation?.id === location?.id}
                handleClick={() => handleSwitchLocation(location)}
              />
            ))
          )}
        </div>
      </Popover> */}
    </>
  );
}

export default MobileBar;
