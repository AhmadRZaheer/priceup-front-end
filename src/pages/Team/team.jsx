import React from "react";
import "./team.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import TeamTable from "../../components/Team-UserTable/teamTable";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
const Team = () => {
  return (
    <>
      {/* <TopBar/>
      <div className="Team">
        {/* <Sidebar /> */}
      {/* <CommonSideBar/> */}
      <CommonLayout>
        <div className="teamContainer">
          <TeamTable />
        </div>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default Team;
