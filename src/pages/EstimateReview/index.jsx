import React from "react";
import "./style.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { Review } from "@/components/Estimates/review";

const EstimateReview = () => {
    return (
        <div className="main-wrapper">
            <Sidebar />
            <div className="content-wrapper">
                <Review />
            </div>
        </div>
    );
};

export default EstimateReview;
