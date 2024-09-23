import React, { useMemo } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuList from "./menuList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  getLayoutArea,
  getQuoteState,
  setInputContent,
  setNavigationDesktop,
  setTotal,
  getTotal,
  getMeasurementSide,
  getLayoutPerimeter,
  getQuoteId,
  setHardwarePrice,
  setGlassPrice,
  setGlassAddonsPrice,
  setFabricationPrice,
  setLaborPrice,
  selectedItem,
  setCost,
  setProfit,
  getListData,
  getNotifications,
  setHardwareAddonsPrice,
  resetNotifications,
  setContent,
  getAdditionalFields,
  getDoorWidth,
  getisCustomizedDoorWidth,
  setAdditionalFieldsPrice,
  getProjectId,
} from "@/redux/estimateCalculations";
import { useEditEstimates } from "@/utilities/ApiHooks/estimate";
import Summary from "./summary_dep";
import ChannelTypeDesktop from "./channelorClamp";
import { calculateTotal } from "@/utilities/common";
import { Link, useNavigate } from "react-router-dom";
import {
  EstimateCategory,
  layoutVariants,
  quoteState,
} from "@/utilities/constants";
import { showSnackbar } from "@/redux/snackBarSlice";
import { useSnackbar } from "notistack";
import { SingleField } from "@/components/ui-components/SingleFieldComponent";
import { getEstimateErrorStatus } from "@/utilities/estimatorHelper";
import { getLocationShowerSettings } from "@/redux/locationSlice";
import HardwareMissingAlert from "@/components/Modal/hardwareMissingAlert";
import { CustomerSelectModal } from "../CustomerSelectModal";
import EnterLabelModal from "../enterLabelModal";
import CustomInputField from "@/components/ui-components/CustomInput";
import { Add } from "@mui/icons-material";

export const generateEstimatePayload = (
  estimateState,
  measurements,
  selectedContent,
  layout_id,
  isCustomizedDoorWidth,
  doorWidthredux,
  perimeter,
  sqftArea
) => {
  let measurementsArray = measurements;
  if (
    (estimateState === quoteState.EDIT && !layout_id) ||
    estimateState === quoteState.CUSTOM
  ) {
    let newArray = [];
    for (const key in measurementsArray) {
      const index = parseInt(key);
      newArray[index] = measurementsArray[key];
    }
    measurementsArray = newArray;
  }
  let filteredFields = selectedContent.additionalFields.filter(
    (item) => item.label !== "" && item.cost !== 0
  );

  const hardwareAddonsArray = selectedContent?.hardwareAddons?.map((row) => {
    return {
      type: row.item._id,
      count: row.count,
    };
  });
  const wallClampArray = selectedContent?.mountingClamps?.wallClamp?.map(
    (row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    }
  );
  const sleeveOverArray = selectedContent?.mountingClamps?.sleeveOver?.map(
    (row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    }
  );
  const additionalFieldsArray = filteredFields.map((row) => {
    return {
      cost: row.cost,
      label: row.label,
    };
  });
  const glassToGlassArray = selectedContent?.mountingClamps?.glassToGlass?.map(
    (row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    }
  );
  const cornerWallClampArray =
    selectedContent?.cornerClamps?.cornerWallClamp?.map((row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    });
  const cornerSleeveOverArray =
    selectedContent?.cornerClamps?.cornerSleeveOver?.map((row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    });
  const cornerGlassToGlassArray =
    selectedContent?.cornerClamps?.cornerGlassToGlass?.map((row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    });
  const glassAddonsArray = selectedContent?.glassAddons?.map(
    (item) => item?._id
  );
  const estimateConfig = {
    doorWidth: Number(doorWidthredux),
    isCustomizedDoorWidth: isCustomizedDoorWidth,
    additionalFields: [...additionalFieldsArray],
    hardwareFinishes: selectedContent?.hardwareFinishes?._id,
    handles: {
      type: selectedContent?.handles?.item?._id,
      count: selectedContent?.handles?.count,
    },
    hinges: {
      type: selectedContent?.hinges?.item?._id,
      count: selectedContent?.hinges?.count,
    },
    mountingClamps: {
      wallClamp: [...wallClampArray],
      sleeveOver: [...sleeveOverArray],
      glassToGlass: [...glassToGlassArray],
    },
    cornerClamps: {
      wallClamp: [...cornerWallClampArray],
      sleeveOver: [...cornerSleeveOverArray],
      glassToGlass: [...cornerGlassToGlassArray],
    },
    mountingChannel: selectedContent?.mountingChannel?.item?._id || null,
    glassType: {
      type: selectedContent?.glassType?.item?._id,
      thickness: selectedContent?.glassType?.thickness,
    },
    glassAddons: [...glassAddonsArray],
    slidingDoorSystem: {
      type: selectedContent?.slidingDoorSystem?.item?._id,
      count: selectedContent?.slidingDoorSystem?.count,
    },
    header: {
      type: selectedContent?.header?.item?._id,
      count: selectedContent?.header?.count,
    },
    oneInchHoles: selectedContent?.oneInchHoles,
    hingeCut: selectedContent?.hingeCut,
    clampCut: selectedContent?.clampCut,
    notch: selectedContent?.notch,
    outages: selectedContent?.outages,
    mitre: selectedContent?.mitre,
    polish: selectedContent?.polish,
    people: selectedContent?.people,
    hours: selectedContent?.hours,
    userProfitPercentage: selectedContent?.userProfitPercentage,
    // cost: Number(estimatesTotal),
    hardwareAddons: [...hardwareAddonsArray],
    sleeveOverCount: selectedContent?.sleeveOverCount,
    towelBarsCount: selectedContent?.sleeveOverCount,
    measurements: measurementsArray,
    perimeter: perimeter,
    sqftArea: sqftArea,
  };
  return estimateConfig;
};

