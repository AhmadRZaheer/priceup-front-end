import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomerSelect from "./CustomerSelect";
import { useEffect, useMemo, useState } from "react";
import {
  useCreateDocument,
  useEditDocument,
} from "@/utilities/ApiHooks/common";
import { backendURL, frontendURL, getDecryptedToken } from "@/utilities/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Add,
  Close,
  ContentCopy,
  DoneOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import CustomTabPanel, { a11yProps } from "@/components/CustomTabPanel";
import ShowerEstimatesList from "./EstimatesList/showers";
import MirrorEstimatesList from "./EstimatesList/mirrors";
import { EstimateCategory, projectStatus } from "@/utilities/constants";
import AddressSelect from "./AddressSelect";
import CustomInputField from "@/components/ui-components/CustomInput";
import icon from "../../../Assets/search-icon.svg";
import ChooseEstimateCategoryModal from "./ChooseEstimateCategoryModal";
import StatusChip from "@/components/common/StatusChip";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import WineCellarEstimatesList from "./EstimatesList/wineCellar";
import { showSnackbar } from "@/redux/snackBarSlice";
import { useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CompanySelect from "./CompanyContactSelect";
import PreviewLinkList from "./PreviewLinkList";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Project Name is required")
    .min(4, "Must be at least 4 characters"),
  status: yup.string().required("Project Status is required"),
});
const routePrefix = `${backendURL}/projects`;

