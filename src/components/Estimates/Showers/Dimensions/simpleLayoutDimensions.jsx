import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
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
import {
  selectedItem,
  setLayoutArea,
  setLayoutPerimeter,
  setNavigationDesktop,
  updateMeasurements,
  getDoorWidth,
  setDoorWidth,
  getMeasurementSide,
  getQuoteState,
  setDoorWeight,
  setPanelWeight,
  setReturnWeight,
  setMultipleNotifications,
  initializeStateForCreateQuote,
  initializeStateForEditQuote,
  setHardwareFabricationQuantity,
  getAdditionalFields,
  getisCustomizedDoorWidth,
  setisCustomizedDoorWidth,
  getProjectId,
  addSelectedItem,
  resetNotifications
} from "@/redux/estimateCalculations";
import CheckIcon from "@mui/icons-material/Check";
import {
  backendURL,
  calculateAreaAndPerimeter,
  getGlassThickness,
} from "@/utilities/common";
import {
  layoutVariants,
  panelOverWeightAmount,
  quoteState,
  standardDoorWidth,
  thicknessTypes,
} from "@/utilities/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { generateNotificationsForCurrentItem } from "../../utilities/estimates";
import { getHardwareFabricationQuantity } from "@/utilities/hardwarefabrication";
import { generateNotificationsForCurrentEstimate } from "@/utilities/estimatorHelper";
import { NavLink, useNavigate } from "react-router-dom";
import { getLocationShowerSettings } from "@/redux/locationSlice";
// import { useFetchDataDefault } from "@/utilities/ApiHooks/defaultLayouts";
// import AlertMessage from "@/components/ui-components/AlertMessage";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import AlertsAndWarnings from "../AlertsAndWarnings";

