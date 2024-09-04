import React from "react";
import "./team.scss";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import SuperAdminTeam from "../../components/SuperAdmin/superAdminTeam-User";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
import { Grid } from "@mui/material";
const AdminTeam = () => {
  return (
    <>
      {/* <div className="Team"> */}
      {/* <SuperSidebar /> */}
      {/* <CommonSideBar/>
        <TopBar/> */}
      <CommonLayout>
        <div className="teamContainer">
          <SuperAdminTeam />
        </div>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default AdminTeam;
