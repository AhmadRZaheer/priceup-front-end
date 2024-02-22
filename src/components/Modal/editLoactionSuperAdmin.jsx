import { Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import InputImageIcon from "../../Assets/imageUploader.svg";
import CustomInputField from "../ui-components/CustomInput";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
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

function EditLocationModal({ open, close, userdata, refetch, companydata }) {
  const [sections, setSections] = useState([false, false, false]);
  const [selectedImage, setSelectedImage] = useState(null);
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
    width: 400,
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
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().matches(
      /^.{8,}$/,
      "Password must be at least 8 characters long."
    ),
    phone: Yup.string().matches(
      /^\d{6,15}$/,
      "Invalid phone number. Phone number must contain only numbers"
    ),
  });

  const { mutate: editFinish, isSuccess } = useEditUser();
  const { mutate: ResetPassword } = useResetUserPassword();
  const { mutate: updateCustomUser, isSuccess: userUpdated } =
    useEditAccessCustomUser();
  const formik = useFormik({
    initialValues: {
      name: userdata?.name,
      email: userdata?.email,
      phone: "",
      password: userdata?.password,
      selectedImage: userdata?.image,
      userid: userdata?._id,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values, "values formik");
      editFinish(values);
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
    setHaveAccessArray((prevHaveAccessArray) => {
      const matchingUserData = customUserData.filter((userData) =>
        userData?.locationsAccess?.some(
          (accessData) => accessData?.company_id === companydata?._id
        )
      );
      return matchingUserData;
    });

    setGiveAccessArray((prevGiveAccessArray) => {
      const nonMatchingUserData = customUserData.filter(
        (userData) =>
          !userData.locationsAccess?.some(
            (accessData) => accessData?.company_id === companydata?._id
          )
      );
      return nonMatchingUserData;
    });
  }, [companydata, customUserData]);

  useEffect(() => {
    customUserRefech();
  }, [userUpdated, customerSuc]);

  const removeLocationAccess = async (ToRemove) => {
    const updatedLocationsAccess = ToRemove?.locationsAccess.filter(
      (location) => location?.company_id !== companydata?._id
    );

    const updatedUser = {
      ...ToRemove,
      locationsAccess: updatedLocationsAccess,
    };

    await updateCustomUser(updatedUser);
    customUserRefech();
  };

  const handleRestPass = () => {
    ResetPassword({ userid: userdata?._id });
  };
  return (
    <>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <Box sx={{ width: "100%", justifyContent: "end", display: "flex" }}>
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
          <Typography
            sx={{ color: "#667085", fontSize: "16px", fontWeight: "bold" }}
          >
            Locations Management
          </Typography>

          <Box sx={{ mt: 2, mb: 10 }}>
            <form onSubmit={formik.handleSubmit}>
              <Accordion
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
                      User Info{" "}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "#4D5463",
                        fontSize: "15px",
                      }}
                    >
                      User Info{" "}
                    </Typography>
                  )}
                </AccordionSummary>

                <AccordionDetails sx={{ padding: 0 }}>
                  <Box mb={2}>
                    <input
                      accept="image/*"
                      id="image-input"
                      type="file"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />

                    {formik.errors.image && (
                      <Typography color="error">
                        {formik.errors.image}
                      </Typography>
                    )}

                    <label htmlFor="image-input">
                      <Box
                        sx={{
                          border: "1px solid #EAECF0",
                          textAlign: "center",
                          padding: 2,
                          borderRadius: 2,
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                      }}
                    >
                      {selectedImage ? (
                        <img
                          width={"80px"}
                          height={"80px"}
                          style={{ margin: 10 }}
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                        />
                      ) : userdata?.image ? (
                        <img
                          width={"80px"}
                          height={"80px"}
                          style={{ margin: 10 }}
                          src={`${backendURL}/${userdata?.image}`}
                          alt="Selected"
                        />
                      ) : (
                        ""
                      )}
                      <Button
                        variant="outlined"
                        onClick={handleRestPass}
                        sx={{
                          height: "34px",
                          width: "45%",
                          color: "#8477DA",
                          border: "1px solid #8477DA",
                          mb: 1,
                        }}
                      >
                        Reset Password
                      </Button>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        Name
                      </Typography>
                      <CustomInputField
                        fullWidth={true}
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                    </Box>

                    <Box sx={{ width: "100%", mt: 1.5 }}>
                      <Typography
                        sx={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        Email address
                      </Typography>
                      <CustomInputField
                        fullWidth={true}
                        type="text"
                        name="email"
                        disabled={true}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Box>
                    <Box sx={{ width: "100%", mt: 1.5 }}>
                      <Typography
                        sx={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        Phone
                      </Typography>
                      <CustomInputField
                        fullWidth={true}
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </Box>
                    <Box sx={{ width: "100%", mt: 1.5 }}>
                      {/* <Typography
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
                      /> */}
                    </Box>
                  </Box>
                  <Box sx={{ p: 1, width: "96%" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: "#8477DA",
                        width: "100%",
                        color: "white",
                        ":hover": {
                          bgcolor: "#8477DA",
                        },
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </form>
            <AccordionLocationEdit
              companyData={companydata}
              close={close}
              refetch={refetch}
            />
            <Accordion
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
                    User Allotment{" "}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                    }}
                  >
                    User Allotment{" "}
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
                    {haveAccessArray.map((data) => {
                      return (
                        <Tooltip
                          // title={
                          //   selectedRow.company_id === data.id
                          //     ? "Cannot Remove"
                          //     : ""
                          // }
                          key={data._id}
                        >
                          <Box
                            sx={{
                              borderRadius: "7px",
                            }}
                            key={data._id}
                          >
                            <Chip
                              label={data.name}
                              onDelete={() => removeLocationAccess(data)}
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
                        </Tooltip>
                      );
                    })}
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
                        Add User
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "14px",
                        }}
                      >
                        Add User
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
                      {giveAccessArray?.map((data) => {
                        return (
                          <Box sx={{ borderRadius: "7px", p: 0 }} key={data.id}>
                            <Chip
                              onClick={() => handleOpen(data)}
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
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box sx={{ display: "flex", mt: 3, justifyContent: "space-between" }}>
            <Button
              onClick={close}
              variant="outlined"
              sx={{
                border: "1px solid #D0D5DD",
                width: "20%",
                color: "#344054",
                ":hover": {
                  border: "1px solid #D0D5DD",
                },
              }}
            >
              Close
            </Button>
          </Box>
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
export default EditLocationModal;
