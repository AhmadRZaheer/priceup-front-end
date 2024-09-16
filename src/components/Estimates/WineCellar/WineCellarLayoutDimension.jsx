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
  layoutVariants,
  panelOverWeightAmount,
  quoteState,
  thicknessTypes,
} from "@/utilities/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getHardwareFabricationQuantity } from "@/utilities/hardwarefabrication";
import { generateNotificationsForCurrentEstimate } from "@/utilities/estimatorHelper";
import { NavLink } from "react-router-dom";
import { getLocationWineCellarSettings } from "@/redux/locationSlice";
import {
  addSelectedWineItem,
  getisCustomWineDoorWidth,
  getWineAdditionalFields,
  getWineDoorWidth,
  getWineMeasurements,
  getWineProjectId,
  getWineQuoteState,
  initializeStateForCreateWineQuote,
  initializeStateForEditWineQuote,
  resetNotificationsWineCaller,
  selectedWineItem,
  setisCustomWineDoorWidth,
  setWineDoorWeight,
  setWineDoorWidth,
  setWineHardwareFabricationQuantity,
  setWineLayoutArea,
  setWineLayoutPerimeter,
  setWineMultipleNotifications,
  setWinePanelWeight,
  setWineReturnWeight,
  updateWineMeasurements,
} from "@/redux/wineCellarSlice";
// import AlertsAndWarnings from "../AlertsAndWarnings";

