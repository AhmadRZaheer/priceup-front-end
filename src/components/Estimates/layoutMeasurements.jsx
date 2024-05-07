import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
  Typography,
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
  getListData,
} from "../../redux/estimateCalculations";
import {
  backendURL,
  calculateAreaAndPerimeter,
  getGlassThickness,
} from "../../utilities/common";
import { layoutVariants, panelOverWeightAmount, quoteState, standardDoorWidth, thicknessTypes } from "../../utilities/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { generateNotificationsForCurrentItem } from "../../utilities/estimates";
import { getHardwareFabricationQuantity } from "../../utilities/hardwarefabrication";
import { generateNotificationsForCurrentEstimate } from "../../utilities/estimatorHelper";

const LayoutMeasurements = () => {
  const dispatch = useDispatch();
  const estimateState = useSelector((state) => state.estimateCalculations);

  const setHandleEstimatesPages = (item) => {
    dispatch(setNavigationDesktop(item));
  };
  // const [editField, setEditField] = useState(true);
  const isCustomizedDoorWidthRedux = useSelector(getisCustomizedDoorWidth);
  const selectedData = useSelector(selectedItem);
  const doorWidthFromredux = useSelector(getDoorWidth);
  const measurementSidesForCreate = useSelector(getMeasurementSide);
  const currentQuoteState = useSelector(getQuoteState);
  const reduxAdditionalFields = useSelector(getAdditionalFields);
  const measurementSidesForEdit = selectedData?.measurements;
  const measurementSides =
    currentQuoteState === quoteState.EDIT
      ? measurementSidesForEdit
      : measurementSidesForCreate;
  const listsData = useSelector(getListData);
  const initialValues = measurementSides.reduce((acc, item) => {
    if (item?.value) {
      acc[item.key] = item.value;
    } else {
      acc = {};
    }
    return acc;
  }, {});

  const noOfSidesOFCurrentLayout = selectedData?.settings?.measurementSides;
  const [debouncedValue, setDebouncedValue] = useState(0);
  const [editDebouncedValue, setEditDebouncedValue] =
    useState(doorWidthFromredux);
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
          content: { ...estimateState.content, polish: result.perimeter - estimateState.content.mitre },
          perimeter: result.perimeter, areaSqft: result.areaSqft,
          doorWeight: result?.doorWeight ?? estimateState.doorWeight,
          panelWeight: result?.panelWeight ?? estimateState.panelWeight,
        },
        result?.panelWeight && result?.panelWeight > panelOverWeightAmount ? thicknessTypes.ONEBYTWO : glassThickness
      );
      dispatch(setMultipleNotifications({ ...notificationsResult }));
      if (currentQuoteState === quoteState.CREATE) {
        const fabricationValues = getHardwareFabricationQuantity({ ...notificationsResult.selectedContent, glassThickness }, currentQuoteState, selectedData);
        dispatch(setHardwareFabricationQuantity({ ...fabricationValues }));
      }
      // if (!editField) {
      //   dispatch(setDoorWidth(editDebouncedValue));
      // }
      setHandleEstimatesPages("review");
      resetForm();
    },
  });
  const dynamicFieldAllocationEqualToLayoutCount = useMemo(() => {
    return Object.keys(formik.values)?.length === noOfSidesOFCurrentLayout;
  }, [noOfSidesOFCurrentLayout, formik.values])
  const allAllocatedFieldsPopulated = useMemo(() => {
    let check = true;
    Object.keys(formik.values).forEach(
      (key) => {
        if (!formik.values[key]) {
          check = false;
        }
      }
    );
    return check;
  }, [formik.values]);

  useEffect(() => {
    if (dynamicFieldAllocationEqualToLayoutCount && allAllocatedFieldsPopulated) {
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
              : selectedData.additionalFields,
          },
          quotesId: selectedData._id,
        })
      );
    }
    return () => { };
  }, []);
  console.log(doorWidthFromredux > listsData?.doorWidth || doorWidthFromredux < 1, 'state', doorWidthFromredux, listsData?.doorWidth)
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
              <Box
                onClick={() => {
                  dispatch(updateMeasurements([]));
                  dispatch(setDoorWidth(0));
                  setHandleEstimatesPages("layouts");
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  paddingRight: "20px",
                  paddingTop: "2px",
                }}
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
                {currentQuoteState === quoteState.EDIT ? 'Edit Estimate' : 'Create New Estimate'}
              </Typography>
            </Box>
          </div>

          <form onSubmit={formik.handleSubmit}>
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
                  {Array.from({
                    length: noOfSidesOFCurrentLayout,
                  }).map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ mr: 2 }}>
                        {String.fromCharCode(97 + index)}
                      </Typography>
                      <TextField
                        type="number"
                        size="small"
                        variant="outlined"
                        name={String.fromCharCode(97 + index)}
                        placeholder={String.fromCharCode(97 + index)}
                        style={{
                          background: "white",
                          borderRadius: "8px",
                          border: "1px solid #D0D5DD",
                          width: "100%",
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
                  ))}

                  <>
                    <Typography>
                      <input
                        disabled={[
                          layoutVariants.DOOR,
                          layoutVariants.DOUBLEDOOR,
                          layoutVariants.DOUBLEBARN,
                        ].includes(
                          selectedData?.settings?.variant
                        )}
                        type="checkbox"
                        onChange={() =>
                          dispatch(
                            setisCustomizedDoorWidth(
                              !isCustomizedDoorWidthRedux
                            )
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
                      >{
                          [
                            layoutVariants.DOOR,
                            layoutVariants.DOUBLEDOOR,
                            layoutVariants.DOUBLEBARN,
                          ].includes(
                            selectedData?.settings?.variant
                          ) ? "You cannot modify current layout door width" : "Select if you want to modify the door width"
                        }
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
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "200px",
                          }}
                        >
                          <Typography
                            sx={{
                              color: !isCustomizedDoorWidthRedux
                                ? "gray"
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
                            <IconButton>
                              <InfoOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <TextField
                          InputProps={{
                            inputProps: { min: 1 },
                          }}
                          disabled={!isCustomizedDoorWidthRedux}
                          placeholder={doorWidthFromredux}
                          type="number"
                          size="small"
                          variant="outlined"
                          value={doorWidthFromredux}
                          style={{
                            background: "white",
                            borderRadius: "8px",
                            border: "1px solid #D0D5DD",
                            width: "100%",
                          }}
                          name="door"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </Box>
                    </Box>
                    {(doorWidthFromredux > listsData?.doorWidth || doorWidthFromredux < 1) ?
                      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '10px', alignItems: 'flex-start' }}>
                        <InfoOutlinedIcon fontSize="small" sx={{ mt: '5px' }} />
                        <Typography sx={{ fontSize: "15px" }}>
                          Door width must be in range between 1 - {listsData?.doorWidth}. Max door width can be customized in company settings.
                        </Typography>
                      </Box> : ""}
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
                        width: { xs: "134px", sm: "300px" },
                        height: { xs: "188px", sm: "340px" },
                        padding: { xs: "10px", sm: "0px" },
                      }}
                    >
                      <img
                        width="100%"
                        height="100%"
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
                  justifyContent: "center",
                  width: "100%",
                  paddingY: { xs: "20px", sm: "0px" },
                  bgcolor: { sm: "white", xs: "#08061B" },
                  position: { sm: "static", xs: "fixed" },
                  bottom: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    width: "92%",
                  }}
                >
                  <Box sx={{ width: "150px" }}>
                    <Button
                      fullWidth
                      onClick={() => {
                        dispatch(updateMeasurements([]));
                        dispatch(setDoorWidth(0));
                        if (currentQuoteState === quoteState.EDIT) {
                          setHandleEstimatesPages("existing");
                        } else {
                          setHandleEstimatesPages("layouts");
                        }
                      }}
                      sx={{
                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                        color: "#344054",
                        textTransform: "initial",
                        border: "1px solid #D0D5DD",
                        backgroundColor: { sm: "transparent", xs: "white" },
                        height: 40,
                        fontSize: 20,
                      }}
                    >
                      Back
                    </Button>
                  </Box>
                  <Box sx={{ width: "150px" }}>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={
                        !dynamicFieldAllocationEqualToLayoutCount || !allAllocatedFieldsPopulated || (doorWidthFromredux > listsData?.doorWidth || doorWidthFromredux < 1)
                      }
                      sx={{
                        height: 40,
                        fontSize: 20,
                        backgroundColor: "#8477da",
                        "&:hover": {
                          backgroundColor: "#8477da",
                        },
                        ":disabled": {
                          bgcolor: "#c2c2c2",
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

export default LayoutMeasurements;
