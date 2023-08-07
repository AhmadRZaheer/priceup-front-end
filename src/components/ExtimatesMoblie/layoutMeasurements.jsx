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
import { backendURL, calculateAreaOrPerimeter } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedItem,
  setLayoutArea,
  setLayoutPerimeter,
  setNavigation,
  updateMeasurements,
} from "../../redux/estimateCalculations";
import QuotesHeader from "./quotesHeader";
import QuotesFooter from "./quotesFooter";
const LayoutMeasurements = () => {
  const selectedData = useSelector(selectedItem);

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
    initialValues: {},
    validationSchema,
    onSubmit: async (values, resetForm) => {
      const measurementsArray = Object.entries(values)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => ({
          key,
          value,
        }));
      const perimeter = calculateAreaOrPerimeter(measurementsArray, selectedData?.settings?.perimeterFormula);
      const sqftArea = calculateAreaOrPerimeter(measurementsArray, selectedData?.settings?.priceBySqftFormula);
      dispatch(setLayoutArea(sqftArea));
      dispatch(setLayoutPerimeter(perimeter));
      dispatch(updateMeasurements(measurementsArray));
      dispatch(setNavigation("review"));
      resetForm();
    },
  });
  const dispatch = useDispatch();

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
        <QuotesHeader navigateTo={"layout"} />
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
                overflow: "auto",
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
                    <CircularProgress />
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
                  // <SelectedImage imageSides={selectedData?.settings?.measurementSides} />
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
              <QuotesFooter
                navigateNext={"review"}
                type={"submit"}
                navigateBack={"layout"}
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
