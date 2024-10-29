import React, { useEffect, useState } from "react";
import "./style.scss";
import logout from "../../Assets/logout.svg";
import { NavLink, useLocation } from "react-router-dom";
import { logoutHandler } from "../../redux/userAuth";
import { useDispatch, useSelector } from "react-redux";
import LagoutModal from "../Modal/logOut";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import TremIcon from "../../Assets/users.svg";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { FmdGoodOutlined, HomeOutlined } from "@mui/icons-material";
import {
  useFetchDataAdmin,
  useSwitchLocationSuperAdmin,
} from "../../utilities/ApiHooks/superAdmin";
import DefaultImage from "../ui-components/defaultImage";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MenuSigleItem from "./MenuSigleItem";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { getLocationsRefetch, setChangeLocation } from "@/redux/refetch";

const SuperAdminSideBar = () => {
  const locationsRefetch = useSelector(getLocationsRefetch);
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
  }, [locationsRefetch]);
  const handleAdminNameClick = (admin) => {
    switchLocationSuperAdmin({
      company_id: admin._id,
      adminId: admin.user_id,
    });
    setAnchorEl(null);
  };
  useEffect(() => {
    if (switchedSuperAdmin) {
      localStorage.setItem("splashLoading", "true");
      dispatch(setChangeLocation());
      localStorage.removeItem("token");
      localStorage.setItem("userReference", decodedToken.id);
      localStorage.setItem("token", useTokenSuperAdmin);
      //  setTimeout(() => {
      window.location.href = "/";
      //  }, 1000);
    }
  }, [switchedSuperAdmin]);
  return (
    <>
      <Tooltip title="See Locations">
        <Button
          sx={{
            mx: "auto",
            width: 264,
            height: "56px",
            color: "white",
            padding: "4px 12px",
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
            <VisibilityOutlinedIcon sx={{}} />

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
              transform: anchorEl !== null ? "rotate(270deg)" : "rotate(0deg)",
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
              sx={{ color: "#5D6164", padding: 0.2 ,justifyContent:'start',textTransform:'capitalize',gap:'12px'}}
            >
              <VisibilityOutlinedIcon sx={{   }} />
              <span>See Locations</span>
            </Button>
          </li> */}
          <MenuSigleItem link="/dashboard" secondLink="/">
            <HomeOutlined sx={{}} />
            <span>Dashboard</span>
          </MenuSigleItem>
          <MenuSigleItem link="/locations" >
            <FmdGoodOutlined sx={{}} />
            <span>Location Management</span>
          </MenuSigleItem>
          <MenuSigleItem link="/users">
            <PeopleAltOutlinedIcon sx={{}} />
            <span>User Management</span>
          </MenuSigleItem>
          <MenuSigleItem
            link="/notification?tab=Activity"
            secondLink="/notification"
          >
            <AccessTimeOutlinedIcon sx={{}} />
            <span>Activity Logs</span>
          </MenuSigleItem>
          {/* <MenuSigleItem link="/user">
            <PeopleAltOutlinedIcon sx={{   }} />
            <span>Admins</span>
          </MenuSigleItem> */}
          {/* {superSuperAdminsList?.includes(decodedToken.email) && (
            <MenuSigleItem link="/superadmins">
              <PeopleAltOutlinedIcon sx={{   }} />
              <span>Super Admins</span>
            </MenuSigleItem>
          )} */}
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
