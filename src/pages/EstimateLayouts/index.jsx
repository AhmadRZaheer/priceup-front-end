import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SelectLayout } from "@/components/Estimates/selectLayout";

const EstimateLayouts = () => {
    return (
        <div className="main-wrapper">
            <Sidebar />
            <div className="content-wrapper">
                <SelectLayout />
            </div>
        </div>
    );
};

export default EstimateLayouts;
