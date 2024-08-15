import React, { useEffect, useState } from "react";
import "./style.scss";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { FmdGoodOutlined } from "@mui/icons-material";
import {
  useFetchCustomAdminHaveAccessTo,
  useSwitchLocationUser,
} from "../../utilities/ApiHooks/superAdmin";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DefaultImage from "../ui-components/defaultImage";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";
import MenuSigleItem from "./MenuSigleItem";

const CustomAdminLocationSideBar = () => {
  const { mutate: fetchLocations, data: locationsData } =
    useFetchCustomAdminHaveAccessTo();
  const {
    mutate: switchLocationUser,
    data: newToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchLocationUser();
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

  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSwitchLocation = async (companyData) => {
    if (!companyData || !decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (companyData?._id !== decodedToken.company_id) {
      await switchLocationUser(companyData._id);
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
      <div className="center">
        <ul>
          <li
            style={{ padding: 10 }}
            className={` ${Boolean(anchorEl) ? "active" : ""}`}
            onClick={handleSeeLocationsClick}
          >
            <Button fullWidth className='iconButton' sx={{ color: "#5D6164", padding: 0.2,justifyContent:'start' }}>
              <VisibilityOutlinedIcon sx={{ mr: "12px" }} />
              <span>See Locations</span>
            </Button>
          </li>
          <MenuSigleItem link='/locations' secondLink='/'>
          <FmdGoodOutlined  sx={{  mr: 1 }} />
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
    </>
  );
};
export default CustomAdminLocationSideBar;
