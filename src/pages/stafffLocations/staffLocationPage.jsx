import React from "react";
import "./staffLocation.scss";
import StaffLocationsTable from "../../components/staffLocation_Table/staffLocationTable";
import StaffLocationsSidebar from "../../components/staffLocations_SideBar/staffLocation_SideBar";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";

const StaffLocationPage = () => {
  return (
    <>
    
      {/* <div className="Customers">
      {/* <StaffLocationsSidebar /> */}
      {/* <CommonSideBar/>
      <TopBar/> */}
      <CommonLayout>
      <div className="customersContainer">
        <StaffLocationsTable />
      </div>
      </CommonLayout>
    {/* </div> */}
    </>
  
  );
};

export default StaffLocationPage;
