import React from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { Box, useMediaQuery } from "@mui/material";
import TopBar from "@/components/TopBar";
import ProjectInfoComponent from "@/components/Projects/Info";

const ProjectCreate = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const decodedToken = getDecryptedToken();
    return (
        <>
            <TopBar />
            <div className="main-wrapper">
                {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />}
                <Box className="econtent-wrapper" sx={{ pr: { sm: 2, xs: 1 },pl:{ sm: 4, xs: 1 } }}>
                    <ProjectInfoComponent />
                </Box>
            </div>
        </>
    );
};

export default ProjectCreate;
