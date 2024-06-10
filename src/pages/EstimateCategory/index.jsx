import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SelectCategory } from "@/components/Estimates/selectCategory";

const EstimateCategory = () => {
    return (
        <div className="main-wrapper">
            <Sidebar />
            <div className="content-wrapper">
                <SelectCategory />
            </div>
        </div>
    );
};

export default EstimateCategory;
