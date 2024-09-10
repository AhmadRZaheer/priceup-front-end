import React, { useEffect, useState } from "react";
import "./style.scss";
import logout from "../../Assets/logout.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { FmdGoodOutlined } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DefaultImage from "../ui-components/defaultImage";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationButton from "../ui-components/NotificationButton";
import Logo from "../../Assets/purplelogo.svg";
import {
  useBackToStaffLocations,
  useFetchStaffHaveAccessTo,
  useSwitchStaffLocation,
} from "../../utilities/ApiHooks/team";
import {
  FiberManualRecord,
  LocationSearching,
  PinDrop,
  Search,
  UnfoldMore,
} from "@mui/icons-material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import EstimsteIcon from "../../Assets/bar.svg";
import MenuSigleItem from "./MenuSigleItem";
import { setChangeLocation } from "@/redux/refetch";

const StaffLocationSideBar = () => {
  const {
    refetch: fetchLocations,
    data: locationsData,
    isFetched: haveAccessFetched,
  } = useFetchStaffHaveAccessTo();
  const [activeLocation, setActiveLocation] = useState(null);

  // const {
  //   mutate: switchLocation,
  //   data: newToken,
  //   isSuccess: switched,
  //   isLoading: isSwitching,
  // } = useSwitchStaffLocation();
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
  const [open, setOpen] = useState(false);
  // const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const Logout = () => {
    dispatch(logoutHandler());
    window.location.href = "/login";
  };
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);

  const handleSeeLocationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const superSuperAdminsList =
  //   JSON.parse(process.env.REACT_APP_SUPER_USER_ADMIN) ?? [];

  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSwitchLocation = (location) => {
    setAnchorEl(null);
    if (location?._id !== activeLocation?._id) {
      setActiveLocation(location);
      switchLocation(location._id);
      handleClosePopup();
    }
  };
  const handleBacktoStaffLocation = () => {
    setAnchorEl(null);
    backToStaffLocationsRefetch();
  };
  useEffect(() => {
    if (switchLocationSuccess) {
      localStorage.setItem('splashLoading', 'true')
      dispatch(setChangeLocation());
      localStorage.setItem("token", switchLocationData);
      window.location.href = "/";
    }
    if (switchedBack) {
      localStorage.setItem('splashLoading', 'true')
      dispatch(setChangeLocation());
      localStorage.setItem("token", useTokenBack.token);
      window.location.href = "/locations";
    }
    if (haveAccessFetched) {
      setActiveLocation(
        locationsData?.find((item) => item?._id === decodedToken?.company_id)
      );
    }
  }, [
    switchLocationSuccess,
    switchLocationError,
    haveAccessFetched,
    switchedBack,
  ]);

  // const handleSwitchLocation = async (locationData) => {
  //   if (!locationData || !decodedToken) {
  //     console.error("Invalid user data or decoded token.");
  //     return;
  //   }
  //   if (locationData.company._id !== decodedToken.company_id) {
  //     await switchLocationUser(locationData.company._id);
  //     console.log("user changed");
  //   }
  // };
  // useEffect(() => {
  //   if (switched) {
  //     localStorage.setItem("token", newToken);
  //     window.location.href = "/";
  //   }
  // }, [switched]);

  //Staff After Location
  // const navigate = useNavigate();
  const drawer = (
    <>
      {/* <Box>
        <Box
          sx={{
            height: "65vh",
            overflow: "auto",
            width: 318,
            paddingTop: "20px",
          }}
        >
          <Box>
            <Tooltip title="Switch Location">
              <Button
                sx={{
                  width: 290,
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
                      textTransform: "capitalize",
                    }}
                  >
                    {activeLocation?.company?.name}
                  </Typography>
                </Box>
                <UnfoldMore sx={{ color: "white",   }} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Button
              sx={{
                width: 290,
                color:                 
                location.pathname.includes("/projects") ||
                location.pathname === "/"
                  ? "#FFFF"
                  : "#5D6164",
                marginX: 2,
                marginY: 1,
                paddingY: "10px",
                textTransform: "capitalize",
                backgroundColor:
                  location.pathname.includes("/projects") ||
                  location.pathname === "/"
                    ? "#8477da"
                    : "transprent",
                ":hover": {
                  backgroundColor: "#8477da",
                },
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
                width: 290,
                color: "#5D6164",
                marginX: 2,
                marginY: 1,
                paddingY: "10px",
                textTransform: "capitalize",
                backgroundColor: location.pathname.includes("/estimates")
                  ? "#8477da"
                  : "transprent",
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
                width: 290,
                color: "#5D6164",
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
        </Box>
      </Box> */}
      
          <Tooltip title="Switch Location">
            <Button
              sx={{
                mx: "auto",
                width: 264,
                height: "56px",
                color: "white",
                padding: "4px 12px",
                display: "flex",
                borderRadius: "6px",
                background: "#000000",
                m: 2,
                display: "flex",
                justifyContent: "space-between",
                ":hover": {
                  backgroundColor: "#000000",
                  },
              }}
              onClick={handleSeeLocationsClick}
            >
              <Box sx={{ display: "flex", gap: "12px" }}>
                <DefaultImage
                  image={activeLocation?.image}
                  name={activeLocation?.name}
                />

                <span
                  style={{
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "21.86px",
                  }}
                >
                  {activeLocation?.name}
                </span>
              </Box>
              <ExpandMoreOutlinedIcon
                className="setLocation"
                sx={{
                  color: "#FFFF",
                  transform:
                    anchorEl !== null ? "rotate(270deg)" : "rotate(0deg)",
                }}
              />
            </Button>
          </Tooltip>          
          <hr style={{ border: "1px solid #D1D4DB" }} />
          <div className="center">
        <ul>
          <Box>
          <MenuSigleItem link="/projects" secondLink="/">
            <FmdGoodOutlined />
            <span>Projects</span>
          </MenuSigleItem>
          <MenuSigleItem link="/estimates">
            <FmdGoodOutlined   />
            <span>Old Estimates</span>
          </MenuSigleItem>
          {/* <MenuSigleItem link="/customers">
            <FmdGoodOutlined   />
            <span>Customer</span>
          </MenuSigleItem> */}
          </Box>         
        </ul>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "start",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#FFFF",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <Tooltip title="Logout" placement="top" arrow>
            <Button
              sx={{
                width: 240,
                color: "#5D6164",
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

        <div className="bottom" style={{ opacity: 0, display: "none" }}>
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
    </>
    // </Box>
  );
  const drawerWidth = 280;

  return (
    <>
      {decodedToken.company_id.length ? (
        drawer
      ) : (
        <Box>
            <Tooltip title="See Locations">
            <Button
              sx={{
                mx: "auto",
                width: 264,
                height: "56px",
                color: "white",
                padding: "4px 12px",
                display: "flex",
                borderRadius: "6px",
                background: "#000000",
                m: 2,
                display: "flex",
                justifyContent: "space-between",
                ":hover": {
                  backgroundColor: "#000000",
                  },
              }}
              onClick={handleSeeLocationsClick}
            >
              <Box sx={{ display: "flex", gap: "12px" }}>
              <VisibilityOutlinedIcon sx={{  }} />

                <span
                  style={{
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "21.86px",
                  }}
                >
                  See Locations
                </span>
              </Box>
              <ExpandMoreOutlinedIcon
                className="setLocation"
                sx={{
                  color: "#FFFF",
                  transform:
                    anchorEl !== null ? "rotate(270deg)" : "rotate(0deg)",
                }}
              />
            </Button>
          </Tooltip>          
          <hr style={{ border: "1px solid #D1D4DB" }} />
          <div className="center">
            <ul>
              {/* <li
                style={{ padding: 10 }}
                className={` ${Boolean(anchorEl) ? "active" : ""}`}
                onClick={handleSeeLocationsClick}
              >
                <Button
                  fullWidth
                  className="iconButton"
                  sx={{
                    color: "#5D6164",
                    padding: 0.2,
                    justifyContent: "start",
                    textTransform: "capitalize",
                    gap:'12px'
                  }}
                >
                  
                  <span>See Locations</span>
                </Button>
              </li> */}
              <MenuSigleItem link="/locations" secondLink="/">
                <FmdGoodOutlined   />
                <span>Locations</span>
              </MenuSigleItem>
            </ul>
          </div>
          <Box>
            <div className="bottom" style={{ opacity: 0, display: "none" }}>
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
      )}
      <SwitchLocationPopup
        anchorEl={anchorEl}
        handleClosePopup={handleClosePopup}
        data={locationsData}
        role={true}
        handleUserClick={handleSwitchLocation}
        isSwitching={isSwitchingLocation}
        handleBack={handleBacktoStaffLocation}
      />
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default StaffLocationSideBar;
