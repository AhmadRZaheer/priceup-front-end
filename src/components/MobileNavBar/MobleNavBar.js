import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logo from "../../Assets/purplelogo.svg";
import "./MobileNavBar.scss";
import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Backdrop,
  Box,
  Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { backendURL } from "../../utilities/common";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../ProtectedRoute/AuthVerify";
import { logoutHandler } from "../../redux/userAuth";

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleBackdropClick = () => {
    setIsSidebarOpen(false);
  };

  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  const Logout = () => {
    // console.log("hello world");
    dispatch(logoutHandler());

    navigate("/login");
  };
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
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
          sx={{ width: 340 }}
        >
          <Box
            sx={{
              backgroundColor: "#100d24",
              width: 280,
              height: "100%",
              padding: 0,
              margin: 0,
              // py: 1,
            }}
          >
            <Box>
              <div className="top2">
                <span className="logo2">
                  <img src={Logo} alt="" />
                </span>
              </div>
              <Box sx={{marginTop: 8,}}>
                <Button
                // href="/staff"
                  sx={{
                    width: 220,
                    color: "white",
                    marginLeft: 4,
                    backgroundColor: "#8477da",
                    ":hover": {
                      backgroundColor: "#8477da",
                    }
                  }}
                  // variant="contained"
                >
                  Staff
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "start",
                height: "78%",
                width: "100%",
                flexDirection: "column",
                backgroundColor: "#100d24"
              }}
            >
              <Box>
                <Button
                  sx={{
                    width: 200,
                    color: "white",
                    margin: 3,
                    marginLeft: 4,
                    backgroundColor: "#8477da",
                  }}
                  variant="contained"
                  onClick={Logout}
                >
                  Logout
                </Button>
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
                <div className="userInSidebar">
                  {decodedToken?.name}
                  <div className="emailUser">{decodedToken?.email}</div>
                </div>
              </div>
            </Box>
          </Box>
          {/* <List>
          <ListItem button onClick={toggleSidebar}>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button onClick={toggleSidebar}>
            <ListItemText primary="Item 2" />
          </ListItem>
          <ListItem button onClick={toggleSidebar}>
            <ListItemText primary="Item 3" />
          </ListItem>
        </List> */}
        </Drawer>

        <Backdrop
          open={isSidebarOpen}
          onClick={handleBackdropClick}
          className={classes.backdrop}
        />
      </div>
    </>
  );
}

export default MobileBar;
