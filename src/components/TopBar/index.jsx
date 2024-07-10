import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Avatar, Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AvatarImage from "../../Assets/HeaderAvatar.svg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationDrawer from "../Notification/NotificationDrawer";

function TopBar(props) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  return (
    <Box sx={{ display: "flex", pb: "75px" }}>
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
          <IconButton
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
                  minWidth:'18px',
                  height:'18px'
                },
              }}
            >
              <NotificationsNoneIcon sx={{ color: "#FFFF",fontSize:'1.8rem' }} />
            </Badge>
          </IconButton>
          <Avatar
            alt="Rems Sharp"
            src={AvatarImage}
            sx={{ height: "40px", width: "40px" }}
          />
        </Box>
        <NotificationDrawer state={state} toggleDrawer={toggleDrawer} />
      </AppBar>
    </Box>
  );
}

export default TopBar;
