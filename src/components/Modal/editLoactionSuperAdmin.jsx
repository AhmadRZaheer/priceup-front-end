import { Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomInputField from "../ui-components/CustomInput";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import {
  useCreateAdminsMembers,
  useDataCustomUser,
  useEditAccessCustomUser,
  useEditCustomUser,
  useEditUser,
  useResetUserPassword,
} from "../../utilities/ApiHooks/superAdmin";
import * as Yup from "yup";
import PasswordModal from "./addUserPassword";
import { backendURL } from "../../utilities/common";
import AccordionLocationEdit from "../ui-components/AccordionLocationEdit";

function AddEditLocationModal({
  open,
  close,
  userdata,
  refetch,
  companydata,
  isEdit,
}) {
  const [sections, setSections] = useState([false, false, false]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alignment, setAlignment] = useState("admin");
  const inputRef = useRef(null); // Create a ref for the file input

  const {
    data: customUserData,
    isSuccess: customerSuc,
    refetch: customUserRefech,
  } = useDataCustomUser();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid white",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };
  const toggleSection = (index) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index] = !newSections[index];
      return newSections;
    });
  };
  const validationSchema = Yup.object().shape({
    locationEmail: Yup.string()
      .email("Invalid email address")
      .required("Location Email is required"),
    locationName: Yup.string().required("Location Name is required"),
  });

  const { mutate: editFinish, isSuccess, isLoading } = useEditUser();
  const {
    mutate: addTeamAdminsMembers,
    isLoading: LoadingForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateAdminsMembers();
  const { mutate: ResetPassword } = useResetUserPassword();
  const { mutate: updateCustomUser, isSuccess: userUpdated } =
    useEditAccessCustomUser();
  const formik = useFormik({
    initialValues: {
      locationName: isEdit ? userdata?.name : "",
      locationEmail: isEdit ? userdata?.email : "",
      locationOwner: isEdit ? userdata?.locationOwner : "",
      locationAddress: isEdit ? userdata?.locationAddress : "",
      phone: "",
      password: userdata?.password,
      selectedImage: isEdit ? userdata?.image : "",
      userid: isEdit ? userdata?._id : "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isEdit) {
        editFinish(values);
      } else {
        addTeamAdminsMembers(values);
      }
      close();
      refetch();
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    formik.setFieldValue("selectedImage", file);
  };
  const [haveAccessArray, setHaveAccessArray] = useState([]);
  const [giveAccessArray, setGiveAccessArray] = useState([]);
  const [user, setuser] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const handleOpen = (data) => {
    if (isOpen) {
      setisOpen(false);
    } else setisOpen(true);
    setuser(data);
  };
  useEffect(() => {
    setHaveAccessArray(() => {
      const matchingUserData = customUserData.filter(
        (userData) => userData.locationsAccess.includes(companydata?._id)
        // userData?.locationsAccess?.some(
        //   (accessData) => accessData?.company_id === companydata?._id
        // )
      );

      return matchingUserData;
    });

    setGiveAccessArray(() => {
      const nonMatchingUserData = customUserData.filter(
        (userData) => !userData.locationsAccess.includes(companydata?._id)
      );
      return nonMatchingUserData;
    });
  }, [companydata, customUserData]);

  useEffect(() => {
    customUserRefech();
  }, [userUpdated, customerSuc]);

  const handleRestPass = () => {
    ResetPassword({ userid: userdata?._id });
  };

  const handleAddLocation = async (chipToAdd) => {
    if (!chipToAdd.locationsAccess.includes(companydata._id)) {
      chipToAdd.locationsAccess.push(companydata._id);
    }

    const updatedUser = {
      _id: chipToAdd._id,
      locationsAccess: chipToAdd.locationsAccess,
    };
    await updateCustomUser(updatedUser);
    customUserRefech();
  };

  const handleDelete = async (chipToDelete) => {
    if (chipToDelete.locationsAccess.includes(companydata._id)) {
      chipToDelete.locationsAccess = chipToDelete.locationsAccess.filter(
        (locationId) => locationId !== companydata._id
      );
    }
    const updatedUser = {
      _id: chipToDelete._id,
      locationsAccess: chipToDelete.locationsAccess,
    };
    await updateCustomUser(updatedUser);
    customUserRefech();
  };
  // const handleChangeSection = (event, newAlignment) => {
  //   if (newAlignment !== null) {
  //     setAlignment(newAlignment);
  //   }
  // };
  const handleSelectImage = () => {
    inputRef.current.click(); // Trigger click on the file input
  };
  const filterhaveAccessArray = haveAccessArray.filter((item) => item.status);
  const filtergiveAccessArray = giveAccessArray.filter((item) => item.status);
  return (
    <>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Typography
              sx={{ color: "#667085", fontSize: "16px", fontWeight: "bold" }}
            >
              Locations Management
            </Typography>
            <Close
              onClick={close}
              sx={{
                color: "#7F56D9",
                cursor: "pointer",
                mt: -1,
                mr: -1,
              }}
            />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            {/* <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChangeSection}
            aria-label="Platform"
            className="toggle-section-container"
            size="small"
            sx={{ mb: 2 }}
          >
            <ToggleButton
              className="toggle-button"
              classes={{ selected: "selected-toggle-button" }}
              value="admin"
            >
              Admin Info
            </ToggleButton>
            <ToggleButton
              className="toggle-button"
              classes={{ selected: "selected-toggle-button" }}
              value="location"
            >
              Locations Info
            </ToggleButton>
          </ToggleButtonGroup> */}

            <Box
              sx={{
                mt: 2,
                backgroundColor: "#f3f5f6",
                borderRadius: "8px",
                p: 2,
              }}
            >
              {/* <Accordion
              sx={{
                paddingX: "6px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => toggleSection(0)}
              >
                {sections[0] ? (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                      borderBottom: "1px solid #ccc",
                      width: "100%",
                      pr: 4,
                      mr: -3,
                      pb: 1,
                      mb: -1,
                    }}
                  >
                    Admin Info{" "}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                    }}
                  >
                    Admin Info{" "}
                  </Typography>
                )}
              </AccordionSummary>

              <AccordionDetails sx={{ padding: 0 }}> */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "100%",
                      overflow: "hidden",
                    }}
                  >
                    {selectedImage ? (
                      <img
                        width={"84px"}
                        height={"84px"}
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                      />
                    ) : userdata?.image ? (
                      <img
                        width={"84px"}
                        height={"84px"}
                        src={`${backendURL}/${userdata?.image}`}
                        alt="Selected"
                      />
                    ) : (
                      ""
                    )}
                  </Box>
                  <label htmlFor="image-input">
                    <input
                      accept="image/*"
                      id="image-input"
                      type="file"
                      ref={inputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />

                    <Box>
                      <Button
                        onClick={handleSelectImage}
                        sx={{
                          color: "black",
                          fontWeight: 500,
                          borderRadius: "54px !important",
                          border: "1px solid rgba(212, 219, 223, 1)",
                        }}
                      >
                        Upload Profile Image
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(132, 119, 218, 1)",
                          fontSize: "12px",
                          fontWeight: 600
                        }}
                      >
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </Typography>
                    </Box>
                    {formik.errors.image && (
                      <Typography color="error">
                        {formik.errors.image}
                      </Typography>
                    )}
                  </label>
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Location Name
                    </Typography>
                    <CustomInputField
                      fullWidth={true}
                      type="text"
                      name="locationName"
                      placeholder={"Enter Location Name"}
                      value={formik.values.locationName}
                      onChange={formik.handleChange}
                    />
                  </Box>

                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Location Email
                    </Typography>
                    <CustomInputField
                      fullWidth={true}
                      type="text"
                      name="locationEmail"
                      disabled={isEdit}
                      placeholder={"Enter Location Email Address"}
                      value={formik.values.locationEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.locationEmail &&
                        Boolean(formik.errors.locationEmail)
                      }
                      helperText={
                        formik.touched.locationEmail &&
                        formik.errors.locationEmail
                      }
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Location Owner
                    </Typography>
                    <CustomInputField
                      fullWidth={true}
                      type="text"
                      name="locationOwner"
                      // disabled={true}
                      value={formik.values.locationOwner}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={"Enter Location Owner Name"}
                      error={
                        formik.touched.locationOwner &&
                        Boolean(formik.errors.locationOwner)
                      }
                      helperText={
                        formik.touched.locationOwner &&
                        formik.errors.locationOwner
                      }
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Location Address
                    </Typography>
                    <CustomInputField
                      fullWidth={true}
                      type="text"
                      name="locationAddress"
                      value={formik.values.locationAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={"Enter Location Address"}
                      error={
                        formik.touched.locationAddress &&
                        Boolean(formik.errors.locationAddress)
                      }
                      helperText={
                        formik.touched.locationAddress &&
                        formik.errors.locationAddress
                      }
                    />
                  </Box>
                </Box>
                {/* <Box sx={{ width: "100%", mt: 1.5 }}>
                    <Typography
                      sx={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Password
                    </Typography>
                    <CustomInputField
                      fullWidth={true}
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    /> 
                  </Box> */}
              </Box>

              {/* </AccordionDetails>
            </Accordion> */}

              {/* {alignment === "location" && (
              <AccordionLocationEdit
                companyData={companydata}
                close={close}
                refetch={refetch}
              />
            )} */}
              {/* <Accordion
              sx={{
                padding: "6px",
                mt: 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => toggleSection(1)}
              >
                {sections[1] ? (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                      borderBottom: "1px solid #ccc",
                      width: "100%",
                      pr: 4,
                      mr: -3,
                      pb: 1,
                      mb: -1,
                    }}
                  >
                    Admin Allotment{" "}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                    }}
                  >
                    Admin Allotment{" "}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: "4px",
                      pl: 3,
                      pb: 2,
                    }}
                    component="ul"
                  >
                    {filterhaveAccessArray.length !== 0 ? (
                      filterhaveAccessArray.map((data) => {
                        return (
                          <Box
                            sx={{
                              borderRadius: "7px",
                            }}
                            key={data._id}
                          >
                            <Chip
                              label={data.name}
                              onDelete={() => handleDelete(data)}
                              deleteIcon={
                                <Close
                                  style={{
                                    color: "white",
                                    width: "16px",
                                    height: "16px",
                                    display: "block",
                                  }}
                                />
                              }
                              sx={{
                                color: "white",
                                bgcolor: "#C6C6C6",
                                borderRadius: "7px",
                              }}
                            />
                          </Box>
                        );
                      })
                    ) : (
                      <Box
                        sx={{
                          color: "#667085",
                          textAlign: "center",
                          fontSize: "12px",
                          width: "100%",
                        }}
                      >
                        Currently no admin is allotted to this location.
                      </Box>
                    )}
                  </Box>
                </Box>
                <Accordion
                  sx={{
                    paddingX: "6px",
                    boxShadow: "none !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: "#4D5463" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => toggleSection(2)}
                  >
                    {sections[2] ? (
                      <Typography
                        sx={{
                          color: "#4D5463",
                          fontSize: "14px",
                          borderBottom: "1px solid #ccc",
                          width: "100%",
                          pr: 5.8,
                          mr: -3.5,
                          pb: 1,
                          mb: -1,
                          ml: -0.6,
                          pl: 0.2,
                        }}
                      >
                        Allot Admin
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "14px",
                        }}
                      >
                        Allot Admin
                      </Typography>
                    )}
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baselines",
                        gap: "4px",
                        p: 0,
                      }}
                      component="ul"
                    >
                      {filtergiveAccessArray.length !== 0 ? (
                        filtergiveAccessArray?.map((data) => {
                          return (
                            <Box
                              sx={{ borderRadius: "7px", p: 0 }}
                              key={data.id}
                            >
                              <Chip
                                onClick={() => handleAddLocation(data)}
                                label={data.name}
                                // onDelete={
                                //   data._id ? undefined : handleDelete(data)
                                // }
                                sx={{
                                  color: "white",
                                  bgcolor: "#C6C6C6",
                                  borderRadius: "7px",
                                  cursor: "pointer",
                                }}
                              />
                            </Box>
                          );
                        })
                      ) : (
                        <Box
                          sx={{
                            color: "#667085",
                            textAlign: "center",
                            fontSize: "12px",
                            width: "100%",
                          }}
                        >
                          No Admin Found
                        </Box>
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion> */}
            </Box>

            <Box
              sx={{ display: "flex", mt: 3, justifyContent: "space-between" }}
            >
              {!isEdit ? (
                <Box></Box>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleRestPass}
                  sx={{
                    height: "34px",
                    // width: "45%",
                    color: "#8477DA",
                    border: "1px solid #8477DA",
                  }}
                >
                  Reset Password
                </Button>
              )}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
                <Button
                  onClick={close}
                  variant="outlined"
                  sx={{
                    border: "1px solid #D0D5DD",
                    width: "50%",
                    color: "#344054",
                    ":hover": {
                      border: "1px solid #D0D5DD",
                    },
                  }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#8477DA",
                    color: "white",
                    width: "50%",
                    ":hover": {
                      bgcolor: "#8477DA",
                    },
                  }}
                  disabled={isLoading}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
      <PasswordModal
        open={isOpen}
        close={handleOpen}
        user={user}
        companyId={companydata?._id}
        customUserRefech={customUserRefech}
      />
    </>
  );
}
export default AddEditLocationModal;