const WineCellarLayouts = [
  {
    settings: {
      handles: {
        handleType: "6602b5d0a4983e276850a4d8",
        count: 1,
      },
      hinges: {
        hingesType: "6602b5d0a4983e276850a518",
        count: 2,
      },
      pivotHingeOption: {
        pivotHingeType: "6602b5d0a4983e276850a4e8",
        count: 2,
      },
      heavyDutyOption: {
        heavyDutyType: "6602b5d0a4983e276850a510",
        threshold: 85,
        height: 100,
      },
      heavyPivotOption: {
        heavyPivotType: null,
        threshold: 0,
        height: 0,
      },
      wallClamp: {
        wallClampType: null,
        count: 0,
      },
      sleeveOver: {
        sleeveOverType: null,
        count: 0,
      },
      glassToGlass: {
        glassToGlassType: null,
        count: 0,
      },
      cornerWallClamp: {
        wallClampType: null,
        count: 0,
      },
      cornerSleeveOver: {
        sleeveOverType: null,
        count: 0,
      },
      cornerGlassToGlass: {
        glassToGlassType: "6602b5d0a4983e276850a538",
        count: 1,
      },
      glassType: {
        type: "6602b5d0a4983e276850a5c4",
        thickness: "3/8",
      },
      slidingDoorSystem: {
        type: null,
        count: 0,
      },
      other: {
        people: 2,
        hours: 3,
      },
      hardwareFinishes: "6602b5d0a4983e276850a4af",
      channelOrClamps: "Channel",
      mountingChannel: "6602b5d1a4983e276850a6ea",
      outages: 3,
      glassAddon: "6602b5d0a4983e276850a5ca",
      measurementSides: 3,
      variant: "doorpanelandreturn",
      notch: 0,
      transom: null,
      header: null,
    },
    _id: "6602b5d1a4983e276850a724",
    name: "Door Panel & Return",
    image: "images/layouts/layout_6.png",
    company_id: "6602b5d0a4983e276850a4a7",
    createdAt: "2024-03-26T11:47:29.404Z",
    updatedAt: "2024-03-26T11:47:29.404Z",
    __v: 0,
  },
  {
    settings: {
      handles: {
        handleType: "6602b5d0a4983e276850a4c8",
        count: 1,
      },
      hinges: {
        hingesType: "6602b5d0a4983e276850a518",
        count: 2,
      },
      pivotHingeOption: {
        pivotHingeType: "6602b5d0a4983e276850a508",
        count: 2,
      },
      heavyDutyOption: {
        heavyDutyType: "6602b5d0a4983e276850a510",
        threshold: 85,
        height: 100,
      },
      heavyPivotOption: {
        heavyPivotType: null,
        threshold: 0,
        height: 0,
      },
      wallClamp: {
        wallClampType: null,
        count: 0,
      },
      sleeveOver: {
        sleeveOverType: null,
        count: 0,
      },
      glassToGlass: {
        glassToGlassType: null,
        count: 0,
      },
      cornerWallClamp: {
        wallClampType: null,
        count: 0,
      },
      cornerSleeveOver: {
        sleeveOverType: null,
        count: 0,
      },
      cornerGlassToGlass: {
        glassToGlassType: null,
        count: 0,
      },
      glassType: {
        type: "6602b5d0a4983e276850a5c4",
        thickness: "3/8",
      },
      slidingDoorSystem: {
        type: null,
        count: 0,
      },
      other: {
        people: 2,
        hours: 2,
      },
      hardwareFinishes: "6602b5d0a4983e276850a4af",
      outages: 2,
      transom: "6602b5d0a4983e276850a548",
      measurementSides: 2,
      variant: "door",
      channelOrClamps: "",
      mountingChannel: null,
      notch: 0,
      header: null,
      glassAddon: null,
    },
    _id: "6602b5d1a4983e276850a722",
    name: "Door",
    image: "images/layouts/layout_1.png",
    company_id: "6602b5d0a4983e276850a4a7",
    createdAt: "2024-03-26T11:47:29.398Z",
    updatedAt: "2024-03-26T11:47:29.398Z",
    __v: 0,
  },
  {
    settings: {
      handles: {
        handleType: "6602b5d0a4983e276850a4d8",
        count: 1,
      },
      hinges: {
        hingesType: "6602b5d0a4983e276850a518",
        count: 2,
      },
      pivotHingeOption: {
        pivotHingeType: null,
        count: 0,
      },
      heavyDutyOption: {
        heavyDutyType: null,
        threshold: 0,
        height: 0,
      },
      heavyPivotOption: {
        heavyPivotType: null,
        threshold: 0,
        height: 0,
      },
      wallClamp: {
        wallClampType: null,
        count: 0,
      },
      sleeveOver: {
        sleeveOverType: null,
        count: 0,
      },
      glassToGlass: {
        glassToGlassType: null,
        count: 0,
      },
      cornerWallClamp: {
        wallClampType: null,
        count: 0,
      },
      cornerSleeveOver: {
        sleeveOverType: "6602b5d0a4983e276850a538",
        count: 3,
      },
      cornerGlassToGlass: {
        glassToGlassType: "6602b5d0a4983e276850a538",
        count: 1,
      },
      glassType: {
        type: "6602b5d0a4983e276850a5c4",
        thickness: "3/8",
      },
      slidingDoorSystem: {
        type: null,
        count: 0,
      },
      other: {
        people: 2,
        hours: 2,
      },
      hardwareFinishes: "6602b5d0a4983e276850a4af",
      channelOrClamps: "Clamps",
      mountingChannel: null,
      outages: 2,
      measurementSides: 5,
      variant: "doornotchedpanelandreturn",
      notch: 0,
      transom: null,
      header: null,
      glassAddon: null,
    },
    _id: "6602b5d1a4983e276850a719",
    name: "Door Notched Panel & Return",
    image: "images/layouts/layout_7.png",
    company_id: "6602b5d0a4983e276850a4a7",
    createdAt: "2024-03-26T11:47:29.393Z",
    updatedAt: "2024-07-03T16:45:55.274Z",
    __v: 0,
  },
];

