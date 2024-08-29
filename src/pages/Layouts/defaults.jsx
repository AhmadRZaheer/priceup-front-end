import React from "react";
import "./defaults.scss";

// import Sidebar from "../../components/Sidebar/sidebar";
// import DefaultSection from "../../components/DefaultSection/defaultSection";
// import TopBar from "@/components/TopBar";
// import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
import ShowerLayout from "@/components/ShowerLayout";
import { Box } from "@mui/material";

const Defaults = (Props) => {
  return (
    <>
      <CommonLayout>
        <Box className="defaultsConatiner">
          <ShowerLayout />
        </Box>
      </CommonLayout>
    </>
  );
};

export default Defaults;
