import React, { useState } from "react";
import "./customerTable.scss";
import { CustomerColumns } from "../../customerTableSource";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Input,InputAdornment } from "@mui/material";
import { useFetchDataCustomer } from "../../utilities/ApiHooks/customer";
import { Search } from '@mui/icons-material';

const CustomerTable = () => {
  const { data: customerData } = useFetchDataCustomer();
  const [search, setSearch] = useState("");

  // Filter the customerData based on the search input
  const filteredData = customerData?.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

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
              columns={CustomerColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 2,
                  },
                },
              }}
              pageSizeOptions={[2]}
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
