import { Badge, Box, Grid, Typography, Stack ,Button} from "@mui/material";
import React, { useState } from "react";
import TopBar from "../TopBar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TabButton from "@/components/ui-components/TabButton";
import NotificationSection from "./NotificationDetail/Activity/NotificationSection";
import NotificationArchiveSection from "./NotificationDetail/Archive/NotificationSection";
import SingleDetailSection from "./NotificationDetail/Activity/SingleDetailSection";
import SingleDetailArchiveSection from "./NotificationDetail/Archive/SingleDetailSection";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./style.scss";

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
      {/* <TopBar /> */}
      <Grid sx={{ pt: 3, pb: 2, background: "#FFFFFF", px: 4 }}>
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
      </Grid>
      <Stack direction='row' sx={{ borderBottom: "1px solid #D9D9D9", px: 4 ,justifyContent:'space-between'}}>
       <Stack direction='row'>
        {tabData.map((data, index) => (
          <TabButton
            key={index}
            title={data.title}
            onClick={() => tabHandleClick(data.title)}
            selected={data.title === selected ? true : false}
            sx={{ mr: 3 }}
          />
        ))}
        </Stack> 
        <Button
            variant="contained"
            startIcon={<DeleteOutlineOutlinedIcon />}
            className="estimatebtn"
            sx={{
              py: 1,
              ":hover": {
                background: "#8477DA",
              },
            }}
          >
            Delete
          </Button>
      </Stack>
      {selected === "Activity" ? (
        <Grid container>
          <Grid item xs={6}>
            <NotificationSection />
          </Grid>
          <Grid item xs={6}>
            <SingleDetailSection />
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={6}>
            <NotificationArchiveSection />
          </Grid>
          <Grid item xs={6}>
            <SingleDetailArchiveSection />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Notifications;
