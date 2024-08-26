import React from "react";
import "./defaults.scss";

import Sidebar from "../../components/Sidebar/sidebar";
import DefaultSection from "../../components/DefaultSection/defaultSection";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
import ShowerLayout from "@/components/ShowerLayout";

const Defaults = (Props) => {
  return (
    <>
    {/* <TopBar/>
      <div className="Defaults"> */}
        {/* <Sidebar /> */}
        {/* <CommonSideBar/> */}
        <CommonLayout>
        <div className="defaultsConatiner">
        <ShowerLayout/>
        {/* <DefaultSection /> */}
        </div>
        </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default Defaults;
