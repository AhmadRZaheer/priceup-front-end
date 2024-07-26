import React, { useMemo } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import MenuList from "./menuList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditEstimates } from "@/utilities/ApiHooks/estimate";
import Summary from "./summary";
import { Link, useNavigate } from "react-router-dom";
import { EstimateCategory, mirrorHardwareTypes, quoteState } from "@/utilities/constants";
import { getLocationMirrorSettings } from "@/redux/locationSlice";
import { getEstimateState } from "@/redux/estimateSlice";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getAdditionalFields, getEstimateId, getEstimateMeasurements, getNotifications, getPricing, getProjectId, getSelectedContent, getSqftArea, resetNotifications, setInputContent, setPricing, setSelectedContent, setToggles } from "@/redux/mirrorsEstimateSlice";
import CustomToggle from "@/components/ui-components/Toggle";
import { calculateTotal, getEstimateErrorStatus, getSandBlasting } from "@/utilities/mirrorEstimates";
import { showSnackbar } from "@/redux/snackBarSlice";
import { SingleField } from "@/components/ui-components/SingleFieldComponent";
import HardwareMissingAlert from "@/components/Modal/hardwareMissingAlert";
import { enqueueSnackbar } from "notistack";
import { CustomerSelectModal } from "../CustomerSelectModal";

const floatingSizes = [{ id: 1, name: 'Small', image: "/images/others/default.png" }, { id: 2, name: 'Medium', image: "/images/others/default.png" }, { id: 3, name: 'Large', image: "/images/others/default.png" }]

export const generateEstimatePayload = (measurements, selectedContent, sqftArea) => {
    let measurementsArray = measurements;
    // if (estimateState === quoteState.EDIT && !layout_id || estimateState === quoteState.CUSTOM) {
    let newArray = [];
    for (const key in measurementsArray) {
        const index = parseInt(key);
        newArray[index] = measurementsArray[key];
    }
    measurementsArray = newArray;
    // }

    const glassAddonsArray = selectedContent?.glassAddons?.map(
        (item) => item?._id
    );

    const hardwaresArray = selectedContent?.hardwares?.map(
        (item) => item?._id
    );

    const filteredFields = selectedContent.additionalFields?.filter(
        (item) => item.label !== "" && item.cost !== 0
    )

    const additionalFieldsArray = filteredFields?.map(
        (row) => {
            return {
                cost: row.cost,
                label: row.label,
            };
        }
    );

    const estimateConfig = {
        glassType: {
            type: selectedContent?.glassType?.item?._id,
            thickness: selectedContent?.glassType?.thickness,
        },
        edgeWork: {
            type: selectedContent?.edgeWork?.item?._id,
            thickness: selectedContent?.edgeWork?.thickness,
        },
        glassAddons: [...glassAddonsArray],
        hardwares: [...hardwaresArray],
        // floatingSize: selectedContent.floatingSize,
        // sandBlasting: selectedContent.sandBlasting,
        // bevelStrip: selectedContent.bevelStrip,
        // safetyBacking: selectedContent.safetyBacking,
        simpleHoles: selectedContent.simpleHoles,
        // outlets: selectedContent.outlets,
        lightHoles: selectedContent.lightHoles,
        notch: selectedContent.notch,
        singleOutletCutout: selectedContent.singleOutletCutout,
        doubleOutletCutout: selectedContent.doubleOutletCutout,
        tripleOutletCutout: selectedContent.tripleOutletCutout,
        quadOutletCutout: selectedContent.quadOutletCutout,
        // singleDuplex: selectedContent.singleDuplex,
        // doubleDuplex: selectedContent.doubleDuplex,
        // tripleDuplex: selectedContent.tripleDuplex,
        modifiedProfitPercentage: selectedContent.modifiedProfitPercentage,
        additionalFields: [...additionalFieldsArray],
        people: selectedContent.people,
        hours: selectedContent.hours,
        measurements: measurementsArray,
        sqftArea: sqftArea,
    };
    return estimateConfig;
}

