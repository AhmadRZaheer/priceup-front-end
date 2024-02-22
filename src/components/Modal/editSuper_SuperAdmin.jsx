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
  useCreateTeamMembers,
  useEditTeamMembers,
} from "../../utilities/ApiHooks/team";
import { backendURL } from "../../utilities/common";
import DefaultImage from "../ui-components/defaultImage";
import {
  useCreateSuper_SuperAdmins,
  useUpdateSuper_SuperAdmins,
} from "../../utilities/ApiHooks/super_superAdmins";

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
  borderRadius: "12px",
  p: 4,
};

export default function Create_Edit_SuperSuperAdmin({
  open,
  close,
  isEdit,
  data,
  refetch,
}) {
  const [selectedImage, setSelectedImage] = useState(
    isEdit ? data?.image : null
  );

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutate: CreateSuper_SuperAdmins,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateSuper_SuperAdmins();
  const {
    mutate: editSuper_SuperAdmin,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useUpdateSuper_SuperAdmins();

  React.useEffect(() => {
    if (CreatedSuccessfully || SuccessForEdit) {
      refetch();
      close();
    }
  }, [CreatedSuccessfully, SuccessForEdit]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address"),
    image: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: isEdit
      ? {
          name: data?.name,
          email: data?.email,
          image: data?.image,
        }
      : {
          name: "",
          image: "",
          email: "",
        },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      {
        isEdit
          ? editSuper_SuperAdmin({ data: values, id: data._id })
          : CreateSuper_SuperAdmins(values);
        setSelectedImage(null);

        resetForm();
      }
    },
  });

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
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
              {isEdit ? "Edit User" : "Add New User"}
            </Typography>
            <Typography sx={{ color: "#667085", marginTop: 1 }}>
              Your new project has been created. Invite colleagues to
              collaborate on this project.
            </Typography>
          </Box>

          <Box>
            <input
              accept="image/*"
              id="image-input"
              type="file"
              {...getInputProps()}
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
            {selectedImage ? (
              <img
                width={"80px"}
                height={"80px"}
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
              />
            ) : data?.image !== undefined || null ? (
              <img
                width={"80px"}
                height={"80px"}
                src={`${backendURL}/${data?.image}`}
                alt="logo team"
              />
            ) : (
              ""
            )}
          </Box>
          <Box>
            <Typography>Name</Typography>
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
            <Typography>Email</Typography>
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
              disabled={isEdit ? true : false}
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
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={formik.handleSubmit}
              disabled={LoadingForAdd || LoadingForEdit}
              sx={{
                backgroundColor: "#8477DA",
                width: "50%",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
            >
              {LoadingForAdd || LoadingForEdit ? (
                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
              ) : isEdit ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}