import React, { useEffect, useState } from "react";
import "./staffLocation_SideBar.scss";
import Logo from "../../Assets/purplelogo.svg";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, IconButton, Tooltip } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import TremIcon from "../../Assets/users.svg";
import { FmdGoodOutlined } from "@mui/icons-material";
import EyeIcon from "../../Assets/eye-icon.svg";
import DefaultImage from "../ui-components/defaultImage";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";
import {
  useFetchStaffHaveAccessTo,
  useSwitchStaffLocation,
} from "../../utilities/ApiHooks/team";

const StaffLocationsSidebar = () => {
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
  const superSuperAdminsList = JSON.parse(process.env.REACT_APP_SUPER_USER_ADMIN) ?? []; 

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
          <Box sx={{ marginTop: '10px' }}>
            <NavLink style={{ marginTop: 20 }} to="/">
              <div className="top">
                <span className="staffLogo">
                  <img src={Logo} alt="" />
                </span>
              </div>
            </NavLink>
             <hr style={{border:'1px solid rgba(217, 217, 217, 0.34)'}} />
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

                <NavLink to="/locations" className="link">
                  <li
                    className={` ${
                      location.pathname === "/locations"
                        ? "active"
                        : location.pathname === "/"
                        ? "active"
                        : ""
                    }`}
                  >
                    <IconButton sx={{ color: "white", padding: 0.2 }}>
                      <FmdGoodOutlined sx={{ color: "white", mr: 1 }} />
                      <span>Locations</span>
                    </IconButton>
                  </li>
                </NavLink>

                {/* {superSuperAdminsList?.includes(decodedToken.email) && (
                  <NavLink to="/superadmins" className="link">
                    <li
                      className={` ${
                        location.pathname === "/superadmins" ? "active" : ""
                      }`}
                    >
                      <IconButton sx={{ color: "white", padding: 0.2 }}>
                        <img
                          style={{ paddingRight: 10 }}
                          src={TremIcon}
                          alt="image of customer"
                        />
                        <span>Super Admins</span>
                      </IconButton>
                    </li>
                  </NavLink>
                )} */}
              </ul>
            </div>
          </Box>
          <Box>
            {/* <div className="line"></div> */}
            <div className="bottom" style={{opacity:0}}>
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

      <SwitchLocationPopup
        anchorEl={anchorEl}
        handleClosePopup={handleClosePopup}
        data={locationsData}
        role={true}
        handleUserClick={handleSwitchLocation}
        isSwitching={isSwitching}
      />
      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default StaffLocationsSidebar;
