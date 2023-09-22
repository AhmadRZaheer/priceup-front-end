import { Box } from "@mui/material";
import React, { useState } from "react";
import ClientDetailsModel from "./model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./layoutReview";
import Layout from "./layouts";
import Snackbars from "../Modal/snackBar";
import { getPageDesktopNavigation } from "../../redux/estimateCalculations";
import { useSelector } from "react-redux";
import ExistingQuotes from "./existingQuotes";
import CustomLayout from "../CustomLayout/customLayout";

const Index = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const Navigation = useSelector(getPageDesktopNavigation);
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
          height: "100vh",
          overflowY: "scroll",
        }}
      >{Navigation === "existing" && <ExistingQuotes />}
        {Navigation === "layouts" && <Layout  />}
        {Navigation === "Measurments" && (
          <LayoutMeasurements  />
        )}
        {Navigation === "review" && (        
          <LayoutReview setClientDetailOpen={setClientDetailOpen} />
        )}
        {Navigation === "custom" && (        
          <CustomLayout />
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
