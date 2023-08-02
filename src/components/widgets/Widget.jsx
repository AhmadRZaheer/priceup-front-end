import React from "react";
import "./widget.scss";
import EstimateIcon from "../../Assets/estimate-icon.svg";
import CustomerIcon from "../../Assets/customer.svg";
import TeamIcon from "../../Assets/team.svg";
import InvoiceIcon from "../../Assets/invoice.svg";
import image1 from "../../Assets/test.png";
import image2 from "../../Assets/ok.png";
import image3 from "../../Assets/cancel.png";

const widget = ({ type , value }) => {
  let data;

  switch (type) {
    case "estimates":
      data = {
        title: "Estimates",
        iconTitle: EstimateIcon,
        cardNum: value,
        isMoney: false,
      };
      break;
    case "customers":
      data = {
        title: "Customers",
        iconTitle: CustomerIcon,
        cardNum: value,
        isMoney: false,
      };
      break;
    case "team":
      data = {
        title: "Team Members",
        iconTitle: TeamIcon,
        cardNum: value,
        isMoney: false,
      };
      break;
    case "invoice":
      data = {
        title: "Invoice Total",
        iconTitle: InvoiceIcon,
        cardNum: value,
        isMoney: true,
      };
      break;
    case "pendings":
      data = {
        title: "Pendings",
        iconTitle: image1,
        cardNum: "177",
        isMoney: false,
      };
      break;
    case "approved":
      data = {
        title: "Approved",
        iconTitle: image2,
        cardNum: "0",
        isMoney: false,
      };
      break;
    case "voided":
      data = {
        title: "Voided",
        iconTitle: image3,
        cardNum: "112",
        isMoney: false,
      };
      break;
    case "invoice":
      data = {
        title: "Invoice Total",
        iconTitle: InvoiceIcon,
        cardNum: "8378",
        isMoney: true,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <div className="estimate-card">
          <img width={50} src={data.iconTitle} alt="" />
          <span style={{fontSize: 18}}>{data.title}</span>
        </div>
        <div className="card-num">
          {data.isMoney && "$"} {data.cardNum}
        </div>
      </div>

    </div>
  );
};

export default widget;
