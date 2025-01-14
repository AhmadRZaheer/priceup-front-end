import React, { useMemo } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuList from "./menuList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditEstimates } from "@/utilities/ApiHooks/estimate";
import Summary from "./summary";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  EstimateCategory,
  inputLength,
  inputMaxValue,
  mirrorHardwareTypes,
  quoteState,
} from "@/utilities/constants";
import { getLocationMirrorSettings } from "@/redux/locationSlice";
import { getEstimateState } from "@/redux/estimateSlice";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import {
  getAdditionalFields,
  getEstimateId,
  getEstimateMeasurements,
  getNotifications,
  getPricing,
  getProjectId,
  getSelectedContent,
  getSqftArea,
  resetNotifications,
  setEstimateDiscountTotal,
  setInputContent,
  setPricing,
  setSelectedContent,
  setToggles,
} from "@/redux/mirrorsEstimateSlice";
import {
  calculateTotal,
  getEstimateErrorStatus,
} from "@/utilities/mirrorEstimates";
import { showSnackbar } from "@/redux/snackBarSlice";
import { SingleField } from "@/components/ui-components/SingleFieldComponent";
import HardwareMissingAlert from "@/components/Modal/hardwareMissingAlert";
import { enqueueSnackbar } from "notistack";
import EnterLabelModal from "../enterLabelModal";
import { Add } from "@mui/icons-material";
import { generateEstimatePayloadForMirror } from "@/utilities/generateEstimateCalculationContent";

// const floatingSizes = [{ id: 1, name: 'Small', image: "/images/others/default.png" }, { id: 2, name: 'Medium', image: "/images/others/default.png" }, { id: 3, name: 'Large', image: "/images/others/default.png" }]


