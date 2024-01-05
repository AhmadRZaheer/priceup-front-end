import { Box, Typography } from "@mui/material";
import userImg from "./Assets/username1.svg";
import wheel from "./Assets/wheel.svg";
import "./components/table/table.scss";
import { backendURL } from "./utilities/common";
import DefaultImage from "./components/ui-components/defaultImage";

export const teamColumns = [
  {
    field: "name",
    headerName: "Name",
    headerClassName: "customHeaderClass-team",
    flex: 1.2,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            <DefaultImage image={params.row.image} name={params.row.name} />
          </div>
          <div className="customerNameTable">
            {params.row.name}
            <div className="userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    headerClassName: "customHeaderClass-team",
    flex: 1.5,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>{params.row.email}</Typography>
        </>
      );
    },
  },
  {
    field: "Date added",
    headerName: "Date added",
    headerClassName: "customHeaderClass-team",
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>
            {new Date(params.row.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Last quote",
    headerName: "Last quote",
    headerClassName: "customHeaderClass-team",
    flex: 0.8,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>
            {params.row.lastQuoted
              ? new Date(params.row.lastQuoted).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Total qouted",
    headerName: "Total qouted",
    headerClassName: "customHeaderClass-team",
    flex: 0.8,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>$ {params.row.totalQuoted}</Typography>
        </>
      );
    },
  },
];
export const AdminColumns = [
  {
    field: "Team Members",
    headerName: "Name",
    headerClassName: "customHeaderClass-admin-team",
    flex: 0.8,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            <DefaultImage image={params.row.image} name={params.row.name} />
          </div>
          <div className="customerNameTable">
            {params.row.name}
            <div className="userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    headerClassName: "customHeaderClass-admin-team",
    flex: 0.8,
    renderCell: (params) => {
      return <div style={{ color: "#667085" }}>{params.row.email}</div>;
    },
  },
  {
    field: "dateAdded",
    headerName: "Date added",
    headerClassName: "customHeaderClass-admin-team",
    flex: 0.8,
    renderCell: (params) => {
      return (
        <div style={{ color: "#667085" }}>
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
export const AdminColumns2 = [
  {
    field: "Team Members",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            <DefaultImage image={params.row.image} name={params.row.name} />
          </div>
          <div className="customerNameTable" style={{ marginLeft: "10px" }}>
            {params.row.name}
            <div className="userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    width: 200,
    renderCell: (params) => {
      return <div style={{ color: "#667085" }}>{params.row.email}</div>;
    },
  },
  {
    field: "dateAdded",
    headerName: "Date added",
    width: 220,
    renderCell: (params) => {
      return (
        <div style={{ color: "#667085" }}>
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
    headerClassName: "customHeaderClass",
    flex: 1.2,
    renderCell: (params) => {
      return (
        <>
          <div className="cellWrapper">
            <div className="customerImg">
              <DefaultImage image={params.row.image} name={params.row.name} />
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
  {
    field: "email",
    headerName: "Email address",
    headerClassName: "customHeaderClass",
    flex: 1.4,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>{params.row.email}</Typography>
        </>
      );
    },
  },
  {
    field: "Phone",
    headerName: "Phone number",
    headerClassName: "customHeaderClass",
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>
            {params.row.phone === "" ? "---" : params.row.phone}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Address",
    headerName: "Address",
    headerClassName: "customHeaderClass",
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>{params.row.address}</Typography>
        </>
      );
    },
  },
  {
    field: "lastQuotedOn",
    headerName: "Last quoted on",
    headerClassName: "customHeaderClass",
    flex: 0.8,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>{params.row.lastQuotedOn}</Typography>
        </>
      );
    },
  },
  ,
];
export const CustomerQuoteColumns = [
  {
    field: "name",
    headerName: "Reference",
    width: 500,
  },
];
export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 40,
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
    headerClassName: "customHeaderClass-finishes",
    flex: 6,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          {params.row.image === "" ? (
            "---"
          ) : (
            <DefaultImage image={params.row.image} name={params.row.name} />
          )}
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
