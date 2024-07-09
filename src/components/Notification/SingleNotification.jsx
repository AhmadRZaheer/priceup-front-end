import React from "react";
import { Divider, Stack, Typography, Box } from "@mui/material";
import Tick from "../../Assets/Tick.svg";
import PersonIcon from "../../Assets/Persons.svg";
import "./style.scss";

const SingleNotification = ({ data,sx }) => {
  return (
    <>
      <Box
        sx={{
          py: 2.2,
          px: 2,
          ":hover": {
            background: "rgba(217, 217, 217, 0.39)",
          },
          ...sx
        }}
      >
        <Stack direction="row" gap={1} >
          <img alt="not" src={PersonIcon} />
          <Typography className="estimateText">Estimates</Typography>
        </Stack>
        <Stack direction="row" gap={1} sx={{ py: 1.5 }}>
          <img alt="not" src={Tick} />
          <Typography
            className="todayText"
            sx={{
              color: "#100D24 !important",
            }}
          >
            Estimate Updated Successfully
          </Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Box className="cpWrapper">
            <Typography
              sx={{
                fontSize: "16.3px",
                fontWeight: 600,
              }}
            >
              CP
            </Typography>
          </Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography
              className="estimateText"
              sx={{
                color: "#8477DA !important",
              }}
            >
              Chris Phillips{" "}
              <span
                style={{
                  fontWeight: `${300} !important`,
                  color: "#100D24",
                }}
              >
                updated an estimate
              </span>{" "}
              <span className="hourText">. 2h ago</span>
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider />
    </>
  );
};

export default SingleNotification;
