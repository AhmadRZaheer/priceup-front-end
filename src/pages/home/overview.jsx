import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import "./overview.scss";
import Widget from "@/components/widgets/widget";
import { useFetchDataEstimateCard } from "@/utilities/ApiHooks/estimateDataCard";
import Estimates from "@/components/Estimates";
import { parseJwt } from "@/components/ProtectedRoute/authVerify";
import { Box } from "@mui/material";
import TopBar from "@/components/TopBar";

const Overview = () => {
  const { data, refetch } = useFetchDataEstimateCard();
  const token = localStorage.getItem("token");
  const { name } = parseJwt(token);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
    <TopBar/>
    <div className="overview">
      <Sidebar />

      <Box
        className="overviewContainer"
        sx={{ marginTop: { xs: "50px", sm: "0px" } }}
      >
        <div className="page-title">
          <h2>Welcome back, {name}</h2>

          <p className="discription-welcome">
            Tract, manage and forecast your customers and orders.
          </p>
        </div>
        <div className="widgets">
          <Widget value={data?.estimates || 0} type="estimates" />
          <Widget value={data?.customers || 0} type="customers" />
          <Widget value={data?.staff || 0} type="team" />
          <Widget value={data?.staff || 0} type="invoice" />
        </div>
        <Estimates />
      </Box>
    </div>
    </>
  );
};

export default Overview;
