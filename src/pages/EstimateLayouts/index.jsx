import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SelectLayout } from "@/components/Estimates/selectLayout";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { userRoles } from "@/utilities/constants";
import { getDecryptedToken } from "@/utilities/common";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
import { Box } from "@mui/material";

const EstimateLayouts = () => {
  const decodedToken = getDecryptedToken();
  return (
    <>
      {/* <TopBar/>
          <div className="main-wrapper"> */}
      {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
      {/* <CommonSideBar/> */}
      <CommonLayout>
        <Box
          className="content-wrapper"
          // sx={{pl:{sm:'25px',xs:'0px'}}}
          sx={{
            paddingLeft: { sm: "25px", xs: "0px" },
            paddingRight: { sm: "25px", xs: "0px" },
            paddingTop: { sm: 2, xs: 0 },
            backgroundColor: { sm: "#F6F5FF", xs: "#08061B" },
          }}
        >
          <SelectLayout />
        </Box>
      </CommonLayout>
      {/* </div> */}
    </>
  );
};

export default EstimateLayouts;