export const MirrorReview = ({ setStep }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    mutate: mutateEdit,
    isError: ErrorForAddEidt,
    isLoading:EditEstimateLoading,
    isSuccess: CreatedSuccessfullyEdit,
  } = useEditEstimates();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [hardwareMissingAlert, setHardwareMissingAlert] = useState(false);
  const [estimateConfig, setEstimateConfig] = useState(null);
  const mirrorLocationSettings = useSelector(getLocationMirrorSettings);
  const hardwaresList = useSelector(getMirrorsHardware);
  const measurements = useSelector(getEstimateMeasurements);
  const estimateId = useSelector(getEstimateId);
  // const projectId = useSelector(getProjectId);
  const projectId = searchParams.get("projectId");
  const sqftArea = useSelector(getSqftArea);
  // const currentEstimateState = useSelector(getEstimateState);
  const currentEstimateState = searchParams.get("estimateState");
  const notifications = useSelector(getNotifications);
  const selectedContent = useSelector(getSelectedContent);
  const pricing = useSelector(getPricing);
  const addedFields = useSelector(getAdditionalFields);
  const category = searchParams.get("category");
  const redirectTab = searchParams.get("redirectTab");
  const disable_com = Object.entries(measurements)?.length > 0 ? false : true;
  // const handleToggleShift = (type, value) => {
  //     console.log(value, 'val');
  //     dispatch(setToggles({ type, value }));
  // }

  const dispatch = useDispatch();
  const handleEditEstimate = () => {
    const estimateConfig = generateEstimatePayloadForMirror(
      measurements,
      selectedContent,
      sqftArea
    );
    mutateEdit({
      projectId: projectId,
      cost: Number(pricing.total),
      customerData: {},
      estimateData: estimateConfig,
      id: estimateId,
    });
  };

  const setHandleEstimatesPages = () => {
    navigate("/estimates/dimensions");
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

  const handleCancel = () => {
    if (projectId) {
      if(redirectTab && redirectTab==='all'){
        navigate(`/projects/${projectId}`);
      }else{
        navigate(`/projects/${projectId}?category=${category}`);
      }
    } else {
      navigate("/estimates");
    }
  };

  const handleEstimateSubmit = () => {
    const allGoodStatus = getEstimateErrorStatus(selectedContent);
    if (allGoodStatus) {
      if (currentEstimateState === quoteState.CREATE) {
        const estimateConfig = generateEstimatePayloadForMirror(
          measurements,
          selectedContent,
          sqftArea
        );
        setEstimateConfig(estimateConfig);
        setLabelModalOpen(true);
      } else {
        handleEditEstimate();
        showSnackbar("Estimate Edit successfully", "success");
      }
    } else {
      setHardwareMissingAlert(true);
    }
  };

  useEffect(() => {
    const prices = calculateTotal(
      selectedContent,
      sqftArea,
      mirrorLocationSettings,
      measurements
    );
    dispatch(setPricing(prices));
    dispatch(setEstimateDiscountTotal(prices?.discountTotal));
  }, [selectedContent]);

  useEffect(() => {
    if (CreatedSuccessfullyEdit) {
      if (projectId) {
        navigate(`/projects/${projectId}`);
      } else {
        navigate("/estimates");
      }
    }
  }, [CreatedSuccessfullyEdit]);

  const [summaryState, setSummaryState] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleAdditionalFieldModify = (fields) => {
    dispatch(setSelectedContent({ type: "additionalFields", item: fields }));
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  // useEffect(() => {
  //   console.log("mount");
  //   const delayBetweenSnackbars = 1500; // Adjust this delay as needed (in milliseconds)
  //   let delay = 0;
  //   Object.entries(notifications).forEach(([key, value]) => {
  //     if (["glassAddonsNotAvailable", "hardwaresNotAvailable"].includes(key)) {
  //       value?.forEach((item) => {
  //         if (item.status) {
  //           setTimeout(() => {
  //             enqueueSnackbar(item.message, {
  //               variant: item.variant,
  //               // autoHideDuration: 5000, // Set a custom duration for each snackbar
  //             });
  //           }, delay);
  //           delay += delayBetweenSnackbars;
  //         }
  //       });
  //     } else {
  //       if (value.status) {
  //         setTimeout(() => {
  //           enqueueSnackbar(value.message, {
  //             variant: value.variant,
  //             // autoHideDuration: 5000, // Set a custom duration for each snackbar
  //           });
  //         }, delay);
  //         delay += delayBetweenSnackbars;
  //       }
  //     }
  //   });
  //   return () => {
  //     console.log("unmount");
  //     // dispatch(resetNotifications());
  //   };
  // }, [notifications]);

  return (
    <>
      <Box
        className={disable_com ? "box_disaled" : ""}
        sx={{
          width: { xs: "99.5%", sm: "100%" },
          margin: { sm: "auto", xs: 0 },
          display: "flex",
          alignItems: "center",
          height: { xs: "100vh", sm: "auto" },
          flexDirection: "column",
          gap: { sm: 0, xs: 4 },
          backgroundColor: { xs: "#08061B", sm: "white" },
          borderRadius: { sm: "12px", xs: 0 },
          // paddingTop: { sm: "40px" },
        }}
      >
        {/* <Box sx={{ width: "100%" }}>
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
                display: { sm: "none", xs: "block" },
              }}
              variant="h4"
            >
              {currentEstimateState === quoteState.EDIT
                ? "Edit Estimate"
                : "Create New Estimate"}
            </Typography>
          </Box>
        </Box> */}
        <Box
          sx={{
            width: "100%",
            borderRadius: { sm: "12px", xs: 0 },
            border: { sm: "1px solid #EAECF0", xs: "none" },
            overflow: { sm: "hidden" },
            border: "1px solid rgba(208, 213, 221, 1)",
          }}
        >
          <Box
            sx={{
              background: "rgba(243, 245, 246, 1)",
              paddingY: 2,
              px: 3,
              display: { sm: "block", xs: "none" },
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: '"Roboto", sans-serif !important',
              }}
            >
              Modifications
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(208, 213, 221, 1)" }} />
          <Box
            sx={{
              margin: "auto",

              paddingX: { sm: 2, xs: 0 },
              paddingY: 0,
              // rowGap: 4,
              background: { sm: "white", xs: "#08061B" },
              display: "flex",
              flexDirection: "column",
              // paddingTop: 2,
              marginBottom: { sm: 4.6, xs: 10 },
            }}
          >
            <Box
              sx={{
                width: { sm: "100%", xs: "90%" },
                margin: "auto",
                display: { sm: "none", xs: "block" },
              }}
            >
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
                width: { sm: "auto", xs: "94%" },
                paddingBottom: { sm: 0, xs: 0 },
                // paddingX: { sm: 2, xs: 0 },
                // background: { sm: "rgba(217, 217, 217, 0.3)" },
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
                    width: { sm: "100%" },
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // gap: 1,
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
                          title={"Hardware"}
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
                        py: 2,
                        color: { sm: "#000000  ", xs: "white" },
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        Holes
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: { min: 0, max: inputMaxValue },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.simpleHoles}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "simpleHoles",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
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
                        py: 2,
                        color: { sm: "#000000  ", xs: "white" },
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        Light Holes
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: { min: 0, max: inputMaxValue },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.lightHoles}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "lightHoles",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
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
                        py: 2,
                        color: { sm: "#000000  ", xs: "white" },
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        Notch
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: { min: 0, max: inputMaxValue },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.notch}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "notch",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
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
                        color: { sm: "#000000  ", xs: "white" },
                        py: 2,
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        Single Outlet Cutout
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: { min: 0, max: inputMaxValue },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.singleOutletCutout}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "singleOutletCutout",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
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

                        color: { sm: "#000000  ", xs: "white" },
                        py: 2,
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        Double Outlet Cutout
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: { min: 0, max: inputMaxValue },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.doubleOutletCutout}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "doubleOutletCutout",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
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
                        color: { sm: "#000000  ", xs: "white" },
                        py: 2,
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        Triple Outlet Cutout
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: { min: 0, max: inputMaxValue },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.tripleOutletCutout}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "tripleOutletCutout",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
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
                        color: { sm: "#000000  ", xs: "white" },
                        py: 2,
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        Quad Outlet Cutout
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: { min: 0, max: inputMaxValue },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.quadOutletCutout}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "quadOutletCutout",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
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

                        color: { sm: "#000000  ", xs: "white" },
                        py: 2,
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        People:
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: { min: 0, max: inputMaxValue },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.people}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "people",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
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
                        color: { sm: "#000000  ", xs: "white" },
                        py: 2,
                      }}
                    >
                      <Typography className="estimate-modifcation">
                        Hours:
                      </Typography>
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
                          className="custom-textfield"
                          InputProps={{
                            inputProps: {
                              min: 0,
                              max: inputMaxValue,
                              step: "any",
                            },
                            style: {
                              height: "38px",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input[type=number]": {
                              textAlign: "right",
                            },
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.hours}
                          onChange={(event) => {
                            if (event.target.value.length <= inputLength) {
                              dispatch(
                                setInputContent({
                                  type: "hours",
                                  value: event.target.value,
                                })
                              );
                            }
                          }}
                        />
                      </Box>
                    </Box>
                    {/* additional Fields */}
                    {/* <Typography
                      variant="h5"
                      sx={{ color: { md: "black", xs: "white" } }}
                    >
                      Additonal Fields
                    </Typography> */}
                    <Box sx={{ py: 2 }}>
                      {addedFields &&
                        addedFields.map((item, index) => (
                          <SingleField
                            item={item}
                            index={index}
                            estimateState={currentEstimateState}
                            addedFields={addedFields}
                            handleModify={handleAdditionalFieldModify}
                          />
                        ))}
                      <Button
                        onClick={handleAddField}
                        sx={{
                          width: "fit-content",
                          textTransform: "capitalize",
                          color: "#8477DA",
                          fontSize: "16px",
                          fontWeight: 600,
                          p: "10px !important",
                          // backgroundColor: "#8477da",
                          "&:hover": {
                            // backgroundColor: "#8477da",
                          },
                          mt: 2,
                        }}
                        variant="text"
                        startIcon={<Add sx={{ mr: "2px" }} />}
                      >
                        Add Additional Field
                      </Button>
                    </Box>
                    {/** additional fields end */}
                  </Box>
                </Box>
              ) : (
                ""
              )}

              {/* Buttons */}
              {isMobile ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    // width: { sm: "96%" },
                    paddingX: 2,
                    // marginY: 3,
                    py: 2,
                    position: { sm: "", xs: "fixed" },
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "#08061B",
                  }}
                >
                  <Box>
                    <Button
                      fullWidth
                      // onClick={setHandleEstimatesPages}
                      onClick={() => setStep(0)}
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
                  <Box>
                    <Button
                      fullWidth
                      // disabled={selectedContent?.hardwareFinishes === null}
                      variant="contained"
                      onClick={() => {
                        // setSummaryState(false);
                        setStep(2);
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

              {/* {!summaryState || windowWidth > 600 ? (
                <Box
                  sx={{
                    width: { sm: "46%" },
                    display: { sm: "none", xs: "block" },
                  }}
                >
                  <Summary />
                </Box>
              ) : (
                ""
              )} */}
            </Box>

            {/* Buttons */}
            {!summaryState || windowWidth > 600 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: { sm: "100%" },
                  paddingX: { sm: 0, xs: 2 },
                }}
              >
                {/* <Box
                  sx={{
                    width: {
                      sm: "150px",
                      xs:
                        currentEstimateState === quoteState.EDIT
                          ? "100px"
                          : "150px",
                    },
                  }}
                >
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
                </Box> */}
                <Box
                  sx={{
                    width: "100%",
                    // {
                    //   sm:
                    //     currentEstimateState === quoteState.EDIT
                    //       ? "310px"
                    //       : "150px",
                    //   xs:
                    //     currentEstimateState === quoteState.EDIT
                    //       ? "200px"
                    //       : "150px",
                    // },
                    display: "flex",
                    gap: 2,
                    // flexDirection: { sm: "row", xs: "column" },
                  }}
                >
                  {currentEstimateState === quoteState.EDIT && (
                    <Button
                      onClick={handleCancel}
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
                  )}

                  <Button
                    fullWidth
                    // disabled={selectedContent?.hardwareFinishes === null}
                    disabled={projectId === null || EditEstimateLoading}
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
                     { EditEstimateLoading ?  <CircularProgress size={24} sx={{ color: "#8477DA" }} /> : 'Save Estimate'}
                  </Button>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
      <HardwareMissingAlert
        open={hardwareMissingAlert}
        handleClose={() => setHardwareMissingAlert(false)}
        estimateCategory={EstimateCategory.MIRRORS}
      />
      <EnterLabelModal
        open={labelModalOpen}
        handleClose={() => {
          setLabelModalOpen(false);
        }}
        key={"label-modal"}
        estimateConfig={estimateConfig}
        estimateCategory={"mirrors"}
        estimatesTotal={pricing.total}
        projectId={projectId}
      />
    </>
  );
};
