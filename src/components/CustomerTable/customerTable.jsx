import React, { useEffect, useState } from "react";
import "./customerTable.scss";
import { CustomerColumns } from "@/utilities/DataGridColumns";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";
import CustomerEstimates from "@/components/Estimates/customerEstimatesTable";
import EyeIcon from "@/Assets/eye-icon.svg";
import CustomIconButton from "@/components/ui-components/CustomButton";
// import { getDataRefetch } from "../../redux/staff";
// import { useSelector } from "react-redux";
import ModeIcon from "@mui/icons-material/Mode";
import EditCustomer from "@/components/Modal/editCustomer";

const itemsPerPage = 10;
const MAX_PAGES_DISPLAYED = 3;
const CustomerTable = () => {
  const { data: customerData, refetch: customersRefetch } =
    useFetchDataCustomer();
  // const refetchData = useSelector(getDataRefetch);
  const [search, setSearch] = useState("");
  const [openQuotesModal, setOpenQuotesModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const filteredData = customerData?.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );
  // useEffect(() => {
  //   refetch();
  // }, [refetchData]);
  useEffect(() => {
    customersRefetch();
  }, []);
  const handleCloseQuotes = () => setOpenQuotesModal(false);
  const handleCloseEdit = () => setOpenEditModal(false);
  const handleViewQuotes = (params) => {
    setSelectedRowData(params.row);
    setOpenQuotesModal(true);
  };
  const handleOpenEdit = (item) => {
    setSelectedRowData(item);
    setOpenEditModal(true);
  };
  const actionColumn = [
    {
      field: "Actions",
      align: "left",
      headerClassName: "customHeaderClass",
      flex: 1.3,
      renderCell: (params) => {
        return (
          <>
            <CustomIconButton
              handleClick={() => handleViewQuotes(params)}
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
            <Box
              sx={{ marginLeft: "10px" }}
              className="viewButton"
              onClick={() => handleOpenEdit(params.row)}
            >
              <CustomIconButton
                handleClick={() => handleOpenEdit(params.row)}
                icon={
                  <ModeIcon sx={{ color: "white", fontSize: 18, pr: 0.4 }} />
                }
                buttonText="Edit"
              />
            </Box>
          </>
        );
      },
    },
  ];

  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [isShowInput, setIsShowInput] = useState(false);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
    setIsShowInput(false);
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setIsShowInput(false);
  };

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };
  const HandleShowInput = () => {
    setIsShowInput(true);
  };
  const HandleShowRemoveInput = () => {
    setIsShowInput(false);
  };
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      const pageNumber = parseInt(inputPage, 10);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        setPage(pageNumber);
        setInputPage("");
        setIsShowInput(false);
      }
    }
  };

  const handleInputBlur = () => {
    setInputPage("");
  };

  const handleEllipsisClick = () => {
    setInputPage(page.toString());
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "98.2vh",
          pt: 1,
        }}
      >
        <Typography sx={{ fontSize: 30, pl: 2, color: "#101828" }}>
          Customer List
        </Typography>
        <Box
          sx={{
            border: "1px solid #EAECF0",
            borderRadius: "8px",
            width: "97%",
            m: "auto",
            mt: 1,
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
              sx={{ fontSize: "18px", pl: 2, color: "#101828", pt: 1 }}
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

          <div className="CustomerTable-1">
            {filteredData.length >= 1 ? (
              <>
                <DataGrid
                  style={{ border: "none" }}
                  getRowId={(row) => row._id}
                  rows={filteredData.slice(
                    (page - 1) * itemsPerPage,
                    page * itemsPerPage
                  )}
                  columns={CustomerColumns.concat(actionColumn)}
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
                    disabled={page === 1}
                  >
                    <ArrowBack sx={{ color: "#344054", fontSize: 20, mr: 1 }} />
                    Previous
                  </Button>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {pageNumbersToShow.map((pagenumber, index) => (
                      <Box
                        key={index}
                        onClick={() => {
                          if (typeof pagenumber === "number") {
                            setPage(pagenumber);
                            HandleShowRemoveInput();
                          }
                        }}
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
                          cursor:
                            typeof pagenumber === "number"
                              ? "pointer"
                              : "default",
                        }}
                      >
                        {isShowInput && pagenumber === "..." ? (
                          <TextField
                            size="small"
                            variant="outlined"
                            type="text"
                            value={inputPage}
                            onChange={handleInputChange}
                            onKeyPress={handleInputKeyPress}
                            onBlur={handleInputBlur}
                            inputProps={{
                              min: 1,
                              max: totalPages,
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                            sx={{ width: 60 }}
                          />
                        ) : pagenumber === "..." ? (
                          <div
                            onClick={HandleShowInput}
                            style={{ cursor: "pointer" }}
                          >
                            {pagenumber}{" "}
                          </div>
                        ) : (
                          pagenumber
                        )}
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
                    disabled={page === totalPages}
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
                sx={{ textAlign: "center", fontSize: 20, color: "gray", py: 2 }}
              >
                No Customer Found
              </Typography>
            )}
          </div>
        </Box>

        <CustomerEstimates
          open={openQuotesModal}
          close={handleCloseQuotes}
          quoteId={selectedRowData ? selectedRowData : null}
        />

        <EditCustomer
          open={openEditModal}
          close={handleCloseEdit}
          data={selectedRowData}
          refetch={customersRefetch}
        />
      </Box>
    </>
  );
};

export default CustomerTable;
