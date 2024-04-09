import React, { useState } from "react";
import LayoutMeasurements from "../Estimates/layoutMeasurements";
import LayoutReview from "../Estimates/layoutReview";
import Estimates from "./estimates";
import CustomerTable from "./customerTable";
import StaffTable from "./staffTable";
import {
  getPageDesktopNavigation,
  getQuoteState,
} from "../../redux/estimateCalculations";
import Layout from "../Estimates/layouts";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import CustomLayout from "../CustomLayout/customLayout";
import ClientDetailsModel from "../Estimates/model";
import HardwareMissingAlert from "../Modal/hardwareMissingAlert";
const IndexMobile = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const [hardwareMissingAlert,setHardwareMissingAlert] = useState(false);
  // const handleClose = () => setClientDetailOpen(false);
  // const handleOpen = () => setClientDetailOpen(true);
  // const updatecheck = useSelector(getQuoteState);
  const Navigation = useSelector(getPageDesktopNavigation);
  const mobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Box
        sx={{
          backgroundColor: mobile ? "#100d24 !important" : "white",
          color: { xs: "white", sm: "black" },
        }}
      >
        {Navigation === "existing" && <Estimates />}
        {Navigation === "customerTable" && <CustomerTable />}
        {Navigation === "staffTable" && <StaffTable />}
        {Navigation === "layouts" && <Layout />}
        {Navigation === "measurements" && <LayoutMeasurements />}
        {Navigation === "review" && (
          <LayoutReview setClientDetailOpen={setClientDetailOpen} setHardwareMissingAlert={setHardwareMissingAlert}/>
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
        <HardwareMissingAlert
        open={hardwareMissingAlert}
        handleClose={() => setHardwareMissingAlert(false)}
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
