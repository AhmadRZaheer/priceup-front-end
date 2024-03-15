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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  useCreateHardware,
  useEditHardware,
} from "../../utilities/ApiHooks/hardware";
import { useEffect } from "react";
import { backendURL } from "../../utilities/common";
import CustomInputField from "../ui-components/CustomInput";
import { ExpandMore } from "@mui/icons-material";
import { SingleFieldEdit } from "../ui-components/SingleFieldEdit";

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

export default function AddEditHardware({
  open,
  close,
  isEdit,
  data,
  refetch,
  categorySlug,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutate: addHardware,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateHardware();
  const {
    mutate: editHardware,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditHardware();

  useEffect(() => {
    if (CreatedSuccessfully) {
      refetch();
      close();
    }

    if (SuccessForEdit) {
      refetch();
      close();
      console.log(SuccessForEdit, "effect s");
    }
    console.log("effect");
  }, [CreatedSuccessfully, SuccessForEdit]);

  const handleCreateClick = (props) => {
    addHardware(props);
  };

  const handleEditClick = (props) => {
    const id = data;
    editHardware(props, id);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Hardware Label is required"),
    image: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: isEdit
      ? {
          name: data?.name,
          oneInchHoles: data?.oneInchHoles,
          hingeCut: data?.hingeCut,
          clampCut: data?.clampCut,
          notch: data?.notch,
          outages: data?.outages,
          image: "",
        }
      : {
          name: "",
          image: "",
          oneInchHoles: "",
          hingeCut: "",
          clampCut: "",
          notch: "",
          outages: "",
          hardware_category_slug: categorySlug,
        },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      {
        isEdit
          ? handleEditClick({ hardwareData: values, id: data._id })
          : handleCreateClick(values);
        resetFormHandle();
      }
    },
  });
  const typeOfValue = () => {
    let statement = "";
    if (
      formik.values.clampCut === 0 &&
      formik.values.hingeCut === 0 &&
      formik.values.notch === 0 &&
      formik.values.oneInchHoles === 0 &&
      formik.values.outages === 0
    ) {
      statement = "using default values";
    } else {
      statement = "using customized values";
    }
    return statement;
  };

  const resetFormHandle = async () => {
    if (CreatedSuccessfully || SuccessForEdit) {
      await formik.resetForm();
      setSelectedImage(null);
    }
  };

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
            <Typography>{isEdit ? "Edit Hardware" : "Add Hardware"}</Typography>
          </Box>

          <Box>
            <input
              accept="image/*"
              id="image-input"
              type="file"
              {...getInputProps()}
              style={{ display: "none" }}
            />
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
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 16,
              }}
            >
              {selectedImage ? (
                <img
                  width={"80px"}
                  height={"80px"}
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                />
              ) : data?.image ? (
                <img
                  width={"80px"}
                  height={"80px"}
                  src={`${backendURL}/${data?.image}`}
                  alt="logo team"
                />
              ) : (
                ""
              )}
            </aside>
            {formik.errors.image && (
              <Typography color="error">{formik.errors.image}</Typography>
            )}
          </Box>
          <Box>
            <Typography>Hardware Label</Typography>
            <CustomInputField
              size="small"
              placeholder="Hardware Label"
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
          <Accordion
            sx={{
              paddingX: "6px",
              border: "none",
              ".MuiPaper-elevation": {
                border: " none !important",
                boxShadow: "none !important",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                padding: 0,
                margin: 0,
                borderBottom: "none",
                height: "30px",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                Fabrication
                <span
                  style={{
                    fontSize: 15,
                    paddingLeft: 6,
                    fontWeight: "lighter",
                  }}
                >
                  ( {typeOfValue()} )
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: 0,
                borderTop: "2px solid #D0D5DD",
                paddingY: 1,
              }}
            >
              <Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexDirection: "column",
                      width: "45%",
                    }}
                  >
                    <SingleFieldEdit
                      label='1" Holes'
                      value={formik.values.oneInchHoles}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.oneInchHoles &&
                        Boolean(formik.errors.oneInchHoles)
                      }
                      helperText={
                        formik.touched.oneInchHoles &&
                        formik.errors.oneInchHoles
                      }
                      placeholder='1" Holes'
                      name="oneInchHoles"
                    />
                    <SingleFieldEdit
                      label="Clamp Cut Out"
                      value={formik.values.clampCut}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.clampCut &&
                        Boolean(formik.errors.clampCut)
                      }
                      helperText={
                        formik.touched.clampCut && formik.errors.clampCut
                      }
                      placeholder="Clamp Cut Out"
                      name="clampCut"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexDirection: "column",
                      width: "45%",
                    }}
                  >
                    <SingleFieldEdit
                      label="Hinge Cut Out"
                      value={formik.values.hingeCut}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.hingeCut &&
                        Boolean(formik.errors.hingeCut)
                      }
                      helperText={
                        formik.touched.hingeCut && formik.errors.hingeCut
                      }
                      placeholder="Hinge Cut Out"
                      name="hingeCut"
                    />
                    <SingleFieldEdit
                      label="Notch"
                      value={formik.values.notch}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.notch && Boolean(formik.errors.notch)
                      }
                      helperText={formik.touched.notch && formik.errors.notch}
                      placeholder="Notch"
                      name="notch"
                    />
                  </Box>
                </Box>
                <Box sx={{ width: "45%", mt: 1 }}>
                  <SingleFieldEdit
                    label="Outages"
                    value={formik.values.outages}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.outages && Boolean(formik.errors.outages)
                    }
                    helperText={formik.touched.outages && formik.errors.outages}
                    placeholder="Outages"
                    name="outages"
                  />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

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
