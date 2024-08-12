import React from "react";
import "./defaults.scss";

import Sidebar from "../../components/Sidebar/sidebar";
import DefaultSection from "../../components/DefaultSection/defaultSection";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const Defaults = (Props) => {
  return (
    <>
    <TopBar/>
      <div className="Defaults">
        {/* <Sidebar /> */}
        <CommonSideBar/>
        <div className="defaultsConatiner">
          <DefaultSection />
        </div>
      </div>
    </>
  );
};

export default Defaults;
