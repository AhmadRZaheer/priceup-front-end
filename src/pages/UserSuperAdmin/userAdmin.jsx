import React from "react";
import "./userAdmin.scss";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import SuperAdminUser from "../../components/SuperAdmin/superAdminUser-Admin";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
const AdminUser = () => {
  return (
    <>
      <div className="user-admin">
        {/* <SuperSidebar /> */}
        <CommonSideBar/>
        <TopBar/>
        <div className="user-admin-Container">
          <SuperAdminUser />
        </div>
      </div>
    </>
  );
};

export default AdminUser;
