import React from "react";
import "./customers.scss";
import IndexMobile from "../../components/EstimatesMoblie/IndexMobile";
import MobileBar from "../../components/MobileNavBar/mobleNavBar";

const Staff = () => {
  return (
    <div className="Customers">
      <MobileBar />
      <div className="customersContainer">
        <IndexMobile />
      </div>
    </div>
  );
};

export default Staff;
