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
  useCreateGlassType,
  useEditGlassType,
} from "../../utilities/ApiHooks/GlassType";

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

export default function AddEditGlassType({
  open,
  close,
  isEdit,
  data,
  refetch,
  showSnackbar,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutate: addGlassType,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateGlassType();
  const {
    mutate: editGlassType,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditGlassType();

  React.useEffect(() => {
    if (CreatedSuccessfully) {
      refetch();
      showSnackbar("Created Successfully ", "success");
      close();
    }
  }, [CreatedSuccessfully]);

  React.useEffect(() => {
    if (SuccessForEdit) {
      refetch();
      showSnackbar("Updated Successfully ", "success");
      close();
    }
  }, [SuccessForEdit]);

  const handleCreateClick = (props) => {
    addGlassType(props);
  };

  const handleEditClick = (props) => {
    editGlassType({ glassTypeData: props, id: data?._id });
  };

  const validationSchema = Yup.object().shape({
    image: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: isEdit
      ? {
          name: data?.name,
          image: "",
          id: data?._id,
        }
      : {
          name: "",
          image: "",
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
                  </span>
                  <Typography variant="body2" sx={{ color: "#667085" }}>
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Typography>
                </Box>
              </label>
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
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button
              variant="outlined"
              onClick={close}
              sx={{ color: "black", border: "1px solid #D0D5DD", width: "50%" }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={formik.handleSubmit}
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
