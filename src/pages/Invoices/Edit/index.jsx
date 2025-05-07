import React from "react";
import { Box } from "@mui/material";
import CommonLayout from "@/components/CommonLayout";
import EditQuoteInvoice from "@/components/ProjectInvoices/CreateEditInvoice/EditQuotePage";

const ProjectInvoiceEdit = () => {
  return (
    <>
      <CommonLayout>
        <Box className="econtent-wrapper" sx={{ px: { sm: 0, xs: 1 } }}>
          <EditQuoteInvoice />
        </Box>
      </CommonLayout>
    </>
  );
};

export default ProjectInvoiceEdit;
