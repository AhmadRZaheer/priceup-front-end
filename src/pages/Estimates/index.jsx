import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import EstimatesList from "@/components/Estimates";

const Estimates = () => {
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <EstimatesList />        
      </div>
    </div>
  );
};

export default Estimates;
