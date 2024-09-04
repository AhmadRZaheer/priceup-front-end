import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./customerTable.scss";
import { CustomerColumns } from "@/utilities/DataGridColumns";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { ArrowForward, East, Search } from "@mui/icons-material";
import CustomerEstimates from "@/components/Estimates/customerEstimatesTable";
import EyeIcon from "@/Assets/eye-icon.svg";
import CustomIconButton from "@/components/ui-components/CustomButton";
import ModeIcon from "@mui/icons-material/Mode";
import EditCustomer from "@/components/Modal/editCustomer";
import Pagination from "../Pagination";
// import { debounce } from "@/utilities/common";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import StatusChip from "../common/StatusChip";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const CustomerTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const {
    data: customersList,
    refetch: customersRefetch,
    isFetching,
  } = useFetchDataCustomer(page, itemsPerPage, search);
  // const refetchData = useSelector(getDataRefetch);
  const [openQuotesModal, setOpenQuotesModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);


  // pagination state:
  // const [inputPage, setInputPage] = useState("");
  // const [isShowInput, setIsShowInput] = useState(false);

  const filteredData = useMemo(() => {
    if (customersList && customersList?.customers?.length) {
      return customersList?.customers;
    } else {
      return [];
    }
  }, [customersList, search]);

  // const filteredData = customerData?.filter((customer) =>
  //   customer.name.toLowerCase().includes(search.toLowerCase())
  // );
  // useEffect(() => {
  //   refetch();
  // }, [refetchData]);
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
    }, 700),
    [page]
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    // debouncedRefetch();
  };
  const handleResetFilter = () => {
    setSearch("");
  };
  const handleCloseQuotes = () => setOpenQuotesModal(false);
  const handleCloseEdit = () => setOpenEditModal(false);

  useEffect(() => {
    debouncedRefetch();
    // Cleanup function to cancel debounce if component unmounts
    return () => {
      debouncedRefetch.cancel();
    };
  }, [search]);

  // const handleViewQuotes = (params) => {
  //   setSelectedRowData(params.row);
  //   setOpenQuotesModal(true);
  // };
  // const handleOpenEdit = (item) => {
  //   setSelectedRowData(item);
  //   setOpenEditModal(true);
  // };
  const actionColumn = [
    {
      field: "Actions",
      align: "left",
      headerClassName: "customHeaderClass",
      flex: 1,
      renderCell: (params) => {
        console.log(params.row, "params.row");
        return (
          <>
            {/* <CustomIconButton
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
            /> */}
            <IconButton
              sx={{ marginLeft: "10px" }}
              className="viewButton"
              // onClick={() => handleOpenEdit(params.row)}
              onClick={() => navigate(`/customers/edit?id=${params.row._id}`)}
            >
              <ArrowForward sx={{ fontSize: "20px", color: "#8477DA" }} />
              {/* <CustomIconButton
                handleClick={() => handleOpenEdit(params.row)}
                icon={
                  <ModeIcon sx={{ color: "white", fontSize: 18, pr: 0.4 }} />
                }
                buttonText="Edit"
              /> */}
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: { sm: "#F6F5FF", xs: "#FFFFFF" },
          // height: "98.2vh",
        }}
      >
        <Box
          sx={{
            display: { sm: "flex", xs: "block" },
            justifyContent: "space-between",
            alignItems: "center",
            // width: "99.5%",
            pr: { sm: 0, xs: 1 },
            pl: { sm: 0, xs: 1 },
            mb: 1,
          }}
        >
          <Typography
            sx={{ fontSize: 24, fontWeight: 600, lineHeight: "32.78px" }}
          >
            Customers
          </Typography>
          <Box
            sx={{
              display: { sm: "flex", xs: "block" },
              gap: 1,
              pt: { sm: 0, xs: 1 },
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box>
                <CustomInputField
                  id="input-with-icon-textfield"
                  placeholder="Search by name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={icon} alt="search input" />
                      </InputAdornment>
                    ),
                  }}
                  value={search}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, pt: { sm: 0, xs: 1 } }}>
              <Button
                variant="text"
                onClick={handleResetFilter}
                sx={{
                  p: "6px 8px !important",
                  fontFamily: '"Roboto",sans-serif !important',
                }}
                // sx={{ lineHeight: "21.86px" }}
              >
                Clear Filter
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            border: "1px solid #D0D5DD",
            borderRadius: "8px",
            width: "99.88%",
            m: "auto",
            overflow: "hidden",
            mt: 2,
          }}
        >
          <div className="CustomerTable-1">
            {filteredData.length >= 1 ? (
              <>
                <DataGrid
                  loading={isFetching}
                  style={{ border: "none" }}
                  getRowId={(row) => row._id}
                  // rows={filteredData.slice(
                  //   (page - 1) * itemsPerPage,
                  //   page * itemsPerPage
                  // )}
                  disableColumnFilter
                  disableColumnMenu
                  rows={filteredData}
                  columns={CustomerColumns.concat(actionColumn)}
                  pageSize={itemsPerPage}
                  rowCount={
                    customersList?.totalRecords
                      ? customersList?.totalRecords
                      : 0
                  }
                  // rowCount={filteredData.length}
                  sx={{ width: "100%" }}
                  hideFooter
                  rowHeight={70}
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
