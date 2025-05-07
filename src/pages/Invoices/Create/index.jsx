import React from "react";
import { Box } from "@mui/material";
import CommonLayout from "@/components/CommonLayout";
import ProjectInvoiceComponent from "@/components/ProjectInvoices/CreateEditInvoice";

const ProjectInvoiceCreate = () => {
  return (
    <>
      <CommonLayout>
        <Box className="econtent-wrapper" sx={{ px: { sm: 0, xs: 1 } }}>
          <ProjectInvoiceComponent />
        </Box>
      </CommonLayout>
    </>
  );
};

export default ProjectInvoiceCreate;
