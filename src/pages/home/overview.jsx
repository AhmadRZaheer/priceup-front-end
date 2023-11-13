import React from "react";
import Sidebar from "../../components/Sidebar/sidebar";
import "./overview.scss";
import Widget from "../../components/widgets/widget";
import { useFetchDataEstimateCard } from "../../utilities/ApiHooks/estimateDataCard";
import ExistingQuotes2 from "../../components/Estimates/existingTable2";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";

const Overview = () => {
  const { data } = useFetchDataEstimateCard();
  const token = localStorage.getItem("token");
  const { name } = parseJwt(token);
  return (
    <div className="overview">
      <Sidebar />
      <div className="overviewContainer">
        <div className="page-title">
          <h2>Welcome back, {name}</h2>

          <p className="discription-welcome">Tract, manage and forecast your customers and orders.</p>
        </div>
        <div className="widgets">
          <Widget value={data?.estimates || 0} type="estimates" />
          <Widget value={data?.customers || 0} type="customers" />
          <Widget value={data?.staff || 0} type="team" />
          <Widget value={data?.staff || 0} type="invoice" />
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
