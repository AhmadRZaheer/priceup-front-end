import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logo from "../../Assets/purplelogo.svg";
import "./mobileNavBar.scss";
import CustomerIcon from "../../Assets/Customer-icon.svg";
import TremIcon from "../../Assets/users.svg";
import React, { useEffect, useMemo, useState } from "react";
import { setNavigation } from "../../redux/estimateCalculations";
import {
  Drawer,
  IconButton,
  Backdrop,
  Box,
  Button,
  Tooltip,
  Popover,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { backendURL } from "../../utilities/common";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 280,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
}));
function MobileBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState(null);
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
    dispatch(setNavigation("customerTable"));
  };
  const handleStaffClick = () => {
    setActiveButton("staff");
    dispatch(setNavigation("staffTable"));
  };
  const handleEstimateClick = () => {
    setActiveButton("esti");
    dispatch(setNavigation("existing"));
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
  return (
    <>
      <div className="Main">
        <div className="MenuIcon" onClick={toggleSidebar}>
          <MenuRoundedIcon sx={{ fontSize: 40, padding: 1 }} />
        </div>
        <div className="top">
          <span className="logo">
            <img src={Logo} alt="" />
          </span>
        </div>
        <div>
          <IconButton sx={{ borderRadius: "full" }}>
            <SearchOutlinedIcon
              sx={{ fontSize: 40, padding: 0.2, fontWeight: 2, color: "white" }}
            />
          </IconButton>
        </div>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={toggleSidebar}
          classes={{ paper: classes.drawer }}
          sx={{ width: 380 }}
        >
          <Box
            sx={{
              backgroundColor: "#100d24",
              width: 280,
              height: "100vh",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ height: "92vh" }}>
              <div className="top2">
                <span className="logo2">
                  <img src={Logo} alt="" />
                </span>
              </div>
              <Box
                sx={{
                  height: "65vh",
                  overflow: "auto",
                  width: 280,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ marginTop: 2, textAlign: "left" }}>
                  <Tooltip title="Switch Location">
                    <Button
                      sx={{
                        color: "white",
                        padding: 0.2,
                        width: 200,
                        backgroundColor: "#8477da",
                        ":hover": {
                          backgroundColor: "#8477da",
                        },
                      }}
                      onClick={handleSeeLocationsClick}
                    >
                      <PinDrop sx={{ color: "white", }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          padding: "8px",
                        }}
                      >
                        <Typography sx={{ fontSize: "16px", mb: -0.4 }}>
                          {activeLocation?.name}
                        </Typography>
                      </Box>
                      {/* <UnfoldMore sx={{ color: "white", mr: 1 }} /> */}
                    </Button>
                  </Tooltip>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    sx={{
                      width: 200,
                      color: "white",
                      margin: 2,
                      textTransform: "capitalize",
                      backgroundColor:
                        activeButton === "esti" ? "#B0C4DE" : "#8477da",
                      ":hover": {
                        backgroundColor:
                          activeButton === "esti" ? "#B0C4DE" : "#8477da",
                      },
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
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    sx={{
                      width: 200,
                      color: "white",
                      margin: 2,
                      textTransform: "capitalize",
                      backgroundColor:
                        activeButton === "customr" ? "#B0C4DE" : "#8477da",
                      ":hover": {
                        backgroundColor:
                          activeButton === "customr" ? "#B0C4DE" : "#8477da",
                      },
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
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    sx={{
                      width: 200,
                      color: "white",
                      margin: 2,
                      textTransform: "capitalize",
                      backgroundColor:
                        activeButton === "staff" ? "#B0C4DE" : "#8477da",
                      ":hover": {
                        backgroundColor:
                          activeButton === "staff" ? "#B0C4DE" : "#8477da",
                      },
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
              }}
            >
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
              </div>
            </Box>
          </Box>
        </Drawer>
        <Backdrop
          open={isSidebarOpen}
          onClick={handleBackdropClick}
          className={classes.backdrop}
        />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopup}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      // sx={{ up:20 }}
      >
        <input
          type="text"
          placeholder="Search Locations"
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
            paddingBottom: 20,
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
              All Locations
            </Typography>
          </Box>
          {staffhaveAccessTo.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#8f8f8f", py: 2 }}>
              No location found
            </Typography>
          ) : (
            staffhaveAccessTo.map((location) => (
              <Box
                key={location.id}
                sx={{
                  width: "88%",
                  ml: "10px",
                  gap: "10px",
                  marginBottom: "5px",
                  justifyContent: "space-between",
                  alignItems: "center",
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
