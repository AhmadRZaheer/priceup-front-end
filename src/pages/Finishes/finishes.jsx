import React from "react";
import "./hardware.scss";
import FinishesTable from "../../components/Finishes/finishesTable";
import CommonLayout from "@/components/CommonLayout";
import { Box } from "@mui/material";
const Finishes = () => {
  return (
    <>
      {/* <TopBar/>
      <div className="Customers">
      {/* <Sidebar /> */}
      {/* <CommonSideBar /> */}
      <CommonLayout>
        <Box
          className="customersContainer"
        >
          <FinishesTable />
        </Box>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default Finishes;
