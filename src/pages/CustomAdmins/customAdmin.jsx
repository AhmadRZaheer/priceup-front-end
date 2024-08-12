import { Box } from "@mui/material";
import React from "react";
import CustomAdminsTable from "../../components/CustomAdminsTable/customAdminsTable";
import AdminSidebar from "../../components/CustomAdmin_SideBar/adminSideBar";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const CustomAdminPage = () => {
  return (
    <Box sx={{ display: "flex", width: "100%", }}>
      {/* <AdminSidebar /> */}
      <CommonSideBar />
      <TopBar/>
      <Box sx={{width: '100%'}}>
        <CustomAdminsTable />
      </Box>
    </Box>
  );
};

export default CustomAdminPage;
