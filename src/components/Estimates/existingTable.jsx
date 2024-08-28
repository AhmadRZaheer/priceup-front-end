import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
  CircularProgress,
  Button,
  useMediaQuery,
  
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import {
  useDeleteEstimates,
  useFetchDataEstimate,
  useGetEstimates,
} from "@/utilities/ApiHooks/estimate";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedItem,
  resetState,
  setisCustomizedDoorWidth,
  setDoorWeight,
  setDoorWidth,
  // setListData,
  setNavigationDesktop,
  setPanelWeight,
  setQuoteState,
  setReturnWeight,
  updateMeasurements,
  getListData,
} from "@/redux/estimateCalculations";
import PlusWhiteIcon from "@/Assets/plus-white.svg";
import { useNavigate } from "react-router-dom";
import { backendURL, calculateAreaAndPerimeter, calculateTotal } from "@/utilities/common";
import { DataGrid } from "@mui/x-data-grid";
import { EstimatesColumns } from "@/utilities/DataGridColumns";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/Modal/deleteModal";
import { getEstimatesListRefetch } from "@/redux/refetch";
import {
  generateObjectForPDFPreview,
  renderMeasurementSides,
  setStateForShowerEstimate,
} from "@/utilities/estimates";
import { EstimateCategory, quoteState } from "@/utilities/constants";
import { getLocationShowerSettings } from "@/redux/locationSlice";
import {
  resetEstimateState,
  setEstimateCategory,
  setEstimateState,
} from "@/redux/estimateSlice";
import {
  resetMirrorEstimateState,
  setEstimateMeasurements,
  setSelectedItem,
} from "@/redux/mirrorsEstimateSlice";
import { setStateForMirrorEstimate } from "@/utilities/mirrorEstimates";
import NewPagination from "../Pagination";
import { debounce } from "lodash";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import DefaultImage from "../ui-components/defaultImage";
import ActionsDropdown from "../common/ActionsDropdown";

import {
  DeleteOutline,
  Edit,
  ManageSearch,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";

// const debounce = (func, delay) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };

export default function ExistingTable({ searchValue, statusValue, dateValue }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const routePrefix = `${backendURL}/estimates`;
  const refetchEstimatesCounter = useSelector(getEstimatesListRefetch);
  // const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const useStyles = makeStyles({
    overflowText: {
      maxWidth: "115px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  });
  const classes = useStyles();
  // const [inputPage, setInputPage] = useState("");
  // const [isShowInput, setIsShowInput] = useState(false);
  const itemsPerPage = 10;
  let fetchAllEstimatesUrl = `${routePrefix}?page=${page}&limit=${itemsPerPage}`;
  if (searchValue && searchValue.length) {
    fetchAllEstimatesUrl += `&search=${searchValue}`;
  }
  if (statusValue) {
    fetchAllEstimatesUrl += `&status=${statusValue}`;
  }
  if (dateValue) {
    fetchAllEstimatesUrl += `&date=${dateValue}`
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
  }, [estimatesList, searchValue]);

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

  // const handleCreateQuote = () => {
  //   dispatch(resetMirrorEstimateState());
  //   dispatch(resetEstimateState());
  //   dispatch(resetState());
  //   dispatch(setisCustomizedDoorWidth(false));
  //   dispatch(setQuoteState("create"));
  //   navigate("/estimates/dimensions");
  // };
  useEffect(() => {
    refetchEstimatesList();
  }, [refetchEstimatesCounter, page, statusValue, dateValue]);

  const debouncedRefetch = useCallback(
    debounce(() => {
      if (page === 1) {
        refetchEstimatesList();
      } else {
        setPage(1);
      }
    }, 700),
    [page]
  );
  
  useEffect(() => {
    debouncedRefetch();
    // Cleanup function to cancel debounce if component unmounts
    return () => {
      debouncedRefetch.cancel();
    };
  }, [searchValue]);

  const dropdownActions = [
    {
      title: "Edit",
      handleClickItem: handleIconButtonClick,
      icon: <Edit />,
    },
    {
      title: "PDF",
      handleClickItem: handlePreviewPDFClick,
      icon: <RemoveRedEyeOutlined />,
    },
    {
      title: "Delete",
      handleClickItem: handleOpenDeleteModal,
      icon: <DeleteOutline sx={{ color: "white", fontSize: 18, mr: 0.4 }} />,
      severity: "error",
    },
  ];

  // const debouncedRefetch = useCallback(
  //   debounce(() => {
  //     if (page === 1) {
  //       refetchEstimatesList();
  //     } else {
  //       setPage(1);
  //     }
  //   }, 500),
  //   [searchValue]
  // );

  // useEffect(() => {
  //   debouncedRefetch();
  // }, [searchValue]);

  // useEffect(() => {
  //   refetchEstimatesList();
  // }, [page])
  console.log(estimatesList, "estimatesList", estimatesListFetching);
  return (
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
        {isMobile ? (
          filteredData?.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: 2,
                borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
                px:{sm:0,xs:0.8}
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "100%",
                    overflow: "hidden",
                  }}
                >
                  <DefaultImage
                    image={item?.creatorData?.image}
                    name={item?.creatorData?.name}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: "flex", gap: 0.6 }}>
                    <Typography className={classes.overflowText}>
                      {item?.creatorData?.name}
                    </Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: "Medium" }}>
                      {" "}
                      - Creator
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.6 }}>
                    <Typography sx={{ fontSize: 14 }}>
                      {item?.customerData?.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}> - Customer</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  width: 100,
                  alignItems: "center",
                }}
              >
                <ActionsDropdown item={item} actions={dropdownActions} />
                <Typography sx={{ fontWeight: "Medium", fontSize: 12 }}>
                  {new Date(item?.updatedAt).toDateString()}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
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
              estimatesList?.totalRecords ? estimatesList?.totalRecords : 0
            }
            sx={{ width: "100%" }}
            rowHeight={70.75}
            hideFooter
            disableColumnMenu
          />
        )}
         <Pagination
            totalRecords={
              estimatesList?.totalRecords ? estimatesList?.totalRecords : 0
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

        

        
        // <Box >
          // <DataGrid
          //   loading={estimatesListFetching}
          //   style={{
          //     border: "none",
          //   }}
          //   getRowId={(row) => row._id}
          //   rows={filteredData}
          //   columns={EstimatesColumns(
          //     handleOpenDeleteModal,
          //     handleIconButtonClick,
          //     handlePreviewPDFClick
          //   )}
          //   page={page}
          //   pageSize={itemsPerPage}
          //   rowCount={
          //     estimatesList?.totalRecords ? estimatesList?.totalRecords : 0
          //   }
          //   sx={{ width: "100%" }}
          //   rowHeight={70.75}
          //   hideFooter
          //   disableColumnMenu
          // />
          // <Pagination
          //   totalRecords={
          //     estimatesList?.totalRecords ? estimatesList?.totalRecords : 0
          //   }
          //   itemsPerPage={itemsPerPage}
          //   page={page}
          //   setPage={setPage}
          // />
          // <DeleteModal
          //   open={deleteModalOpen}
          //   text={"Estimates"}
          //   close={() => {
          //     setDeleteModalOpen(false);
          //   }}
          //   isLoading={LoadingForDelete}
          //   handleDelete={handleDeleteEstimate}
          // />
        // </Box>
      )}
    </Box>
  );
}