export const MirrorReview = () => {
    const navigate = useNavigate();
    const {
        mutate: mutateEdit,
        isError: ErrorForAddEidt,
        isSuccess: CreatedSuccessfullyEdit,
    } = useEditEstimates();
    const [ClientDetailModelOpen, setClientDetailModelOpen] = useState(false);
    const [hardwareMissingAlert, setHardwareMissingAlert] = useState(false);
    const [estimateConfig, setEstimateConfig] = useState(null);
    const mirrorLocationSettings = useSelector(getLocationMirrorSettings);
    const hardwaresList = useSelector(getMirrorsHardware);
    const measurements = useSelector(getEstimateMeasurements);
    const estimateId = useSelector(getEstimateId);
    const projectId = useSelector(getProjectId);
    const sqftArea = useSelector(getSqftArea);
    const currentEstimateState = useSelector(getEstimateState);
    const notifications = useSelector(getNotifications);
    const selectedContent = useSelector(getSelectedContent);
    const pricing = useSelector(getPricing);
    const addedFields = useSelector(getAdditionalFields);

    const handleToggleShift = (type, value) => {
        console.log(value, 'val');
        dispatch(setToggles({ type, value }));
    }

    const dispatch = useDispatch();
    const handleEditEstimate = () => {
        const estimateConfig = generateEstimatePayload(measurements, selectedContent, sqftArea);
        mutateEdit({
            projectId: projectId,
            cost: Number(pricing.total),
            customerData: {},
            estimateData: estimateConfig,
            id: estimateId,
        });
    };

    const setHandleEstimatesPages = () => {
        navigate('/estimates/dimensions');
    };

    const handleAddField = () => {
        const newData = [
            ...addedFields,
            {
                label: "",
                cost: 0,
            },
        ];

        dispatch(
            setSelectedContent({
                type: "additionalFields",
                item: newData,
            })
        );
    };

    const handleEstimateSubmit = () => {
        const allGoodStatus = getEstimateErrorStatus(selectedContent);
        if (allGoodStatus) {
            if (currentEstimateState === quoteState.CREATE) {
                const estimateConfig = generateEstimatePayload(measurements, selectedContent, sqftArea);
                setEstimateConfig(estimateConfig);
                setClientDetailModelOpen(true);
            } else {
                handleEditEstimate();
                showSnackbar("Estimate Edit successfully", "success");
            }
        }
        else {
            setHardwareMissingAlert(true);
        }
    }

    useEffect(() => {
        const prices = calculateTotal(
            selectedContent,
            sqftArea,
            mirrorLocationSettings,
            measurements
        );
        dispatch(setPricing(prices))
    }, [selectedContent]);

    useEffect(() => {
        if (CreatedSuccessfullyEdit) {
            navigate("/estimates");
        }
    }, [CreatedSuccessfullyEdit]);

    const [summaryState, setSummaryState] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleAdditionalFieldModify = (fields) => {
        dispatch(setSelectedContent({ type: "additionalFields", item: fields }));
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        window.addEventListener("resize", updateWindowWidth);

        return () => {
            window.removeEventListener("resize", updateWindowWidth);
        };
    }, []);

    useEffect(() => {
        console.log("mount");
        const delayBetweenSnackbars = 1500; // Adjust this delay as needed (in milliseconds)
        let delay = 0;
        Object.entries(notifications).forEach(([key, value]) => {
            if (
                ["glassAddonsNotAvailable", "hardwaresNotAvailable"].includes(key)
            ) {
                value?.forEach((item) => {
                    if (item.status) {
                        setTimeout(() => {
                            enqueueSnackbar(item.message, {
                                variant: item.variant,
                                // autoHideDuration: 5000, // Set a custom duration for each snackbar
                            });
                        }, delay);
                        delay += delayBetweenSnackbars;
                    }
                });
            } else {
                if (value.status) {
                    setTimeout(() => {
                        enqueueSnackbar(value.message, {
                            variant: value.variant,
                            // autoHideDuration: 5000, // Set a custom duration for each snackbar
                        });
                    }, delay);
                    delay += delayBetweenSnackbars;
                }
            }
        });
        return () => {
            console.log("unmount");
            dispatch(resetNotifications());
        };
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: { xs: "100%", sm: 900 },
                    margin: { sm: "auto", xs: 0 },
                    display: "flex",
                    alignItems: "center",
                    height: { xs: "100vh", sm: "96vh" },
                    flexDirection: "column",
                    gap: 4,
                    backgroundColor: { xs: "#08061B", sm: "white" },
                    paddingTop: { sm: "40px" },
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <Box
                        sx={{
                            backgroundColor: { xs: "#100D24", sm: "white" },
                            padding: { xs: "20px 15px", sm: "0px" },
                            borderBottomRightRadius: { xs: "16px", sm: "0px" },
                            borderBottomLeftRadius: { xs: "16px", sm: "0px" },
                            display: "flex",
                            alignItems: "center",
                            marginTop: { sm: 0, xs: 7 },
                        }}
                    >
                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },
                                paddingRight: "20px",
                                paddingTop: "4px",
                            }}
                            onClick={
                                summaryState
                                    ? setHandleEstimatesPages
                                    : () => {
                                        setSummaryState(true);
                                    }
                            }
                        >
                            {" "}
                            <img src="/icons/left_vector.svg" alt="<" />
                        </Box>

                        <Typography
                            sx={{
                                color: { sm: "black", xs: "white" },
                                fontSize: { xs: "24px", sm: "2.124rem" },
                                textAlign: { xs: "start", sm: "center" },
                                fontWeight: 500,
                            }}
                            variant="h4"
                        >
                            {currentEstimateState === quoteState.EDIT ? 'Edit Estimate' : 'Create New Estimate'}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        margin: "auto",
                        borderRadius: { sm: "12px", xs: 0 },
                        boxShadow:
                            "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                        border: { sm: "1px solid #EAECF0", xs: "none" },
                        paddingX: { sm: 2, xs: 0 },
                        paddingY: 4,
                        rowGap: 4,
                        background: { sm: "white", xs: "#08061B" },
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: 2,
                        marginBottom: 4.6,
                    }}
                >
                    <Box sx={{ width: { sm: "100%", xs: "90%" }, margin: "auto" }}>
                        <Typography
                            sx={{
                                fontSize: { sm: "18px", xs: "18px" },
                                color: { sm: "black", xs: "white" },
                                paddingBottom: 1,
                            }}
                        >
                            Summary
                        </Typography>
                        <Typography
                            sx={{ color: { sm: "#667085", xs: "white" }, font: "14px" }}
                        >
                            Modify your estimate below to finalize the total price.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            width: { sm: "96.5%", xs: "94%" },
                            paddingY: { sm: 4, xs: 0 },
                            paddingX: { sm: 2, xs: 0 },
                            background: { sm: "rgba(217, 217, 217, 0.3)" },
                            maxHeight: 1400,
                            borderRadius: "8px",
                            justifyContent: "space-between",
                            flexDirection: { sm: "row", xs: "column" },
                            margin: { sm: 0, xs: "auto" },
                            overflow: "auto",
                        }}
                    >
                        {summaryState || windowWidth > 600 ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    width: { sm: "42%" },
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            color: { sm: "black", xs: "white" },
                                        }}
                                    >
                                        <Box sx={{ width: "100%" }}>
                                            <MenuList
                                                menuOptions={hardwaresList?.glassTypes}
                                                title={"Glass type"}
                                                type={mirrorHardwareTypes.GLASSTYPE}
                                                thickness={selectedContent.glassType.thickness}
                                                currentItem={selectedContent.glassType.item}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                        }}
                                    >
                                        <Box sx={{ width: "100%" }}>
                                            <MenuList
                                                menuOptions={hardwaresList?.edgeWorks}
                                                title={"Edge Work"}
                                                type={mirrorHardwareTypes.EDGEWORK}
                                                thickness={selectedContent.edgeWork.thickness}
                                                currentItem={selectedContent.edgeWork.item}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                        }}
                                    >
                                        <Box sx={{ width: "100%" }}>
                                            <MenuList
                                                menuOptions={hardwaresList?.hardwares}
                                                title={"Hardwares"}
                                                type={mirrorHardwareTypes.HARDWARES}
                                            // currentItem={selectedContent.hardwares.item}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                        }}
                                    >
                                        <Box sx={{ width: "100%" }}>
                                            <MenuList
                                                menuOptions={hardwaresList?.glassAddons}
                                                title={"Glass Addons"}
                                                type={mirrorHardwareTypes.GLASSADDONS}
                                            // currentItem={selectedContent.hardwares.item}
                                            />
                                        </Box>
                                    </Box>

                                    {/* <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Sand Blasting</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Typography>{selectedContent.sandBlasting?.toFixed(2) || 0}</Typography>
                                        </Box>
                                    </Box> */}

                                    {/* <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Bevel Strip</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <CustomToggle
                                                checked={selectedContent.bevelStrip}
                                                onChange={(event) => handleToggleShift('bevelStrip', event.target.checked)}
                                                // onBlur={formik.handleBlur}
                                                name="bevelStrip"
                                            />
                                        </Box>
                                    </Box> */}

                                    {/* <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Safety Backing</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <CustomToggle
                                                checked={selectedContent.safetyBacking}
                                                onChange={(event) => handleToggleShift('safetyBacking', event.target.checked)}
                                                name="safetyBacking"
                                            />
                                        </Box>
                                    </Box> */}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Holes</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.simpleHoles}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "simpleHoles",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    {/* <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Outlets</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.outlets}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "outlets",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box> */}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Light Holes</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.lightHoles}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "lightHoles",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Notch</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.notch}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "notch",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Single Outlet Cutout</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.singleOutletCutout}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "singleOutletCutout",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Double Outlet Cutout</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.doubleOutletCutout}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "doubleOutletCutout",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Triple Outlet Cutout</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.tripleOutletCutout}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "tripleOutletCutout",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Quad Outlet Cutout</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.quadOutletCutout}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "quadOutletCutout",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    {/* <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Single Duplex</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.singleDuplex}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "singleDuplex",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box> */}
                                    {/* <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Double Duplex</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.doubleDuplex}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "doubleDuplex",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box> */}
                                    {/* <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Triple Duplex</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.tripleDuplex}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "tripleDuplex",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box> */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>People:</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.people}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "people",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: {
                                                sm: "2px solid #D0D5DD",
                                                xs: "2px solid #423f57",
                                            },
                                            paddingLeft: 3,
                                            paddingBottom: 1,
                                            color: { sm: "#000000  ", xs: "white" },
                                        }}
                                    >
                                        <Typography>Hours:</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                width: "120px",
                                                padddingY: 4,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    style: {
                                                        color: "black",
                                                        borderRadius: 10,
                                                        border: "1px solid #cccccc",
                                                        backgroundColor: "white",
                                                    },
                                                    inputProps: { min: 0 },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                    },
                                                }}
                                                sx={{
                                                    color: { sm: "black", xs: "white" },
                                                    width: "100%",
                                                }}
                                                variant="outlined"
                                                size="small"
                                                value={selectedContent.hours}
                                                onChange={(event) =>
                                                    dispatch(
                                                        setInputContent({
                                                            type: "hours",
                                                            value: event.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    {/* additional Fields */}
                                    <Typography
                                        variant="h5"
                                        sx={{ color: { md: "black", xs: "white" } }}
                                    >
                                        Additonal Fields
                                    </Typography>
                                    {addedFields &&
                                        addedFields.map((item, index) =>
                                            <SingleField item={item} index={index} estimateState={currentEstimateState} addedFields={addedFields} handleModify={handleAdditionalFieldModify} />
                                        )}
                                    <Button
                                        onClick={handleAddField}
                                        sx={{
                                            width: "fit-content",
                                            textTransform: "capitalize",
                                            backgroundColor: "#8477da",
                                            "&:hover": {
                                                backgroundColor: "#8477da",
                                            },
                                        }}
                                        variant="contained"
                                    >
                                        Add Additional Field
                                    </Button>
                                    {/** additional fields end */}
                                </Box>
                            </Box>
                        ) : (
                            ""
                        )}

                        {/* Buttons */}
                        {summaryState && windowWidth < 600 ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: { sm: "96%" },
                                    paddingX: 2,
                                    marginY: 3,
                                }}
                            >
                                <Box sx={{ width: "150px" }}>
                                    <Button
                                        fullWidth
                                        onClick={setHandleEstimatesPages}
                                        sx={{
                                            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                            color: "#344054",
                                            textTransform: "initial",
                                            border: "1px solid #D0D5DD",
                                            backgroundColor: { sm: "transparent", xs: "white" },
                                        }}
                                    >
                                        {" "}
                                        Back
                                    </Button>
                                </Box>
                                <Box sx={{ width: "150px" }}>
                                    <Button
                                        fullWidth
                                        // disabled={selectedContent?.hardwareFinishes === null}
                                        variant="contained"
                                        onClick={() => {
                                            setSummaryState(false);
                                        }}
                                        sx={{
                                            backgroundColor: "#8477da",
                                            "&:hover": {
                                                backgroundColor: "#8477da",
                                            },
                                        }}
                                    >
                                        {" "}
                                        Next
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            ""
                        )}

                        {!summaryState || windowWidth > 600 ? (
                            <Box sx={{ width: { sm: "46%" } }}>
                                <Summary />
                            </Box>
                        ) : (
                            ""
                        )}
                    </Box>

                    {/* Buttons */}
                    {!summaryState || windowWidth > 600 ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: { sm: "96%" },
                                paddingX: 2,
                            }}
                        >
                            <Box sx={{ width: { sm: "150px", xs: currentEstimateState === quoteState.EDIT ? "100px" : "150px" } }}>
                                <Button
                                    fullWidth
                                    onClick={
                                        summaryState
                                            ? setHandleEstimatesPages
                                            : () => {
                                                setSummaryState(true);
                                            }
                                    }
                                    sx={{
                                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                        color: "#344054",
                                        textTransform: "initial",
                                        border: "1px solid #D0D5DD",
                                        backgroundColor: { sm: "transparent", xs: "white" },
                                    }}
                                >
                                    {" "}
                                    Back
                                </Button>
                            </Box>
                            <Box sx={{
                                width: { sm: currentEstimateState === quoteState.EDIT ? "310px" : "150px", xs: currentEstimateState === quoteState.EDIT ? "200px" : "150px" },
                                display: "flex",
                                gap: 2,
                                // flexDirection: { sm: "row", xs: "column" },
                            }}
                            >
                                {currentEstimateState === quoteState.EDIT && (
                                    <Link to={"/estimates"} style={{ textDecoration: 'none', width: '100%' }}>
                                        <Button
                                            fullWidth
                                            sx={{
                                                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                                color: "#344054",
                                                textTransform: "initial",
                                                border: "1px solid #D0D5DD",
                                                backgroundColor: { sm: "transparent", xs: "white" },
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                )}

                                <Button
                                    fullWidth
                                    // disabled={selectedContent?.hardwareFinishes === null}
                                    disabled={projectId === null}
                                    variant="contained"
                                    onClick={handleEstimateSubmit}
                                    sx={{
                                        backgroundColor: "#8477da",
                                        "&:hover": {
                                            backgroundColor: "#8477da",
                                        },
                                        ":disabled": {
                                            bgcolor: "#c2c2c2",
                                        },
                                    }}
                                >
                                    {" "}
                                    {currentEstimateState === quoteState.EDIT ? 'Update' : 'Next'}
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        ""
                    )}
                </Box>
            </Box>
            <HardwareMissingAlert
                open={hardwareMissingAlert}
                handleClose={() => setHardwareMissingAlert(false)}
                estimateCategory={EstimateCategory.MIRRORS}
            />
            <CustomerSelectModal open={ClientDetailModelOpen} handleCancel={() => { setClientDetailModelOpen(false) }} key={'sdasaa'} estimateConfig={estimateConfig} estimateCategory={"mirrors"} estimatesTotal={pricing.total} projectId={projectId} />
        </>
    );
};