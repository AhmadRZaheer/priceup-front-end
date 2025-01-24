import {
  useEffect,
  useState,
} from 'react';

import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import * as yup from 'yup';

import { getListData } from '@/redux/estimateCalculations';
import { getLocationPresentationSettings } from '@/redux/locationSlice';
import { getMirrorsHardware } from '@/redux/mirrorsHardwareSlice';
import { getWineCellarsHardware } from '@/redux/wineCellarsHardwareSlice';
import {
  useCreateDocument,
  useFetchAllDocuments,
} from '@/utilities/ApiHooks/common';
import { useFetchDataCustomer } from '@/utilities/ApiHooks/customer';
import {
  backendURL,
  frontendURL,
} from '@/utilities/common';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  Box,
  Button,
  CircularProgress,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import EstimateDataList from './EstimateTable';

const validationSchema = yup.object({
  project: yup.string().required("Project is required"),
  customer: yup.string().required("Customer is required"),
  dueDate: yup.string().required("Due Date is required"),
});

const ProjectInvoiceComponent = ({
  projectState = "create",
  projectData = null,
}) => {
  const [searchParams] = useSearchParams();
  const customerID = searchParams.get("customer_id");
  const projectID = searchParams.get("project_id");
  const companySettings = useSelector((state) => state.location);
  const WinelistData = useSelector(getWineCellarsHardware);
  const MirrorsHardwareList = useSelector(getMirrorsHardware);
  const ShowerHardwareList = useSelector(getListData);
  const locationPresentationSettings = useSelector(
    getLocationPresentationSettings
  );
  console.log(locationPresentationSettings,'locationPresentationSettings')
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEstimateRows, setSelectedEstimateRows] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const filterByShowInUpgrades = (list, key) =>
    list?.[key]?.filter((item) => item.showInUpgrades === true) || [];
  const filteredShowerGlassType = filterByShowInUpgrades(
    ShowerHardwareList,
    "glassType"
  );
  const filteredShowerGlassAddon = filterByShowInUpgrades(
    ShowerHardwareList,
    "glassAddons"
  );
  const filteredShowerHardwareAddon = filterByShowInUpgrades(
    ShowerHardwareList,
    "hardwareAddons"
  );
  const filteredMirrorGlassType = filterByShowInUpgrades(
    MirrorsHardwareList,
    "glassTypes"
  );
  const filteredMirrorGlassAddon = filterByShowInUpgrades(
    MirrorsHardwareList,
    "glassAddons"
  );
  const filteredWineGlassType = filterByShowInUpgrades(
    WinelistData,
    "glassType"
  );
  const filteredWineGlassAddon = filterByShowInUpgrades(
    WinelistData,
    "glassAddons"
  );
  const filteredWineHardwareAddon = filterByShowInUpgrades(
    WinelistData,
    "hardwareAddons"
  );
  const navigate = useNavigate();
  const { mutateAsync: createInvoice, isLoading } = useCreateDocument();
  const formik = useFormik({
    initialValues: {
      customer: selectedCustomer?.name || "",
      project: selectedProject?.name || "",
      dueDate: null,
      notes: "",
      additionalUpgrades: {
        shower: {
          glassTypes: [],
          glassAddons: [],
          hardwareAddons: [],
        },
        mirror: {
          glassTypes: [],
          glassAddons: [],
        },
        wineCellar: {
          glassTypes: [],
          glassAddons: [],
          hardwareAddons: [],
        },
      },
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handleCraete(values);
    },
  });
  const { data: customerList, refetch } = useFetchDataCustomer();
  const { data: projectsList, refetch: refetchProjectsList } =
    useFetchAllDocuments(
      `${backendURL}/projects/by-customer/${selectedCustomer?._id}`
    );

  useEffect(() => {
    refetch();
    if (selectedCustomer?.name) {
      refetchProjectsList();
    }
  }, [formik.values.customer]);

  const handleCraete = async (values) => {
    const estimatesList = selectedEstimateRows?.map((item) => item._id);
    const customer = customerList?.find(
      (data) => data?._id === selectedCustomer?._id
    );
    const { name, email, address, phone } = customer;

    const source = projectsList?.projects?.find(
      (data) => data?._id === selectedProject?._id
    );
    const sourceObject = {
      projectName: source?.name,
      city: source?.addressData?.city ?? "",
      country: source?.addressData?.country ?? "",
      postalCode: source?.addressData?.postalCode ?? "",
      street: source?.addressData?.street ?? "",
      state: source?.addressData?.state ?? "",
      companyName: source?.companyData?.name ?? "",
      companyAddress: source?.companyData?.address ?? "",
    };
    const customerObject = {
      name,
      email,
      address,
      phone,
    };
    const currentDate = values.dueDate;
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateForName = new Date().toLocaleDateString(undefined, options);

    const customerPayLoad = {
      link: "",
      expiresAt: currentDate,
    };
    const compantDetail = {
      name: companySettings?.name,
      image: companySettings.image,
      address: companySettings?.address,
    };
    const data = {
      name: `Preview Created on ${dateForName} for ${estimatesList?.length} Estimates.`,
      customer_id: selectedCustomer?._id,
      project_id: selectedProject?._id,
      customerPreview: customerPayLoad,
      description: values.notes,
      customer: customerObject,
      project: sourceObject,
      estimates: estimatesList,
      company: compantDetail,
      content: {
        ...locationPresentationSettings ?? {}
      },
      additionalUpgrades: {
        shower: {
          glassTypes: filteredShowerGlassType.map((item) => item._id) ?? [],
          glassAddons: filteredShowerGlassAddon.map((item) => item._id) ?? [],
          hardwareAddons:
            filteredShowerHardwareAddon.map((item) => item._id) ?? [],
        },
        mirror: {
          glassTypes: filteredMirrorGlassType.map((item) => item._id) ?? [],
          glassAddons: filteredMirrorGlassAddon.map((item) => item._id) ?? [],
        },
        wineCellar: {
          glassTypes: filteredWineGlassType.map((item) => item._id) ?? [],
          glassAddons: filteredWineGlassAddon.map((item) => item._id) ?? [],
          hardwareAddons:
            filteredWineHardwareAddon.map((item) => item._id) ?? [],
        },
      },
    };
    try {
      const response = await createInvoice({
        data,
        apiRoute: `${backendURL}/projects/landing-page-preview`,
      });
      navigate(`/preview/edit/?item_id=${response?._id}`);
    } catch (error) {
      console.log(error);
    }
  };
