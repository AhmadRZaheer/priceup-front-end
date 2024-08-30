import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
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
  display: "flex",
  flexDirection: "column",
  gap: '19px',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 809,
  bgcolor: "#FFFFFF",
  borderRadius: "12px",
  p: '24px 16px 24px 16px',
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
    <Modal open={open} onClose={handleClose}
    sx={{
      backgroundColor: "rgba(5, 0, 35, 0.1)",
      '.MuiModal-backdrop': {
        backgroundColor: "rgba(5, 0, 35, 0.1)",
      }
    }}
    >
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Typography
            sx={{   fontWeight: 700,
              fontSize: 18,
              lineHeight: '21.09px',
              fontFamily: '"Roboto",sans-serif !important' }}
          >
            Locations Management
          </Typography>

          <Box>
              <IconButton
                sx={{ p: 0 }}
                onClick={handleClose}
              >
                <Close />
              </IconButton>
            </Box>
{/* 
          <Close
            onClick={handleClose}
            sx={{
              color: "#7F56D9",
              cursor: "pointer",
              mt: -1,
              mr: -1,
            }}
          /> */}
        </Box>
        {/* <form> */}
        <Box
          sx={{
            background: "#F3F5F6",
              padding: "16px",
              borderRadius: "12px",
            // mt: 2,
            // backgroundColor: "#f3f5f6",
            // borderRadius: "8px",
            // p: 2,
          }}
        >
          <Box>
            <Box
              sx={{
                // display: "flex",
                // alignItems: "center",
                // gap: 2,
                display: "flex", gap: '19px', my: 2
              }}
            >
              <Box
                // sx={{
                //   width: "84px",
                //   height: "84px",
                //   borderRadius: "100%",
                //   overflow: "hidden",
                // }}
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
                      color: "#000000",
                      fontWeight: 600,
                      borderRadius: "54px !important",
                      border: "1px solid #D4DBDF",
                      textTransform: "capitalize",
                      px: '10px 12px !important',
                      lineHeight: '21px',
                      fontSize: 16
                    }}
                  >
                    Upload Profile Image
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#8477DA",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: '16.39px', mt: 0.5
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Typography>
                </Box>
              </label>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Box sx={{ width: "100%" }} className='model-field'>
                <Typography
                className='input-label-text'
                  // sx={{
                  //   color: "#344054",
                  //   fontSize: "14px",
                  //   fontWeight: 500,
                  // }}
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

              <Box sx={{ width: "100%" }} className='model-field'>
                <Typography
                className='input-label-text'
                  // sx={{
                  //   color: "#344054",
                  //   fontSize: "14px",
                  //   fontWeight: 500,
                  // }}
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
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Box sx={{ width: "100%" }} className='model-field'>
                <Typography
                className='input-label-text'
                  // sx={{
                  //   color: "#344054",
                  //   fontSize: "14px",
                  //   fontWeight: 500,
                  // }}
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
              <Box sx={{ width: "100%" }} className='model-field'>
                <Typography
                className='input-label-text'
                  // sx={{
                  //   color: "#344054",
                  //   fontSize: "14px",
                  //   fontWeight: 500,
                  // }}
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
          sx={{ display: "flex",  justifyContent: "space-between" }}
        >
         <Box>
              {recordToModify ? (
                <Button
                  variant="outlined"
                  onClick={handleResetPass}
                  sx={{
                    color: "#8477DA",
                    border: "1px solid #8477DA",
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                >
                  Reset Password
                </Button>
              ) : (
                ""
              )}
            </Box>

          <Box sx={{ display: "flex", gap: '12px'}}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                color: "#212528",
                border: "1px solid #D6DAE3",
                width: "fit-content",
                fontWeight: 600,
                fontSize: '16px'
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
                padding: "10px 16px !important",
                position: "relative",
                fontWeight: 600,
                fontSize: '16px'
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
