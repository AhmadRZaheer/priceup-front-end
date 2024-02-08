import React from "react";
import "./userAdmin.scss";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import SuperAdminUser from "../../components/SuperAdmin/superAdminUser-Admin";
const AdminUser = () => {
  return (
    <>
      <div className="user-admin">
        <SuperSidebar />
        <div className="user-admin-Container">
          <SuperAdminUser />
        </div>
      </div>
    </>
  );
};

export default AdminUser;
