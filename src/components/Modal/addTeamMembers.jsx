import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import InputImageIcon from "../../Assets/imageUploader.svg";
import DefaultImageIcon from "../../Assets/default-image.jpg";
import { useRef } from "react";
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
// import {
  // useAddLocation,
  // useCreateTeamMembers,
  // useEditTeamMembers,
  // useResetPasswordTeamMembers,
// } from "../../utilities/ApiHooks/team";
import { backendURL, getDecryptedToken } from "../../utilities/common";
// import DefaultImage from "../ui-components/defaultImage";
import { CloseTwoTone } from "@mui/icons-material";
// import { useFetchAdminLocation } from "@/utilities/ApiHooks/superAdmin";
import { userRoles } from "@/utilities/constants";
import { useCreateDocument, useEditDocument } from "@/utilities/ApiHooks/common";

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
const routePrefix = `${backendURL}/admins`;
export default function AddTeamMembers({
  open,
  close,
  recordToModify,
  refetchUsers,
  locationsList
}) {

  const token = getDecryptedToken();
  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("image", acceptedFiles[0]);
  };
  const inputRef = useRef(null); // Create a ref for the file input
  const { getInputProps } = useDropzone({ onDrop });
  const {
    mutateAsync: createUser,
    isLoading: createLoading,
  } = useCreateDocument();
  const {
    mutateAsync: updateUser,
    isLoading: updateLoading,
  } = useEditDocument();
  // const { mutate: ResetPassword } = useResetPasswordTeamMembers();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required('Email is required'),
    role: Yup.string().required('Role is required'),
    role: Yup.string().when([], {
      is: () => token?.role === userRoles.SUPER_ADMIN, // Adjust this condition as per your logic
      then: (schema) => schema.required("Role is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    assignedLocations: Yup.array().of(Yup.string()).when('role', {
      is: userRoles.STAFF,
      then: (schema) => schema.min(1, "At least one location is required").required("Please select default location"),
      otherwise: (schema) => schema.notRequired(),
    }),
    image: Yup.mixed(),
  });
  const formik = useFormik({
    initialValues: {
      name: recordToModify?.name || "",
      email: recordToModify?.email || "",
      image: recordToModify?.image || null,
      role: recordToModify?.role || "",
      assignedLocations: recordToModify?.locationsAccess || recordToModify?.haveAccessTo || [],
    },

    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // {
        // console.log('onsubmit run');
        const formData = new FormData();
        if (typeof values.image !== 'string') {
          formData.append("image", values.image);
        }
        formData.append("name", values.name);
        formData.append("role", values.role);
        formData.append("assignedLocations", JSON.stringify(values.assignedLocations));
        try {
          if (recordToModify) { // edit case
            // console.log('edit',formData)
            if(token?.role === userRoles.SUPER_ADMIN){ // for super admin
            await updateUser({ apiRoute: `${routePrefix}/user/${recordToModify?._id}?role=${values.role}`, data: formData });
            }
            else { // for location admin
              await updateUser({ apiRoute: `${backendURL}/staffs/${recordToModify?._id}`, data: formData });
            }
          }
          else {
            formData.append("email", values.email);
            if(token?.role === userRoles.SUPER_ADMIN){ // for super admin
              await createUser({ apiRoute: `${routePrefix}/user/save?role=${values.role}`, data: formData });
            }
            else { // for location admin
              await createUser({ apiRoute: `${backendURL}/staffs/save`, data: formData });
            }
          }
          resetForm();
          refetchUsers();
          close();
        }
        catch (err) {
          console.log(err, 'Error in creating user');
        }
      // }
    },
  });
  const handleResetPass = async () => {
    await updateUser({ apiRoute: `${routePrefix}/user/updatePassword/${recordToModify?._id}?role=${formik.values.role}`, data: {} });
    close();
  };
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
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                {recordToModify ? "Edit User" : "Add New User"}
              </Typography>
              <Typography
                sx={{
                  color: "#646669",
                  marginTop: 0.5,
                  fontWeight: 600,
                }}
              >
                {recordToModify ? "Edit" : "Add"} your user details.
              </Typography>
            </Box>
            <Box>
              <IconButton
                onClick={() => {
                  close();
                  // setSelectedImage(null);
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
                {formik.values.image !== undefined && formik.values.image !== null ? (
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
                      borderRadius: "54px !important",
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
                    sx={{
                      color: "rgba(132, 119, 218, 1)",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
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
                  size="small"
                  placeholder="Enter full name"
                  name="name"
                  className="custom-textfield"
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
              <Grid item xs={6} sx={{ width: "100%" }}>
                <Typography className="input-label-text">Email Address</Typography>
                <TextField
                  size="small"
                  placeholder="Enter email address"
                  name="email"
                  className="custom-textfield"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // error={formik.touched.email && Boolean(formik.errors.email)}
                  // helperText={formik.touched.email && formik.errors.email}
                  variant="outlined"
                  fullWidth
                  disabled={recordToModify ? true : false}
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                    {formik.errors.email}
                  </Typography>
                )}
              </Grid>
              {token && token.role === userRoles.SUPER_ADMIN && (
                <Grid item xs={6} sx={{ width: "100%" }}>
                  <Typography className="input-label-text">
                    User Role
                  </Typography>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      size="small"
                      name="role"
                      className="custom-textfield"
                      // labelId="demo-multiple-checkbox-label"
                      // id="demo-multiple-checkbox"
                      disabled={recordToModify ? true : false}
                      value={formik.values.role} // Correct value management
                      onChange={(event) => {
                        formik.setFieldValue("role", event.target.value);
                        formik.setFieldValue("assignedLocations", []); // Clear second select when first changes
                      }}
                      onBlur={formik.handleBlur}
                      // error={formik.touched.role && Boolean(formik.errors.role)}
                      // helperText={formik.touched.role && formik.errors.role}
                      input={<OutlinedInput />}
                    >
                      <MenuItem value={userRoles.SUPER_ADMIN}>
                        {" "}
                        <Typography
                          sx={{ padding: 0, width: "auto" }}
                        >
                          Super Admin
                        </Typography>
                      </MenuItem>
                      <MenuItem value={userRoles.CUSTOM_ADMIN}>
                        {" "}
                        <Typography
                          sx={{ padding: 0, width: "auto" }}
                        >
                          Admin
                        </Typography>
                      </MenuItem>
                      <MenuItem value={userRoles.STAFF}>
                        {" "}
                        <Typography
                          sx={{ padding: 0, width: "auto" }}
                        >
                          Staff
                        </Typography>
                      </MenuItem>
                    </Select>
                    {formik.touched.role && formik.errors.role && (
                      <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                        {formik.errors.role}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              )}
              {token && token.role === userRoles.SUPER_ADMIN && [userRoles.CUSTOM_ADMIN, userRoles.STAFF].includes(formik.values.role) && (
                <Grid item xs={6} sx={{ width: "100%" }}>
                  <Typography className="input-label-text">
                    Locations
                  </Typography>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      size="small"
                      className="custom-textfield"
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={formik.values.assignedLocations}
                      // value={haveAccessArray.map((item) => item.id)} // Correct value management
                      onChange={(event) => {
                        const {
                          target: { value },
                        } = event;
                        const selectedIds = typeof value === "string" ? value.split(",") : value;

                        // Update formik values directly without additional state updates
                        formik.setFieldValue("assignedLocations", selectedIds);
                        // const {
                        //   target: { value },
                        // } = event;
                        // const selectedIds =
                        //   typeof value === "string" ? value.split(",") : value;

                        // // Update haveAccessArray based on selected items
                        // const newHaveAccessArray = locationData.filter(
                        //   (location) => selectedIds.includes(location.id)
                        // );
                        // const newGiveAccessArray = locationData.filter(
                        //   (location) => !selectedIds.includes(location.id)
                        // );

                        // setHaveAccessArray(newHaveAccessArray);
                        // setGiveAccessArray(newGiveAccessArray);
                      }}
                      input={<OutlinedInput />}
                      renderValue={(selected) =>
                        selected
                          .map(
                            (id) =>
                              locationsList.find((loc) => loc._id === id)?.name
                          )
                          .join(", ")
                      }
                      MenuProps={MenuProps}
                    >
                      {locationsList.map((item) =>
                        recordToModify?.company_id === item._id ? (
                          <Tooltip
                            key={item._id}
                            title="Cannot Remove default"
                            placement="top"
                          >
                            <Box>
                              <MenuItem key={item._id} value={item._id} disabled>
                                <Checkbox
                                  disabled
                                  checked={formik.values.assignedLocations.includes(item._id)}
                                />
                                <ListItemText primary={item.name} />
                              </MenuItem>
                            </Box>
                          </Tooltip>
                        ) : (
                          <MenuItem key={item._id} value={item._id}>
                            <Checkbox
                              checked={formik.values.assignedLocations.includes(item._id)}
                            />
                            <ListItemText primary={item.name} />
                          </MenuItem>
                        )
                      )}
                    </Select>
                    {formik.values.role === userRoles.STAFF && formik.touched.assignedLocations && formik.errors.assignedLocations && (
                      <Typography variant="caption" color="error">
                        {formik.errors.assignedLocations}
                      </Typography>
                    )}
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
              {recordToModify ? (
                <Button
                  variant="outlined"
                  onClick={handleResetPass}
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
                onClick={() => {
                  if (recordToModify) {
                    formik.resetForm();
                  } else {
                    close();
                  }
                }}
                sx={{
                  color: "#101828",
                  border: "1px solid #D0D5DD",
                  width: "fit-content",
                  borderRadius: "8px",
                }}
              >
                {recordToModify ? "Discard Changes" : "Cancel"}
              </Button>
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                disabled={createLoading || updateLoading}
                sx={{
                  backgroundColor: "#8477DA",
                  "&:hover": {
                    backgroundColor: "#8477da",
                  },
                  padding: createLoading || updateLoading ? 0 : "6px 16px",
                  position: "relative",
                  borderRadius: "8px",
                }}
              >
                {createLoading || updateLoading ? (
                  <Box sx={{ position: "absolute", bottom: "-1px" }}>
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  </Box>
                ) : recordToModify ? (
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
