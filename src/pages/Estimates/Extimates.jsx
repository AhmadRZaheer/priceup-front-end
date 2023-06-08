import React from "react";
import "./customers.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import Index from "../../components/Extimates/Index";

const Extimates = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <Index />
      </div>
    </div>
  );
};

export default Extimates;
