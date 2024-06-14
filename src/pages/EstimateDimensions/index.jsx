import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SetDimensions } from "@/components/Estimates/setDimensions";
import { userRoles } from "@/utilities/constants";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { getDecryptedToken } from "@/utilities/common";

const EstimateDimensions = () => {
    const decodedToken = getDecryptedToken();
    return (
        <div className="main-wrapper">
            {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />}
            <div className="content-wrapper">
                <SetDimensions />
            </div>
        </div>
    );
};

export default EstimateDimensions;
