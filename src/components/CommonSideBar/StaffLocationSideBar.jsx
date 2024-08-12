import React, { useEffect, useState } from "react";
import "./style.scss";
import logout from "../../Assets/logout.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, Button, IconButton, Tooltip ,Typography} from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { FmdGoodOutlined } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DefaultImage from "../ui-components/defaultImage";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationButton from "../ui-components/NotificationButton";
import Logo from "../../Assets/purplelogo.svg";
import {
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
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import EstimsteIcon from "../../Assets/bar.svg";
import MenuSigleItem from "./MenuSigleItem";

const StaffLocationSideBar = ({handleDrawerToggle,mobileOpen}) => {
  const { refetch: fetchLocations, data: locationsData } =
    useFetchStaffHaveAccessTo();
  const {
    mutate: switchLocationUser,
    data: newToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchStaffLocation();
  const [open, setOpen] = useState(false);
  const location = useLocation();
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
  const superSuperAdminsList =
    JSON.parse(process.env.REACT_APP_SUPER_USER_ADMIN) ?? [];

  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSwitchLocation = async (locationData) => {
    if (!locationData || !decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (locationData.company._id !== decodedToken.company_id) {
      await switchLocationUser(locationData.company._id);
      console.log("user changed");
    }
  };
  useEffect(() => {
    if (switched) {
      localStorage.setItem("token", newToken);
      window.location.href = "/";
    }
  }, [switched]);

  //Staff After Location
  const navigate = useNavigate();
  const [activeLocation, setActiveLocation] = useState(null);
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
                <UnfoldMore sx={{ color: "white", mr: 1 }} />
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
      <div className="center">
        <ul>
        <Tooltip title="Switch Location">
              <Button
                sx={{
                  width: 290,
                  height:'56px',
                  color: "white",
                  borderRadius:'6px !important',
                  marginX: 2,
                  marginY: 1,
                  paddingY: "10px",
                  textTransform: "capitalize",
                  background:'#000000',
                  ":hover": {
                    backgroundColor: "#000000",
                    '.setLocation':{
                      color:'#FFFF'
                    }
                  },
                  display: "flex",
                  justifyContent: "start",
                }}
                onClick={handleSeeLocationsClick}
              >
                 <Box>
                  <DefaultImage
                    image={activeLocation?.company?.image}
                    name={activeLocation?.company?.name}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "82%",
                  }}
                >
                  <Typography
                  className='setLocation'
                    sx={{
                      fontSize: "16px",
                      paddingLeft: "2px",
                      whiteSpace: "nowrap",
                      display: "block",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      textTransform: "capitalize",
                      color:'#FFFF'
                    }}
                  >
                    {activeLocation?.company?.name}
                  </Typography>
                </Box>
                <ExpandMoreOutlinedIcon className='setLocation' sx={{ color: "#FFFF", mr: 1 }} />
              </Button>
            </Tooltip>
          {/* <li
            style={{ padding: 10 }}
            className={` ${Boolean(anchorEl) ? "active" : ""}`}
            onClick={handleSeeLocationsClick}
          >
            <IconButton className='iconButton' sx={{ color: "#5D6164", padding: 0.2 }}>
              <VisibilityOutlinedIcon sx={{ mr: "12px" }} />
              <span>See Locations</span>
            </IconButton>
          </li> */}
          <hr style={{opacity:0 ,marginTop:'20px'}} />
          <MenuSigleItem link='/projects' secondLink='/'>
          <FmdGoodOutlined sx={{  mr: 1 }} />
          <span>Projects</span>
          </MenuSigleItem>
             <MenuSigleItem link='/estimates' >
             <FmdGoodOutlined sx={{  mr: 1 }} />
             <span>Old Estimates</span>
          </MenuSigleItem>
             <MenuSigleItem link='/customers' >
             <FmdGoodOutlined sx={{  mr: 1 }} />
             <span>Customer</span>
          </MenuSigleItem>
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

        <div className="bottom" style={{ opacity: 0,display:'none' }}>
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
     
    {decodedToken.company_id.length ? drawer : <Box>
      <div className="center">
        <ul>
          <li
            style={{ padding: 10 }}
            className={` ${Boolean(anchorEl) ? "active" : ""}`}
            onClick={handleSeeLocationsClick}
          >
            <Button  fullWidth className='iconButton' sx={{ color: "#5D6164", padding: 0.2,justifyContent:'start' }}>
              <VisibilityOutlinedIcon sx={{ mr: "12px" }} />
              <span>See Locations</span>
            </Button>
          </li>
          <MenuSigleItem link='/locations' secondLink='/'>
          <FmdGoodOutlined sx={{  mr: 1 }} />
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
      <SwitchLocationPopup
        anchorEl={anchorEl}
        handleClosePopup={handleClosePopup}
        data={locationsData}
        role={true}
        handleUserClick={handleSwitchLocation}
        isSwitching={isSwitching}
      />
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </Box> }
    </>
  );
};
export default StaffLocationSideBar;