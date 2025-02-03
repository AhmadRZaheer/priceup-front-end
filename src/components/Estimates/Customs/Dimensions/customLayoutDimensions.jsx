import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  NavLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import CustomImage from '@/Assets/customlayoutimage.svg';
import LayoutMeasurementSkeleton
  from '@/components/estimateSkelton/LayoutMeasurementSkeleton';
import {
  getContent,
  getMeasurementSide,
  initializeStateForCustomQuote,
  initializeStateForEditQuote,
  resetNotifications,
  selectedItem,
  setHardwareFabricationQuantity,
  setLayoutArea,
  setLayoutPerimeter,
  setMultipleNotifications,
  setPanelWeight,
  updateMeasurements,
} from '@/redux/customEstimateSlice';
import { getSkeltonState } from '@/redux/estimateSlice';
import { calculateAreaAndPerimeter } from '@/utilities/common';
import {
  inputLength,
  layoutVariants,
  quoteState,
} from '@/utilities/constants';
import { setStateForShowerEstimate } from '@/utilities/estimates';
import {
  generateNotificationsForCurrentEstimate,
} from '@/utilities/estimatorHelper';
import {
  getHardwareFabricationQuantity,
} from '@/utilities/hardwarefabrication';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import AlertsAndWarnings from '../AlertsAndWarnings';

const getNearestSmallerKeyWithValues = (values, itrator) => {
  let itr = itrator;
  while (!values[itr] && itr > 0) {
    itr--;
  }

  return values[itr];
};

