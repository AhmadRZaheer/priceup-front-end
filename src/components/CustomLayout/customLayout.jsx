import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import CustomImage from "../../Assets/customlayoutimage.svg";
import { KeyboardArrowLeft, NoEncryption } from "@mui/icons-material";
import {
  setLayoutArea,
  setLayoutPerimeter,
  setNavigation,
  setNavigationDesktop,
  updateMeasurements,
} from "../../redux/estimateCalculations";
import { useDispatch } from "react-redux";
import { layoutVariants } from "../../utilities/constants";
import { calculateAreaAndPerimeter } from "../../utilities/common";
import DeleteIcon from "@mui/icons-material/Delete";

const getNearestSmallerKeyWithValues = (values, itrator) => {
  let itr = itrator;
  while (!values[itr] && itr > 0) {
    itr--;
  }

  return values[itr];
};

const isThereHigherKeyAvailable = (values, iterator) => {
  return Object.keys(values).some((k) => k > iterator);
};

const CustomLayout = () => {
  const customInitalValues = {
    [1]: {
      count: 1,
    },
  };
  const dispatch = useDispatch();

  const [values, setValues] = useState({ ...customInitalValues });

  const rows = Object.keys(values).map(
    (key) => parseInt(values[key].count) || 1
  );
  const numRows = parseInt(rows.reduce((acc, val) => acc + val, 0));
  console.log(numRows, "log");

  const addRow = () => {
    setValues((vals) => ({
      ...vals,
      [parseInt(numRows) + 1]: { count: 1 },
    }));
    console.log(numRows, "log in add row");
  };
  const handleNext = () => {
    dispatch(setNavigation("review"));
    dispatch(setNavigationDesktop("review"));
  };
  const handleback = () => {
    dispatch(setNavigation("layouts"));
    dispatch(setNavigationDesktop("layouts"));
  };
  const handleSubmit = async () => {
    const measurementsArray = Object.keys(values)
      .map((k) => values[k])
      .reduce((prev, current) => {
        let count = current.count;
        if (count === 1) return [...prev, current];
        let results = [];
        while (count >= 1) {
          const { width, height } = current;
          results.push({ width, height });
          count--;
        }

        return [...prev, ...results];
      }, []);

    const arrayForMeasurement = measurementsArray
      .map((v) =>
        Object.keys(v).map((k) =>
          k !== "count" ? { value: v[k] } : { value: "" }
        )
      )
      .flat();
    console.log(
      measurementsArray,
      arrayForMeasurement,
      "isdaidaskdaskdas 3sakds "
    );

    const result = calculateAreaAndPerimeter(
      measurementsArray,
      layoutVariants.CUSTOM
    );
    console.log("chck", updateMeasurements(measurementsArray));
    dispatch(setLayoutArea(result.areaSqft));
    dispatch(setLayoutPerimeter(result.perimeter));
    dispatch(updateMeasurements(arrayForMeasurement));
    dispatch(setNavigation("review"));
    dispatch(setNavigationDesktop("review"));

    // Reset the form
    setValues({ ...customInitalValues });
    // setNumRows(customInitalValues.count);
  };

  const handleReset = () => {
    setValues({ ...customInitalValues });
    // setNumRows(customInitalValues.count);
  };

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <Box
        sx={{
          width: { lg: "90%", md: "78%", sm: "100%", sx: "100%" },
          marginX: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: { lg: 4, md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
          height: "100vh",
          m: "auto",
          background: { md: "white", xs: "#08061B" },
        }}
      >
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            zIndex: 1,
            justifyContent: { md: "center", xs: "start" },
            background: "#18133b",
            width: "100%",
            color: "white",
            paddingY: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 7.9,
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontSize: { md: 42, xs: 30 } }}
          >
            <KeyboardArrowLeft
              onClick={() => {
                dispatch(setNavigation("layouts"));
              }}
              sx={{ fontSize: 30, mb: -0.6 }}
            />
            Create New Estimate
          </Typography>
        </Box>
        <Typography
          sx={{ display: { md: "block", xs: "none" } }}
          textAlign={"center"}
          variant="h4"
        >
          Create New Estimate
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              height: "100%",
              borderRadius: { md: "12px", xs: 0 },
              boxShadow:
                "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              border: { md: "1px solid #EAECF0", xs: "none" },
              paddingX: { md: 2, xs: 0 },
              paddingY: { md: 4, xs: 0 },
              rowGap: { md: 4, xs: 2 },
              background: { md: "white", xs: "#08061B" },
              display: "flex",
              flexDirection: "column",

              minWidth: { md: 700, xs: "100%" },
              maxWidth: { md: 1000, xs: "100%" },
            }}
          >
            <Box
              sx={{
                paddingLeft: { md: 0, xs: 3 },
                paddingTop: { md: 2, xs: 2 },
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
                flexDirection: { md: "row", xs: "column-reverse" },
                width: { md: "96.5%", xs: "100%" },
                paddingY: { md: 4, xs: 0 },
                paddingX: { md: 2, xs: 0 },
                height: "99%",
                background: { md: "#D9D9D9", xs: "#08061B" },
                gap: { md: 4, xs: 0 },
                borderRadius: "8px",
                overflow: "auto",
                mb: { md: 0, xs: 0 },
                maxHeight: { md: "100vh", xs: "90vh" },
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: { md: "48.5%", xs: "88.6%" },
                  minHeight: "27vh",
                  maxHeight: { md: 340, xs: "25vh" },
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
                  paddingY: { md: 0, xs: 2 },
                }}
              >
                <Box sx={{ pb: { md: 0, xs: 0 }, my: 2 }}>
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { md: 12, xs: 7 },
                      ml: { md: 2, xs: 0 },
                      justifyContent: { md: "center", xs: "flex-start" },
                      width: { md: 315, xs: "90%" },
                      paddingLeft: "25px",
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
                    </Box>

                    <Box
                      sx={{
                        paddingLeft: "20px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: { sm: "black", xs: "white" },
                        }}
                      >
                        Height
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        paddingLeft: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: { sm: "black", xs: "white" },
                        }}
                      >
                        Quantity
                      </Typography>
                    </Box>
                  </Box>
                  {/* a */}
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
                      {/* <Typography sx={{ mr: 2, width: 9 }}>{`a${
                      index + 1
                    }`}</Typography> */}
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
                            typeof values[index + 1]?.count == "undefined"
                              ? "none"
                              : "block",
                          background: "white",
                          borderRadius: "8px",
                          border: "1px solid #D0D5DD",
                          width: { md: "28%", xs: "20%" },
                        }}
                        value={
                          (
                            getNearestSmallerKeyWithValues(values, index + 1) ||
                            values[`${index + 1}`]
                          )?.width || ""
                        }
                        onChange={(e) => {
                          setValues((vals) => ({
                            ...vals,
                            [index + 1]: {
                              ...vals[index + 1],
                              width: e.target.value,
                            },
                          }));
                        }}
                      />
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
                            typeof values[index + 1]?.count == "undefined"
                              ? "none"
                              : "block",
                          background: "white",
                          borderRadius: "8px",
                          border: "1px solid #D0D5DD",
                          width: { md: "28%", xs: "20%" },
                        }}
                        value={
                          (
                            getNearestSmallerKeyWithValues(values, index + 1) ||
                            values[`${index + 1}`]
                          )?.height || ""
                        }
                        onChange={(e) => {
                          setValues((vals) => ({
                            ...vals,
                            [index + 1]: {
                              ...vals[index + 1],
                              height: e.target.value,
                            },
                          }));
                        }}
                      />
                      {typeof values[index + 1]?.count !== "undefined" && (
                        <>
                          <TextField
                            disabled={isThereHigherKeyAvailable(
                              values,
                              index + 1
                            )}
                            type="number"
                            size="small"
                            variant="outlined"
                            name={`Count${index}`}
                            InputProps={{
                              inputProps: { min: 1 },
                            }}
                            value={values[index + 1]?.count || ""}
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
                                [index + 1]: {
                                  ...vals[index + 1],
                                  count: parseInt(e.target.value),
                                },
                              }));
                            }}
                          />
                          {Math.max(...Object.keys(values)) === index + 1 &&
                            index + 1 !== 1 && (
                              <a
                                href="#"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setValues((vals) => {
                                    const { [index + 1]: notWanted, ...rest } =
                                      vals;

                                    return rest;
                                  });
                                }}
                              >
                                <DeleteIcon
                                  sx={{ color: { md: "#101828", xs: "white" } }}
                                />
                              </a>
                            )}
                        </>
                      )}
                    </Box>
                  ))}
                </Box>

                <Button
                  fullWidth
                  onClick={addRow}
                  sx={{
                    display: { md: "flex", xs: "none" },
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: { md: "white", xs: "#344054" },
                    textTransform: "initial",
                    border: "1px solid #D0D5DD",
                    backgroundColor: "#8477da",
                    "&:hover": {
                      backgroundColor: "#8477da",
                    },
                    height: 40,
                    fontSize: 20,
                    position: "absolute",
                    marginX: "auto",
                    width: { md: 480, xs: "90%" },
                    bottom: 5,
                  }}
                >
                  Add Row
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: { md: "48.5%", xs: "100%" },
                  justifyContent: "center",
                  alignItems: "center",
                  maxHeight: "fit-contant",
                  minHeight: 100,
                }}
              >
                <Box sx={{ display: { md: "flex", xs: "none" } }}>
                  <img
                    width="300px"
                    height="340px"
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
                position: { md: "static", xs: "fixed" },
                bottom: { md: 100, xs: 66 },
                background: { md: "transparent", xs: "#100d24" },
                py: 2,
                display: { md: "none", xs: "flex" },
                justifyContent: { md: "space-between", xs: "center" },
                width: "100%",
              }}
            >
              <Button
                fullWidth
                onClick={addRow}
                sx={{
                  display: { md: "none", sx: "flex" },
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  color: "white",
                  textTransform: "initial",
                  border: "1px solid #D0D5DD",
                  height: 40,
                  fontSize: 20,
                  marginX: "auto",

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
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: { md: "end", xs: "space-between" },
                  width: "92%",
                }}
              >
                <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                  <Button
                    fullWidth
                    onClick={handleback}
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
                    {" "}
                    Back
                  </Button>
                </Box>
                <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                  <Button
                    type="submit"
                    fullWidth
                    // disabled={}
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
    </>
  );
};

export default CustomLayout;
