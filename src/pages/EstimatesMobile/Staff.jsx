import React from "react";
import "./customers.scss";

import IndexMobile from "../../components/ExtimatesMoblie/IndexMobile";
import MobileBar from "../../components/MobileNavBar/MobleNavBar";
import ExitingQuotes from "../../components/ExtimatesMoblie/existingQuotes";

const Staff = () => {
  return (
    <div className="Customers">
      <MobileBar />
      <div className="customersContainer">
        <IndexMobile />
        {/* <ExitingQuotes /> */}
      </div>
    </div>
  );
};

export default Staff;
