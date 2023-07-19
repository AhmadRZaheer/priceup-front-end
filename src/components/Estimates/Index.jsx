import { Box } from "@mui/material";
import React, { useState } from "react";
import ClientDetailsModel from "./Model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./LayoutReview";
import Layout from "./Layouts";

import Snackbars from "../Model/SnackBar";

const Index = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const [StorePage, setStorePage] = useState("Layout");
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
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "white",
          height: "93.3vh",
          overflowY: "scroll",
          paddingY: 4,
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        {StorePage === "Layout" && <Layout setStorePage={setStorePage} />}
        {StorePage === "Measurments" && (
          <LayoutMeasurements setHandleEstimatesPages={setStorePage} />
        )}
        {StorePage === "review" && (        
          <LayoutReview setHandleEstimatesPages={setStorePage} setClientDetailOpen={setClientDetailOpen} />
        )}
      </Box>

      <ClientDetailsModel
        open={clientDetailOpen}
        handleCancel={() => setClientDetailOpen(false)}
        showSnackbar={showSnackbar}
      />
            <Snackbars
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnackbar={closeSnackbar}
      />
    </>
  );
};

export default Index;
