import { Box } from "@mui/material";
import React, { useState } from "react";
import ClientDetailsModel from "./model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./layoutReview";
import Layout from "./layouts";
import { getPageDesktopNavigation } from "../../redux/estimateCalculations";
import { useSelector } from "react-redux";
import ExistingQuotes from "./existingQuotes";
import CustomLayout from "../CustomLayout/customLayout";
import HardwareMissingAlert from "../Modal/hardwareMissingAlert";

const Index = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const [hardwareMissingAlert,setHardwareMissingAlert] = useState(false);
  const Navigation = useSelector(getPageDesktopNavigation);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "white",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        {Navigation === "existing" && <ExistingQuotes />}
        {Navigation === "layouts" && <Layout />}
        {Navigation === "measurements" && <LayoutMeasurements />}
        {Navigation === "review" && (
          <LayoutReview setClientDetailOpen={setClientDetailOpen} setHardwareMissingAlert={setHardwareMissingAlert} />
        )}
        {Navigation === "custom" && <CustomLayout />}
      </Box>

      <ClientDetailsModel
        open={clientDetailOpen}
        handleCancel={() => setClientDetailOpen(false)}
      />
      <HardwareMissingAlert
        open={hardwareMissingAlert}
        handleClose={() => setHardwareMissingAlert(false)}
      />
    </>
  );
};

export default Index;
