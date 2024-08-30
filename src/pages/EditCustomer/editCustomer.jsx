import React from "react";
import "./editCustomer.scss";
import Customertable from "@/components/CustomerTable/customerTable";
import CustomerTableForStaffView from "@/components/Staff/Customers";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import CommonLayout from "@/components/CommonLayout";
import { Box } from "@mui/material";
import EditCustomer from "@/components/EditCustomer";

const EidtCustomersPage = () => {
  //   const decodedToken = getDecryptedToken();
  return (
    <>
      {/* <TopBar/>
    <div className="Customers"> */}
      {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
      {/* <CommonSideBar /> */}
      <CommonLayout>
        <Box className="customersContainer" sx={{ px: { sm: 2, xs: 0 } }}>
          <EditCustomer />
        </Box>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default EidtCustomersPage;
