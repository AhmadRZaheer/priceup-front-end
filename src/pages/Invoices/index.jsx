import React from "react";
import { Box } from "@mui/material";
import CommonLayout from "@/components/CommonLayout";
import ProjectInvoices from "@/components/ProjectInvoices";

const Invoices = () => {
  return (
    <>
      <CommonLayout>
        <Box className="econtent-wrapper">
          <ProjectInvoices />
        </Box>
      </CommonLayout>
    </>
  );
};

export default Invoices;
