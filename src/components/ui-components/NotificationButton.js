import { Badge, IconButton } from "@mui/material";
import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationDrawer from "../Notification/NotificationDrawer";

const NotificationButton = () => {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  return (
    <>
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
              minWidth: "18px",
              height: "18px",
            },
          }}
        >
          <NotificationsNoneIcon sx={{ color: "#FFFF", fontSize: "1.8rem" }} />
        </Badge>
      </IconButton>
      <NotificationDrawer state={state} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default NotificationButton;
