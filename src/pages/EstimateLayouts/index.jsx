import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SelectLayout } from "@/components/Estimates/selectLayout";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { userRoles } from "@/utilities/constants";
import { getDecryptedToken } from "@/utilities/common";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const EstimateLayouts = () => {
    const decodedToken = getDecryptedToken();
    return (
        <>
        <TopBar/>
          <div className="main-wrapper">
            {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
            <CommonSideBar/>
            <div className="content-wrapper" style={{paddingLeft:'25px'}}>
                <SelectLayout />
            </div>
        </div>
        </>
      
    );
};

export default EstimateLayouts;
