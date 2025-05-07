import React from "react";
import "./team.scss";
import SuperAdminTable from "../../components/SuperAdmin/superAdmin";
import SuperSidebar from "../../components/SuperSidebar/superSidebar";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
const Admin = () => {
  return (
    <>  
      {/* <div className="Team"> */}
        {/* <SuperSidebar /> */}
        {/* <CommonSideBar/>
         <TopBar/> */}
         <CommonLayout>
        <div className="teamContainer">
          <SuperAdminTable />
        </div>
        </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default Admin;
