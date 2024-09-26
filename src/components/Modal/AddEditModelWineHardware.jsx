import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DefaultImageIcon from "../../Assets/DefaultIMG.png";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import {
  backendURL,
  createSlug,
  getDecryptedToken,
} from "../../utilities/common";
import CustomInputField from "../ui-components/CustomInput";
import { CloseTwoTone, ExpandMore } from "@mui/icons-material";
import { SingleFieldEdit } from "../ui-components/SingleFieldEdit";
import {
  useCreateDocument,
  useEditDocument,
} from "@/utilities/ApiHooks/common";

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

export default function AddEditWineHardwareModel({
  open,
  close,
  isEdit,
  data,
  refetch,
  categorySlug,
}) {
  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("image", acceptedFiles[0]);
  };
  const decodedToken = getDecryptedToken();
  const routePrefix = `${backendURL}/wineCellars/hardwares`;
  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutate: addWineHardware,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateDocument();
  const {
    mutate: editWineHardware,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditDocument();

  useEffect(() => {
    if (CreatedSuccessfully) {
      resetFormHandle();
      refetch();
      close();
    }

    if (SuccessForEdit) {
      refetch();
      close();
    }
  }, [CreatedSuccessfully, SuccessForEdit]);

  const handleCreateClick = (props) => {
    const slug = createSlug(props.name);
    const formData = new FormData();
    if (props.image) {
      formData.append("image", props.image);
    }
    formData.append("name", props.name);
    formData.append("slug", slug);
    formData.append("hardware_category_slug", props.hardware_category_slug);
    formData.append("fabrication.hingeCut", props.hingeCut);
    formData.append("fabrication.oneInchHoles", props.oneInchHoles);
    formData.append("company_id", decodedToken?.company_id);
    addWineHardware({ data: formData, apiRoute: `${routePrefix}/save` });
  };

  const handleEditClick = (props) => {
    const formData = new FormData();
    formData.append("name", props.hardwareData.name);
    formData.append("fabrication.hingeCut", props.hardwareData.hingeCut);
    formData.append(
      "fabrication.oneInchHoles",
      props.hardwareData.oneInchHoles
    );
    if (props.hardwareData.image) {
      formData.append("image", props.hardwareData.image);
    }
    editWineHardware({
      data: formData,
      apiRoute: `${routePrefix}/${props.id}`,
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Hardware Label is required"),
    image: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: isEdit
      ? {
          name: data?.name,
          oneInchHoles: data?.fabrication?.oneInchHoles,
          hingeCut: data?.fabrication?.hingeCut,
          image: data?.image,
        }
      : {
          name: "",
          image: "",
          oneInchHoles: 0,
          hingeCut: 0,
          hardware_category_slug: categorySlug,
        },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      {
        isEdit
          ? handleEditClick({ hardwareData: values, id: data._id })
          : handleCreateClick(values);
      }
    },
  });
  const typeOfValue = () => {
    let statement = "";
    if (formik.values.hingeCut === 0 && formik.values.oneInchHoles === 0) {
      statement = "Using Default Values";
    } else {
      statement = "Using Customized Values";
    }
    return statement;
  };

  const resetFormHandle = async () => {
    if (CreatedSuccessfully || SuccessForEdit) {
      await formik.resetForm();
    }
  };
  const resetData = () => {
    formik.resetForm();
  };
  //Image
  const inputRef = React.useRef(null);
  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger click on the file input
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
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
                {isEdit ? "Edit Hardware" : "Add Hardware"}
              </Typography>
              <Typography
                sx={{
                  color: "#212528",
                  lineHeight: "21.86px",
                  fontWeight: 600,
                  fontSize: 16,
                  opacity: "70%",
                }}
              >
                {isEdit ? "Edit" : "Add"} Hardware details.
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
                      p: "10px 12px !important",
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
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Box sx={{ width: "100%" }} className="model-field">
                <Typography className="input-label-text">
                  Hardware Label
                </Typography>
                <CustomInputField
                  size="small"
                  placeholder="Enter Hardware Label"
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
              <Box sx={{ width: "100%" }} className="model-field">
                <Typography className="input-label-text">
                  Fabrication{" "}
                </Typography>
                <Accordion
                  sx={{
                    background: "#FFFFFF",
                    boxShadow: "none",
                    border: "1px solid #D4DBDF",
                    borderRadius: "4px",
                    "&.Mui-expanded": {
                      borderRadius: "4px 4px 12px 12px",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore
                        sx={{ color: "#000000", width: "20px", height: "20px" }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      p: "10px",
                      m: "0px !important",
                      minHeight: "40px",
                      "&.Mui-expanded": {
                        minHeight: "40px",
                        height: "40px",
                        borderBottom: "1px solid #D0D5DD",
                      },
                      ".MuiAccordionSummary-content": {
                        margin: "0px !important",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        lineHeight: "19.12px",
                        color: "#959EA3",
                      }}
                    >
                      {" "}
                      ( {typeOfValue()} )
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      p: "24px 30px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <SingleFieldEdit
                        label='1" Holes'
                        value={formik.values.oneInchHoles}
                        onChange={(event) => {
                          const userInput = event.target.value;
                          if (/^\d*$/.test(userInput)) {
                            formik.handleChange(event);
                          }
                        }}
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
                        label="Hinge Cut Out"
                        value={formik.values.hingeCut}
                        onChange={(event) => {
                          const userInput = event.target.value;
                          if (/^\d*$/.test(userInput)) {
                            formik.handleChange(event);
                          }
                        }}
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
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", gap: "12px" }}>
              <Button
                variant="outlined"
                onClick={isEdit ? resetData : close}
                sx={{
                  color: "#212528",
                  border: "1px solid #D6DAE3",
                  width: "fit-content",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                {isEdit ? "Discard Changes" : "Cancel"}
              </Button>
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                disabled={LoadingForAdd || LoadingForEdit}
                sx={{
                  backgroundColor: "#8477DA",
                  "&:hover": {
                    backgroundColor: "#8477da",
                  },
                  padding: "10px 16px !important",
                  position: "relative",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                {LoadingForAdd || LoadingForEdit ? (
                  <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                ) : isEdit ? (
                  "Save Changes"
                ) : (
                  "Create"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}