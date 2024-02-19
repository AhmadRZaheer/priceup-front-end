import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

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
  setContent,
  getListData,
} from "../../redux/estimateCalculations";
import { backendURL, calculateAreaAndPerimeter } from "../../utilities/common";
import { layoutVariants } from "../../utilities/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { NavLink } from "react-router-dom";
import { useSnackbar } from "notistack";

const LayoutMeasurements = () => {
  const dispatch = useDispatch();

  const setHandleEstimatesPages = (item) => {
    dispatch(setNavigationDesktop(item));
  };
  const [editField, setEditField] = useState(true);
  const selectedData = useSelector(selectedItem);
  const doorWidthFromredux = useSelector(getDoorWidth);
  const measurementSide = useSelector(getMeasurementSide);
  const listContent = useSelector(getListData);
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = measurementSide.reduce((acc, item) => {
    if (item.value === undefined) {
      acc[item.key] = item.value;
    } else {
      acc = {};
    }
    return acc;
  }, {});

  // const [width, setWidth] = useState(0);
  const [debouncedValue, setDebouncedValue] = useState(0);
  const [editDebouncedValue, setEditDebouncedValue] =
    useState(doorWidthFromredux);
  let debounceTimeout;
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
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
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
        selectedData?.settings?.heavyDutyOption?.threshold > 0 &&
        doorWidthFromredux > selectedData?.settings?.heavyDutyOption?.threshold
      ) {
        let hingesType = null;
        hingesType = listContent?.hinges?.find(
          (item) =>
            item._id === selectedData?.settings?.heavyDutyOption?.heavyDutyType
        );
        dispatch(setContent({ type: "hinges", item: hingesType }));
        enqueueSnackbar("hinges switch from standard to heavy", {
          variant: "success",
        });
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
      setHandleEstimatesPages("review");
      resetForm();
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
      clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        setDebouncedValue(inputVal);
      }, 500);
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
  }, [debouncedValue]);

  const handleInputChange = (event) => {
    setEditDebouncedValue(event.target.value);
  };

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
                Create New Qoute
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
                    // background: {
                    //   sm: "none",
                    //   xs: "linear-gradient(to top right, #100d24 35%, #312969 , #100d24 82%)",
                    // },
                    borderTopLeftRadius: { sm: 0, xs: 30 },
                    borderTopRightRadius: { sm: 0, xs: 30 },
                    borderTop: { sm: 0, xs: "1px solid #667085" },
                    paddingX: { sm: 0, xs: 2 },
                    paddingTop: 4,
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
                        style={{
                          background: "white",
                          borderRadius: "8px",
                          border: "1px solid #D0D5DD",
                          width: "100%",
                        }}
                        value={formik.values[String.fromCharCode(97 + index)]}
                        onChange={(e) => {
                          formik.handleChange(e);
                          doorandPanel(e);
                        }}
                        onBlur={formik.handleBlur}
                        InputProps={{
                          inputProps: { min: 0 },
                        }}
                      />
                    </Box>
                  ))}

                  {![
                    layoutVariants.DOOR,
                    layoutVariants.DOUBLEDOOR,
                    layoutVariants.DOUBLEBARN,
                  ].includes(selectedData.settings.variant) && (
                    <>
                      <Typography>
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
                          }}
                        >
                          Select if you want to customize the door width
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
                                color: editField ? "gray" : "",
                              }}
                            >
                              Door Width
                            </Typography>
                            <Tooltip
                              title={
                                "If you want to customize the door width, check the above checkbox"
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
                            disabled={editField}
                            placeholder={editDebouncedValue}
                            type="number"
                            size="small"
                            variant="outlined"
                            value={editDebouncedValue}
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
                        {/* <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{ mr: 2, color: editField ? "gray" : "" }}
                        >
                          Panel
                        </Typography>
                        <TextField
                          disabled={editField}
                          type="number"
                          size="small"
                          variant="outlined"
                          value={doorPanelFromredux}
                          style={{
                            background: "white",
                            borderRadius: "8px",
                            border: "1px solid #D0D5DD",
                            width: "100%",
                          }}
                          name="panel"
                        />
                      </Box> */}
                      </Box>
                    </>
                  )}
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
                        src={`${backendURL}/${selectedData?.image}`}
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
                  paddingBottom: { xs: "20px", sm: "0px" },
                  bgcolor: { sm: "white", xs: "#08061B" },
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
                        setHandleEstimatesPages("layouts");
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
                      disabled={Object.keys(formik.values).some(
                        (key) => !formik.values[key]
                      )}
                      sx={{
                        height: 40,
                        fontSize: 20,
                        backgroundColor: "#8477da",
                        "&:hover": {
                          backgroundColor: "#8477da",
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
