import userImg from "./Assets/username1.svg";
import wheel from "./Assets/wheel.svg";

import "./components/table/table.scss";
import { backendURL } from "./utilities/common";

export const teamColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            <img
              style={{ width: 34, height: 34 }}
              className="cellImg"
              src={`${backendURL}/${params.row.image}`}
              alt="dd"
            />
          </div>
          <div className="customerNameTable">
            {params.row.name}
            <div className="userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  { field: "email", headerName: "Email address", width: 330 },
];
export const AdminColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            <img
              className="cellImg"
              style={{ width: 40, height: 40 }}
              src={`${backendURL}/${params.row.image}`}
              alt=""
            />
          </div>
          <div className="customerNameTable">
            {params.row.name}
            <div className="userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  { field: "email", headerName: "Email address", width: 330 },
  {
    field: "dateAdded",
    headerName: "Date added",
    width: 220,
    renderCell: (params) => {
      return (
        <div className="userNameTable">
          {new Date(params.row.updatedAt).toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      );
    },
  },
];

export const CustomerColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 330,
    renderCell: (params) => {
      return (
        <>
          <div className="cellWrapper">
            <div className="customerImg">
              <img
                style={{ width: 30, height: 30 }}
                src={`${backendURL}/${params.row.image}`}
                alt=""
              />
              {/* <img style={{}} src={wheel} alt="" /> */}
            </div>
            <div className="customerNameTable">
              {params.row.name}
              <div className="userNameTable">{params.row.username}</div>
            </div>
          </div>
        </>
      );
    },
  },
  { field: "email", headerName: "Email address", width: 220 },
  {
    field: "address",
    headerName: "Address",
    width: 330,
  },
  {
    field: "lastQuotedOn",
    headerName: "Last Quoted on",
    width: 220,
  },
  ,
];
export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "name",
    headerName: "Customer Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            <img className="cellImg" src={params.row.img} alt="" />
          </div>
          <div className="customerNameTable">
            {params.row.name}
            <div className="userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  { field: "Email", headerName: "Email", width: 330 },
  {
    field: "Address",
    headerName: "Address",
    width: 120,
  },
  {
    field: "LastQuote",
    headerName: "Last Quoted On",
    width: 180,
  },
];

export const userRows = [
  {
    id: 1,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 2,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 3,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 4,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 5,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 6,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 7,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 8,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
];

export const userColumnsHardware = [
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="hardwareImg">
            <img
              className="cellImg"
              src={`${backendURL}/${params.row.image}`}
              alt=""
            />
          </div>
          <div className="hardwareNameTable">{params.row.name}</div>
        </div>
      );
    },
  },


];

export const userRowsHardware = [
  {
    _id: 1,
    hardwareLabel: "maya",
    image: userImg,
    Thickness: "",
    PartNumber: "",
    Cost: "",
    Price: "",
    Status: "",
  },
];
export const columnsHardwareHandle = [
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="hardwareImg">
            <img className="cellImg" src={params.row.img} alt="" />
          </div>
          <div className="hardwareNameTable">{params.row.name}</div>
        </div>
      );
    },
  },
  { field: "PartNumber", headerName: "Part number", width: 330 },
  {
    field: "Cost",
    headerName: "Cost",
    width: 120,
  },
  {
    field: "Price",
    headerName: "Price",
    width: 180,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 80,
  },
];

export const rowsHardwareHandle = [
  {
    id: 1,
    name: "8 x 8 RM Pull ",
    img: wheel,

    PartNumber: "",
    Cost: "",
    Price: "",
    Status: "",
    item: [{}],
  },
];
