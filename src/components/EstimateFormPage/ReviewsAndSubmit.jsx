import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomInputField from "../ui-components/CustomInput";
import { ExpandMore, KeyboardArrowRight } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getEstimates,
  getProjectDetails,
  getReviewDetail,
  setEstimateCategory,
  setEstimateDetail,
  setEstimateLayout,
  setReviewDetail,
} from "@/redux/globalEstimateForm";

const validationSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  postalCode: yup.string().required("Postal code is required"),
  additionalDetails: yup.string(),
});

const ReviewsAndSubmit = ({ next, back }) => {
  const dispatch = useDispatch();
  const ProjectDetail = useSelector(getProjectDetails);
  const ReviewDetails = useSelector(getReviewDetail);
  const totalQuotes = useSelector(getEstimates);
  const [expandAccordion, setExpandAccordion] = useState(
    Array(totalQuotes.length).fill(false)
  );

  const formik = useFormik({
    initialValues: {
      fullName: ReviewDetails?.fullName ?? "",
      email: ReviewDetails?.email ?? "",
      phone: ReviewDetails?.phone ?? "",
      postalCode: ReviewDetails?.postalCode ?? "",
      additionalDetails: ReviewDetails?.additionalDetails ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // dispatch(setReviewDetail(values));
      console.log(values);
      next(values);
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e); // Update formik state
    dispatch(setReviewDetail(formik.values)); // Dispatch updated form values
  };
  const handleAnother = () => {
    back(1);
    dispatch(setEstimateDetail({}));
    dispatch(setEstimateCategory(""));
    dispatch(setEstimateLayout(""));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          p: "24px 16px 24px 16px",
          borderRadius: "12px",
        }}
      >
        <Stack direction="column" gap="4px">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "21.09px",
                fontFamily: '"Roboto",sans-serif !important',
                mb: 1,
              }}
            >
              Review and Submit for Quote
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            overflow: "auto",
            height: "calc(100vh - 355px)",
          }}
        >
          <Box
            sx={{
              borderRight: "1px solid #CCCCCC",
              pr: 3,
              width: "50%",
              gap: "12px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "18px" }}>
              Project Name: {ProjectDetail.name}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "18px" }}>
              Location : {ProjectDetail.location}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "18px" }}>
              Customer Name : {ProjectDetail.customerDetail.firstName}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "18px" }}>
              Customer Email : {ProjectDetail.customerDetail.email}
            </Typography>
            {totalQuotes.map((data, index) => (
              <Accordion
                key={index} // Add a key to each Accordion
                expanded={expandAccordion[index]}
                onChange={() => {
                  setExpandAccordion((prev) => {
                    const newExpandState = [...prev];
                    newExpandState[index] = !newExpandState[index];
                    return newExpandState;
                  });
                }}
                sx={{
                  border: "none",
                  background: "none",
                  boxShadow: "none",
                  ":before": {
                    backgroundColor: "white !important",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: "#8477DA" }} />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    color: "#5D6164",
                    p: 0,
                    flexGrow: `0 !important`,
                    // width: "200px",
                    "&.Mui-expanded": {
                      minHeight: "40px",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 500,
                      lineHeight: "21px",
                      color: "#9088C0",
                    }}
                  >
                  Estimate Quote {index + 1}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "0px" }}>
                 
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Category =  {data?.category}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Layout = {data?.layout.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Glass Type =  {data?.estimateDetail.glass}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Hardware Finish = {data?.estimateDetail.hardware}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Hinge Type = {data?.estimateDetail.hingeType}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Handle Type = {data?.estimateDetail.handleType}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Lock  = {data?.estimateDetail.lock}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Height = 2
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    Width = 2
                  </Typography>                 
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Box sx={{ width: "50%", pl: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                pb: { sm: 0, xs: 2 },
              }}
            >
              <Box sx={{ display: { sm: "block", xs: "none" } }}>
                <label htmlFor="fullName">Full Name</label>
              </Box>
              <CustomInputField
                id="fullName"
                name="fullName"
                placeholder="Enter Full Name"
                size="small"
                variant="outlined"
                value={formik.values.fullName}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                InputProps={{
                  style: {
                    color: "black",
                    borderRadius: 4,
                    backgroundColor: "white",
                  },
                  inputProps: { min: 0, max: 50 },
                }}
                sx={{
                  color: { sm: "black", xs: "white" },
                  width: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                pb: { sm: 0, xs: 2 },
                pt: 1,
              }}
            >
              <Box sx={{ display: { sm: "block", xs: "none" } }}>
                <label htmlFor="email">Email</label>
              </Box>
              <CustomInputField
                id="email"
                name="email"
                placeholder="Enter Email address"
                size="small"
                variant="outlined"
                value={formik.values.email}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  style: {
                    color: "black",
                    borderRadius: 4,
                    backgroundColor: "white",
                  },
                  inputProps: { min: 0, max: 50 },
                }}
                sx={{
                  color: { sm: "black", xs: "white" },
                  width: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                pb: { sm: 0, xs: 2 },
                pt: 1,
              }}
            >
              <Box sx={{ display: { sm: "block", xs: "none" } }}>
                <label htmlFor="phone">Phone</label>
              </Box>
              <CustomInputField
                id="phone"
                name="phone"
                placeholder="Enter Phone"
                size="small"
                variant="outlined"
                value={formik.values.phone}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                InputProps={{
                  style: {
                    color: "black",
                    borderRadius: 4,
                    backgroundColor: "white",
                  },
                  inputProps: { min: 0, max: 50 },
                }}
                sx={{
                  color: { sm: "black", xs: "white" },
                  width: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                pb: { sm: 0, xs: 2 },
                pt: 1,
              }}
            >
              <Box sx={{ display: { sm: "block", xs: "none" } }}>
                <label htmlFor="postalCode">Postal code</label>
              </Box>
              <CustomInputField
                id="postalCode"
                name="postalCode"
                placeholder="Enter Postal code"
                size="small"
                variant="outlined"
                value={formik.values.postalCode}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.postalCode && Boolean(formik.errors.postalCode)
                }
                helperText={
                  formik.touched.postalCode && formik.errors.postalCode
                }
                InputProps={{
                  style: {
                    color: "black",
                    borderRadius: 4,
                    backgroundColor: "white",
                  },
                  inputProps: { min: 0, max: 50 },
                }}
                sx={{
                  color: { sm: "black", xs: "white" },
                  width: "100%",
                }}
              />
            </Box>
            <Box sx={{ width: "100%", pt: 1 }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, pb: 0.6 }}>
                Additional Details
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    paddingY: { sm: 0, xs: 1 },
                    width: "100%",
                  }}
                >
                  <TextareaAutosize
                    style={{
                      padding: "10px",
                      borderColor: "#cccc",
                      borderRadius: "5px",
                    }}
                    className="custom-textfield"
                    color="neutral"
                    minRows={5}
                    maxRows={19}
                    id="additionalDetails"
                    name="additionalDetails"
                    placeholder="Enter Additional Details"
                    value={formik.values.additionalDetails}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
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
            onClick={handleAnother}
          >
            <KeyboardArrowRight sx={{ transform: "rotate(180deg)" }} /> Another
            Quote
          </Button>
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
            type="submit"
          >
            Save
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default ReviewsAndSubmit;
