import React from "react";
import "./defaults.scss";

import Sidebar from "../../components/Sidebar/sidebar";
import DefaultSection from "../../components/DefaultSection/defaultSection";

const Defaults = (Props) => {
  return (
    <>
      <div className="Defaults">
        <Sidebar />
        <div className="defaultsConatiner">
          <DefaultSection />
        </div>
      </div>
    </>
  );
};

export default Defaults;
