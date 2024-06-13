import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { SetDimensions } from "@/components/Estimates/setDimensions";

const EstimateDimensions = () => {
    return (
        <div className="main-wrapper">
            <Sidebar />
            <div className="content-wrapper">
                <SetDimensions />
            </div>
        </div>
    );
};

export default EstimateDimensions;
