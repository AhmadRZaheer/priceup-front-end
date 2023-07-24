import React from "react";
import "./glassType.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
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
