import React from "react";
import "./hardware.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import HardwareTable from "../../components/HardwareTable/hardwareTable";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const Hardware = () => {
  return (
    <>
    <TopBar/>
    <div className="Customers">
      {/* <Sidebar /> */}
      <CommonSideBar/>
      <div className="customersContainer">
        <HardwareTable />
      </div>
    </div>
    </>
    
  );
};

export default Hardware;
