import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SelectLayout } from "@/components/Estimates/selectLayout";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { userRoles } from "@/utilities/constants";
import { getDecryptedToken } from "@/utilities/common";

const EstimateLayouts = () => {
    const decodedToken = getDecryptedToken();
    return (
        <div className="main-wrapper">
            {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />}
            <div className="content-wrapper">
                <SelectLayout />
            </div>
        </div>
    );
};

export default EstimateLayouts;
