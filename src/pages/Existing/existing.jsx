import React from "react";
import "./existing.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import ExistingQuotes from "../../components/Estimates_dep/existingQuotes";
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