import React from "react";
import "./team.scss";
import SuperAdminTable from "../../components/SuperAdmin/superAdmin";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
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