export const WineCellarLayoutDimension = ({ setStep }) => {
  const dispatch = useDispatch();
  const estimateState = useSelector((state) => state.wineCellar);
  const projectId = useSelector(getWineProjectId);
  const isCustomizedDoorWidthRedux = useSelector(getisCustomWineDoorWidth);
  const selectedData = useSelector(selectedWineItem);
  const doorWidthFromredux = useSelector(getWineDoorWidth);
  const measurementSides = useSelector(getWineMeasurements);
  const currentQuoteState = useSelector(getWineQuoteState);
  const reduxAdditionalFields = useSelector(getWineAdditionalFields);
  const wineCellarSettings = useSelector(getLocationWineCellarSettings);
  const isMobile = useMediaQuery("(max-width: 600px)");

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
  const [editDebouncedValue, setEditDebouncedValue] =
    useState(doorWidthFromredux);
  const [selectedLayout, setSelectedLayout] = useState(selectedData);

  const handleLayoutChange = (event) => {
    const id = event.target.value;
    const selectedItem = WineCellarLayouts?.find((item) => item._id === id);
    Object.keys(formik.values).forEach((key) => {
      // reset existing formik values
      formik.setFieldValue(key, "");
    });
    dispatch(setisCustomWineDoorWidth(false));
    dispatch(resetNotificationsWineCaller());
    dispatch(updateWineMeasurements([])); // reset measurement array on shifting layout
    dispatch(setWineDoorWidth(0));
    setSelectedLayout(selectedItem);
    dispatch(addSelectedWineItem(selectedItem));
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
console.log(initialValues,'initialValuesinitialValues')
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      dispatch(resetNotificationsWineCaller());
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
        dispatch(setWineDoorWeight(result?.doorWeight));
      }
      if (result?.panelWeight) {
        dispatch(setWinePanelWeight(result?.panelWeight));
      }
      if (result?.returnWeight) {
        dispatch(setWineReturnWeight(result?.returnWeight));
      }
      dispatch(setWineLayoutArea(result.areaSqft));
      dispatch(setWineLayoutPerimeter(result.perimeter));
      dispatch(updateWineMeasurements(measurementsArray));

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
      dispatch(setWineMultipleNotifications({ ...notificationsResult }));
      if (currentQuoteState === quoteState.CREATE) {
        const fabricationValues = getHardwareFabricationQuantity(
          { ...notificationsResult.selectedContent, glassThickness },
          currentQuoteState,
          selectedData
        );
        dispatch(setWineHardwareFabricationQuantity({ ...fabricationValues }));
      }
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
        selectedData?.settings?.glassType?.thickness
      );
      if (isCustomizedDoorWidthRedux) {
        dispatch(setWineDoorWidth(editDebouncedValue));
      } else {
        dispatch(setWineDoorWidth(result.doorWidth));
      }
    }
  }, [isCustomizedDoorWidthRedux, formik.values]);

  const handleInputChange = (event) => {
    setEditDebouncedValue(event.target.value);
    dispatch(setWineDoorWidth(event.target.value));
  };

  useEffect(() => {
    if (currentQuoteState === quoteState.CREATE) {
      dispatch(initializeStateForCreateWineQuote({ layoutData: selectedData }));
    } else if (currentQuoteState === quoteState.EDIT) {
      dispatch(
        initializeStateForEditWineQuote({
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
    // refetch();
    return () => {};
  }, [selectedLayout]);

  return (
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
            {/* <AlertsAndWarnings /> */}
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
                          const selectedItem = WineCellarLayouts?.find(
                            (item) => item._id === value
                          );
                          return (
                            <Typography
                              sx={{
                                fontSize: "14px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                textWrap: "nowrap",
                              }}
                            >
                              {selectedItem?.name}
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
                        {WineCellarLayouts?.map((item) => (
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
                          value={formik.values[String.fromCharCode(97 + index)]}
                          onChange={(e) => {
                            formik.handleChange(e);
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
                          setisCustomWineDoorWidth(!isCustomizedDoorWidthRedux)
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
                        gap: "10px",
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
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Box>
                  </Box>
                  {doorWidthFromredux > wineCellarSettings?.doorWidth ||
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
                        {wineCellarSettings?.doorWidth}. Max door width can be
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
                  </NavLink>
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
  );
};
