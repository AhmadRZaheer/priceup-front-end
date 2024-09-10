import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputImageIcon from "../../Assets/imageUploader.svg";
import { useState } from "react";
import { CircularProgress, Grid, IconButton, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  useCloneLocation,
  useCreateAdminsMembers,
  useEditUser,
} from "../../utilities/ApiHooks/superAdmin";
import DefaultImageIcon from "../../Assets/DefaultIMG.png";
import { backendURL } from "@/utilities/common";
import { CloseTwoTone } from "@mui/icons-material";


const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: '19px',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 809,
  bgcolor: "#FFFFFF",
  borderRadius: "12px",
  p: '24px 16px 24px 16px',
};

export default function CloneLocationModel({ open, close, data, refetch }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = React.useRef(null); // Create a ref for the file input

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
      .required("Email is required"),
    image: Yup.mixed(),
    locationName: Yup.string().required("Location Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: data?.user?._id,
      company_id: data?._id,
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

  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger click on the file input
  };

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
          // backdropFilter: "blur(2px)",
          backgroundColor: "rgba(5, 0, 35, 0.1)",
          '.MuiModal-backdrop': {
            backgroundColor: "rgba(5, 0, 35, 0.1)",
          }
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // alignItems: "baseline",
            }}
          >
            <Typography sx={{
              fontWeight: 700,
              fontSize: 18,
              lineHeight: '21.09px',
              fontFamily: '"Roboto",sans-serif !important'
            }}>Clone Location</Typography>

            <Box>
              <IconButton
                sx={{ p: 0 }}
                onClick={close}
              >
                <CloseTwoTone />
              </IconButton>
            </Box>
          </Box>

          {/* <Box>
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
          </Box> */}

          <Box
            sx={{
              background: "#F3F5F6",
              padding: "16px",
              borderRadius: "12px",
            }}
          >

            <Box sx={{ display: "flex", gap: '19px', my: 2 }}>
              <Box>
                {formik.values.image !== undefined && formik.values.image !== null && formik.values.image !== '' ? (
                  <img
                    width={"84px"}
                    height={"84px"}
                    style={{ overflow: "hidden", borderRadius: "100%" }}
                    src={typeof formik.values.image === 'string' ? `${backendURL}/${formik.values.image}` : URL.createObjectURL(formik.values.image)}
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

              <label htmlFor="image-input" style={{ alignSelf: 'center' }}>
                <Box
                  sx={{
                    // padding: 2,
                  }}
                >
                  <Button
                    sx={{
                      color: "#000000",
                      fontWeight: 600,
                      borderRadius: "54px !important",
                      border: "1px solid #D4DBDF",
                      textTransform: "capitalize",
                      p: '10px 12px !important',
                      lineHeight: '21px',
                      fontSize: 16
                    }}
                    onClick={handleButtonClick}
                  >
                    Upload Location Image
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#8477DA",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: '16.39px', mt: 0.5
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

            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ width: "100%", }} className='model-field'>
                <Typography className="input-label-text">Location Name</Typography>
                <TextField
                  size="small"
                  placeholder="Enter Location Name"
                  name="locationName"
                  className="custom-textfield"
                  value={formik.values.locationName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // error={formik.touched.locationName}
                  // helperText={
                  //   formik.touched.locationName && formik.errors.locationName
                  // }
                  variant="outlined"
                  fullWidth
                />
                {formik.touched.locationName && formik.errors.locationName && (
                  <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                    {formik.errors.locationName}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sx={{ width: "100%", }} className='model-field'>
                <Typography className="input-label-text">Location owner email</Typography>
                <TextField
                  size="small"
                  placeholder="Enter Location Owner Email"
                  className="custom-textfield"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // error={formik.touched.name && Boolean(formik.errors.email)}
                  // helperText={formik.touched.name && formik.errors.email}
                  variant="outlined"
                  fullWidth
                />
                 {formik.touched.email && formik.errors.email && (
                  <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                    {formik.errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sx={{ width: "100%", }} className='model-field'>
                <Typography className="input-label-text">Location Owner Name</Typography>
                <TextField
                  size="small"
                  placeholder="Location Owner Name"
                  className="custom-textfield"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // error={formik.touched.name && Boolean(formik.errors.name)}
                  // helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                  fullWidth
                />
                {formik.touched.name && formik.errors.name && (
                  <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                    {formik.errors.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", gap: '12px' }}>
              <Button
                variant="outlined"
                onClick={close}
                sx={{
                  color: "#212528",
                  border: "1px solid #D6DAE3",
                  width: "fit-content",
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                disabled={LoadingForAdd}
                sx={{
                  backgroundColor: "#8477DA",
                  "&:hover": {
                    backgroundColor: "#8477da",
                  },
                  position: "relative",
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                {LoadingForAdd ? (
                  <CircularProgress size={24} sx={{ color: "#8477DA",px:2.5 }} />
                ) : (
                  "Clone Location"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
