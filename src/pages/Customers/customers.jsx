import React from "react";
import "./customers.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import Customertable from "../../components/CustomerTable/customerTable";

const Customers = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <Customertable />
      </div>
    </div>
  );
};

export default Customers;
