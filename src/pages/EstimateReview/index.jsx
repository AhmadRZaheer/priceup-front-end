import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { Review } from "@/components/Estimates/review";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { getDecryptedToken } from "@/utilities/common";
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";

const EstimateReview = () => {
    const decodedToken = getDecryptedToken();
    return (
        <>
        <TopBar/>
        <div className="main-wrapper">
            {/* {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />} */}
            <CommonSideBar/>
            <div className="content-wrapper">
                <Review />
            </div>
        </div>
        </>
        
    );
};

export default EstimateReview;
