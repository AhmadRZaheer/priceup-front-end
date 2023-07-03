import React from "react";
import "./team.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TeamTable from "../../components/TeamTable/TeamTable";
const Team = () => {
  return (
    <>
      <div className="Team">
        <Sidebar />
        <div className="teamContainer">
          <TeamTable />
        </div>
      </div>
    </>
  );
};

export default Team;
