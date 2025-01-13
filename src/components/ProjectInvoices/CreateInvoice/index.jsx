import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  useCreateDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CustomInputField from "@/components/ui-components/CustomInput";
import SelectItemModal from "../SelectItemModal";
import { Close } from "@mui/icons-material";

const validationSchema = yup.object({
  project: yup.string().required("Project is required"),
  customer: yup.string().required("Customer is required"),
  dueDate: yup.string().required("Due Date is required"),
  preview: yup.string().required("Preview is required")
});

const CreateInvoice = () => {
  const [searchParams] = useSearchParams();
  const customerID = searchParams.get("customer_id");
  const projectID = searchParams.get("project_id");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const navigate = useNavigate();
  const {
    mutateAsync: createInvoice,
    isLoading: createInvoiceLoading,
  } = useCreateDocument();
  const formik = useFormik({
    initialValues: {
      customer: selectedCustomer?.name || "",
      project: selectedProject?.name || "",
      preview: "",
      dueDate: null,
      description: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handleCreate(values);
    },
  });
  const {
    data: customerList,
    refetch: customerListRefetch,
    isFetching: customerListFetching
  } = useFetchAllDocuments(`${backendURL}/customers`);
  const {
    data: projectList,
    isFetching: projectListFetching,
    refetch: projectListRefetch,
  } = useFetchAllDocuments(
    `${backendURL}/projects/by-customer/${selectedCustomer?._id}`
  );

  const {
    data: previewList,
    refetch: previewListRefetch,
    isFetching: previewListFetching,
  } = useFetchAllDocuments(
    `${backendURL}/projects/all-landing-page-preview/${selectedProject?._id}`
  );

  useEffect(() => {
    customerListRefetch();
  }, [])
  useEffect(() => {
    if (selectedCustomer?.name) {
      projectListRefetch();
    }
  }, [selectedCustomer]);
  useEffect(() => {
    if (selectedProject?.name) {
      previewListRefetch();
    }
  }, [selectedProject]);

  const handleCreate = async (values) => {
    try {
      const payload = {
        customer: selectedPreview.customer,
        source: selectedPreview.project,
        items: selectedPreview.estimates ?? [],
        description: values?.description,
        customer_id: selectedPreview?.customer_id,
        source_id: selectedPreview?._id,
      }
      const response = await createInvoice({
        payload,
        apiRoute: `${backendURL}/projects/landing-page-preview`,
      });
      console.log(response);
      navigate(`/invoices/edit/?item_id=${response?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (customerID && projectID) {
      const customer = customerList?.find((data) => data?._id === customerID);
      const source = projectList?.projects?.find(
        (data) => data?._id === projectID
      );
      setSelectedCustomer(customer);
      setSelectedProject(source);
    }
  }, [customerID, projectID, customerList, projectList]);

  const [openCustomerSelectModal, setOpenCustomerSelectModal] = useState(false);
  const [openProjectSelectModal, setOpenProjectSelectModal] = useState(false);
  const [openPreviewSelectModal, setOpenPreviewSelectModal] = useState(false);

  const handleOpenCustomerModal = () => {
    setOpenCustomerSelectModal(true);
  };
  const handleOpenProjectModal = () => {
    setOpenProjectSelectModal(true);
  };
  const handleOpenPreivewModal = () => {
    setOpenPreviewSelectModal(true);
  };

  const handleCustomerUnSelect = (event) => {
    event.stopPropagation();
    setSelectedCustomer(null);
    formik.setFieldValue("customer", "");
    handleProjectUnSelect(event);
    handlePreviewUnSelect();
  };

  const handleCustomerSelect = (item) => {
    setSelectedCustomer(item);
    formik.setFieldValue("customer", item.name);
    if (selectedProject) {
      handleProjectUnSelect();
    }
    if (selectedPreview) {
      handlePreviewUnSelect();
    }
    setOpenCustomerSelectModal(false);
  };

  const handleProjectSelect = (item) => {
    setSelectedProject(item);
    formik.setFieldValue("project", item.name);
    if (selectedPreview) {
      handlePreviewUnSelect();
    }
    setOpenProjectSelectModal(false);
  };

  const handleProjectUnSelect = (event) => {
    event.stopPropagation();
    setSelectedProject(null);
    formik.setFieldValue("project", "");
    handlePreviewUnSelect();
  };

  const handlePreviewSelect = (item) => {
    setSelectedPreview(item);
    formik.setFieldValue("preview", item?.name);
    setOpenPreviewSelectModal(false);
  };

  const handlePreviewUnSelect = (event) => {
    event.stopPropagation();
    setSelectedPreview(null);
    formik.setFieldValue("preview", "");
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
              <Box sx={{ display: "flex", gap: 2 }}>
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
                    formik.values.project === "" ||
                    formik.values.dueDate === null ||
                    createInvoiceLoading
                  }
                  variant="contained"
                >
                  {createInvoiceLoading ? (
                    <CircularProgress sx={{ color: "#8477da" }} size={24} />
                  ) :
                    "Save Invoice"
                  }
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
                  Invoice Details
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
                      size="small"
                      variant="outlined"
                      onClick={handleOpenCustomerModal}
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
                      onChange={() => { }}
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
                      onClick={handleOpenProjectModal}
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { sm: "25%", xs: "100%" },
                  }}
                >
                  <Box paddingBottom={0.6}>
                    <label className="label-text" htmlFor="status">
                      Preview :{" "}
                    </label>
                  </Box>
                  <CustomInputField
                    disabled={!selectedCustomer || !selectedProject}
                    id="address"
                    name="address"
                    size="small"
                    variant="outlined"
                    onClick={handleOpenPreivewModal}
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
                    value={formik.values.preview}
                  />
                  <Typography>{selectedPreview?.name}</Typography>
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
                  pb: 2
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
          </form>
        </Box>
      </Box>
      <SelectItemModal
        handleClose={() => setOpenCustomerSelectModal(false)}
        open={openCustomerSelectModal}
        itemType={'customer'}
        itemsList={customerList}
        loading={customerListFetching}
        selectedItem={selectedCustomer}
        setSelectedItem={handleCustomerSelect}
        title={'Customer'}
        key={'Customer-select-modal'}
      />
      <SelectItemModal
        handleClose={() => setOpenProjectSelectModal(false)}
        open={openProjectSelectModal}
        itemType={'project'}
        itemsList={projectList?.projects}
        loading={projectListFetching}
        selectedItem={selectedProject}
        setSelectedItem={handleProjectSelect}
        title={'Project'}
        key={'Project-select-modal'}
      />
      <SelectItemModal
        handleClose={() => setOpenPreviewSelectModal(false)}
        open={openPreviewSelectModal}
        itemType={'preview'}
        itemsList={previewList}
        loading={previewListFetching}
        selectedItem={selectedPreview}
        setSelectedItem={handlePreviewSelect}
        title={'Preview'}
        key={'Preview-select-modal'}
      />
    </Box>
  );
};
export default CreateInvoice;
