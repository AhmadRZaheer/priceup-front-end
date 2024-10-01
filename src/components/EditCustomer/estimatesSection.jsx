import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import image1 from "@/Assets/test.png";
import image2 from "@/Assets/ok.png";
import image3 from "@/Assets/cancel.png";
import image4 from "@/Assets/calculator.svg";
import {
  useDeleteEstimates,
  useGetEstimatesStats,
} from "@/utilities/ApiHooks/estimate";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  backendURL,
  calculateTotal,
  getDecryptedToken,
} from "@/utilities/common";
import { EstimateCategory, quoteState } from "@/utilities/constants";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";
import WidgetCard from "../ui-components/widgetCard";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import StatusChip from "../common/StatusChip";
import dayjs from "dayjs";
import DeleteModal from "../Modal/deleteModal";
import Pagination from "../Pagination";
import { DataGrid } from "@mui/x-data-grid";
import { EstimatesColumns } from "@/utilities/DataGridColumns";
import ActionsDropdown from "../common/ActionsDropdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getEstimatesListRefetch } from "@/redux/refetch";
import { useDispatch, useSelector } from "react-redux";
import { getListData } from "@/redux/estimateCalculations";
import { getLocationShowerSettings } from "@/redux/locationSlice";
import { debounce } from "lodash";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { DeleteOutline, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import {
  generateObjectForPDFPreview,
  renderMeasurementSides,
  setStateForShowerEstimate,
} from "@/utilities/estimates";
import { setStateForMirrorEstimate } from "@/utilities/mirrorEstimates";

export default function Estimates() {
  const [searchParams] = useSearchParams();
  const CustomerId = searchParams.get("id");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const routePrefix = `${backendURL}/estimates/by-customer`;
  const refetchEstimatesCounter = useSelector(getEstimatesListRefetch);
  // const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const [inputPage, setInputPage] = useState("");
  // const [isShowInput, setIsShowInput] = useState(false);
  const itemsPerPage = 10;
  let fetchAllEstimatesUrl = `${routePrefix}/${CustomerId}?page=${page}&limit=${itemsPerPage}`;
  if (search && search.length) {
    fetchAllEstimatesUrl += `&search=${search}`;
  }
  if (status) {
    fetchAllEstimatesUrl += `&status=${status}`;
  }
  if (selectedDate) {
    fetchAllEstimatesUrl += `&date=${selectedDate}`;
  }
  const {
    data: estimatesList,
    isLoading,
    isFetching: estimatesListFetching,
    refetch: refetchEstimatesList,
  } = useFetchAllDocuments(fetchAllEstimatesUrl);
  const showersHardwareList = useSelector(getListData);
  const showersLocationSettings = useSelector(getLocationShowerSettings);
  // const {
  //   data: allHardwaresList,
  //   isLoading: listFetching,
  //   refetch: refetchHardwaresList,
  // } = useFetchDataEstimate();
  const {
    mutate: deleteEstimates,
    isSuccess: deletedSuccessfully,
    isLoading: LoadingForDelete,
  } = useDeleteEstimates();
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  };

  const filteredData = useMemo(() => {
    if (estimatesList && estimatesList?.estimates?.length) {
      return estimatesList?.estimates;
    } else {
      return [];
    }
  }, [estimatesList, search]);

  const handleDeleteEstimate = () => {
    deleteEstimates(deleteRecord);
    setDeleteModalOpen(false);
  };

  const handlePreviewPDFClick = (item) => {
    // console.log(item,'item');
    const formattedData = generateObjectForPDFPreview(
      showersHardwareList,
      item,
      showersLocationSettings?.miscPricing
    );
    const pricing = calculateTotal(
      formattedData,
      formattedData?.sqftArea,
      showersLocationSettings
    );
    const measurementString = renderMeasurementSides(
      quoteState.EDIT,
      formattedData?.measurements,
      formattedData?.layout_id
    );
    localStorage.setItem(
      "pdf-estimate",
      JSON.stringify({
        ...formattedData,
        measurements: measurementString,
        pricing,
      })
    );
    navigate(`/estimates/${item?._id}/pdf-preview`);
  };

  const handleIconButtonClick = (item) => {
    if (item?.category === EstimateCategory.SHOWERS) {
      setStateForShowerEstimate(item, dispatch, navigate);
    } else if (item?.category === EstimateCategory.MIRRORS) {
      setStateForMirrorEstimate(item, dispatch, navigate);
    }
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
        // Always refetch when page is 1, else reset page to 1 to trigger refetch
        if (page !== 1) {
            setPage(1);  // This will trigger a refetch due to the useEffect watching `page`
        } else {
          refetchEstimatesList();  // If already on page 1, just refetch directly
        }
    }, 700),
    [page, refetchEstimatesList]  // Ensure refetchEstimatesList is included in dependencies
);

