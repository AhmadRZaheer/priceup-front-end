import * as React from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import {
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

import {
  useCreateFinish,
  useEditFinish,
} from "../../utilities/ApiHooks/finishes";
import { backendURL } from "../../utilities/common";
import { CloseOutlined } from "@mui/icons-material";
import DefaultImageIcon from "@/Assets/default-image.jpg";
import CustomInputField from "../ui-components/CustomInput";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "841px",
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: "24px 16px 24px 16px",
  border: " 1px solid #D0D5DD",
};

export default function AddEditFinish({
  open,
  close,
  isEdit,
  data,
  finishesRefetch,
}) {
  // const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    // setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutate: addFinish,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
    isError: ErrorForAdd,
  } = useCreateFinish();
  const {
    mutate: editFinish,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
    isError: ErrorForAddEidt,
  } = useEditFinish();

  const handleCreateClick = async (props) => {
    await addFinish(props);
  };

  const handleEditClick = async (props) => {
    const id = data._id;
    await editFinish(props, id);
  };

  const validationSchema = Yup.object().shape({
    hardwareLabel: Yup.string().required("Hardware Label is required"),
    // thickness: Yup.string().required("Thickness is required"),
  });
  const inputRef = React.useRef(null); // Create a ref for the file input
  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger click on the file input
  };
  console.log(data, "data");
  const formik = useFormik({
    initialValues: isEdit
      ? {
          hardwareLabel: data?.name,
          image: data?.image,
          // thickness: data?.holesNeeded,
          id: data?._id,
        }
      : {
          hardwareLabel: "",
          image: "",
          // thickness: "",
        },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      {
        isEdit ? handleEditClick(values) : handleCreateClick(values);
      }
    },
  });
  useEffect(() => {
    if (CreatedSuccessfully) {
      // setSelectedImage(null);
      formik.resetForm();
      finishesRefetch();
      close();
    }
    if (SuccessForEdit) {
      // setSelectedImage(null);
      formik.resetForm();
      finishesRefetch();
      close();
    }
  }, [CreatedSuccessfully, SuccessForEdit]);
  console.log(
    typeof formik.values.image === "string"
      ? `${backendURL}/${formik.values.image}`
      : URL.createObjectURL(formik.values.image),
    formik.values.image
  );
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => {
          formik.resetForm();
          close();
        }}
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
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: "sans-serif, Roboto !importants",
                }}
              >
                {isEdit ? "Edit Finish Type" : "Add Finish Type"}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#212528",
                  opacity: "70%",
                }}
              >
                {isEdit ? "Edit Finish detail" : "Add Finish detail"}
              </Typography>
            </Box>
            <IconButton
              onClick={() => {
                formik.resetForm();
                close();
              }}
            >
              <CloseOutlined sx={{ width: "24px", height: "24px" }} />
            </IconButton>
          </Box>
          <Box sx={{ borderRadius: "12px", background: "#F3F5F6", p: "16px" }}>
            <Typography
              sx={{
                color: "#000000",
                lineHeight: "16.39px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Hardware image
            </Typography>
            <Box sx={{ display: "flex", gap: "19px", my: 2 }}>
              <Box>
                {formik.values.image !== undefined &&
                formik.values.image !== null &&
                formik.values.image !== "" ? (
                  <img
                    width={"84px"}
                    height={"84px"}
                    style={{ overflow: "hidden", borderRadius: "100%" }}
                    src={
                      typeof formik.values.image === "string"
                        ? `${backendURL}/${formik.values.image}`
                        : URL.createObjectURL(formik.values.image)
                    }
                    alt="logo team"
                  />
                ) : (
                  <img
                    width={"84px"}
                    height={"84px"}
                    style={{ overflow: "hidden", borderRadius: "100%" }}
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

              <label htmlFor="image-input" style={{ alignSelf: "center" }}>
                <Box>
                  <Button
                    sx={{
                      color: "#000000",
                      fontWeight: 600,
                      borderRadius: "54px !important",
                      border: "1px solid #D4DBDF",
                      textTransform: "capitalize",
                      px: "10px 12px !important",
                      lineHeight: "21px",
                      fontSize: 16,
                    }}
                    onClick={handleButtonClick}
                  >
                    Upload Image
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#8477DA",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "16.39px",
                      mt: 0.5,
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Typography>
                </Box>
              </label>
              {/* {formik.errors.image && (
                <Typography color="error">{formik.errors.image}</Typography>
              )} */}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "16.39px",
                  mb: 0.5,
                }}
              >
                Finish Label
              </Typography>
              <CustomInputField
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
                size={"small"}
              />
            </Box>

            {/* <Box sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "16.39px",
                  mb: 0.5,
                }}
              >
                Holes Nedeed
              </Typography>
              <FormControl style={{ width: "100%" }} size="small">
                <CustomInputField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
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
                  helperText={
                    formik.touched.thickness && formik.errors.thickness
                  }
                />
              </FormControl>
            </Box> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                formik.resetForm();
                // close();
              }}
              sx={{
                color: "black",
                border: "1px solid #D6DAE3",
                width: "162px",
                ":hover": { border: "1px solid #D6DAE3" },
              }}
            >
              Discard Changes
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={formik.handleSubmit}
              disabled={LoadingForAdd || LoadingForEdit}
              sx={{
                backgroundColor: "#8477DA",
                // width: "50%",
                width: "141px",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
            >
              {LoadingForEdit || LoadingForAdd ? (
                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
              ) : isEdit ? (
                "Save changes"
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
