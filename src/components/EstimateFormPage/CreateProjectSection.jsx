import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import CustomInputField from "../ui-components/CustomInput";
import { KeyboardArrowRight } from "@mui/icons-material";

const validationSchema = yup.object({
  name: yup.string().required("Project name is required"),
  // location: yup.string().required("Location is required"),
  notes: yup.string(),
  customerDetail: yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Enter a valid email"),
    // .required("Email is required"),
    // phone: yup.string().required("Phone number is required"),
    // address: yup.string().required("Address is required"),
  }),
});

const CreateProjectSection = ({ next, back }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      customerDetail: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      },
      notes: "",
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
              Project Detail
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ display: "flex", height: "calc(100vh - 376px)" }}>
          <Box sx={{ borderRight: "1px solid #CCCCCC", pr: 3, width: "50%" }}>
            <Box
              sx={{
                background: "#FFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  aligItems: "baseline",
                  width: "100%",
                }}
              >
                {/** Project Detail Block */}
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { sm: "row", xs: "column" },
                      gap: 4,
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        gap: 4,
                        flexDirection: { sm: "row", xs: "column" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: "column",
                          width: { sm: "50%", xs: "100%" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box mb={0.6}>
                            <label htmlFor="name" className="label-text">
                              Project Name
                            </label>
                          </Box>
                          <CustomInputField
                            id="name"
                            name="name"
                            size="small"
                            variant="outlined"
                            placeholder='Ener Project Name'
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
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: { sm: "50%", xs: "100%" },
                        }}
                      >
                        {/** Address Select Block */}
                        <Box mb={0.6}>
                          <label htmlFor="location" className="label-text">
                            Location
                          </label>
                        </Box>
                        <FormControl
                          sx={{ width: "100%" }}
                          size="small"
                          className="custom-textfield"
                        >
                          <Select
                            name="location"
                            value={formik.values.location}
                            size="small"
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            className="hardwareSelect"
                            sx={{
                              height: "40px",
                              background: "#F6F5FF",
                              ".MuiOutlinedInput-input": {
                                p: "10px !important",
                              },
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            displayEmpty
                          >
                            <MenuItem value="">
                              <em>Select Location</em>
                            </MenuItem>
                            <MenuItem value="Test Name">Test Name</MenuItem>
                            <MenuItem value="Test Name 1">Test Name 1</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: { sm: "50%", xs: "100%" }, pt: 2 }}>
                    <Typography
                      sx={{ fontSize: "14px", fontWeight: 500, pb: 0.6 }}
                    >
                      Add Notes:
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
                          id="notes"
                          name="notes"
                          placeholder="Enter Additional Notes"
                          size="large"
                          variant="outlined"
                          sx={{ padding: "10px", resize: "vertical" }}
                          value={formik.values.notes}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "50%", pl: 3 }}>
            <Box
              sx={{
                background: "#FFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  aligItems: "baseline",
                  width: "100%",
                }}
              >
                {/** Project Detail Block */}
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        paddingY: { sm: 0, xs: 2 },
                        width: "50%",
                      }}
                    >
                      <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        <label htmlFor="customerDetail.firstName">First Name</label>
                      </Box>
                      <CustomInputField
                        id="customerDetail.firstName"
                        name="customerDetail.firstName"
                        placeholder="Enter First Name"
                        variant="outlined"
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
                        value={formik.values.customerDetail.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.customerDetail?.firstName && Boolean(formik.errors.customerDetail?.firstName)
                        }
                        helperText={
                          formik.touched.customerDetail?.firstName && formik.errors.customerDetail?.firstName
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        paddingY: { sm: 0, xs: 2 },
                        width: "50%",
                      }}
                    >
                      <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        <label htmlFor="customerDetail.lastName">Last Name</label>
                      </Box>
                      <CustomInputField
                        id="customerDetail.lastName"
                        name="customerDetail.lastName"
                        placeholder="Enter Last Name"
                        variant="outlined"
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
                        value={formik.values.customerDetail.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.customerDetail?.lastName && Boolean(formik.errors.customerDetail?.lastName)
                        }
                        helperText={
                          formik.touched.customerDetail?.lastName && formik.errors.customerDetail?.lastName
                        }
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      pb: { sm: 0, xs: 2 },
                      pt: 2,
                    }}
                  >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                      <label htmlFor="customerDetail.email">Email</label>
                    </Box>
                    <CustomInputField
                      id="customerDetail.email"
                      name="customerDetail.email"
                      placeholder="Enter Email address"
                      size="small"
                      variant="outlined"
                      value={formik.values.customerDetail.email}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.customerDetail?.email && Boolean(formik.errors.customerDetail?.email)}
                      helperText={formik.touched.customerDetail?.email && formik.errors.customerDetail?.email}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingBottom: { sm: 0, xs: 2 },
                      pt: 2,
                    }}
                  >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                      <label htmlFor="customerDetail.phone">Phone Number</label>
                    </Box>
                    <CustomInputField
                      id="customerDetail.phone"
                      name="customerDetail.phone"
                      placeholder="Enter Phone Number"
                      size="small"
                      variant="outlined"
                      value={formik.values.customerDetail.phone}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.customerDetail?.phone && Boolean(formik.errors.customerDetail?.phone)}
                      helperText={formik.touched.customerDetail?.phone && formik.errors.customerDetail?.phone}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      pt: 2,
                    }}
                  >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                      <label htmlFor="customerDetail.address">Address</label>
                    </Box>
                    <CustomInputField
                      id="customerDetail.address"
                      name="customerDetail.address"
                      placeholder="Enter Address"
                      size="small"
                      variant="outlined"
                      value={formik.values.customerDetail.address}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.customerDetail?.address && Boolean(formik.errors.customerDetail?.address)}
                      helperText={formik.touched.customerDetail?.address && formik.errors.customerDetail?.address}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Stack
          direction="row"
          sx={{ pt: 3, justifyContent: "end", width: "100%" }}
        >
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

export default CreateProjectSection;
