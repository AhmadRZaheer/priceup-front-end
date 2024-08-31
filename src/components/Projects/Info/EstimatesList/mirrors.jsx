import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EstimatesColumns } from "@/utilities/DataGridColumns";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/Modal/deleteModal";
import { useDeleteEstimates } from "@/utilities/ApiHooks/estimate";
import { EstimateCategory } from "@/utilities/constants";
import { backendURL } from "@/utilities/common";
import { Add, Edit, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { resetMirrorEstimateState, setMirrorProjectId } from "@/redux/mirrorsEstimateSlice";
// import { resetEstimateState, setEstimateCategory, setEstimateState } from "@/redux/estimateSlice";
import { makeStyles } from "@material-ui/core";
import DefaultImage from "@/components/ui-components/defaultImage";
import { setStateForMirrorEstimate } from "@/utilities/mirrorEstimates";
import { debounce } from "lodash";
const { useFetchAllDocuments } = require("@/utilities/ApiHooks/common");

// const debounce = (func, delay) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };
const routePrefix = `${backendURL}/estimates`;

const MirrorEstimatesList = ({ projectId, statusValue, dateValue, searchValue }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  // const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useStyles = makeStyles({
    overflowText: {
      maxWidth: "115px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  });
  const classes = useStyles();
  const itemsPerPage = 10;
  let fetchAllEstimatesUrl = `${routePrefix}/by-project/${projectId}?page=${page}&limit=${itemsPerPage}&category=${EstimateCategory.MIRRORS}`;
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
  const {
    mutate: deleteEstimates,
    isSuccess: deletedSuccessfully,
    isLoading: LoadingForDelete,
  } = useDeleteEstimates();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  };
  const handleDeleteEstimate = () => {
    deleteEstimates(deleteRecord);
    setDeleteModalOpen(false);
  };
  const handlePreviewPDFClick = (item) => {
    console.log(item, "item");
  };

  const handleIconButtonClick = (item) => {
    setStateForMirrorEstimate(item, dispatch, navigate);
  };
  // const handleCreateQuote = () => {
  //     console.log('create quote');
  //     dispatch(resetMirrorEstimateState());
  //     dispatch(resetEstimateState());
  //     dispatch(setMirrorProjectId(projectId));
  //     dispatch(setEstimateCategory(EstimateCategory.MIRRORS));
  //     dispatch(setEstimateState("create"));
  //     navigate("/estimates/dimensions");
  // };
  const filteredData = useMemo(() => {
    if (estimatesList && estimatesList?.estimates?.length) {
      return estimatesList?.estimates;
    } else {
      return [];
    }
  }, [estimatesList, searchValue]);
  useEffect(() => {
    refetchEstimatesList();
  }, [page, deletedSuccessfully, projectId, statusValue, dateValue]);

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
  // const handleChange = (e) => {
  //   setSearch(e.target.value);
  //   debouncedRefetch();
  // };
  return (
    <>
      {/* <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: 2,
                paddingX: isMobile ? 0.5 : 2,
            }}
        >
            <Typography sx={{ fontSize: isMobile ? 18 : 20, fontWeight: "bold", color: "#101828" }}>
                Estimates
            </Typography>
            Search input field */}
      {/*  <TextField
                placeholder="Search by Customer Name"
                value={search}
                variant="standard"
                onChange={(e) => handleChange(e)}
                sx={{
                    mb: 2,
                    ".MuiInputBase-root:after": {
                        border: "1px solid #8477DA",
                    },
                    width: isMobile ? '150px' : 'auto'
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
                disabled={estimatesListFetching}
                sx={{
                    backgroundColor: "#8477DA",
                    color: "white",
                    "&:hover": { backgroundColor: "#8477DA" },
                    borderRadius: 1,
                    padding: 1,
                    fontSize: 16,
                    height: 35,
                }}
            >
                <Add sx={{ color: "white" }} />
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
            background: "#FFFF",
            pb: 3,
          }}
        >
          <CircularProgress sx={{ color: "#8477DA" }} />
        </Box>
      ) : filteredData?.length === 0 && !estimatesListFetching ? (
        <Typography
          sx={{
            color: "#667085",
            p: 2,
            textAlign: "center",
            background: "#FFFF",
          }}
        >
          No Estimate Found
        </Typography>
      ) : (
        <Box sx={{ background: "#FFFF", pb: 3 }}>
          {isMobile ? (
            filteredData?.map((item) => (
              <Box
                key={item._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingY: 2,
                  borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
                  background: "#FFFF",
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
                  }}
                >
                  <Typography color="red" marginRight={3}></Typography>

                  <Button
                    onClick={() => handleIconButtonClick(item)}
                    sx={{
                      height: 25,
                      color: "white",
                      background: "#8477DA",
                      "&:hover": { background: "#8477DA" },
                      width: "fit-content",
                      margin: "0px auto",
                    }}
                    disabled={estimatesListFetching}
                  >
                    <Edit
                      sx={{
                        color: "white",
                        fontSize: 16,
                        marginRight: "5px",
                      }}
                    />
                    Edit
                  </Button>
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
              rowHeight={70}
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
            close={() => {
              setDeleteModalOpen(false);
            }}
            isLoading={LoadingForDelete}
            handleDelete={handleDeleteEstimate}
          />
        </Box>
      )}
    </>
  );
};

export default MirrorEstimatesList;
