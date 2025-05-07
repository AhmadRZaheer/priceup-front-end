import React from "react";
import "./customers.scss";
import Customertable from "@/components/CustomerTable/customerTable";
import CustomerTableForStaffView from "@/components/Staff/Customers";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import CommonLayout from "@/components/CommonLayout";
import { Box } from "@mui/material";

const Customers = () => {
  const decodedToken = getDecryptedToken();
  return (
    <>
      {/* <TopBar/>
    <div className="Customers"> */}
      {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
      {/* <CommonSideBar /> */}
      <CommonLayout>
        <Box className="customersContainer">
          {decodedToken?.role === userRoles.STAFF ? (
            <CustomerTableForStaffView />
          ) : (
            <Customertable />
          )}
        </Box>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default Customers;
