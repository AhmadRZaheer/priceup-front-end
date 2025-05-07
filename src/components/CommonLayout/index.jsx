import React from "react";
import TopBar from "../TopBar";
import CommonSideBar from "../CommonSideBar";
import { Box } from "@mui/material";


const CommonLayout = ({ children }) => {
  return (
    <>
      <TopBar />
      <Box style={{  }}>
        <CommonSideBar />
        <Box sx={{py:4,px:'22px',ml:{sm:'296px',xs:'0px'}}}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default CommonLayout;
