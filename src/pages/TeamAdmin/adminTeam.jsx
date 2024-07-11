import React from "react";
import "./team.scss";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import SuperAdminTeam from "../../components/SuperAdmin/superAdminTeam-User";
import TopBar from "@/components/TopBar";
const AdminTeam = () => {
  return (
    <>
      <div className="Team">
        <SuperSidebar />
        <TopBar/>
        <div className="teamContainer">
          <SuperAdminTeam />
        </div>
      </div>
    </>
  );
};

export default AdminTeam;
