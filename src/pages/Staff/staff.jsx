import React from "react";
import "./staff.scss";
import Content from "../../components/Staff";
import MobileBar from "../../components/MobileNavBar/mobleNavBar";

const Staff = () => {
    return (
        <div className="Customers">
            <MobileBar />
            <div className="customersContainer">
                <Content />
            </div>
        </div>
    );
};

export default Staff;