useEffect(() => {
    // Reset page to 1 if filters (status, selectedDate, or search) change
    if (status || selectedDate || search) {
        setPage(1);
    }
    if (search) {
        debouncedRefetch();
        return () => {
            debouncedRefetch.cancel();
        };
    } else {
      refetchEstimatesList();
    }
}, [status, selectedDate, search, page, deletedSuccessfully, refetchEstimatesCounter]);

  const handleDateChange = (newDate) => {
    if (newDate) {
      // Set time to noon (12:00) to avoid time zone issues
      const adjustedDate = dayjs(newDate)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0);
      setSelectedDate(adjustedDate);
    } else {
      setSelectedDate(null);
    }
  };
  const handleResetFilter = () => {
    setSearch("");
    setStatus(null);
    setSelectedDate(null);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F6F5FF",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "start",
          // alignItems: "center",
          width: "100%",
          height: "auto",
          // overflow: "auto",
          // gap: "5px",
          // pr: 3,
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
            my: 1,
            pt: 3,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
            Estimates
          </Typography>
          <Box
            sx={{
              display: { sm: "flex", xs: "block" },
              gap: 1,
              pt: { sm: 0, xs: 1 },
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", mr: { sm: 0, xs: "26px" } }}>
              <Box>
                <CustomInputField
                  id="input-with-icon-textfield"
                  placeholder="Search by Customer Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={icon} alt="search input" />
                      </InputAdornment>
                    ),
                  }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
              <Box>
                <DesktopDatePicker
                  label="Date Added"
                  inputFormat="MM/DD/YYYY"
                  className="custom-textfield"
                  // maxDate={new Date()} // Sets the maximum date to the current date
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                      width: 150,
                      backgroundColor: "white", // Adjust height
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "0.875rem", // Adjust font size
                      padding: "8px 14px", // Adjust padding
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                      fontWeight: 400,
                      fontFamily: '"Roboto",sans-serif !important',
                      top: "-5px", // Adjust label size
                      color: "#000000",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, pt: { sm: 0, xs: 1 } }}>
              <FormControl sx={{ width: "152px" }} size="small">
                <Select
                  value={status}
                  displayEmpty
                  id="demo-select-small"
                  size="small"
                  className="custom-textfield"
                  sx={{ height: "40px" }}
                  onChange={(e) => setStatus(e.target.value)}
                  renderValue={(selected) => {
                    if (selected === null) {
                      return (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            // lineHeight: '16.41px',
                            color: "#000000",
                            fontFamily: '"Roboto",sans-serif !important',
                          }}
                        >
                          Status
                        </Typography>
                      );
                    }

                    return (
                      <StatusChip
                        variant={selected}
                        sx={{ padding: 0, px: 2 }}
                      />
                    );
                  }}
                >
                  <MenuItem value={"pending"}>
                    <StatusChip
                      variant={"pending"}
                      sx={{ padding: 0, px: 2 }}
                    />
                  </MenuItem>
                  <MenuItem value={"voided"}>
                    <StatusChip variant={"voided"} sx={{ padding: 0, px: 2 }} />
                  </MenuItem>
                  <MenuItem value={"approved"}>
                    <StatusChip
                      variant={"approved"}
                      sx={{ padding: 0, px: 2 }}
                    />
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="text"
                onClick={handleResetFilter}
                sx={{
                  p: "6px 8px !important",
                  fontFamily: '"Roboto",sans-serif !important',
                }}
              >
                Clear Filter
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "99.88%",
            border: "1px solid #D0D5DD",
            borderRadius: "8px",
            background: "#FFFFFF",
            mr: { sm: 0, xs: 1 },
            ml: { sm: 0, xs: 1 },
            mb: 2,
            mt: 2,
          }}
        >
          <Box>
            {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#101828" }}>
          Estimates
        </Typography> */}
            {/* Search input field */}
            {/* <TextField
          placeholder="Search by Customer Name"
          value={search}
          variant="standard"
          onChange={(e) => handleChange(e)}
          sx={{
            mb: 2,
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
        <IconButton
          onClick={handleCreateQuote}
          disabled={true}
          sx={{
            backgroundColor: "#8477DA",
            color: "white",
            "&:hover": { backgroundColor: "#8477DA" },
            borderRadius: 1,
            padding: 1,
            textTransform: "capitalize",
            fontSize: 16,
            height: 35,
          }}
        >
          <img
            width={"26px"}
            height={"20px"}
            src={PlusWhiteIcon}
            alt="plus icon"
          />
          Add
        </IconButton>
      </Box> */}

            {isLoading ? (
              <Box
                sx={{
                  width: 40,
                  m: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxHeight: "70vh",
                  minHeight: "20vh",
                }}
              >
                <CircularProgress sx={{ color: "#8477DA" }} />
              </Box>
            ) : filteredData?.length === 0 && !estimatesListFetching ? (
              <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
                No Estimate Found
              </Typography>
            ) : (
              <Box>
                <DataGrid
                  loading={estimatesListFetching}
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={filteredData}
                  columns={EstimatesColumns(
                    handleOpenDeleteModal,
                    handleIconButtonClick,
                    handlePreviewPDFClick
                  )}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={
                    estimatesList?.totalRecords
                      ? estimatesList?.totalRecords
                      : 0
                  }
                  sx={{ width: "100%",'.MuiDataGrid-main': {
                    borderRadius: '8px !important',
                } }}
                  rowHeight={70.75}
                  hideFooter
                  disableColumnMenu
                />

                <Pagination
                  totalRecords={
                    estimatesList?.totalRecords
                      ? estimatesList?.totalRecords
                      : 0
                  }
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
                <DeleteModal
                  open={deleteModalOpen}
                  text={"Estimates"}
                  close={() => {
                    setDeleteModalOpen(false);
                  }}
                  isLoading={LoadingForDelete}
                  handleDelete={handleDeleteEstimate}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
