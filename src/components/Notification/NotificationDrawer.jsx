import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack, Typography,Checkbox } from "@mui/material";
import SingleNotification from "./SingleNotification";
import "./style.scss";

export default function NotificationDrawer({ state, toggleDrawer }) {
  return (
    <div>
      <SwipeableDrawer
        className="customModel"
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            top: "75px",
          },
          "& .MuiModal-backdrop": {
            top: "74px",
            left: "320px",
          },
        }}
      >
        <Box
          className="customModel"
          sx={{ width: { sm: "496px", xs: "100%" } }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", px: 2, mt: 5 }}
          >
            <Stack direction="row" gap={1}>
              <Typography className="notificationText">
                Notifications
              </Typography>
              <Box sx={{ alignContent: "center" }}>
                <NotificationsNoneIcon />
              </Box>
            </Stack>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon className="closeIcon" />
            </IconButton>
          </Stack>
          <Stack direction="row" sx={{ pt: 2, pb: 1, px: 2,justifyContent:'space-between' }}>
            <Typography className="todayText">Today</Typography>
            <Stack direction="row" gap={0.5}>
          <Checkbox
            sx={{
              padding: "0px !important",
              color: "rgba(0, 0, 0, 0.49)",
              "&.Mui-checked": {
                color: "rgba(0, 0, 0, 0.49)",
              },
            }}
          />
          <Typography className="archText">Mark all as read</Typography>
        </Stack>
          </Stack>
          <Box
            className="drawerContainer"
            sx={{
              mb: 8,
            }}
          >
            {Array.from({ length: 20 }).map((data, index) => (
              <SingleNotification data={data} key={index} />
            ))}
          </Box>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
