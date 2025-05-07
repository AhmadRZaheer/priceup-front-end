import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SelectCategory } from "@/components/Estimates/selectCategory";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";

const EstimateCategory = () => {
    const decodedToken = getDecryptedToken();
    return (
        <>
        {/* <TopBar/>
         <div className="main-wrapper"> */}
            {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
            {/* <CommonSideBar/> */}
            <CommonLayout>
            <div className="content-wrapper">
                <SelectCategory />
            </div>
            </CommonLayout>
        {/* </div> */}
        </>
       
    );
};

export default EstimateCategory;
