import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { CustomerColumns } from "@/utilities/DataGridColumns";
import "./style.scss";
import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";
import CustomerEstimatesList from "@/components/Estimates/customerEstimatesTable";
import EyeIcon from "@/Assets/eye-icon.svg";
import CustomIconButton from "@/components/ui-components/CustomButton";

import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import DefaultImage from "@/components/ui-components/defaultImage";
import { MAX_PAGES_DISPLAYED, itemsPerPage } from "@/utilities/constants";
import NewPagination from "@/components/Pagination";
import Pagination from "@/components/Pagination";
import { debounce } from "@/utilities/common";

export default function Customers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const {
    data: customersList,
    refetch: customersRefetch,
    isFetching,
  } = useFetchDataCustomer(page, itemsPerPage, search);
  // const [open, setOpen] = React.useState(false);

  // pagination state:
  // const [inputPage, setInputPage] = useState("");
  // const [isShowInput, setIsShowInput] = useState(false);

  // const [selectedRowData, setSelectedRowData] = React.useState(null);
  const filteredData = useMemo(() => {
    if (customersList && customersList?.customers?.length) {
      return customersList?.customers;
    } else {
      return [];
    }
  }, [customersList, search]);

  // const filteredData = customerData?.filter(
  //   (customer) =>
  //     customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
  //     customer?.email?.toLowerCase().includes(search.toLowerCase())
  // );
  useEffect(() => {
    customersRefetch();
  }, [page]);

  const debouncedRefetch = useCallback(
    debounce(() => {
      if (page === 1) {
        customersRefetch();
      } else {
        setPage(1);
      }
    }, 500),
    [search]
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    debouncedRefetch();
  };

  // const handleClose = () => setOpen(false);

  // const handleOpenEdit = (params) => {
  //   setSelectedRowData(params.row); // Store the data of the selected row
  //   setOpen(true);
  // };
  // const actionColumn = [
  //   {
  //     field: "Status",
  //     align: "left",
  //     headerClassName: "customHeaderClass",
  //     width: 344,
  //     renderCell: (params) => {
  //       console.log("customer", params.row._id);
  //       return (
  //         <>
  //           <CustomIconButton
  //             handleClick={() => handleOpenEdit(params)}
  //             icon={
  //               <img
  //                 width={"20px"}
  //                 height={"20px"}
  //                 src={EyeIcon}
  //                 alt="eye icon"
  //                 style={{ marginRight: 8 }}
  //               />
  //             }
  //             buttonText="View Quotes"
  //           />
  //         </>
  //       );
  //     },
  //   },
  // ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: { sm: 3, xs: 9 },
          width: "98%",
          // height: "100vh",
          color: { xs: "white", sm: "black" },
          overflow: "auto",
          m: "auto",
        }}
      >
        <Box sx={{ width: "98%" }}>
          <Typography
            sx={{
              fontSize: 30,
              pl: { sm: 3, xs: 0 },
              color: { xs: "#101828", sm: "#101828" },
            }}
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
                  color: { xs: "#101828", sm: "#101828" },
                  pt: 1,
                }}
              >
                Customer
              </Typography>

              <TextField
                placeholder="Search by Name"
                value={search}
                variant="standard"
                onChange={(e) => handleChange(e)}
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
                    loading={isFetching}
                    style={{
                      border: "none",
                    }}
                    getRowId={(row) => row._id}
                    // rows={filteredData.slice(
                    //   (page - 1) * itemsPerPage,
                    //   page * itemsPerPage
                    // )}
                    rows={filteredData}
                    columns={CustomerColumns}
                    page={page}
                    pageSize={itemsPerPage}
                    rowCount={
                      customersList?.totalRecords
                        ? customersList?.totalRecords
                        : 0
                    }
                    // rowCount={filteredData.length}
                    sx={{ width: "100%" }}
                    hideFooter
                  />
                  <Pagination
                    // totalRecords={filteredData.length ? filteredData.length : 0}
                    totalRecords={
                      customersList?.totalRecords
                        ? customersList?.totalRecords
                        : 0
                    }
                    itemsPerPage={itemsPerPage}
                    page={page}
                    setPage={setPage}
                  />

                  {/* <NewPagination
                    totalRecords={filteredData.length ? filteredData.length : 0}
                    setIsShowInput={setIsShowInput}
                    isShowInput={isShowInput}
                    setInputPage={setInputPage}
                    inputPage={inputPage}
                    page={page}
                    setPage={setPage}
                  /> */}
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

          <Box>
            <Box
              sx={{
                display: { sm: "none", xs: "block" },
                marginTop: "10px",
                height: { sm: "80vh", xs: "70vh" },
                overflow: "auto",
              }}
            >
              {filteredData.length >= 1 ? (
                <>
                  {filteredData.map((data) => {
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
                              <Typography
                                sx={{ fontSize: "20px", color: "#101828" }}
                              >
                                {data.name}
                              </Typography>
                              <Typography
                                sx={{ fontSize: "16px", color: "#101828" }}
                              >
                                {data.email}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Typography sx={{ color: "#101828" }}>
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
            {customersList?.customers?.length ? (
              <Box sx={{ display: { sm: "none", xs: "block" } }}>
                {" "}
                <Pagination
                  totalRecords={
                    customersList?.totalRecords
                      ? customersList?.totalRecords
                      : 0
                  }
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>

        {/* <CustomerEstimatesList
          open={open}
          close={handleClose}
          quoteId={selectedRowData ? selectedRowData._id : null}
        /> */}
      </Box>
    </>
  );
}
