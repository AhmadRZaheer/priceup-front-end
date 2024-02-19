import React from "react";
import "./superAdmins.scss";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import Super_SuperAdminsTable from "../../components/super_superAdmins/super_superAdmins";
const Super_SuperAdmin = () => {
  return (
    <>
      <div className="super_superadmin">
        <SuperSidebar />
        <div className="super_superadminContainer">
          <Super_SuperAdminsTable />
        </div>
      </div>
    </>
  );
};

export default Super_SuperAdmin;
