import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import {
  backendURL,
  calculateAreaAndPerimeter,
  getGlassThickness,
} from "@/utilities/common";
import {
  inputLength,
  inputMaxValue,
  layoutVariants,
  panelOverWeightAmount,
  quoteState,
  thicknessTypes,
} from "@/utilities/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { generateNotificationsForCurrentEstimate } from "@/utilities/estimatorHelper";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getLocationWineCellarSettings } from "@/redux/locationSlice";
import {
  setSelectedItem,
  getisCustomDoorWidth,
  getAdditionalFields,
  getDoorWidth,
  getMeasurements,
  // getWineProjectId,
  // getWineQuoteState,
  initializeStateForCreateQuote,
  initializeStateForEditQuote,
  resetNotifications,
  selectedItem,
  setisCustomizedDoorWidth,
  setDoorWeight,
  setDoorWidth,
  setHardwareFabricationQuantity,
  setLayoutArea,
  setLayoutPerimeter,
  setMultipleNotifications,
  setPanelWeight,
  setReturnWeight,
  updateMeasurements,
  getDoorQuantity,
  setDoorQuantity,
  setBackWallGlassWeight,
  sethoursForSingleDoor,
  getContent,
  setCounters,
} from "@/redux/wineCellarEstimateSlice";
import AlertsAndWarnings from "../AlertsAndWarnings";
import {
  useFetchAllDocuments,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import {
  getEstimateState,
  getProjectId,
  getSkeltonState,
} from "@/redux/estimateSlice";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import {
  getHardwareFabricationQuantity,
  setStateForWineCellarEstimate,
} from "@/utilities/WineCellarEstimate";
import LayoutMeasurementSkeleton from "@/components/estimateSkelton/LayoutMeasurementSkeleton";

export const SimpleLayoutDimensions = ({ setStep, layoutData, recordData }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const estimateState = useSelector((state) => state.wineCellarsEstimate);
  // const projectId = useSelector(getProjectId);
  const projectId = searchParams.get("projectId");
  const layoutId = searchParams.get("layoutId");
  const estimateId = searchParams.get("estimateId");
  const category = searchParams.get("category");
  const isCustomizedDoorWidthRedux = useSelector(getisCustomDoorWidth);
  const selectedData = useSelector(selectedItem);
  const doorWidthFromredux = useSelector(getDoorWidth);
  const doorQuantity = useSelector(getDoorQuantity);
  const measurementSides = useSelector(getMeasurements);
  // const currentQuoteState = useSelector(getEstimateState);
  const currentQuoteState = searchParams.get("estimateState");
  const reduxAdditionalFields = useSelector(getAdditionalFields);
  const wineCellarSettings = useSelector(getLocationWineCellarSettings);
  const wineCellarsHardware = useSelector(getWineCellarsHardware);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const skeltonState = useSelector(getSkeltonState);
  const selectedContent = useSelector(getContent);

  const handleBack = () => {
    dispatch(setisCustomizedDoorWidth(false));
    dispatch(setDoorQuantity(1));
    navigate(
      currentQuoteState === quoteState.EDIT
        ? projectId
          ? `/projects/${projectId}?category=${category}`
          : "/estimates"
        : `/estimates/layouts?category=${category}&projectId=${projectId}`
    );
  };
  // const {
  //   data: layouts,
  //   isLoading: loading,
  //   refetch,
  // } = useFetchAllDocuments(`${backendURL}/wineCellars/layouts/for-estimate`);

  // const {
  //   data: record,
  //   refetch: refetchRecord,
  //   isLoading: getLoading,
  // } = useFetchSingleDocument(`${backendURL}/estimates/${estimateId}`);

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
        setStateForWineCellarEstimate(recordData?.record, dispatch);
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

  const initialValues = measurementSides.reduce((acc, item) => {
    if (item?.value) {
      acc[item.key] = item.value;
    } else {
      acc = {};
    }
    return acc;
  }, {});

  const noOfSidesOFCurrentLayout = selectedData?.settings?.measurementSides;
  const [editDebouncedValue, setEditDebouncedValue] =
    useState(doorWidthFromredux);
  // const [debouncedValueDoorQuantity, setDebouncedValueDoorQuantity] =
  //   useState(doorQuantity);
  const [selectedLayout, setSelectedLayout] = useState(selectedData);

  useEffect(() => {
    if (
      layoutData?.layouts &&
      layoutData?.layouts.length &&
      layoutId &&
      layoutId.length &&
      currentQuoteState === quoteState.CREATE
    ) {
      const layoutsData = layoutData?.layouts?.find(
        (item) => item._id === layoutId
      );
      if (layoutsData) {
        if (selectedLayout === null) {
          setSelectedLayout(layoutsData);
          dispatch(setSelectedItem(layoutsData));
        }
      } else {
        if (projectId && projectId?.length) {
          navigate(`/projects/${projectId}?category=${category}`);
        } else {
          navigate(`/estimates`);
        }
      }
    }
  }, [layoutData?.layouts, layoutId, selectedLayout]);

  const handleLayoutChange = (event) => {
    const id = event.target.value;
    const selectedItem = layoutData?.layouts?.find((item) => item._id === id);
    if (selectedItem) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("layoutId", id);
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
    Object.keys(formik.values).forEach((key) => {
      // reset existing formik values
      formik.setFieldValue(key, "");
    });
    dispatch(setisCustomizedDoorWidth(false));
    dispatch(resetNotifications());
    dispatch(updateMeasurements([])); // reset measurement array on shifting layout
    dispatch(setDoorWidth(0));
    setSelectedLayout(selectedItem);
    dispatch(setSelectedItem(selectedItem));
  };
  // let debounceTimeout;
  const validationSchema = Yup.object().shape({
    ...Array.from({ length: noOfSidesOFCurrentLayout }).reduce(
      (schema, _, index) => {
        const fieldName = String.fromCharCode(97 + index);
        return {
          ...schema,
          [fieldName]: Yup.number().required(
            `${fieldName.toUpperCase()} is required`
          ),
        };
      },
      {}
    ),
  });
  // console.log(initialValues, "initialValuesinitialValues");

  const [openPopover, setOpenPopover] = useState(false); // State to control popover externally

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log("on submit");
      dispatch(resetNotifications());
      const measurementsArray = Object.entries(values)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => ({
          key,
          value,
        }));
      const glassThickness = getGlassThickness(
        selectedData?.settings?.variant,
        measurementsArray,
        selectedData?.settings?.heavyDutyOption?.height || 85
      );
      const result = calculateAreaAndPerimeter(
        measurementsArray,
        selectedData?.settings?.variant,
        glassThickness,
        { doorQuantity: doorQuantity }
      );
      if (result?.doorWeight) {
        dispatch(setDoorWeight(result?.doorWeight));
      }
      if (result?.panelWeight) {
        dispatch(setPanelWeight(result?.panelWeight));
      }
      if (result?.returnWeight) {
        dispatch(setReturnWeight(result?.returnWeight));
      }
      if (result?.backWallGlassWeight) {
        dispatch(setBackWallGlassWeight(result?.backWallGlassWeight));
      }
      dispatch(setLayoutArea(result.areaSqft));
      dispatch(setLayoutPerimeter(result.perimeter));
      dispatch(updateMeasurements(measurementsArray));

      const notificationsResult = generateNotificationsForCurrentEstimate(
        {
          ...estimateState,
          listData: wineCellarsHardware,
          measurements: measurementsArray,
          content: {
            ...estimateState.content,
            polish: result.perimeter - (estimateState.content?.mitre ?? 0),
          },
          perimeter: result.perimeter,
          areaSqft: result.areaSqft,
          doorWeight: result?.doorWeight ?? estimateState.doorWeight,
          panelWeight: result?.panelWeight ?? estimateState.panelWeight,
        },
        result?.panelWeight && result?.panelWeight > panelOverWeightAmount
          ? thicknessTypes.ONEBYTWO
          : glassThickness
      );
      dispatch(setMultipleNotifications({ ...notificationsResult }));
      if (currentQuoteState === quoteState.CREATE) {
        const fabricationValues = getHardwareFabricationQuantity(
          {
            ...notificationsResult.selectedContent,
            glassType: {
              ...notificationsResult.selectedContent.glassType,
              thickness: glassThickness,
            },
          },
          currentQuoteState,
          selectedData
        );
        dispatch(setHardwareFabricationQuantity({ ...fabricationValues }));
      }

      setOpenPopover(true);
      if (isMobile) {
        setStep(1);
      }
    },
  });

  const dynamicFieldAllocationEqualToLayoutCount = useMemo(() => {
    return Object.keys(formik.values)?.length === noOfSidesOFCurrentLayout;
  }, [noOfSidesOFCurrentLayout, formik.values]);

  const allAllocatedFieldsPopulated = useMemo(() => {
    let check = true;
    Object.keys(formik.values).forEach((key) => {
      if (!formik.values[key]) {
        check = false;
      }
    });
    return check;
  }, [formik.values, noOfSidesOFCurrentLayout]);

  useEffect(() => {
    if (
      dynamicFieldAllocationEqualToLayoutCount &&
      allAllocatedFieldsPopulated
    ) {
      const valuesOfFormik = formik.values;
      const measurementsArray = Object.entries(valuesOfFormik)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => ({
          key,
          value,
        }));

      const result = calculateAreaAndPerimeter(
        measurementsArray,
        selectedData?.settings?.variant,
        selectedData?.settings?.glassType?.thickness,
        { doorQuantity: doorQuantity }
      );
      if (isCustomizedDoorWidthRedux) {
        dispatch(setDoorWidth(editDebouncedValue));
      } else {
        dispatch(setDoorWidth(result.doorWidth));
      }
    }
  }, [isCustomizedDoorWidthRedux, formik.values]);

  const handleInputChange = (event) => {
    setEditDebouncedValue(event.target.value);
    dispatch(setDoorWidth(event.target.value));
  };

  const handleChangeDoorQuantity = (event) => {
    const value = selectedData?.settings?.noOfHoursToCompleteSingleDoor;
    const targetValue = Number(event.target.value);
    // setDebouncedValueDoorQuantity(event.target.value);
    dispatch(setDoorQuantity(targetValue));
    dispatch(sethoursForSingleDoor((targetValue - 1) * value));

    [
      {
        type: "handles",
        content: selectedContent?.handles,
        settings: selectedData.settings.handles,
      },
      {
        type: "hinges",
        content: selectedContent?.hinges,
        settings: selectedData.settings.hinges,
      },
      {
        type: "doorLock",
        content: selectedContent?.doorLock,
        settings: selectedData.settings.doorLock,
      },
    ].forEach(({ type, content, settings }) => {
      dispatch(
        setCounters({
          item: content?.item,
          type,
          value: settings.count * targetValue,
        })
      );
    });
  };

  useEffect(() => {
    if (
      currentQuoteState === quoteState.CREATE &&
      selectedData &&
      wineCellarsHardware
    ) {
      dispatch(
        initializeStateForCreateQuote({
          layoutData: selectedData,
          hardwaresList: wineCellarsHardware,
        })
      );
    } else if (
      currentQuoteState === quoteState.EDIT &&
      selectedData &&
      wineCellarsHardware
    ) {
      dispatch(
        initializeStateForEditQuote({
          estimateData: {
            ...selectedData,
            additionalFields: reduxAdditionalFields?.length
              ? reduxAdditionalFields
              : selectedData?.config?.additionalFields,
          },
          quotesId: selectedData?._id,
          hardwaresList: wineCellarsHardware,
        })
      );
    }
    // if (currentQuoteState === quoteState.CREATE) {
    //   layoutData.refetch();
    // }
    return () => {};
  }, [selectedData, wineCellarsHardware]);

  useEffect(() => {
    if (currentQuoteState === quoteState.CREATE) {
      layoutData.refetch();
    }
  }, []);

  return (
    <>
      {skeltonState || recordData.estimateFetcing || layoutData.isFetching ? (
        <LayoutMeasurementSkeleton />
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
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
                  paddingY: 1.3,
                  px: 3,
                  display: { sm: "flex", xs: "none" },
                  borderBottom: "1px solid rgba(212, 219, 223, 1)",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                    width: { sm: "auto", xs: "99.8%" },
                    paddingBottom: { sm: 4, xs: 0 },
                    paddingX: { sm: 2, xs: 0 },
                    height: "100%",
                    gap: { lg: "84px", xs: 4 },
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 0,
                      display: "flex",
                      width: { sm: "100%", xs: "92%" },
                      maxHeight: "100%",
                      minHeight: 100,
                      flexDirection: "column",
                      gap: { sm: 2, xs: 2 },
                      color: { sm: "black", xs: "white" },
                      borderRadius: "34px 34px 0px 0px",
                      background: { xs: "rgba(16, 13, 36, 0.01)", sm: "none" },
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
                    {currentQuoteState === quoteState.CREATE &&
                      selectedLayout && (
                        <Box
                          sx={{
                            mb: { sm: 2, xs: 0 },
                            width: { md: "48.6%", xs: "100%" },
                          }}
                        >
                          <FormControl fullWidth>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedLayout?._id}
                              placeholder="Layout"
                              size="small"
                              className="custom-textfield-purple"
                              onChange={handleLayoutChange}
                              renderValue={(value) => {
                                // const selectedItem = layouts?.find(
                                //   (item) => item._id === value
                                // );
                                return (
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                      textWrap: "nowrap",
                                    }}
                                  >
                                    {selectedLayout?.name}
                                  </Typography>
                                );
                              }}
                              style={{
                                background: "#F6F5FF",
                                borderRadius: "4px",
                              }}
                              sx={{
                                p: "0px",
                                "&.MuiMenu-list": {
                                  p: "0px",
                                },
                              }}
                            >
                              {layoutData?.layouts?.map((item) => (
                                <MenuItem
                                  key={`key-${item.name}`}
                                  value={item._id}
                                  sx={{ p: "10px 12px !important" }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "100%",
                                      gap: "10px",
                                    }}
                                  >
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {item.name}
                                    </Typography>
                                    {item?._id === selectedLayout?._id ? (
                                      <CheckIcon sx={{ color: "#8477DA" }} />
                                    ) : null}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      )}
                    <Grid container spacing={2}>
                      {Array.from({
                        length: noOfSidesOFCurrentLayout,
                      }).map((_, index) => (
                        <Grid item md={6} xs={12}>
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: { sm: "start", xs: "center" },
                              flexDirection: { sm: "column", xs: "row" },
                              gap: { sm: "10px", xs: 1 },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "16px",
                                fontWeight: 600,
                                lineHeight: "21.86px",
                              }}
                            >
                              <Typography
                                sx={{
                                  mr: 0.5,
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  lineHeight: "21.86px",
                                }}
                              >
                                {String.fromCharCode(97 + index)}
                              </Typography>
                              <Tooltip title={""}>
                                <InfoOutlinedIcon
                                  sx={{
                                    width: "13px",
                                    height: "13px",
                                    color: "#959EA3",
                                  }}
                                />
                              </Tooltip>
                            </Box>
                            <TextField
                              type="number"
                              size="small"
                              variant="outlined"
                              name={String.fromCharCode(97 + index)}
                              placeholder={String.fromCharCode(97 + index)}
                              className="custom-textfield-purple"
                              sx={{
                                borderRadius: "8px",
                                border: "1px solid #D0D5DD",
                                width: "100%",
                                maxWidth: "250px",
                                "& input": { padding: "10px" },
                              }}
                              value={
                                formik.values[String.fromCharCode(97 + index)]
                              }
                              onChange={(e) => {
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e);
                                }
                              }}
                              onBlur={formik.handleBlur}
                              InputProps={{
                                inputProps: { min: 0, max: inputMaxValue },
                              }}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    <>
                      <Typography>
                        <input
                          // disabled={[
                          //   layoutVariants.DOOR,
                          //   layoutVariants.DOUBLEDOOR,
                          //   layoutVariants.DOUBLEBARN,
                          // ].includes(selectedData?.settings?.variant)}
                          type="checkbox"
                          onChange={() => {
                            dispatch(
                              setisCustomizedDoorWidth(
                                !isCustomizedDoorWidthRedux
                              )
                            );
                            dispatch(setDoorQuantity(1));
                          }}
                          checked={isCustomizedDoorWidthRedux}
                          style={{
                            width: "20px",
                          }}
                        />
                        <span
                          style={{
                            marginLeft: "10px",
                          }}
                        >
                          {/* {[
                          layoutVariants.DOOR,
                          layoutVariants.DOUBLEDOOR,
                          layoutVariants.DOUBLEBARN,
                        ].includes(selectedData?.settings?.variant)
                          ? "You cannot modify current layout door width"
                          : "Select if you want to modify the door width"} */}
                          Select if you want to modify door
                        </span>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: { sm: "start", xs: "center" },
                            flexDirection: { sm: "column", xs: "row" },
                            width: { md: "48.6%", xs: "100%" },
                            gap: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              className="text-sm-samibold"
                              sx={{
                                color: !isCustomizedDoorWidthRedux
                                  ? "#000000"
                                  : "",
                              }}
                            >
                              Door Width
                            </Typography>
                            <Tooltip
                              title={
                                "If you want to modify the door width, check the above checkbox"
                              }
                            >
                              <InfoOutlinedIcon
                                sx={{
                                  width: "13px",
                                  height: "13px",
                                  color: "#959EA3",
                                }}
                              />
                            </Tooltip>
                          </Box>
                          <TextField
                            fullWidth
                            InputProps={{
                              inputProps: { min: 1, max: inputMaxValue },
                            }}
                            disabled={!isCustomizedDoorWidthRedux}
                            placeholder={doorWidthFromredux}
                            type="number"
                            className={`custom-textfield-purple${
                              !isCustomizedDoorWidthRedux ? "-disabled" : ""
                            }`}
                            size="small"
                            variant="outlined"
                            value={doorWidthFromredux}
                            sx={{
                              borderRadius: "8px",
                              border: "1px solid #D0D5DD",
                              width: "100%",
                              "& input": { padding: "10px" },
                            }}
                            name="door"
                            onChange={(e) => {
                              if (e.target.value.length <= inputLength) {
                                handleInputChange(e);
                              }
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: { sm: "start", xs: "center" },
                            flexDirection: { sm: "column", xs: "row" },
                            width: { md: "48.6%", xs: "100%" },
                            gap: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              className="text-sm-samibold"
                              sx={{
                                color: !isCustomizedDoorWidthRedux
                                  ? "#000000"
                                  : "",
                              }}
                            >
                              Door Quantity
                            </Typography>
                            <Tooltip
                              title={
                                "If you want to modify the door quantity, check the above checkbox"
                              }
                            >
                              <InfoOutlinedIcon
                                sx={{
                                  width: "13px",
                                  height: "13px",
                                  color: "#959EA3",
                                }}
                              />
                            </Tooltip>
                          </Box>
                          <TextField
                            fullWidth
                            InputProps={{
                              inputProps: { min: 1, max: 10 },
                            }}
                            disabled={!isCustomizedDoorWidthRedux}
                            placeholder={doorQuantity}
                            type="number"
                            className={`custom-textfield-purple${
                              !isCustomizedDoorWidthRedux ? "-disabled" : ""
                            }`}
                            size="small"
                            variant="outlined"
                            value={doorQuantity}
                            sx={{
                              borderRadius: "8px",
                              border: "1px solid #D0D5DD",
                              width: "100%",
                              "& input": { padding: "10px" },
                            }}
                            name="doorQuantity"
                            onChange={(e) => {
                              if (e.target.value.length <= 2) {
                                handleChangeDoorQuantity(e);
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </>
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
                    {selectedData?.image === "" ? (
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
                      <Box
                        sx={{
                          padding: { xs: "10px", sm: "0px" },
                        }}
                      >
                        <img
                          width={isMobile ? "134px" : "240px"}
                          height={isMobile ? "188px" : "300px"}
                          src={`${backendURL}/${
                            selectedData?.image ?? selectedData?.settings?.image // first option is while creating and second option is while editing
                          }`}
                          alt="Selected"
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
                {/* Buttons */}
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
                  }}
                >
                  <Box sx={{ display: "block" }}>
                    {(currentQuoteState === quoteState.CREATE || isMobile) && (
                      // <NavLink
                      //   to={
                      //     currentQuoteState === quoteState.EDIT
                      //       ? projectId
                      //         ? `/projects/${projectId}?category=${category}`
                      //         : "/estimates"
                      //       : `/estimates/layouts?category=${category}&projectId=${projectId}`
                      //   }
                      // >
                      <Button
                        onClick={handleBack}
                        sx={{
                          width: { xs: 120, sm: 150 },
                          color: "black",
                          border: "1px solid #D0D5DD",
                          ":hover": {
                            border: "1px solid #8477DA",
                          },
                          fontSize: 18,
                          backgroundColor: "white",
                          height: 42,
                          fontWeight: 600,
                        }}
                        fullWidth
                        variant="outlined"
                      >
                        Back
                      </Button>
                      // </NavLink>
                    )}
                  </Box>
                  <Button
                    type="submit"
                    disabled={
                      !dynamicFieldAllocationEqualToLayoutCount ||
                      !allAllocatedFieldsPopulated ||
                      doorWidthFromredux > wineCellarSettings?.doorWidth ||
                      doorWidthFromredux < 1
                    }
                    sx={{
                      width: { xs: 120, sm: 117 },
                      backgroundColor: "#8477DA",
                      fontSize: 16,
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#8477DA" },
                      ":disabled": {
                        bgcolor: "#c2c2c2",
                      },
                      mr: { sm: 0, xs: "30px" },
                      color: "#FFFFFF",
                    }}
                    fullWidth
                    variant="contained"
                  >
                    {isMobile ? "Next" : "Run Quote"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </>
      )}
    </>
  );
};