console.log(locationPresentationSettings,'locationPresentationSettingslocationPresentationSettings')
  useEffect(() => {
    if (customerID && projectID) {
      const customer = customerList?.find((data) => data?._id === customerID);
      const source = projectsList?.projects?.find(
        (data) => data?._id === projectID
      );
      setSelectedCustomer(customer);
      setSelectedProject(source);
    }
  }, [customerID, projectID, customerList, projectsList]);

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
        overflowX: "hidden",
      }}
    >
      <Box>
        <Box>
          {projectState !== "edit" && (
            <form onSubmit={formik.handleSubmit} style={{}}>
              <Box
                sx={{
                  p: { sm: "0px 0px 20px 0px", xs: "20px 0px 20px 0px" },
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Button
                    sx={{ minWidth: "auto", p: "0px !important" }}
                    onClick={() =>
                      navigate(`/projects/${selectedProject?._id}`)
                    }
                  >
                    <KeyboardArrowLeftIcon
                      sx={{ fontSize: "35px", color: "black" }}
                    />
                  </Button>
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
                      Create Quote Page
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
                      Create new quote.
                    </Typography>
                  </Box>
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
                            title={
                              copyLink ? "Copied" : "Copy Customer Preview Link"
                            }
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
                      onClick={() => navigate(`/invoices/new-invoice`)}
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
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    type="submit"
                    sx={{
                      textTransform: "initial",
                      backgroundColor: "#8477da",
                      height: "44px",
                      "&:hover": {
                        backgroundColor: "#8477da",
                      },
                    }}
                    disabled={
                      formik.values.customer === "" ||
                      formik.values.project === "" ||
                      formik.values.dueDate === null ||
                      selectedEstimateRows.length < 1 ||
                      isLoading
                        ? true
                        : false
                    }
                    variant="contained"
                  >
                    {isLoading ? (
                      <CircularProgress sx={{ color: "#8477da" }} size={24} />
                    ) : projectState === "create" ? (
                      "Save Quote Page"
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  background: "#FFFF",
                }}
              >
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
                    {projectState === "edit" ? "Summary" : "Invoice Details"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    aligItems: "baseline",
                    width: "100%",
                    padding: "16px",
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
                          Customer:{" "}
                        </label>
                      </Box>
                      <Typography>{selectedCustomer?.name}</Typography>
                      <Typography>{selectedCustomer?.email}</Typography>
                      <Typography>{selectedCustomer?.address}</Typography>
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
                          Project:{" "}
                        </label>
                      </Box>
                      <Typography>{selectedProject?.name}</Typography>
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
                          minDate={dayjs().add(2, "day")}
                          onChange={(newDate) =>
                            formik.setFieldValue("dueDate", newDate)
                          }
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-root": {
                              height: 39,
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    aligItems: "baseline",
                    width: "100%",
                    padding: "16px",
                  }}
                >
                  <Box sx={{ width: { sm: "51.1%", xs: "100%" } }}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        Description:
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
                          minRows={5}
                          maxRows={19}
                          id="notes"
                          name="notes"
                          placeholder="Enter Description"
                          size="large"
                          variant="outlined"
                          sx={{ padding: "10px" }}
                          value={formik.values.notes}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/** Estimate Table */}
                <Box sx={{ py: 3, px: "16px" }}>
                  <EstimateDataList
                    projectId={selectedProject?._id}
                    setSelectedEstimateRows={setSelectedEstimateRows}
                    selectedEstimateRows={selectedEstimateRows}
                  />
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default ProjectInvoiceComponent;
