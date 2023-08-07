import React from "react";
import "./customers.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import Index from "../../components/Estimates/Index";

const Estimates = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <Index />
        
      </div>
    </div>
  );
};

export default Estimates;
