import React from "react";
import "./settings.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import CampanySetting from "../../components/Setting/CampanySetting";

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <CampanySetting />
      </div>
    </div>
  );
};

export default Settings;
