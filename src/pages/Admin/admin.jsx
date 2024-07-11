import React from "react";
import "./team.scss";
import SuperAdminTable from "../../components/SuperAdmin/superAdmin";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import TopBar from "@/components/TopBar";
const Admin = () => {
  return (
    <>
   
      <div className="Team">
        <SuperSidebar />
         <TopBar/>
        <div className="teamContainer">
          <SuperAdminTable />
        </div>
      </div>
    </>
  );
};

export default Admin;
