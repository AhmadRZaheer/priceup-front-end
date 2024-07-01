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
import NewPagination from "../Pagination";
import { itemsPerPage } from "@/utilities/constants";


const CustomerTable = () => {

  const { data: customerData, refetch: customersRefetch } =
    useFetchDataCustomer();
  // const refetchData = useSelector(getDataRefetch);
  const [search, setSearch] = useState("");
  const [openQuotesModal, setOpenQuotesModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  // pagination state:
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [isShowInput, setIsShowInput] = useState(false);

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
            
                <NewPagination
                  totalRecords={filteredData.length ? filteredData.length : 0}
                  setIsShowInput={setIsShowInput}
                  isShowInput={isShowInput}
                  setInputPage={setInputPage}
                  inputPage={inputPage}
                  page={page}
                  setPage={setPage}
                />
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
