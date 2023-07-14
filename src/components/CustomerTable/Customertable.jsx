import React, { useState } from "react";
import "./customerTable.scss";
import { CustomerColumns } from "../../customerTableSource";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useFetchDataCustomer } from "../../utilities/ApiHooks/Customer";


const CustomerTable = () => {
  const { data: CustomerData, refetch: CustomerMemberRefetch } = useFetchDataCustomer();
  const [matchingId, setMatchingId] = useState("");



  console.log(CustomerData, "customersData");
  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Actions",
  //     width: 200,
  //     renderCell: () => {
  //       return (
  //         <div className="cellAction">
  //           <div className="deleteButton">
  //             <DeleteIcon />
  //           </div>
  //           <div className="viewButton">
  //             <ModeIcon />
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];



  const actionColumn = [
    {
      field: " ",
      // headerName: (
      //   // <div onClick={handleOpen}>
      //   //   <img src={plus} alt="Add More" />
      //   // </div>
      // ),
      width: 200,
      renderCell: (params) => {
        const id = params.row._id;
        const isMatchingId = id === matchingId;
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
             
            >
             
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
    <Box sx={{borderTopLeftRadius: 30, borderBottomLeftRadius: 30, backgroundColor: "white", height: "98.2vh", paddingLeft: 1, pt: 2}}>
      <div className="page-title">
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography  sx={{fontSize: 30, pl: 2}}>Customer List</Typography>
        </Box>
      </div>
      <div className="CustomerTable">
        <DataGrid
          getRowId={(row) => row._id}
          rows={CustomerData}
          columns={CustomerColumns}
          paginationModel={{ page: 0, pageSize: 8 }}
        />
      </div>
      </Box>
    </>
  );
};

export default CustomerTable;