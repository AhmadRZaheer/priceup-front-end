import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { CustomerQuoteColumns } from "@/utilities/DataGridColumns";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Close, Edit } from "@mui/icons-material";
import CustomIconButton from "@/components/ui-components/CustomButton";
import { useFetchDataCustomerEstimates } from "@/utilities/ApiHooks/customer";
import Pagination from "@/components/Pagination";
import { EstimateCategory } from "@/utilities/constants";
import { setStateForShowerEstimate } from "@/utilities/estimates";
import { setStateForMirrorEstimate } from "@/utilities/mirrorEstimates";
import NewPagination from "../Pagination/new_index";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  borderRadius: "12px",
  p: 4,
  justifyContent: "end",
  alignItem: "end",
};

const dataGridStyle = {
  background: "white",
};

export default function CustomerEstimatesTable({ open, close, quoteId }) {
  // const refetchData = useSelector(getDataRefetch);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [isShowInput, setIsShowInput] = useState(false);
  const itemsPerPage = 10;
  //   const {
  //     data: allHardwaresList,
  //     isFetching: listFetching,
  //     refetch: refetchHardwaresList,
  //   } = useFetchDataEstimate();
  const {
    mutate: setQuoteId,
    data: estimatesList,
    isLoading: estimateQuoteFetching,
    error,
  } = useFetchDataCustomerEstimates(page, itemsPerPage);
  // useEffect(() => {
  //   Refetched();
  // }, [refetchData]);
  //   useEffect(() => {
  //     refetchHardwaresList();
  //   }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (open && quoteId !== null && quoteId !== undefined) {
      setQuoteId({ quoteId });
    }
  }, [open, quoteId, setQuoteId]);

  const handleIconButtonClick = (item) => {
    console.log(item, "item");
    if (item?.category === EstimateCategory.SHOWERS) {
      setStateForShowerEstimate(item, dispatch, navigate);
    } else if (item?.category === EstimateCategory.MIRRORS) {
      setStateForMirrorEstimate(item, dispatch, navigate);
    }
    // dispatch(resetState());
    // dispatch(setListData(allHardwaresList));
    // dispatch(setisCustomizedDoorWidth(item.isCustomizedDoorWidth));
    // dispatch(updateMeasurements(item.measurements));
    // dispatch(addSelectedItem(item));
    // dispatch(setQuoteState("edit"));
    // const result = calculateAreaAndPerimeter(
    //   item.measurements,
    //   item?.settings?.variant,
    //   item.glassType.thickness
    // );
    // if (result?.doorWidth && item.isCustomizedDoorWidth === false) {
    //   dispatch(setDoorWidth(result?.doorWidth));
    // } else {
    //   dispatch(setDoorWidth(item?.doorWidth));
    // }
    // if (result?.doorWeight) {
    //   dispatch(setDoorWeight(result?.doorWeight));
    // }
    // if (result?.panelWeight) {
    //   dispatch(setPanelWeight(result?.panelWeight));
    // }
    // if (result?.returnWeight) {
    //   dispatch(setReturnWeight(result?.returnWeight));
    // }
    // if (item?.layout_id) {  // default layout edit
    //   dispatch(setNavigationDesktop("measurements"));
    // } else { // custom layout edit
    //   dispatch(setNavigationDesktop("custom"));
    // }
  };

  const actionColumn = [
    {
      field: "Status",
      align: "left",
      width: 80,
      renderCell: (params) => {
        // console.log(params);
        return (
          <>
            {/* <Link to="/customers/steps"> */}
            <CustomIconButton
              disable={estimateQuoteFetching}
              handleClick={() => handleIconButtonClick(params?.row)}
              icon={<Edit sx={{ color: "white", fontSize: 18, mr: 0.4 }} />}
            />
            {/* </Link> */}
          </>
        );
      },
    },
  ];

  const filteredData = useMemo(() => {
    if (estimatesList && estimatesList?.estimates?.length) {
      return estimatesList?.estimates;
    } else {
      return [];
    }
  }, [estimatesList]);

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        sx={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItem: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
              Estimates
            </Typography>
            <Close
              onClick={close}
              sx={{ color: "gray", fontSize: 24, cursor: "pointer" }}
            />
          </Box>
          {estimateQuoteFetching ? (
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <CircularProgress sx={{ color: "#8477DA" }} />
            </Box>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : filteredData && filteredData.length > 0 ? (
            <Box
              sx={{ border: "1px solid #EAECF0", borderRadius: "8px", mb: 2 }}
            >
              <DataGrid
                style={dataGridStyle}
                getRowId={(row) => row._id}
                // rows={estimates?.slice(
                //   (page - 1) * itemsPerPage,
                //   page * itemsPerPage
                // )}
                rows={filteredData}
                columns={CustomerQuoteColumns.concat(actionColumn)}
                page={page}
                pageSize={itemsPerPage}
                // rowCount={estimates?.length}
                rowCount={
                  estimatesList?.totalRecords ? estimatesList?.totalRecords : 0
                }
                // pageSizeOptions={[1, , 25]}
                sx={{ width: "100%" }}
                hideFooter
              />
              {/* <Pagination
                                totalRecords={estimatesList?.totalRecords ? estimatesList?.totalRecords : 0}
                                itemsPerPage={itemsPerPage}
                                page={page}
                                setPage={setPage}
                            /> */}
              <NewPagination
                totalRecords={
                  estimatesList?.totalRecords ? estimatesList?.totalRecords : 0
                }
                setIsShowInput={setIsShowInput}
                isShowInput={isShowInput}
                setInputPage={setInputPage}
                inputPage={inputPage}
                page={page}
                setPage={setPage}
              />
            </Box>
          ) : (
            <Typography>No estimates found.</Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Button
              variant="outlined"
              onClick={close}
              sx={{
                color: "#101828",
                border: "1px solid black",
                width: "120px",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
