import React from "react";
import "./team.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Customertable from "../../components/CustomerTable/Customertable";
const Team = () => {
  return (
    <>
      <div className="Team">
        <Sidebar />
        <div className="teamContainer">
          <Customertable />
        </div>
      </div>
    </>
  );
};

export default Team;
