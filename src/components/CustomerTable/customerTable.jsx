import React from "react";
import "./customerTable.scss";
import { CustomerColumns } from "../../customerTableSource";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useFetchDataCustomer } from "../../utilities/ApiHooks/customer";

const CustomerTable = () => {
  const { data: CustomerData } = useFetchDataCustomer();

  return (
    <>
      <Box
        sx={{
          // borderTopLeftRadius: 30,
          // borderBottomLeftRadius: 30,
          backgroundColor: "white",
          height: "98.2vh",
          paddingLeft: 1,
          pt: 2,
        }}
      >
        <div className="page-title">
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography sx={{ fontSize: 30, pl: 2 }}>Customer List</Typography>
          </Box>
        </div>
        <div className="CustomerTable">
          {CustomerData?.length >= 1 ? (
            <DataGrid
              getRowId={(row) => row._id}
              rows={CustomerData}
              columns={CustomerColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
            />
          ) : (
            <Typography
              sx={{ tesxtAlign: "center", fontSize: 20, color: "gray", py: 2 }}
            >
              No Customer Found
            </Typography>
          )}
        </div>
      </Box>
    </>
  );
};

export default CustomerTable;
