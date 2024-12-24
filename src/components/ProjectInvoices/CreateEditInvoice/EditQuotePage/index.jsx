import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  useEditDocument,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import EditEstimateTable from "./EditEstimateTable";
import { ContentCopy, Delete, DoneOutlined } from "@mui/icons-material";
import bgHeaderImage from "@/Assets/CustomerLandingImages/BannerHeadImg.png";
import GCSLogo from "@/Assets/GCS-logo.png";
import FAQSection from "./FAQSection";
import { showSnackbar } from "@/redux/snackBarSlice";
import { useDispatch } from "react-redux";

const accordionDefaultData = [
  {
    title: "Products Not Purchased Through GCS Glass & Mirror",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Damage After Installation",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Tile Cracks During Installation",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Frameless Shower Limitations",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Natural Wear and Tear",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Third-Party Coatings",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
];

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
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const selectedItemId = searchParams.get("item_id");
  const apiPath = `${backendURL}/projects/landing-page-preview/${selectedItemId}`;
  const { data: singleItemData, refetch: refetchSingleItem } =
    useFetchSingleDocument(apiPath);
  const [accordionData, setAccordionData] = useState(
    singleItemData?.content?.section5 ?? accordionDefaultData
  );
  const [copyLink, setCopyLink] = useState(false);
  const handleCopyPreview = (value) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Modern clipboard API
      navigator.clipboard
        .writeText(value ?? "")
        .then(() => {
          setCopyLink(true);
          dispatch(
            showSnackbar({ message: "Link Copied", severity: "success" })
          );
          setTimeout(() => {
            setCopyLink(false);
          }, 6000);
        })
        .catch((err) => {
          console.error("Failed to copy text using clipboard API:", err);
        });
    } else {
      alert(`Unsecure Connection:\nPlease copy the below url \n${value ?? ""}`);  
      // Fallback for older browsers
      // const textarea = document.createElement("textarea");
      // textarea.value = value ?? "";
      // textarea.style.position = "fixed"; // Prevent scrolling
      // document.body.appendChild(textarea);
      // textarea.focus();
      // textarea.select();

      // try {
      //   document.execCommand("copy");
      //   setCopyLink(true);
      //   dispatch(
      //     showSnackbar({ message: "Link Copied", severity: "success" })
      //   );
      //   setTimeout(() => {
      //     setCopyLink(false);
      //   }, 6000);
      // } catch (err) {
      //   console.error("Fallback: Failed to copy text using execCommand:", err);
      // } finally {
      //   document.body.removeChild(textarea);
      // }
    }
  };

  useEffect(() => {
    if (selectedItemId) {
      refetchSingleItem();
    }
  }, [selectedItemId]);
  useEffect(() => {
    if (singleItemData) {
      setAccordionData(
        singleItemData?.content?.section5 ?? accordionDefaultData
      );
    }
  }, [singleItemData]);

  const { mutateAsync: EditInvoice, isSuccess, isLoading } = useEditDocument();
  const formik = useFormik({
    initialValues: {
      customer: singleItemData?.customer?.name || "",
      project: singleItemData?.project?.projectName || "",
      dueDate: dayjs(singleItemData?.customerPreview?.expiresAt) || null,
      notes: singleItemData?.description || "",
      section1: {
        text1:
          singleItemData?.content?.section1?.text1 ||
          "Your GCS Estimate Presentation",
        text2:
          singleItemData?.content?.section1?.text2 ||
          "Turning your Vision into reality– Get a Precise Estimate for Your Next Project Today!",
      },
      section3: {
        card1: {
          text1:
            singleItemData?.content?.section3?.card1?.text1 ||
            "Lasting Impressions",
          text2:
            singleItemData?.content?.section3?.card1?.text2 ||
            "Replacing just the glass in your shower will give your bathroom a million-dollar look.",
        },
        card2: {
          text1:
            singleItemData?.content?.section3?.card2?.text1 || "Customer Care",
          text2:
            singleItemData?.content?.section3?.card2?.text2 ||
            "When you work with us, it’s an experience you will love from the initial contact to the final install.",
        },
        card3: {
          text1:
            singleItemData?.content?.section3?.card3?.text1 || "Fast Response",
          text2:
            singleItemData?.content?.section3?.card3?.text2 ||
            "Schedule today and let us help you design and install your next project.",
        },
        card4: {
          text1:
            singleItemData?.content?.section3?.card4?.text1 || "High Clarity",
          text2:
            singleItemData?.content?.section3?.card4?.text2 ||
            "Don’t forget to ask about our starphire ultra-clear glass. It will change your life.",
        },
      },
      section7: {
        card1: {
          text1:
            singleItemData?.content?.section7?.card1?.text1 ||
            "WAIT BEFORE FIRST USE",
          text2:
            singleItemData?.content?.section7?.card1?.text2 ||
            "If silicone was used on your project, give your silicone at least 24 hours to completely dry before first use",
        },
        card2: {
          text1:
            singleItemData?.content?.section7?.card2?.text1 ||
            "DAILY MAINTENANCE",
          text2:
            singleItemData?.content?.section7?.card2?.text2 ||
            "Crack your door after use or keep a squeegee handy to dry the inside of the shower to help with mold/mildew buildup. If your bathroom has a vent fan, use it when showering to keep the area as dry as possible. Wipe away moisture from your mirrors to maximize the life of the silver backing",
        },
        card3: {
          text1:
            singleItemData?.content?.section7?.card3?.text1 ||
            "ROUTINE CLEANING",
          text2:
            singleItemData?.content?.section7?.card3?.text2 ||
            "Never use aggressive cleaning materials (razorblades, steel wool, abrasives, etc.) to clean glass. Always use non-ammonia glass cleaner and/or alcohol to clean glass. Never use products containing hydrofluoric acid, fluorine, chlorine, or ammonia derivatives. They can damage the surface of the glass. Always clean the full surface of the glass. Spot cleaning might create halos. Never try to remove impurities with a dry or dirty cloth, as this may cause scratches or scuffs on the glass surface.",
        },
      },
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, "asaaaaaaaaaaaaa");
      handleCraete(values);
    },
  });

  const { mutate: uploadImageLogo, data: uploadedImageLogo } =
    useEditDocument();
  const {
    mutate: uploadImageBackgroundImage,
    data: uploadedImageBackgroundImage,
  } = useEditDocument();

  const handleCraete = async (values) => {
    console.log(values, "submited");

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
        section3: {
          ...singleItemData?.content?.section3,
          card1: {
            text1: values.section3?.card1?.text1,
            text2: values.section3?.card1?.text2,
          },
          card2: {
            text1: values.section3?.card2?.text1,
            text2: values.section3?.card2?.text2,
          },
          card3: {
            text1: values.section3?.card3?.text1,
            text2: values.section3?.card3?.text2,
          },
          card4: {
            text1: values.section3?.card4?.text1,
            text2: values.section3?.card4?.text2,
          },
        },
        section7: {
          ...singleItemData?.content?.section7,
          card1: {
            text1: values.section7?.card1?.text1,
            text2: values.section7?.card1?.text2,
          },
          card2: {
            text1: values.section7?.card2?.text1,
            text2: values.section7?.card2?.text2,
          },
          card3: {
            text1: values.section7?.card3?.text1,
            text2: values.section7?.card3?.text2,
          },
        },
        section5: accordionData,
      },
    };
    try {
      const response = await EditInvoice({
        data: data,
        apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
      });
      refetchSingleItem();
    } catch (error) {
      console.log(error);
    }
  };
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

  const handleUploadEstimatesImage = async (event, key) => {
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
  };
  const handleDeleteImageFromEstimate = async (
    gallery,
    removeGalleryImage,
    key
  ) => {
    const galleryFiltered = gallery?.filter(
      (item) => item !== removeGalleryImage
    );
    await EditInvoice({
      apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
      data: {
        key,
        gallery: galleryFiltered ?? [],
        removeGalleryImage,
      },
    });
    refetchSingleItem();
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
                {singleItemData?.customerPreview?.link &&
                  singleItemData?.customerPreview?.link?.length && (
                    <Box>
                      <div className="subscribe-box">
                        <input
                          type="text"
                          className="email-input"
                          placeholder="Customer Preview Link"
                          value={singleItemData?.customerPreview?.link}
                          disabled
                        />
                        <Tooltip
                          placement="top"
                          title={
                            copyLink ? "Copied" : "Copy Customer Preview Link"
                          }
                        >
                          <button
                            type="button"
                            className="subscribe-btn"
                            onClick={() =>
                              handleCopyPreview(
                                singleItemData?.customerPreview?.link
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
                  )}
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
                        minRows={3}
                        maxRows={4}
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
                  selectedEstimateRows={[]}
                  selectedEstimates={singleItemData?.estimates}
                />
              </Box>

              <Box>
                {/* section 1 */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    Hero Section
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
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        Text 1
                      </Typography>
                      <TextareaAutosize
                        style={{
                          padding: "10px",
                          borderColor: "#cccc",
                          borderRadius: "5px",
                        }}
                        className="custom-textfield"
                        color="neutral"
                        minRows={3}
                        maxRows={4}
                        name="section1.text1"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        value={formik.values.section1.text1 || ""}
                        onChange={formik.handleChange}
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
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        Text 2
                      </Typography>
                      <TextareaAutosize
                        style={{
                          padding: "10px",
                          borderColor: "#cccc",
                          borderRadius: "5px",
                        }}
                        className="custom-textfield"
                        color="neutral"
                        minRows={3}
                        maxRows={4}
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        name="section1.text2"
                        value={formik.values.section1.text2 || ""}
                        onChange={formik.handleChange}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      py: 3,
                    }}
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
                          <Box>
                            <img
                              src={GCSLogo}
                              width={400}
                              height={340}
                              alt="section image logo"
                            />
                          </Box>
                        )}
                      </Box>

                      <Button
                        disabled={isLoading}
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
                          <Box>
                            <img
                              src={bgHeaderImage}
                              width={400}
                              height={340}
                              alt="section image logo"
                            />
                          </Box>
                        )}
                      </Box>

                      <Button
                        disabled={isLoading}
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
                    Dynamic Estimates
                  </Typography>

                  <Typography fontWeight={"bold"} sx={{ pt: 1 }}>
                    Estimates Images
                  </Typography>

                  {singleItemData?.estimates?.map((item, index) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        border: "1px solid #ccc",
                        mt: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          px: 3,
                          pt: 2,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        {item?.category + "-" + item?.layout} - Estimate
                      </Typography>
                      <Grid
                        container
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        {console.log(item?.gallery, "item?.gallerydfgh")}
                        {item?.gallery !== undefined ? (
                          item?.gallery?.map((_image) => (
                            <Box
                              sx={{
                                width: "300px",
                                height: "300px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                px: 3,
                                py: 1.5,
                                position: "relative",
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  right: "18px",
                                  top: "3px",
                                  color: "red",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleDeleteImageFromEstimate(
                                    item?.gallery,
                                    _image,
                                    `estimates.${index}.gallery`
                                  )
                                }
                              >
                                <Delete />
                              </Box>
                              <img
                                style={{ width: "100%", height: "100%" }}
                                src={`${backendURL}/${_image}`}
                                alt="section image backgroundImage"
                              />
                            </Box>
                          ))
                        ) : (
                          <Typography
                            sx={{
                              height: "150px",
                              textAlign: "center",
                              width: "100%",
                              alignContent: "center",
                            }}
                          >
                            No Image Selected!
                          </Typography>
                        )}
                      </Grid>
                      <Box sx={{ px: 3, pb: 2, textAlign: "center" }}>
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
                            hidden
                            onChange={(e) =>
                              handleUploadEstimatesImage(
                                e,
                                `estimates.${index}.gallery`
                              )
                            }
                          />
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
                {/* section 3 */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    Info Cards
                  </Typography>
                  <Box sx={{ border: "1px solid #ccc", mt: 2, px: 3, pt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ alignContent: "center" }}
                      >
                        Card 1 :{" "}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 1
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          name="section3.card1.text1"
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          maxLength={20}
                          value={formik.values.section3.card1.text1 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 2
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          name="section3.card1.text2"
                          maxLength={138}
                          value={formik.values.section3.card1.text2 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    </Box>{" "}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ alignContent: "center" }}
                      >
                        Card 2 :{" "}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 1
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          name="section3.card2.text1"
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          maxLength={20}
                          value={formik.values.section3.card2.text1 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 2
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          name="section3.card2.text2"
                          maxLength={138}
                          value={formik.values.section3.card2.text2 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ alignContent: "center" }}
                      >
                        Card 3 :{" "}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 1
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          name="section3.card3.text1"
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          maxLength={20}
                          value={formik.values.section3.card3.text1 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 2
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          name="section3.card3.text2"
                          maxLength={138}
                          value={formik.values.section3.card3.text2 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ alignContent: "center" }}
                      >
                        Card 4 :{" "}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 1
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          name="section3.card4.text1"
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          maxLength={20}
                          value={formik.values.section3.card4.text1 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 2
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          name="section3.card4.text2"
                          maxLength={138}
                          value={formik.values.section3.card4.text2 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* section 4 */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    FAQs
                  </Typography>
                  <FAQSection
                    accordionData={accordionData}
                    setAccordionData={setAccordionData}
                  />
                </Box>
                {/* section 7 */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    Maintenance Cards
                  </Typography>
                  <Box sx={{ border: "1px solid #ccc", mt: 2, px: 3, pt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ alignContent: "center" }}
                      >
                        Card 1 :{" "}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 1
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          name="section7.card1.text1"
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          maxLength={23}
                          value={formik.values.section7.card1.text1 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 2
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          name="section7.card1.text2"
                          maxLength={139}
                          value={formik.values.section7.card1.text2 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    </Box>{" "}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ alignContent: "center" }}
                      >
                        Card 2 :{" "}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 1
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          name="section7.card2.text1"
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          maxLength={23}
                          value={formik.values.section7.card2.text1 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 2
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          name="section7.card2.text2"
                          maxLength={258}
                          value={formik.values.section7.card2.text2 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ alignContent: "center" }}
                      >
                        Card 3 :{" "}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 1
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          name="section7.card3.text1"
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          maxLength={23}
                          value={formik.values.section7.card3.text1 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.2,
                          width: "30%",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Text 2
                        </Typography>
                        <TextareaAutosize
                          style={{
                            padding: "10px",
                            borderColor: "#cccc",
                            borderRadius: "5px",
                          }}
                          className="custom-textfield"
                          color="neutral"
                          minRows={3}
                          maxRows={4}
                          placeholder="Enter Text"
                          size="large"
                          variant="outlined"
                          name="section7.card3.text2"
                          maxLength={500}
                          value={formik.values.section7.card3.text2 || ""}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    </Box>
                  </Box>
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
