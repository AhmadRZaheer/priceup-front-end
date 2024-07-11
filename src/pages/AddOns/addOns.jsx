import React from "react";
import "./addOns.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import AddOnsTable from "../../components/AddOns/addOns";
import TopBar from "@/components/TopBar";
const AddOns = () => {
  return (
    <>
    <TopBar/>
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <AddOnsTable />
      </div>
    </div>
    </>
    
  );
};

export default AddOns;
