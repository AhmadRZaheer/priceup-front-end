import React from "react";
import "./glassTreatement.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import HardwareTable from "../../components/HardwareTable/HardwareTable";
import FinishesTable from "../../components/Finishes/FinishesTable";
import GlassTreatementTable from "../../components/glassTreatement/glassTreatement";

const GlassTreatement = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <GlassTreatementTable />
      </div>
    </div>
  );
};

export default GlassTreatement;
