import React from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { Box, useMediaQuery } from "@mui/material";
import TopBar from "@/components/TopBar";
import ProjectInfoComponent from "@/components/Projects/Info";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";

const ProjectCreate = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const decodedToken = getDecryptedToken();
  return (
    <>
      {/* <TopBar />
            <div className="main-wrapper"> */}
      {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
      {/* <CommonSideBar /> */}
      <CommonLayout>
        <Box className="econtent-wrapper" sx={{ px: { sm: 0, xs: 1 } }}>
          <ProjectInfoComponent />
        </Box>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default ProjectCreate;
