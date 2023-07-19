import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedItem,
  setNavigation,
  updateMeasurements,
} from "../../redux/estimateCalculations";
const LayoutMeasurements = () => {
  const selectedData = useSelector(selectedItem);

  // const validationSchema = Yup.object().shape({
  //   a: Yup.number().required("a is required"),
  //   b: Yup.number().required("b is required"),
  //   c: Yup.number().required("c is required"),
  //   d: Yup.number().required("d is required"),
  //   e: Yup.number().required("e is required"),
  // });
  const validationSchema = Yup.object().shape({
    // Define validation rules for each field dynamically
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
    initialValues: {},
    validationSchema,
    onSubmit: async (values, resetForm) => {
      const measurementsArray = Object.entries(values)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => ({
          key,
          value,
        }));
      dispatch(updateMeasurements(measurementsArray));

      // setHandleEstimatesPages("measurements");
      dispatch(setNavigation("review"));
      // };
      resetForm();
    },
  });
  const dispatch = useDispatch();
  const handleBoxClick = () => {
    // const measurementsArray = Object.entries(formik.values)
    //   .filter(([key, value]) => value !== "")
    //   .map(([key, value]) => ({
    //     key,
    //     value,
    //   }));
    // dispatch(updateMeasurements(measurementsArray));
    // setHandleEstimatesPages("measurements");
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
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            zIndex: 1,
            justifyContent: { md: "center", xs: "start" },
            background: "#18133b",
            width: "100%",
            color: "white",
            paddingY: 1.2,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 7.6,
          }}
        >
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <ChevronLeftOutlinedIcon
              onClick={() => {
                dispatch(setNavigation("layout"));
              }}
              sx={{ fontSize: 34, paddingTop: 0.4 }}
            />
          </Box>
          <Typography textAlign={"center"} variant="h4">
            Create New Qoute
          </Typography>
        </Box>
        <Typography
          sx={{ display: { md: "block", xs: "none" } }}
          textAlign={"center"}
          variant="h4"
        >
          Create New Qoute
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              width: { md: "94%", sm: "100%", xs: "100%" },
              margin: "auto",
              height: "100%",
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
                  color: { md: "black", xs: "white" },
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
                overflow: "auto"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: { md: "48.5%", xs: "92%" },
                  height: "100%",
                  flexDirection: "column",
                  gap: { md: 2, xs: 2 },
                  color: { md: "black", xs: "white" },
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
                  // height: "350px",
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
                          color: "white", // Change the color of the input text
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                ))}
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
                {selectedData?.image ===  "" ? (
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
                    <CircularProgress />
                  </Box>
                ) : (
                  <img
                    width="150px"
                    height="300px"
                    // src={door}
                    src={`${backendURL}/${selectedData?.image}`}
                    alt="Selected"
                  />
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "100%",
              }}
            >
              {/* <Box sx={{ display: { md: "block", xs: "none" }, width: "150px" }}>
              <Button
                fullWidth
                sx={{
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  color: "#344054",
                  textTransform: "initial",
                  border: "1px solid #8477DA",
                }}
              >
                Reset
              </Button>
            </Box> */}

              <Box
                sx={{
                  display: { md: "none", xs: "flex" },
                  gap: 2,
                  justifyContent: "center",
                  width: "92%",
                  paddingX: 2,
                  paddingY: 2,
                  position: "fixed",
                  bottom: 0,
                  backgroundColor: "#100d24",
                  borderTop: "1px solid #423f57",
                }}
              >
                <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                  <Button
                    fullWidth
                    onClick={() => {
                      dispatch(setNavigation("layout"));
                    }}
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
                    // onClick={() => setHandleEstimatesPages("review")}
                    // onClick={() => {
                    //   dispatch(setNavigation("review"));
                    // }}
                    // onClick={handleBoxClick()}
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

export default LayoutMeasurements;
