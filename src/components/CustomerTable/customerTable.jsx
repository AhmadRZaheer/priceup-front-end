import React, { useState } from "react";
import "./customerTable.scss";
import { CustomerColumns } from "../../customerTableSource";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Input,InputAdornment,IconButton } from "@mui/material";
import { useFetchDataCustomer } from "../../utilities/ApiHooks/customer";
import { Search } from '@mui/icons-material';
import CustomerQoute from "../Modal/customerQuotTable";

const CustomerTable = () => {
  const { data: teamData } = useFetchDataCustomer();
  console.log("data",teamData)
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dataForQuote, setDataForQuote] = useState(null); // Store the data for the quote
  const [selectedRowData, setSelectedRowData] = useState(null);
  const filteredData = teamData?.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );
  const handleClose = () => setOpen(false);
  const handleOpenEdit = (params) => {
    setSelectedRowData(params.row); // Store the data of the selected row
    setOpen(true);
    // setEdit(data);
    // setIsEdit(true);
  };

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
            onClick={() => handleOpenEdit(params.row)}
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
              onRowClick={(params) => handleOpenEdit(params)}
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

        <CustomerQoute
          open={open}
          close={handleClose}
          data={selectedRowData}
          // data={edit}
          // isEdit={isEdit}
          // finishesRefetch={finishesRefetch}
          // showSnackbar={showSnackbar}
        />
      </Box>
    </>
  );
};

export default CustomerTable;
