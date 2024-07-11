import { Box } from "@mui/material";
import React from "react";
import CustomAdminsTable from "../../components/CustomAdminsTable/customAdminsTable";
import AdminSidebar from "../../components/CustomAdmin_SideBar/adminSideBar";
import TopBar from "@/components/TopBar";

const CustomAdminPage = () => {
  return (
    <Box sx={{ display: "flex", width: "100%", backgroundColor: "black" }}>
      <AdminSidebar />
      <TopBar/>
      <Box sx={{width: '100%'}}>
        <CustomAdminsTable />
      </Box>
    </Box>
  );
};

export default CustomAdminPage;
