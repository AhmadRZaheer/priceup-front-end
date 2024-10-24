import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import TopBar from "@/components/TopBar";
import { useParams } from "react-router-dom";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import ProjectInfoComponent from "@/components/Projects/Info";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
import { useDispatch } from "react-redux";
import { setCustomerDetail } from "@/redux/estimateSlice";
const routePrefix = `${backendURL}/projects`;

const ProjectDetail = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const dispatch = useDispatch();
    const { id } = useParams();
    const decodedToken = getDecryptedToken();
    const { data: getProject, isSuccess , isLoading: getLoading, refetch } = useFetchSingleDocument(`${routePrefix}/${id}`);

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id])

    useEffect(()=>{
        if(getProject){
            dispatch(setCustomerDetail(getProject?.customerData))
        }
    },[isSuccess])

    return (
        <>
            {/* <TopBar />
            <div className="main-wrapper"> */}
            {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
            {/* <CommonSideBar/> */}
            <CommonLayout>
                <Box className="econtent-wrapper" >
                    {getLoading ? <Box sx={{ width: 'fit-content', margin: '100px auto', color: '#8477da' }}><CircularProgress /> </Box> : !getLoading && getProject ?
                        <ProjectInfoComponent projectData={getProject} projectState="edit" /> : <Typography>Invalid ID. No preview found.</Typography>
                    }
                </Box>
            </CommonLayout>
            {/* </div> */}
        </>
    );
};

export default ProjectDetail;
