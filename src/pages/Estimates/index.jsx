import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import EstimatesList from "@/components/Estimates";
import EstimatesListMobile from "@/components/Estimates/existingListMobile";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { Box, useMediaQuery } from "@mui/material";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const Estimates = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const decodedToken = getDecryptedToken();
  return (
    <>
    <TopBar />
    <div className="main-wrapper">
      {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
      <CommonSideBar />
      <Box className="econtent-wrapper" sx={{pl:{sm:'25px',xs:'0px'}}}>
        {isMobile && decodedToken?.role === userRoles.STAFF ? <EstimatesListMobile /> : <EstimatesList />}
      </Box>
    </div>
    </>
  );
};

export default Estimates;
