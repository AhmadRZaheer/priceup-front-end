import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Avatar, Badge, IconButton, Menu, MenuItem } from "@mui/material";
import AvatarImage from "../../Assets/HeaderAvatar.svg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationDrawer from "../Notification/NotificationDrawer";
import logout from "../../Assets/logout.svg";
import LagoutModal from "../Modal/logOut";
import { useDispatch } from "react-redux";
import { logoutHandler } from "@/redux/userAuth";
import DefaultImage from "../ui-components/defaultImage";
import { getDecryptedToken } from "@/utilities/common";
import NotificationButton from "../ui-components/NotificationButton";

function TopBar() {
  // const [state, setState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
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
    dispatch(logoutHandler());
    window.location.href = "/adminlogin";
  };

  return (
    <Box sx={{ display: {sm:"flex",xs:'none'}, pb: "75px" }}>
      <AppBar
        sx={{ background: "#100D24", boxShadow: "rgba(0, 0, 0, 0.18)", px: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "74px",
          }}
        >
          <NotificationButton  />
          {/* <IconButton
            aria-label="notification"
            onClick={toggleDrawer(!state)}
            sx={{
              background: "#8477DA",
              mr: 1,
              ":hover": {
                background: "#8477DA",
              },
            }}
          >
            <Badge
              badgeContent={10}
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
        <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
      </AppBar>
    </Box>
  );
}

export default TopBar;
