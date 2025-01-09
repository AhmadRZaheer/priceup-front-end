import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import {
  useCreateGlassAddon,
  useEditGlassAddon,
} from "../../utilities/ApiHooks/glassAddon";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { backendURL } from "../../utilities/common";
import DefaultImageIcon from "../../Assets/DefaultIMG.png";
import { CloseTwoTone } from "@mui/icons-material";
import CustomInputField from "../ui-components/CustomInput";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "19px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 809,
  bgcolor: "#FFFFFF",
  borderRadius: "12px",
  p: "24px 16px 24px 16px",
  border: "1px solid #D0D5DD",
};

export default function AddEditGlassAddon({
  open,
  close,
  isEdit,
  data,
  refetch,
}) {
  const inputRef = React.useRef(null); // Create a ref for the file input

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("image", acceptedFiles[0]);
  };
  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutateAsync: addGlassAddon,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateGlassAddon();
  const {
    mutateAsync: editGlassAddon,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditGlassAddon();

  const handleCreateClick = async (props) => {
    await addGlassAddon(props);
  };

  const handleEditClick = async (props) => {
    await editGlassAddon({ glassAddonData: props, id: data?._id });
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("glassAddons Label is required"),
    image: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: isEdit
      ? {
          name: data?.name,
          image: data?.image,
          description: data?.description ?? "",
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
      }
    },
  });

  useEffect(() => {
    if (CreatedSuccessfully) {
      refetch();
      close();
      formik.resetForm();
    }
  }, [CreatedSuccessfully]);

  useEffect(() => {
    if (SuccessForEdit) {
      refetch();
      close();
      formik.resetForm();
    }
  }, [SuccessForEdit]);

  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger click on the file input
  };
  return (
    <div>
      <Modal
        open={open}
        sx={{
          // backdropFilter: "blur(2px)",
          backgroundColor: "rgba(5, 0, 35, 0.1)",
          ".MuiModal-backdrop": {
            backgroundColor: "rgba(5, 0, 35, 0.1)",
          },
        }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: "21.09px",
                  fontFamily: '"Roboto",sans-serif !important',
                }}
              >
                {isEdit ? "Edit Addons" : "Add Addons"}
              </Typography>
              <Typography
                sx={{
                  color: "#212528",
                  lineHeight: "21.86px",
                  fontWeight: 600,
                  // mt:'5px',
                  fontSize: 16,
                  opacity: "70%",
                }}
              >
                {isEdit ? "Edit" : "Add"} Addons details.
              </Typography>
            </Box>
            <Box>
              <IconButton
                sx={{ p: 0 }}
                onClick={() => {
                  close();
                }}
              >
                <CloseTwoTone />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              background: "#F3F5F6",
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                lineHeight: "16.39px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Addon image
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
                <Box
                  sx={
                    {
                      // padding: 2,
                    }
                  }
                >
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
            <Box className="model-field">
              <Typography className="input-label-text">Addons Label</Typography>
              <CustomInputField
                placeholder="Enter Addons Label"
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
            <Box sx={{ width: "100%", pt: 1 }} className="model-field">
              <Typography className="input-label-text">Description</Typography>
              <TextField
                size="small"
                placeholder={`Enter Description`}
                name="name"
                className="custom-textfield"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ ".MuiOutlinedInput-input": { p: "10px !important" } }}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
              />
              {formik.touched.description && formik.errors.description && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ paddingLeft: "5px" }}
                >
                  {formik.errors.description}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                if (isEdit) {
                  formik.resetForm();
                } else {
                  close();
                }
              }}
              sx={{
                color: "#212528",
                border: "1px solid #D6DAE3",
                width: "fit-content",
                fontWeight: 600,
                fontSize: "16px",
                ":hover": {
                  border: "1px solid #8477da",
                },
              }}
            >
              {isEdit ? "Discard Changes" : "Cancel"}
            </Button>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              disabled={LoadingForAdd || LoadingForEdit}
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
                padding:
                  LoadingForAdd || LoadingForEdit
                    ? "0px !important"
                    : "10px 16px !important",
                position: "relative",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              {LoadingForAdd || LoadingForEdit ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : isEdit ? (
                "Save Changes"
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
