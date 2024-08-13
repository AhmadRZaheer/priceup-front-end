import React from "react";
import "./superAdmins.scss";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import Super_SuperAdminsTable from "../../components/super_superAdmins/super_superAdmins";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
const Super_SuperAdmin = () => {
  return (
    <>
      <div className="super_superadmin">
        {/* <SuperSidebar /> */}
        <CommonSideBar/>
        <TopBar />
        <div className="super_superadminContainer">
          <Super_SuperAdminsTable />
        </div>
      </div>
    </>
  );
};

export default Super_SuperAdmin;
