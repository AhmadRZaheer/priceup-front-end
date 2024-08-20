import { Badge, IconButton } from "@mui/material";
import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationDrawer from "../Notification/NotificationDrawer";
import { getUnreadCount } from "@/redux/notificationsSlice";
import { useSelector } from "react-redux";

const NotificationButton = () => {
  const unReadCount = useSelector(getUnreadCount);
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
          // background: state ? "#8477DA" : "transparent",
          mr: 1,
          p:'12px',
          ":hover": {
            ".notificationIcon": {
              color: "#8477DA",
            },
            // background: "#8477DA",
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
            className="notificationIcon"
            sx={{
              color: state ? "#8477DA" : "#5D6164",
              fontSize: "1.8rem",
              // ":hover": {
              //   color: "#8477DA",
              // },
            }}
          />
        </Badge>
      </IconButton>
      <NotificationDrawer state={state} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default NotificationButton;
