import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SetDimensions } from "@/components/Estimates/setDimensions";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { getDecryptedToken } from "@/utilities/common";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";

const EstimateDimensions = () => {
    const decodedToken = getDecryptedToken();
    return (
        <>
        {/* <TopBar/>
          <div className="main-wrapper"> */}
            {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
            {/* <CommonSideBar/> */}
            <CommonLayout>
            <div className="content-wrapper">
                <SetDimensions />
            </div>
            </CommonLayout>
        {/* </div> */}
        </>
      
    );
};

export default EstimateDimensions;
