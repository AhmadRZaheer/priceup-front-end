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

import { useCreateFinish, useEditFinish } from "../../utilities/Hooks";

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

export default function BasicModal({
  open,
  close,
  isEdit,
  data,
  finishesRefetch,
}) {
  console.log(data, "data not id");

  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const { getInputProps } = useDropzone({ onDrop });
  // hook for add
  const {
    mutate: addFinish,
    isLoading: LoadingForAdd,
    isError: ErrorForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateFinish();
  // hook for edit
  const {
    mutate: editFinish,
    isLoading: LoadingForEdit,
    isError: ErrorForEdit,
    isSuccess: SuccessForEdit,
  } = useEditFinish();

  React.useEffect(() => {
    if (CreatedSuccessfully || SuccessForEdit) {
      finishesRefetch();
    }
  }, [CreatedSuccessfully, SuccessForEdit]);

  const handleCreateClick = (props) => {
    console.log(props, "props for creat hook in model");
    addFinish(props);
  };

  const handleEditClick = (props) => {
    console.log(props, "props for edit to refetch");
    const id = data;
    console.log(id, "id2 for edit hook");
    editFinish(props, id);
  };

  const validationSchema = Yup.object().shape({
    hardwareLabel: Yup.string().required("Hardware Label is required"),
    image: Yup.mixed(),
    // .required("Image is required")
    // .test(
    //   "fileType",
    //   "Only image files are allowed (JPEG, PNG, GIF)",
    //   (value) => {
    //     if (value) {
    //       const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
    //       return supportedFormats.includes(value.type);
    //     }
    //     return false;
    //   }
    // )
    // .test(
    //   "fileSize",
    //   "Image size should be less than 5MB",
    //   (value) => value && value.size <= 5 * 1024 * 1024
    // ),
    thickness: Yup.string().required("Thickness is required"),
  });

  const formik = useFormik({
    initialValues: isEdit
      ? {
          hardwareLabel: data?.name,
          image: "",
          thickness: data?.holesNeeded,
          id: data?._id,
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
        isEdit ? handleEditClick(values) : handleCreateClick(values);

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
