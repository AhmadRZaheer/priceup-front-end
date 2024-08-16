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

const EstimateLayouts = () => {
    const decodedToken = getDecryptedToken();
    return (
        <>
        {/* <TopBar/>
          <div className="main-wrapper"> */}
            {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
            {/* <CommonSideBar/> */}
            <CommonLayout>
            <div className="content-wrapper" style={{paddingLeft:'25px'}}>
                <SelectLayout />
            </div>
            </CommonLayout>
        {/* </div> */}
        </>
      
    );
};

export default EstimateLayouts;
