import React, { useState } from "react";
import Model from "./Model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./LayoutReview";
import Summary from "./Summary";
import ExitingQuotes from "./existingQuotes";
import { getPageNavigation } from "../../redux/estimateCalculations";
import Layout from "./layouts";
import { useSelector } from "react-redux";
import Snackbars from "../Model/SnackBar";
const IndexMobile = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const handleClose = () => setClientDetailOpen(false);
  const handleOpen = () => setClientDetailOpen(true);
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
      {Navigation == "existing" && <ExitingQuotes />}
      {Navigation == "layout" && <Layout />}
      {Navigation == "measurements" && <LayoutMeasurements />}
      {Navigation == "review" && <LayoutReview />}
      {Navigation == "summary" && <Summary handleOpen={handleOpen} />}

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
    </>
  );
};

export default IndexMobile;
