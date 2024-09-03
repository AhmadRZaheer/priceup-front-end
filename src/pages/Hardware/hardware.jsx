import React from "react";
import "./hardware.scss";
import HardwareTable from "@/components/HardwareTable/hardwareTable";

import CommonLayout from "@/components/CommonLayout";
import { Box } from "@mui/material";
import ShowersHardWare from "@/components/Hardware";

const Hardware = () => {
  return (
    <>
      <CommonLayout>
      <div className="customersContainer">
        {/* <HardwareTable /> */}
        <Box className="econtent-wrapper" sx={{ px: { lg: '28px',sm:'20px', xs: '0px' } }}>
        <ShowersHardWare />
        </Box>
      </div>
      </CommonLayout>
    </>
    
  );
};

export default Hardware;
