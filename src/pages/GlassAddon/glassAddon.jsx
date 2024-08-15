import React from "react";
import "./glassAddon.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import GlassAddonComponent from "../../components/GlassAddon";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";

const GlassAddon = () => {
  return (
    <>
      {/* <TopBar />
      <div className="Customers"> */}
        {/* <Sidebar /> */}
        {/* <CommonSideBar/> */}
        <CommonLayout>
        <div className="customersContainer">
          <GlassAddonComponent />
        </div>
        </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default GlassAddon;
