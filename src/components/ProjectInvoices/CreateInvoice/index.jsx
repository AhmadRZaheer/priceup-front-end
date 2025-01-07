import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
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
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { backendURL, frontendURL, getDecryptedToken } from "@/utilities/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { generateInvoiceItemsFromEstimates } from "@/utilities/estimates";
import { useSelector } from "react-redux";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getListData } from "@/redux/estimateCalculations";
import dayjs from "dayjs";
import CustomInputField from "@/components/ui-components/CustomInput";
import { Close } from "@mui/icons-material";
import CustomerSelect from "../CreateEditInvoice/CustomerSelect";
import ProjectSelect from "../CreateEditInvoice/ProjectSelect";
import { EstimateCategory } from "@/utilities/constants";
import PreviewSelect from "../CreateEditInvoice/PreviewSelect";

const validationSchema = yup.object({
  project: yup.string().required("Project is required"),
  customer: yup.string().required("Customer is required"),
  dueDate: yup.string().required("Due Date is required"),
});

const CraeteInvoice = ({ projectState = "create", projectData = null }) => {
  const [searchParams] = useSearchParams();
  const customerID = searchParams.get("customer_id");
  const projectID = searchParams.get("project_id");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const companySettings = useSelector((state) => state.location);
  const WinelistData = useSelector(getWineCellarsHardware);
  const MirrorsHardwareList = useSelector(getMirrorsHardware);
  const ShowerHardwareList = useSelector(getListData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [selectedEstimateRows, setSelectedEstimateRows] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const navigate = useNavigate();
  const {
    mutateAsync: createInvoice,
    isSuccess,
    isLoading,
  } = useCreateDocument();
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
  console.log(
    formik.values.additionalUpgrades,
    "additionalUpgradesadditionalUpgrades"
  );
  const {
    data: customerList,
    refetch,
    isFetching,
    isFetched,
  } = useFetchDataCustomer();
  const {
    data: projectsList,
    isFetched: projectsListFetched,
    isFetching: projectsListFetching,
    refetch: refetchProjectsList,
  } = useFetchAllDocuments(
    `${backendURL}/projects/by-customer/${selectedCustomer?._id}`
  );

  const {
    data: estimatesList,
    isFetched: estimateListFetched,
    isFetching: estimateListFetching,
    refetch: refetchEstimateList,
  } = useFetchAllDocuments(
    `${backendURL}/projects/all-estimate/${selectedProject?._id}`
  );

  useEffect(() => {
    if (selectedProject) {
      refetchEstimateList();
    }
  }, [selectedProject]);

  const hardwaresList = {
    showers: ShowerHardwareList,
    mirrors: MirrorsHardwareList,
    wineCellars: WinelistData,
  };
  const EstimateListData = useMemo(() => {
    if (selectedEstimateRows?.length > 0) {
      const EstimateDeatilsData = generateInvoiceItemsFromEstimates(
        selectedEstimateRows,
        hardwaresList,
        companySettings
      );
      return EstimateDeatilsData;
    }
  }, [selectedEstimateRows]);

  console.log(
    EstimateListData,
    "EstimateListDataEstimateListDataEstimateListData"
  );

  useEffect(() => {
    refetch();
    if (selectedCustomer?.name) {
      refetchProjectsList();
    }
  }, [formik.values.customer]);

  const handleCraete = async (values) => {
    console.log(values, "additionalUpgradesadditionalUpgrades222222");
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
    const updatedDate = currentDate.add(15, "day");
    // ISO format mein convert karein
    // const formattedDate = currentDate.toISOString();
    const customerPayLoad = {
      link: "",
      expiresAt: updatedDate,
    };
    const compantDetail = {
      name: companySettings?.name,
      image: companySettings.image,
      address: companySettings?.address,
    };
    const data = {
      customer_id: selectedCustomer?._id,
      project_id: selectedProject?._id,
      customerPreview: customerPayLoad,
      description: values.notes,
      customer: customerObject,
      project: sourceObject,
      estimates: EstimateListData?.length > 0 ? EstimateListData : [],
      company: compantDetail,
      content: {},
      additionalUpgrades: values.additionalUpgrades,
      // subTotal: totalSum,
      // grandTotal: totalSum,
    };
  //   try {
  //     const response = await createInvoice({
  //       data,
  //       apiRoute: `${backendURL}/projects/landing-page-preview`,
  //     });
  //     console.log(response);
  //     navigate(`/invoices/edit/?item_id=${response?._id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  };

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
  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/invoices");
  //   }
  // }, [isSuccess]);

  const handleCopyPreview = (value) => {
    navigator.clipboard
      .writeText(value ?? "")
      .then(() => setCopyLink(true))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const [openCustomerSelectModal, setOpenCustomerSelectModal] = useState(false);
  const handleCustomerSelect = () => {
    setOpenCustomerSelectModal(true);
  };

  const handleCustomerUnSelect = (event) => {
    event.stopPropagation();
    setSelectedCustomer(null);
    formik.setFieldValue("customer", "");
    setSelectedProject(null);
    setSelectedPreview(null);
    formik.setFieldValue("address", "");
  };

  const handleCustomerChange = (customer) => {
    console.log(customer);
    setSelectedCustomer(customer);
    setSelectedProject(null);
    setSelectedPreview(null);
    formik.setFieldValue("address", "");
    setOpenCustomerSelectModal(false);
  };

  const [openProjectSelectModal, setOpenProjectSelectModal] = useState(false);
  const [openPreviewSelectModal, setOpenPreviewSelectModal] = useState(false);

  const handleProjectChange = (address) => {
    setSelectedProject(address);
    setOpenProjectSelectModal(false);
  };
  const handlePreviewChange = (address) => {
    setSelectedPreview(address);
    setOpenPreviewSelectModal(false);
  };
  const handleProjectUnSelect = (event) => {
    event.stopPropagation();
    setSelectedProject(null);
    formik.setFieldValue("project", "");
  };
  const handlePreviewUnSelect = (event) => {
    event.stopPropagation();
    setSelectedPreview(null);
    formik.setFieldValue("project", "");
  };
  const handleProjectSelect = () => {
    setOpenProjectSelectModal(true);
  };
  const handlePreviewSelect = () => {
    setOpenPreviewSelectModal(true);
  };

  const showerGlassTypes = useMemo(() => {
    let glassTypes = [];
    let glassAddons = [];
    let hardwareAddons = [];
    if (ShowerHardwareList?.glassType) {
      glassTypes = ShowerHardwareList?.glassType
        ?.map((item) => {
          let falseStatus = item?.options?.some(
            (_item) => _item.status === false
          );
          if (falseStatus) {
            return null;
          } else {
            return item;
          }
        })
        .filter(Boolean);
    }
    if (ShowerHardwareList?.glassAddons) {
      glassAddons = ShowerHardwareList?.glassAddons
        ?.map((item) => {
          let falseStatus = item?.options?.some(
            (_item) => _item.status === false
          );
          if (falseStatus) {
            return null;
          } else {
            return item;
          }
        })
        .filter(Boolean);
    }
    return { glassTypes, glassAddons };
  }, [ShowerHardwareList?.glassType]);
  const mirrorGlassTypes = useMemo(() => {
    let glassTypes = [];
    let glassAddons = [];
    let hardwareAddons = [];
    if (MirrorsHardwareList?.glassTypes) {
      glassTypes = MirrorsHardwareList?.glassTypes
        ?.map((item) => {
          let falseStatus = item?.options?.some(
            (_item) => _item.status === false
          );
          if (falseStatus) {
            return null;
          } else {
            return item;
          }
        })
        .filter(Boolean);
    }
    if (ShowerHardwareList?.glassAddons) {
      glassAddons = ShowerHardwareList?.glassAddons
        ?.map((item) => {
          let falseStatus = item?.options?.some(
            (_item) => _item.status === false
          );
          if (falseStatus) {
            return null;
          } else {
            return item;
          }
        })
        .filter(Boolean);
    }
    if (ShowerHardwareList?.hardwareAddons) {
      glassAddons = ShowerHardwareList?.glassAddons
        ?.map((item) => {
          let falseStatus = item?.options?.some(
            (_item) => _item.status === false
          );
          if (falseStatus) {
            return null;
          } else {
            return item;
          }
        })
        .filter(Boolean);
    }
    return { glassTypes, glassAddons };
  }, [MirrorsHardwareList?.glassTypes]);
  const wineCallerGlassTypes = useMemo(() => {
    let glassTypes = [];
    let glassAddons = [];
    let hardwareAddons = [];
    if (WinelistData?.glassType) {
      glassTypes = WinelistData?.glassType
        ?.map((item) => {
          let falseStatus = item?.options?.some(
            (_item) => _item.status === false
          );
          if (falseStatus) {
            return null;
          } else {
            return item;
          }
        })
        .filter(Boolean);
    }
    if (ShowerHardwareList?.glassAddons) {
      glassAddons = ShowerHardwareList?.glassAddons
        ?.map((item) => {
          let falseStatus = item?.options?.some(
            (_item) => _item.status === false
          );
          if (falseStatus) {
            return null;
          } else {
            return item;
          }
        })
        .filter(Boolean);
    }
    return { glassTypes, glassAddons };
  }, [WinelistData?.glassType]);

  const handleChangeGlass = () => {
    console.log("hi");
  };
  console.log(
    ShowerHardwareList,
    MirrorsHardwareList,
    WinelistData,
    "shower glass",
    MirrorsHardwareList,
    showerGlassTypes
  );

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
        <Box
          sx={
            {
              // background: "#FFFF",
            }
          }
        >
          {projectState !== "edit" && (
            <form onSubmit={formik.handleSubmit} style={{}}>
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
                    Create Invoice
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
                    Create new invoice.
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
                  {/* <Button
                    fullWidth
                    target="_blank"
                    variant="contained"
                    onClick={() =>
                      window.open(
                        `/invoices/${projectID}/customer-preview`,
                        "_blank"
                      )
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
                    View Preview Page
                  </Button> */}
                  <Button
                    type="submit"
                    sx={{
                      // width: "150px",
                      textTransform: "initial",
                      backgroundColor: "#8477da",
                      height: "44px",
                      "&:hover": {
                        backgroundColor: "#8477da",
                      },
                    }}
                    disabled={
                      formik.values.customer === "" ||
                      formik.values.project === ""  
                      // formik.values.dueDate === null ||
                      // selectedEstimateRows.length < 1 ||
                      // isLoading
                      //   ? true
                      //   : false
                    }
                    variant="contained"
                  >
                    {isLoading ? (
                      <CircularProgress sx={{ color: "#8477da" }} size={24} />
                    ) : projectState === "create" ? (
                      "Save Invoice"
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
                        value={formik.values?.customer}
                        onChange={() => {}}
                      />
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
                      <CustomInputField
                        disabled={!selectedCustomer}
                        id="address"
                        name="address"
                        size="small"
                        variant="outlined"
                        onClick={handleProjectSelect}
                        InputProps={{
                          endAdornment: selectedProject ? (
                            <InputAdornment
                              position="end"
                              sx={{ cursor: "pointer" }}
                              onClick={(event) => {
                                handleProjectUnSelect(event);
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
                        value={formik.values.project}
                      />
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
                    {/* <Box
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
                          minDate={dayjs()}
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
                    </Box> */}
                     <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box paddingBottom={0.6}>
                        <label className="label-text" htmlFor="status">
                         Preview :{" "}
                        </label>
                      </Box>
                      <CustomInputField
                        disabled={!selectedCustomer}
                        id="address"
                        name="address"
                        size="small"
                        variant="outlined"
                        onClick={handlePreviewSelect}
                        InputProps={{
                          endAdornment: selectedPreview ? (
                            <InputAdornment
                              position="end"
                              sx={{ cursor: "pointer" }}
                              onClick={(event) => {
                                handlePreviewUnSelect(event);
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
                        value={formik.values.project}
                      />
                      {/* <Typography>{selectedProject?.name}</Typography> */}
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
                    px: "16px",
                    pb:2
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
              </Box>
              {/** Section 2 */}
              {/* <Box
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
                      // width: "150px",
                      textTransform: "initial",
                      backgroundColor: "#8477da",
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
              </Box> */}
            </form>
          )}
        </Box>
      </Box>
      <CustomerSelect
        open={openCustomerSelectModal}
        handleClose={() => setOpenCustomerSelectModal(false)}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={handleCustomerChange}
      />
      <ProjectSelect
        open={openProjectSelectModal}
        handleClose={() => setOpenProjectSelectModal(false)}
        selectedAddress={selectedProject}
        setSelectedProject={handleProjectChange}
        selectedCustomer={selectedCustomer}
      />
      <PreviewSelect
        open={openPreviewSelectModal}
        handleClose={() => setOpenPreviewSelectModal(false)}
        selectedAddress={selectedProject}
        setSelectedProject={handlePreviewChange}
        selectedCustomer={selectedCustomer}
      />
    </Box>
  );
};
export default CraeteInvoice;
