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
import { useEffect, useMemo, useState } from "react";
import {
  useCreateDocument,
  useEditDocument,
} from "@/utilities/ApiHooks/common";
import { backendURL, frontendURL, getDecryptedToken } from "@/utilities/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Add, Close } from "@mui/icons-material";
import CustomTabPanel, { a11yProps } from "@/components/CustomTabPanel";
import ShowerEstimatesList from "./EstimatesList/showers";
// import MirrorEstimatesList from "./EstimatesList/mirrors";
import { EstimateCategory, projectStatus } from "@/utilities/constants";
import CustomInputField from "@/components/ui-components/CustomInput";
import icon from "../../../Assets/search-icon.svg";
import StatusChip from "@/components/common/StatusChip";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
// import WineCellarEstimatesList from "./EstimatesList/wineCellar";
import { useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const customers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Michael Johnson" },
  { id: "4", name: "Emily Davis" },
];
const projects = [
  { id: "101", name: "Project Alpha" },
  { id: "102", name: "Project Beta" },
  { id: "103", name: "Project Gamma" },
  { id: "104", name: "Project Delta" },
];

const validationSchema = yup.object({
  project: yup.string().required("Project is required"),
  customer: yup.string().required("Customer is required"),
  dueDate: yup.string().required("Due Date is required"),
});

const routePrefix = `${backendURL}/projects`;

