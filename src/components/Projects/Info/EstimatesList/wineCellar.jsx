import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EstimatesColumns } from "@/utilities/DataGridColumns";
import {
  Box,
  Button,
  // CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/Modal/deleteModal";
import { useDeleteEstimates } from "@/utilities/ApiHooks/estimate";
import { EstimateCategory, quoteState } from "@/utilities/constants";
import {
  backendURL,
  calculateAreaAndPerimeter,
  calculateTotal,
} from "@/utilities/common";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultImage from "@/components/ui-components/defaultImage";
import { setStateForWineCellarEstimate } from "@/utilities/WineCellarEstimate";
import { getLocationPdfSettings, getLocationWineCellarSettings } from "@/redux/locationSlice";
import { debounce } from "lodash";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import {
  generateObjectForPDFPreview,
  renderMeasurementSides,
} from "@/utilities/estimates";
import { GenrateColumns, GenrateRows } from "@/utilities/skeltonLoading";

const { useFetchAllDocuments } = require("@/utilities/ApiHooks/common");
const routePrefix = `${backendURL}/estimates`;

const WineCellarEstimatesList = ({
  projectId,
  statusValue,
  dateValue,
  searchValue,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wineCellarHardwareList = useSelector(getWineCellarsHardware);
  const wineCellarLocationSettings = useSelector(getLocationWineCellarSettings);
  const pdfSettings = useSelector(getLocationPdfSettings);
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
  let fetchAllEstimatesUrl = `${routePrefix}/by-project/${projectId}?page=${page}&limit=${itemsPerPage}&category=${EstimateCategory.WINECELLARS}`;
  if (searchValue && searchValue.length) {
    fetchAllEstimatesUrl += `&search=${searchValue}`;
  }
  if (statusValue) {
    fetchAllEstimatesUrl += `&status=${statusValue}`;
  }
  if (dateValue) {
    fetchAllEstimatesUrl += `&date=${dateValue}`;
  }
  const {
    data: estimatesList,
    isFetched,
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
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  };
  const handleDeleteEstimate = () => {
    deleteEstimates(deleteRecord);
    setDeleteModalOpen(false);
  };
  const handlePreviewPDFClick = (item) => {
    const formattedData = generateObjectForPDFPreview(
      wineCellarHardwareList,
      item,
      wineCellarLocationSettings?.miscPricing
    );
    const pricing = calculateTotal(
      formattedData,
      formattedData?.sqftArea,
      wineCellarLocationSettings
    );
    const measurementString = renderMeasurementSides(
      quoteState.EDIT,
      formattedData?.measurements,
      formattedData?.layout_id
    );

    const { doorWeight, panelWeight, returnWeight } = calculateAreaAndPerimeter(
      item.config.measurements,
      item?.settings?.variant,
      item?.config?.glassType?.thickness,
      { doorQuantity: item.config.doorQuantity }
    );

    const id = item?._id;
    localStorage.setItem(
      "pdf-estimate",
      JSON.stringify({
        ...formattedData,
        measurements: measurementString,
        pricing,
        id,
        doorWeight,
        panelWeight,
        returnWeight,
        pdfSettings,
      })
    );
    navigate(`/estimates/${item?._id}/pdf-preview`);
  };

  const handleIconButtonClick = (item) => {
    setStateForWineCellarEstimate(item, dispatch, navigate);
  };
  const filteredData = useMemo(() => {
    if (estimatesList && estimatesList?.estimates?.length) {
      return estimatesList?.estimates;
    } else {
      return [];
    }
  }, [estimatesList, searchValue]);

  const debouncedRefetch = useCallback(
    debounce(() => {
      // Always refetch when page is 1, else reset page to 1 to trigger refetch
      if (page !== 1) {
        setPage(1); // This will trigger a refetch due to the useEffect watching `page`
      } else {
        refetchEstimatesList(); // If already on page 1, just refetch directly
      }
    }, 700),
    [page, refetchEstimatesList] // Ensure refetchEstimatesList is included in dependencies
  );
  const SkeletonColumnsGenerated = GenrateColumns([
    "Creator",
    "Customer",
    "Estimate Category",
    "Layout",
    "Date quoted",
    "Estimate total",
    "Status",
    "Actions",
  ]);
  const SkeletonRowsGenerated = GenrateRows([1, 2, 3, 4, 5]);
  useEffect(() => {
    // Reset page to 1 if filters (statusValue, dateValue, or searchValue) change
    if (statusValue || dateValue || searchValue) {
      setPage(1);
    }
    if (searchValue) {
      debouncedRefetch();
      return () => {
        debouncedRefetch.cancel();
      };
    } else {
      refetchEstimatesList();
    }
  }, [
    statusValue,
    dateValue,
    searchValue,
    page,
    deletedSuccessfully,
    projectId,
  ]);

  useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);

  return (
    <>
      {isLoading ? (
        <Box>
          <DataGrid
            getRowId={(row) => row._id}
            rows={SkeletonRowsGenerated}
            columns={SkeletonColumnsGenerated}
            page={1}
            pageSize={10}
            className="table"
            hideFooter
            disableColumnMenu
            pagination={false}
          />
        </Box>
      ) : filteredData?.length > 0 ? (
        <Box
          sx={{
            background: "#FFFF",
            pb: isMobile ? 3 : 0,
            borderRadius: "8px",
          }}
        >
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
              sx={{
                width: "100%",
              }}
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
      ) : (
        <Typography
          sx={{
            color: "#667085",
            p: 2,
            textAlign: "center",
            background: "#FFFF",
            borderRadius: "12px",
          }}
        >
          No Estimate Found
        </Typography>
      )}
    </>
  );
};

export default WineCellarEstimatesList;
