import React from "react";
import { Box } from "@mui/material";
import CommonLayout from "@/components/CommonLayout";
import InvoiceDetails from "./InvoiceDetails";

const ProjectInvoiceDetail = () => {
  return (
      <CommonLayout>
        <Box className="econtent-wrapper" sx={{ overflow: "hidden" }}>
          <InvoiceDetails />
        </Box>
      </CommonLayout>
  );
};

export default ProjectInvoiceDetail;