export const ShowerReview = ({ setStep }) => {
  const navigate = useNavigate();
  const {
    mutate: mutateEdit,
    isError: ErrorForAddEidt,
    isSuccess: CreatedSuccessfullyEdit,
  } = useEditEstimates();
  const isMobile = useMediaQuery("(max-width: 600px)");
  // console.log(isMobile, "isMobile");
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [hardwareMissingAlert, setHardwareMissingAlert] = useState(false);
  const [estimateConfig, setEstimateConfig] = useState(null);
  const showerLocationSettings = useSelector(getLocationShowerSettings);
  const listData = useSelector(getListData);
  const estimatesTotal = useSelector(getTotal);
  const projectId = useSelector(getProjectId);
  const measurements = useSelector(getMeasurementSide);
  const perimeter = useSelector(getLayoutPerimeter);
  const doorWidthredux = useSelector(getDoorWidth);
  const quoteId = useSelector(getQuoteId);
  const sqftArea = useSelector(getLayoutArea);
  const currentQuoteState = useSelector(getQuoteState);
  const selectedContent = useSelector(getContent);
  const selectedData = useSelector(selectedItem);
  const notifications = useSelector(getNotifications);
  const addedFields = useSelector(getAdditionalFields);
  const isCustomizedDoorWidth = useSelector(getisCustomizedDoorWidth);
  const { enqueueSnackbar } = useSnackbar();
  const selectedItemVariant = useMemo(() => {
    return selectedData?.settings?.variant;
  }, [currentQuoteState]);
  const disable_com = useMemo(() => {
    let status = false;
    if (currentQuoteState === "create") {
      status = !selectedData || !measurements?.length;
    } else if (currentQuoteState === "custom") {
      let arraylength = Object.entries(measurements)?.length;
      // Object.entries(measurements).forEach?.(([key, value]) => {
      //   const { count, width, height } = value;
      //   console.log(width,'width',height,'height',);
      //   if (!width || !height) {
      //     notAllFilled = false;
      //   }
      // });
      status = arraylength > 0 ? false : true;
    }
    return status;
  }, [measurements])

  const dispatch = useDispatch();
  const handleEditEstimate = () => {
    const estimateConfig = generateEstimatePayload(
      currentQuoteState,
      measurements,
      selectedContent,
      selectedData?.config?.layout_id,
      isCustomizedDoorWidth,
      doorWidthredux,
      perimeter,
      sqftArea
    );
    mutateEdit({
      projectId: projectId,
      cost: Number(estimatesTotal),
      customerData: {},
      estimateData: estimateConfig,
      id: quoteId,
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
      setContent({
        type: "additionalFields",
        item: newData,
      })
    );
  };

  const handleCancel = () => {
    if (projectId) {
      navigate(`/projects/${projectId}`);
    } else {
      navigate("/estimates")
    }
  }

  const handleEstimateSubmit = () => {
    const allGoodStatus = getEstimateErrorStatus(selectedContent);
    console.log(allGoodStatus, "Estimate Status");
    if (allGoodStatus) {
      if ([quoteState.CREATE, quoteState.CUSTOM].includes(currentQuoteState)) {
        const estimateConfig = generateEstimatePayload(
          currentQuoteState,
          measurements,
          selectedContent,
          selectedData?.config?.layout_id,
          isCustomizedDoorWidth,
          doorWidthredux,
          perimeter,
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
      showerLocationSettings,
      currentQuoteState
    );
    dispatch(setHardwarePrice(prices.hardwarePrice));
    dispatch(setGlassPrice(prices.glassPrice));
    dispatch(setHardwareAddonsPrice(prices.hardwareAddonsPrice));
    dispatch(setGlassAddonsPrice(prices.glassAddonsPrice));
    dispatch(setFabricationPrice(prices.fabricationPrice));
    dispatch(setLaborPrice(prices.laborPrice));
    dispatch(setAdditionalFieldsPrice(prices.additionalFieldPrice));
    dispatch(setTotal(prices.total));
    dispatch(setCost(prices.cost));
    dispatch(setProfit(prices.profit));
  }, [selectedContent]);

  useEffect(() => {
    if (CreatedSuccessfullyEdit) {
      if (projectId) {
        navigate(`/projects/${projectId}`);
      } else {
        navigate("/estimates");
      }
    }
  }, [CreatedSuccessfullyEdit, ErrorForAddEidt]);

  const [summaryState, setSummaryState] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleAdditionalFieldModify = (fields) => {
    dispatch(setContent({ type: "additionalFields", item: fields }));
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
  //     if (
  //       [
  //         "glassAddonsNotAvailable",
  //         "hardwareAddonsNotAvailable",
  //         "wallClampNotAvailable",
  //         "sleeveOverNotAvailable",
  //         "glassToGlassNotAvailable",
  //         "cornerWallClampNotAvailable",
  //         "cornerSleeveOverNotAvailable",
  //         "cornerGlassToGlassNotAvailable",
  //       ].includes(key)
  //     ) {
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
          width: { xs: "100%", sm: "96%" },
          ml: { sm: "auto", xs: 0 },
          mr: { sm: "1px", xs: 0 },
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
              {currentQuoteState === quoteState.EDIT
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
            <Typography sx={{ fontSize: "14px", fontWeight: 700, fontFamily: '"Roboto", sans-serif !important' }}>
              Modifications
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(208, 213, 221, 1)" }} />
          <Box
            sx={{
              //   width: "100%",
              margin: "auto",

              paddingX: { sm: 2, xs: 0 },
              py: '0px !important',
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
                    flexDirection: "column",
                    // gap: 1,
                    width: "100%",
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
                      py: '6px'
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={listData?.hardwareFinishes}
                        title={"Hardware Finishes"}
                        type={"hardwareFinishes"}
                        listData={listData}
                        currentItem={selectedContent?.hardwareFinishes}
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
                      py: '6px'
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={listData?.handles}
                        title={"Handles"}
                        type={"handles"}
                        count={selectedContent.handles.count}
                        currentItem={selectedContent?.handles?.item}
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
                      py: '6px'
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={listData?.hinges}
                        title={"Hinges"}
                        type={"hinges"}
                        count={selectedContent.hinges.count}
                        currentItem={selectedContent?.hinges?.item}
                      />
                    </Box>
                  </Box>
                  {![
                    layoutVariants.DOOR,
                    layoutVariants.DOUBLEDOOR,
                    layoutVariants.DOUBLEBARN,
                  ].includes(selectedItemVariant) && (
                      <Box
                        sx={{
                          alignItems: "center",
                          borderBottom: {
                            sm: "2px solid #D0D5DD",
                            xs: "2px solid #423f57",
                          },
                          py: '6px'
                        }}
                      >
                        <Box sx={{ width: "100%", display: "flex" }}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <ChannelTypeDesktop
                              menuOptions={listData?.channelOrClamps}
                              title={"Mounting"}
                              type={"mounting"}
                              listData={listData}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      py: '6px'
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={listData?.glassType}
                        title={" Glass type"}
                        type={"glassType"}
                        thickness={selectedContent.glassType.thickness}
                        currentItem={selectedContent?.glassType?.item}
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
                      py: '6px'
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={listData?.slidingDoorSystem}
                        title={"Sliding Door System"}
                        type={"slidingDoorSystem"}
                        count={selectedContent.slidingDoorSystem.count}
                        currentItem={selectedContent?.slidingDoorSystem?.item}
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
                      py: '6px'
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={listData?.header}
                        title={"Header"}
                        type={"header"}
                        count={selectedContent.header.count}
                        currentItem={selectedContent?.header?.item}
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
                      py: '6px'
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={listData?.glassAddons}
                        title={"Glass Addons"}
                        type={"glassAddons"}
                      // currentItem={selectedContent?.glassAddons}
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
                      py: '6px'
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={listData?.hardwareAddons}
                        title={"Hardware Addons"}
                        type={"hardwareAddons"}
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
                      py: 2
                    }}
                  >
                    <Typography
                      className='estimate-modifcation'
                    >
                      1" Holes
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
                          inputProps: { min: 0 },
                          style: {
                            height: '38px',
                          }
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
                          }
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.oneInchHoles}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "oneInchHoles",
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
                      color: { sm: "#000000  ", xs: "white" },
                      py: 2
                    }}
                  >
                    <Typography
                      className='estimate-modifcation'
                    >
                      Hinge Cut Out
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
                          inputProps: { min: 0 },
                          style: {
                            height: '38px',
                          }
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
                          }
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.hingeCut}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "hingeCut",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  </Box>
                  {![
                    layoutVariants.DOOR,
                    layoutVariants.DOUBLEDOOR,
                    layoutVariants.DOUBLEBARN,
                  ].includes(selectedItemVariant) && (
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
                          py: 2
                        }}
                      >
                        <Typography
                          className='estimate-modifcation'
                        >
                          {" "}
                          Clamp Cut Out
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
                              inputProps: { min: 0 },
                              style: {
                                height: '38px',
                              }
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
                              }
                            }}
                            variant="outlined"
                            size="small"
                            value={selectedContent.clampCut}
                            onChange={(event) =>
                              dispatch(
                                setInputContent({
                                  type: "clampCut",
                                  value: event.target.value,
                                })
                              )
                            }
                          />
                        </Box>
                      </Box>
                    )}
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
                      py: 2
                    }}
                  >
                    <Typography
                      className='estimate-modifcation'
                    >
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
                        className="custom-textfield"
                        type="number"
                        InputProps={{
                          inputProps: { min: 0 },
                          style: {
                            height: '38px',
                          }
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
                          }
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
                      // paddingLeft: 3,
                      // paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                      py: 2
                    }}
                  >
                    <Typography
                      className='estimate-modifcation'
                    >
                      Outages
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
                          inputProps: { min: 0 },
                          style: {
                            height: '38px',
                          }
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
                          }
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.outages}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "outages",
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

                      color: { sm: "#000000  ", xs: "white" },
                      py: 2
                    }}
                  >
                    <Typography
                      className='estimate-modifcation'
                    >
                      Mitre
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
                          inputProps: { min: 0 },
                          style: {
                            height: '38px',
                          }
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
                          }
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.mitre}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "mitre",
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
                      // paddingLeft: 3,
                      // paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                      py: 2
                    }}
                  >
                    <Typography
                      className='estimate-modifcation'
                    >
                      Polish
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
                          inputProps: { min: 0 },
                          style: {
                            height: '38px',
                          }
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
                          }
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.polish}
                        onChange={(event) => {
                          dispatch(
                            setInputContent({
                              type: "polish",
                              value: event.target.value,
                            })
                          );
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
                      // paddingLeft: 3,
                      // paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                      py: 2
                    }}
                  >
                    <Typography
                      className='estimate-modifcation'
                    >
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
                          inputProps: { min: 0 },
                          style: {
                            height: '38px',
                          }
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
                          }
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
                      // paddingLeft: 3,
                      // paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                      py: 2
                    }}
                  >
                    <Typography
                      className='estimate-modifcation'
                    >
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
                          inputProps: { min: 0 },
                          style: {
                            height: '38px',
                          }
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
                          }
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
                          estimateState={currentQuoteState}
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
                        fontSize: '16px',
                        fontWeight: 600,
                        p: '10px !important',
                        // backgroundColor: "#8477da",
                        "&:hover": {
                          // backgroundColor: "#8477da",
                        },
                        mt: 2,
                      }}
                      variant="text"
                      startIcon={<Add sx={{ mr: '2px' }} />}
                    >
                      Add Additional Field
                    </Button>
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
                      disabled={selectedContent?.hardwareFinishes === null}
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
                        currentQuoteState === quoteState.EDIT
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
                    //     currentQuoteState === quoteState.EDIT
                    //       ? "310px"
                    //       : "150px",
                    //   xs:
                    //     currentQuoteState === quoteState.EDIT
                    //       ? "200px"
                    //       : "150px",
                    // },
                    display: "flex",
                    gap: 2,
                    // flexDirection: { sm: "row", xs: "column" },
                  }}
                >
                  {currentQuoteState === quoteState.EDIT && (

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
                    disabled={
                      selectedContent?.hardwareFinishes === null ||
                      projectId === null
                    }
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
                      fontSize: "16px",
                      lineHeight: "21.86px",
                      fontWeight: 600,
                    }}
                  >
                    Save Estimate
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
        estimateCategory={EstimateCategory.SHOWERS}
      />
      <EnterLabelModal
        open={labelModalOpen}
        handleClose={() => {
          setLabelModalOpen(false);
        }}
        key={"label-modal"}
        estimateConfig={estimateConfig}
        estimateCategory={"showers"}
        estimatesTotal={estimatesTotal}
        projectId={projectId}
        selectedLayout={selectedData}
      />
    </>
  );
};
