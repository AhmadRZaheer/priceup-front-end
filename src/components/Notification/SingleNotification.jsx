import React from "react";
import { Divider, Stack, Typography, Box } from "@mui/material";
import Tick from "../../Assets/Tick.svg";
import PersonIcon from "../../Assets/Persons.svg";
import "./style.scss";
import DefaultImage from "../ui-components/defaultImage";
import { useNavigate } from "react-router-dom";

const SingleNotification = ({ data, sx }) => {
  const date = new Date(data.createdAt);

  // Define options for date and time formatting
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // Use 12-hour clock format
  };

  // Format the date and time
  const formattedDate = date.toLocaleString('en-US', options);
  const navigate = useNavigate();
  return (
    <>
      <Box
        onClick={() => navigate(`/notification?id=${data._id}`)}
        className='pointer'
        sx={{
          background: data.isRead ? "rgba(217, 217, 217, 0.39)" : "none",
          opacity: data.isRead ? 0.8 : 1,
          py: 1.6,
          px: 1.6,
          ":hover": {
            background: "rgba(217, 217, 217, 0.39)",
          },
          ...sx,
        }}
      >
        <Stack direction="row" gap={1}>
          <img alt="not" src={PersonIcon} />
          <Typography className="estimateText">{data.category}</Typography>
        </Stack>
        <Stack direction="row" gap={1} sx={{ py: 1, alignItems: "center" }}>
          <img alt="not" src={Tick} width={15} height={15} />
          <Typography
            className={data.isRead ? "todayTextLight" : "todayText"}
            sx={{
              color: data.isRead ? "#6e6e6e !important" : "#100D24 !important",
            }}
          >
            {data.description}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ gap: '8px' }}>
          <DefaultImage name={data.performer_name || "Chris Phillips"} type={4} />
          {/* <Box className="cpWrapper">
            <Typography
              sx={{
                fontSize: "16.3px",
                fontWeight: 600,
              }}
            >
              CP
            </Typography>
          </Box> */}
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography
              className="estimateText"
              sx={{
                color: "#8477DA !important",
              }}
            >
              {data.performer_name}{" "}
              <span
                style={{
                  fontWeight: `${300} !important`,
                  color: data.isRead ? "#6e6e6e " : "rgb(16, 13, 36)",
                  textTransform:"lowercase"
                }}
              >
                {data.action} an {data.category.slice(0, -1)}
              </span>{" "}
              <span className="hourText">{formattedDate}</span>
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider />
    </>
  );
};

export default SingleNotification;
