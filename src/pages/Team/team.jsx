import React from "react";
import "./team.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import TeamTable from "../../components/Team-UserTable/teamTable";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
const Team = () => {
  return (
    <>
    <TopBar/>
      <div className="Team">
        {/* <Sidebar /> */}
        <CommonSideBar/>
        <div className="teamContainer">
          <TeamTable />
        </div>
      </div>
    </>
  );
};

export default Team;
