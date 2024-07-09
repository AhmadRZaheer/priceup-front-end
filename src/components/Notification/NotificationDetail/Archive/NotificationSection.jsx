import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import SingleNotification from "../../SingleNotification";

const NotificationSection = () => {
  return (
    <Box>
      <Box
        sx={{
          height: "78.5vh",
          overflowY: "auto",
          pr: 3,
          "&::-webkit-scrollbar": {
            "-webkit-appearance": "none",
            width: "12px",
            background: "#F1F1F1",
            borderRadius: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "12px",
            backgroundColor: "rgba(119, 117, 131, 0.51)",
            height: "126px",
          },
        }}
      >
        <Box>
          <Stack sx={{ pt: 3, pb: 1, px: 4 }}>
            <Typography className="todayText">Today</Typography>
          </Stack>
          <Divider />
          {Array.from({ length: 2 }).map((data, index) => (
            <SingleNotification data={data} key={index} sx={{px:'32px !important'}} />
          ))}
        </Box>
        <Box>
          <Stack sx={{ pt: 3, pb: 1, px: 4 }}>
            <Typography className="todayText">Earlier</Typography>
          </Stack>
          <Divider />
          {Array.from({ length: 20 }).map((data, index) => (
            <SingleNotification data={data} key={index} sx={{px:'32px !important'}} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationSection;
