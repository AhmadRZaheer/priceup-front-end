import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useState } from "react";
import { FormControl, IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import axios from "axios";
import { backendURL, createSlug } from "../../utilities/common";
import { parseJwt } from "../ProtectedRoute/AuthVerify";

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

export default function BasicModal({ open, close, isEdit, data }) {
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const { getInputProps } = useDropzone({ onDrop });

  const handleCreate = (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.hardwareLabel);
    const docodedToken = parseJwt(token);
    console.log(docodedToken, "parseJwtparseJwt");

    axios
      .post(
        `${backendURL}/finishes/save`,
        {
          name: props.hardwareLabel,
          company_id: docodedToken?.company_id,
          thickness: "both",
          slug: slug,
          holesNeeded: props.thickness,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response, "put resp");
      })
      .catch((error) => {
        console.error("Update failed", error);
      });

    setSelectedImage(null);
  };
  const handleEdit = (updatedHardware) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${backendURL}/finishes/${data?._id}`,
        {
          name: updatedHardware?.hardwareLabel,
          holesNeeded: updatedHardware?.thickness,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response, "put resp");
      })
      .catch((error) => {
        console.error("Update failed", error);
      });
    setSelectedImage(null);
  };

  const validationSchema = Yup.object().shape({
    hardwareLabel: Yup.string().required("Hardware Label is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileType",
        "Only image files are allowed (JPEG, PNG, GIF)",
        (value) => {
          if (value) {
            const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
            return supportedFormats.includes(value.type);
          }
          return false;
        }
      )
      .test(
        "fileSize",
        "Image size should be less than 5MB",
        (value) => value && value.size <= 5 * 1024 * 1024
      ),
    thickness: Yup.string().required("Thickness is required"),
  });

  const formik = useFormik({
    initialValues: isEdit
      ? {
          hardwareLabel: data?.name,
          image: "",
          thickness: data?.holesNeeded,
          id: data?.id,
        }
      : {
          hardwareLabel: "",
          image: "",
          thickness: "",
        },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      {
        isEdit ? handleEdit(values) : handleCreate(values);

        resetForm();
      }

      close();
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Typography>{isEdit ? "Edit Finishes" : "Add Finishes"}</Typography>
            <IconButton onClick={close}>
              <Close />
            </IconButton>
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
            {selectedImage ? (
              <img
                width={"80px"}
                height={"80px"}
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
              />
            ) : (
              <label htmlFor="image-input">
                <Button
                  style={{
                    height: "100px",
                    width: "100px",
                    boxShadow: "0px 0px 2px blue",
                  }}
                  component="span"
                >
                  Upload Image
                </Button>
              </label>
            )}
          </Box>
          <Box>
            <Typography>Hardware Label</Typography>
            <TextField
              placeholder="Hardware Label"
              name="hardwareLabel"
              value={formik.values.hardwareLabel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.hardwareLabel &&
                Boolean(formik.errors.hardwareLabel)
              }
              helperText={
                formik.touched.hardwareLabel && formik.errors.hardwareLabel
              }
              variant="outlined"
              fullWidth
            />
          </Box>

          <Box>
            <Typography>Holes Nedeed</Typography>
            <FormControl style={{ width: "100%" }} size="small">
              <TextField
                type="number"
                size="small"
                variant="outlined"
                name="thickness"
                style={{ width: "100%" }}
                value={formik.values.thickness}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.thickness && Boolean(formik.errors.thickness)
                }
                helperText={formik.touched.thickness && formik.errors.thickness}
              />
            </FormControl>
          </Box>
          <Box onClick={formik.handleSubmit}>
            <Button fullWidth variant="contained">
              {isEdit ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
