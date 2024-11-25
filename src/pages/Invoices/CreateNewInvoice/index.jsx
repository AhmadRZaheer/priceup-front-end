import React from "react";
import { Box } from "@mui/material";
import CommonLayout from "@/components/CommonLayout";
import CreateLandingInvoice from "@/components/ProjectInvoices/CreateLandingInvoice";

const CreateNewInvoice = () => {
  return (
    <>
      <CommonLayout>
        <Box className="econtent-wrapper" sx={{ px: { sm: 0, xs: 1 } }}>
          <CreateLandingInvoice />
        </Box>
      </CommonLayout>
    </>
  );
};

export default CreateNewInvoice;
