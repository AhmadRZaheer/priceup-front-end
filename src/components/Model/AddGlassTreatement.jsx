import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputImageIcon from "../../Assets/imageUploader.svg";
import { useState } from "react";
import {
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import {
  useCreateGlassTreatement,
  useEditGlassTreatement,
} from "../../utilities/ApiHooks/GlassTreatement";

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

export default function AddEditGlassTreatement({
  open,
  close,
  isEdit,
  data,
  finishesRefetch,
  showSnackbar,
}) {
  // console.log(data, "data not id");
  // const [openSnackBarAlert, setOpenSnakbarAlert] = React.useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const { getInputProps } = useDropzone({ onDrop });
  // hook for ad
  const {
    mutate: addGlassTreatement,
    isLoading: LoadingForAdd,
    // isError: ErrorForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateGlassTreatement();
  // hook for edit
  const {
    mutate: editGlassTreatement,
    isLoading: LoadingForEdit,
    // isError: ErrorForEdit,
    isSuccess: SuccessForEdit,
  } = useEditGlassTreatement();

  // React.useEffect(() => {
  //   if (CreatedSuccessfully || SuccessForEdit) {
  //     finishesRefetch();
  //     if (CreatedSuccessfully) {
  //       showSnackbar("Created Successfully ", "success");
  //     }
  //     showSnackbar("UpDated Successfully ", "success");
  //   }
  // }, [CreatedSuccessfully, SuccessForEdit]);

  React.useEffect(() => {
    if (CreatedSuccessfully) {
      finishesRefetch();
      showSnackbar("Created Successfully ", "success");
      close();
    }

    if (SuccessForEdit) {
      finishesRefetch();
      showSnackbar("Updated Successfully ", "success");
      close();
    }
  }, [CreatedSuccessfully, SuccessForEdit]);

  const handleCreateClick = (props) => {
    console.log(props, "props for creat hook in model");
    addGlassTreatement(props);
  };

  const handleEditClick = (props) => {
    console.log(props, "props for edit to refetch");
    const id = data;
    // console.log(id, "id2 for edit hook");
    editGlassTreatement(props, id);
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
        setSelectedImage(null);
        resetForm();
      }
    },
  });

  return (
    <div>
      <Modal
        open={open}
        // onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(2px)", // Apply blur effect to the backdrop
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
            <Typography>{isEdit ? "Edit Finishes" : "Add Finishes"}</Typography>
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
                    {/* <Typography sx={{ color: "#667085" }}>
                      or drag and drop
                    </Typography> */}
                  </span>
                  {/* <Typography sx={{color: "#8477DA"}}>Click to Upload</Typography> */}
                  <Typography variant="body2" sx={{ color: "#667085" }}>
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Typography>
                </Box>
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
          <Box
            onClick={formik.handleSubmit}
            sx={{ display: "flex", gap: 2, marginTop: 2 }}
          >
            <Button
              variant="outlined"
              onClick={close}
              sx={{ color: "black", border: "1px solid #D0D5DD", width: "50%" }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              disabled={LoadingForAdd || LoadingForEdit}
              sx={{ backgroundColor: "#8477DA", width: "50%" }}
            >
              {LoadingForAdd || LoadingForEdit ? (
                <CircularProgress size={24} />
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
