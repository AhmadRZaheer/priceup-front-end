import React from "react";
import "./glassAddon.scss";
import GlassAddonComponent from "../../components/GlassAddon";
import CommonLayout from "@/components/CommonLayout";
import { Box } from "@mui/material";

const GlassAddon = () => {
  return (
    <>
      {/* <TopBar />
      <div className="Customers"> */}
      {/* <Sidebar /> */}
      {/* <CommonSideBar/> */}
      <CommonLayout>
        <Box className="customersContainer" sx={{ px: { md: 2, xs: 0 } }}>
          <GlassAddonComponent />
        </Box>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default GlassAddon;
