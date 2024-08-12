import React from "react";
import "./staffLocation.scss";
import StaffLocationsTable from "../../components/staffLocation_Table/staffLocationTable";
import StaffLocationsSidebar from "../../components/staffLocations_SideBar/staffLocation_SideBar";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const StaffLocationPage = () => {
  return (
    <>
    
      <div className="Customers">
      {/* <StaffLocationsSidebar /> */}
      <CommonSideBar/>
      <TopBar/>
      <div className="customersContainer">
        <StaffLocationsTable />
      </div>
    </div>
    </>
  
  );
};

export default StaffLocationPage;
