import React from "react";
import { Divider, Stack, Typography, Box } from "@mui/material";
import Tick from "@/Assets/Tick.svg";
// import PersonIcon from "@/Assets/Persons.svg";
import CategoryIcon from '@mui/icons-material/Category';
import "./style.scss";
import DefaultImage from "@/components/ui-components/defaultImage";
import { getLocaleDateTimeFromMongoTimestamp } from "@/utilities/common";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Description } from "@mui/icons-material";
const SingleNotificationItem = ({ data, sx, handleItemClick, selectedId }) => {
  const formattedDate = getLocaleDateTimeFromMongoTimestamp(data.createdAt);
  const activeViewForThisRecord = data.archived ? 'Archive' : 'Activity';
  return (
    <>
      <Box
        onClick={() => handleItemClick(activeViewForThisRecord, data._id)}
        className='pointer'
        sx={{
          border: selectedId === data._id ? '2px solid #8477DA' : 'none',
          background: data.isRead ? "rgba(217, 217, 217, 0.39)" : "none",
          opacity: data.isRead ? 0.8 : 1,
          py: '7px',
          pr: 1.6,
          pl: '21px',
          ":hover": {
            background: "rgba(217, 217, 217, 0.39)",
          },
          ...sx,
        }}
      >

        <Stack direction="row" gap={2}>
          <Box sx={{ height: '10px', width: '10px', borderRadius: '4.94px', background: '#8477DA' , alignSelf:'center' }} />
          <Stack direction='column'>
            <Typography
              className={data.isRead ? "todayTextLight" : "todayText"}
              sx={{
                // color: data.isRead ? "#6e6e6e !important" : "#100D24 !important",
              }}
            >
              {data.description}
            </Typography>
            <Typography sx={{fontSize:'11px',fontWeight:400,lineHeight:'18px',color:'#6D6D6D'}}> {data.performer_name}{" "} . {data?.company_name} . {' '} {formattedDate}</Typography>
          </Stack>
        </Stack>

        {/* <Stack direction="row" gap={1}>
          <Stack direction="row" gap={0.2}>
            <Description sx={{ color: "#8477DA", width: '18px', height: '18px' }} />
            <Typography className="estimateText">{data.category}</Typography>
          </Stack>
          <Stack direction="row" gap={0.1}>
            <LocationOnIcon sx={{ color: "#8477DA", width: '20px', height: '20px' }} />
            <Typography className="estimateText">{data?.company_name}</Typography>
          </Stack>
        </Stack> */}

        {/* <Stack direction="row" gap={1} sx={{ py: 1, alignItems: "center" }}>
          <img alt="not" src={Tick} width={15} height={15} />
          <Typography
            className={data.isRead ? "todayTextLight" : "todayText"}
            sx={{
              color: data.isRead ? "#6e6e6e !important" : "#100D24 !important",
            }}
          >
            {data.description}
          </Typography>
        </Stack> */}
        {/* <Stack direction="row" sx={{ gap: '8px' }}>
          <DefaultImage name={data.performer_name || "Chris Phillips"} type={4} /> */}
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
        {/* <Stack direction="row" sx={{ alignItems: "center" }}>
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
                  textTransform: "lowercase"
                }}
              >
                {data.action} an {data.category.slice(0, -1)}
              </span>{" "}
              <span className="hourText">{formattedDate}</span>
            </Typography>
          </Stack>
        </Stack> */}
      </Box>
      {/* {divider && <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05),' }} />} */}
    </>
  );
};

export default SingleNotificationItem;