const ProjectInvoiceComponent = ({
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

  const [copyLink, setCopyLink] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    navigate(`/invoices/${projectData?._id}?category=${newValue}`);
  };
  const formik = useFormik({
    initialValues: {
      customer: "",
      project: "",
      dueDate: null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // const data = {
      //   name: values.name,
      //   notes: values.notes,
      //   status: values.status,
      //   customer_id: selectedCustomer?._id,
      // };
      // if (selectedAddress?._id) {
      //   data.address_id = selectedAddress?._id;
      // }
      // if (companyContact?._id) {
      //   data.contact_id = companyContact?._id;
      // }
      // try {
      //   if (projectState === "create") {
      //     const resp = await createProject({
      //       data: data,
      //       apiRoute: `${routePrefix}/save`,
      //     });
      //     navigate(`/projects/${resp?._id}`);
      //   } else {
      //     await updateProject({
      //       data: data,
      //       apiRoute: `${routePrefix}/${projectData?._id}`,
      //     });
      //   }
      // } catch (err) {
      //   console.error(err, "error");
      // }
      navigate(`/invoices/new-invoice`);
      console.log(values, "valuesvalues");
    },
  });

  const handleDateChange = (newDate, type) => {
    if (newDate) {
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

  const handleCopyPreview = (value) => {
    navigator.clipboard
      .writeText(value ?? "")
      .then(() => setCopyLink(true))
      .catch((err) => console.error("Failed to copy text: ", err));
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
            Invoice Details
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
            Create, edit and manage your Invoices.
          </Typography>
        </Box>
        {projectState !== "create" ? (
          <Box sx={{ alignSelf: "center", display: "flex", gap: 2 }}>
            {projectData?.invoicePreview?._id ? (
              <Box>
                <div className="subscribe-box">
                  <input
                    type="email"
                    className="email-input"
                    placeholder="Customer Preview Link"
                    value={`${frontendURL}/custom-landing/${projectData?.invoicePreview?._id}`}
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
                          `${frontendURL}/custom-landing/${projectData?.invoicePreview?._id}`
                        )
                      }
                    >
                      {copyLink ? (
                        <DoneOutlinedIcon sx={{ fontSize: "19px" }} />
                      ) : (
                        <ContentCopyIcon sx={{ fontSize: "19px" }} />
                      )}
                    </button>
                  </Tooltip>
                </div>
              </Box>
            ) : (
              ""
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                navigate(`/invoices/new-invoice`)
              }
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
              Edit Invoice
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>
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
            {projectState === "edit" ? 'Summary' : 'Glass Estimation'}
          </Typography>
        </Box>
        <Box
          sx={{
            // padding: { md: 2, xs: 1 },
            background: "#FFFF",
          }}
        >
         {projectState !== "edit" && <form onSubmit={formik.handleSubmit} style={{ padding: "16px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                aligItems: "baseline",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: "column",
                  width: { sm: "25%", xs: "100%" },
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
                      Select Customer:{" "}
                    </label>
                  </Box>
                  <FormControl
                    size="small"
                    className="custom-textfield"
                    fullWidth
                  >
                    <Select
                      name="customer"
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      size="small"
                      sx={{ height: "40px" }}
                      value={formik.values.customer}
                      onChange={formik.handleChange}
                      fullWidth
                    >
                      {customers.map((customer) => (
                        <MenuItem
                          key={customer.id}
                          value={customer.id}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: "column",
                  width: { sm: "25%", xs: "100%" },
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
                      Select Project:{" "}
                    </label>
                  </Box>
                  <FormControl
                    size="small"
                    className="custom-textfield"
                    fullWidth
                    disabled={formik.values.customer === "" ? true : false}
                  >
                    <Select
                      name="project"
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      size="small"
                      sx={{ height: "40px" }}
                      value={formik.values.project}
                      onChange={formik.handleChange}
                      fullWidth
                    >
                      {projects.map((project) => (
                        <MenuItem
                          key={project.id}
                          value={project.id}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: "column",
                  width: { sm: "25%", xs: "100%" },
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
                      Due Date:{" "}
                    </label>
                  </Box>
                  <Box>
                    <DesktopDatePicker
                      inputFormat="MM/DD/YYYY"
                      className="custom-textfield"
                      value={formik.values.dueDate}
                      onChange={(newDate) =>
                        formik.setFieldValue("dueDate", newDate)
                      }
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          height: 40,
                          backgroundColor: "white",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.875rem",
                          padding: "8px 14px",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "14px",
                          fontWeight: 400,
                          fontFamily: '"Roboto",sans-serif !important',
                          top: "-5px",
                          color: "#000000",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} size="small" />
                      )}
                    />
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
              <Box></Box>
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
                    formik.values.customer === "" ||
                    formik.values.project === "" ||
                    formik.values.dueDate === null
                      ? true
                      : false
                  }
                  variant="contained"
                >
                  {updateLoading || createLoading ? (
                    <CircularProgress
                      sx={{
                        color:
                          updateLoading || createLoading ? "white" : "#8477da",
                      }}
                      size={24}
                    />
                  ) : projectState === "create" ? (
                    "Save Invoice"
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Box>
            </Box>
          </form>}
          {projectState === "edit" && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  aligItems: "baseline",
                  width: "100%",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "column",
                    width: { sm: "25%", xs: "100%" },
                    borderRight:'1px solid rgb(209, 212, 219)'
                  }}
                >
                  <Typography sx={{fontWeight: 600,}} >
                    Customer Detail
                  </Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Cusomter Name:
                    <Box className="text-xs-ragular">Ahmad Ali</Box>
                  </Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Cusomter Email:<Box className="text-xs-ragular">ABC</Box>
                  </Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Phone Number:<Box className="text-xs-ragular">ABC</Box>
                  </Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Address:<Box className="text-xs-ragular">ABC</Box>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "column",
                    width: { sm: "25%", xs: "100%" },
                     borderRight:'1px solid rgb(209, 212, 219)'
                  }}
                >
                  <Typography sx={{fontWeight: 600,}} >Project Detail</Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Project Name:
                    <Box className="text-xs-ragular">Ahmad Ali</Box>
                  </Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Created Date:<Box className="text-xs-ragular">ABC</Box>
                  </Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Amount Quoted:<Box className="text-xs-ragular">ABC</Box>
                  </Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Status:<Box className="text-xs-ragular">ABC</Box>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "column",
                    width: { sm: "25%", xs: "100%" },
                   
                  }}
                >
                  <Typography sx={{fontWeight: 600,}} >Due Date</Typography>
                  <Typography
                    className="text-xs-ragular-bold"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    Due Date:
                    <Box className="text-xs-ragular">25-05-2020</Box>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 7, borderTop: "0.5px solid #d4dbdf" }}>
                <ShowerEstimatesList
                  projectId={projectData?._id}
                  searchValue={search}
                  statusValue={status}
                  dateValue={selectedDate}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
      {/** Section 3 */}
      {projectState === "edit" && (
        <Box>
          {/* <Box
            sx={{
              display: { sm: "flex", xs: "block" },
              justifyContent: "space-between",
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
                  value={selectedDate}
                  onChange={(event) =>
                    handleDateChange(event.target.value, "dateAdd")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                      width: 150,
                      backgroundColor: "white",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "0.875rem",
                      padding: "8px 14px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                      fontWeight: 400,
                      fontFamily: '"Roboto",sans-serif !important',
                      top: "-5px",
                      color: "#000000",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </Box>
              <FormControl sx={{ width: "152px" }} size="small">
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
              >
                Clear Filter
              </Button>
            </Box>
          </Box> */}
          {/* <Box
            sx={{
              boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px",
              borderRadius: "8px",
              pt: { md: 2, xs: 1 },
              background: "#FFFF",
              border: "1px solid #D0D5DD",
            }}
          > */}
          {/** Tabs Switch */}
          {/* <Grid sx={{ px: 1, pb: 1 }}>
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
            </Grid> */}
          {/** end */}
          {/** Showers tab */}
          {/* <Divider sx={{ borderColor: "#D4DBDF" }} />
            <CustomTabPanel value={tabValue} index={EstimateCategory.SHOWERS}>
              <ShowerEstimatesList
                projectId={projectData?._id}
                searchValue={search}
                statusValue={status}
                dateValue={selectedDate}
              />
            </CustomTabPanel> */}
          {/** Mirrors tab */}
          {/* <CustomTabPanel value={tabValue} index={EstimateCategory.MIRRORS}>
              <MirrorEstimatesList
                projectId={projectData?._id}
                searchValue={search}
                statusValue={status}
                dateValue={selectedDate}
              />
            </CustomTabPanel> */}
          {/** Wine Cellar tab */}
          {/* <CustomTabPanel
              value={tabValue}
              index={EstimateCategory.WINECELLARS}
            >
              <WineCellarEstimatesList
                projectId={projectData?._id}
                searchValue={search}
                statusValue={status}
                dateValue={selectedDate}
              />
            </CustomTabPanel> */}
          {/* </Box> */}
        </Box>
      )}
    </Box>
  );
};
export default ProjectInvoiceComponent;
