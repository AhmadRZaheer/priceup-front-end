import React from "react";
import "./glassType.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import HardwareTable from "../../components/HardwareTable/HardwareTable";
import FinishesTable from "../../components/Finishes/FinishesTable";
import GlassTypeTable from "../../components/GlassType/glassType";
const GlassType = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <GlassTypeTable />
      </div>
    </div>
  );
};

export default GlassType;
