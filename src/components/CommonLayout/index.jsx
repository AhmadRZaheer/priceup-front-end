import React from "react";
import TopBar from "../TopBar";
import CommonSideBar from "../CommonSideBar";

const CommonLayout = ({ children }) => {
  return (
    <>
      <TopBar />
      <div style={{ display: "flex" }}>
        <CommonSideBar />
        {children}
      </div>
    </>
  );
};

export default CommonLayout;
