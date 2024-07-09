import {
  Stack,
  Typography,
  Box,
  CardMedia,
  Checkbox,
  Divider,
  Button,
} from "@mui/material";
import React from "react";
import Tick from "../../../Assets/Tick.svg";
import DetailNotification from "../../../Assets/SingleDetailNotification.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const SummaryData = [
  { id: 1, title: "Finish", desc: "Polished Chrome" },
  { id: 2, title: "Handles", desc: "8 by 8 D-Pull" },
  { id: 3, title: "Hinges", desc: "STD Bevel" },
  { id: 4, title: "Finish", desc: "Polished Chrome" },
  { id: 5, title: "Handles", desc: "8 by 8 D-Pull" },
  { id: 6, title: "Hinges", desc: "STD Bevel" },
];

const SingleDetailSection = () => {
  return (
    <Box sx={{ height: "100vh", overflowY: "auto" }}>
      <Box sx={{ pt: 5, px: 12 }}>
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
          <Typography className="archText">Archive</Typography>
        </Stack>
        <Typography
          className="estimateText"
          sx={{ color: "rgba(102, 112, 133, 0.76) !important", py: 1.3 }}
        >
          26/04/2024 12:48 AM
        </Typography>
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
            <Typography
              className="estimateText"
              sx={{ color: "rgba(102, 112, 133, 0.76) !important", pb: 4.5 }}
            >
              Creator Name:
            </Typography>
            <Typography
              className="estimateText"
              sx={{ color: "rgba(102, 112, 133, 0.76) !important", pb: 4.5 }}
            >
              Customer Name:
            </Typography>
            <Typography
              className="estimateText"
              sx={{ color: "rgba(102, 112, 133, 0.76) !important" }}
            >
              Date Quoted:
            </Typography>
          </Box>
          <Stack direction="row" gap={2.5}>
            <Box
              className="cpWrapper"
              sx={{
                border: "none !important",
                background: "rgba(132, 119, 218, 0.14) !important",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16.3px",
                  fontWeight: 600,
                }}
              >
                CP
              </Typography>
            </Box>
            <Box>
              <Box sx={{ pb: 2 }}>
                <Typography
                  className="estimateText"
                  sx={{ color: "rgba(102, 112, 133, 0.76) !important" }}
                >
                  Chris Phillips
                </Typography>
                <Typography
                  className="estimateText"
                  sx={{
                    color: "rgba(102, 112, 133, 0.76) !important",
                    fontSize: "12.3px",
                  }}
                >
                  chrisp@gcs.glass
                </Typography>
              </Box>
              <Box sx={{ pb: 2 }}>
                <Typography
                  className="estimateText"
                  sx={{ color: "rgba(102, 112, 133, 0.76) !important" }}
                >
                  Nicholas De La Cruz
                </Typography>
                <Typography
                  className="estimateText"
                  sx={{
                    color: "rgba(102, 112, 133, 0.76) !important",
                    fontSize: "12.3px",
                  }}
                >
                  dlcsbuilders@gmail.com
                </Typography>
              </Box>
              <Box sx={{ pb: 2 }}>
                <Typography
                  className="estimateText"
                  sx={{ color: "rgba(102, 112, 133, 0.76) !important" }}
                >
                  Fri Apr 26 2024
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ py: 4, pl: 14, pr: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
          className='twTxt'
          >
            12’’/ 12’’/ 12’’
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditOutlinedIcon />}
            className='estimatebtn'
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
