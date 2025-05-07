import React from "react";
import "./superAdmins.scss";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import Super_SuperAdminsTable from "../../components/super_superAdmins/super_superAdmins";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
const Super_SuperAdmin = () => {
  return (
    <>
      {/* <div className="super_superadmin"> */}
        {/* <SuperSidebar /> */}
        {/* <CommonSideBar/>
        <TopBar /> */}
        <CommonLayout>
        <div className="super_superadminContainer">
          <Super_SuperAdminsTable />
        </div>
        </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default Super_SuperAdmin;
