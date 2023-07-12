import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 3,
  // top: { md: "50%", xs: "76%" },
  // left: { md: "50%", xs: "50%" },
  bottom: 0,
  // transform: "translate(-50%, -50%)",
  width: { md: 350, xs: "100%" },
  bgcolor: "#ffff",
  borderRadius: { md: "4px" },
  borderTopLeftRadius: { md: "4px", xs: 30 },
  borderTopRightRadius: { md: "4px", xs: 30 },
};
const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email address"),

  address: yup.string().required("Address is required"),
});
export default function ClientDetailsModel({
  open,
  handleCancel,
  SetlayoutMeasurementsOpen,
}) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  console.log(formik.values);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={style}>
            <Box
              sx={{
                background: {
                  md: "#ffff",
                  xs: "linear-gradient(to top right, #625f78 16%, #312969, #100d24 82%)",
                },
                padding: 3,
                borderTopLeftRadius: { md: "4px", xs: 30 },
                borderTopRightRadius: { md: "4px", xs: 30 },
                color: { md: "black", xs: "white" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  paddingBottom: 2,
                }}
              >
                <Typography>Clients Details</Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 4 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingY: { md: 0, xs: 2 },
                    }}
                  >
                    <Box sx={{ display: { md: "block", xs: "none" } }}>
                      <label htmlFor="firstName">First Name</label>
                    </Box>

                    <TextField
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      size="small"
                      variant="outlined"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstName && formik.errors.firstName
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingY: { md: 0, xs: 2 },
                    }}
                  >
                    <Box sx={{ display: { md: "block", xs: "none" } }}>
                      {" "}
                      <label htmlFor="lastName">Last Name</label>
                    </Box>
                    <TextField
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      size="small"
                      variant="outlined"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.lastName && formik.errors.lastName}
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  paddingBottom: { md: 0, xs: 2 },
                }}
              >
                <Box sx={{ display: { md: "block", xs: "none" } }}>
                  <label htmlFor="email">Client Email address</label>
                </Box>
                <TextField
                  id="email"
                  name="email"
                  placeholder="Client Email address"
                  size="small"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box sx={{ display: { md: "block", xs: "none" } }}>
                  {" "}
                  <label htmlFor="address">Client address</label>
                </Box>
                <TextField
                  id="address"
                  name="address"
                  placeholder="Client address"
                  size="small"
                  variant="outlined"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  marginTop: 2,
                  justifyContent: "end",
                }}
              >
                {/* <Button
                  fullWidth
                  sx={{
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "#344054",
                    textTransform: "initial",
                    border: "1px solid #D0D5DD",
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button> */}
                <Button
                  type="submit"
                  sx={{
                    textTransform: "initial",
                  }}
                  fullWidth
                  variant="contained"
                  onClick={handleCancel()}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
