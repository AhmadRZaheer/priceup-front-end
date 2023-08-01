import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./overview.scss";
import Widget from "../../components/widgets/Widget";
import CustomerTable from "../../components/CustomerTable/Customertable";
import ExistingTable from "../../components/Estimates/esistingTable";
import { useFetchDataEstimateCard } from "../../utilities/ApiHooks/Estimatedata-card";
import ExistingQuotes from "../../components/Estimates/existingQuotes";
import ExistingQuotes2 from "../../components/Estimates/existingTable2";
import { parseJwt } from "../../components/ProtectedRoute/AuthVerify";

const Overview = () => {
  const { data, isFetching } = useFetchDataEstimateCard();
  const token = localStorage.getItem("token");
  const { name } = parseJwt(token);
  return (
    <div className="overview">
      <Sidebar />
      <div className="overviewContainer">
        <div className="page-title">
          <h2>Welcome back, {name}</h2>

          <p>Tract, manage and forecast your customers and orders.</p>
        </div>
        <div className="widgets">
          <Widget value={data?.estimates || 0} type="estimates" />
          <Widget value={data?.customers || 0} type="customers" />
          <Widget value={data?.staff || 0} type="team" />
          {/* <Widget value={data?.total || 0} type="invoice" /> */}
        </div>
        <div className="page-title">
          <h2>Estimates</h2>
        </div>
        <ExistingQuotes2 />
      </div>
    </div>
  );
};

export default Overview;
