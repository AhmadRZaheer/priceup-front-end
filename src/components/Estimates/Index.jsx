import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ClientDetailsModel from "./Model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./LayoutReview";
import ExistingQuotes from "./existingQuotes";
import { NavLink } from "react-router-dom";
import Layout from "./Layouts";
import Summary from "./Summery";

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
      />
    </>
  );
};

export default Index;
