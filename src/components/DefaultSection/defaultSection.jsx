import React, { useState } from "react";
import "./hardwareTable.scss";
import { Box, Typography } from "@mui/material";
import DefaultComponent from "./defaultComponent";
import Snackbars from "../Modal/snackBar";
import { showSnackbar } from "../../redux/snackBarSlice";
import { useDispatch } from "react-redux";

const DefaultSection = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          // pt: 1,
        }}
      >
        <div className="page-title">
          <Typography sx={{ fontSize: 30, pl: 1 }}>Layouts</Typography>
        </div>

        <Box
          sx={{
            border: "1px solid rgb(232, 232, 232)",
            margin: "auto",
            paddingTop: 2,
            width: "98%",
            borderRadius: "8px",
          }}
        >
          <DefaultComponent />
        </Box>
      </Box>
    </>
  );
};
export default DefaultSection;
