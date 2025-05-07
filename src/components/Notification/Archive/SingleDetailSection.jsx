import {
  Stack,
  Typography,
  Box,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";
import React from "react";
import Tick from "@/Assets/Tick.svg";
import DetailNotification from "@/Assets/SingleDetailNotification.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DefaultImage from "@/components/ui-components/defaultImage";
import '../style.scss';

const SummaryData = [
  { id: 1, title: "Finish", desc: "Polished Chrome" },
  { id: 2, title: "Handles", desc: "8 by 8 D-Pull" },
  { id: 3, title: "Hinges", desc: "STD Bevel" },
  { id: 4, title: "Finish", desc: "Polished Chrome" },
  { id: 5, title: "Handles", desc: "8 by 8 D-Pull" },
  { id: 6, title: "Hinges", desc: "STD Bevel" },
];
const CustomTypo = ({ title, sx }) => {
  return (
    <Typography
      className="estimateText"
      sx={{ color: "rgba(102, 112, 133, 0.76) !important", ...sx }}
    >
      {title}
    </Typography>
  );
};

const SingleDetailSection = () => {
  return (
    <Box  className='notification' sx={{ height: "78.5vh", overflowY: "auto" }}>
      <Box sx={{ pt: 5, px: 12 }}>
        <CustomTypo title="26/04/2024 12:48 AM" sx={{ py: 1.3 }} />

        <Stack direction="row">
          <Typography
            className="todayText"
            sx={{
              color: "#100D24 !important",
            }}
          >
            Estimate Updated Successfully
          </Typography>
          <img alt="not" src={Tick} />
        </Stack>
        <Box sx={{ py: 3 }}>
          <CardMedia
            component="img"
            image={DetailNotification}
            sx={{ width: "383.81px", height: "232.88px" }}
          />
        </Box>
        <Stack direction="row" gap={2} sx={{ px: 2 }}>
          <Box>
            <CustomTypo title="Creator Name:" sx={{ pb: 4.5 }} />
            <CustomTypo title="Customer Name:" sx={{ pb: 4.5 }} />
            <CustomTypo title="Date Quoted:" />
          </Box>
          <Stack direction="row" >
            <DefaultImage name='Chris Phillips' />
            <Box>
              <Box sx={{ pb: 2 }}>
                <CustomTypo title="Chris Phillips" />
                <CustomTypo
                  title="chrisp@gcs.glass"
                  sx={{ fontSize: "12.3px" }}
                />
              </Box>
              <Box sx={{ pb: 2 }}>
                <CustomTypo title="Nicholas De La Cruz" />
                <CustomTypo
                  title="dlcsbuilders@gmail.com"
                  sx={{ fontSize: "12.3px" }}
                />
              </Box>
              <Box sx={{ pb: 2 }}>
                <CustomTypo
                  title="Fri Apr 26 2024"
                  sx={{ fontSize: "12.3px" }}
                />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Divider sx={{ ml: 3 }} />
      <Box sx={{ py: 4, pl: 14, pr: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography className="twTxt">12’’/ 12’’/ 12’’</Typography>
          <Button
            variant="contained"
            startIcon={<EditOutlinedIcon />}
            className="estimatebtn"
            sx={{
              py: 1,
              ":hover": {
                background: "#8477DA",
              },
            }}
          >
            Edit Estimate
          </Button>
        </Stack>
        <Box>
          <Typography
            className="summaryTxt"
            sx={{
              py: 2,
            }}
          >
            Summary
          </Typography>
          <Stack direction="row" sx={{ flexDirection: "column", gap: "7px" }}>
            {SummaryData.map((data, index) => (
              <Typography className="summaryData">
                {data.title} : {data.desc}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleDetailSection;
