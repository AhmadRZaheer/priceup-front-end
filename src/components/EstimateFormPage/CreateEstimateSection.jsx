import { InfoOutlined, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "@/utilities/common";
import {
  getEstimateCategory,
  getEstimateDetail,
  getEstimateLayout,
  setEstimateDetail,
  setEstimatesCollection,
} from "@/redux/globalEstimateForm";
import bgCustom from "@/Assets/customlayoutimage.svg";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateEstimateSection = ({ next, back }) => {
  const dispatch = useDispatch();
  const EstimateCategory = useSelector(getEstimateCategory);
  const getSelectedLayout = useSelector(getEstimateLayout);
  const EstimateDetails = useSelector(getEstimateDetail);
  // const [selections, setSelections] = useState({
  //   glass: null,
  //   finish: null,
  //   handle: null,
  //   hinge: null,
  //   lock: null,
  // });

  // const handleChange = (key, value) => {
  //   setSelections((prevSelections) => ({
  //     ...prevSelections,
  //     [key]: value,
  //   }));
  // };

  const validationSchema = Yup.object().shape({
    ...Array.from({
      length: getSelectedLayout?.settings?.measurementSides || 0,
    }).reduce((schema, _, index) => {
      const fieldName = String.fromCharCode(97 + index);
      return {
        ...schema,
        [fieldName]: Yup.number()
          .required(`${fieldName.toUpperCase()} is required`)
          .positive(`${fieldName.toUpperCase()} must be a positive number`),
      };
    }, {}),
    glass: Yup.string().required("Please select a glass finish option"),
    hardware: Yup.string().required("Please select a hardware finish option"),
    hingeType: Yup.string().required("Please select a hinge type "),
    handleType: Yup.string().required("Please select a handle type "),
    lock: Yup.string().required("Please select a lock"),
  });

  const formik = useFormik({
    initialValues: {
      glass: EstimateDetails?.glass ?? "",
      hardware: EstimateDetails?.hardware ?? "",
      hingeType: EstimateDetails?.hingeType ?? "",
      handleType: EstimateDetails?.handleType ?? "",
      lock: EstimateDetails?.lock ?? "",
      ...(getSelectedLayout?.settings?.measurementSides
        ? Array.from({
            length: getSelectedLayout.settings.measurementSides,
          }).reduce((acc, _, index) => {
            const fieldName = String.fromCharCode(97 + index);
            return {
              ...acc,
              [fieldName]: "",
            };
          }, {})
        : {}),
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(setEstimateDetail(values));   
      next();
      const estimateData = {
        category: EstimateCategory,
        layout: getSelectedLayout,
        estimateDetail: values,
      };
      dispatch(setEstimatesCollection(estimateData))
      console.log(values,estimateData);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          p: "24px 16px 24px 16px",
          borderRadius: "12px",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { lg: 24, md: 20 },
              fontWeight: 600,
              color: "#000000",
              display: "flex",
              lineHeight: "32.78px",
              gap: 1,
            }}
          >
            Estimate Detail
          </Typography>
          <Typography
            sx={{
              color: "#212528",
              fontSize: { lg: 16, md: 14 },
              fontWeight: 600,
              lineHeight: "21.86px",
              opacity: "70%",
            }}
          >
            Create, edit and manage your Estimate.
          </Typography>
        </Box>
        <Stack direction="row" sx={{ pt: 6, gap: 2 }}>
          <Box sx={{ width: "40%", display: "flex", justifyContent: "center" }}>
            <Box>
              <Box
                sx={{
                  padding: { xs: "10px", sm: "0px" },
                }}
              >
                {getSelectedLayout?._id === "custom" ? (
                  <img height="450px" src={bgCustom} alt="Custom" />
                ) : (
                  <img
                    height="450px"
                    src={`${backendURL}/${getSelectedLayout?.image}`}
                    alt="Selected"
                  />
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: { lg: 24, md: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  display: "flex",
                  lineHeight: "32.78px",
                  gap: 1,
                  pt: 1.5,
                }}
              >
                {getSelectedLayout?.name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "60%" }}>
            <Typography
              sx={{
                fontSize: { lg: 24, md: 20 },
                fontWeight: 600,
                color: "#000000",
                display: "flex",
                lineHeight: "32.78px",
                gap: 1,
              }}
            >
              Select Your Customizations
            </Typography>
            {/* Glass Finish Options */}
            <Box sx={{ pt: 5 }}>
              <Typography
                sx={{
                  color: "#212528",
                  fontSize: { lg: 16, md: 14 },
                  fontWeight: 600,
                  lineHeight: "21.86px",
                  opacity: "70%",
                }}
              >
                Glass Finish Options
              </Typography>
              <Grid container sx={{ pt: 2, gap: 2 }}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = `Clear ${index + 1}`;
                  return (
                    <Box
                      key={index}
                      sx={{
                        background:
                          formik.values.glass === value ? "#F3F5F6" : "",
                        width: "175px",
                        display: "flex",
                        p: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => formik.setFieldValue("glass", value)}
                    >
                      <FormControlLabel
                        value={value}
                        control={
                          <Radio
                            checked={formik.values.glass === value}
                            onChange={() =>
                              formik.setFieldValue("glass", value)
                            }
                            sx={{
                              color: "#8477DA",
                              "&.Mui-checked": {
                                color: "#8477DA",
                              },
                            }}
                          />
                        }
                      />
                      <Box>
                        <img
                          src="http://3.219.213.248:5000/images/wineCellarGlassTypes/Clear.png"
                          alt="Clear Glass"
                          height="120px"
                        />
                        <Typography
                          sx={{
                            color: "#212528",
                            lineHeight: "21.86px",
                            opacity: "70%",
                            textAlign: "center",
                          }}
                        >
                          Clear {index + 1}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Grid>
              {formik.touched.glass && formik.errors.glass && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    mt: "4px",
                  }}
                >
                  {formik.errors.glass}
                </Typography>
              )}
            </Box>
            <hr style={{ mt: "40px" }} />

            <Box sx={{ pt: 5 }}>
              <Typography
                sx={{
                  color: "#212528",
                  fontSize: { lg: 16, md: 14 },
                  fontWeight: 600,
                  lineHeight: "21.86px",
                  opacity: "70%",
                }}
              >
                Hardware Finish Options
              </Typography>
              <Grid container sx={{ pt: 2, gap: 2 }}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = `Brushed Nickel ${index + 1}`;
                  return (
                    <Box
                      key={index}
                      sx={{
                        background:
                          formik.values.hardware === value ? "#F3F5F6" : "",
                        width: "175px",
                        display: "flex",
                        p: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => formik.setFieldValue("hardware", value)}
                    >
                      <FormControlLabel
                        value={value}
                        control={
                          <Radio
                            checked={formik.values.hardware === value}
                            onChange={() =>
                              formik.setFieldValue("hardware", value)
                            }
                            sx={{
                              color: "#8477DA",
                              "&.Mui-checked": {
                                color: "#8477DA",
                              },
                            }}
                          />
                        }
                      />
                      <Box>
                        <img
                          src="http://3.219.213.248:5000/images/wineCellarFinishes/polished_nickle.jpg"
                          alt="polished_nickle"
                          height="120px"
                        />
                        <Typography
                          sx={{
                            color: "#212528",
                            lineHeight: "21.86px",
                            opacity: "70%",
                            textAlign: "center",
                          }}
                        >
                          Brushed Nickel {index + 1}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Grid>
              {formik.touched.hardware && formik.errors.hardware && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    mt: "4px",
                  }}
                >
                  {formik.errors.hardware}
                </Typography>
              )}
            </Box>
            <hr style={{ mt: "40px" }} />
            <Box sx={{ pt: 5 }}>
              <Typography
                sx={{
                  color: "#212528",
                  fontSize: { lg: 16, md: 14 },
                  fontWeight: 600,
                  lineHeight: "21.86px",
                  opacity: "70%",
                }}
              >
                Handle Type
              </Typography>
              <Grid container sx={{ pt: 2, gap: 2 }}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = `Handle Type ${index + 1}`;
                  return (
                    <Box
                      key={index}
                      sx={{
                        background:
                          formik.values.handleType === value ? "#F3F5F6" : "",
                        width: "175px",
                        display: "flex",
                        p: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => formik.setFieldValue("handleType", value)}
                    >
                      <FormControlLabel
                        value={value}
                        control={
                          <Radio
                            checked={formik.values.handleType === value}
                            onChange={() =>
                              formik.setFieldValue("handleType", value)
                            }
                            sx={{
                              color: "#8477DA",
                              "&.Mui-checked": {
                                color: "#8477DA",
                              },
                            }}
                          />
                        }
                      />
                      <Box>
                        <img
                          src="http://3.219.213.248:5000/images/wineCellarHardwares/LP8X8.png"
                          alt="polished_nickle"
                          height="120px"
                        />
                        <Typography
                          sx={{
                            color: "#212528",
                            lineHeight: "21.86px",
                            opacity: "70%",
                            textAlign: "center",
                          }}
                        >
                          8" D-Pull Back to Back Handle {index + 1}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Grid>
              {formik.touched.handleType && formik.errors.handleType && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    mt: "4px",
                  }}
                >
                  {formik.errors.handleType}
                </Typography>
              )}
            </Box>
            <hr style={{ mt: "40px" }} />
            <Box sx={{ pt: 5 }}>
              <Typography
                sx={{
                  color: "#212528",
                  fontSize: { lg: 16, md: 14 },
                  fontWeight: 600,
                  lineHeight: "21.86px",
                  opacity: "70%",
                }}
              >
                Hinge Type
              </Typography>
              <Grid container sx={{ pt: 2, gap: 2 }}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = `Hinge Typ ${index + 1}`;
                  return (
                    <Box
                      key={index}
                      sx={{
                        background:
                          formik.values.hingeType === value ? "#F3F5F6" : "",
                        width: "175px",
                        display: "flex",
                        p: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => formik.setFieldValue("hingeType", value)}
                    >
                      <FormControlLabel
                        value={value}
                        control={
                          <Radio
                            checked={formik.values.hingeType === value}
                            onChange={() =>
                              formik.setFieldValue("hingeType", value)
                            }
                            sx={{
                              color: "#8477DA",
                              "&.Mui-checked": {
                                color: "#8477DA",
                              },
                            }}
                          />
                        }
                      />
                      <Box>
                        <img
                          src="http://3.219.213.248:5000/images/wineCellarHardwares/SRPPH01.png"
                          alt="polished_nickle"
                          height="120px"
                        />
                        <Typography
                          sx={{
                            color: "#212528",
                            lineHeight: "21.86px",
                            opacity: "70%",
                            textAlign: "center",
                          }}
                        >
                          Standard Pivot Hinge {index + 1}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Grid>
              {formik.touched.hingeType && formik.errors.hingeType && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    mt: "4px",
                  }}
                >
                  {formik.errors.hingeType}
                </Typography>
              )}
            </Box>
            <hr style={{ mt: "40px" }} />
            <Box sx={{ pt: 5 }}>
              <Typography
                sx={{
                  color: "#212528",
                  fontSize: { lg: 16, md: 14 },
                  fontWeight: 600,
                  lineHeight: "21.86px",
                  opacity: "70%",
                }}
              >
                Lock
              </Typography>
              <>
                <Grid container sx={{ pt: 2, gap: 2 }}>
                  {Array.from({ length: 2 }).map((_, index) => {
                    const value = `Lock ${index + 1}`;
                    return (
                      <Box
                        key={index}
                        sx={{
                          background:
                            formik.values.lock === value ? "#F3F5F6" : "",
                          width: "175px",
                          display: "flex",
                          p: 1.5,
                          cursor: "pointer",
                        }}
                        onClick={() => formik.setFieldValue("lock", value)}
                      >
                        <FormControlLabel
                          value={value}
                          control={
                            <Radio
                              checked={formik.values.lock === value}
                              onChange={() =>
                                formik.setFieldValue("lock", value)
                              }
                              sx={{
                                color: "#8477DA",
                                "&.Mui-checked": {
                                  color: "#8477DA",
                                },
                              }}
                            />
                          }
                        />
                        <Box alignSelf="center">
                          <Typography
                            sx={{
                              color: "#212528",
                              lineHeight: "21.86px",
                              opacity: "70%",
                              textAlign: "center",
                            }}
                          >
                            {index === 0 ? "With Lock" : "Without Lock"}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Grid>
                <Box sx={{ pt: 2 }}>
                  <img
                    src="http://3.219.213.248:5000/images/wineCellarHardwares/Glass-Door-Lock-300x204.png"
                    alt="polished_nickle"
                    height="120px"
                  />
                </Box>
              </>
              {formik.touched.lock && formik.errors.lock && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    mt: "4px",
                  }}
                >
                  {formik.errors.lock}
                </Typography>
              )}
            </Box>
            <hr style={{ mt: "40px" }} />

            {/* Dimensions Section */}
            <Box sx={{ pt: 5 }}>
              <Typography
                sx={{
                  fontSize: { lg: 24, md: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  display: "flex",
                  lineHeight: "32.78px",
                  gap: 1,
                }}
              >
                Dimensions
              </Typography>
              <Grid container spacing={2}>
                {Array.from({
                  length: getSelectedLayout?.settings?.measurementSides || 0,
                }).map((_, index) => (
                  <Grid item md={3} xs={6} key={index}>
                    <Box
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
                          <InfoOutlined
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched[String.fromCharCode(97 + index)] &&
                          Boolean(
                            formik.errors[String.fromCharCode(97 + index)]
                          )
                        }
                        // helperText={
                        //   formik.touched[String.fromCharCode(97 + index)] &&
                        //   formik.errors[String.fromCharCode(97 + index)]
                        //     ? `${
                        //         formik.errors[String.fromCharCode(97 + index)]
                        //       }. Please enter a valid value.`
                        //     : ""
                        // }
                      />
                    </Box>
                    {formik.touched[String.fromCharCode(97 + index)] &&
                      formik.errors[String.fromCharCode(97 + index)] && (
                        <Typography
                          sx={{
                            color: "red",
                            fontSize: "12px",
                            mt: "4px",
                          }}
                        >
                          {formik.errors[String.fromCharCode(97 + index)]}.
                        </Typography>
                      )}
                  </Grid>
                ))}
              </Grid>
            </Box>
            <hr style={{ marginTop: "40px" }} />
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{ pt: 3, justifyContent: "space-between", width: "100%" }}
        >
          <Button
            sx={{
              backgroundColor: "#8477DA",
              "&:hover": {
                backgroundColor: "#8477da",
              },
              position: "relative",
              fontWeight: 600,
              fontSize: "16px",
            }}
            variant="contained"
            onClick={back}
          >
            <KeyboardArrowRight sx={{ transform: "rotate(180deg)" }} /> Back
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#8477DA",
              "&:hover": {
                backgroundColor: "#8477da",
              },
              position: "relative",
              fontWeight: 600,
              fontSize: "16px",
            }}
            variant="contained"
          >
            Next <KeyboardArrowRight />
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default CreateEstimateSection;