export const CustomLayoutDimensions = ({ setStep, recordData, listData }) => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const estimateState = useSelector((state) => state.customsEstimate);
  const selectedContent = useSelector(getContent);
  const measurements = useSelector(getMeasurementSide);
  const currentQuoteState = searchParams.get("estimateState");
  // const currentEstimateState = searchParams.get("estimateState");
  const category = searchParams.get("category");
  const selectedData = useSelector(selectedItem);
  const estimateId = searchParams.get("estimateId");
  const skeltonState = useSelector(getSkeltonState);
  const customInitalValues = {
    [0]: {
      count: 1,
    },
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(measurements, "measurements");
  const [values, setValues] = useState({ ...customInitalValues });
  useEffect(() => {
    if (Object.keys(measurements)?.length) {
      setValues({ ...measurements });
    }
  }, [measurements]);
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

  useEffect(() => {
    if (currentQuoteState === quoteState.EDIT) {
      if (estimateId && estimateId?.length) {
        recordData.refetchRecord();
      } else {
        if (projectId && projectId?.length) {
          navigate(`/projects/${projectId}?category=${category}`);
        } else {
          navigate(`/estimates`);
        }
      }
    }
  }, [estimateId]);

  useEffect(() => {
    if (currentQuoteState === quoteState.EDIT) {
      if (recordData?.record) {
        setStateForShowerEstimate(
          recordData?.record,
          dispatch,
          navigate,
          false
        );
      } else {
        if (recordData?.record === null) {
          if (projectId && projectId?.length) {
            navigate(`/projects/${projectId}?category=${category}`);
          } else {
            navigate(`/estimates`);
          }
        }
      }
    }
  }, [recordData?.record]);

  const [openPopover, setOpenPopover] = useState(false); // State to control popover externally

  const handleSubmit = () => {
    dispatch(resetNotifications());
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
    setOpenPopover(true);
  };

  const handleReset = () => {
    setValues({ ...customInitalValues });
  };

  let lockNext = false;
  Object.entries(values).forEach?.(([key, value]) => {
    const { count, width, height } = value;
    if (!width || !height) {
      lockNext = true;
    }
  });
 console.log(selectedData,'selectedDataselectedData1212')
  useEffect(() => {
    if (currentQuoteState === quoteState.CUSTOM && listData) {
      console.log(listData,'listData1')
      dispatch(initializeStateForCustomQuote({ listData: listData }));
    } else if (
      currentQuoteState === quoteState.EDIT &&
      selectedData &&
      listData
    ) {
      console.log(listData,'listData221')
      dispatch(
        initializeStateForEditQuote({
          estimateData: selectedData,
          quotesId: selectedData?._id,
          hardwaresList: listData,
        })
      );
    }
    return () => {};
  }, [selectedData, listData]);

  return (
    <>
      {skeltonState || recordData.estimateFetcing ? (
        <LayoutMeasurementSkeleton />
      ) : (
        <>
          <form>
            <Box
              sx={{
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
                <AlertsAndWarnings
                  openPopoverExternally={openPopover}
                  setOpenPopover={setOpenPopover}
                />
              </Box>
              <Box
                sx={{
                  paddingX: { md: 2, xs: 0 },
                  paddingBottom: { md: 4, xs: 0 },
                  rowGap: { md: 4, xs: 2 },
                  background: { md: "white", xs: "#08061B" },
                  display: "flex",
                  flexDirection: "column",
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
                    flexDirection: {
                      sm: "column-reverse",
                      xs: "column-reverse",
                    },
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
                      {Array.from({ length: numRows }).map((_, index) => (
                        <Grid
                          key={index}
                          container
                          sx={{
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
                                  getNearestSmallerKeyWithValues(
                                    values,
                                    index
                                  ) || values[`${index}`]
                                )?.width || ""
                              }
                              onChange={(e) => {
                                if (e.target.value.length <= inputLength) {
                                  setValues((vals) => ({
                                    ...vals,
                                    [index]: {
                                      ...vals[index],
                                      width: e.target.value,
                                    },
                                  }));
                                }
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
                                  getNearestSmallerKeyWithValues(
                                    values,
                                    index
                                  ) || values[`${index}`]
                                )?.height || ""
                              }
                              onChange={(e) => {
                                if (e.target.value.length <= inputLength) {
                                  setValues((vals) => ({
                                    ...vals,
                                    [index]: {
                                      ...vals[index],
                                      height: e.target.value,
                                    },
                                  }));
                                }
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
                                    if (e.target.value.length <= inputLength) {
                                      setValues((vals) => ({
                                        ...vals,
                                        [index]: {
                                          ...vals[index],
                                          count: parseInt(e.target.value),
                                        },
                                      }));
                                    }
                                  }}
                                />
                              </Grid>
                              {Math.max(...Object.keys(values)) === index &&
                                index !== 0 && (
                                  <Grid item xs={1}>
                                    <IconButton
                                      onClick={(event) => {
                                        event.preventDefault();
                                        setValues((vals) => {
                                          const {
                                            [index]: notWanted,
                                            ...rest
                                          } = vals;

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
                      display: { md: "flex", xs: "none" },
                      gap: 2,
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
                    <Button
                      fullWidth
                      onClick={addRow}
                      sx={{
                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                        color: { md: "white", xs: "#344054" },
                        textTransform: "initial",
                        border: "1px solid #D0D5DD",
                        backgroundColor: { md: "transparent", xs: "white" },
                        height: 42,
                        fontSize: 16,
                        fontWeight: 600,
                        backgroundColor: "#8477da",
                        minWidth: "105px",
                        ":hover": {
                          border: "1px solid #8477DA",
                          backgroundColor: "#8477da",
                        },
                      }}
                    >
                      Add Row
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
                    {(currentQuoteState === quoteState.CUSTOM || isMobile) && (
                      <NavLink
                        to={
                          currentQuoteState === quoteState.EDIT
                            ? projectId
                              ? `/projects/${projectId}?category=${category}`
                              : "/estimates"
                            : `/estimates/layouts?projectId=${projectId}`
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
                        >
                          {" "}
                          Back
                        </Button>
                      </NavLink>
                    )}
                    <Button
                      onClick={handleSubmit}
                      type="button"
                      disabled={lockNext}
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
      )}
    </>
  );
};
