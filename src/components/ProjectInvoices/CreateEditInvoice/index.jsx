import {
  Box,
  Button,
  CircularProgress,
  FormControl,
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
import ShowerEstimatesList from "./EstimatesList/showers";
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
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const companySettings = useSelector((state) => state.location);
  const WinelistData = useSelector(getWineCellarsHardware);
  const MirrorsHardwareList = useSelector(getMirrorsHardware);
  const ShowerHardwareList = useSelector(getListData);

  const [copyLink, setCopyLink] = useState(false);
  const navigate = useNavigate();
  const {
    mutateAsync: createInvoice,
    isSuccess,
    isLoading,
  } = useCreateDocument();
  const formik = useFormik({
    initialValues: {
      customer: customerID || "",
      project: projectID || "",
      dueDate: null,
      notes: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handleCraete(values);
    },
  });

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
    `${backendURL}/projects/by-customer/${formik.values.customer}`
  );

  const {
    data: estimatesList,
    isFetched: estimateListFetched,
    isFetching: estimateListFetching,
    refetch: refetchEstimateList,
  } = useFetchAllDocuments(
    `${backendURL}/projects/all-estimate/${formik.values.project}`
  );

  useEffect(() => {
    if (formik.values.project) {
      refetchEstimateList();
    }
  }, [formik.values.project]);

  const hardwaresList = {
    showers: ShowerHardwareList,
    mirrors: MirrorsHardwareList,
    wineCellars: WinelistData,
  };
  const EstimateListData = useMemo(() => {
    if (estimatesList?.length > 0) {
      const EstimateDeatilsData = generateInvoiceItemsFromEstimates(
        estimatesList,
        hardwaresList,
        companySettings
      );
      return EstimateDeatilsData;
    }
  }, [formik.values.project, estimatesList]);

  useEffect(() => {
    refetch();
    if (formik.values.customer) {
      refetchProjectsList();
    }
  }, [formik.values.customer]);

  const handleCraete = async (values) => {
    const customer = customerList?.find(
      (data) => data?._id === values.customer
    );
    const { name, email, address, phone } = customer;

    const source = projectsList?.projects?.find(
      (data) => data?._id === values.project
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
    const totalSum = EstimateListData?.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.pricing.totalPrice;
    }, 0);
    const data = {
      customer_id: values.customer,
      source_id: values.project,
      dueDate: values.dueDate,
      notes: values.notes,
      customer: customerObject,
      source: sourceObject,
      items: EstimateListData?.length > 0 ? EstimateListData : [],
      subTotal: totalSum,
      grandTotal: totalSum,
    };
    try {
      const response = await createInvoice({
        data,
        apiRoute: `${backendURL}/invoices/save`,
      });
      navigate(`/invoices/${response?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

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
            Invoice Creation
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
            Create your Invoices.
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
            {projectState === "edit" ? "Summary" : "Invoice Details"}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#FFFF",
          }}
        >
          {projectState !== "edit" && (
            <form onSubmit={formik.handleSubmit} style={{ padding: "16px" }}>
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
                        value={formik.values?.customer}
                        onChange={formik.handleChange}
                        fullWidth
                      >
                        {isFetched &&
                          customerList?.map((customer) => (
                            <MenuItem
                              key={customer._id}
                              value={customer._id}
                              sx={{ textTransform: "capitalize" }}
                            >
                              {customer.name}
                            </MenuItem>
                          ))}
                        {isFetching && (
                          <Box sx={{ textAlign: "center" }}>
                            <CircularProgress
                              size={24}
                              sx={{ color: "#8477DA" }}
                            />
                          </Box>
                        )}
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
                        {projectsListFetched &&
                        projectsList?.projects?.length > 0 ? (
                          projectsList?.projects?.map((project) => (
                            <MenuItem
                              key={project._id}
                              value={project._id}
                              sx={{ textTransform: "capitalize" }}
                            >
                              {project.name}
                            </MenuItem>
                          ))
                        ) : (
                          <Typography sx={{ textAlign: "center" }}>
                            No Project Found!
                          </Typography>
                        )}
                        {projectsListFetching && (
                          <Box sx={{ textAlign: "center" }}>
                            <CircularProgress
                              size={24}
                              sx={{ color: "#8477DA" }}
                            />
                          </Box>
                        )}
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
                        minDate={dayjs()} 
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
              <Box sx={{ width: { sm: "50%", xs: "100%" }, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
                      sx={{ padding: "10px" }}
                      value={formik.values.notes}
                      onChange={formik.handleChange}
                    />
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
                      formik.values.dueDate === null ||
                      isLoading
                        ? true
                        : false
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
            </form>
          )}
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
                    borderRight: "1px solid rgb(209, 212, 219)",
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
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
                    borderRight: "1px solid rgb(209, 212, 219)",
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    Project Detail
                  </Typography>
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
                  <Typography sx={{ fontWeight: 600 }}>Due Date</Typography>
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
    </Box>
  );
};
export default ProjectInvoiceComponent;
