import React from "react";
import { Box } from "@mui/material";
import CommonLayout from "@/components/CommonLayout";
import CreateInvoice from "@/components/ProjectInvoices/CreateInvoice";

const CreateNewInvoice = () => {
  return (
    <>
      <CommonLayout>
        <Box className="econtent-wrapper" sx={{ px: { sm: 0, xs: 1 } }}>
          <CreateInvoice islanding={false}  />
        </Box>
      </CommonLayout>
    </>
  );
};

export default CreateNewInvoice;
