import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import bgCustom from "@/Assets/customlayoutimage.svg";
import { getEstimateCategory, setEstimateCategory, setEstimateState } from "@/redux/estimateSlice";
import { EstimateCategory } from "@/utilities/constants";
import { resetMirrorEstimateState } from "@/redux/mirrorsEstimateSlice";

const boxStyles = {
    minHeight: "182px",
    minWidth: "180px",
    margin: "auto",
    borderRadius: "12px",
    boxShadow:
        "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
    border: "1px solid #EAECF0",
    p: 2,
    background: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    flexDirection: "column",
    cursor: "pointer",
};

export const SelectCategory = () => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const selectedCategory = useSelector(getEstimateCategory);
    const handleBoxClick = (category) => {
        dispatch(setEstimateCategory(category));
        dispatch(setEstimateState("create"));
        
    };

    useEffect(() => {
        setLoading(false)
        return () => {
            setLoading(true);
        }
    }, []);
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                    height: "100vh",
                    background: { sm: "white", xs: "#08061B" },
                }}
            >
                <Box
                    sx={{
                        width: { sm: 800 },
                    }}
                >
                    <Box style={{ paddingBottom: "10px" }}>
                        <Box
                            sx={{
                                backgroundColor: { xs: "#100D24", sm: "white" },
                                padding: { xs: "20px 15px", sm: "0px" },
                                borderBottomRightRadius: { xs: "16px", sm: "0px" },
                                borderBottomLeftRadius: { xs: "16px", sm: "0px" },
                                display: "flex",
                                alignItems: "center",
                                marginTop: { sm: 0, xs: 2 },
                            }}
                        >
                            <NavLink to="/estimates">
                                <Box
                                    //   onClick={handleBack}
                                    sx={{
                                        display: { xs: "block", sm: "none" },
                                        paddingRight: "20px",
                                        paddingTop: "4px",
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
                                Create New Estimate
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            height: 600,
                            overflow: "hidden",
                            borderRadius: "12px",
                            boxShadow:
                                "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                            border: { md: "1px solid #EAECF0", xs: "none" },
                            paddingX: 2,
                            paddingY: 4,
                            rowGap: 2,
                            background: { sm: "white", xs: "#08061B" },
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { md: "18px", xs: "18px" },
                                    color: { md: "#101828", xs: "white" },
                                    paddingBottom: 1,
                                    fontWeight: 600,
                                }}
                            >
                                Select Category
                            </Typography>
                            <Typography
                                sx={{ color: { md: "#667085", xs: "white" }, font: "14px" }}
                            >
                                Choose one category from below options.
                            </Typography>
                        </Box>
                        {loading ? (
                            <Box
                                sx={{
                                    width: 40,
                                    m: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 300,
                                }}
                            >
                                <CircularProgress sx={{ color: "#8477DA" }} />
                            </Box>
                        ) : (
                            <Grid
                                container
                                gap={1}
                                sx={{ minHeight: "40vh", overflow: "auto", maxHeight: "60vh" }}
                            >

                                <Box
                                    key={'showers-cat'}
                                    sx={{
                                        ...boxStyles,
                                        backgroundColor:
                                            selectedCategory !== EstimateCategory.SHOWERS
                                                ? "#D9D9D9"
                                                : "#8477DA",
                                        color:
                                            selectedCategory !== EstimateCategory.SHOWERS ? "black" : "white",
                                        width: "162px",
                                        height: "192px",
                                    }}
                                    onClick={() => handleBoxClick(EstimateCategory.SHOWERS)}
                                >
                                    <img
                                        style={{
                                            position: "relative",
                                            zIndex: 1,
                                            width: "120px",
                                            height: "140px",
                                        }}
                                        src={bgCustom}
                                        alt="Selected"
                                    />
                                    <Typography sx={{ font: "18px" }}>
                                        Showers
                                    </Typography>
                                </Box>
                                <Box
                                    key={'mirrors-cat'}
                                    sx={{
                                        ...boxStyles,
                                        backgroundColor:
                                            selectedCategory !== EstimateCategory.MIRRORS
                                                ? "#D9D9D9"
                                                : "#8477DA",
                                        color:
                                            selectedCategory !== EstimateCategory.MIRRORS ? "black" : "white",
                                        width: "162px",
                                        height: "192px",
                                    }}
                                    onClick={() => handleBoxClick(EstimateCategory.MIRRORS)}
                                >
                                    <img
                                        style={{
                                            position: "relative",
                                            zIndex: 1,
                                            width: "120px",
                                            height: "140px",
                                        }}
                                        src={bgCustom}
                                        alt="Selected"
                                    />
                                    <Typography sx={{ font: "18px" }}>
                                        Mirrors
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                position: { sm: "static", xs: "fixed" },
                                bottom: 0,
                                width: { sm: "auto", xs: "90%" },
                                py: { sm: 0, xs: 2 },
                                bgcolor: { sm: "white", xs: "#08061B" },
                            }}
                        >
                            <NavLink to="/estimates">
                                <Button
                                    sx={{
                                        width: { xs: 120, sm: 180 },
                                        color: "black",
                                        border: "1px solid black",
                                        fontSize: 18,
                                        ml: 2,
                                        backgroundColor: "white",
                                    }}
                                    fullWidth
                                    variant="outlined"
                                // onClick={handleBack}
                                >
                                    {" "}
                                    Back
                                </Button>
                            </NavLink>
                            <NavLink to="/estimates/layouts">

                                <Button
                                    disabled={selectedCategory === '' ? true : false}
                                    sx={{
                                        width: { xs: 120, sm: 180 },
                                        backgroundColor: "#8477DA",
                                        fontSize: 18,
                                        "&:hover": { backgroundColor: "#8477DA" },
                                        ":disabled": {
                                            bgcolor: "#c2c2c2",
                                        },
                                        color: "white",
                                    }}
                                    // onClick={setStorePage}
                                    fullWidth
                                    variant="contained"
                                >
                                    {" "}
                                    Next
                                </Button>
                            </NavLink>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
