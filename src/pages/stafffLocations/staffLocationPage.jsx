import React from "react";
import "./staffLocation.scss";
import StaffLocationsTable from "../../components/staffLocation_Table/staffLocationTable";

const StaffLocationPage = () => {
  return (
    <div className="Customers">
      {/* <MobileBar /> */}
      <div className="customersContainer">
        <StaffLocationsTable />
      </div>
    </div>
  );
};

export default StaffLocationPage;
