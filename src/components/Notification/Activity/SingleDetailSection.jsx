import {
  Stack,
  Typography,
  Box,
  CardMedia,
  Divider,
  Checkbox,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import Tick from "@/Assets/Tick.svg";
import DetailNotification from "@/Assets/SingleDetailNotification.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DefaultImage from "@/components/ui-components/defaultImage";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import { backendURL, getLocaleDateTimeFromMongoTimestamp } from "@/utilities/common";
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

const SingleDetailSection = ({ selectedId, handleMoveToArchive, editLoading }) => {
  const { data: record, refetch: refetchRecord, isLoading: getLoading } =
    useFetchSingleDocument(`${backendURL}/notifications/${selectedId}`);
  useEffect(() => {
    refetchRecord();
  }, [selectedId]);
  const formattedDate = getLocaleDateTimeFromMongoTimestamp(record?.createdAt);
  console.log(record, 'record', formattedDate, selectedId);
  return (
    <Box  className='notification' sx={{ height: "78.5vh", overflowY: "auto" }}>
      {getLoading ? <Box sx={{ display: 'flex', height: 'inherit', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={32} sx={{ color: "#8477DA" }} />
      </Box> : !getLoading && record ?
        <Box>
          <Box sx={{ pt: 5, px: 12 }}>
            {!record?.archived ? <Stack direction="row" gap={0.5}>
              {editLoading ? <CircularProgress size={24} sx={{ color: "#8477DA" }} /> :
                <Checkbox
                  onClick={handleMoveToArchive}
                  sx={{
                    padding: "0px !important",
                    color: "rgba(0, 0, 0, 0.49)",
                    "&.Mui-checked": {
                      color: "rgba(0, 0, 0, 0.49)",
                    },
                  }}
                />}
              <Typography className="archText">Archive</Typography>
            </Stack> : ''}
            <CustomTypo title={formattedDate} sx={{ py: 1.3 }} />

            <Stack direction="row">
              <Typography
                className="todayText"
                sx={{
                  color: "#100D24 !important",
                }}
              >
                {record?.description}
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
              <Stack direction="row" gap={2.5}>
                <DefaultImage name={record.performer_name || "Chris Phillips"} />
                <Box>
                  <Box sx={{ pb: 2 }}>
                    <CustomTypo title={record.performer_name} />
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
                      title={formattedDate}
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
        </Box> : <Box sx={{ display: 'flex', height: 'inherit', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Typography >No data found. Try selecting item from list.</Typography>
        </Box>}
    </Box>
  );
};

export default SingleDetailSection;
