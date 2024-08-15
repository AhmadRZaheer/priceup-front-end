import React from "react";
import "./settings.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import CampanySetting from "../../components/Setting/campanySetting";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";

const Settings = () => {
  return (
    <>
    {/* <TopBar/>
     <div className="settings"> */}
      {/* <Sidebar /> */}
      {/* <CommonSideBar/> */}
      <CommonLayout>
      <div className="settingsContainer">
        <CampanySetting />
      </div>
      </CommonLayout>
    {/* </div> */}
    </>
   
  );
};

export default Settings;
