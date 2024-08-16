import React from "react";
import "./hardware.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import HardwareTable from "../../components/HardwareTable/hardwareTable";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";

const Hardware = () => {
  return (
    <>
    {/* <TopBar/>
    <div className="Customers"> */}
      {/* <Sidebar /> */}
      {/* <CommonSideBar/> */}
      <CommonLayout>
      <div className="customersContainer">
        <HardwareTable />
      </div>
      </CommonLayout>
      
    {/* </div> */}
    </>
    
  );
};

export default Hardware;
