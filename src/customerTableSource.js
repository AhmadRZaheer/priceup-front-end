import { Box, Typography } from "@mui/material";
import userImg from "./Assets/username1.svg";
import wheel from "./Assets/wheel.svg";
import "./components/table/table.scss";
import { backendURL } from "./utilities/common";

export const teamColumns = [
  {
    field: "name",
    headerName: "Name",
    headerClassName: "customHeaderClass-team",
    width: 230,
    renderCell: (params) => {
      if (params.row && params.row.name) {
        var firstNameInitial = params.row.name.charAt(0);
      } else {
        var firstNameInitial = "";
      }
      if (params.row && params.row.name) {
        var lastNameInitial = params.row.name.charAt(1);
      } else {
        var lastNameInitial = "";
      }

      return (
        <div className="cellWrapper">
          <div className="customerImg">
            {params.row.image === "images/staff/default.jpg" ? (
              <Typography
                sx={{
                  backgroundColor: "#F9F5FF",
                  width: 34,
                  height: 34,
                  borderRadius: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7F56D9",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {firstNameInitial}
                {lastNameInitial}
              </Typography>
            ) : params.row.image === "" ? (
              <Typography
                sx={{
                  backgroundColor: "#F9F5FF",
                  width: 34,
                  height: 34,
                  borderRadius: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7F56D9",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {firstNameInitial}
                {lastNameInitial}
              </Typography>
            ) : (
              <img
                style={{ width: 34, height: 34 }}
                className="cellImg"
                src={`${backendURL}/${params.row.image}`}
                alt="dd"
              />
            )}
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
    width: 330,
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
    width: 180,
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
    width: 180,
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
    width: 160,
    renderCell: (params) => {
      console.log(params.row);
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
    width: 250,
    renderCell: (params) => {
      if (params.row && params.row.name) {
        var firstNameInitial = params.row.name.charAt(0);
      } else {
        var firstNameInitial = "";
      }
      if (params.row && params.row.name) {
        var lastNameInitial = params.row.name.charAt(1);
      } else {
        var lastNameInitial = "";
      }
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            {params.row.image !== "" ? (
              <img
                className="cellImg"
                style={{ width: 40, height: 40 }}
                src={`${backendURL}/${params.row.image}`}
                alt=""
              />
            ) : (
              <Typography
                sx={{
                  backgroundColor: "#F9F5FF",
                  width: 34,
                  height: 34,
                  borderRadius: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7F56D9",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {firstNameInitial}
                {lastNameInitial}
              </Typography>
            )}
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
    width: 250,
    renderCell: (params) => {
      return <div style={{ color: "#667085" }}>{params.row.email}</div>;
    },
  },
  {
    field: "dateAdded",
    headerName: "Date added",
    headerClassName: "customHeaderClass-admin-team",
    width: 240,
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
      if (params.row && params.row.name) {
        var firstNameInitial = params.row.name.charAt(0);
      } else {
        var firstNameInitial = "";
      }
      if (params.row && params.row.name) {
        var lastNameInitial = params.row.name.charAt(1);
      } else {
        var lastNameInitial = "";
      }
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            {params.row.image !== "" ? (
              <img
                className="cellImg"
                style={{ width: 40, height: 40 }}
                src={`${backendURL}/${params.row.image}`}
                alt=""
              />
            ) : (
              <Typography
                sx={{
                  backgroundColor: "#F9F5FF",
                  width: 34,
                  height: 34,
                  borderRadius: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7F56D9",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {firstNameInitial}
                {lastNameInitial}
              </Typography>
            )}
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
    headerClassName: "customHeaderClass-admin-team",
    width: 300,
    renderCell: (params) => {
      if (params.row && params.row.name) {
        var firstNameInitial = params.row.name.charAt(0);
      } else {
        var firstNameInitial = "";
      }
      if (params.row && params.row.name) {
        var lastNameInitial = params.row.name.charAt(1);
      } else {
        var lastNameInitial = "";
      }
      console.log(params.row.image, "img");
      return (
        <>
          <div className="cellWrapper">
            <div className="customerImg">
              {params.row.image === "images/staff/default.jpg" ? (
                <Typography
                  sx={{
                    backgroundColor: "#F9F5FF",
                    width: 34,
                    height: 34,
                    borderRadius: "100%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7F56D9",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {firstNameInitial}
                  {lastNameInitial}
                </Typography>
              ) : (
                <img
                  style={{ width: 30, height: 30 }}
                  src={`${backendURL}/${params.row.image}`}
                  alt=""
                />
              )}
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
    headerClassName: "customHeaderClass-admin-team",
    width: 300,
    renderCell: (params) => {
      console.log(params.row);
      return (
        <>
          <Typography color={"#667085"}>{params.row.email}</Typography>
        </>
      );
    },
  },
  {
    field: "Address",
    headerName: "Address",
    headerClassName: "customHeaderClass-admin-team",
    width: 300,
    renderCell: (params) => {
      console.log(params.row);
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
    headerClassName: "customHeaderClass-admin-team",
    width: 300,
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
    width: 1411,
    renderCell: (params) => {
      console.log("params", params.row);
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
