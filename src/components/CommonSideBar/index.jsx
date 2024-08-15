import { Box, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import SuperSidebar from "../SuperSidebar/superSidebar";
import Logo from "../../Assets/purplelogo.svg";
import "./style.scss";
import { NavLink } from "react-router-dom";
import SuperAdminSideBar from "./SuperAdminSideBar";
import StaffLocationSideBar from "./StaffLocationSideBar";
import CustomAdminLocationSideBar from "./CustomAdminLocationSideBar";
import { getDecryptedToken } from "@/utilities/common";
import {
  isAdmin,
  isCustomAdmin,
  isStaff,
  isSuperAdmin,
} from "@/utilities/authentications";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationButton from "../ui-components/NotificationButton";
import AdminSideBar from "./AdminSideBar";

const drawerWidth = 320;

const getSidebarAccordingToUserRole = (decodedToken) => {
  if (!decodedToken) {
    return <>Intruder!!</>;
  }
  const { company_id } = decodedToken;
  if (
    isAdmin(decodedToken) ||
    (isCustomAdmin(decodedToken) && company_id?.length)
  ) {
    return <AdminSideBar /> // for admin and custom admin where company id exists
  }
  if (isStaff(decodedToken)) {
    return <StaffLocationSideBar />;
  }
  if (isCustomAdmin(decodedToken) && company_id === "") {
    return <CustomAdminLocationSideBar />; // custom admin sidebar where company id is empty
  }
  if (isSuperAdmin(decodedToken)) {
    return <SuperAdminSideBar />; // super admin sidebar
  }
  return <></>;
};

const CommonSideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const decodedToken = getDecryptedToken();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    // console.log('click');
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" },
        }}
      >
        <Toolbar sx={{ backgroundColor: "#FFFF" }}>
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
                sx={{ mr: 2, display: { sm: "none" }, color: '#5D6164' }}
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
              <NotificationButton />
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
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#FFFF",
            },
          }}

        >
          <Box
            sx={{
              width: "319px",
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "space-between",
              height: "100vh",
              // justifyContent: "space-between",
              background: "#FFFF",
            }}
          >
            <Box sx={{ marginTop: "10px" }}>
              <NavLink style={{ marginTop: 20 }} to="/">
                <div className="logoTop">
                  <span className="logoImg">
                    <img src={Logo} alt="" />
                  </span>
                </div>
              </NavLink>
              <hr style={{ border: "1px solid rgba(217, 217, 217, 0.34)" }} />
            </Box>
            {getSidebarAccordingToUserRole(decodedToken)}
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#FFFF",
            },
          }}
          open
        >
          <Box
            sx={{
              width: "319px",
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "space-between",
              height: "100vh",
              // justifyContent: "space-between",
              background: "#FFFF",
            }}
          >
            <Box sx={{ marginTop: "4px" }}>
              <NavLink style={{ marginTop: 20 }} to="/">
                <div className="logoTop">
                  <span className="logoImg">
                    <img src={Logo} alt="" />
                  </span>
                </div>
              </NavLink>
              <hr style={{ border: "1px solid rgba(217, 217, 217, 0.34)" }} />
            </Box>
            {getSidebarAccordingToUserRole(decodedToken)}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default CommonSideBar;
