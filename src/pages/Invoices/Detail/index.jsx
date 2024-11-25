import React, { useEffect } from "react";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import CommonLayout from "@/components/CommonLayout";
import { useDispatch } from "react-redux";
import { setCustomerDetail } from "@/redux/estimateSlice";
import ProjectInvoiceComponent from "@/components/ProjectInvoices/CreateEditInvoice";
const routePrefix = `${backendURL}/projects`;

const ProjectInvoiceDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
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
            <CommonLayout>
                <Box className="econtent-wrapper" sx={{overflow:'hidden'}} >
                    {getLoading ? <Box sx={{ width: 'fit-content', margin: '100px auto', color: '#8477da' }}><CircularProgress /> </Box> : !getLoading && getProject ?
                        <ProjectInvoiceComponent projectData={getProject} projectState="edit" /> : <Typography>Invalid ID. No preview found.</Typography>
                    }
                </Box>
            </CommonLayout>
        </>
    );
};

export default ProjectInvoiceDetail;
