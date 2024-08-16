import React from "react";
import "./glassType.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import GlassTypeTable from "../../components/GlassType/glassType";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
const GlassType = () => {
  return (
    <>
    {/* <TopBar/>
      <div className="Customers">
      {/* <Sidebar /> */}
    {/*  <CommonSideBar/> */}
    <CommonLayout>
      <div className="customersContainer">
        <GlassTypeTable />
      </div>
      </CommonLayout>
    {/* </div> */}
    </>
  
  );
};

export default GlassType;
