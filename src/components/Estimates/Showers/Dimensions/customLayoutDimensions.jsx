import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import CustomImage from "@/Assets/customlayoutimage.svg";
import { KeyboardArrowLeft, NoEncryption } from "@mui/icons-material";
import {
  getContent,
  getMeasurementSide,
  getProjectId,
  getQuoteState,
  initializeStateForCustomQuote,
  initializeStateForEditQuote,
  selectedItem,
  setHardwareFabricationQuantity,
  setLayoutArea,
  setLayoutPerimeter,
  setMultipleNotifications,
  setNavigation,
  setNavigationDesktop,
  setPanelWeight,
  updateMeasurements,
} from "@/redux/estimateCalculations";
import { useDispatch, useSelector } from "react-redux";
import { layoutVariants, quoteState } from "@/utilities/constants";
import { calculateAreaAndPerimeter } from "@/utilities/common";
import DeleteIcon from "@mui/icons-material/Delete";
// import { generateNotificationsForCurrentItem } from "../../utilities/estimates";
import { getHardwareFabricationQuantity } from "@/utilities/hardwarefabrication";
import { generateNotificationsForCurrentEstimate } from "@/utilities/estimatorHelper";
import { NavLink, useNavigate } from "react-router-dom";
import AlertsAndWarnings from "../AlertsAndWarnings";

const getNearestSmallerKeyWithValues = (values, itrator) => {
  let itr = itrator;
  while (!values[itr] && itr > 0) {
    itr--;
  }

  return values[itr];
};

const isThereHigherKeyAvailable = (values, iterator) => {
  return Object.keys(values).some((k) => k > iterator);
};