const ProjectInfoComponent = ({
  projectState = "create",
  projectData = null,
}) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const selectedTab = searchParams.get("category");
  const tabValue =
    selectedTab === null ? EstimateCategory.SHOWERS : selectedTab;
  const decryptedToken = getDecryptedToken();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const creatorName =
    projectState === "create"
      ? decryptedToken?.name
      : projectData?.creatorData?.name;

  const createdDate = useMemo(() => {
    const todaysDate = new Date();
    if (projectState === "create") {
      return todaysDate?.toDateString();
    } else {
      const current = new Date(projectData?.createdAt);
      return current?.toDateString();
    }
  }, [projectState, projectData]);
  const { mutateAsync: createProject, isLoading: createLoading } =
    useCreateDocument();
  const { mutateAsync: updateProject, isLoading: updateLoading } =
    useEditDocument();
  const [selectedCustomer, setSelectedCustomer] = useState(
    projectData?.customerData || null
  );
  const [selectedAddress, setSelectedAddress] = useState(
    projectData?.addressData || null
  );
  const [companyContact, setCompanyContact] = useState(
    projectData?.contactData || null
  );
  const [projectName, setProjectName] = useState(projectData?.name || "");
  const [projectNotes, setProjectNotes] = useState(projectData?.notes || "");
  const [openCustomerSelectModal, setOpenCustomerSelectModal] = useState(false);
  const [openAddressSelectModal, setOpenAddressSelectModal] = useState(false);
  const [openCompanySelectModal, setOpenCompanySelectModal] = useState(false);
  const [openLandingList, setOpenLandingList] = useState(false);

  const navigate = useNavigate();
  const [activeTabNumber, setActiveTabNumber] = useState(
    EstimateCategory.SHOWERS
  ); // 0 for showers, 1 for mirrors

  const handleLandingList = () => {
    setOpenLandingList(true);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue, "sdsdsdsdsd");
    navigate(`/projects/${projectData?._id}?category=${newValue}`);
    // setActiveTabNumber(newValue);
  };
  // const [activeTabNumber, setActiveTabNumber] = useState(Number(localStorage.getItem("activeTab")) || 0);
  // const handleChange = (event, newValue) => {
  //   localStorage.setItem("activeTab", newValue);
  //   setActiveTabNumber(newValue); // Update the state to force re-render
  // };
  const formik = useFormik({
    initialValues: {
      name: projectName,
      status: projectData?.status || projectStatus.PENDING,
      customer: selectedCustomer?.name || "",
      address: selectedAddress?.name || "",
      notes: projectNotes,
      companyContact: companyContact?.name || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        notes: values.notes,
        status: values.status,
        // address_id:  selectedAddress?._id,
        customer_id: selectedCustomer?._id,
      };
      if (selectedAddress?._id) {
        data.address_id = selectedAddress?._id;
      }
      if (companyContact?._id) {
        data.contact_id = companyContact?._id;
      }
      try {
        if (projectState === "create") {
          const resp = await createProject({
            data: data,
            apiRoute: `${routePrefix}/save`,
          });
          navigate(`/projects/${resp?._id}`);
        } else {
          await updateProject({
            data: data,
            apiRoute: `${routePrefix}/${projectData?._id}`,
          });
        }
      } catch (err) {
        console.error(err, "error");
      }
      console.log(data, "data");
    },
  });
  const handleCustomerSelect = () => {
    setOpenCustomerSelectModal(true);
  };
  const handleCustomerUnSelect = (event) => {
    event.stopPropagation();
    setSelectedCustomer(null);
    formik.setFieldValue("customer", "");
    setSelectedAddress(null);
    formik.setFieldValue("address", "");
  };
  const handleCustomerChange = (customer) => {
    setSelectedCustomer(customer);
    setSelectedAddress(null);
    formik.setFieldValue("address", "");
    setOpenCustomerSelectModal(false);
  };
  const handleAddressSelect = () => {
    setOpenAddressSelectModal(true);
  };
  const handleCompanySelect = () => {
    setOpenCompanySelectModal(true);
  };
  const handleAddressUnSelect = (event) => {
    event.stopPropagation();
    setSelectedAddress(null);
    formik.setFieldValue("address", "");
  };
  const handleCompanyUnSelect = (event) => {
    event.stopPropagation();
    setCompanyContact(null);
    formik.setFieldValue("companyContact", "");
  };
  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    setOpenAddressSelectModal(false);
  };
  const handleCompanyChange = (contact) => {
    setCompanyContact(contact);
    setOpenCompanySelectModal(false);
  };

  const handleDateChange = (newDate) => {
    if (newDate) {
      // Set time to noon (12:00) to avoid time zone issues
      const adjustedDate = dayjs(newDate)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0);
      setSelectedDate(adjustedDate);
    } else {
      setSelectedDate(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleResetFilter = () => {
    setSearch("");
    setStatus(null);
    setSelectedDate(null);
  };
  const handleClearProjectName = () => {
    formik.setFieldValue("name", "");
  };

  //Craete Model
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const handleOpenCategoryModal = () => setOpenCategoryModal(true);
  const handleCloseCategoryModal = () => setOpenCategoryModal(false);
  const [copyLink, setCopyLink] = useState(false);
  useEffect(() => {
    setProjectName(formik.values.name);
  }, [formik.values.name]);

  useEffect(() => {
    setProjectNotes(formik.values.notes);
  }, [formik.values.notes]);
  const handleCopyPreview = (value) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Modern clipboard API
      navigator.clipboard
        .writeText(value ?? "")
        .then(() => {
          setCopyLink(true);
          showSnackbar("Link Copied", "success");
        })
        .catch((err) => {
          console.error("Failed to copy text using clipboard API:", err);
        });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = value ?? "";
      textarea.style.position = "fixed"; // Prevent scrolling
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        document.execCommand("copy");
        setCopyLink(true);
        showSnackbar("Link Copied", "success");
      } catch (err) {
        console.error("Fallback: Failed to copy text using execCommand:", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };
  return (
    <Box
      sx={{
        background: "transparent",
        padding: { sm: 0, xs: "60px 8px 8px 8px" },
        width: { sm: "auto", xs: "auto", margin: "0px auto" },
      }}
    >
      <Box
        sx={{
          p: { sm: "0px 0px 20px 0px", xs: "20px 0px 20px 0px" },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { lg: 24, md: 20 },
              fontWeight: 600,
              color: "#000000",
              display: "flex",
              lineHeight: "32.78px",
              gap: 1,
            }}
          >
            Project Details
            {/* <Box sx={{ fontSize: {lg:24,md:20}, fontWeight: 600, color: "#000000" }}>
            {projectState !== "create" ? '/ Project Details' :''}  
            </Box> */}
          </Typography>
          <Typography
            sx={{
              color: "#212528",
              fontSize: { lg: 16, md: 14 },
              fontWeight: 600,
              lineHeight: "21.86px",
              opacity: "70%",
            }}
          >
            Create, edit and manage your Projects.
          </Typography>
        </Box>
        {projectState !== "create" ? (
          <Box sx={{ alignSelf: "center", display: "flex", gap: 2 }}>
            {/* {projectData?.landingPage?.customerPreview?.link ? (
            <Box>
              <div className="subscribe-box">
                <input
                  type="text"
                  className="email-input"
                  placeholder="Customer Preview Link"
                  value={`${frontendURL}/customer-landing-page-preview/${projectData?._id}`}
                  disabled
                />
                <Tooltip
                  placement="top"
                  title={copyLink ? "Copied" : "Copy Customer Preview Link"}
                >
                  <button
                    className="subscribe-btn"
                    onClick={() =>
                      handleCopyPreview(
                        `${frontendURL}/customer-landing-page-preview/${projectData?._id}`
                      )
                    }
                  >
                    {copyLink ? (
                      <DoneOutlined sx={{ fontSize: "19px" }} />
                    ) : (
                      <ContentCopy sx={{ fontSize: "19px" }} />
                    )}
                  </button>
                </Tooltip>
              </div>
            </Box>
          ) : (
            ""
          )} */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleLandingList}
              // startIcon={<Add />}
              sx={{
                backgroundColor: "#8477DA",
                height: "44px",
                width: { sm: "auto", xs: "187px" },
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                textTransform: "capitalize",
                borderRadius: 1,
                fontSize: { lg: 16, md: 15, xs: 12 },
                padding: {
                  sm: "10px 16px  !important",
                  xs: "5px 5px !important",
                },
              }}
            >
              View Existing List
            </Button>

            {projectData?.invoice ? (
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  navigate(`/invoices/${projectData?.invoice?._id}`)
                }
                startIcon={<VisibilityOutlined />}
                sx={{
                  backgroundColor: "#8477DA",
                  height: "44px",
                  width: { sm: "auto", xs: "187px" },
                  "&:hover": { backgroundColor: "#8477DA" },
                  color: "white",
                  textTransform: "capitalize",
                  borderRadius: 1,
                  fontSize: { lg: 16, md: 15, xs: 12 },
                  padding: {
                    sm: "10px 16px  !important",
                    xs: "5px 5px !important",
                  },
                }}
              >
                View Quote Page
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  navigate(
                    `/invoices/create?customer_id=${selectedCustomer?._id}&project_id=${projectData?._id}`
                  )
                }
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#8477DA",
                  height: "44px",
                  width: { sm: "auto", xs: "187px" },
                  "&:hover": { backgroundColor: "#8477DA" },
                  color: "white",
                  textTransform: "capitalize",
                  borderRadius: 1,
                  fontSize: { lg: 16, md: 15, xs: 12 },
                  padding: {
                    sm: "10px 16px  !important",
                    xs: "5px 5px !important",
                  },
                }}
              >
                Create Preview Link
              </Button>
            )}
            <Button
              fullWidth
              variant="contained"
              onClick={handleOpenCategoryModal}
              sx={{
                backgroundColor: "#8477DA",
                height: "44px",
                width: { sm: "auto", xs: "187px" },
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                textTransform: "capitalize",
                borderRadius: 1,
                fontSize: { lg: 16, md: 15, xs: 12 },
                padding: {
                  sm: "10px 16px  !important",
                  xs: "5px 5px !important",
                },
              }}
            >
              <Add sx={{ mr: 0.5, color: "#FFFFFF" }} />
              Create New Estimate
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>

      {/* <Typography sx={{ fontSize: "22px", fontWeight: 800, marginBottom: 1.5 }}>
        Project
      </Typography> */}
      <Box>
        <Box
          sx={{
            width: { md: "auto", xs: "100%" },
            background: "#F3F5F6",
            border: "1px solid #D4DBDF",
            padding: { md: 2, xs: 1 },
            borderRadius: "4px 4px 0px 0px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "21px",
              color: "#000000",
            }}
          >
            Glass Estimation
          </Typography>
        </Box>
        <Box
          sx={{
            // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            // border: "1px solid #D4DBDF",
            padding: { md: 2, xs: 1 },
            background: "#FFFF",
          }}
        >
          <form
            onSubmit={formik.handleSubmit}
            style={{ margin: "0px !important" }}
          >
            {/** Section 1 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                // flexWrap: "wrap",
                gap: 2,
                aligItems: "baseline",
                width: "100%",
              }}
            >
              {/** Project Detail Block */}

              <Box sx={{ width: { lg: "80%", md: "100%" }, padding: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { sm: "row", xs: "column" },
                    gap: 4,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: { sm: "50%", xs: "100%" },
                      justifyContent: "space-between",
                      gap: 4,
                      flexDirection: { sm: "row", xs: "column" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: "column",
                        width: { sm: "50%", xs: "100%" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box mb={0.6}>
                          <label htmlFor="status" className="label-text">
                            Project Name
                          </label>
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Box>
                        <CustomInputField
                          id="name"
                          name="name"
                          // label="Enter Project Name"
                          size="small"
                          variant="outlined"
                          InputProps={{
                            endAdornment: formik.values.name ? (
                              <InputAdornment
                                position="end"
                                sx={{ cursor: "pointer" }}
                                onClick={handleClearProjectName}
                              >
                                <Close sx={{}} />
                              </InputAdornment>
                            ) : (
                              ""
                            ),
                            style: {
                              color: "black",
                              borderRadius: 4,
                              backgroundColor: "white",
                            },
                            inputProps: { min: 0, max: 50 },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                          }}
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.name && formik.errors.name}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box mb={0.2}>
                          <label htmlFor="name" className="label-text">
                            Creator Name:
                          </label>
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Box>
                        <Typography
                          className="disabled-text "
                          sx={{ fontSize: "14px" }}
                        >
                          {creatorName ?? "N/A"}
                        </Typography>
                      </Box>
                      {/** Customer Select Block */}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: "column",
                        width: { sm: "50%", xs: "100%" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box paddingBottom={0.6}>
                          <label className="label-text" htmlFor="status">
                            Status:{" "}
                          </label>
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Box>
                        <FormControl
                          // sx={{ width: "152px" }}
                          size="small"
                          className="custom-textfield"
                          fullWidth
                        >
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            size="small"
                            sx={{ height: "40px" }}
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            fullWidth
                          >
                            <MenuItem
                              value={projectStatus.PENDING}
                              sx={{ textTransform: "capitalize" }}
                            >
                              {projectStatus.PENDING}
                            </MenuItem>
                            <MenuItem
                              value={projectStatus.VOIDED}
                              sx={{ textTransform: "capitalize" }}
                            >
                              {projectStatus.VOIDED}
                            </MenuItem>
                            <MenuItem
                              value={projectStatus.APPROVED}
                              sx={{ textTransform: "capitalize" }}
                            >
                              {projectStatus.APPROVED}
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {/* <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                          sx={{ textTransform: "capitalize" }}
                          size="small"
                          labelId="status-label"
                          id="status"
                          name="status"
                          value={formik.values.status}
                          label="Status"
                          onChange={formik.handleChange}
                        >
                          <MenuItem
                            value={projectStatus.PENDING}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {projectStatus.PENDING}
                          </MenuItem>
                          <MenuItem
                            value={projectStatus.VOIDED}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {projectStatus.VOIDED}
                          </MenuItem>
                          <MenuItem
                            value={projectStatus.APPROVED}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {projectStatus.APPROVED}
                          </MenuItem>
                        </Select>
                      </FormControl> */}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box mb={0.2}>
                          <label htmlFor="name" className="label-text">
                            Date:
                          </label>
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Box>
                        <Typography
                          className="disabled-text "
                          sx={{ fontSize: "14px" }}
                        >
                          {createdDate}
                        </Typography>
                        {/* <TextField
                        disabled="true"
                        id="date"
                        name="creator"
                        label="Enter Create Date"
                        size="small"
                        variant="outlined"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 4,
                            backgroundColor: "white",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        value={createdDate}
                      /> */}
                      </Box>
                      {/** Address Select Block */}
                    </Box>
                  </Box>
                  <Box sx={{ width: { sm: "50%", xs: "100%" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4.5px",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        Add Notes:
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          paddingY: { sm: 0, xs: 1 },
                          width: "100%",
                        }}
                      >
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          // cols={isMobile ? 38 : 50}
                          minRows={5}
                          maxRows={19}
                          id="notes"
                          name="notes"
                          placeholder="Enter Additional Notes"
                          size="large"
                          variant="outlined"
                          sx={{ padding: "10px", resize: "vertical" }}
                          value={formik.values.notes}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.notes && formik.errors.notes}
                          helperText={
                            formik.touched.notes && formik.errors.notes
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                // flexWrap: "wrap",
                gap: 2,
                aligItems: "baseline",
                width: "100%",
              }}
            >
              <Box sx={{ width: { lg: "80%", md: "100%" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { sm: "row", xs: "column" },
                    gap: 4,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: { sm: "50%", xs: "100%" },
                      justifyContent: "space-between",
                      gap: 4,
                      flexDirection: { sm: "row", xs: "column" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: "column",
                        width: { sm: "50%", xs: "100%" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box mb={0.6}>
                          <label htmlFor="name">Select Customer:</label>
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Box>
                        <CustomInputField
                          id="customer"
                          name="customer"
                          // label="Select a Customer"
                          size="small"
                          variant="outlined"
                          onClick={handleCustomerSelect}
                          InputProps={{
                            endAdornment: selectedCustomer ? (
                              <InputAdornment
                                position="end"
                                sx={{ cursor: "pointer" }}
                                onClick={(event) => {
                                  handleCustomerUnSelect(event);
                                }}
                              >
                                <Close sx={{}} />
                              </InputAdornment>
                            ) : (
                              ""
                            ),
                            readOnly: true,
                            style: {
                              color: "black",
                              borderRadius: 4,
                              backgroundColor: "white",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                          }}
                          value={formik.values.customer}
                          onChange={() => {}}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ display: "flex", paddingX: 0.5, gap: 0.6 }}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {selectedCustomer?.email}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            paddingX: 0.5,
                            gap: 0.6,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography sx={{ fontSize: "14px" }}>
                            {selectedCustomer?.address}
                          </Typography>
                        </Box>
                      </Box>
                      {/** Customer Select Block */}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: "column",
                        width: { sm: "50%", xs: "100%" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box mb={0.6}>
                          <label htmlFor="name">Location:</label>
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Box>
                        <CustomInputField
                          disabled={!selectedCustomer}
                          id="address"
                          name="address"
                          // label="Select an Address"
                          size="small"
                          variant="outlined"
                          onClick={handleAddressSelect}
                          InputProps={{
                            endAdornment: selectedAddress ? (
                              <InputAdornment
                                position="end"
                                sx={{ cursor: "pointer" }}
                                onClick={(event) => {
                                  handleAddressUnSelect(event);
                                }}
                              >
                                <Close sx={{}} />
                              </InputAdornment>
                            ) : (
                              ""
                            ),
                            readOnly: true,
                            style: {
                              color: "black",
                              borderRadius: 4,
                              backgroundColor: "white",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                          }}
                          value={formik.values.address}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ display: "flex", paddingX: 0.5, gap: 0.5 }}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {selectedAddress?.street}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            alignItems: "baseline",
                            paddingX: 0.5,
                          }}
                        >
                          <Typography sx={{ fontSize: "14px" }}>
                            {selectedAddress?.state},
                          </Typography>
                          <Typography sx={{ fontSize: "14px" }}>
                            {selectedAddress?.city}
                          </Typography>
                          <Typography sx={{ fontSize: "14px" }}>
                            {selectedAddress?.postalCode}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", paddingX: 0.5, gap: 0.5 }}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {selectedAddress?.country}
                          </Typography>
                        </Box>
                      </Box>
                      {/** Address Select Block */}
                    </Box>
                  </Box>
                  <Box sx={{ width: { sm: "25%", xs: "50%" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box mb={0.6}>
                        <label htmlFor="name">Company Contact:</label>
                      </Box>
                      <CustomInputField
                        disabled={!selectedCustomer}
                        id="company"
                        name="company"
                        // label="Select an Address"
                        size="small"
                        variant="outlined"
                        onClick={handleCompanySelect}
                        InputProps={{
                          endAdornment: companyContact ? (
                            <InputAdornment
                              position="end"
                              sx={{ cursor: "pointer" }}
                              onClick={(event) => {
                                handleCompanyUnSelect(event);
                              }}
                            >
                              <Close sx={{}} />
                            </InputAdornment>
                          ) : (
                            ""
                          ),
                          readOnly: true,
                          style: {
                            color: "black",
                            borderRadius: 4,
                            backgroundColor: "white",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        value={formik.values.companyContact}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ display: "flex", paddingX: 0.5, gap: 0.5 }}>
                        <Typography sx={{ fontSize: "14px" }}>
                          {companyContact?.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          alignItems: "baseline",
                          paddingX: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "14px" }}>
                          {companyContact?.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/** Section 2 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "baseline",
              }}
            >
              <Box>
                {/* <Typography
                  sx={{ fontSize: { sm: "17px", xs: "15px" }, fontWeight: 600 }}
                >
                  Please fill in all fields marked with * sign.
                </Typography> */}
              </Box>
              <Box>
                <Button
                  type="submit"
                  sx={{
                    width: "150px",
                    textTransform: "initial",
                    backgroundColor: "#8477da",
                    "&:hover": {
                      backgroundColor: "#8477da",
                    },
                  }}
                  disabled={
                    !selectedCustomer ||
                    // !selectedAddress ||
                    projectName?.length < 4 ||
                    updateLoading ||
                    createLoading
                  }
                  variant="contained"
                >
                  {updateLoading || createLoading ? (
                    <CircularProgress
                      sx={{
                        color:
                          updateLoading || createLoading ? "#8477da" : "white",
                      }}
                      size={24}
                    />
                  ) : projectState === "create" ? (
                    "Save Project"
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      {/** Section 3 */}
      {projectState === "edit" && (
        <Box>
          <Box
            sx={{
              display: { sm: "flex", xs: "block" },
              justifyContent: "space-between",
              //   width: "98%",
              //  pr: 3,
              my: 3,
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
              Estimates
            </Typography>
            <Box sx={{ display: "flex", gap: 1, pt: { sm: 0, xs: 1 } }}>
              <Box>
                <CustomInputField
                  id="input-with-icon-textfield"
                  placeholder="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={icon} alt="search input" />
                      </InputAdornment>
                    ),
                  }}
                  value={search}
                  onChange={handleSearchChange}
                />
              </Box>
              <Box>
                <DesktopDatePicker
                  label="Date Added"
                  inputFormat="MM/DD/YYYY"
                  className="custom-textfield"
                  // maxDate={new Date()} // Sets the maximum date to the current date
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                      width: 150,
                      backgroundColor: "white", // Adjust height
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "0.875rem", // Adjust font size
                      padding: "8px 14px", // Adjust padding
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                      fontWeight: 400,
                      fontFamily: '"Roboto",sans-serif !important',
                      top: "-5px", // Adjust label size
                      color: "#000000",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </Box>
              <FormControl
                sx={{ width: "152px" }}
                size="small"
                // className="custom-textfield"
              >
                <Select
                  value={status}
                  className="custom-textfield"
                  id="demo-select-small"
                  size="small"
                  sx={{ height: "40px" }}
                  displayEmpty
                  onChange={(e) => setStatus(e.target.value)}
                  renderValue={(selected) => {
                    if (selected === null) {
                      return (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            // lineHeight: '16.41px',
                            color: "#000000",
                            fontFamily: '"Roboto",sans-serif !important',
                          }}
                        >
                          Status
                        </Typography>
                      );
                    }

                    return (
                      <StatusChip
                        variant={selected}
                        sx={{ padding: 0, px: 2 }}
                      />
                    );
                  }}
                >
                  <MenuItem value={"pending"}>
                    {" "}
                    <StatusChip
                      variant={"pending"}
                      sx={{ padding: 0, px: 2 }}
                    />
                  </MenuItem>
                  <MenuItem value={"voided"}>
                    {" "}
                    <StatusChip variant={"voided"} sx={{ padding: 0, px: 2 }} />
                  </MenuItem>
                  <MenuItem value={"approved"}>
                    {" "}
                    <StatusChip
                      variant={"approved"}
                      sx={{ padding: 0, px: 2 }}
                    />
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="text"
                onClick={handleResetFilter}
                sx={{
                  p: "6px 8px !important",
                  fontFamily: '"Roboto",sans-serif !important',
                }}
                // sx={{ lineHeight: "21.86px" }}
              >
                Clear Filter
              </Button>
            </Box>
          </Box>

          {/* <Typography sx={{ fontSize: "22px", fontWeight: 800, marginY: 1 }}>
            Estimates 
          </Typography> */}
          <Box
            sx={{
              boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px",
              borderRadius: "8px",
              pt: { md: 2, xs: 1 },
              // width: "99.5%",
              background: "#FFFF",
              border: "1px solid #D0D5DD",
            }}
          >
            {/** Tabs Switch */}
            <Grid sx={{ px: 1, pb: 1 }}>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                  background: "#F3F5F6",
                  width: "252.5px",
                  minHeight: "40px",
                  height: "40px",
                  p: "2px",
                  "& .MuiTab-root.Mui-selected": {
                    color: "#000000",
                    background: "#FFFF",
                    borderRadius: "4px",
                    p: "7px 12px",
                    height: "40px",
                    minHeight: "36px",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#8477DA",
                    height: 0,
                  },
                }}
              >
                <Tab
                  className="categoryTab"
                  label="Showers"
                  value={EstimateCategory.SHOWERS}
                  sx={{ minWidth: "70px" }}
                  {...a11yProps(EstimateCategory.SHOWERS)}
                />
                <Tab
                  className="categoryTab"
                  label="Mirrors"
                  value={EstimateCategory.MIRRORS}
                  sx={{ minWidth: "70px" }}
                  {...a11yProps(EstimateCategory.MIRRORS)}
                />
                <Tab
                  className="categoryTab"
                  label="Wine Cellar"
                  value={EstimateCategory.WINECELLARS}
                  sx={{ minWidth: "70px" }}
                  {...a11yProps(EstimateCategory.WINECELLARS)}
                />
              </Tabs>
            </Grid>
            {/** end */}
            {/** Showers tab */}
            <Divider sx={{ borderColor: "#D4DBDF" }} />
            <CustomTabPanel value={tabValue} index={EstimateCategory.SHOWERS}>
              <ShowerEstimatesList
                projectId={projectData?._id}
                searchValue={search}
                statusValue={status}
                dateValue={selectedDate}
              />
            </CustomTabPanel>
            {/** Mirrors tab */}
            <CustomTabPanel value={tabValue} index={EstimateCategory.MIRRORS}>
              <MirrorEstimatesList
                projectId={projectData?._id}
                searchValue={search}
                statusValue={status}
                dateValue={selectedDate}
              />
            </CustomTabPanel>
            {/** Wine Cellar tab */}
            <CustomTabPanel
              value={tabValue}
              index={EstimateCategory.WINECELLARS}
            >
              <WineCellarEstimatesList
                projectId={projectData?._id}
                searchValue={search}
                statusValue={status}
                dateValue={selectedDate}
              />
            </CustomTabPanel>
          </Box>
        </Box>
      )}
      <CustomerSelect
        open={openCustomerSelectModal}
        handleClose={() => setOpenCustomerSelectModal(false)}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={handleCustomerChange}
      />
      <PreviewLinkList
        open={openLandingList}
        handleClose={() => setOpenLandingList(false)}
      />
      <AddressSelect
        open={openAddressSelectModal}
        handleClose={() => setOpenAddressSelectModal(false)}
        selectedAddress={selectedAddress}
        setSelectedAddress={handleAddressChange}
        selectedCustomer={selectedCustomer}
      />
      <CompanySelect
        open={openCompanySelectModal}
        handleClose={() => setOpenCompanySelectModal(false)}
        selectedContact={companyContact}
        setSelectedContact={handleCompanyChange}
        selectedCustomer={selectedCustomer}
      />
      <ChooseEstimateCategoryModal
        open={openCategoryModal}
        handleClose={handleCloseCategoryModal}
        projectId={projectData?._id}
      />
    </Box>
  );
};
export default ProjectInfoComponent;
