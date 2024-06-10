import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import CustomImage from "@/Assets/customlayoutimage.svg";

import { useDispatch, useSelector } from "react-redux";
import { quoteState } from "@/utilities/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { getEstimateState } from "@/redux/estimateSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { getEstimateMeasurements, getSelectedItem, initializeStateForEditQuote, setEstimateMeasurements, setSandBlasting, setSqftArea } from "@/redux/mirrorsEstimateSlice";
import { getAreaSqft, getSandBlasting } from "@/utilities/mirrorEstimates";
import { getLocationMirrorSettings } from "@/redux/locationSlice";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";


const getNearestSmallerKeyWithValues = (values, itrator) => {
    let itr = itrator;
    while (!values[itr] && itr > 0) {
        itr--;
    }

    return values[itr];
};

export const MirrorDimensions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mirrorLocationSettings = useSelector(getLocationMirrorSettings);
    const measurements = useSelector(getEstimateMeasurements);
    const currentEstimateState = useSelector(getEstimateState);
    const selectedItem = useSelector(getSelectedItem);
    const mirrorsHardware = useSelector(getMirrorsHardware);
    console.log(measurements,'measurements');
    const customInitalValues = {
        [0]: {
            count: 1,
        },
    };

    const [values, setValues] = useState(
        Object.keys(measurements)?.length
            ? { ...measurements }
            : { ...customInitalValues }
    );

    console.log(values, 'val');
    const rows = Object.keys(values).map(
        (key) => parseInt(values[key]) || 1
    );

    const numRows = parseInt(rows.reduce((acc, val) => acc + val, 0));
    console.log(numRows, "log", rows);

    let lockNext = false;

    Object.entries(values).forEach?.(([key, value]) => {
        const { count, width, height } = value;
        if (!width || !height) {
            lockNext = true;
        }
    })

    const handleback = () => {
        if (currentEstimateState === quoteState.EDIT) {
            navigate('/estimates')
        } else {
            navigate('/estimates/category');
        }
    };

    const handleReset = () => {
        setValues({ ...customInitalValues });
        // setNumRows(customInitalValues.count);
    };

    const handleSubmit = () => {
        dispatch(setEstimateMeasurements(values));
        const sqft = getAreaSqft(values);
        dispatch(setSqftArea(sqft.areaSqft));
        const sandBlasting = getSandBlasting(values, mirrorLocationSettings.sandBlastingMultiplier);
        dispatch(setSandBlasting(sandBlasting));
        navigate('/estimates/review');
    };

    useEffect(() => {
        if (currentEstimateState === quoteState.EDIT) {
            dispatch(
                initializeStateForEditQuote({
                    estimateData: selectedItem,
                    hardwaresList: mirrorsHardware
                })
            );
        }
        return () => { };
    }, []);

    return (
        <>
            <Box
                sx={{
                    marginX: "auto",
                    display: "flex",
                    alignItems: { sm: "center" },
                    justifyContent: "center",
                    height: "100vh",
                    backgroundColor: { sm: "white", xs: "#08061B" },
                }}
            >
                <Box
                    sx={{
                        width: { sm: 800 },
                    }}
                >
                    <div style={{ width: "100%" }}>
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
                            <NavLink to={currentEstimateState === quoteState.EDIT ? "/estimates" : "/estimates/category"}>
                                <Box

                                    sx={{
                                        display: { xs: "block", sm: "none" },
                                        paddingRight: "20px",
                                        paddingTop: "2px",
                                    }}
                                >
                                    {" "}
                                    <img src="/icons/left_vector.svg" alt="<" />
                                </Box>
                            </NavLink>
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
                    </div>

                    <form>
                        <Box
                            sx={{
                                height: { xs: "100vh", sm: 660 },
                                borderRadius: { sm: "12px", xs: 0 },
                                boxShadow:
                                    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                                border: { sm: "1px solid #EAECF0", xs: "none" },
                                paddingX: { sm: 2, xs: 0 },
                                paddingY: { sm: 4, xs: 0 },
                                rowGap: 4,
                                background: { sm: "white", xs: "#08061B" },
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    paddingLeft: { sm: 0, xs: 3 },
                                    paddingTop: 2,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { sm: "18px", xs: "18px" },
                                        color: { sm: "#101828", xs: "white" },
                                        paddingBottom: 1,
                                    }}
                                >
                                    Enter Measurements
                                </Typography>
                                <Typography
                                    sx={{ color: { sm: "#667085", xs: "white" }, font: "14px" }}
                                >
                                    Your new project has been created. Invite colleagues to
                                    collaborate on this project.
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { sm: "row", xs: "column" },
                                    width: { sm: "96.5%", xs: "99.8%" },
                                    paddingY: { sm: 4, xs: 0 },
                                    paddingX: { sm: 2, xs: 0 },
                                    height: "100%",
                                    background: { sm: "#D9D9D9" },
                                    gap: 4,
                                    borderRadius: "8px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: { sm: "48.5%", xs: "92%" },
                                        maxHeight: "100%",
                                        minHeight: 100,
                                        flexDirection: "column",
                                        gap: { sm: 2, xs: 2 },
                                        color: { sm: "black", xs: "white" },
                                        borderRadius: "34px 34px 0px 0px",
                                        background: { xs: "rgba(16, 13, 36, 0.01)", sm: "none" },
                                        backdropFilter: { xs: "blur(81.5px)", sm: "none" },
                                        background: {
                                            sm: "none",
                                            xs: "linear-gradient(to top right, #100d24 35%, #312969 , #100d24 82%)",
                                        },
                                        borderTopLeftRadius: { sm: 0, xs: 30 },
                                        borderTopRightRadius: { sm: 0, xs: 30 },
                                        borderTop: { sm: 0, xs: "1px solid #667085" },
                                        paddingX: { sm: 0, xs: 2 },
                                        paddingTop: 4,
                                        pb: { sm: 0, xs: 12 },
                                    }}
                                >
                                    {Array.from({ length: numRows }).map((_, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                mb: 1,
                                            }}
                                        >
                                            <Box sx={{}}>
                                                <Typography
                                                    sx={{
                                                        fontSize: 18,
                                                        color: { sm: "black", xs: "white" },
                                                    }}
                                                >
                                                    Width
                                                </Typography>

                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                    name={`aWidth${index}`}
                                                    InputProps={{
                                                        inputProps: { min: 0 },
                                                    }}
                                                    placeholder="0"
                                                    style={{
                                                        display:
                                                            typeof values[index]?.count == "undefined"
                                                                ? "none"
                                                                : "block",
                                                        background: "white",
                                                        borderRadius: "8px",
                                                        border: "1px solid #D0D5DD",
                                                        width: { md: "28%", xs: "20%" },
                                                    }}
                                                    value={
                                                        (
                                                            getNearestSmallerKeyWithValues(values, index) ||
                                                            values[`${index}`]
                                                        )?.width || ""
                                                    }
                                                    onChange={(e) => {
                                                        setValues((vals) => ({
                                                            ...vals,
                                                            [index]: {
                                                                ...vals[index],
                                                                width: e.target.value,
                                                            },
                                                        }));
                                                    }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: 18,
                                                        color: { sm: "black", xs: "white" },
                                                    }}
                                                >
                                                    Height
                                                </Typography>

                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                    name={`aHeight${index}`}
                                                    InputProps={{
                                                        inputProps: { min: 0 },
                                                    }}
                                                    placeholder="0"
                                                    style={{
                                                        display:
                                                            typeof values[index]?.count == "undefined"
                                                                ? "none"
                                                                : "block",
                                                        background: "white",
                                                        borderRadius: "8px",
                                                        border: "1px solid #D0D5DD",
                                                        width: { md: "28%", xs: "20%" },
                                                    }}
                                                    value={
                                                        (
                                                            getNearestSmallerKeyWithValues(values, index) ||
                                                            values[`${index}`]
                                                        )?.height || ""
                                                    }
                                                    onChange={(e) => {
                                                        setValues((vals) => ({
                                                            ...vals,
                                                            [index]: {
                                                                ...vals[index],
                                                                height: e.target.value,
                                                            },
                                                        }));
                                                    }}
                                                />
                                            </Box>
                                            {typeof values[index]?.count !== "undefined" && (
                                                <>
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 18,
                                                                color: { sm: "black", xs: "white" },
                                                            }}
                                                        >
                                                            Quantity
                                                        </Typography>

                                                        <TextField
                                                            // disabled={isThereHigherKeyAvailable(
                                                            //   values,
                                                            //   index
                                                            // )}
                                                            type="number"
                                                            size="small"
                                                            variant="outlined"
                                                            name={`Count${index}`}
                                                            InputProps={{
                                                                inputProps: { min: 1 },
                                                            }}
                                                            value={values[index]?.count || ""}
                                                            placeholder="quantity"
                                                            style={{
                                                                background: "white",
                                                                borderRadius: "8px",
                                                                border: "1px solid #D0D5DD",
                                                                width: { md: "15%", xs: "20%" },
                                                            }}
                                                            onChange={(e) => {
                                                                setValues((vals) => ({
                                                                    ...vals,
                                                                    [index]: {
                                                                        ...vals[index],
                                                                        count: parseInt(e.target.value),
                                                                    },
                                                                }));
                                                            }}
                                                        />
                                                    </Box>
                                                    {Math.max(...Object.keys(values)) === index &&
                                                        index !== 0 && (
                                                            <a
                                                                href="#"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    setValues((vals) => {
                                                                        const { [index]: notWanted, ...rest } =
                                                                            vals;

                                                                        return rest;
                                                                    });
                                                                }}
                                                            >
                                                                <DeleteIcon
                                                                    sx={{
                                                                        color: { md: "#101828", xs: "white" },
                                                                    }}
                                                                />
                                                            </a>
                                                        )}
                                                </>
                                            )}
                                        </Box>
                                    ))}


                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        width: { sm: "48.5%" },
                                        justifyContent: "end",
                                        alignItems: "center",
                                        margin: "auto",
                                        order: { sm: 1, xs: -1 },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: "134px", sm: "300px" },
                                            height: { xs: "188px", sm: "340px" },
                                            padding: { xs: "10px", sm: "0px" },
                                        }}
                                    >
                                        <img
                                            width="100%"
                                            height="100%"
                                            src={CustomImage}
                                            alt="Selected"
                                        />
                                    </Box>

                                </Box>
                            </Box>
                            {/* Buttons */}
                            <Box
                                sx={{
                                    position: { md: "static", xs: "fixed" },
                                    bottom: { md: 100, xs: 0 },
                                    background: { md: "transparent", xs: "#100d24" },
                                    py: 2,
                                    display: "flex",
                                    justifyContent: { md: "space-between", xs: "center" },
                                    width: "100%",
                                    borderTop: { md: "0px", xs: "1px solid white" },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { md: "160px", xs: "50%" },
                                        display: { md: "block", xs: "none" },
                                    }}
                                >
                                    <Button
                                        fullWidth
                                        onClick={handleReset}
                                        sx={{
                                            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                            color: "#344054",
                                            textTransform: "initial",
                                            border: "1px solid #D0D5DD",
                                            backgroundColor: { md: "transparent", xs: "white" },
                                            height: 40,
                                            fontSize: 20,
                                        }}
                                    >
                                        Reset
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        justifyContent: { md: "end", xs: "space-between" },
                                        width: "92%",
                                    }}
                                >
                                    <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                                        <Button
                                            fullWidth
                                            onClick={handleback}
                                            sx={{
                                                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                                color: "#344054",
                                                textTransform: "initial",
                                                border: "1px solid #D0D5DD",
                                                backgroundColor: { md: "transparent", xs: "white" },
                                                height: 40,
                                                fontSize: 20,
                                            }}
                                        >
                                            {" "}
                                            Back
                                        </Button>
                                    </Box>
                                    <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                                        <Button
                                            onClick={handleSubmit}
                                            type="button"
                                            fullWidth
                                            disabled={
                                                // !values["0"]?.width ||
                                                // !values["0"]?.height ||
                                                // !values["0"]?.count
                                                lockNext
                                            }
                                            sx={{
                                                height: 40,
                                                fontSize: 20,
                                                backgroundColor: "#8477da",
                                                "&:hover": {
                                                    backgroundColor: "#8477da",
                                                },
                                            }}
                                            variant="contained"
                                        >
                                            Next
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

