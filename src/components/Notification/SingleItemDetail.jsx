import {
    Stack,
    Typography,
    Box,
    // CardMedia,
    Divider,
    Checkbox,
    // Button,
    CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import Tick from "@/Assets/Tick.svg";
// import DetailNotification from "@/Assets/SingleDetailNotification.svg";
import DefaultImage from "@/components/ui-components/defaultImage";
import CustomImage from "@/Assets/customlayoutimage.svg";
import { useEditDocument, useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import { backendURL, getLocaleDateTimeFromMongoTimestamp } from "@/utilities/common";
import { setNotificationsRefetch } from "@/redux/refetch";
import { useDispatch } from "react-redux";
import { EstimateCategory, notificationCategories, userRoles } from "@/utilities/constants";
import { setStateForShowerEstimate } from "@/utilities/estimates";
import { setStateForMirrorEstimate } from "@/utilities/mirrorEstimates";
import { useNavigate } from "react-router-dom";
import { EstimateSummary } from "./Categories/Estimate";

const CustomTypo = ({ title, sx }) => {
    return (
        <Typography
            className="estimateText"
            sx={{ color: "rgba(102, 112, 133, 0.76) !important", ...sx }}
        >
            {title}
        </Typography>
    );
};

const SingleItemDetail = ({ selectedId, handleMoveToArchive, editLoading }) => {
    console.log(selectedId,'id');
    const routePrefix = `${backendURL}/notifications`;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: record, refetch: refetchRecord, isFetching: getFetching} =
        useFetchSingleDocument(`${backendURL}/notifications/${selectedId}`);
    const { mutateAsync: markThisAsRead } = useEditDocument();
    useEffect(() => {
        refetchRecord();
    }, [selectedId]);
    useEffect(() => {
        const markAsRead = async () => {
            if (record && record.isRead === false) {
                await markThisAsRead({ data: { isRead: true }, apiRoute: `${routePrefix}/${selectedId}` });
                dispatch(setNotificationsRefetch());
            }
        };

        markAsRead();
    }, [record]);
    const formattedDate = getLocaleDateTimeFromMongoTimestamp(record?.createdAt);
    const layoutImage = record?.resourceInfo?.config?.layout_id ? `${backendURL}/${record?.resourceInfo?.settings?.image}` : CustomImage;
    const handleEditEstimate = () => {
        if (record.resourceInfo?.category === EstimateCategory.SHOWERS) {
            setStateForShowerEstimate(record.resourceInfo, dispatch, navigate);
        } else if (record.resourceInfo?.category === EstimateCategory.MIRRORS) {
            setStateForMirrorEstimate(record.resourceInfo, dispatch, navigate);
        }
    };
    console.log(record, 'record', formattedDate, selectedId);
    return (
        <Box className='notification' sx={{ height: "78.5vh", overflowY: "auto" }}>
            {getFetching ? <Box sx={{ display: 'flex', height: 'inherit', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={32} sx={{ color: "#8477DA" }} />
            </Box> : !getFetching && record?.resourceInfo ?
                <Box>
                    <Box sx={{ pt: 5, px: 12 }}>
                        {!record?.archived ? <Stack direction="row" gap={0.5}>
                            {editLoading ? <CircularProgress size={24} sx={{ color: "#8477DA" }} /> :
                                <Checkbox
                                    onClick={handleMoveToArchive}
                                    sx={{
                                        padding: "0px !important",
                                        color: "rgba(0, 0, 0, 0.49)",
                                        "&.Mui-checked": {
                                            color: "rgba(0, 0, 0, 0.49)",
                                        },
                                    }}
                                />}
                            <Typography className="archText">Archive</Typography>
                        </Stack> : ''}
                        <CustomTypo title={formattedDate} sx={{ py: 1.3 }} />

                        <Stack direction="row" gap={1.5}>
                            <Typography
                                className="todayText"
                                sx={{
                                    color: "#100D24 !important",
                                }}
                            >
                                {record?.description}
                            </Typography>
                            <img alt="not" src={Tick} />
                        </Stack>
                        <Box sx={{ my: 1, p: 3, background: '#cccc', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <img src={layoutImage} style={{ width: "200px", height: "200px" }} />
                            {/* <CardMedia
                                component="img"
                                image={DetailNotification}
                                sx={{ width: "383.81px", height: "232.88px" }}
                            /> */}
                        </Box>
                        <Stack direction="row" gap={2} sx={{ px: 2 }}>
                            <Box>
                                <CustomTypo title="Creator Name:" sx={{ pb: 4.5 }} />
                                <CustomTypo title="Customer Name:" sx={{ pb: 4.5 }} />
                                <CustomTypo title="Date Quoted:" />
                            </Box>
                            <Stack direction="row" gap={2.5}>
                                <DefaultImage name={record.performer_name || "Chris Phillips"} />
                                <Box>
                                    <Box sx={{ pb: 2 }}>
                                        <CustomTypo title={record.performer_name} />
                                        <CustomTypo
                                            title="chrisp@gcs.glass"
                                            sx={{ fontSize: "12.3px !important" }}
                                        />
                                    </Box>
                                    <Box sx={{ pb: 2 }}>
                                        <CustomTypo title={record.resourceInfo?.customerData?.name} />
                                        <CustomTypo
                                            title={record.resourceInfo?.customerData?.email}
                                            sx={{ fontSize: "12.3px !important" }}
                                        />
                                    </Box>
                                    <Box sx={{ pb: 2 }}>
                                        <CustomTypo
                                            title={formattedDate}
                                            sx={{ fontSize: "12.3px" }}
                                        />
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                    <Divider sx={{ ml: 3 }} />
                    {record.category === notificationCategories.ESTIMATES ? <EstimateSummary data={record.resourceInfo} handleEditEstimate={handleEditEstimate} /> : <></>}
                </Box> : <Box sx={{ display: 'flex', height: 'inherit', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography >No preview found.</Typography>
                </Box>}
        </Box>
    );
};

export default SingleItemDetail;
