import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import CustomInputField from "@/components/ui-components/CustomInput";
import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { backendURL } from "@/utilities/common";
import { useCreateDocument, useEditDocument } from "@/utilities/ApiHooks/common";
import DefaultImageIcon from "@/Assets/default-image.jpg";
import { useDropzone } from "react-dropzone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

const routePrefix = `${backendURL}/users`;

const AddEditLocationModal = ({
  open,
  handleClose,
  recordToModify,
  refetch,
}) => {
  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("locationImage", acceptedFiles[0]);
  };
  const inputRef = useRef(null); // Create a ref for the file input
  const { getInputProps } = useDropzone({ onDrop });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Location email is required"),
    locationName: Yup.string().required("Location name is required"),
    name: Yup.string().required("Owner name is required")
  });

  const {
    mutateAsync: addLocation,
    isLoading: addLocationLoading,
  } = useCreateDocument();
  const {
    mutateAsync: updateLocation,
    isLoading: updateLocationLoading,
  } = useEditDocument();

  const formik = useFormik({
    initialValues: {
      locationName: recordToModify?.name || "",
      email: recordToModify?.user?.email || "",
      name: recordToModify?.user?.name || "",
      locationAddress: recordToModify?.address || "",
      locationImage: recordToModify?.image || null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      if (typeof values.locationImage !== 'string') {
        formData.append("image", values.locationImage);
      }
      formData.append("locationName", values.locationName);
      formData.append("name", values.name);
      formData.append("locationAddress", values.locationAddress);
      if (recordToModify) {
        await updateLocation({ apiRoute: `${routePrefix}/${recordToModify?.user?._id}`, data: formData });
      } else {
        formData.append("email", values.email);
        await addLocation({ apiRoute: `${routePrefix}/save`, data: formData });
      }
      resetForm();
      refetch();
      handleClose();
    },
  });

  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger click on the file input
  };

  const handleResetPass = async () => {
    await updateLocation({ apiRoute: `${routePrefix}/updatePassword/${recordToModify?.user?._id}`, data: {} });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Typography
            sx={{ color: "#667085", fontSize: "16px", fontWeight: "bold" }}
          >
            Locations Management
          </Typography>
          <Close
            onClick={handleClose}
            sx={{
              color: "#7F56D9",
              cursor: "pointer",
              mt: -1,
              mr: -1,
            }}
          />
        </Box>
        {/* <form> */}
        <Box
          sx={{
            mt: 2,
            backgroundColor: "#f3f5f6",
            borderRadius: "8px",
            p: 2,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: "84px",
                  height: "84px",
                  borderRadius: "100%",
                  overflow: "hidden",
                }}
              >
                {formik.values.locationImage !== undefined && formik.values.locationImage !== null ? (
                  <img
                    width={"84px"}
                    height={"84px"}
                    src={typeof formik.values.locationImage === 'string' ? `${backendURL}/${formik.values.locationImage}` : URL.createObjectURL(formik.values.locationImage)}
                    alt="Selected"
                  />
                ) : (
                  <img
                    width={"84px"}
                    height={"84px"}
                    src={DefaultImageIcon}
                    alt="Selected"
                  />
                )}
              </Box>

              <input
                accept="image/*"
                id="image-input"
                type="file"
                {...getInputProps()}
                ref={inputRef} // Attach the ref to the input
                style={{ display: "none" }}
              />
              <label htmlFor="image-input" style={{ alignSelf: 'center' }}>
                <Box>
                  <Button
                    onClick={handleButtonClick}
                    sx={{
                      color: "black",
                      fontWeight: 500,
                      borderRadius: "54px !important",
                      border: "1px solid rgba(212, 219, 223, 1)",
                    }}
                  >
                    Upload Profile Image
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(132, 119, 218, 1)",
                      fontSize: "12px",
                      fontWeight: 600
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Typography>
                </Box>
              </label>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    color: "#344054",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Location Name
                </Typography>
                <CustomInputField
                  fullWidth={true}
                  type="text"
                  name="locationName"
                  placeholder={"Enter Location Name"}
                  value={formik.values.locationName}
                  onChange={formik.handleChange}
                />
                {formik.touched.locationName && formik.errors.locationName && (
                  <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                    {formik.errors.locationName}
                  </Typography>
                )}
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    color: "#344054",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Location Email
                </Typography>
                <CustomInputField
                  fullWidth={true}
                  type="text"
                  name="email"
                  disabled={recordToModify ? true : false}
                  placeholder={"Enter Location Email Address"}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                    {formik.errors.email}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    color: "#344054",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Location Owner
                </Typography>
                <CustomInputField
                  fullWidth={true}
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder={"Enter Location Owner Name"}
                />
                {formik.touched.name && formik.errors.name && (
                  <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                    {formik.errors.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    color: "#344054",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Location Address
                </Typography>
                <CustomInputField
                  fullWidth={true}
                  type="text"
                  name="locationAddress"
                  value={formik.values.locationAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={"Enter Location Address"}
                  error={
                    formik.touched.locationAddress &&
                    Boolean(formik.errors.locationAddress)
                  }
                  helperText={
                    formik.touched.locationAddress &&
                    formik.errors.locationAddress
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", mt: 3, justifyContent: "space-between" }}
        >
          {recordToModify &&
            <Button
              disabled={updateLocationLoading}
              variant="outlined"
              onClick={handleResetPass}
              sx={{
                height: "34px",
                // width: "45%",
                color: "#8477DA",
                border: "1px solid #8477DA",
              }}
            >
              Reset Password
            </Button>
          }
          <Box sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                border: "1px solid #D0D5DD",
                width: "auto",
                color: "#344054",
                ":hover": {
                  border: "1px solid #D0D5DD",
                },
              }}
            >
              Close
            </Button>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              sx={{
                bgcolor: "#8477DA",
                color: "white",
                width: "auto",
                ":hover": {
                  bgcolor: "#8477DA",
                },
              }}
              disabled={addLocationLoading || updateLocationLoading}
            >
              {addLocationLoading || updateLocationLoading ? (
                <Box sx={{ position: "absolute", bottom: "-1px" }}>
                  <CircularProgress size={24} sx={{ color: "white" }} />
                </Box>
              ) : recordToModify ? (
                "Save Changes"
              ) : (
                "Add"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
export default AddEditLocationModal;
