import React, { useEffect, useState } from "react";
import "./hardwareTable.scss";

import { Box, Typography } from "@mui/material";

import DefaultComponent from "./DefaultComponent";

import Snackbars from "../Model/SnackBar";

const DefaultSection = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };
  return (
    <>
      <Box
        sx={{
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          pt: 2,
        }}
      >
        <div className="page-title">
          <Typography sx={{ fontSize: 30, pl: 1 }}>Default</Typography>
        </div>

        <Box
          sx={{
            border: "1px solid rgb(232, 232, 232)",
            margin: 2,
            paddingTop: 2,
          }}
        >
          <div className="hardwareTable">
            <div className="hardwareTable">
              <DefaultComponent showSnackbar={showSnackbar} />
            </div>
          </div>
        </Box>
        <Snackbars
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          closeSnackbar={closeSnackbar}
        />
      </Box>
    </>
  );
};
export default DefaultSection;
