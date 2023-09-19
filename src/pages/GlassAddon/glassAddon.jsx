import React from "react";
import "./glassAddon.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import GlassAddonComponent from "../../components/GlassAddon";

const GlassAddon = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <GlassAddonComponent />
      </div>
    </div>
  );
};

export default GlassAddon;