export const SimpleLayoutDimensions = ({ setStep }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const estimateState = useSelector((state) => state.estimateCalculations);
  const projectId = useSelector(getProjectId);
  const { data: layouts, isLoading: loading, refetch } = useFetchAllDocuments(`${backendURL}/layouts/for-estimate`);
  // const setHandleEstimatesPages = (item) => {
  //   dispatch(setNavigationDesktop(item));
  // };
  // const [editField, setEditField] = useState(true);
  const isCustomizedDoorWidthRedux = useSelector(getisCustomizedDoorWidth);
  const selectedData = useSelector(selectedItem);
  const doorWidthFromredux = useSelector(getDoorWidth);
  const measurementSides = useSelector(getMeasurementSide);
  const currentQuoteState = useSelector(getQuoteState);
  const reduxAdditionalFields = useSelector(getAdditionalFields);
  const showerSettings = useSelector(getLocationShowerSettings);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const iphoneSe = useMediaQuery("(max-width: 375px)");
  const iphone14Pro = useMediaQuery("(max-width: 430px)");
  const initialValues = measurementSides.reduce((acc, item) => {
    if (item?.value) {
      acc[item.key] = item.value;
    } else {
      acc = {};
    }
    return acc;
  }, {});

  const noOfSidesOFCurrentLayout = selectedData?.settings?.measurementSides;
  console.log(noOfSidesOFCurrentLayout, "side", measurementSides);
  const [debouncedValue, setDebouncedValue] = useState(0);
  const [editDebouncedValue, setEditDebouncedValue] =
    useState(doorWidthFromredux);
  const [selectedLayout, setSelectedLayout] = useState(selectedData);

  const handleLayoutChange = (event) => {
    const id = event.target.value;
    const selectedItem = layouts?.find((item) => item._id === id);
    Object.keys(formik.values).forEach((key) => { // reset existing formik values
      formik.setFieldValue(key, '');
    })
    dispatch(setisCustomizedDoorWidth(false));
    dispatch(resetNotifications());
    dispatch(updateMeasurements([])); // reset measurement array on shifting layout
    dispatch(setDoorWidth(0));
    setSelectedLayout(selectedItem);
    dispatch(addSelectedItem(selectedItem));
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
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
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
        glassThickness
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
      dispatch(setLayoutArea(result.areaSqft));
      dispatch(setLayoutPerimeter(result.perimeter));
      dispatch(updateMeasurements(measurementsArray));

      const notificationsResult = generateNotificationsForCurrentEstimate(
        {
          ...estimateState,
          measurements: measurementsArray,
          content: {
            ...estimateState.content,
            polish: result.perimeter - estimateState.content.mitre,
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
          { ...notificationsResult.selectedContent, glassThickness },
          currentQuoteState,
          selectedData
        );
        dispatch(setHardwareFabricationQuantity({ ...fabricationValues }));
      }
      if (isMobile) {
        setStep(1);
      }
      // navigate("/estimates/review");
      // resetForm();
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
        selectedData?.settings?.glassType?.thickness
      );
      if (isCustomizedDoorWidthRedux) {
        dispatch(setDoorWidth(editDebouncedValue));
      } else {
        dispatch(setDoorWidth(result.doorWidth));
      }
    }
  }, [debouncedValue, isCustomizedDoorWidthRedux, formik.values]);

  const handleInputChange = (event) => {
    setEditDebouncedValue(event.target.value);
    dispatch(setDoorWidth(event.target.value));
  };

  useEffect(() => {
    if (currentQuoteState === quoteState.CREATE) {
      dispatch(initializeStateForCreateQuote({ layoutData: selectedData }));
    } else if (currentQuoteState === quoteState.EDIT) {
      dispatch(
        initializeStateForEditQuote({
          estimateData: {
            ...selectedData,
            additionalFields: reduxAdditionalFields.length
              ? reduxAdditionalFields
              : selectedData.config.additionalFields,
          },
          quotesId: selectedData._id,
        })
      );
    }
    refetch();
    return () => { };
  }, [selectedLayout]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            // width:'100%',
            // maxWidth:'600px',
            // height: iphoneSe ? "auto" : iphone14Pro ? 725 : 660,
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
              alignItems: "center"
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 700, fontFamily: '"Roboto", sans-serif !important' }}>
              Layout & Measurement
            </Typography>
            <AlertsAndWarnings />
          </Box>
          <Box
            sx={{
              // height: "auto",
              // borderRadius: { sm: "12px", xs: 0 },
              // boxShadow:
              //   "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              // border: { sm: "1px solid #EAECF0", xs: "none" },
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
                // background: { sm: "#D9D9D9" },
                gap: { lg: '84px', xs: 4 },
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
                  // backdropFilter: { xs: "blur(81.5px)", sm: "none" },
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
                {currentQuoteState === quoteState.CREATE && (
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
                          const selectedItem = layouts?.find(item => item._id === value);
                          return <Typography sx={{ fontSize: "14px", textOverflow: 'ellipsis', overflow: 'hidden', textWrap: 'nowrap' }}>{selectedItem?.name}</Typography>;
                        }}
                        style={{
                          background: "#F6F5FF",
                          borderRadius: "4px",
                        }}
                        sx={{
                          p: '0px', '&.MuiMenu-list': {
                            p: '0px'
                          }
                        }}
                      >
                        {layouts?.map((item) => (
                          <MenuItem key={`key-${item.name}`} value={item._id} sx={{ p: '10px 12px !important' }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                gap: '10px'
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
                          gap: { sm: '10px', xs: 1 },
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
                          <Typography sx={{ mr: 0.5, fontSize: '16px', fontWeight: 600, lineHeight: '21.86px' }}>
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
                          value={formik.values[String.fromCharCode(97 + index)]}
                          onChange={(e) => {
                            formik.handleChange(e);
                            // doorandPanel(e);
                          }}
                          onBlur={formik.handleBlur}
                          InputProps={{
                            inputProps: { min: 0 },
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <>
                  <Typography>
                    <input
                      disabled={[
                        layoutVariants.DOOR,
                        layoutVariants.DOUBLEDOOR,
                        layoutVariants.DOUBLEBARN,
                      ].includes(selectedData?.settings?.variant)}
                      type="checkbox"
                      onChange={() =>
                        dispatch(
                          setisCustomizedDoorWidth(!isCustomizedDoorWidthRedux)
                        )
                      }
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
                      {[
                        layoutVariants.DOOR,
                        layoutVariants.DOUBLEDOOR,
                        layoutVariants.DOUBLEBARN,
                      ].includes(selectedData?.settings?.variant)
                        ? "You cannot modify current layout door width"
                        : "Select if you want to modify the door width"}
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
                        // width: "100%",
                        alignItems: { sm: "start", xs: "center" },
                        flexDirection: { sm: "column", xs: "row" },
                        width: { md: "48.6%", xs: "100%" },
                        gap: '10px',
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          // width: "200px",
                          gap: 1,
                        }}
                      >
                        <Typography
                          className="text-sm-samibold"
                          sx={{
                            color: !isCustomizedDoorWidthRedux ? "#000000" : "",
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
                          inputProps: { min: 1 },
                        }}
                        disabled={!isCustomizedDoorWidthRedux}
                        placeholder={doorWidthFromredux}
                        type="number"
                        className={`custom-textfield-purple${!isCustomizedDoorWidthRedux ? "-disabled" : ""
                          }`}
                        size="small"
                        variant="outlined"
                        value={doorWidthFromredux}
                        sx={{
                          borderRadius: "8px",
                          border: "1px solid #D0D5DD",
                          width: "100%",
                          "& input": { padding: "10px" },
                          // maxWidth: {},
                        }}
                        name="door"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Box>
                  </Box>
                  {doorWidthFromredux > showerSettings?.doorWidth ||
                    doorWidthFromredux < 1 ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "10px",
                        alignItems: "flex-start",
                      }}
                    >
                      <InfoOutlinedIcon fontSize="small" sx={{ mt: "5px" }} />
                      <Typography sx={{ fontSize: "15px" }}>
                        Door width must be in range between 1 -{" "}
                        {showerSettings?.doorWidth}. Max door width can be
                        customized in company settings.
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
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
                      src={`${backendURL}/${selectedData?.image ?? selectedData?.settings?.image // first option is while creating and second option is while editing
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
                {(currentQuoteState === quoteState.CREATE || isMobile) && <NavLink
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
                      width: { xs: 120, sm: 150 },
                      color: "black",
                      border: "1px solid #D0D5DD",
                      ":hover": {
                        border: "1px solid #8477DA",
                      },
                      fontSize: 18,
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
                </NavLink>}
              </Box>
              <Button
                type="submit"
                disabled={
                  !dynamicFieldAllocationEqualToLayoutCount ||
                  !allAllocatedFieldsPopulated ||
                  doorWidthFromredux > showerSettings?.doorWidth ||
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
                {" "}
                {isMobile ? "Next" : "Run Quote"}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};
