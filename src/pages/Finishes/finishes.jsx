import React from "react";
import "./hardware.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import FinishesTable from "../../components/Finishes/finishesTable";
const Finishes = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <FinishesTable />
      </div>
    </div>
  );
};

export default Finishes;
