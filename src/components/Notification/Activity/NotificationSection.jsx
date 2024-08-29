import React, { useMemo } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import SingleNotificationItem from "../SingleNotificationItem";

const NotificationSection = ({ list, handleItemClick, selectedId }) => {
  const readList = useMemo(() => {
    const nitification = list?.filter((data)=> data?.isRead === true);
    return list ? nitification : [];
  }, [list]);
  const unReadList = useMemo(() => {
    const nitification = list?.filter((data)=> data?.isRead === false);
    return list ? nitification : [];
  }, [list]);

  return (
    <Box>
      <Box
      className='notification'
        sx={{
          height: "80.5vh",
          overflowY: "auto",
          pr: 0.1,
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
        {/* <Box>
          <Stack sx={{ pt: 3, pb: 1, px: 4 }}>
            <Typography className="todayText">Today</Typography>
          </Stack>
          <Divider />
          {list.map((data, index) => (
            <SingleNotificationItem data={data} key={index} sx={{ px: '32px !important' }} handleItemClick={handleItemClick} selectedId={selectedId} />
          ))}
        </Box> */}
        <Box>
          {/* <Stack sx={{ pt: 3, pb: 1, px: 2.5 }}>
            <Typography className="todayText" sx={{color:'#8477DA'}}>Earlier</Typography>
          </Stack> */}
           <Box sx={{borderTop:'1px solid rgba(0, 0, 0, 0.05)',background:'rgba(0, 0, 0, 0.02)',p:'21px'}}>
              <Typography className="timeText" >New for you</Typography>
            </Box>
          {/* <Divider /> */}
          {unReadList.map((data, index) => (
            <SingleNotificationItem data={data} key={index}  sx={{ px: '16px !important' }} handleItemClick={handleItemClick} selectedId={selectedId} />
          ))}
        </Box>
        <Box>
           <Box sx={{borderTop:'1px solid rgba(0, 0, 0, 0.05)',background:'rgba(0, 0, 0, 0.02)',p:'21px' ,mt:2}}>
              <Typography className="timeText" >Earlier</Typography>
            </Box>
          {readList.map((data, index) => (
            <SingleNotificationItem data={data} key={index}  sx={{ px: '16px !important' }} handleItemClick={handleItemClick} selectedId={selectedId} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationSection;
