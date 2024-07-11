import React from "react";
import "./glassType.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import GlassTypeTable from "../../components/GlassType/glassType";
import TopBar from "@/components/TopBar";
const GlassType = () => {
  return (
    <>
    <TopBar/>
      <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <GlassTypeTable />
      </div>
    </div>
    </>
  
  );
};

export default GlassType;
