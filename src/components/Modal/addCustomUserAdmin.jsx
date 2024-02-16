import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../ui-components/CustomInput";
import { useEffect, useState } from "react";
import InputImageIcon from "../../Assets/imageUploader.svg";
import {
  useCreateCustomUser,
  useEditCustomUser,
  useResetCustomUserPassword,
} from "../../utilities/ApiHooks/superAdmin";
import * as Yup from "yup";
import { backendURL } from "../../utilities/common";

function CustomUserCreateModal({ open, close, refetch, isEdit }) {
  const {
    mutate: userCreateData,
    isSuccess,
    isLoading: creatingUser,
  } = useCreateCustomUser();
  const {
    mutate: uesEditUser,
    isSuccess: updated,
    isLoading,
  } = useEditCustomUser();
  const { mutate: ResetPassword } = useResetCustomUserPassword();
  const [selectedImage, setSelectedImage] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid white",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };
  const formik = useFormik({
    initialValues: {
      _id: isEdit?.data?._id,
      name: isEdit?.type ? isEdit?.data?.name : "",
      email: isEdit?.type ? isEdit?.data?.email : "",
      image: isEdit?.type ? isEdit?.data?.image : "",
    },
    enableReinitialize: isEdit?.type ? true : false,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          "Invalid email address"
        )
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      if (isEdit.type) {
        uesEditUser(values);
      } else userCreateData(values);
    },
  });
  useEffect(() => {
    if (isSuccess || updated) {
      close();
      refetch();
      formik.resetForm();
    }
  }, [isSuccess, updated]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    formik.setFieldValue("image", file);
  };
  const handleRestPass = () => {
    ResetPassword({ id: isEdit?.data?._id });
  };
  return (
    <>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <Typography sx={{ fontSize: 24, mb: 2, fontWeight: "bold" }}>
              Create User
            </Typography>
            <Box>
              <Box sx={{ pb: 2 }}>
                <input
                  accept="image/*"
                  id="image-input"
                  type="file"
                  onChange={handleImageChange} // Call handleImageChange on file selection
                  style={{ display: "none" }}
                />
                <Typography sx={{ color: "black", marginTop: 1 }}>
                  Add Image
                </Typography>
                {formik.errors.image && (
                  <Typography color="error">{formik.errors.image}</Typography>
                )}
                <label htmlFor="image-input">
                  <Box
                    sx={{
                      border: "1px solid #EAECF0",
                      textAlign: "center",
                      padding: 2,
                    }}
                  >
                    <Box sx={{ height: 60 }}>
                      <img
                        width={60}
                        src={InputImageIcon}
                        alt="icon of input image"
                      />
                    </Box>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Typography sx={{ color: "#8477DA" }}>
                        Click to Upload
                      </Typography>
                    </span>
                    <Typography variant="body2" sx={{ color: "#667085" }}>
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </Typography>
                  </Box>
                </label>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                  }}
                >
                  {selectedImage ? (
                    <img
                      width={"80px"}
                      height={"80px"}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                    />
                  ) : isEdit?.data?.image !== undefined || null ? (
                    <img
                      width={"80px"}
                      height={"80px"}
                      src={`${backendURL}/${isEdit?.data?.image}`}
                      alt="logo team"
                    />
                  ) : (
                    ""
                  )}
                  {isEdit?.type && (
                    <Button
                      variant="outlined"
                      onClick={handleRestPass}
                      sx={{
                        height: "34px",
                        width: "45%",
                        color: "#8477DA",
                        border: "1px solid #8477DA",
                        mb: 1,
                      }}
                    >
                      Reset Password
                    </Button>
                  )}
                </Box>
              </Box>
              <Box>
                <Typography>Name</Typography>
                <CustomInputField
                  placeholder="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <Typography>Email</Typography>
                <CustomInputField
                  placeholder="Name"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                onClick={close}
                variant="outlined"
                sx={{
                  border: "1px solid #D0D5DD",
                  width: "100%",
                  color: "#344054",
                  ":hover": {
                    border: "1px solid #D0D5DD",
                  },
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#8477DA",
                  width: "100%",
                  color: "white",
                  ":hover": {
                    bgcolor: "#8477DA",
                  },
                }}
                disabled={isLoading || creatingUser}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                ) : creatingUser ? (
                  <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                ) : isEdit.type ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
export default CustomUserCreateModal;
