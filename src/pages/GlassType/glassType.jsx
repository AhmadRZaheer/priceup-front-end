import React from "react";
import "./glassType.scss";
import GlassTypeTable from "../../components/GlassType/glassType";
import CommonLayout from "@/components/CommonLayout";
import { Box } from "@mui/material";
const GlassType = () => {
  return (
    <>
      {/* <TopBar/>
      <div className="Customers">
      {/* <Sidebar /> */}
      {/*  <CommonSideBar/> */}
      <CommonLayout>
        <Box className="customersContainer" sx={{ px: { sm: 2, xs: 0 } }}>
          <GlassTypeTable />
        </Box>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default GlassType;
