import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import ProjectsList from "@/components/Projects";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { Box } from "@mui/material";
import TopBar from "@/components/TopBar";

const Projects = () => {
  const decodedToken = getDecryptedToken();
  return (
    <>
      <TopBar />
      <div className="main-wrapper">
        {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />}
        <Box className="econtent-wrapper" sx={{ pl: { sm: '45px', xs: '0px' } }}>
          <ProjectsList />
        </Box>
      </div>
    </>
  );
};

export default Projects;
