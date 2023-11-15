import React, { useState } from "react";
import Model from "./model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./layoutReview";
import Summary from "./summary";
import ExitingQuotes from "./existingQuotes";
import CustomerTable from "./customerTable";
import StaffTable from "./staffTable";
import {
  getPageNavigation,
  getQuoteState,
} from "../../redux/estimateCalculations";
import Layout from "./layouts";
import { useSelector } from "react-redux";
import Snackbars from "../Modal/snackBar";
import { Box } from "@mui/material";
import CustomLayout from "../CustomLayout/customLayout";
const IndexMobile = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const handleClose = () => setClientDetailOpen(false);
  const handleOpen = () => setClientDetailOpen(true);
  const updatecheck = useSelector(getQuoteState);
  const Navigation = useSelector(getPageNavigation);
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
      <Box sx={{ backgroundColor: "black" }}>
        {Navigation === "existing" && <ExitingQuotes />}
        {Navigation === "customerTable" && <CustomerTable />}
        {Navigation === "staffTable" && <StaffTable />}
        {Navigation === "layouts" && <Layout />}
        {Navigation === "measurements" && <LayoutMeasurements />}
        {Navigation === "review" && <LayoutReview />}
        {Navigation === "summary" ? (
          ["create", "custom"].includes(updatecheck) ? (
            <Summary handleOpen={handleOpen} />
          ) : (
            <Summary /> // Render Summary without handleOpen
          )
        ) : null}
        {Navigation === "custom" && <CustomLayout />}

        <Model
          open={clientDetailOpen}
          handleCancel={handleClose}
          showSnackbar={showSnackbar}
        />
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

export default IndexMobile;
