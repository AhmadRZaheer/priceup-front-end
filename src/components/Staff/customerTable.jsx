import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchDataCustomer } from "../../utilities/ApiHooks/customer";
import { CustomerColumns } from "../../customerTableSource";
import "./customerTable.css";
import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";
import CustomerQoute from "../Estimates/customerQuotTable";
import EyeIcon from "../../Assets/eye-icon.svg";
import CustomIconButton from "../ui-components/CustomButton";
import { backendURL } from "../../utilities/common";

import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import DefaultImage from "../ui-components/defaultImage";

export default function CustomerTable() {
  const { data: customerData, refetch } = useFetchDataCustomer();
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = React.useState(null);
  const filteredData = customerData?.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    refetch();
  }, []);
  const handleClose = () => setOpen(false);

  const handleOpenEdit = (params) => {
    setSelectedRowData(params.row); // Store the data of the selected row
    setOpen(true);
  };
  const actionColumn = [
    {
      field: "Status",
      align: "left",
      headerClassName: "customHeaderClass",
      width: 344,
      renderCell: (params) => {
        console.log("customer", params.row._id);
        return (
          <>
            <CustomIconButton
              handleClick={() => handleOpenEdit(params)}
              icon={
                <img
                  width={"20px"}
                  height={"20px"}
                  src={EyeIcon}
                  alt="eye icon"
                  style={{ marginRight: 8 }}
                />
              }
              buttonText="View Quotes"
            />
          </>
        );
      },
    },
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const MAX_PAGES_DISPLAYED = 5;

  const getPageNumbersToShow = () => {
    if (totalPages <= MAX_PAGES_DISPLAYED) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pagesToShow = [];
    const startPage = Math.max(1, page - 2); // Display three on the first side
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);

    if (startPage > 1) {
      pagesToShow.push(1);
      if (startPage > 2) {
        pagesToShow.push("..."); // Display ellipsis if there are skipped pages
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToShow.push("..."); // Display ellipsis if there are skipped pages
      }
      pagesToShow.push(totalPages);
    }

    return pagesToShow;
  };

  const pageNumbersToShow = getPageNumbersToShow();

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: { sm: 3, xs: 10 },
          width: "98%",
          height: "100vh",
          color: { xs: "white", sm: "black" },
          overflow: "auto",
          m: "auto",
        }}
        s
      >
        <Box sx={{ width: "98%" }}>
          <Typography
            sx={{ fontSize: 30, pl: 2, color: { xs: "white", sm: "#101828" } }}
          >
            Customer List
          </Typography>

          <Box
            sx={{
              m: 3,
              border: "1px solid #EAECF0",
              borderRadius: "8px",
              display: { sm: "block", xs: "none" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                alignItem: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  pl: 2,
                  color: { xs: "white", sm: "#101828" },
                  pt: 1,
                }}
              >
                Customer
              </Typography>

              <TextField
                placeholder="Search by Name"
                value={search}
                variant="standard"
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  mb: 2,
                  mr: 5,
                  ".MuiInputBase-root:after": {
                    border: "1px solid #8477DA",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search sx={{ color: "#8477DA" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="CustomerTable-1">
              {filteredData.length >= 1 ? (
                <>
                  <DataGrid
                    style={{
                      border: "none",
                    }}
                    getRowId={(row) => row._id}
                    rows={filteredData.slice(
                      (page - 1) * itemsPerPage,
                      page * itemsPerPage
                    )}
                    columns={CustomerColumns}
                    page={page}
                    pageSize={itemsPerPage}
                    rowCount={filteredData.length}
                    sx={{ width: "100%" }}
                    hideFooter
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                      borderTop: "1px solid #EAECF0",
                    }}
                  >
                    <Button
                      sx={{
                        border: "1px solid #D0D5DD",
                        color: "#344054",
                        borderRadius: "8px",
                        textTransform: "capitalize",
                        fontWeight: 500,
                        ":hover": {
                          border: "1px solid #D0D5DD",
                          color: "#344054",
                        },
                      }}
                      variant="outlined"
                      onClick={handlePreviousPage}
                      disabled={page === 0}
                    >
                      <ArrowBack
                        sx={{ color: "#344054", fontSize: 20, mr: 1 }}
                      />
                      Previous
                    </Button>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {pageNumbersToShow.map((pagenumber, index) => (
                        <Box
                          key={index}
                          onClick={() => setPage(pagenumber)}
                          sx={{
                            backgroundColor:
                              page === pagenumber
                                ? "rgba(144, 136, 192, 0.2)"
                                : "white",
                            color: page === pagenumber ? "#353050" : "#667085",
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          {pagenumber}
                        </Box>
                      ))}
                    </Box>
                    <Button
                      sx={{
                        border: "1px solid #D0D5DD",
                        color: "#344054",
                        borderRadius: "8px",
                        textTransform: "capitalize",
                        fontWeight: 500,
                        ":hover": {
                          border: "1px solid #D0D5DD",
                          color: "#344054",
                        },
                      }}
                      onClick={handleNextPage}
                      disabled={filteredData.length === 0}
                    >
                      Next
                      <ArrowForward
                        sx={{ color: "#344054", fontSize: 20, ml: 1 }}
                      />
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "gray",
                    py: 2,
                  }}
                >
                  No Customer Found
                </Typography>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: { sm: "none", xs: "block" },
              marginTop: "10px",
            }}
          >
            {filteredData.length >= 1 ? (
              <>
                {customerData.map((data) => {
                  return (
                    <Box
                      key={data.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "15px 8px",
                        borderTop: "2px solid lightgray",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "100%",
                              overflow: "hidden",
                            }}
                          >
                            <DefaultImage
                              image={data?.image}
                              name={data?.name}
                            />
                          </Box>
                          <Box sx={{ paddingLeft: "10px" }}>
                            <Typography sx={{ fontSize: "20px" }}>
                              {data.name}
                            </Typography>
                            <Typography sx={{ fontSize: "16px" }}>
                              {data.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography>
                          {new Date(data?.updatedAt).toDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </>
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "gray",
                  py: 2,
                }}
              >
                No Customer Found
              </Typography>
            )}
          </Box>
        </Box>

        <CustomerQoute
          open={open}
          close={handleClose}
          quoteId={selectedRowData ? selectedRowData._id : null}
        />
      </Box>
    </>
  );
}
