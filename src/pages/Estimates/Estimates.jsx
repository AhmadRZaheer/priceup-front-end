import React from "react";
import "./customers.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import Index from "../../components/ExtimatesMoblie/Index";
import MobileNavBar from "../../components/MobileNavBar/MobleNavBar";
// import Index from "../../components/Estimates/Index";

const Estimates = () => {
  return (
    <div className="Customers">
      {/* <Sidebar /> */}
      <MobileNavBar />
      <div className="customersContainer">
        {/* <Index /> */}
        <Index />
      </div>
    </div>
  );
};

export default Estimates;
