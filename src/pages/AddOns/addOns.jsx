import React from "react";
import "./addOns.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import AddOnsTable from "../../components/AddOns/addOns";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
const AddOns = () => {
  return (
    <>
    <TopBar/>
    <div className="Customers">
      {/* <Sidebar /> */}
      <CommonSideBar/>
      <div className="customersContainer">
        <AddOnsTable />
      </div>
    </div>
    </>
    
  );
};

export default AddOns;
