import React from "react";
import "./hardware.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import FinishesTable from "../../components/Finishes/finishesTable";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
const Finishes = () => {
  return (
    <>
    <TopBar/>
      <div className="Customers">
      {/* <Sidebar /> */}
      <CommonSideBar />
      <div className="customersContainer">
        <FinishesTable />
      </div>
    </div>
    </>
  
  );
};

export default Finishes;
