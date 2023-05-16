import React from "react";
import "./team.scss";
import Header from "../../components/TableHeader/TableHeader";
import { types } from "../../components/HardwareTable/HardwareTable";
const Team = () => {
  return (
    <>
      <div>Team</div>

      <div style={{ padding: "15px", display: "flex" }}>
        <Header types={types} />
      </div>
    
    </>
  );
};

export default Team;
