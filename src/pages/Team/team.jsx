import React from "react";
import "./team.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import TeamTable from "../../components/Team-UserTable/teamTable";
import TopBar from "@/components/TopBar";
const Team = () => {
  return (
    <>
    <TopBar/>
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
