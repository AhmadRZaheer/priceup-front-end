import React from "react";
import "./glassType.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import GlassTypeTable from "../../components/GlassType/glassType";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
const GlassType = () => {
  return (
    <>
    <TopBar/>
      <div className="Customers">
      {/* <Sidebar /> */}
      <CommonSideBar/>
      <div className="customersContainer">
        <GlassTypeTable />
      </div>
    </div>
    </>
  
  );
};

export default GlassType;
