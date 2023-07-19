import React from "react";
import "./addOns.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import AddOnsTable from "../../components/AddOns/AddOns";
const AddOns = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <AddOnsTable />
      </div>
    </div>
  );
};

export default AddOns;
