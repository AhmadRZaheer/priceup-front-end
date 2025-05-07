import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
// import AvatarImage from "../../Assets/HeaderAvatar.svg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationDrawer from "../Notification/NotificationDrawer";
import logout from "../../Assets/logout.svg";
import LagoutModal from "../Modal/logOut";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "@/redux/userAuth";
import DefaultImage from "../ui-components/defaultImage";
import { getDecryptedToken } from "@/utilities/common";
import NotificationButton from "../ui-components/NotificationButton";
import Logo from "../../Assets/Logo1.svg";

function TopBar() {
  // const [state, setState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const decodedToken = getDecryptedToken();
  //Notification Drawer
  // const toggleDrawer = (open) => (event) => {
  //   setState(open);
  // };
  //Profile DropDown
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(!open);
  };
  //logout
  const Logout = () => {
    setLoading(true)
    dispatch(logoutHandler());
    window.location.href = "/adminlogin";
  };

  return (
    <Box sx={{ display: { sm: "flex", xs: "none" }, pb: "69px" }}>
      <AppBar
        sx={{
          background: "#FFFFFF",
          boxShadow: "none",
          px: 2,
          zIndex: 1100,
          borderBottom: "1px solid #D1D4DB",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "69px",
          }}
        >
          <Box className="logoImg" sx={{minWidth:'279px', borderRight:'1px solid #EBECF0',  display: "flex",
            alignItems: "center",
            }}>
            <img src={Logo} alt=""  style={{height:'47px',width:'144px'}} />
          </Box>
          <Box sx={{display:'flex',alignSelf:'center'}}>
          <NotificationButton />
          {/* <IconButton
            aria-label="notification"
            onClick={toggleDrawer(!state)}
            sx={{
              background: state ? "#8477DA" : "transparent",
              mr: 1,
              ":hover": {
                background: "#8477DA",
              },
            }}
          >
            <Badge
              badgeContent={unReadCount}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  padding: "3px !important",
                  color: "#FFFF",
                  background: "#FF6174",
                  top: "6px",
                  right: "7px",
                  minWidth: "18px",
                  height: "18px",
                },
              }}
            >
              <NotificationsNoneIcon
                sx={{ color: "#FFFF", fontSize: "1.8rem" }}
              />
            </Badge>
          </IconButton> */}
          <IconButton
            id="basic-button"
            aria-controls={openDropDown ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDropDown ? "true" : undefined}
            onClick={handleClick}
          >
            {/* <Avatar
              alt="Rems Sharp"
              src={AvatarImage}
              sx={{ height: "40px", width: "40px" }}
            /> */}
            <DefaultImage
              image={decodedToken?.image}
              name={decodedToken?.name}
              type={3}
            />
          </IconButton>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openDropDown}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Box sx={{ pr: 1.5 }}>Logout</Box>
              <img src={logout} alt="image" />
            </MenuItem>
          </Menu>
        </Box>
        {/* <NotificationDrawer state={state} toggleDrawer={toggleDrawer} /> */}
        <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} loading={loading} />
      </AppBar>
    </Box>
  );
}

export default TopBar;
