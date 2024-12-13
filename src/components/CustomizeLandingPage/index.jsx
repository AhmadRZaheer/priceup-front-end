import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonBase,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import "./style.scss";
import React, { useEffect, useRef, useState } from "react";
import LogoNavBar from "../../Assets/purplelogo.svg";
import Img from "../../Assets/example.jpg";
import right_headerimage from "../../Assets/header-right-image.svg";
import bg_Header from "../../Assets/bg-Header.png";
import bgHeaderImage from "../../Assets/CustomerLandingImages/CustomerLandingHero.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../PDFFile";
import {
  backendURL,
  calculateAreaAndPerimeter,
  calculateTotal,
  getDecryptedToken,
} from "@/utilities/common";
import { Close, ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "@/redux/snackBarSlice";
import { EstimateCategory, quoteState, userRoles } from "@/utilities/constants";
import {
  getSelectedImages,
  removeImage,
  setSelectedImages,
} from "@/redux/globalEstimateForm";
import {
  calculateTotal as mirrorTotal,
  generateObjectForPDFPreview as generateObjectForMirrorPDFPreview,
  renderMeasurementSides as mirrorRenderSides,
} from "@/utilities/mirrorEstimates";
import {
  generateObjectForPDFPreview,
  renderMeasurementSides,
} from "@/utilities/estimates";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getListData } from "@/redux/estimateCalculations";
import {
  getLocationMirrorSettings,
  getLocationPdfSettings,
  getLocationShowerSettings,
  getLocationWineCellarSettings,
} from "@/redux/locationSlice";
import { useParams } from "react-router-dom";
import {
  useCreateDocument,
  useEditDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import ShowerSummary from "./summary/summary";
import BodySectionHTML from "./TermsAndConditions";
// import CustomEditor from "./summary/CustomEditor";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../StripePayment";
import SignatureCanvas from "react-signature-canvas";
import GCSLogo from "@/Assets/GCS-logo.png";
import ServiceSection from "./ServiceSection";
import WarrantySection from "./WarrantySection";
import MultipleImageUpload from "./MultipleImageUpload";
import ManainanceSection from "./Manainance";

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const controls = {
  viewPricingSubCategory: true,
  viewGrossProfit: true,
  viewSummary: true,
  viewLayoutImage: true,
  viewFabrication: true,
  viewAdditionalFields: true,
};

const CustomizeLandingPage = ({
  selectedData,
  refetchData,
  isFetched,
  isFetching,
}) => {
  const { id } = useParams();
  const totalSum = selectedData?.estimates?.reduce(
    (accumulator, currentItem) => {
      return accumulator + currentItem.pricing.totalPrice;
    },
    0
  );
  const signaturePadRef = useRef(null);
  const [signatureURL, setSignatureURL] = useState(null);
  const [isPadOpen, setIsPadOpen] = useState(false);
  const [images, setImages] = useState([]);
  const handleAddSignature = () => {
    // Get the trimmed canvas URL
    const url = signaturePadRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignatureURL(url);
    setIsPadOpen(true);
  };
  const handleClearSignature = () => {
    signaturePadRef.current.clear();
    setSignatureURL(null); // Reset the signature URL
    setIsPadOpen(false);
  };
  // const wineCellarHardwareList = useSelector(getWineCellarsHardware);
  // const mirrorsHardwareList = useSelector(getMirrorsHardware);
  // const showersHardwareList = useSelector(getListData);
  // const wineCellarLocationSettings = useSelector(getLocationWineCellarSettings);
  // const mirrorsLocationSettings = useSelector(getLocationMirrorSettings);
  // const showersLocationSettings = useSelector(getLocationShowerSettings);
  // const pdfSettings = useSelector(getLocationPdfSettings);
  // const [invoiceStatusBtn, setInvoiceStatusBtn] = useState(true);

  // const generatePDF = (data) => {
  //   // console.log("Call this function", data);
  //   if (data?.category === EstimateCategory.SHOWERS) {
  //     const formattedData = generateObjectForPDFPreview(
  //       showersHardwareList,
  //       data,
  //       showersLocationSettings?.miscPricing
  //     );
  //     const pricing = calculateTotal(
  //       formattedData,
  //       formattedData?.sqftArea,
  //       showersLocationSettings
  //     );
  //     const measurementString = renderMeasurementSides(
  //       quoteState.EDIT,
  //       formattedData?.measurements,
  //       formattedData?.layout_id
  //     );
  //     const id = data?._id;
  //     return {
  //       ...formattedData,
  //       measurements: measurementString,
  //       pricing,
  //       pdfSettings,
  //       id,
  //     };
  //   } else if (data?.category === EstimateCategory.MIRRORS) {
  //     const formattedData = generateObjectForMirrorPDFPreview(
  //       mirrorsHardwareList,
  //       data,
  //       mirrorsLocationSettings?.miscPricing
  //     );
  //     console.log(formattedData?.measurements, "data");
  //     const pricingMirror = mirrorTotal(
  //       formattedData,
  //       formattedData?.sqftArea,
  //       mirrorsLocationSettings,
  //       formattedData.measurements
  //     );

  //     const pricing = {
  //       glassPrice: pricingMirror.glass,
  //       fabricationPrice: pricingMirror.fabrication,
  //       laborPrice: pricingMirror.labor,
  //       additionalFieldPrice: pricingMirror.additionalFields,
  //       cost: pricingMirror.cost,
  //       total: pricingMirror.total,
  //       profit: pricingMirror.profitPercentage,
  //     };
  //     const measurementString = mirrorRenderSides(formattedData?.measurements);
  //     console.log(measurementString, "string ");
  //     const id = data?._id;
  //     return {
  //       ...formattedData,
  //       measurements: measurementString,
  //       pricing,
  //       id,
  //       pdfSettings,
  //     };
  //   } else if (data?.category === EstimateCategory.WINECELLARS) {
  //     const formattedData = generateObjectForPDFPreview(
  //       wineCellarHardwareList,
  //       data,
  //       wineCellarLocationSettings?.miscPricing
  //     );
  //     const pricing = calculateTotal(
  //       formattedData,
  //       formattedData?.sqftArea,
  //       wineCellarLocationSettings
  //     );
  //     const measurementString = renderMeasurementSides(
  //       quoteState.EDIT,
  //       formattedData?.measurements,
  //       formattedData?.layout_id
  //     );

  //     const { doorWeight, panelWeight, returnWeight } =
  //       calculateAreaAndPerimeter(
  //         data.config.measurements,
  //         data?.settings?.variant,
  //         data?.config?.glassType?.thickness,
  //         { doorQuantity: data.config.doorQuantity }
  //       );

  //     const id = data?._id;
  //     return {
  //       ...formattedData,
  //       measurements: measurementString,
  //       pricing,
  //       id,
  //       doorWeight,
  //       panelWeight,
  //       returnWeight,
  //       pdfSettings,
  //     };
  //   } else {
  //     console.log("Not Selected Catetory Found!");
  //   }
  // };

  // const [estimatePdfs, setEstimatePdfs] = useState([]);
  useEffect(() => {
    refetchData();
  }, []);

  const summarySections = (data, quoteNumber) => {
    if (data?.category === EstimateCategory.SHOWERS) {
      return <ShowerSummary data={data} quoteNumber={quoteNumber} />;
    } else if (data?.category === EstimateCategory.MIRRORS) {
      return <ShowerSummary data={data} quoteNumber={quoteNumber} />;
    } else if (data?.category === EstimateCategory.WINECELLARS) {
      return <ShowerSummary data={data} quoteNumber={quoteNumber} />;
    } else {
      console.log("category no found");
      return;
    }
  };

  const {
    mutate: updateInvoiceStatus,
    isLoading,
    isSuccess,
  } = useEditDocument();

  const [expanded, setExpanded] = useState(0); // Initially expand the first accordion

  const handleAccordionChange = (panelIndex) => (_, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false); // Toggle expansion
  };

  // useEffect(() => {
  //   const generatedPdfs = [];
  //   if (isFetched) {
  //     selectedData?.forEach((data, index) => {
  //       const singleEstimatePdf = generatePDF(data);
  //       if (singleEstimatePdf) {
  //         generatedPdfs.push(singleEstimatePdf);
  //       }
  //     });
  //     setEstimatePdfs(generatedPdfs);
  //   }
  // }, [
  //   selectedData,
  //   wineCellarHardwareList,
  //   mirrorsHardwareList,
  //   showersHardwareList,
  //   wineCellarLocationSettings,
  //   mirrorsLocationSettings,
  //   showersLocationSettings,
  //   pdfSettings,
  // ]);
  // console.log(estimatePdfs, "estimatePdfsestimatePdfs");
  const decodedToken = getDecryptedToken();
  // const [estimatePdf, setEstimatePdf] = useState([]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const selectedImages = useSelector(getSelectedImages);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        dispatch(
          showSnackbar({
            message: `${file.name} is larger than 1MB and will not be added.`,
            severity: "error",
          })
        );
        return false;
      }
      return true;
    });

    const fileUrls = validFiles.map((file) => URL.createObjectURL(file));
    dispatch(setSelectedImages(fileUrls));
  };

  const handleDeleteImage = (index) => {
    dispatch(removeImage(index));
  };

  // const authUser =
  //   decodedToken?.role === userRoles.ADMIN ||
  //   decodedToken?.role === userRoles.CUSTOM_ADMIN;

  // const { mutate: statusChange, isSuccess, isLoading } = useCreateDocument();
  const [descion, setDescion] = useState();
  const handleChangeStatus = (value) => {
    setDescion(value);
    // console.log(value);
    // const data = {
    //   project_id: selectedData[0]?.project_id,
    //   status: value,
    // };
    updateInvoiceStatus({
      data: { status: value },
      apiRoute: `${backendURL}/invoices/${id}`,
    });
  };
  // useEffect(() => {
  //   if (isSuccess) {
  //     setInvoiceStatusBtn(false);
  //   }
  // }, [isSuccess]);

  const [stripePromise, setStripePromise] = useState(null);
  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51PbsdGRujwjTz5jAngiBVuLGHvo6F3ALHulFXgBb9VCl2sY9oX6mQSLYv7ryU8nCqwo2XUCKBGoN2DnKBE7nFhOZ0047xQUUoC"
      )
    );
  }, []);

  return (
    <>
      <Box sx={{ bgcolor: "black", width: "100%" }}>
        {/* Navigation Bar */}
        {/* <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "center",
            py: 1,
          }}
        >
          <Box>
            <img src={LogoNavBar} alt="logo nav bar" />
          </Box>
        </Box> */}
        {/* Section Header */}
        <Box
          className="gcs-logo"
          component="a"
          href="https://gcsglassandmirror.com/"
        >
          <img src={GCSLogo} alt="logo nav bar" style={{ height: "100px" }} />
        </Box>
        <Box
          sx={{
            // width: { md: "89%", xs: "90%" },
            // m: "auto",
            backgroundImage: { md: `url(${bgHeaderImage})`, xs: "none" },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            px: { md: 12, xs: 0 },
            pt: { md: 10, xs: 0 },
            pb: { md: 12, xs: 2 },
            // mt: 3,
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: 10,
            position: "relative",
            // justifyContent: "space-around",
            height: "85vh",
          }}
        >
          <Container maxWidth="lg" sx={{}}>
            <Box sx={{ height: "74vh" }} className="content-center">
              <Typography
                variant="h1"
                sx={{
                  fontSize: "52px",
                  lineHeight: 1,
                  color: "#F95500",
                  fontWeight: 700,
                }}
              >
                Your Glass proposal for
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: "2.25rem",
                  lineHeight: "2.5rem",
                  color: "white",
                  mt: 3,
                  fontWeight: "bold",
                }}
                component="p"
              >
                2212 Sumac Drive is now available
              </Typography>
            </Box>
            <Grid
              container
              sx={{
                background: "rgba(107,96,96,.36)",
                px: "2.5rem",
                py: "1.25rem",
              }}
            >
              <Grid item xs={7} sx={{ gap: "0.125rem" }}>
                <Typography
                  sx={{
                    fontSize: "19px",
                    color: "#F95500",
                    lineHeight: "1.75rem",
                    fontWeight: 800,
                  }}
                >
                  Designed For:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "white",
                    lineHeight: "1.75rem",
                  }}
                  className="font-bold"
                >
                  David Gallegos
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    lineHeight: "1.5rem",
                    color: "white",
                  }}
                >
                  2212 Sumac Drive, Little Elm, Texas, 75068, United States
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography
                  sx={{
                    fontSize: "19px",
                    color: "#F95500",
                    lineHeight: "1.75rem",
                    fontWeight: 800,
                  }}
                >
                  Designed By:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "white",
                    lineHeight: "1.75rem",
                  }}
                  className="font-bold"
                >
                  David Gallegos
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    lineHeight: "1.5rem",
                    color: "white",
                  }}
                >
                  josh.salazar@hprtexas.com
                </Typography>
              </Grid>
            </Grid>
          </Container>

          {/* left side */}
          {/* <Box sx={{ width: { lg: 580, md: 500 } }}> */}
          {/* <Typography
              sx={{
                fontSize: { lg: "84px", md: "70px", xs: "54px" },
                fontWeight: 500,
                color: "white",
                lineHeight: { md: "101px", xs: "70px" },
              }}
            >
              Supercharge your glass business
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "18px", md: "16px", xs: "14px" },
                fontWeight: "light",
                color: "white",
                pr: 4,
                mt: 2,
              }}
            >
              We make it easy to estimate, invoice, and organize glass customers
              and their projects all from your phone.
            </Typography> */}
          {/* <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
              <Button
                // disabled={isLoading}
                onClick={() => handleChangeStatus("Paid")}
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: isLoading ? "#d8cece" : "#8477DA",
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
                {descion === "Paid" && isLoading ? (
                  <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                ) : (
                  "Approved"
                )}
              </Button>
              <Button
                onClick={() => handleChangeStatus("Voided")}
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: isLoading ? "#d8cece" : "#E22A2D",
                  height: "44px",
                  width: { sm: "auto", xs: "187px" },
                  "&:hover": { backgroundColor: "#E22A2D" },
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
                {descion === "Voided" && isLoading ? (
                  <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                ) : (
                  "Disapproved"
                )}
              </Button>
            </Box> */}
          {/* </Box> */}
          {/* right side */}
          {/* <Box
            sx={{
              position: { md: "absolute", xs: "static" },
              right: { lg: 200, md: 60 },
              top: 0,
              textAlign: { md: "end", xs: "center" },
              width: "100%",
              pointerEvents: "none",
              height:'560px'
            }}
          >
            <Payment stripePromise={stripePromise} /> */}
          {/* <img src={right_headerimage} alt="" height="560" /> */}
          {/* </Box> */}
          {/* <Box sx={{ alignSelf: "center" }}>
            {
              // selectedData?.status === "Unpaid"
              true ? (
                <Payment
                  stripePromise={stripePromise}
                  refetchData={refetchData}
                />
              ) : (
                <Box sx={{ maxWidth: 375 }}>
                  <Typography
                    sx={{
                      fontSize: { sm: "24px", xs: "32px" },
                      fontWeight: 500,
                      color: "white",
                      lineHeight: { md: "48px", xs: "32px" },
                    }}
                  >
                    Thank you for using our service!
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { lg: "18px", md: "16px", xs: "14px" },
                      fontWeight: "light",
                      color: "white",
                    }}
                  >
                    The current status of your invoice is{" "}
                    <strong>{selectedData?.status}</strong>.
                  </Typography>
                  <Typography
                    pt={1}
                    sx={{
                      fontSize: { lg: "18px", md: "16px", xs: "14px" },
                      fontWeight: "light",
                      color: "white",
                    }}
                  >
                    We appreciate your effort and will keep you updated on any
                    further developments.
                  </Typography>
                </Box>
              )
            }
          </Box> */}
        </Box>
      </Box>

      <ServiceSection />

      <Container maxWidth="xl" sx={{ pb: 4 }}>
        {/* <Payment stripePromise={stripePromise} /> */}
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ p: 5 }}>
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 500,
                lineHeight: "54px",
              }}
            >
              The Highest Quality Residential Glass Services
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "18px", md: "16px", xs: "14px" },
                fontWeight: "light",
                pr: 4,
                mt: 2,
              }}
            >
              We make it easy to estimate, invoice, and organize glass customers
              and their projects all from your phone.
            </Typography>
          </Box>
        </Box>
        {authUser && (
          <Box sx={{ textAlign: "center", pb: 1 }}>
            <Button
              variant="contained"
              onClick={handleClick}
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
              Upload Images
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
              capture={false}
            />
          </Box>
        )} */}
        {/* 
        <Box sx={{ pb: 5, px: 4 }}>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-navigation-size": "35px",
            }}
          >
            {selectedImages.length > 0 ? (
              selectedImages.map((data, index) => (
                <SwiperSlide>
                  <Card
                    key={index}
                    position="relative"
                    width="150px"
                    height="150px"
                    overflow="hidden"
                  >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="320"
                      image={data}
                    />
                    {authUser && (
                      <IconButton
                        onClick={() => handleDeleteImage(index)}
                        sx={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                        }}
                      >
                        <Close />
                      </IconButton>
                    )}
                  </Card>
                </SwiperSlide>
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "54px",
                  textAlign: "center",
                }}
              >
                No Image Selected!
              </Typography>
            )}
          </Swiper>
        </Box> */}
        {/* <Grid
          container
          sx={{
            backgroundColor: "white",
            gap: 2,
            justifyContent: "space-between",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Grid item xs={3.8}>
            <Box>
              <Typography
                sx={{
                  p: 1.5,
                  fontWeight: "bold",
                  mb: 1,
                  backgroundColor: "#CCCCCC",
                  borderRadius: 2,
                }}
              >
                Customer
              </Typography>
              <Box sx={{ px: 1.5 }}>
                <Typography>sdsdsdsdsd</Typography>
                <Typography>sdsdsdsdsd</Typography>
                <Typography>sdsdsdsdsd</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3.9}>
            <Box>
              <Typography
                sx={{
                  p: 1.5,
                  fontWeight: "bold",
                  mb: 1,
                  backgroundColor: "#CCCCCC",
                  borderRadius: 2,
                }}
              >
                Job Info
              </Typography>
              <Box sx={{ px: 1.5 }}>
                <Typography>Layout - Estimate</Typography>
                <Typography>ssss</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3.8}>
            <Box>
              <Typography
                sx={{
                  p: 1.5,
                  fontWeight: "bold",
                  mb: 1,
                  backgroundColor: "#CCCCCC",
                  borderRadius: 2,
                }}
              >
                {"GCS Glass & Mirror"}
              </Typography>
              <Box sx={{ px: 1.5 }}>
                <Typography>20634 N. 28th Street, Suite 150</Typography>
                <Typography>Phoenix, AZ 85050</Typography>
                <Typography>www.gcs.glass</Typography>
                <Typography>+1923345678987654</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid> */}

        <Box
          sx={{
            p: 2,
            mt: 4,
            background: "#F6F6FF",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              pt: 1,
              pb: 2,
              display: "flex",
              justifyContent: "space-between",
              // p: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: "38px",
                fontWeight: 600,
                lineHeight: "84px",
              }}
            >
              Quotations ({selectedData?.estimates?.length || 0})
            </Typography>
            <Typography
              sx={{
                fontSize: "38px",
                fontWeight: 600,
                lineHeight: "84px",
              }}
            >
              ${totalSum?.toFixed(2)}
            </Typography>

            {/* {!authUser && invoiceStatusBtn && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  disabled={isLoading}
                  onClick={() => handleChangeStatus(false)}
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#E22A2D",
                    height: "44px",
                    width: { sm: "auto", xs: "187px" },
                    "&:hover": { backgroundColor: "#E22A2D" },
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
                  Disapproved
                  {/* {invoiceStatus === false ? (
                  "Disapproved"
                ) : (
                  <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                )}
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => handleChangeStatus(true)}
                  fullWidth
                  variant="contained"
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
                  Approved
                  {/* {invoiceStatus ? (
                  <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                ) : (
                  "Approved"
                )} 
                </Button>
              </Box>
            )} */}
          </Box>
          {/* <Swiper
            autoHeight={true}
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }}
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-navigation-size": "35px",
              paddingBottom: "10px",
            }}
          >
            {isFetched ? (
              selectedData?.estimates?.length > 0 &&
              selectedData?.estimates?.map((data, index) => {
                const selectedSummary = summarySections(data, index + 1);
                return (
                  <SwiperSlide>
                    <Box sx={{ px: 4 }}>{selectedSummary}</Box>
                    <PDFViewer width={"100%"} height="1200px">
                    <PDFFile
                      controls={{
                        ...controls,
                      }}
                      data={{ quote: data, location: pdfLocationData }}
                      key={`pdfFile${index}`}
                    />
                  </PDFViewer> 
                  </SwiperSlide>
                );
              })
            ) : (
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            )}
          </Swiper> */}

          <Box>
            {isFetched ? (
              selectedData?.estimates?.length > 0 ? (
                selectedData?.estimates?.map((data, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === index} // Control expansion state
                    onChange={handleAccordionChange(index)} // Update state on toggle
                    sx={{ background: "#F6F6FF" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography sx={{ fontWeight: 700 }}>
                          {data?.layout} Layout - Estimate
                        </Typography>
                        <Typography sx={{ fontWeight: 700 }}>
                          ${(data?.pricing?.totalPrice).toFixed(2)}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderBottom: "1ps solid " }}>
                      <Box>
                        {/* <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: 2,
                          }}
                        >
                          {data?.quote?.settings?.name
                            ? data?.quote?.settings?.name
                            : data?.quote?.category === EstimateCategory.MIRRORS
                            ? "Mirror"
                            : "Custom"}{" "}
                          Layout - Estimate
                        </Typography> */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              width: "50%",
                              background: "white",
                              borderRadius: 1,
                              p: 2,
                              boxShadow: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 4,
                                width: "100%",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "50%",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    mb: 1.5,
                                  }}
                                >
                                  Layout Dimensions:
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography sx={{ fontWeight: "bold" }}>
                                    Dimensions:
                                  </Typography>
                                  <Typography>
                                    {data?.quote?.measurements}33
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography sx={{ fontWeight: "bold" }}>
                                    Square Foot:
                                  </Typography>
                                  <Typography>
                                    {data?.quote?.sqftArea ?? 0}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography sx={{ fontWeight: "bold" }}>
                                    Total:
                                  </Typography>
                                  <Typography>
                                    ${data?.quote?.cost?.toFixed(2) || "0.00"}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  width: "50%",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    py: 1,
                                  }}
                                >
                                  <img
                                    src="http://3.219.213.248:5000/images/layouts/layout_5.png"
                                    alt="not"
                                    style={{ height: "320px" }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              width: "50%",
                              background: "white",
                              borderRadius: 1,
                              p: 2,
                              boxShadow: 2,
                            }}
                          >
                            <MultipleImageUpload
                              images={images}
                              setImages={setImages}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                            width: "100%",
                            pt: 4,
                          }}
                        >
                          <Box
                            sx={{
                              width: "50%",
                              background: "white",
                              borderRadius: 1,
                              p: 2,
                              boxShadow: 2,
                              maxHeight: "375px",
                              overflow: "auto",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                // gap: 2,
                                // mt: 2,
                              }}
                            >
                              <>
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    mb: 1.5,
                                  }}
                                >
                                  Summary:
                                </Typography>

                                {/* Hardware Finishes */}
                                {/* {summarySection[
                                  data?.quote?.category
                                ]?.includes(pdfFields.HARDWAREFINISHES) && */}
                                {/* data?.quote?.hardwareFinishes && ( */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                  }}
                                >
                                  <Typography sx={{ fontSize: "14px" }}>
                                    Finish:
                                  </Typography>
                                  <Typography sx={{ fontSize: "12px" }}>
                                    {data?.quote?.hardwareFinishes?.name ?? ""}
                                  </Typography>
                                </Box>
                                {/* )} */}

                                {/* Handles */}
                                {/* {summarySection[
                                  data?.quote?.category
                                ]?.includes(pdfFields.HANDLES) &&
                                  data?.quote?.handles?.item && ( */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                  }}
                                >
                                  <Typography sx={{ fontSize: "14px" }}>
                                    Handles:
                                  </Typography>
                                  <Typography sx={{ fontSize: "12px" }}>
                                    {data?.quote?.handles?.item?.name ?? ""} - (
                                    {data?.quote?.handles?.count ?? 0})
                                  </Typography>
                                </Box>
                                {/* )} */}

                                {/* Door Lock */}
                                {/* {summarySection[
                                  data?.quote?.category
                                ]?.includes(pdfFields.DOORLOCK) &&
                                  data?.quote?.doorLock?.item && ( */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                  }}
                                >
                                  <Typography sx={{ fontSize: "14px" }}>
                                    Door Lock:
                                  </Typography>
                                  <Typography sx={{ fontSize: "12px" }}>
                                    {data?.quote?.doorLock?.item?.name ?? ""} -
                                    ({data?.quote?.doorLock?.count ?? 0})
                                  </Typography>
                                </Box>
                                {/* )} */}

                                {/* Hinges */}
                                {/* {summarySection[
                                  data?.quote?.category
                                ]?.includes(pdfFields.HINGES) &&
                                  data?.quote?.hinges?.item && ( */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                  }}
                                >
                                  <Typography sx={{ fontSize: "14px" }}>
                                    Hinges:
                                  </Typography>
                                  <Typography sx={{ fontSize: "12px" }}>
                                    {data?.quote?.hinges?.item?.name ?? ""} - (
                                    {data?.quote?.hinges?.count ?? 0})
                                  </Typography>
                                </Box>
                                {/* )} */}

                                {/* Mounting Details */}
                                {["channel"].includes(
                                  data?.quote?.mountingState
                                ) ? (
                                  // summarySection[
                                  //   data?.quote?.category
                                  // ]?.includes(pdfFields.MOUNTINGCHANNEL) &&
                                  // data?.quote?.mountingChannel?.item && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      mb: 1,
                                    }}
                                  >
                                    <Typography sx={{ fontSize: "14px" }}>
                                      Channel:
                                    </Typography>
                                    <Typography sx={{ fontSize: "12px" }}>
                                      {data?.quote?.mountingChannel?.item?.name}
                                    </Typography>
                                  </Box>
                                ) : (
                                  // )
                                  <>
                                    {/* {summarySection[
                                      data?.quote?.category
                                    ]?.includes(pdfFields.WALLCLAMP) &&
                                      data?.quote?.mountingClamps?.wallClamp
                                        ?.length && ( */}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                      }}
                                    >
                                      <Typography sx={{ fontSize: "14px" }}>
                                        WallClamps:
                                      </Typography>
                                      <Typography sx={{ fontSize: "12px" }}>
                                        {data?.quote?.mountingClamps?.wallClamp?.map(
                                          (row, index) =>
                                            `${row.item.name} (${row.count})
                                              
                                                `
                                        )}
                                      </Typography>
                                    </Box>
                                    {/* )} */}
                                  </>
                                )}

                                {/* Glass Addons */}
                                {/* {summarySection[
                                  data?.quote?.category
                                ]?.includes(pdfFields.GLASSADDONS) &&
                                  data?.quote?.glassAddons?.length && ( */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                  }}
                                >
                                  <Typography sx={{ fontSize: "14px" }}>
                                    Glass Addons:
                                  </Typography>
                                  <Typography sx={{ fontSize: "12px" }}>
                                    {/* {data?.quote?.glassAddons?.map(
                                          (item, index) =>
                                            `${item?.name}${commaFn(
                                              index,
                                              data?.quote?.glassAddons?.length
                                            )}`
                                        )} */}
                                  </Typography>
                                </Box>
                                {/* )} */}

                                {/* People */}
                                {/* {data?.quote?.pdfSettings?.people && ( */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                  }}
                                >
                                  <Typography sx={{ fontSize: "14px" }}>
                                    People:
                                  </Typography>
                                  <Typography sx={{ fontSize: "12px" }}>
                                    {data?.quote?.people}
                                  </Typography>
                                </Box>
                                {/* )} */}

                                {/* Hours */}
                                {/* {data?.quote?.pdfSettings?.hours && ( */}
                                <>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      mb: 1,
                                    }}
                                  >
                                    <Typography sx={{ fontSize: "14px" }}>
                                      Hours:
                                    </Typography>
                                    <Typography sx={{ fontSize: "12px" }}>
                                      {data?.quote?.hours}
                                    </Typography>
                                  </Box>
                                  {/* {pricingSection[
                                      data?.quote?.category
                                    ]?.includes(pdfFields.DOORLABORPRICE) && ( */}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      mb: 1,
                                    }}
                                  >
                                    <Typography sx={{ fontSize: "14px" }}>
                                      Hours for door:
                                    </Typography>
                                    <Typography sx={{ fontSize: "12px" }}>
                                      {data?.quote?.laborHoursForDoor ?? 0}
                                    </Typography>
                                  </Box>
                                  {/* )} */}
                                </>
                                {/* )} */}
                              </>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              width: "50%",
                              background: "white",
                              borderRadius: 1,
                              p: 2,
                              boxShadow: 2,
                              maxHeight: "375px",
                              overflow: "auto",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                // gap: 2,
                                // mt: 2,
                              }}
                            >
                              <>
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      mb: 0.5,
                                    }}
                                  >
                                    Glass Types:
                                  </Typography>
                                  {Array.from({ length: 3 }).map(
                                    (data, index) => (
                                      <Typography key={index}>
                                        Glass Option '{data?.name || "Unknown"}'
                                        has a price of '$
                                        {data?.price?.toFixed(2) ||
                                          "0.00"}' {"=>"} Want to
                                        <Box
                                          component="span"
                                          // onClick={() =>
                                          //   dispatch(
                                          //     setSelectedContent({
                                          //       type: hardwareTypes.GLASSTYPE,
                                          //       item: glass?.selectedGlass,
                                          //     })
                                          //   )
                                          // }
                                          sx={{
                                            cursor: "pointer",
                                            color: "blue",
                                          }}
                                        >
                                          {" "}
                                          apply
                                        </Box>
                                        ?
                                      </Typography>
                                    )
                                  )}
                                </Box>
                                <Box sx={{ pt: 2 }}>
                                  <Typography
                                    sx={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      mb: 0.5,
                                    }}
                                  >
                                    Glass Addons:
                                  </Typography>
                                  {Array.from({ length: 3 }).map(
                                    (data, index) => (
                                      <Typography key={index}>
                                        Glass Addon '{data?.name || "Unknown"}'
                                        has a price of '$
                                        {data?.price?.toFixed(2) ||
                                          "0.00"}' {"=>"} Want to
                                        <Box
                                          component="span"
                                          // onClick={() =>
                                          //   dispatch(
                                          //     setSelectedContent({
                                          //       type: hardwareTypes.GLASSTYPE,
                                          //       item: glass?.selectedGlass,
                                          //     })
                                          //   )
                                          // }
                                          sx={{
                                            cursor: "pointer",
                                            color: "blue",
                                          }}
                                        >
                                          {" "}
                                          apply
                                        </Box>
                                        ?
                                      </Typography>
                                    )
                                  )}
                                </Box>
                                <Box sx={{ pt: 2 }}>
                                  <Typography
                                    sx={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      mb: 0.5,
                                    }}
                                  >
                                    Hardware Addons:
                                  </Typography>
                                  {Array.from({ length: 3 }).map(
                                    (data, index) => (
                                      <Typography key={index}>
                                        Hardware Addon Option '
                                        {data?.name || "Unknown"}' has a price
                                        of '$
                                        {data?.price?.toFixed(2) ||
                                          "0.00"}' {"=>"} Want to
                                        <Box
                                          component="span"
                                          // onClick={() =>
                                          //   dispatch(
                                          //     setSelectedContent({
                                          //       type: hardwareTypes.GLASSTYPE,
                                          //       item: glass?.selectedGlass,
                                          //     })
                                          //   )
                                          // }
                                          sx={{
                                            cursor: "pointer",
                                            color: "blue",
                                          }}
                                        >
                                          {" "}
                                          apply
                                        </Box>
                                        ?
                                      </Typography>
                                    )
                                  )}
                                </Box>
                              </>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <div>No estimates available</div>
              )
            ) : (
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            )}
          </Box>
        </Box>
      </Container>

      <WarrantySection />

      <ManainanceSection />

      {/* <Container maxWidth="xl" sx={{ pb: 4 }}> */}
      {/* <CustomEditor /> */}
      {/* <Box sx={{ px: 4 }}>
          <BodySectionHTML />
        </Box>
      </Container> */}
      {/* <Box sx={{ bgcolor: "#1E1B2F", py: 5, mt: 5 }}>
        <Container maxWidth="xl">
          <Box sx={{ pb: 8 }}>
            <Typography
              sx={{
                fontSize: "48px",
                fontWeight: 500,
                lineHeight: "54px",
                textAlign: "center",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              Our Process
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", borderRight: "1px solid white" }}
            >
              <Box sx={{ display: "flex", alignItems: "end" }}>
                <Typography className="title">1</Typography>
              </Box>
              <Box className="desc-box">
                <Typography className="heading">Discovery</Typography>
                <Typography className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum nemo cumque veritatis. Velit veniam quaerat atque
                  eveniet, culpa est, porro quo nemo, consectetur saepe maxime
                  libero nostrum? Officia, explicabo cumque. eveniet, culpa est,
                  porro quo nemo, consectetur saepe maxime libero nostrum?
                  Officia, explicabo cumque.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", pl: "48px !important" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography className="title">2</Typography>
              </Box>
              <Box className="desc-box">
                <Typography className="heading">Design</Typography>
                <Typography className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum nemo cumque veritatis. Velit veniam quaerat atque
                  eveniet, culpa est, porro quo nemo, consectetur saepe maxime
                  libero nostrum? Officia, explicabo cumque. eveniet, culpa est,
                  porro quo nemo, consectetur saepe maxime libero nostrum?
                  Officia, explicabo cumque.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", borderRight: "1px solid white" }}
            >
              <Box sx={{ display: "flex", alignItems: "end" }}>
                <Typography className="title">3</Typography>
              </Box>
              <Box className="desc-box">
                <Typography className="heading">Sourcing</Typography>
                <Typography className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum nemo cumque veritatis. Velit veniam quaerat atque
                  eveniet, culpa est, porro quo nemo, consectetur saepe maxime
                  libero nostrum? Officia, explicabo cumque. eveniet, culpa est,
                  porro quo nemo, consectetur saepe maxime libero nostrum?
                  Officia, explicabo cumque.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                pl: "48px !important",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography className="title">4</Typography>
              </Box>
              <Box className="desc-box">
                <Typography className="heading">Fabrication</Typography>
                <Typography className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum nemo cumque veritatis. Velit veniam quaerat atque
                  eveniet, culpa est, porro quo nemo, consectetur saepe maxime
                  libero nostrum? Officia, explicabo cumque. eveniet, culpa est,
                  porro quo nemo, consectetur saepe maxime libero nostrum?
                  Officia, explicabo cumque.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                pl: "48px !important",
                borderRight: "1px solid white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "end" }}>
                <Typography className="title">5</Typography>
              </Box>
              <Box className="desc-box">
                <Typography className="heading">Fabrication</Typography>
                <Typography className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum nemo cumque veritatis. Velit veniam quaerat atque
                  eveniet, culpa est, porro quo nemo, consectetur saepe maxime
                  libero nostrum? Officia, explicabo cumque. eveniet, culpa est,
                  porro quo nemo, consectetur saepe maxime libero nostrum?
                  Officia, explicabo cumque.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box> */}
      <Container maxWidth="xl" sx={{}}>
        <Box sx={{ pt: 5, display: "flex", justifyContent: "end" }}>
          <Box sx={{ height: "147px", display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                alignItems: "end",
                display: "flex",
                mr: 2,
              }}
              className="font-bold"
            >
              Your Signature :{" "}
            </Typography>
            <Box
              sx={{
                width: "250px",
                height: "130px",
                backgroundColor: "#FCFCFD",
                mb: "24px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                borderBottom: "1px solid #ccc",
              }}
            >
              {isPadOpen ? (
                <>
                  <ButtonBase
                    onClick={() => {
                      setSignatureURL(null);
                      setIsPadOpen(false);
                    }}
                    sx={{
                      border: "1px solid #E3E8EF",
                      borderRadius: "100%",
                      width: "16px",
                      height: "16px",
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      background: "white",
                    }}
                  >
                    <Close
                      sx={{ color: "#4B5565", width: "10px", height: "10px" }}
                    />
                  </ButtonBase>
                  <img
                    src={signatureURL}
                    alt="Signature"
                    width={330}
                    height={200}
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      border: "1px solid #E3E8EF",
                      borderRadius: "4px",
                    }}
                  />
                </>
              ) : (
                " "
              )}
            </Box>
          </Box>

          {isPadOpen ? (
            " "
          ) : (
            <Box
              sx={{
                width: "250px",
                mb: "24px",
                // borderRadius: "4px",
                // border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <SignatureCanvas
                ref={signaturePadRef}
                penColor="darkblue"
                canvasProps={{
                  width: 250,
                  height: 130,
                  className: "signature-canvas",
                  style: { border: "1px solid #E3E8EF" },
                }}
              />
              <Stack
                sx={{ marginTop: "5px" }}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Button
                  variant="outlined"
                  onClick={handleClearSignature}
                  sx={{
                    border: "1px solid #8477DA",
                    mr: 1,
                    height: "38px",
                    color: "#8477DA",
                  }}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleAddSignature}
                  variant="contained"
                  sx={{
                    background: "#8477DA",
                    height: "38px",
                    ":hover": {
                      background: "#8477DA",
                    },
                  }}
                >
                  Signature
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Container>

      <Box sx={{ bgcolor: "#000000", width: "100%", mt: 2 }}>
        <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Typography sx={{ color: "white", fontSize: "18px" }}>
            © 2024 | All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CustomizeLandingPage;
