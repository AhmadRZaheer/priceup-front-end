import { Badge, Box, Grid, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import TopBar from "../TopBar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TabButton from "@/components/ui-components/TabButton";
const tabData = [
  { id: 1, title: "Activity" },
  { id: 2, title: "Archive" },
];

const Notifications = () => {
  const [selected, setSelected] = useState("Activity");
  const tabHandleClick = (data) => {
    setSelected(data);
  };
  return (
    <Box>
      <TopBar />
      <Grid sx={{ py: 4, background: "#FFFFFF", px: 4 }}>
        <Stack direction="row" gap={1}>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 500,
              lineHeight: "38px",
              color: "#101828",
            }}
          >
            Notifications
          </Typography>
          <Box sx={{ alignContent: "center" }}>
            <Badge
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  minWidth: "6px",
                  height: "6px",
                  background: "#FF6174",
                  top: "2px",
                  right: "6px",
                },
              }}
            >
              <NotificationsNoneIcon />
            </Badge>
          </Box>
        </Stack>
        <Box>
          {tabData.map((data, index) => (
            <TabButton
              key={index}
              title={data.title}
              onClick={() => tabHandleClick(data.title)}
              selected={data.title === selected ? true : false}
              sx={{ mr: 3 }}
            />
          ))}
        </Box>
      </Grid>
    </Box>
  );
};

export default Notifications;
