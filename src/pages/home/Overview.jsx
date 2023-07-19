import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./overview.scss";
import Widget from "../../components/widgets/Widget";
import CustomerTable from "../../components/CustomerTable/Customertable";

const Overview = () => {
  return (
    <div className="overview">
      <Sidebar />
      <div className="overviewContainer">
        <div className="page-title">
          <h2>Welcome back, Olivis</h2>
          
          <p>Tract, manage and forecast your customers and orders.</p>
        </div>
        <div className="widgets">
          <Widget type="estimates" />
          <Widget type="customers" />
          <Widget type="team" />
          <Widget type="invoice" />
        </div>
        <div className="page-title">
          <h2>Estimates</h2>
        </div>
        <div className="widgets">
          <Widget type="pendings" />
          <Widget type="approved" />
          <Widget type="voided" />
          <Widget type="invoice" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Estimates Queue</div>
          <CustomerTable />
        </div>
        <div className="listContainer">
          <div className="listTitle">Create New Queue</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
