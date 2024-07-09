import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack, Typography } from "@mui/material";
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
          <Stack sx={{ pt: 2, pb: 1, px: 2 }}>
            <Typography className="todayText">Today</Typography>
          </Stack>
          <Box
            sx={{
              height: "82vh",
              overflowY: "auto",
              mb: 8,
              "&::-webkit-scrollbar": {
                "-webkit-appearance": "none",
                width: "8px",
                background: "none",
                borderRadius: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "12px",
                backgroundColor: "#8477DA",
                height: "91px",
              },
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
