import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { backendURL, calculateAreaAndPerimeter } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";

import {
  getDoorWidth,
  getListData,
  getMeasurementSide,
  selectedItem,
  setContent,
  setDoorWidth,
  setLayoutArea,
  setLayoutPerimeter,
  setNavigation,
  updateMeasurements,
} from "../../redux/estimateCalculations";
import QuotesHeader from "./quotesHeader";
import QuotesFooter from "./quotesFooter";
import { layoutVariants } from "../../utilities/constants";
const LayoutMeasurements = () => {
  const dispatch = useDispatch();
  const [editField, setEditField] = useState(true);
  const selectedData = useSelector(selectedItem);
  const doorWidthFromredux = useSelector(getDoorWidth);
  const measurementSide = useSelector(getMeasurementSide);
  const listContent = useSelector(getListData);

  console.log(measurementSide, "measurementSide");

  const initialValues = measurementSide.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  const [debouncedValue, setDebouncedValue] = useState(0);
  const [editDebouncedValue, setEditDebouncedValue] =
    useState(doorWidthFromredux);
  let debounceTimeout;
  console.log(editDebouncedValue, "edit value");
  const validationSchema = Yup.object().shape({
    ...Array.from({ length: selectedData?.settings?.measurementSides }).reduce(
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
    onSubmit: async (values, resetForm) => {
      const measurementsArray = Object.entries(values)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => ({
          key,
          value,
        }));
      // const perimeter = calculateAreaOrPerimeter(measurementsArray, selectedData?.settings?.perimeterFormula);
      // const sqftArea = calculateAreaOrPerimeter(measurementsArray, selectedData?.settings?.priceBySqftFormula);
      const result = calculateAreaAndPerimeter(
        measurementsArray,
        selectedData?.settings?.variant
      );
      dispatch(setLayoutArea(result.areaSqft));
      dispatch(setLayoutPerimeter(result.perimeter));
      dispatch(updateMeasurements(measurementsArray));

      /** switch hinges if width increases layout defaults */
      if (
        doorWidthFromredux > selectedData?.settings?.heavyDutyOption?.threshold
      ) {
        let hingesType = null;
        hingesType = listContent?.hinges?.find(
          (item) =>
            item._id === selectedData?.settings?.heavyDutyOption?.heavyDutyType
        );
        dispatch(setContent({ type: "hinges", item: hingesType }));
      } else {
        let hingesType = null;
        hingesType = listContent?.hinges?.find(
          (item) => item._id === selectedData?.settings?.hinges?.hingesType
        );
        dispatch(setContent({ type: "hinges", item: hingesType }));
      }
      /** end */
      if (!editField) {
        dispatch(setDoorWidth(editDebouncedValue));
      }

      dispatch(setNavigation("review"));
      resetForm();
      console.log("helloo");
    },
  });
  const doorandPanel = (event) => {
    const inputVal = event.target.value;
    const valuesOfFormik = formik.values;
    const measurementsArray = Object.entries(valuesOfFormik)
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => ({
        key,
        value,
      }));
    if (measurementsArray.length === selectedData?.settings?.measurementSides) {
      // setWidth(inputVal);

      // Clear any existing timeout
      clearTimeout(debounceTimeout);

      // Set a new timeout
      debounceTimeout = setTimeout(() => {
        setDebouncedValue(inputVal);
      }, 500); // 1000 milliseconds (1 second)
    } else {
      console.log(
        "Cannot calculate result as there are empty values in measurementsArray"
      );
    }
  };

  useEffect(() => {
    const valuesOfFormik = formik.values;
    const measurementsArray = Object.entries(valuesOfFormik)
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => ({
        key,
        value,
      }));
    const result = calculateAreaAndPerimeter(
      measurementsArray,
      selectedData?.settings?.variant
    );
    dispatch(setDoorWidth(result.doorWidth));
    setEditDebouncedValue(result.doorWidth);
    // if (result?.panelWidth) dispatch(setPanelWidth(result.panelWidth));
  }, [debouncedValue]);

  const handleInputChange = (event) => {
    setEditDebouncedValue(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          width: { md: "70%", sm: "100%", sx: "100%" },
          margin: { md: "auto", xs: 0 },

          display: "flex",
          alignItems: { md: "center", xs: "start" },
          marginTop: { md: 15, sx: 0 },
          flexDirection: "column",
          p: { md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
          height: "40vh",
        }}
      >
        <QuotesHeader navigateTo={"layouts"} />
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              width: { md: "94%", sm: "100%", xs: "100%" },
              margin: "auto",
              // height: "100%",
              borderRadius: { md: "12px", xs: 0 },
              boxShadow:
                "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              border: { md: "1px solid #EAECF0", xs: "none" },
              paddingX: { md: 2, xs: 0 },
              paddingY: { md: 4, xs: 0 },
              rowGap: 4,
              background: { md: "white", xs: "#100D24" },
              display: "flex",
              flexDirection: "column",
              paddingTop: { md: 0, xs: 6 },
              marginTop: { md: 0, xs: -3 },
            }}
          >
            <Box
              sx={{
                paddingLeft: { md: 0, xs: 3 },
                paddingTop: { md: 2, xs: 0 },
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
                flexDirection: { md: "row", xs: "column" },
                width: { md: "96.5%", xs: "100%" },
                paddingY: { md: 4, xs: 0 },
                paddingX: { md: 2, xs: 0 },
                height: "100%",
                background: { md: "#D9D9D9", xs: "#100D24" },
                gap: 4,
                borderRadius: "8px",
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: { md: "48.5%", xs: "90%" },
                  marginX: "auto",
                  height: "100%",
                  flexDirection: "column",
                  gap: { md: 2, xs: 2 },
                  color: { md: "#101828", xs: "white" },
                  background: {
                    md: "none",
                    xs: "linear-gradient(to top right, #100d24 35%, #312969 , #100d24 82%)",
                  },
                  borderTopLeftRadius: { md: 0, xs: 30 },
                  borderTopRightRadius: { md: 0, xs: 30 },
                  borderTop: { md: 0, xs: "1px solid #667085" },
                  paddingX: { md: 0, xs: 2 },
                  paddingTop: 4,
                  paddingBottom: 8,
                }}
              >
                {Array.from({
                  length: selectedData?.settings?.measurementSides,
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
                      InputProps={{
                        style: {
                          color: "white",
                        },
                        inputProps: { min: 0 },
                       
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      style={{
                        background: "#14112c",
                        borderRadius: "8px",
                        border: "1px solid #29263f",
                        color: "white !important",
                        width: "100%",
                      }}
                      value={formik.values[String.fromCharCode(97 + index)]}
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        formik.handleChange(e);
                        doorandPanel(e);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                ))}
                {![
                  layoutVariants.DOOR,
                  layoutVariants.DOUBLEDOOR,
                  layoutVariants.DOUBLEBARN,
                ].includes(selectedData.settings.variant) && (
                  <Box>
                    <Typography mb={2}>
                      <input
                        type="checkbox"
                        onChange={() => setEditField(!editField)}
                        style={{
                          width: "20px",
                        }}
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          color: "white",
                          fontSize: "14px",
                        }}
                      >
                        Select if you want to customize the door width
                      </span>
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: editField ? "gray" : "white",
                        }}
                      >
                        Door Width
                      </Typography>

                      <TextField
                        type="number"
                        size="small"
                        variant="outlined"
                        value={editDebouncedValue}
                        InputProps={{
                          style: {
                            color: "white",
                            "&::placeholder": {
                              color: editField ? "white" : "black",
                            },
                          },
                          inputProps: { min: 1 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          background: "#14112c",
                          borderRadius: "8px",
                          border: "1px solid #29263f",
                          color: "white",
                          width: "100%",
                          "& .MuiInputBase-input.Mui-disabled": {
                            color: "gray",
                            WebkitTextFillColor: "gray",
                          },
                        }}
                        name="door"
                        onChange={(e) => handleInputChange(e)}
                        disabled={editField}
                        placeholder={editDebouncedValue}
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "48.5%",
                  justifyContent: { md: "end", xs: "center" },
                  alignItems: { md: "center", xs: "center" },
                  margin: "auto",
                  order: { md: 2, xs: -1 },
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
                      height: 700,
                    }}
                  >
                    <CircularProgress sx={{ color: "#8477DA" }}/>
                  </Box>
                ) : (
                  <Box>
                    <img
                      width="300px"
                      height="350px"
                      src={`${backendURL}/${selectedData?.image}`}
                      alt="Selected"
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "100%",
                marginTop: "50px",
              }}
            >
              <QuotesFooter
                navigateNext={"review"}
                type={"submit"}
                navigateBack={"layouts"}
                disabled={Object.keys(formik.values).some(
                  (key) => !formik.values[key]
                )}
              />
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default LayoutMeasurements;
