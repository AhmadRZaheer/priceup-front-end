import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomerSelect from "./CustomerSelect";
import { useMemo, useState } from "react";
import {
  useCreateDocument,
  useEditDocument,
} from "@/utilities/ApiHooks/common";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { useNavigate } from "react-router-dom";
import { Add, Close } from "@mui/icons-material";
import CustomTabPanel, { a11yProps } from "@/components/CustomTabPanel";
import ShowerEstimatesList from "./EstimatesList/showers";
import MirrorEstimatesList from "./EstimatesList/mirrors";
import { projectStatus } from "@/utilities/constants";
import AddressSelect from "./AddressSelect";
import CustomInputField from "@/components/ui-components/CustomInput";
import icon from "../../../Assets/search-icon.svg";
import ChooseEstimateCategoryModal from "./ChooseEstimateCategoryModal";

const validationSchema = yup.object({
  name: yup.string().required("Project Name is required"),
  status: yup.string().required("Project Status is required"),
});
const routePrefix = `${backendURL}/projects`;

const ProjectInfoComponent = ({
  projectState = "create",
  projectData = null,
}) => {
  const decryptedToken = getDecryptedToken();
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
  const [openCustomerSelectModal, setOpenCustomerSelectModal] = useState(false);
  const [openAddressSelectModal, setOpenAddressSelectModal] = useState(false);
  const [activeTabNumber, setActiveTabNumber] = useState(0); // 0 for showers, 1 for mirrors
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setActiveTabNumber(newValue);
  };

  const formik = useFormik({
    initialValues: {
      name: projectData?.name || "",
      status: projectData?.status || projectStatus.PENDING,
      customer: selectedCustomer?.name || "",
      address: selectedAddress?.name || "",
      notes: projectData?.notes || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        notes: values.notes,
        status: values.status,
        address_id: selectedAddress?._id,
        customer_id: selectedCustomer?._id,
      };
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
  const handleAddressUnSelect = (event) => {
    event.stopPropagation();
    setSelectedAddress(null);
    formik.setFieldValue("address", "");
  };
  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    setOpenAddressSelectModal(false);
  };
  //Serach State
  const [search, setSearch] = useState("");

  //Craete Model
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const handleOpenCategoryModal = () => setOpenCategoryModal(true);
  const handleCloseCategoryModal = () => setOpenCategoryModal(false);

  return (
    <Box
      sx={{
        background: "transparent",
        padding: { sm: 1.5, xs: "60px 8px 8px 8px" },
        width: { sm: "auto", xs: "auto", margin: "0px auto" },
      }}
    >
      <Box
        sx={{
          p: "20px 20px 20px 8px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { lg: 24, md: 20 },
              fontWeight: 600,
              color: "#5D6164",
              display: "flex",
              gap: 1,
            }}
          >
            Glass Estimation

            <Box sx={{ fontSize: { lg: 24, md: 20 }, fontWeight: 600, color: "#000000" }}>
              {projectState !== "create" ? '/ Project Details' : ''}
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "rgba(33, 37, 40, 1)",
              fontSize: { lg: 16, md: 14 },
              fontWeight: 600,
            }}
          >
            Create, edit and manage your Projects.
          </Typography>
        </Box>
        {projectState !== "create" ? <Box>
          <Button
            fullWidth
            variant="contained"
            onClick={handleOpenCategoryModal}
            sx={{
              backgroundColor: "#8477DA",
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 2,
              fontSize: { lg: 17, md: 15 },
              padding: 1,
              px: 2,
            }}
          >
            <Add color="white" sx={{ mr: 1 }} />
            Create New Estimate
          </Button>
        </Box> : ''}

      </Box>

      {/* <Typography sx={{ fontSize: "22px", fontWeight: 800, marginBottom: 1.5 }}>
        Project
      </Typography> */}
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
          border: "1px solid #D4DBDF",
          padding: { md: 2, xs: 1 },
          background:'#FFFF'
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          {/** Section 1 */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              aligItems: "baseline",
            }}
          >
            {/** Project Detail Block */}

            <Box sx={{ width: { md: "auto", xs: "100%" } }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 800 }}>
                Detail
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  padding: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { sm: "row", xs: "column" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingY: { sm: 0, xs: 2 },
                    }}
                  >
                    <Box
                      sx={{
                        display: { sm: "block", xs: "none" },
                        marginBottom: 1,
                      }}
                    >
                      <label htmlFor="name">Creater</label>
                      <span style={{ color: "red" }}>*</span>
                    </Box>
                    <CustomInputField
                      disabled={true}
                      id="creator"
                      name="creator"
                      // label="Enter Creator Name"
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
                      value={creatorName}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingY: { sm: 0, xs: 2 },
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: { sm: "block", xs: "none" },
                        marginBottom: 1,
                      }}
                    >
                      <label htmlFor="status">Status</label>
                      <span style={{ color: "red" }}>*</span>
                    </Box>
                    <FormControl fullWidth>
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
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { sm: "row", xs: "column" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingY: { sm: 0, xs: 2 },
                    }}
                  >
                    <Box
                      sx={{
                        display: { sm: "block", xs: "none" },
                        marginBottom: 1,
                      }}
                    >
                      <label htmlFor="name">Date</label>
                      <span style={{ color: "red" }}>*</span>
                    </Box>
                    <TextField
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
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingY: { sm: 0, xs: 2 },
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: { sm: "block", xs: "none" },
                        marginBottom: 1,
                      }}
                    >
                      <label htmlFor="status">Name</label>
                      <span style={{ color: "red" }}>*</span>
                    </Box>
                    <TextField
                      id="name"
                      name="name"
                      label="Enter Project Name"
                      size="small"
                      variant="outlined"
                      InputProps={{
                        endAdornment: formik.values.name ? (
                          <InputAdornment
                            position="end"
                            sx={{ cursor: "pointer" }}
                            onClick={() => { }}
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
                </Box>
                <Typography sx={{ fontSize: "17px", fontWeight: 600 }}>
                  Additional Notes
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
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
                      color="neutral"
                      // cols={isMobile ? 38 : 50}
                      minRows={5}
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
                      helperText={formik.touched.notes && formik.errors.notes}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            {/** Customer Select Block */}
            <Box sx={{ width: { md: "auto", xs: "100%" } }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 800 }}>
                Customer
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  padding: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    paddingY: { sm: 0, xs: 2 },
                  }}
                >
                  <Box
                    sx={{
                      display: { sm: "block", xs: "none" },
                      marginBottom: 1,
                    }}
                  >
                    <label htmlFor="name">Customer</label>
                    <span style={{ color: "red" }}>*</span>
                  </Box>
                  <TextField
                    id="customer"
                    name="customer"
                    label="Select a Customer"
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
                    onChange={() => { }}
                  />
                </Box>
                <Box sx={{ display: "flex", paddingX: 0.5, gap: 0.6 }}>
                  <Typography>{selectedCustomer?.email}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    paddingX: 0.5,
                    gap: 0.6,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography>{selectedCustomer?.address}</Typography>
                </Box>
              </Box>
            </Box>
            {/** Address Select Block */}
            <Box sx={{ width: { md: "auto", xs: "100%" } }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 800 }}>
                Address
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  padding: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    paddingY: { sm: 0, xs: 2 },
                  }}
                >
                  <Box
                    sx={{
                      display: { sm: "block", xs: "none" },
                      marginBottom: 1,
                    }}
                  >
                    <label htmlFor="name">Project Location</label>
                    <span style={{ color: "red" }}>*</span>
                  </Box>
                  <TextField
                    disabled={!selectedCustomer}
                    id="address"
                    name="address"
                    label="Select an Address"
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
                <Box sx={{ display: "flex", paddingX: 0.5, gap: 0.5 }}>
                  <Typography sx={{ fontSize: "16px" }}>
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
                  <Typography sx={{ fontSize: "16px" }}>
                    {selectedAddress?.state},
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {selectedAddress?.city}
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {selectedAddress?.postalCode}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", paddingX: 0.5, gap: 0.5 }}>
                  <Typography sx={{ fontSize: "16px" }}>
                    {selectedAddress?.country}
                  </Typography>
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
              <Typography
                sx={{ fontSize: { sm: "17px", xs: "15px" }, fontWeight: 600 }}
              >
                Please fill in all fields marked with * sign.
              </Typography>
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
                disabled={!selectedCustomer || !selectedAddress}
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
                  "Save Project"
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      {/** Section 3 */}
      {projectState === "edit" && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              //   width: "98%",
              //  pr: 3,
              my: 3,
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
              Estimates
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <CustomInputField
                id="input-with-icon-textfield"
                placeholder="Search by User Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={icon} alt="search input" />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FormControl
                sx={{ width: "152px" }}
                size="small"
                className="custom-textfield"
              >
                <InputLabel
                  id="demo-select-small-label"
                  className="input-label"
                >
                  Status
                </InputLabel>
                <Select
                  // value={age}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Status"
                  size="small"
                  sx={{ height: "40px" }}
                // onChange={handleChange}
                >
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"inActive"}>inActive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* <Typography sx={{ fontSize: "22px", fontWeight: 800, marginY: 1 }}>
            Estimates 
          </Typography> */}
          <Box
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "5px",
              pt: { md: 2, xs: 1 },
              width:'99.5%',
              background:'#FFFF',
            }}
          >
            {/** Tabs Switch */}
            <Grid sx={{ width: "202px", px: 1 ,pb:1}}>
              <Tabs
                value={activeTabNumber}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  border: "0.5px solid #D0D5DD",
                  borderRadius: "6px",
                  background: "#D0D5DD",
                  //   p: 0.1,
                  "& .MuiTab-root.Mui-selected": {
                    color: "#000000",
                    background: "#FFFF",
                    borderRadius: "4px",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#8477DA",
                    height: 0,
                  },
                }}
              >
                <Tab
                  label="Showers"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#000000",
                    textTransform: "capitalize",
                  }}
                  {...a11yProps(0)}
                />
                <Tab
                  label="Mirrors"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#000000",
                    textTransform: "capitalize",
                  }}
                  {...a11yProps(1)}
                />
              </Tabs>
            </Grid>
            {/** end */}
            {/** Showers tab */}
            <Divider sx={{ borderColor: "#D4DBDF" }} />
            <CustomTabPanel value={activeTabNumber} index={0}>
              <ShowerEstimatesList projectId={projectData?._id} />
            </CustomTabPanel>
            {/** Mirrors tab */}
            <CustomTabPanel value={activeTabNumber} index={1}>
              <MirrorEstimatesList projectId={projectData?._id} />
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
      <AddressSelect
        open={openAddressSelectModal}
        handleClose={() => setOpenAddressSelectModal(false)}
        selectedAddress={selectedAddress}
        setSelectedAddress={handleAddressChange}
        selectedCustomer={selectedCustomer}
      />
      <ChooseEstimateCategoryModal open={openCategoryModal}
        handleClose={handleCloseCategoryModal}
        projectId={projectData?._id}
      />
    </Box>
  );
};
export default ProjectInfoComponent;