export const CustomLayoutDimensions = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const estimateState = useSelector((state) => state.estimateCalculations);
  const selectedContent = useSelector(getContent);
  const measurements = useSelector(getMeasurementSide);
  const currentQuoteState = useSelector(getQuoteState);
  const selectedData = useSelector(selectedItem);
  const projectId = useSelector(getProjectId);
  const customInitalValues = {
    [0]: {
      count: 1,
    },
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(measurements, "measurements");
  const [values, setValues] = useState(
    Object.keys(measurements)?.length
      ? { ...measurements }
      : { ...customInitalValues }
  );
  console.log(values, "val");
  const rows = Object.keys(values).map((key) => parseInt(values[key]) || 1);

  const numRows = parseInt(rows.reduce((acc, val) => acc + val, 0));
  console.log(numRows, "log", rows);

  const addRow = () => {
    setValues((vals) => ({
      ...vals,
      [parseInt(numRows)]: { count: 1 },
    }));
    console.log(numRows, "log in add row");
  };
  // const handleNext = () => {
  //     dispatch(setNavigation("review"));
  //     dispatch(setNavigationDesktop("review"));
  // };
  // const handleback = () => {
  //     // dispatch(setNavigation("layouts"));
  //     if (currentQuoteState === quoteState.CUSTOM) {
  //         dispatch(setNavigationDesktop("layouts"));
  //     } else {
  //         dispatch(setNavigationDesktop("existing"));
  //     }
  // };
  const handleSubmit = () => {
    // const measurementsArray = Object.keys(values)
    //   .map((k) => values[k])
    //   .reduce((prev, current) => {
    //     let count = current.count;
    //     if (count === 1) return [...prev, current];
    //     let results = [];
    //     while (count >= 1) {
    //       const { width, height } = current;
    //       results.push({ width, height });
    //       count--;
    //     }

    //     return [...prev, ...results];
    //   }, []);

    // const arrayForMeasurement = measurementsArray
    //   .map((v) =>
    //     Object.keys(v).map((k) =>
    //       k !== "count" ? { value: v[k] } : { value: "" }
    //     )
    //   )
    //   .flat();

    const result = calculateAreaAndPerimeter(
      values,
      layoutVariants.CUSTOM,
      selectedContent.glassType?.thickness
    );
    if (result?.panelWeight) {
      dispatch(setPanelWeight(result?.panelWeight));
    }
    dispatch(setLayoutArea(result.areaSqft));
    dispatch(setLayoutPerimeter(result.perimeter));
    dispatch(updateMeasurements(values));
    const notificationsResult = generateNotificationsForCurrentEstimate(
      {
        ...estimateState,
        content: {
          ...estimateState.content,
          polish: result.perimeter - estimateState.content.mitre,
        },
        panelWeight: result?.panelWeight ?? estimateState.panelWeight,
      },
      "3/8"
    );
    dispatch(setMultipleNotifications({ ...notificationsResult }));
    if (currentQuoteState === quoteState.CREATE) {
      const fabricationValues = getHardwareFabricationQuantity(
        { ...notificationsResult.selectedContent, glassThickness: "3/8" },
        currentQuoteState,
        null
      );
      dispatch(setHardwareFabricationQuantity({ ...fabricationValues }));
    }
    if (isMobile) {
      setStep(1);
    }
    // navigate("/estimates/review");
    // dispatch(setNavigation("review"));
    // dispatch(setNavigationDesktop("review"));

    // Reset the form
    // setValues({ ...customInitalValues });
    // setNumRows(customInitalValues.count);
  };

  const handleReset = () => {
    setValues({ ...customInitalValues });
    // setNumRows(customInitalValues.count);
  };

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  let lockNext = false;

  Object.entries(values).forEach?.(([key, value]) => {
    const { count, width, height } = value;
    if (!width || !height) {
      lockNext = true;
    }
  });

  useEffect(() => {
    if (currentQuoteState === quoteState.CUSTOM) {
      dispatch(initializeStateForCustomQuote());
    } else if (currentQuoteState === quoteState.EDIT) {
      dispatch(
        initializeStateForEditQuote({
          estimateData: selectedData,
          quotesId: selectedData._id,
        })
      );
    }
    return () => {};
  }, []);

  return (
    <>
      <form>
        <Box
          sx={{
            // maxWidth:'600px',
            borderRadius: { sm: "12px", xs: 0 },
            boxShadow:
              "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            border: {
              sm: " 1px solid rgba(212, 219, 223, 1)",
              xs: "none",
            },
            overflow: { sm: "hidden" },
          }}
        >
          <Box
            sx={{
              background: " rgba(243, 245, 246, 1)",
              paddingY: 2,
              px: 3,
              display: { sm: "flex", xs: "none" },
              borderBottom: "1px solid rgba(212, 219, 223, 1)",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
              Layout & Measurement
            </Typography>
            <AlertsAndWarnings />
          </Box>
          <Box
            sx={{
              // height: "100%",

              paddingX: { md: 2, xs: 0 },
              paddingBottom: { md: 4, xs: 0 },
              rowGap: { md: 4, xs: 2 },
              background: { md: "white", xs: "#08061B" },
              display: "flex",
              flexDirection: "column",
              // minWidth: { md: 700, xs: "100%" },
              maxWidth: { md: 1000, xs: "100%" },
              justifyContent: { md: "", xs: "space-between" },
            }}
          >
            <Box
              sx={{
                paddingLeft: { md: 0, xs: 3 },
                paddingTop: { md: 2, xs: 2 },
                display: { sm: "none", xs: "block" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { md: "18px", xs: "18px" },
                  color: { md: "#101828", xs: "white" },
                  paddingBottom: 1,
                }}
              >
                Enter Measurements
              </Typography>
              <Typography
                sx={{ color: { md: "#667085", xs: "white" }, font: "14px" }}
              >
                Your new project has been created. Invite colleagues to
                collaborate on this project.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { sm: "column-reverse", xs: "column-reverse" },
                width: { md: "auto", xs: "100%" },
                paddingBottom: 0,
                paddingX: { md: 2, xs: 0 },
                height: "99%",
                background: { md: "none", xs: "#08061B" },
                gap: { md: 4, xs: 0 },
                borderRadius: "8px",
                overflow: "auto",
                mb: 0,
                maxHeight: { md: "100vh", xs: "90vh" },
                position: "relative",
                mt: { sm: 4, xs: 0 },
              }}
            >
              <Button
                fullWidth
                onClick={addRow}
                sx={{
                  display: { sm: "flex", xs: "none" },
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  color: { md: "white", xs: "#344054" },
                  textTransform: "initial",
                  border: "1px solid #D0D5DD",
                  backgroundColor: "#8477da",
                  "&:hover": {
                    backgroundColor: "#8477da",
                  },
                  height: 42,
                  fontSize: 20,
                  // position: "absolute",
                  // marginX: "auto",
                  // width: { md: "92%", xs: "90%" },
                  // bottom: 5,
                }}
              >
                Add Row
              </Button>
              <Box
                sx={{
                  display: "flex",
                  width: { sm: "100%", xs: "90%" },
                  minHeight: "240px",
                  maxHeight: { sm: 340, xs: "34vh" },
                  marginX: "auto",
                  flexDirection: "column",
                  overflowY: "auto",
                  gap: { md: 1, xs: 2 },
                  color: { md: "#101828", xs: "white" },
                  background: {
                    md: "none",
                    xs: "linear-gradient(to top right, #100d24 35%, #312969 , #100d24 82%)",
                  },
                  borderTopLeftRadius: { md: 0, xs: 30 },
                  borderTopRightRadius: { md: 0, xs: 30 },
                  borderTop: { md: 0, xs: "1px solid #667085" },
                  paddingX: { md: 0, xs: 2 },
                  paddingY: { sm: 2, xs: 2 },
                }}
              >
                <Box sx={{ pb: 0, my: 2 }}>
                  {" "}
                  {/* a */}
                  {Array.from({ length: numRows }).map((_, index) => (
                    <Grid
                      key={index}
                      container
                      sx={{
                        // display: "flex",
                        alignItems: "center",
                        gap: 1.8,
                        mb: 1,
                      }}
                    >
                      <Grid item xs={3}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 600,
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
                          className="custom-textfield-purple"
                          placeholder="0"
                          style={{
                            display:
                              typeof values[index]?.count == "undefined"
                                ? "none"
                                : "block",
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
                      </Grid>

                      <Grid item xs={3}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: { sm: "black", xs: "white" },
                          }}
                        >
                          Height
                        </Typography>

                        <TextField
                          className="custom-textfield-purple"
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
                      </Grid>
                      {typeof values[index]?.count !== "undefined" && (
                        <>
                          <Grid item sm={4} xs={3}>
                            <Typography
                              sx={{
                                fontSize: 16,
                                fontWeight: 600,
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
                              className="custom-textfield-purple"
                              type="number"
                              size="small"
                              variant="outlined"
                              name={`Count${index}`}
                              InputProps={{
                                inputProps: { min: 1 },
                              }}
                              value={values[index]?.count || ""}
                              placeholder="quantity"
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
                          </Grid>
                          {Math.max(...Object.keys(values)) === index &&
                            index !== 0 && (
                              <Grid item xs={1}>
                                <IconButton
                                  // href="#"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setValues((vals) => {
                                      const { [index]: notWanted, ...rest } =
                                        vals;

                                      return rest;
                                    });
                                  }}
                                  sx={{ mt: "25px" }}
                                >
                                  <DeleteIcon
                                    sx={{
                                      color: {
                                        md: "#101828",
                                        xs: "white",
                                      },
                                      width: 21,
                                      height: 21,
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            )}
                        </>
                      )}
                    </Grid>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: { md: "100%", xs: "100%" },
                  justifyContent: "center",
                  alignItems: "center",
                  maxHeight: "fit-contant",
                  minHeight: 100,
                }}
              >
                <Box sx={{ display: { md: "flex", xs: "none" } }}>
                  <img
                    width="100%"
                    height="100%"
                    src={CustomImage}
                    alt="Selected"
                  />
                </Box>
                <Box sx={{ display: { md: "none", xs: "flex" } }}>
                  <img
                    width="150px"
                    height="200px"
                    src={CustomImage}
                    alt="Selected"
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                background: { md: "transparent", xs: "#08061B" },
                pt: { sm: 2, xs: 0 },
                pb: { sm: 2, xs: 10 },
                display: { md: "none", xs: "flex" },
                justifyContent: { md: "space-between", xs: "center" },
                width: "95%",
                gap: 2,
                px: 1,
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
              <Button
                fullWidth
                onClick={addRow}
                sx={{
                  display: { md: "none", sx: "flex" },
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  color: "white",
                  textTransform: "initial",
                  height: 40,
                  fontSize: 20,
                  marginX: "auto",
                  backgroundColor: "#8477da",
                  "&:hover": {
                    backgroundColor: "#8477da",
                  },
                  width: { md: 480, xs: "92%" },
                }}
              >
                Add Row
              </Button>
            </Box>
            <Box
              sx={{
                position: { md: "static", xs: "fixed" },
                bottom: { md: 100, xs: 0 },
                background: { md: "transparent", xs: "#100d24" },
                // py: 2,
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
                    height: 42,
                    fontSize: 16,
                    fontWeight: 600,
                    ":hover": {
                      border: "1px solid #8477DA",
                    },
                  }}
                >
                  Reset
                </Button>
              </Box>
              {/**Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: { sm: "static", xs: "fixed" },
                  bottom: 0,
                  left: 0,
                  width: { sm: "auto", xs: "100%" },
                  p: { sm: 0, xs: 2 },
                  bgcolor: { sm: "white", xs: "#08061B" },
                  gap: 1,
                }}
              >
                <NavLink
                  to={
                    currentQuoteState === quoteState.EDIT
                      ? projectId
                        ? `/projects/${projectId}`
                        : "/estimates"
                      : "/estimates/layouts"
                  }
                >
                  <Button
                    sx={{
                      width: { xs: 120, sm: "auto" },
                      color: "black",
                      border: "1px solid #D0D5DD",
                      ":hover": {
                        border: "1px solid #8477DA",
                      },
                      fontSize: 16,
                      // ml: 2,
                      backgroundColor: "white",
                      height: 42,
                      fontWeight: 600,
                    }}
                    fullWidth
                    variant="outlined"
                    // onClick={handleBack}
                  >
                    {" "}
                    Back
                  </Button>
                </NavLink>
                <Button
                  onClick={handleSubmit}
                  type="button"
                  disabled={
                    // !values["0"]?.width ||
                    // !values["0"]?.height ||
                    // !values["0"]?.count
                    lockNext
                  }
                  sx={{
                    width: { xs: 120, sm: "auto" },
                    backgroundColor: "#8477DA",
                    fontSize: 16,
                    "&:hover": { backgroundColor: "#8477DA" },
                    ":disabled": {
                      bgcolor: "#c2c2c2",
                    },
                    mr: { sm: 0, xs: "30px" },
                    color: "white",
                    height: 42,
                    fontWeight: 600,
                  }}
                  fullWidth
                  variant="contained"
                >
                  {" "}
                  {isMobile ? "Next" : "Run Quote"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};
