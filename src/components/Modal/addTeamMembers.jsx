import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputImageIcon from "../../Assets/imageUploader.svg";
import DefaultImageIcon from "../../Assets/default-image.jpg";
import { useState } from "react";
import {
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  useAddLocation,
  useCreateTeamMembers,
  useEditTeamMembers,
  useResetPasswordTeamMembers,
} from "../../utilities/ApiHooks/team";
import { backendURL, getDecryptedToken } from "../../utilities/common";
import DefaultImage from "../ui-components/defaultImage";
import { CloseTwoTone } from "@mui/icons-material";
import { useFetchAdminLocation } from "@/utilities/ApiHooks/superAdmin";
import { userRoles } from "@/utilities/constants";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 2,
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, // Adjust this value as needed
    },
  },
};

export default function AddTeamMembers({
  open,
  close,
  isEdit,
  SelectedData,
  refetch,
}) {
  const [selectedImage, setSelectedImage] = useState(
    isEdit ? SelectedData?.image : null
  );
  const token = getDecryptedToken();
  console.log(SelectedData, "data datadata data data");

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };
  const inputRef = React.useRef(null); // Create a ref for the file input
  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutate: addTeamMembers,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateTeamMembers();
  const {
    mutate: editTeamMembers,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditTeamMembers();
  const { mutate: ResetPassword } = useResetPasswordTeamMembers();
  const { data: locationData, refetch: refetchAdmins } =
    useFetchAdminLocation();
  const {
    mutate: editTeamMembersList,
    isLoading: LoadingForEditList,
    isSuccess: SuccessForEditList,
  } = useAddLocation();
  const [haveAccessArray, setHaveAccessArray] = useState([]);
  const [giveAccessArray, setGiveAccessArray] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  console.log(
    haveAccessArray,
    giveAccessArray,
    "giveAccessArray haveAccessArray"
  );
  const handleEditLocationAccessClick = () => {
    const idsToAdd = haveAccessArray?.map((item) => {
      return item.id;
    });
    const id = SelectedData?._id;
    editTeamMembersList({ data: idsToAdd, locId: id });
    // onClose();
  };
  React.useEffect(() => {
    if (SelectedData) {
      const filteredlocationData = locationData.filter((data) =>
        SelectedData?.haveAccessTo.includes(data.id)
      );
      const excludedLocationData = locationData.filter(
        (data) => !SelectedData?.haveAccessTo.includes(data.id)
      );
      setHaveAccessArray(filteredlocationData);
      setGiveAccessArray(excludedLocationData);
    }
  }, [locationData, SelectedData]);
  React.useEffect(() => {
    if (SuccessForEdit) {
      refetch();
    }
  }, [SuccessForEdit]);
  React.useEffect(() => {
    refetchAdmins();
  }, []);
  React.useEffect(() => {
    if (CreatedSuccessfully) {
      refetch();
      close();
    }
  }, [CreatedSuccessfully]);

  React.useEffect(() => {
    if (SuccessForEdit) {
      refetch();
      close();
    }
  }, [SuccessForEdit]);

  const handleCreateClick = (props) => {
    addTeamMembers(props);
  };

  const handleEditClick = (props) => {
    const id = SelectedData;
    editTeamMembers(props, id);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address"),

    image: Yup.mixed(),
  });
  const formik = useFormik({
    initialValues: {
      name: isEdit ? SelectedData?.name : "",
      email: isEdit ? SelectedData?.email : "",
      image: isEdit ? SelectedData?.image : "",
    },

    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      {
        isEdit
          ? handleEditClick({ teamData: values, id: SelectedData._id })
          : handleCreateClick(values);
        setSelectedImage(null);
        {
          token &&
            token.role === userRoles.SUPER_ADMIN &&
            handleEditLocationAccessClick();
        }

        resetForm();
      }
    },
  });
  const handleRestPass = () => {
    ResetPassword({ id: SelectedData._id });
  };
  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger click on the file input
  };
  React.useEffect(() => {
    if (!isEdit) {
      setSelectedImage(null);
    }
  }, [isEdit]);
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                {isEdit ? "Edit User" : "Add New User"}
              </Typography>
              <Typography
                sx={{
                  color: "#646669",
                  marginTop: 0.5,
                  fontWeight: 600,
                }}
              >
                Edit your user details.
              </Typography>
            </Box>
            <Box>
              <IconButton
                onClick={() => {
                  close();
                  setSelectedImage(null);
                }}
              >
                <CloseTwoTone />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              background: "#f3f5f6",
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <Typography
              sx={{
                color: "black",
                marginTop: 1,
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Profile image
            </Typography>
            <Box sx={{ display: "flex", gap: 2, p: 1, my: 2 }}>
              <Box>
                {selectedImage ? (
                  <img
                    width={"84px"}
                    height={"84px"}
                    style={{ overflow: "hidden", borderRadius: "100%" }}
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                  />
                ) : SelectedData?.image !== undefined || null ? (
                  <img
                    width={"84px"}
                    height={"84px"}
                    style={{ overflow: "hidden", borderRadius: "100%" }}
                    src={`${backendURL}/${SelectedData?.image}`}
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

              <label htmlFor="image-input">
                <Box
                  sx={{
                    padding: 2,
                  }}
                >
                  <Button
                    sx={{
                      color: "black",
                      fontWeight: 500,
                      borderRadius: "54px",
                      border: "1px solid rgba(212, 219, 223, 1)",
                      textTransform: "capitalize",
                      px: 2,
                    }}
                    onClick={handleButtonClick}
                  >
                    Upload Profile Image
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(132, 119, 218, 1)", fontSize: "12px" }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Typography>
                </Box>
              </label>
              {formik.errors.image && (
                <Typography color="error">{formik.errors.image}</Typography>
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ width: "100%" }}>
                <Typography className="input-label-text">Full Name</Typography>
                <TextField
                  placeholder="Name"
                  name="name"
                  className="custom-textfield"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sx={{ width: "100%" }}>
                <Typography className="input-label-text">Email</Typography>
                <TextField
                  placeholder="email"
                  name="email"
                  className="custom-textfield"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.email)}
                  helperText={formik.touched.name && formik.errors.email}
                  variant="outlined"
                  fullWidth
                  disabled={isEdit ? true : false}
                />
              </Grid>
              {token && token.role === userRoles.SUPER_ADMIN && (
                <Grid item xs={6} sx={{ width: "100%" }}>
                  <Typography className="input-label-text">
                    Add Location
                  </Typography>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      className="custom-textfield"
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={haveAccessArray.map((item) => item.id)} // Correct value management
                      onChange={(event) => {
                        const {
                          target: { value },
                        } = event;
                        const selectedIds =
                          typeof value === "string" ? value.split(",") : value;

                        // Update haveAccessArray based on selected items
                        const newHaveAccessArray = locationData.filter(
                          (location) => selectedIds.includes(location.id)
                        );
                        const newGiveAccessArray = locationData.filter(
                          (location) => !selectedIds.includes(location.id)
                        );

                        setHaveAccessArray(newHaveAccessArray);
                        setGiveAccessArray(newGiveAccessArray);
                      }}
                      input={<OutlinedInput />}
                      renderValue={(selected) =>
                        selected
                          .map(
                            (id) =>
                              locationData.find((loc) => loc.id === id)?.name
                          )
                          .join(", ")
                      }
                      MenuProps={MenuProps}
                    >
                      {locationData.map((item) =>
                        SelectedData?.company_id === item.id ? (
                          <Tooltip
                            key={item.id}
                            title="Cannot Remove default"
                            placement="top"
                          >
                            <Box>
                              <MenuItem value={item.id} disabled>
                                <Checkbox
                                  disabled
                                  checked={haveAccessArray.some(
                                    (loc) => loc.id === item.id
                                  )}
                                />
                                <ListItemText primary={item.name} />
                              </MenuItem>
                            </Box>
                          </Tooltip>
                        ) : (
                          <MenuItem key={item.id} value={item.id}>
                            <Checkbox
                              checked={haveAccessArray.some(
                                (loc) => loc.id === item.id
                              )}
                            />
                            <ListItemText primary={item.name} />
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
              width: "100%",
            }}
          >
            <Box>
              {isEdit ? (
                <Button
                  variant="outlined"
                  onClick={handleRestPass}
                  sx={{
                    color: "#8477DA",
                    border: "1px solid #8477DA",
                    borderRadius: "8px",
                  }}
                >
                  Reset Password
                </Button>
              ) : (
                ""
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => formik.resetForm()}
                sx={{
                  color: "#101828",
                  border: "1px solid #D0D5DD",
                  width: "fit-content",
                  borderRadius: "8px",
                }}
              >
                Discard Changes
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
                  padding: LoadingForAdd || LoadingForEdit ? 0 : "6px 16px",
                  position: "relative",
                  borderRadius: "8px",
                }}
              >
                {LoadingForAdd || LoadingForEdit ? (
                  <Box sx={{ position: "absolute", bottom: "-1px" }}>
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  </Box>
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
