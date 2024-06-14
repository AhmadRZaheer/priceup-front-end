import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SelectCategory } from "@/components/Estimates/selectCategory";
import MobileBar from "@/components/MobileNavBar/mobleNavBar";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";

const EstimateCategory = () => {
    const decodedToken = getDecryptedToken();
    return (
        <div className="main-wrapper">
            {decodedToken?.role === userRoles.STAFF ? <MobileBar /> : <Sidebar />}
            <div className="content-wrapper">
                <SelectCategory />
            </div>
        </div>
    );
};

export default EstimateCategory;
