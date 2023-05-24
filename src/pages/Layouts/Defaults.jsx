import React from "react";
import "./defaults.scss";

import Sidebar from "../../components/Sidebar/Sidebar";

const Defaults = (Props) => {
  return (
    <>
      <div className="Defaults">
        <Sidebar />
        <div className="defaultsConatiner">
          <h1 className="title">Defaults</h1>
        </div>
        {/* <DefaultsCom /> */}
      </div>
    </>
  );
};

export default Defaults;
