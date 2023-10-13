import React, { useState } from "react";
import "./customerTable.scss";
import { CustomerColumns } from "../../customerTableSource";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Input,InputAdornment,IconButton } from "@mui/material";
import { useFetchDataCustomer } from "../../utilities/ApiHooks/customer";
import { Search } from '@mui/icons-material';
import { EditOutlined } from "@mui/icons-material";

const CustomerTable = () => {
  const { data: customerData } = useFetchDataCustomer();
  const [search, setSearch] = useState("");

  // Filter the customerData based on the search input
  const filteredData = customerData?.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const actionColumn = [
    {
      field: "Status",
      align: "left",
      minWidth: "280px",
      renderCell: (params) => {
        return (
          <>
            <IconButton
            sx={{
              backgroundColor: "#8477DA",
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 2,
              fontSize: 15,
            }}
            >Check Quote</IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
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

        <Input
          placeholder="Search by Name or Email"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 2,
            width: '20%', // You can adjust the width as needed
            marginLeft: '30px', // Adjust the margin as needed
          }}
          endAdornment={(
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          )}
        />

        <div className="CustomerTable">
          {filteredData.length >= 1 ? (
            <DataGrid
              getRowId={(row) => row._id}
              rows={filteredData}
              columns={CustomerColumns.concat(actionColumn)}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 2,
                  },
                },
              }}
              pageSizeOptions={[2]}
              sx={{width: "100%"}}
            />
          ) : (
            <Typography
              sx={{ textAlign: "center", fontSize: 20, color: "gray", py: 2 }}
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
