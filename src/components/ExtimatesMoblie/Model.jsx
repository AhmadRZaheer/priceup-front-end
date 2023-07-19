import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import { useCreateEstimates } from "../../utilities/ApiHooks/Estimate";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  getMeasumentSide,
  getTotal,
  selectedItem,
  setNavigation,
} from "../../redux/estimateCalculations";
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
  // bgcolor: "red",
  borderRadius: { md: "4px" },
  borderTop: "2px solid #4c4d53",
  borderTopLeftRadius: { md: "4px", xs: 30 },
  borderTopRightRadius: { md: "4px", xs: 30 },
  zIndex: 2,
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
  showSnackbar,
}) {
  const {
    mutate,
    isError: ErrorForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateEstimates();
  const estimatesContent = useSelector(getContent);
  const estimatesTotal = useSelector(getTotal);
  const estimatesLayout = useSelector(selectedItem);
  const measurements = useSelector(getMeasumentSide);
  const data = estimatesContent?.addOns;
  const addOnIds = data.map((obj) => obj._id);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const estimate = {
        layout_id: estimatesLayout?._id,
        hardwareFinishes: estimatesContent?.hardwareFinishes?._id,
        handles: {
          type: estimatesContent?.handles?.item?._id,
          count: estimatesContent?.handles?.count,
        },
        hinges: {
          type: estimatesContent?.hinges?.item?._id,
          count: estimatesContent?.hinges?.count,
        },
        mounting: {
          clamps: {
            wallClamp: {
              type: estimatesContent?.mounting?.clamps?.wallClamp?.item?._id,
              count: estimatesContent?.mounting?.clamps?.wallClamp?.count,
            },
            sleeveOver: {
              type: estimatesContent?.mounting?.clamps?.sleeveOver?.item?._id,
              count: estimatesContent?.mounting?.clamps?.sleeveOver?.count,
            },
            glassToGlass: {
              type: estimatesContent?.mounting?.clamps?.glassToGlass?.item?._id,
              count: estimatesContent?.mounting?.clamps?.glassToGlass?.count,
            },
          },
          channel: estimatesContent?.mounting?.channel?.item?._id,
          activeType: estimatesContent?.mounting?.activeType,
        },
        glassType: {
          type: estimatesContent?.glassType?.item?._id,
          thickness: estimatesContent?.glassType?.count,
        },
        glassTreatment: estimatesContent?.glassTreatment?._id,
        slidingDoorSystem: {
          type: estimatesContent?.slidingDoorSystem?.item?._id,
          count: estimatesContent?.slidingDoorSystem?.count,
        },
        header: {
          type: estimatesContent?.header?.item?._id,
          count: estimatesContent?.slidingDoorSystem?.count,
        },
        oneInchHoles: estimatesContent?.oneInchHoles,
        hingeCut: estimatesContent?.hingeCut,
        clampCut: estimatesContent?.clampCut,
        notch: estimatesContent?.notch,
        outages: estimatesContent?.outages,
        mitre: estimatesContent?.mitre,
        polish: estimatesContent?.polish,
        people: estimatesContent?.people,
        hours: estimatesContent?.hours,
        cost: Number(estimatesTotal),
        addOns: addOnIds,
        sleeveOverCount: estimatesContent?.sleeveOverCount,
        towelBarsCount: estimatesContent?.sleeveOverCount,
        measurements: measurements,
      };
      mutate({ customerData: values, estimateData: estimate });
      handleCancel();
    },
  });

  React.useEffect(() => {
    if (CreatedSuccessfully) {
      showSnackbar("Estimate created successfully", "success");
      // window.location.href = "/";
      dispatch(setNavigation("existing"));
    } else if (ErrorForAdd) {
      const errorMessage = ErrorForAdd.message || "An error occurred";
      showSnackbar(errorMessage, "error");
    }
  }, [CreatedSuccessfully, ErrorForAdd]);

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
                      InputProps={{
                        style: {
                          color: "white",
                          paddingY: 30, 
                        },
                      }}
                      style={{
                        height: 40,
                        border:  "2px solid #423f57",
                        borderRadius: 3,
                        color: { md: "black", xs: "white" },
                        backgroundColor: "rgba(22,19,48)",
                        width: "100%",
                      }}
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
                      InputProps={{
                        style: {
                          color: "white",
                          paddingY: 30, 
                        },
                      }}
                      style={{
                        height: 40,
                        border:  "2px solid #423f57",
                        borderRadius: 3,
                        color: { md: "black", xs: "white" },
                        backgroundColor: "rgba(22,19,48)",
                        width: "100%",
                      }}
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
                  InputProps={{
                    style: {
                      color: "white",
                      paddingY: 30, 
                    },
                  }}
                  style={{
                    height: 40,
                    border:  "2px solid #423f57",
                    borderRadius: 3,
                    color: { md: "black", xs: "white" },
                    backgroundColor: "rgba(22,19,48)",
                    width: "100%",
                  }}
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
                  InputProps={{
                    style: {
                      color: "white",
                      paddingY: 30, 
                    },
                  }}
                  style={{
                    height: 40,
                    border:  "2px solid #423f57",
                    borderRadius: 3,
                    color: { md: "black", xs: "white" },
                    backgroundColor: "rgba(22,19,48)",
                    width: "100%",
                  }}
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
                {/* <Box onClick={handleCancel}> */}
                <Button
                  type="submit"
                  sx={{
                    textTransform: "initial",
                    backgroundColor: "#8477da",
                    "&:hover": {
                      backgroundColor: "#8477da",
                    },
                  }}
                  fullWidth
                  variant="contained"
                  // onClick={handleCancel}
                >
                  Save
                </Button>
                {/* </Box> */}
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
