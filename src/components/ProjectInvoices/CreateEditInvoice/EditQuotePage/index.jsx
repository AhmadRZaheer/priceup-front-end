import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useMemo, useState } from "react";
import {
  useCreateDocument,
  useEditDocument,
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
import { Close, Delete } from "@mui/icons-material";
import { IconButton } from "@material-ui/core";

const validationSchema = yup.object({
  project: yup.string().required("Project is required"),
  customer: yup.string().required("Customer is required"),
  dueDate: yup.string().required("Due Date is required"),
  section1: yup.object({
    text1: yup.string().optional(),
    text2: yup.string().optional(),
  }),
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
  const [imagesArray, setImagesArray] = useState();

  const navigate = useNavigate();
  const apiPath = `${backendURL}/projects/landing-page-preview/${selectedItemId}`;
  const { data: singleItemData, refetch: refetchSingleItem } =
    useFetchSingleDocument(apiPath);

  useEffect(() => {
    if (selectedItemId) {
      refetchSingleItem();
    }
  }, [selectedItemId]);

  const { mutateAsync: EditInvoice, isSuccess, isLoading } = useEditDocument();
  const formik = useFormik({
    initialValues: {
      customer: singleItemData?.customer?.name || "",
      project: singleItemData?.project?.projectName || "",
      dueDate: dayjs(singleItemData?.customerPreview?.expiresAt) || null,
      notes: singleItemData?.description || "",
      section1: {
        text1: singleItemData?.content?.section1?.text1 || "",
        text2: singleItemData?.content?.section1?.text2 || "",
      },
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, "asaaaaaaaaaaaaa");
      handleCraete(values);
    },
  });

  // const {
  //   data: customerList,
  //   refetch,
  //   isFetching,
  //   isFetched,
  // } = useFetchDataCustomer();
  // const {
  //   data: projectsList,
  //   isFetched: projectsListFetched,
  //   isFetching: projectsListFetching,
  //   refetch: refetchProjectsList,
  // } = useFetchAllDocuments(
  //   `${backendURL}/projects/by-customer/${selectedCustomer?._id}`
  // );

  const { mutate: uploadImageLogo, data: uploadedImageLogo } =
    useEditDocument();
  const {
    mutate: uploadImageBackgroundImage,
    data: uploadedImageBackgroundImage,
  } = useEditDocument();

  // const hardwaresList = {
  //   showers: ShowerHardwareList,
  //   mirrors: MirrorsHardwareList,
  //   wineCellars: WinelistData,
  // };
  // const EstimateListData = useMemo(() => {
  //   if (selectedEstimateRows?.length > 0) {
  //     const EstimateDeatilsData = generateInvoiceItemsFromEstimates(
  //       selectedEstimateRows,
  //       hardwaresList,
  //       companySettings
  //     );
  //     return EstimateDeatilsData;
  //   }
  // }, [selectedEstimateRows]);

  // useEffect(() => {
  //   refetch();
  //   if (selectedCustomer?.name) {
  //     refetchProjectsList();
  //   }
  // }, [formik.values.customer]);

  const handleCraete = async (values) => {
    console.log(values, "submited");
    // const customer = customerList?.find(
    //   (data) => data?._id === selectedCustomer?._id
    // );
    // const { name, email, address, phone } = customer;

    // const source = projectsList?.projects?.find(
    //   (data) => data?._id === selectedProject?._id
    // );
    // const sourceObject = singleItemData?.project;
    // const customerObject = singleItemData?.customer;

    // const currentDate = values.dueDate;
    // const updatedDate = currentDate.add(15, "day");
    // // ISO format mein convert karein
    // // const formattedDate = currentDate.toISOString();
    // const customerPayLoad = {
    //   link: `${frontendURL}/customer-landing-page-preview/${selectedProject?._id}`,
    //   expiresAt: updatedDate,
    // };
    // const compantDetail = {
    //   name: companySettings?.name,
    //   image: companySettings.image,
    //   address: companySettings?.address,
    // };
    const data = {
      customerPreview: {
        ...singleItemData?.customerPreview,
        expiresAt: values.dueDate,
      },
      description: values.notes,
      content: {
        ...singleItemData?.content,
        section1: {
          ...singleItemData?.content?.section1,
          text1: values.section1?.text1,
          text2: values.section1?.text2,
        },
      },
    };
    try {
      const response = await EditInvoice({
        data: data,
        apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
      });
    refetchSingleItem();
      // navigate(`/invoices/${response?.project_id}/customer-preview`);
    } catch (error) {
      console.log(error);
    }
  };
 console.log(singleItemData,'data')
  const handleImageUploadLogo = async (event, key) => {
    const image = event.target.files[0];

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("key", key);

    await EditInvoice({
      apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
      data: formData,
    });
    refetchSingleItem();
  };

  const handleImageUploadBackgroundImage = async (event, key) => {
    const image = event.target.files[0];

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("key", key);

   await EditInvoice({
      apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
      data: formData,
    });
    refetchSingleItem();
  };

  const handleUploadEstimatesImage = async (event,key) => {
    const image = event.target.files[0]; // Get the selected files
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("key", key);

   await EditInvoice({
      apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
      data: formData,
    });
    refetchSingleItem();
    // setImagesArray(imageURL);
  };
  const handleDeleteImageFromEstimate = async (gallery,removeGalleryImage,key) => {
    const galleryFiltered = gallery?.filter((item)=>item !== removeGalleryImage);
    await EditInvoice({
      apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
      data: {
        key,
        gallery:galleryFiltered ?? [],
        removeGalleryImage
      },
    });
    refetchSingleItem();
  }

  // useEffect(() => {
  //   if (customerID && projectID) {
  //     const customer = customerList?.find((data) => data?._id === customerID);
  //     const source = projectsList?.projects?.find(
  //       (data) => data?._id === projectID
  //     );
  //     setSelectedCustomer(customer);
  //     setSelectedProject(source);
  //   }
  // }, [customerID, projectID, customerList, projectsList]);
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
                  selectedEstimateRows={[]}
                  selectedEstimates={singleItemData?.estimates}
                />
              </Box>

              <Box>
                {/* section 1 */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    Section 1
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, mt: 2, width: "70%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.2,
                        width: "50%",
                      }}
                    >
                      <Typography>Text 1</Typography>
                      <TextareaAutosize
                        style={{ width: "100%" }}
                        name="section1.text1"
                        value={formik.values.section1.text1 || ""}
                        onChange={formik.handleChange}
                        minRows={10}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.2,
                        width: "50%",
                      }}
                    >
                      <Typography>Text 2</Typography>
                      <TextareaAutosize
                        style={{ width: "100%" }}
                        name="section1.text2"
                        value={formik.values.section1.text2 || ""}
                        onChange={formik.handleChange}
                        minRows={10}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 3 }}
                  >
                    {/* section logo */}

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 400,
                          height: 340,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 3,
                        }}
                      >
                        {singleItemData?.content?.section1?.logo ||
                        uploadedImageLogo?.content?.section1?.logo ? (
                          <Box>
                            <img
                              src={`${backendURL}/${
                                singleItemData?.content?.section1?.logo ??
                                uploadedImageLogo?.content?.section1?.logo
                              }`}
                              width={400}
                              height={340}
                              alt="section image logo"
                            />
                          </Box>
                        ) : (
                          <Typography>no Image Uploaded</Typography>
                        )}
                      </Box>

                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          background: "#8477DA",
                          ":hover": {
                            background: "#8477DA",
                          },
                        }}
                      >
                        Upload logo
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={(e) =>
                            handleImageUploadLogo(e, "content.section1.logo")
                          }
                        />
                      </Button>
                    </Box>
                    {/* section background image */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 400,
                          height: 340,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 3,
                        }}
                      >
                        {singleItemData?.content?.section1?.backgroundImage ||
                        uploadedImageBackgroundImage?.content?.section1
                          ?.backgroundImage ? (
                          <Box>
                            <img
                              src={`${backendURL}/${
                                singleItemData?.content?.section1
                                  ?.backgroundImage ??
                                uploadedImageBackgroundImage?.content?.section1
                                  ?.backgroundImage
                              }`}
                              width={400}
                              height={340}
                              alt="section image backgroundImage"
                            />
                          </Box>
                        ) : (
                          <Typography>no Image Uploaded</Typography>
                        )}
                      </Box>

                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          background: "#8477DA",
                          ":hover": {
                            background: "#8477DA",
                          },
                        }}
                      >
                        Upload background image
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={(e) =>
                            handleImageUploadBackgroundImage(
                              e,
                              "content.section1.backgroundImage"
                            )
                          }
                        />
                      </Button>
                    </Box>
                  </Box>
                </Box>
                {/* section 2 */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    Section 2
                  </Typography>

                  <Typography fontWeight={"bold"}>Estimates Images</Typography>

                  {singleItemData?.estimates?.map((item,index) => 
                    <Box
                      key={item._id}
                      sx={{ display: "flex", flexDirection: "column", gap: 2, border:'1px solid #ccc' }}
                    >
                      <Typography>
                        {item?.category + "-" + item?.layout}
                      </Typography>
                      <Grid container sx={{ width: "100%", display:"flex",flexWrap:'wrap',gap:'10px'}}>
                        {item?.gallery?.map((_image) => (
                          <Box
                            sx={{
                              width: "300px",
                              height: "300px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 3,
                              position:'relative'
                            }}
                          >
                            <IconButton style={{position:'absolute',right:'10px',top:'20px',color:'red'}} onClick={()=>handleDeleteImageFromEstimate(item?.gallery,_image,`estimates.${index}.gallery`)}><Delete  /></IconButton>
                            <img
                              style={{width:'100%',height:'100%'}}
                              // src=""
                              src={`${backendURL}/${_image}`}
                              // width={400}
                              // height={340}
                              alt="section image backgroundImage"
                            />
                          </Box>
                        ))}
                      </Grid>

                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          background: "#8477DA",
                          ":hover": {
                            background: "#8477DA",
                          },
                        }}
                      >
                        Upload image
                        <input
                          type="file"
                          accept="image/*"
                          // multiple
                          hidden
                          onChange={(e) => handleUploadEstimatesImage(e,`estimates.${index}.gallery`)}
                        />
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default EditQuoteInvoice;
