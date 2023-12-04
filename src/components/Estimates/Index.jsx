import { Box } from "@mui/material";
import React, { useState } from "react";
import ClientDetailsModel from "./model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./layoutReview";
import Layout from "./layouts";
import Snackbars from "../Modal/snackBar";
import { getPageDesktopNavigation } from "../../redux/estimateCalculations";
import { useDispatch, useSelector } from "react-redux";
import ExistingQuotes from "./existingQuotes";
import CustomLayout from "../CustomLayout/customLayout";
import { showSnackbar } from "../../redux/snackBarSlice";

const Index = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
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
          <LayoutReview setClientDetailOpen={setClientDetailOpen} />
        )}
        {Navigation === "custom" && <CustomLayout />}
      </Box>

      <ClientDetailsModel
        open={clientDetailOpen}
        handleCancel={() => setClientDetailOpen(false)}
      />
    </>
  );
};

export default Index;
