import React from "react";
import TopBar from "../TopBar";
import CommonSideBar from "../CommonSideBar";
import { Box } from "@mui/material";

const CommonLayout = ({ children }) => {
  return (
    <>
      <TopBar />
      <Box style={{ display: "flex" }}>
        <CommonSideBar />

        {children}
      </Box>
    </>
  );
};

export default CommonLayout;
