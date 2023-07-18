import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ClientDetailsModel from "./Model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./LayoutReview";
import ExistingQuotes from "./existingQuotes";
import { NavLink } from "react-router-dom";
import Layout from "./Layouts";
import Summary from "./Summery";
import Snackbars from "../Model/SnackBar";
import { getPageNavigation } from "../../redux/estimateCalculations";
import { useSelector } from "react-redux";

const Index = () => {
  const boxStyles = {
    minHeight: "182px",
    minWidth: "180px",
    margin: "auto",
    borderRadius: "12px",
    boxShadow:
      "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
    border: "1px solid #EAECF0",
    p: 2,
    background: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    flexDirection: "column",
    cursor: "pointer",
  };
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const [layoutMeasurementsOpen, SetlayoutMeasurementsOpen] = useState(true);
  const [StorePage, setStorePage] = useState("Layout");
  const handleClose = () => setClientDetailOpen(false);
  const handleOpen = () => setClientDetailOpen(true);
  const Navigation = useSelector(getPageNavigation);
  console.log(Navigation, "Navigation ");
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
        SetlayoutMeasurementsOpen={SetlayoutMeasurementsOpen}
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
