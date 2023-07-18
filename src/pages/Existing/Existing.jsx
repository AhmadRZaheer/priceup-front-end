import React from "react";
import "./Existing.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import ExistingQuotes from "../../components/Estimates/existingQuotes";
const Existing = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <ExistingQuotes />
      </div>
    </div>
  );
};

export default Existing;