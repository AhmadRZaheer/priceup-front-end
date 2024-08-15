import React, { useEffect, useState } from "react";
import "./style.scss";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import TremIcon from "../../Assets/users.svg";
import { FmdGoodOutlined } from "@mui/icons-material";
import {
  useFetchDataAdmin,
  useSwitchLocationSuperAdmin,
} from "../../utilities/ApiHooks/superAdmin";
import DefaultImage from "../ui-components/defaultImage";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MenuSigleItem from "./MenuSigleItem";

const SuperAdminSideBar = () => {
  const { data: AdminData, refetch: teamMemberRefetch } = useFetchDataAdmin();
  const {
    mutate: switchLocationSuperAdmin,
    data: useTokenSuperAdmin,
    isSuccess: switchedSuperAdmin,
    isLoading: isSwitchingSuperAdmin,
  } = useSwitchLocationSuperAdmin();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const Logout = () => {
    dispatch(logoutHandler());
    window.location.href = "/adminlogin";
  };
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const superSuperAdminsList =
    JSON.parse(process.env.REACT_APP_SUPER_USER_ADMIN) ?? [];

  const handleSeeLocationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    teamMemberRefetch();
  }, []);
  const handleAdminNameClick = (admin) => {
    switchLocationSuperAdmin({
      company_id: admin.company._id,
      adminId: admin.company.user_id,
    });
  };
  useEffect(() => {
    if (switchedSuperAdmin) {
      localStorage.removeItem("token");
      localStorage.setItem("userReference", decodedToken.id);
      localStorage.setItem("token", useTokenSuperAdmin);
      window.location.href = "/";
    }
  }, [switchedSuperAdmin]);
  return (
    <>
      <div className="center">
        <ul>
          <li
            style={{ padding: 10 }}
            className={` ${Boolean(anchorEl) ? "active" : ""}`}
            onClick={handleSeeLocationsClick}
          >
            <Button
            fullWidth
              className="iconButton"
              sx={{ color: "#5D6164", padding: 0.2 ,justifyContent:'start',textTransform:'capitalize'}}
            >
              <VisibilityOutlinedIcon sx={{ mr: "12px" }} />
              <span>See Locations</span>
            </Button>
          </li>
          <MenuSigleItem link='/admin' secondLink='/' >
          <FmdGoodOutlined sx={{ mr: "12px" }} />
          <span>Locations</span>
          </MenuSigleItem>
          <MenuSigleItem link='/team' >
          <PeopleAltOutlinedIcon sx={{ mr: "12px" }} />
          <span>Users</span>
          </MenuSigleItem>
          <MenuSigleItem link='/user' >
          <PeopleAltOutlinedIcon sx={{ mr: "12px" }} />
                <span>Admins</span>
          </MenuSigleItem>
          {superSuperAdminsList?.includes(decodedToken.email) && (
             <MenuSigleItem link='/superadmins' >
            <PeopleAltOutlinedIcon sx={{ mr: "12px" }} />
            <span>Super Admins</span>
             </MenuSigleItem>
          )}
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
        handleUserClick={handleAdminNameClick}
        isSwitching={isSwitchingSuperAdmin}
        data={AdminData}
      />

      <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
    </>
  );
};
export default SuperAdminSideBar;
