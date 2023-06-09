import React from "react";
import "./hardware.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import HardwareTable from "../../components/HardwareTable/HardwareTable";

const Hardware = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <HardwareTable />
      </div>
    </div>
  );
};

export default Hardware;
