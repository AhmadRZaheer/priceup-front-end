import React from "react";
import "./hardware.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import FinishesTable from "../../components/Finishes/finishesTable";
import TopBar from "@/components/TopBar";
const Finishes = () => {
  return (
    <>
    <TopBar/>
      <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <FinishesTable />
      </div>
    </div>
    </>
  
  );
};

export default Finishes;
