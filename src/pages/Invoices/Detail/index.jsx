import React from "react";
import { backendURL } from "@/utilities/common";
import { Box } from "@mui/material";
import CommonLayout from "@/components/CommonLayout";
import InvoiceDetails from "./InvoiceDetails";

const ProjectInvoiceDetail = () => {

    return (
        <>
            <CommonLayout>
                <Box className="econtent-wrapper" sx={{ overflow: 'hidden' }} >
                    {/* {getLoading ? <Box sx={{ width: 'fit-content', margin: '100px auto', color: '#8477da' }}><CircularProgress /> </Box> : !getLoading && getProject ?
                        <ProjectInvoiceComponent projectData={getProject} projectState="edit" /> : <Typography>Invalid ID. No preview found.</Typography>
                    } */}
                    <InvoiceDetails />
                </Box>
            </CommonLayout>
        </>
    );
};

export default ProjectInvoiceDetail;
