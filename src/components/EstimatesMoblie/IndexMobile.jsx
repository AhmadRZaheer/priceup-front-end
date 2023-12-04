import React, { useState } from "react";
import Model from "./model";
import LayoutMeasurements from "../Estimates/layoutMeasurements";
import LayoutReview from "../Estimates/layoutReview";
import Summary from "./summary";
import ExitingQuotes from "./existingQuotes";
import CustomerTable from "./customerTable";
import StaffTable from "./staffTable";
import {
  getPageDesktopNavigation,
  getPageNavigation,
  getQuoteState,
} from "../../redux/estimateCalculations";
import Layout from "../Estimates/layouts";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";
import CustomLayout from "../CustomLayout/customLayout";
import ClientDetailsModel from "../Estimates/model";
const IndexMobile = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const handleClose = () => setClientDetailOpen(false);
  const handleOpen = () => setClientDetailOpen(true);
  const updatecheck = useSelector(getQuoteState);
  const Navigation = useSelector(getPageDesktopNavigation);

  return (
    <>
      <Box
        sx={{
          backgroundColor: { xs: "#100d24", sm: "white" },
          color: { xs: "white", sm: "black" },
          height: "100vh",
        }}
      >
        {Navigation === "existing" && <ExitingQuotes />}
        {Navigation === "customerTable" && <CustomerTable />}
        {Navigation === "staffTable" && <StaffTable />}
        {Navigation === "layouts" && <Layout />}
        {Navigation === "measurements" && <LayoutMeasurements />}
        {Navigation === "review" && (
          <LayoutReview setClientDetailOpen={setClientDetailOpen} />
        )}
        {/* {Navigation === "summary" ? (
          ["create", "custom"].includes(updatecheck) ? (
            <Summary handleOpen={handleOpen} />
          ) : (
            <Summary /> // Render Summary without handleOpen
          )
        ) : null} */}
        {Navigation === "custom" && <CustomLayout />}

        <ClientDetailsModel
          open={clientDetailOpen}
          handleCancel={() => setClientDetailOpen(false)}
        />
        {/* <Model
          open={clientDetailOpen}
          handleCancel={handleClose}
          showSnackbar={showSnackbar}
        /> */}
      </Box>
    </>
  );
};

export default IndexMobile;
