import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EstimatesColumns } from "@/utilities/DataGridColumns";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/Modal/deleteModal";
import { useDeleteEstimates } from "@/utilities/ApiHooks/estimate";
import { EstimateCategory, quoteState } from "@/utilities/constants";
import { backendURL, calculateTotal } from "@/utilities/common";
import { Add, Edit, Search } from "@mui/icons-material";
// import { resetEstimateState, setEstimateCategory, setEstimateState } from "@/redux/estimateSlice";
import { getListData, resetState, setShowerProjectId } from "@/redux/estimateCalculations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultImage from "@/components/ui-components/defaultImage";
import { generateObjectForPDFPreview, renderMeasurementSides, setStateForShowerEstimate } from "@/utilities/estimates";
import { getLocationShowerSettings } from "@/redux/locationSlice";
const { useFetchAllDocuments } = require("@/utilities/ApiHooks/common")

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
const routePrefix = `${backendURL}/estimates`;

const ShowerEstimatesList = ({ projectId }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showersHardwareList = useSelector(getListData);
    const showersLocationSettings = useSelector(getLocationShowerSettings);
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
    const {
        data: estimatesList,
        isLoading,
        isFetching: estimatesListFetching,
        refetch: refetchEstimatesList,
    } = useFetchAllDocuments(`${routePrefix}/by-project/${projectId}?page=${page}&limit=${itemsPerPage}&search=${search}&category=${EstimateCategory.SHOWERS}`);
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
        console.log(item, 'item');
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
        setStateForShowerEstimate(item, dispatch, navigate);
    };
    // const handleCreateQuote = () => {
    //     dispatch(resetEstimateState());
    //     dispatch(resetState());
    //     dispatch(setShowerProjectId(projectId));
    //     dispatch(setEstimateCategory(EstimateCategory.SHOWERS));
    //     dispatch(setEstimateState("create"));
    //     navigate("/estimates/layouts");
    // };
    const filteredData = useMemo(() => {
        if (estimatesList && estimatesList?.estimates?.length) {
            return estimatesList?.estimates;
        } else {
            return [];
        }
    }, [estimatesList, search]);
    useEffect(() => {
        refetchEstimatesList();
    }, [page, deletedSuccessfully, projectId]);

    const debouncedRefetch = useCallback(
        debounce(() => {
            if (page === 1) {
                refetchEstimatesList();
            }
            else {
                setPage(1);
            }
        }, 500),
        [search]
    );

    const handleChange = (e) => {
        setSearch(e.target.value);
        debouncedRefetch();
    };
    return (<>
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
                }}
            >
                <CircularProgress sx={{ color: "#8477DA" }} />
            </Box>
        ) : filteredData?.length === 0 && !estimatesListFetching ? (
            <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
                No Estimates Found
            </Typography>
        ) : (
            <Box>
                {isMobile ?
                    (filteredData?.map((item) => <Box
                        key={item._id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingY: 2,
                            borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
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
                                    <Typography
                                        sx={{ fontSize: 16, fontWeight: "Medium" }}
                                    >
                                        {" "}
                                        - Creator
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 0.6 }}>
                                    <Typography sx={{ fontSize: 14 }}>
                                        {item?.customerData?.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }}>
                                        {" "}
                                        - Customer
                                    </Typography>
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
                                <Edit sx={{
                                    color: "white",
                                    fontSize: 16,
                                    marginRight: "5px",
                                }} />
                                Edit
                            </Button>
                            <Typography
                                sx={{ fontWeight: "Medium", fontSize: 12 }}
                            >
                                {new Date(item?.updatedAt).toDateString()}
                            </Typography>
                        </Box>
                    </Box>))
                    : (<DataGrid
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
                        hideFooter
                    />)}
                <Pagination
                    totalRecords={estimatesList?.totalRecords ? estimatesList?.totalRecords : 0}
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
        )}</>);
}

export default ShowerEstimatesList;