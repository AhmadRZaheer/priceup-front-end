import React from "react";
import "./settings.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import CampanySetting from "../../components/Setting/campanySetting";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const Settings = () => {
  return (
    <>
    <TopBar/>
     <div className="settings">
      {/* <Sidebar /> */}
      <CommonSideBar/>
      <div className="settingsContainer">
        <CampanySetting />
      </div>
    </div>
    </>
   
  );
};

export default Settings;
