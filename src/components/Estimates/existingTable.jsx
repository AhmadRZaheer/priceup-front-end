import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDeleteEstimates } from "../../utilities/ApiHooks/estimate";
import { useDispatch } from "react-redux";
import {
  addSelectedItem,
  resetState,
  setisCustomizedDoorWidth,
  setDoorWeight,
  setDoorWidth,
  setListData,
  setNavigationDesktop,
  setPanelWeight,
  setQuoteState,
  setReturnWeight,
  updateMeasurements,
} from "../../redux/estimateCalculations";
import PlusWhiteIcon from "../../Assets/plus-white.svg";
import { useNavigate } from "react-router-dom";
import { calculateAreaAndPerimeter } from "../../utilities/common";
import { DataGrid } from "@mui/x-data-grid";
import { EstimatesColumns } from "../../utilities/DataGridColumns";
import Pagination from "../Pagination";
import DeleteModal from "../Modal/deleteModal";
import { generateObjectForPDFPreview } from "../../utilities/estimates";

export default function ExistingTable({ estimatesList, allHardwaresList }) {
  const navigate = useNavigate();
  const { mutate: deleteEstimates, isSuccess: deletedSuccessfully, isLoading: LoadingForDelete } =
    useDeleteEstimates();
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord,setDeleteRecord] = useState(null);
  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  }
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const filteredData = estimatesList?.estimates?.filter((item) =>
    item?.customerData?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteEstimate = () => {
    deleteEstimates(deleteRecord);
    setDeleteModalOpen(false);
  };

  const handlePreviewPDFClick = (item) => {
    const formattedData = generateObjectForPDFPreview(allHardwaresList,item);
    localStorage.setItem('pdf-estimate',JSON.stringify(formattedData));
    navigate(`/estimates/${item?._id}/pdf-preview`);
  }

  const handleIconButtonClick = (item) => {
    dispatch(resetState());
    dispatch(setListData(allHardwaresList));
    // dispatch(
    //   initializeStateForEditQuote({
    //     estimateData: item,
    //     quotesId: item._id,
    //   })
    // );
    dispatch(setisCustomizedDoorWidth(item.isCustomizedDoorWidth));
    dispatch(updateMeasurements(item.measurements));
    dispatch(addSelectedItem(item));
    dispatch(setQuoteState("edit"));
    const result = calculateAreaAndPerimeter(
      item.measurements,
      item?.settings?.variant,
      item.glassType.thickness
    );
    if (result?.doorWidth && item.isCustomizedDoorWidth === false) {
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
    if (item?.layout_id) {  // default layout edit
      dispatch(setNavigationDesktop("measurements"));
    } else { // custom layout edit
      dispatch(setNavigationDesktop("custom"));
    }
  };

  const handleCreateQuote = () => {
    dispatch(resetState());
    dispatch(setListData(allHardwaresList));
    dispatch(setQuoteState("create"));
    dispatch(setNavigationDesktop("layouts"));
    navigate("/estimates/steps");
  };

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
          //   disabled={estimateDataFetching}
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
      {filteredData?.length === 0 ? (
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
            rows={filteredData?.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            )}
            columns={EstimatesColumns(
              handleOpenDeleteModal,
              handleIconButtonClick,
              handlePreviewPDFClick
            )}
            page={page}
            pageSize={itemsPerPage}
            rowCount={filteredData ? filteredData?.length : 0}
            sx={{ width: "100%" }}
            hideFooter
          />
          <Pagination
            rows={filteredData}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
          <DeleteModal
          open={deleteModalOpen}
          close={()=>{setDeleteModalOpen(false)}}
          isLoading={LoadingForDelete}
          handleDelete={handleDeleteEstimate}
          />
        </Box>
      )}
    </>
  );
}
