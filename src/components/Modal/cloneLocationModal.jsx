import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputImageIcon from "../../Assets/imageUploader.svg";
import { useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  useCloneLocation,
  useCreateAdminsMembers,
  useEditUser,
} from "../../utilities/ApiHooks/superAdmin";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  p: 4,
};

export default function CloneLocationModel({ open, close, data, refetch }) {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(data, data?.user?._id, "data");
  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutate: addTeamAdminsMembers,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCloneLocation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email address format"
      ),
    image: Yup.mixed(),
    locationName: Yup.string().required("Location Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: data?.user?._id,
      company_id: data?.company?._id,
      name: "",
      image: "",
      email: "",
      locationName: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      addTeamAdminsMembers(values);
      setSelectedImage(null);
      resetForm();
    },
  });

  React.useEffect(() => {
    if (CreatedSuccessfully) {
      refetch();
      close();
    }
  }, [CreatedSuccessfully]);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Typography>Add Location</Typography>
          </Box>

          <Box>
            <input
              accept="image/*"
              id="image-input"
              type="file"
              {...getInputProps()}
              style={{ display: "none" }}
            />

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
            {selectedImage && (
              <img
                width={"80px"}
                height={"80px"}
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
              />
            )}
          </Box>
          <Box>
            <Typography>Admin Name</Typography>
            <TextField
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
            <Typography>Admin Email</Typography>
            <TextField
              placeholder="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.email)}
              helperText={formik.touched.name && formik.errors.email}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <Typography>Location Name</Typography>
            <TextField
              placeholder="location name"
              name="locationName"
              value={formik.values.locationName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.locationName}
              helperText={
                formik.touched.locationName && formik.errors.locationName
              }
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button
              variant="outlined"
              onClick={close}
              sx={{
                color: "#101828",
                border: "1px solid #D0D5DD",
                width: "50%",
                "&:hover": {
                  border: "1px solid #D0D5DD",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={formik.handleSubmit}
              disabled={LoadingForAdd}
              sx={{
                backgroundColor: "#8477DA",
                width: "50%",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
            >
              {LoadingForAdd ? (
                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
              ) : (
                "Copy"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}