import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EstimatesColumns } from "@/utilities/DataGridColumns";
import { Box, Button, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/Modal/deleteModal";
import { useDeleteEstimates } from "@/utilities/ApiHooks/estimate";
import { EstimateCategory, quoteState } from "@/utilities/constants";
import { backendURL, calculateTotal } from "@/utilities/common";
import { Edit, } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultImage from "@/components/ui-components/defaultImage";
import { setStateForWineCellarEstimate } from "@/utilities/WineCellarEstimate";
import {  getLocationWineCellarSettings } from "@/redux/locationSlice";
import { debounce } from "lodash";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { generateObjectForPDFPreview, renderMeasurementSides } from "@/utilities/estimates";


const { useFetchAllDocuments } = require("@/utilities/ApiHooks/common")
const routePrefix = `${backendURL}/estimates`;

const WineCellarEstimatesList = ({ projectId, statusValue, dateValue, searchValue }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wineCellarHardwareList = useSelector(getWineCellarsHardware);
    const wineCellarLocationSettings = useSelector(getLocationWineCellarSettings);
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
        console.log(item, 'item2222222222222222');
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
        const id = item?._id;
        localStorage.setItem(
            "pdf-estimate",
            JSON.stringify({
                ...formattedData,
                measurements: measurementString,
                pricing,
                id
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
    useEffect(() => {
        refetchEstimatesList();
    }, [page, deletedSuccessfully, projectId, statusValue, dateValue]);

    const debouncedRefetch = useCallback(
        debounce(() => {
            if (page === 1) {
                refetchEstimatesList();
            }
            else {
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
    return (<>

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
                    background: '#FFFF',
                    pb: 3
                }}
            >
                <CircularProgress sx={{ color: "#8477DA" }} />
            </Box>
        ) : filteredData?.length === 0 && !estimatesListFetching ? (
            <Typography sx={{ color: "#667085", p: 2, textAlign: "center", background: '#FFFF', borderRadius: '12px' }}>
                No Estimate Found
            </Typography>
        ) : (
            <Box sx={{ background: '#FFFF', pb: isMobile ? 3 : 0, borderRadius: '8px' }}>
                {isMobile ?
                    (filteredData?.map((item) =>
                        <Box
                            key={item._id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingY: 2,
                                borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
                                background: '#FFFF'
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
                        sx={{
                            width: "100%", '.MuiDataGrid-main': {
                                borderRadius: '8px !important',
                            }
                        }}
                        rowHeight={70}
                        hideFooter
                        disableColumnMenu
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

export default WineCellarEstimatesList;