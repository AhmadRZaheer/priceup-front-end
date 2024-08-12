import React from "react";
import "./customers.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import Customertable from "@/components/CustomerTable/customerTable";
import CustomerTableForStaffView from "@/components/Staff/Customers";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const Customers = () => {
  const decodedToken = getDecryptedToken();
  return (
    <>
    <TopBar/>
    <div className="Customers">
      {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
      <CommonSideBar />
      <div className="customersContainer">
        {decodedToken?.role === userRoles.STAFF ? <CustomerTableForStaffView /> : <Customertable />}
      </div>
    </div>
    </>
    
  );
};

export default Customers;
