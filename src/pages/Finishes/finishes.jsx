import React from "react";
import "./hardware.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import FinishesTable from "../../components/Finishes/finishesTable";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
const Finishes = () => {
  return (
    <>
    {/* <TopBar/>
      <div className="Customers">
      {/* <Sidebar /> */}
      {/* <CommonSideBar /> */}
      <CommonLayout>
      <div className="customersContainer">
        <FinishesTable />
      </div>
      </CommonLayout>
    {/* </div> */}
    </>
  
  );
};

export default Finishes;
