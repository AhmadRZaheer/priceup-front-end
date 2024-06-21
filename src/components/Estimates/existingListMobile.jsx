import { Box, Button, CircularProgress, Typography } from "@mui/material";
import DefaultImage from "@/components/ui-components/defaultImage";
import { useDispatch, useSelector } from "react-redux";
import { getDataRefetch } from "@/redux/staff";
import { getEstimatesListRefetch } from "@/redux/refetch";
import { useFetchDataEstimate, useGetEstimates } from "@/utilities/ApiHooks/estimate";
import { useEffect, useState } from "react";
import { initializeStateForEditQuote, resetState, setListData, setNavigationDesktop, setQuoteState } from "@/redux/estimateCalculations";
import ModeIcon from "@mui/icons-material/Mode";
import { makeStyles } from "@material-ui/core";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom";
import { resetMirrorEstimateState } from "@/redux/mirrorsEstimateSlice";
import { resetEstimateState } from "@/redux/estimateSlice";
import { EstimateCategory } from "@/utilities/constants";
import { setStateForShowerEstimate } from "@/utilities/estimates";
import { setStateForMirrorEstimate } from "@/utilities/mirrorEstimates";

export default function ExistingListMobile() {
    const navigate = useNavigate();
    const refetchData = useSelector(getDataRefetch); // refetch if staff switch location
    const refetchEstimatesCounter = useSelector(getEstimatesListRefetch); // refetch estimates list on any action
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const {
        data: estimatesList,
        isLoading: estimatesFetching,
        refetch: refetchEstimatesList,
    } = useGetEstimates(page, itemsPerPage);
    // const {
    //     data: allHardwaresList,
    //     isLoading: listFetching,
    //     refetch: refetchHardwaresList,
    // } = useFetchDataEstimate();
    const dispatch = useDispatch();
    useEffect(() => {
        refetchEstimatesList();
    }, [refetchEstimatesCounter, refetchData, page]);
    const handleIconButtonClick = (item) => {
        if (item?.category === EstimateCategory.SHOWERS) {
            setStateForShowerEstimate(item, dispatch, navigate);
        } else if (item?.category === EstimateCategory.MIRRORS) {
            setStateForMirrorEstimate(item, dispatch, navigate);
        }
        // dispatch(setListData(allHardwaresList));
        // dispatch(
        //     initializeStateForEditQuote({
        //         estimateData: item,
        //         quotesId: item._id,
        //     })
        // );
        // dispatch(setNavigationDesktop("review"));
    };
    const handleCreateQuote = () => {
        dispatch(resetMirrorEstimateState());
        dispatch(resetEstimateState());
        dispatch(resetState());
        navigate("/estimates/category");
    };
    const useStyles = makeStyles({
        overflowText: {
            maxWidth: "115px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
        },
    });
    const classes = useStyles();

    return (<Box sx={{ backgroundColor: 'white' }}>
        <Box>
            <Box
                sx={{
                    paddingY: 2,
                    paddingX: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: { xs: 7, sm: 0 },
                }}
            >
                <Typography sx={{ fontSize: 18, fontWeight: "Medium" }}>
                    Estimates
                </Typography>
            </Box>
            <Box
                sx={{
                    paddingX: 2,
                    marginTop: 2,
                    height: "68vh",
                    overflow: "auto",
                }}
            >
                {estimatesFetching ? (
                    <Box
                        sx={{
                            width: 40,
                            m: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                        }}
                    >
                        <CircularProgress sx={{ color: "#8477DA" }} />
                    </Box>
                ) : estimatesList?.estimates?.length ? (
                    estimatesList?.estimates?.map((item) => (
                        <Box
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
                                    {/* <img
                          width={40}
                          src={`${backendURL}/${item?.creatorData?.image}`}
                          alt="image person"
                        /> */}
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
                                    disabled={estimatesFetching}
                                >
                                    <ModeIcon
                                        sx={{
                                            color: "white",
                                            fontSize: "17px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    Edit
                                </Button>
                                <Typography
                                    sx={{ fontWeight: "Medium", fontSize: 12 }}
                                >
                                    {new Date(item?.updatedAt).toDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                ) : (<Box><Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
                    No Estimates Found
                </Typography></Box>)}
            </Box>
            {estimatesList?.estimates?.length ? <Pagination
                totalRecords={estimatesList?.totalRecords ? estimatesList?.totalRecords : 0}
                itemsPerPage={itemsPerPage}
                page={page}
                setPage={setPage} /> : ''}
        </Box>

        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                paddingY: "20px",
                borderTop: "1px solid rgba(102, 112, 133, 0.5)",
                overflow: "hidden",
                bgcolor: "#100d24",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginRight: { sm: 35 },
                }}
            >
                <Button
                    onClick={handleCreateQuote}
                    disabled={estimatesFetching}
                    color="primary"
                    sx={{
                        textTransform: "capitalize",
                        width: "200px",
                        backgroundColor: "#8477DA",
                        color: "white",
                        fontSize: 18,
                        "&:hover": { background: "#8477DA", color: "white" },
                        margin: "0px",
                    }}
                >
                    Create New Estimate
                </Button>
            </Box>
        </Box>
    </Box>)
}