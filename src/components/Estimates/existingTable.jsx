import { useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDeleteEstimates, useFetchDataEstimate, useGetEstimates } from "@/utilities/ApiHooks/estimate";
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
import { calculateAreaAndPerimeter, calculateTotal } from "@/utilities/common";
import { DataGrid } from "@mui/x-data-grid";
import { EstimatesColumns } from "@/utilities/DataGridColumns";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/Modal/deleteModal";
import { getEstimatesListRefetch } from "@/redux/refetch";
import { generateObjectForPDFPreview, renderMeasurementSides } from "@/utilities/estimates";
import { EstimateCategory, quoteState } from "@/utilities/constants";
import { getLocationShowerSettings } from "@/redux/locationSlice";
import { resetEstimateState, setEstimateCategory, setEstimateState } from "@/redux/estimateSlice";
import { resetMirrorEstimateState, setEstimateMeasurements, setSelectedItem } from "@/redux/mirrorsEstimateSlice";

export default function ExistingTable() {
  const navigate = useNavigate();
  const refetchEstimatesCounter = useSelector(getEstimatesListRefetch);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { data: estimatesList,
    isLoading: estimatesListFetching,
    refetch: refetchEstimatesList,
  } = useGetEstimates(page, itemsPerPage);
  const showersHardwareList = useSelector(getListData);
  const showersLocationSettings = useSelector(getLocationShowerSettings);
  // const {
  //   data: allHardwaresList,
  //   isLoading: listFetching,
  //   refetch: refetchHardwaresList,
  // } = useFetchDataEstimate();
  const { mutate: deleteEstimates, isSuccess: deletedSuccessfully, isLoading: LoadingForDelete } =
    useDeleteEstimates();
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  }

  const filteredData = useMemo(() => {
    if (estimatesList && estimatesList?.estimates?.length) {
      return estimatesList?.estimates?.filter((item) =>
        item?.customerData?.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    else {
      return [];
    }
  }, [estimatesList, search]);

  const handleDeleteEstimate = () => {
    deleteEstimates(deleteRecord);
    setDeleteModalOpen(false);
  };

  const handlePreviewPDFClick = (item) => {
    // console.log(item,'item');
    const formattedData = generateObjectForPDFPreview(showersHardwareList, item, showersLocationSettings?.miscPricing);
    const pricing = calculateTotal(formattedData, formattedData?.sqftArea, showersLocationSettings);
    const measurementString = renderMeasurementSides(quoteState.EDIT, formattedData?.measurements, formattedData?.layout_id);
    localStorage.setItem('pdf-estimate', JSON.stringify({ ...formattedData, measurements: measurementString, pricing }));
    navigate(`/estimates/${item?._id}/pdf-preview`);
  }

  const handleIconButtonClick = (item) => {
    if (item?.category === EstimateCategory.SHOWERS) {
      dispatch(setEstimateCategory(EstimateCategory.SHOWERS));
      dispatch(setEstimateState(quoteState.EDIT));
      dispatch(resetState());
      dispatch(setisCustomizedDoorWidth(item.config.isCustomizedDoorWidth));
      dispatch(updateMeasurements(item.config.measurements));
      dispatch(addSelectedItem(item));
      dispatch(setQuoteState("edit"));
      const result = calculateAreaAndPerimeter(
        item.config.measurements,
        item?.settings?.variant,
        item.config.glassType.thickness
      );
      if (result?.doorWidth && item.config.isCustomizedDoorWidth === false) {
        dispatch(setDoorWidth(result?.doorWidth));
      } else {
        dispatch(setDoorWidth(item?.doorWidth));
      }
      if (result?.doorWeight) {
        dispatch(setDoorWeight(result?.doorWeight));
      }
      if (result?.panelWeight) {
        dispatch(setPanelWeight(result?.panelWeight));
      }
      if (result?.returnWeight) {
        dispatch(setReturnWeight(result?.returnWeight));
      }
      navigate('/estimates/dimensions');
    }
    else if (item?.category === EstimateCategory.MIRRORS) {
      dispatch(setEstimateCategory(EstimateCategory.MIRRORS));
      dispatch(setEstimateState(quoteState.EDIT));
      dispatch(resetMirrorEstimateState());
      dispatch(setSelectedItem(item));
      dispatch(setEstimateMeasurements(item.config.measurements));
      console.log('mirror edit', item);
      navigate('/estimates/dimensions');
    }
    // if (item?.config?.layout_id) {  // default layout edit
    //   dispatch(setNavigationDesktop("measurements"));
    // } else { // custom layout edit
    //   dispatch(setNavigationDesktop("custom"));
    // }
  };

  const handleCreateQuote = () => {
    dispatch(resetMirrorEstimateState());
    dispatch(resetEstimateState());
    navigate("/estimates/category");
  };
  useEffect(() => {
    refetchEstimatesList();
  }, [refetchEstimatesCounter]);

  useEffect(() => {
    refetchEstimatesList();
  }, [page])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#101828" }}>
          Estimates
        </Typography>
        {/* Search input field */}
        <TextField
          placeholder="Search by Customer Name"
          value={search}
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
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
          disabled={estimatesListFetching}
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
      </Box>
      {estimatesListFetching ?
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
        : filteredData?.length === 0 && !estimatesListFetching ? (
          <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
            No Estimates Found
          </Typography>
        ) : (
          <Box>
            <DataGrid
              style={{
                border: "none",
              }}
              getRowId={(row) => row._id}
              // rows={filteredData?.slice(
              //   (page - 1) * itemsPerPage,
              //   page * itemsPerPage
              // )}
              rows={filteredData}
              columns={EstimatesColumns(
                handleOpenDeleteModal,
                handleIconButtonClick,
                handlePreviewPDFClick
              )}
              page={page}
              pageSize={itemsPerPage}
              rowCount={estimatesList?.totalRecords ? estimatesList?.totalRecords : 0}
              sx={{ width: "100%" }}
              hideFooter
            />
            <Pagination
              totalRecords={estimatesList?.totalRecords ? estimatesList?.totalRecords : 0}
              itemsPerPage={itemsPerPage}
              page={page}
              setPage={setPage}
            />
            <DeleteModal
              open={deleteModalOpen}
              close={() => { setDeleteModalOpen(false) }}
              isLoading={LoadingForDelete}
              handleDelete={handleDeleteEstimate}
            />
          </Box>
        )}
    </>
  );
}
