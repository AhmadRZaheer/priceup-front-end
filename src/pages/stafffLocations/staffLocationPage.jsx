import React from "react";
import "./staffLocation.scss";
import StaffLocationsTable from "../../components/staffLocation_Table/staffLocationTable";
import StaffLocationsSidebar from "../../components/staffLocations_SideBar/staffLocation_SideBar";

const StaffLocationPage = () => {
  return (
    <div className="Customers">
      <StaffLocationsSidebar />
      <div className="customersContainer">
        <StaffLocationsTable />
      </div>
    </div>
  );
};

export default StaffLocationPage;
