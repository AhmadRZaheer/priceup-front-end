import React from "react";
import "./team.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TeamTable from "../../components/TeamTable/TeamTable";
import SuperAdminTable from "../../components/SuperAdmin/SuperAdmin";
import SuperSidebar from "../../components/SuperSidebar/SuperSidebar";
const Admin = () => {
  return (
    <>
      <div className="Team">
        <SuperSidebar />
        <div className="teamContainer">
          <SuperAdminTable />
        </div>
      </div>
    </>
  );
};

export default Admin;
