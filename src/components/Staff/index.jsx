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
import { Box } from "@mui/material";
import CustomLayout from "../CustomLayout/customLayout";
import ClientDetailsModel from "../Estimates/model";
const IndexMobile = () => {
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  // const handleClose = () => setClientDetailOpen(false);
  // const handleOpen = () => setClientDetailOpen(true);
  // const updatecheck = useSelector(getQuoteState);
  const Navigation = useSelector(getPageDesktopNavigation);

  return (
    <>
      <Box
        sx={{
          backgroundColor: { xs: "#100d24", sm: "white" },
          color: { xs: "white", sm: "black" },
        }}
      >
        {Navigation === "existing" && <Estimates />}
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
