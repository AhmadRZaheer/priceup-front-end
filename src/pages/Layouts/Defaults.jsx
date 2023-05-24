import React from "react";
import "./defaults.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import DefaultSection from "../../components/DefaultSection/DefaultSection";

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
