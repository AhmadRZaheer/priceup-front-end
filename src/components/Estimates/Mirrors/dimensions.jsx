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
import EstimateDetailSkeleton
  from '@/components/estimateSkelton/EstimateDetailSkeleton';
import LayoutMeasurementSkeleton
  from '@/components/estimateSkelton/LayoutMeasurementSkeleton';
import ModificationSkeleton
  from '@/components/estimateSkelton/ModificationSkeleton';
import {
  getSkeltonState,
  setSkeltonState,
} from '@/redux/estimateSlice';
import { getLocationMirrorSettings } from '@/redux/locationSlice';
import {
  getEstimateMeasurements,
  getNotifications,
  getSelectedContent,
  getSelectedItem,
  initializeStateForEditQuote,
  resetNotifications,
  setEstimateMeasurements,
  setMultipleNotifications,
  setPricing,
  setSelectedItem,
  setSqftArea,
  setSufferCostDifference,
} from '@/redux/mirrorsEstimateSlice';
import { getMirrorsHardware } from '@/redux/mirrorsHardwareSlice';
import { useFetchSingleDocument } from '@/utilities/ApiHooks/common';
import { backendURL } from '@/utilities/common';
import {
  inputLength,
  quoteState,
} from '@/utilities/constants';
import {
  calculateTotal,
  generateNotificationsForCurrentEstimate,
  getAreaSqft,
} from '@/utilities/mirrorEstimates';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Collapse,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import AlertsAndWarnings from './AlertsAndWarnings';
import { MirrorReview } from './review';
import Summary from './summary';

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
  const [searchParams] = useSearchParams();
  const estimateId = searchParams.get("estimateId");
  const mirrorLocationSettings = useSelector(getLocationMirrorSettings);
  const measurements = useSelector(getEstimateMeasurements);
  const isMobile = useMediaQuery("(max-width: 600px)");
  // const currentEstimateState = useSelector(getEstimateState);
  const currentEstimateState = searchParams.get("estimateState");
  const selectedItem = useSelector(getSelectedItem);
  const selectedContent = useSelector(getSelectedContent);
  const notifications = useSelector(getNotifications);
  const mirrorsHardware = useSelector(getMirrorsHardware);
  // const projectId = useSelector(getProjectId);
  const projectId = searchParams.get("projectId");
  const iphoneSe = useMediaQuery("(max-width: 375px)");
  const iphone14Pro = useMediaQuery("(max-width: 430px)");
  const category = searchParams.get("category");
  const [step, setStep] = useState(0); // 0 for dimension, 1 for review, 2 for summary
  const [openAlert, setOpenAlert] = useState(true);
  // console.log(measurements, "measurements");
  const skeltonState = useSelector(getSkeltonState);

  const {
    data: record,
    refetch: refetchRecord,
    isFetching,
    isSuccess,
  } = useFetchSingleDocument(`${backendURL}/estimates/${estimateId}`);

  useEffect(() => {
    dispatch(setSkeltonState());
  }, [isSuccess]);

  useEffect(() => {
    if (currentEstimateState === quoteState.EDIT) {
      if (estimateId && estimateId?.length) {
        refetchRecord();
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
    if (currentEstimateState === quoteState.EDIT) {
      if (record) {
        dispatch(setSelectedItem(record));
        dispatch(setEstimateMeasurements(record?.config?.measurements));
        dispatch(
          initializeStateForEditQuote({
            estimateData: record,
            hardwaresList: mirrorsHardware,
          })
        );
      } else {
        if (record === null) {
          if (projectId && projectId?.length) {
            navigate(`/projects/${projectId}?category=${category}`);
          } else {
            navigate(`/estimates`);
          }
        }
      }
    }
  }, [record]);

  const customInitalValues = {
    [0]: {
      count: 1,
    },
  };

  const [values, setValues] = useState(
    // Object.keys(measurements)?.length
    //   ? { ...measurements }
    //   :
    { ...customInitalValues }
  );
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
  };

  let lockNext = false;

  Object.entries(values).forEach?.(([key, value]) => {
    const { count, width, height } = value;
    if (!width || !height) {
      lockNext = true;
    }
  });

  // const handleback = () => {
  //     if (currentEstimateState === quoteState.EDIT) {
  //         navigate('/estimates')
  //     } else {
  //         navigate('/estimates/category');
  //     }
  // };

  const handleReset = () => {
    setValues({ ...customInitalValues });
    // setNumRows(customInitalValues.count);
  };

  const [openPopover, setOpenPopover] = useState(false);

  const handleSubmit = () => {
    dispatch(resetNotifications());
    dispatch(setEstimateMeasurements(values));
    const sqft = getAreaSqft(values);
    dispatch(setSqftArea(sqft.areaSqft));
    const prices = calculateTotal(
      selectedContent,
      sqft.areaSqft,
      mirrorLocationSettings,
      values
    );
    dispatch(setPricing(prices));
    const notificationsResult = generateNotificationsForCurrentEstimate(
      selectedContent,
      notifications
    );
    dispatch(setMultipleNotifications(notificationsResult));
    setOpenPopover(true);
    if (isMobile) {
      setStep(1);
    }
    // navigate("/estimates/review");
  };
 const handleSufferCost = ()=>{
    dispatch(setSufferCostDifference());
  }
  const sufferStatus = selectedContent.sufferCostDifference &&  currentEstimateState === quoteState.EDIT
  return (
    <Box>
      {sufferStatus && (
          <Box sx={{ width: "100%" }}>
          <Collapse in={openAlert}>
            <Alert
              // action={
              //   <IconButton
              //     aria-label="close"
              //     size="small"
              //     onClick={() => {
              //       setOpenAlert(false);
              //     }}
              //   >
              //     <Close fontSize="inherit" sx={{ color: "white" }} />
              //   </IconButton>
              // }
              icon={false}
              sx={{
                mb: 1,
                border: "2px solid #DC3545",
                color: "#DC3545",
                px:'12px',
                py:'6px',
                width:'-webkit-fill-available',
                background:'transparent',
                display:'block',
                '.MuiAlert-message' : {
                  p:'0px'
                }
              }}
            >
              <Box sx={{ display: "flex", justifyContent:'space-between' }}>
                <Typography sx={{ alignSelf: "center",fontWeight:'bold' }}>
                  This estimate has a cost discrepancy. Would you like to apply
                  the updated cost?
                </Typography>
                <Button
                onClick={handleSufferCost}
                  variant="contained"
                  sx={{
                    display: "flex",
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "white",
                    textTransform: "initial",
                    // height: 40,
                    fontSize: 14,
                    backgroundColor: "#8477da",
                    p:'8px 16px 8px 16px !important',
                    "&:hover": {
                      backgroundColor: "#8477da",
                    },
                  }}
                >
                  Apply Cost
                </Button>
              </Box>
            </Alert>
          </Collapse>
        </Box>
        )}
      <Box
        sx={{
          // width: "100%",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // background: "white",
          // height: "100vh",
          background: { sm: "#F6F5FF", xs: "#08061B" },
          // padding: 2,
          overflow: { sm: "", xs: "auto" },
        }}
      >
        <Box style={{ paddingBottom: "10px" }}>
          <Box
            sx={{
              backgroundColor: { xs: "#100D24", sm: "#F6F5FF" },
              padding: { xs: "10px", sm: "0px" },
              borderBottomRightRadius: { xs: "16px", sm: "0px" },
              borderBottomLeftRadius: { xs: "16px", sm: "0px" },
              display: "flex",
              alignItems: "center",
              marginTop: { sm: 0, xs: 5 },
            }}
          >
            <NavLink
              to={
                projectId
                  ? `/projects/${projectId}?category=${category}`
                  : "/estimates"
              }
            >
              <Box
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
            <Box
              sx={{
                color: { sm: "black", xs: "white" },
                fontSize: { xs: "24px", sm: "24px" },
                textAlign: { xs: "start", sm: "center" },
                fontWeight: 600,
                pl: { sm: 0, xs: 3.5 },
              }}
            >
              <NavLink
                to={
                  currentEstimateState === quoteState.EDIT
                    ? projectId
                      ? `/projects/${projectId}?category=${category}`
                      : "/estimates"
                    : `/projects/${projectId}?category=${category}`
                }
                style={{
                  textDecoration: "none",
                  color: "rgba(93, 97, 100, 1)",
                }}
              >
                <span style={{ cursor: "pointer" }}>Projects </span>
              </NavLink>
              <span>
                {currentEstimateState === quoteState.EDIT
                  ? "/ Edit Estimate"
                  : "/ Create New Estimate"}
              </span>
            </Box>
          </Box>
        </Box>
        {!isMobile ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              pt: 3,
              pointerEvents: sufferStatus ? 'none' : 'auto',
              opacity: sufferStatus ? 0.5 : 1  
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                // flexWrap: 'wrap',
                width: { lg: "60%", md: "50%" },
              }}
            >
              {skeltonState || isFetching ? (
                <>
                  <LayoutMeasurementSkeleton />
                  <EstimateDetailSkeleton />
                </>
              ) : (
                <>
                  <form>
                    <Box
                      sx={{
                        // maxWidth: '600px',
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
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            fontFamily: '"Roboto", sans-serif !important',
                          }}
                        >
                          Layout & Measurement
                        </Typography>
                        <AlertsAndWarnings
                          openPopoverExternally={openPopover}
                          setOpenPopover={setOpenPopover}
                        />
                      </Box>
                      <Box
                        sx={{
                          height: iphoneSe
                            ? "auto"
                            : iphone14Pro
                            ? 725
                            : "auto",

                          paddingX: { sm: 2, xs: 0 },
                          paddingBottom: { sm: 4, xs: 0 },
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
                            display: { sm: "none", xs: "block" },
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
                            sx={{
                              color: { sm: "#667085", xs: "white" },
                              font: "14px",
                            }}
                          >
                            Your new project has been created. Invite colleagues
                            to collaborate on this project.
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: {
                              sm: "column-reverse",
                              xs: "column",
                            },
                            width: { sm: "auto", xs: "99.8%" },
                            padding: { sm: 2, xs: 0 },

                            // height: "100%",
                            // background: { sm: "#D9D9D9" },
                            gap: 4,
                            // borderRadius: "8px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              width: { sm: "100%", xs: "92%" },
                              minHeight: "240px",
                              maxHeight: { sm: 340, xs: "34vh" },
                              flexDirection: "column",
                              overflowY: "auto",
                              gap: { sm: 2, xs: 2 },
                              color: { sm: "black", xs: "white" },
                              borderRadius: "34px 34px 0px 0px",
                              background: {
                                xs: "rgba(16, 13, 36, 0.01)",
                                sm: "none",
                              },
                              backdropFilter: {
                                xs: "blur(81.5px)",
                                sm: "none",
                              },
                              background: {
                                sm: "none",
                                xs: "linear-gradient(to top right, #100d24 35%, #312969 , #100d24 82%)",
                              },
                              borderTopLeftRadius: { sm: 0, xs: 30 },
                              borderTopRightRadius: { sm: 0, xs: 30 },
                              borderTop: { sm: 0, xs: "1px solid #667085" },
                              paddingX: { sm: 0, xs: 2 },
                              paddingTop: { sm: 0, xs: 4 },
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
                                    className="custom-textfield-purple"
                                    name={`aWidth${index}`}
                                    InputProps={{
                                      inputProps: { min: 0 },
                                    }}
                                    placeholder="0"
                                    style={{
                                      display:
                                        typeof values[index]?.count ==
                                        "undefined"
                                          ? "none"
                                          : "block",
                                      width: { md: "28%", xs: "20%" },
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
                                      if (
                                        e.target.value.length <= inputLength
                                      ) {
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
                                </Box>

                                <Box>
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
                                    type="number"
                                    size="small"
                                    variant="outlined"
                                    name={`aHeight${index}`}
                                    className="custom-textfield-purple"
                                    InputProps={{
                                      inputProps: { min: 0 },
                                    }}
                                    placeholder="0"
                                    style={{
                                      display:
                                        typeof values[index]?.count ==
                                        "undefined"
                                          ? "none"
                                          : "block",
                                      width: { md: "28%", xs: "20%" },
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
                                      if (
                                        e.target.value.length <= inputLength
                                      ) {
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
                                </Box>
                                {typeof values[index]?.count !==
                                  "undefined" && (
                                  <>
                                    <Box>
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
                                        type="number"
                                        size="small"
                                        variant="outlined"
                                        className="custom-textfield-purple"
                                        name={`Count${index}`}
                                        InputProps={{
                                          inputProps: { min: 1 },
                                        }}
                                        value={values[index]?.count || ""}
                                        placeholder="quantity"
                                        style={{
                                          width: { md: "15%", xs: "20%" },
                                        }}
                                        onChange={(e) => {
                                          if (
                                            e.target.value.length <= inputLength
                                          ) {
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
                                    </Box>
                                    {Math.max(...Object.keys(values)) ===
                                      index &&
                                      index !== 0 && (
                                        <a
                                          href="#"
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
                                        >
                                          <DeleteIcon
                                            sx={{
                                              color: {
                                                md: "#101828",
                                                xs: "white",
                                              },
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
                              // width: { sm: "48.5%" },
                              justifyContent: "end",
                              alignItems: "center",
                              margin: "auto",
                              order: { sm: 1, xs: -1 },
                            }}
                          >
                            <Box
                              sx={{
                                width: { xs: "145px", sm: "300px" },
                                height: { xs: "188px", sm: "340px" },
                                // padding: { xs: "10px", sm: "0px" },
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
                          {/* <Button
                          fullWidth
                          onClick={addRow}
                          sx={{
                            display:"flex",
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
                            // width: { md: 480, xs: "92%" },
                            order: -2,
                          }}
                        >
                          Add Row
                        </Button> */}
                        </Box>
                        {/* Buttons */}
                        <Box
                          sx={{
                            position: { md: "static", xs: "fixed" },
                            bottom: { md: 100, xs: 0 },
                            background: { md: "transparent", xs: "#100d24" },
                            py: { sm: 0, xs: 2 },
                            display: "flex",
                            justifyContent: {
                              md: "space-between",
                              xs: "center",
                            },
                            width: "100%",
                            borderTop: { md: "0px", xs: "1px solid white" },
                          }}
                        >
                          <Box
                            sx={{
                              // width: { md: "160px", xs: "50%" },
                              display: { md: "flex", xs: "none" },
                              gap: 2,
                            }}
                          >
                            <Button
                              // fullWidth
                              onClick={handleReset}
                              sx={{
                                color: "black",
                                textTransform: "initial",
                                border: "1px solid #D0D5DD",
                                backgroundColor: {
                                  md: "transparent",
                                  xs: "white",
                                },
                                ":hover": { border: "1px solid #8477DA" },
                                height: 42,
                                fontSize: 16,
                                fontWeight: 600,
                              }}
                            >
                              Reset
                            </Button>
                            <Button
                              // fullWidth
                              onClick={addRow}
                              sx={{
                                display: "flex",
                                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                color: "white",
                                textTransform: "initial",
                                height: 40,
                                fontSize: 16,
                                fontWeight: 600,
                                marginX: "auto",
                                backgroundColor: "#8477da",
                                "&:hover": {
                                  backgroundColor: "#8477da",
                                },
                                // width: { md: 480, xs: "92%" },
                              }}
                            >
                              Add Row
                            </Button>
                          </Box>
                          {/** Buttons */}
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
                                currentEstimateState === quoteState.EDIT
                                  ? projectId
                                    ? `/projects/${projectId}?category=${category}`
                                    : "/estimates"
                                  : `/projects/${projectId}?category=${category}`
                              }
                            >
                              <Button
                                sx={{
                                  width: { xs: 120, sm: "auto" },
                                  color: "black",
                                  border: "1px solid black",
                                  fontSize: 16,
                                  fontWeight: 600,
                                  // ml: 2,
                                  border: "1px solid #D0D5DD",
                                  ":hover": { border: "1px solid #8477DA" },
                                  backgroundColor: "white",
                                  height: 42,
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
                                fontWeight: 600,
                                height: 42,
                                "&:hover": { backgroundColor: "#8477DA" },
                                ":disabled": {
                                  bgcolor: "#c2c2c2",
                                },
                                mr: { sm: 0, xs: "30px" },
                                color: "white",
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
                  <Summary />
                </>
              )}
            </Box>
            <Box
              sx={{
                // flexGrow: 1
                width: { lg: "40%", md: "50%" },
                pr: "1px",
              }}
            >
              {skeltonState || isFetching ? (
                <ModificationSkeleton />
              ) : (
                <MirrorReview />
              )}
            </Box>
          </Box>
        ) : (
          <>
            {step === 0 ? (
              <form>
                <Box
                  sx={{
                    height: iphoneSe ? "auto" : iphone14Pro ? 725 : "auto",
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
                    // overflow: "auto"
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
                      sx={{
                        color: { sm: "#667085", xs: "white" },
                        font: "14px",
                      }}
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
                        background: {
                          xs: "rgba(16, 13, 36, 0.01)",
                          sm: "none",
                        },
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
                                  getNearestSmallerKeyWithValues(
                                    values,
                                    index
                                  ) || values[`${index}`]
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
                                  getNearestSmallerKeyWithValues(
                                    values,
                                    index
                                  ) || values[`${index}`]
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
                    {/** Buttons */}
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
                      {(currentEstimateState === quoteState.CREATE ||
                        isMobile) && (
                        <NavLink
                          to={
                            currentEstimateState === quoteState.EDIT
                              ? projectId
                                ? `/projects/${projectId}?category=${category}`
                                : "/estimates"
                              : `/projects/${projectId}?category=${category}`
                          }
                        >
                          <Button
                            sx={{
                              width: { xs: 120, sm: 180 },
                              color: "black",
                              border: "1px solid black",
                              fontSize: 18,
                              // ml: 2,
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
                      )}
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
                          width: { xs: 120, sm: 180 },
                          backgroundColor: "#8477DA",
                          fontSize: 18,
                          "&:hover": { backgroundColor: "#8477DA" },
                          ":disabled": {
                            bgcolor: "#c2c2c2",
                          },
                          mr: { sm: 0, xs: "30px" },
                          color: "white",
                        }}
                        fullWidth
                        variant="contained"
                      >
                        {" "}
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </form>
            ) : step === 1 ? (
              <MirrorReview setStep={setStep} />
            ) : step === 2 ? (
              <Summary setStep={setStep} />
            ) : (
              ""
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
