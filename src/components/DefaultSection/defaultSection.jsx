import React from "react";
import "./hardwareTable.scss";
import { Box, Typography } from "@mui/material";
import DefaultComponent from "./defaultComponent";

const DefaultSection = () => {
  return (
    <>
    <Box
        sx={{
          backgroundColor: {sm:"#F6F5FF",xs:'#FFFFFF'},
          height: "84vh",        
        }}
      >
      <div className="lpage-title">
        <Typography sx={{ fontSize: 30, pl: 1 }}>Layouts</Typography>
      </div>
      <Box
        sx={{
          border: "1px solid rgb(232, 232, 232)",
          margin: "auto",
          paddingTop: 2,
          width: "96%",
          borderRadius: "8px",
          overflow: "hidden",
          background:'#FFFF',
          mb: 2
        }}
      >
        <DefaultComponent />
      </Box>
      </Box>
    </>
  );
};
export default DefaultSection;
