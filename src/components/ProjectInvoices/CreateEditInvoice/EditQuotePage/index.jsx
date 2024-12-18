import {
  Box,
  Button,
  CircularProgress,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useMemo, useState } from "react";
import {
  useCreateDocument,
  useFetchAllDocuments,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import { backendURL, frontendURL } from "@/utilities/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { generateInvoiceItemsFromEstimates } from "@/utilities/estimates";
import { useSelector } from "react-redux";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getListData } from "@/redux/estimateCalculations";
import dayjs from "dayjs";
import EditEstimateTable from "./EditEstimateTable";

const validationSchema = yup.object({
  project: yup.string().required("Project is required"),
  customer: yup.string().required("Customer is required"),
  dueDate: yup.string().required("Due Date is required"),
});

const EditQuoteInvoice = () => {
  const [searchParams] = useSearchParams();
  const selectedItemId = searchParams.get("item_id");
  const customerID = searchParams.get("customer_id");
  const projectID = searchParams.get("project_id");
  const companySettings = useSelector((state) => state.location);
  const WinelistData = useSelector(getWineCellarsHardware);
  const MirrorsHardwareList = useSelector(getMirrorsHardware);
  const ShowerHardwareList = useSelector(getListData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEstimateRows, setSelectedEstimateRows] = useState([]);
  const navigate = useNavigate();
  const apiPath = `${backendURL}/projects/landing-page-preview/${selectedItemId}`;
  const { data: singleItemData, refetch: refetchSingleItem } =
    useFetchSingleDocument(apiPath);

  useEffect(() => {
    if (selectedItemId) {
        refetchSingleItem();
    }
  }, [selectedItemId]);

  const {
    mutateAsync: createInvoice,
    isSuccess,
    isLoading,
  } = useCreateDocument();
  const formik = useFormik({
    initialValues: {
      customer: selectedCustomer?.name || "",
      project: selectedProject?.name || "",
      dueDate:  dayjs(singleItemData?.customerPreview?.expiresAt) || null,
      notes: singleItemData?.description || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, "asaaaaaaaaaaaaa");
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
    `${backendURL}/projects/by-customer/${selectedCustomer?._id}`
  );

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

  useEffect(() => {
    refetch();
    if (selectedCustomer?.name) {
      refetchProjectsList();
    }
  }, [formik.values.customer]);

  const handleCraete = async (values) => {
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
      link: `${frontendURL}/customer-landing-page-preview/${selectedProject?._id}`,
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
    };
    try {
      const response = await createInvoice({
        data,
        apiRoute: `${backendURL}/projects/landing-page-preview`,
      });
      navigate(`/invoices/${response?.project_id}/customer-preview`);
    } catch (error) {
      console.log(error);
    }
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
                  Edit Quote Page 
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
                  Edit Quoted Page.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  fullWidth
                  target="_blank"
                  variant="contained"
                  onClick={() =>
                    window.open(
                      `/invoices/${selectedItemId}/customer-preview`,
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
                </Button>
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
                  Quote Details
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
                    <Typography>{singleItemData?.customer?.name}</Typography>
                    <Typography>{singleItemData?.customer?.email}</Typography>
                    <Typography>{singleItemData?.customer?.address}</Typography>
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

                    <Typography>
                    {singleItemData?.project?.projectName}
                    </Typography>
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
                <Box sx={{ width: { sm: "51.1%", xs: "100%" }, pt: 1 }}>
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
              </Box>
              {/** Estimate Table */}
              <Box sx={{ py: 3, px: "16px" }}>
                <EditEstimateTable
                  projectId={singleItemData?.project_id}
                  setSelectedEstimateRows={setSelectedEstimateRows}
                  selectedEstimateRows={selectedEstimateRows}
                  selectedEstimates={singleItemData?.estimates}
                />
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default EditQuoteInvoice;
