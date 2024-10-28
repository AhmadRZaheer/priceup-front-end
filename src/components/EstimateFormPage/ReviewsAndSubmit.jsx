import {
  Box,
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import CustomInputField from "../ui-components/CustomInput";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";

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
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      postalCode: "",
      additionalDetails: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      next(values);
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

        <Box sx={{ display: "flex", overflow: "auto", height: "calc(100vh - 355px)" }}>
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
            <Typography variant="h6">Quote Type = Glass Showers</Typography>
            <Typography variant="h6">
              Product Type = Notched 90 Degree
            </Typography>
            <Typography variant="h6">Glass Type = Clear</Typography>
            <Typography variant="h6">
              Hardware Finish = Brushed Nickel
            </Typography>
            <Typography variant="h6">
              Handle Type = 8" D-Pull Back to Back Handle
            </Typography>
            <Typography variant="h6">Height = 2</Typography>
            <Typography variant="h6">Width = 2</Typography>
            <Typography variant="h6">Depth = 2</Typography>
            <Typography variant="h6">Location = Phoenix, AZ</Typography>
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
                onChange={formik.handleChange}
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
                onChange={formik.handleChange}
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
                onChange={formik.handleChange}
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
                onChange={formik.handleChange}
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
                    onChange={formik.handleChange}
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
            onClick={back}
          >
            <KeyboardArrowRight sx={{ transform: "rotate(180deg)" }} /> Back
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
            Submit
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default ReviewsAndSubmit;
