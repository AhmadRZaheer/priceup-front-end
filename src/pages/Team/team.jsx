import React from "react";
import "./team.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import TeamTable from "../../components/TeamTable/teamTable";
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
