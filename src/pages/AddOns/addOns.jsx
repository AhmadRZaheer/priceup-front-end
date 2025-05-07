import React from "react";
import "./addOns.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import AddOnsTable from "../../components/AddOns/addOns";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
const AddOns = () => {
  return (
    <>
    {/* <TopBar/>
    <div className="Customers"> */}
      {/* <Sidebar /> */}
      {/* <CommonSideBar/> */}
      <CommonLayout>
      <div className="customersContainer">
        <AddOnsTable />
      </div>
      </CommonLayout>
    {/* </div> */}
    </>
    
  );
};

export default AddOns;
