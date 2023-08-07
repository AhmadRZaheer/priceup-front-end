import React from "react";
import "./settings.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import CampanySetting from "../../components/Setting/campanySetting";

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
