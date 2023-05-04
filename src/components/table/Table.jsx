import React from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import userImg from "../../Assets/username1.svg";

const TableI = () => {
  const rows = [
    {
      name: "Olivia Rhye",
      img: userImg,
      username: "@olivia",
      Email: "olivia@untitleui.com",
      date: "Jan 4, 2022",
      amount: 886,
      measurer: "-",
      status: "Active",
    },
    {
      name: "Olivia Rhye",
      img: userImg,
      username: "@olivia",
      Email: "olivia@untitleui.com",
      date: "Jan 4, 2022",
      amount: 886,
      measurer: "-",
      status: "Active",
    },
    {
      name: "Olivia Rhye",
      img: userImg,
      username: "@olivia",
      Email: "olivia@untitleui.com",
      date: "Jan 4, 2022",
      amount: 886,
      measurer: "-",
      status: "Active",
    },
    {
      name: "Olivia Rhye",
      img: userImg,
      username: "@olivia",
      Email: "olivia@untitleui.com",
      date: "Jan 4, 2022",
      amount: 886,
      measurer: "-",
      status: "Pending",
    },
    {
      name: "Olivia Rhye",
      img: userImg,
      username: "@olivia",
      Email: "olivia@untitleui.com",
      date: "Jan 4, 2022",
      amount: 886,
      measurer: "-",
      status: "Active",
    },
    {
      name: "Olivia Rhye",
      img: userImg,
      username: "@olivia",
      Email: "olivia@untitleui.com",
      date: "Jan 4, 2022",
      amount: 886,
      measurer: "-",
      status: "Active",
    },
    {
      name: "Olivia Rhye",
      img: userImg,
      username: "@olivia",
      Email: "olivia@untitleui.com",
      date: "Jan 4, 2022",
      amount: 886,
      measurer: "-",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow className="tableHead">
            <TableCell className="tableCell">Customer Name</TableCell>
            <TableCell className="tableCell">Email address</TableCell>
            <TableCell className="tableCell">Date Quoted</TableCell>
            <TableCell className="tableCell">Estimate total</TableCell>
            <TableCell className="tableCell">Measurer</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <div className="cellWrapper">
                  <div className="customerImg" >
                    <img src={row.img} alt="" />
                  </div>
                  <div className="customerNameTable">
                    {row.name}
                    <div className="userNameTable">{row.username}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.Email}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.measurer}</TableCell>
              <TableCell className="tableCell"><span className={`status ${row.status}`}>{row.status}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableI;
