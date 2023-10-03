import React from "react";
import "./team.scss";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import SuperAdminTeam from "../../components/SuperAdmin/superAdminTeam";
const AdminTeam = () => {
  return (
    <>
      <div className="Team">
        <SuperSidebar />
        <div className="teamContainer">
          <SuperAdminTeam />
        </div>
      </div>
    </>
  );
};

export default AdminTeam;
