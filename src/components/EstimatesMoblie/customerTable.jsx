import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchDataCustomer } from "../../utilities/ApiHooks/customer";
import { CustomerColumns } from "../../customerTableSource";
import "./customerTable.css";

export default function CustomerTable() {
  const { data: customerData } = useFetchDataCustomer();
  return (
    <>
      <Box
        sx={{
          marginTop: { xs: 8, sm: 0 },
          // color: "#ffff",
          height: "100vh",
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
        }}
      >
        <Box sx={{}}>
          <Box
            sx={{
              paddingY: 2,
              paddingX: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "Medium" }}>
              Customer 
            </Typography>
          </Box>
          <div className="CustomerTable">
            <DataGrid
              sx={{
                width: "93vw",
                margin: "auto",
              }}
              getRowId={(row) => row._id}
              rows={customerData}
              columns={CustomerColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 2,
                  },
                },
              }}
              pageSizeOptions={[10]}
              style={{ backgroundColor: "white" }}
            />
            <Typography
              sx={{ textAlign: "center", fontSize: 20, color: "gray", py: 2 }}
            >
              No Customer Found
            </Typography>
          </div>
        </Box>
      </Box>
    </>
  );
}
