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
import React, { useEffect, useMemo, useRef, useState } from "react";
import LogoNavBar from "../../Assets/purplelogo.svg";
import Img from "../../Assets/example.jpg";
import right_headerimage from "../../Assets/header-right-image.svg";
import bg_Header from "../../Assets/bg-Header.png";
import bgHeaderImage from "../../Assets/CustomerLandingImages/BannerHeadImg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../PDFFile";
import Bulb from "../../Assets/CustomerLandingImages/blubImg.png";
import {
  backendURL,
  calculateAreaAndPerimeter,
  calculateDiscount,
  calculateTotal,
  getDecryptedToken,
} from "@/utilities/common";
import { Add, Close, ExpandMore, Remove } from "@mui/icons-material";
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
import HeaderSection from "./HeaderSection";
import ChoiceGCS from "./ChoiceGCS";
import LimitationsSection from "./Limitations";
import ClaimSection from "./ClaimSection";
import UpgradeOPtions from "./UpgradeOptions";
import AggremantCondition from "./AggremantCondition";
import SigntureSection from "./SigntureSection";
import LandingPDFFile from "../PDFFile/LandingPagePdf";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import SingleAccordian from "./SingleAccordian";
import { getEstimatesList } from "@/redux/customerEstimateCalculation";
import CustomSwiper from "../CustomSwiper";

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const controls = {
  viewPricingSubCategory: true,
  viewGrossProfit: true,
  viewSummary: true,
  viewLayoutImage: true,
  viewFabrication: true,
  viewAdditionalFields: true,
};

const pdfLocationData = {
  name: "GCS Glass & Mirror",
  street: "20634 N. 28th Street, Suite 150",
  state: "Phoenix",
  zipCode: "AZ 85050",
  website: "www.gcs.glass",
};

const CustomizeLandingPage = ({
  selectedData,
  refetchData,
  isFetched,
  isFetching,
  // showerHardwaresList,
  // mirrorHardwaresList,
  // wineCellarHardwaresList,
  // wineCellarLocationSettings,
  // mirrorsLocationSettings,
  // showersLocationSettings,
  // pdfSettings,
}) => {
  console.log(selectedData,'selectedDataselectedData')
  const { id } = useParams();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const signaturePadRef = useRef(null);
  const [totalSum, SetTotalSum] = useState(0);
  const [signatureURL, setSignatureURL] = useState(null);
  const [isPadOpen, setIsPadOpen] = useState(false);
  const [images, setImages] = useState([]);
  const estimatesList = useSelector(getEstimatesList);
  const showerHardwaresList = useSelector(getListData);
  const mirrorHardwaresList = useSelector(getMirrorsHardware);
  const wineCellarHardwaresList = useSelector(getWineCellarsHardware);
  const wineCellarLocationSettings = useSelector(getLocationWineCellarSettings);
  const mirrorsLocationSettings = useSelector(getLocationMirrorSettings);
  const showersLocationSettings = useSelector(getLocationShowerSettings);
  const pdfSettings = useSelector(getLocationPdfSettings);
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
  // const wineCellarLocationSettings = useSelector(getLocationWineCellarSettings);
  // const mirrorsLocationSettings = useSelector(getLocationMirrorSettings);
  // const showersLocationSettings = useSelector(getLocationShowerSettings);
  // const pdfSettings = useSelector(getLocationPdfSettings);
  // const [invoiceStatusBtn, setInvoiceStatusBtn] = useState(true);

  const generatePDF = (data) => {
    console.log(data, "generatePDFgeneratePDF");
    // console.log("Call this function", data);
    if (data?.category === EstimateCategory.SHOWERS) {
      const formattedData = generateObjectForPDFPreview(
        showerHardwaresList,
        data,
        showersLocationSettings?.miscPricing
      );
      const pricing = calculateTotal(
        formattedData,
        formattedData?.sqftArea,
        showersLocationSettings
      );
      const measurementString = renderMeasurementSides(
        quoteState.EDIT,
        formattedData?.measurements,
        formattedData?.layout_id
      );
      const id = data?._id;
      return {
        ...formattedData,
        measurements: measurementString,
        pricing,
        pdfSettings,
        id,
      };
    } else if (data?.category === EstimateCategory.MIRRORS) {
      const formattedData = generateObjectForMirrorPDFPreview(
        mirrorHardwaresList,
        data,
        mirrorsLocationSettings?.miscPricing
      );
      console.log(formattedData?.measurements, "data");
      const pricingMirror = mirrorTotal(
        formattedData,
        formattedData?.sqftArea,
        mirrorsLocationSettings,
        formattedData.measurements
      );

      const pricing = {
        glassPrice: pricingMirror.glass,
        fabricationPrice: pricingMirror.fabrication,
        laborPrice: pricingMirror.labor,
        additionalFieldPrice: pricingMirror.additionalFields,
        cost: pricingMirror.cost,
        total: pricingMirror.total,
        profit: pricingMirror.profitPercentage,
      };
      const measurementString = mirrorRenderSides(formattedData?.measurements);
      console.log(measurementString, "string ");
      const id = data?._id;
      return {
        ...formattedData,
        measurements: measurementString,
        pricing,
        id,
        pdfSettings,
      };
    } else if (data?.category === EstimateCategory.WINECELLARS) {
      const formattedData = generateObjectForPDFPreview(
        wineCellarHardwaresList,
        data,
        wineCellarLocationSettings?.miscPricing
      );
      const pricing = calculateTotal(
        formattedData,
        formattedData?.sqftArea,
        wineCellarLocationSettings
      );
      const measurementString = renderMeasurementSides(
        quoteState.EDIT,
        formattedData?.measurements,
        formattedData?.layout_id
      );

      const { doorWeight, panelWeight, returnWeight } =
        calculateAreaAndPerimeter(
          data.config.measurements,
          data?.settings?.variant,
          data?.config?.glassType?.thickness,
          { doorQuantity: data.config.doorQuantity }
        );

      const id = data?._id;
      return {
        ...formattedData,
        measurements: measurementString,
        pricing,
        id,
        doorWeight,
        panelWeight,
        returnWeight,
        pdfSettings,
      };
    } else {
      console.log("Not Selected Catetory Found!");
    }
  };

  const [estimatePdfs, setEstimatePdfs] = useState([]);
  // useEffect(() => {
  //   refetchData();
  // }, []);

  const {
    mutate: updateInvoiceStatus,
    isLoading,
    isSuccess,
  } = useEditDocument();

  useEffect(() => {
    const generatedPdfs = [];
    if (isFetched && selectedData?.estimateDetailArray) {
      selectedData?.estimateDetailArray?.forEach((data, index) => {
        const singleEstimatePdf = generatePDF(data);
        if (singleEstimatePdf) {
          generatedPdfs.push(singleEstimatePdf);
        }
      });
      setEstimatePdfs(generatedPdfs);
    }
  }, [
    selectedData,
    wineCellarHardwaresList,
    mirrorHardwaresList,
    showerHardwaresList,
    wineCellarLocationSettings,
    mirrorsLocationSettings,
    showersLocationSettings,
    pdfSettings,
  ]);
  console.log(
    estimatePdfs,
    "estimatePdfsestimatePdfs",
    selectedData?.estimateDetailArray
  );
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

  const authUser =
    decodedToken?.role === userRoles.ADMIN ||
    decodedToken?.role === userRoles.CUSTOM_ADMIN;

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

  const [expanded, setExpanded] = useState("panel1");

  const handleChangeAccordian = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const estimateTotal = useMemo(() => {
    let totalShowers = [],
      totalMirrors = [],
      totalWineCellar = [];
    estimatesList?.forEach((item) => {
      if (item?.category === EstimateCategory.SHOWERS) totalShowers.push(item);
      else if (item?.category === EstimateCategory.MIRRORS)
        totalMirrors.push(item);
      else if (item?.category === EstimateCategory.WINECELLARS)
        totalWineCellar.push(item);
    });
    const total = estimatesList?.length;
    return {
      totalShowers: totalShowers ?? [],
      totalMirrors: totalMirrors ?? [],
      totalWineCellar: totalWineCellar ?? [],
      total: total ?? 0,
    };
  }, [estimatesList]);

  useEffect(() => {
    if (estimatesList) {
      console.log(estimatesList, "list");
      const sum = estimatesList?.reduce((accumulator, currentItem) => {
        return (
          accumulator +
          calculateDiscount(
            currentItem.totalPrice,
            currentItem?.content?.discount?.value,
            currentItem?.content?.discount?.unit
          )
        );
      }, 0);
      SetTotalSum(sum);
    }
  }, [estimatesList]);
  console.log(selectedData?.estimates, "selectedData?.estimates");

  const reCalculateTotal = (priceToMinus, priceToAdd) => {
    let sum = totalSum - priceToMinus;
    sum = sum + priceToAdd;
    SetTotalSum(sum);
  };

  const generatePDFDocument = async () => {
    const doc = estimatePdfs?.length > 0 && (
      <LandingPDFFile
        controls={{
          ...controls,
        }}
        data={{ quote: estimatePdfs, location: pdfLocationData }}
        key={`pdfFile${1}`}
      />
    );
    const blobPdf = await pdf(doc);
    blobPdf.updateContainer(doc);
    const result = await blobPdf.toBlob();
    saveAs(result, "Priceup");
  };

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
        {/* <Box
          className="gcs-logo"
          component="a"
          href="https://gcsglassandmirror.com/"
        >
          <img src={GCSLogo} alt="logo nav bar" style={{ height: "100px" }} />
        </Box> */}
        <HeaderSection selectedData={selectedData} authUser={authUser} />

        <Box
          sx={{
            // width: { md: "89%", xs: "90%" },
            // m: "auto",
            backgroundImage: {
              md: `url(${
                selectedData?.content?.section1?.backgroundImage
                  ? `${backendURL}/${selectedData?.content?.section1?.backgroundImage}`
                  : bgHeaderImage
              })`,
              xs: "none",
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // px: { md: 12, xs: 0 },
            pt: { md: "50px", xs: 0 },
            pb: { md: 12.5, xs: 2 },
            // mt: 3,
            display: "block",
            // flexDirection: { md: "row", xs: "column" },
            gap: 10,
            position: "relative",
            // justifyContent: "space-around",
            height: "68vh",
          }}
        >
          <Box>
            <Box
              className="content-center"
              sx={{
                height: "55vh",
                justifyContent: "end !important",
                mb: "39px",
              }}
            >
              {/* <Typography
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
              </Typography> */}
              <Box
                sx={{
                  background: "rgba(255,255,255,.7)",
                  backdropFilter: "blur(10px)",
                  px: 5,
                  pt: 2,
                  pb: 3,
                  gap: 1,
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "628px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 500,
                    lineHeight: "36px",
                    textAlign: "start",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  {selectedData?.content?.section1?.text1 ??
                    "Your GCS Estimate Presentation"}
                </Typography>
                <Typography
                  sx={{ pr: 2, textAlign: "start" }}
                  className="subHeaderText"
                >
                  {selectedData?.content?.section1?.text2 ??
                    "Turning your Vision into reality– Get a Precise Estimate for Your Next Project Today!"}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(11.899999618530273px)",
                px: "2.5rem",
                py: "1.25rem",
                gap: 3,
              }}
            >
              <Box
                sx={{ gap: "0.125rem", borderRight: "4px solid white", pr: 3 }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    color: "#FFFFFF",
                    lineHeight: "36px",
                    fontWeight: 500,
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  Presented By
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "white",
                    lineHeight: "24px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  GCS Glass
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "white",
                    lineHeight: "24px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  John@GCSglass.com
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "24px",
                    color: "#FFFFFF",
                    lineHeight: "36px",
                    fontWeight: 500,
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  Presented For
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "white",
                    lineHeight: "24px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  {selectedData?.customer?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "white",
                    lineHeight: "24px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  {selectedData?.customer?.address}
                  {/* 2212 Sumac Drive, Little Elm, Texas, 75068, United States */}
                </Typography>
              </Box>
            </Box>
          </Box>

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
      <Box sx={{ background: "#000000" }}>
        <Container maxWidth="lg" sx={{ pb: 4, pt: 8 }}>
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

          <Box>
            <Box
              sx={{
                pb: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Poppins" !important',
                  fontSize: "44px",
                  fontWeight: 600,
                  lineHeight: "62px",
                  color: "white",
                }}
              >
                Hi {selectedData?.customer?.name}, we have{" "}
                <Box component="span" sx={{ color: "#F95500" }}>
                  {" "}
                  {selectedData?.estimates?.length || 0} estimates
                </Box>{" "}
                for you.
              </Typography>
              {/* <Typography
                sx={{
                  fontSize: "38px",
                  fontWeight: 600,
                  lineHeight: "84px",
                }}
              >
                ${totalSum?.toFixed(2)}
              </Typography> */}

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
              estimatePdfs?.map((data, index) => {
                const selectedSummary = summarySections(data, index + 1);
                return (
                  <SwiperSlide>
                    <Box sx={{ px: 4 }}>{selectedSummary}</Box>
                    <PDFViewer width={"100%"} height="1200px">
                    <PDFFile
                      controls={{
                        ...controls,
                      }}
                      data={{ quote: data, location: pdfLocationData,pdfs:estimatePdfs }}
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

            {/* {console.log(estimatePdfs?.length, estimatePdfs, 'sdfgsdfger2345')}
            {estimatePdfs?.length > 0 && <PDFViewer width={"100%"} height="1200px">
              <LandingPDFFile
                controls={{
                  ...controls,
                }}
                data={{ quote: estimatePdfs, location: pdfLocationData }}
                key={`pdfFile${1}`}
              />
            </PDFViewer>}

            <Button variant="contained" onClick={() => generatePDFDocument()}> Download PDF</Button> */}

            {estimateTotal?.totalShowers?.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  Shower estimates:{" "}
                  <Box component="span" sx={{ color: "#F95500" }}>
                    {estimateTotal?.totalShowers?.length}
                  </Box>
                </Typography>
                {selectedData?.content?.section2?.shower?.description
                  .length && (
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 500, color: "white" }}
                  >
                    {selectedData?.content?.section2?.shower?.description}
                  </Typography>
                )}
                <Box sx={{ color: "white" }}>
                  {isFetched ? (
                    estimateTotal?.totalShowers?.length > 0 &&
                    estimateTotal?.totalShowers?.map((data, index) => {
                      return (
                        <SingleAccordian
                          refetchData={refetchData}
                          index={index}
                          expanded={expanded}
                          handleChangeAccordian={handleChangeAccordian}
                          data={data}
                          reCalculateTotal={reCalculateTotal}
                          locationSettings={showersLocationSettings}
                          UpgradeOPtions={
                            selectedData?.additionalUpgrades?.shower
                          }
                          // showersLocationSettings={showersLocationSettings}
                          // mirrorsLocationSettings={mirrorsLocationSettings}
                          // wineCellarLocationSettings={
                          //   wineCellarLocationSettings
                          // }
                          hardwareList={showerHardwaresList}
                          // showerHardwaresList={showerHardwaresList}
                          // mirrorHardwaresList={mirrorHardwaresList}
                          // wineCellarHardwaresList={wineCellarHardwaresList}
                          category={EstimateCategory.SHOWERS}
                        />
                      );
                    })
                  ) : (
                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                  )}
                </Box>
                {selectedData?.content?.section2?.shower && (
                  <CustomSwiper
                    data={selectedData?.content?.section2?.shower}
                    category={EstimateCategory.SHOWERS}
                  />
                )}
              </>
            )}
            {estimateTotal?.totalMirrors?.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "white",
                    pt: 2,
                  }}
                >
                  Mirrors estimates:{" "}
                  <Box component="span" sx={{ color: "#F95500" }}>
                    {estimateTotal?.totalMirrors?.length}
                  </Box>
                </Typography>
                <Box sx={{ color: "white" }}>
                  {isFetched ? (
                    estimateTotal?.totalMirrors?.length > 0 &&
                    estimateTotal?.totalMirrors?.map((data, index) => {
                      return (
                        <SingleAccordian
                          refetchData={refetchData}
                          index={index}
                          expanded={expanded}
                          handleChangeAccordian={handleChangeAccordian}
                          data={data}
                          reCalculateTotal={reCalculateTotal}
                          locationSettings={mirrorsLocationSettings}
                          UpgradeOPtions={
                            selectedData?.additionalUpgrades?.mirror
                          }
                          // showersLocationSettings={showersLocationSettings}
                          // mirrorsLocationSettings={mirrorsLocationSettings}
                          // wineCellarLocationSettings={
                          //   wineCellarLocationSettings
                          // }
                          hardwareList={{
                            ...mirrorHardwaresList,
                            glassType: mirrorHardwaresList?.glassTypes ?? [],
                          }}
                          // showerHardwaresList={showerHardwaresList}
                          // mirrorHardwaresList={mirrorHardwaresList}
                          // wineCellarHardwaresList={wineCellarHardwaresList}
                          category={EstimateCategory.MIRRORS}
                        />
                      );
                    })
                  ) : (
                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                  )}
                </Box>
                {selectedData?.content?.section2?.mirror && (
                  <CustomSwiper
                    data={selectedData?.content?.section2?.mirror}
                    category={EstimateCategory.MIRRORS}
                  />
                )}
              </>
            )}
            {estimateTotal?.totalWineCellar?.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "28px",
                    fontWeight: 600,
                    // lineHeight: "62px",
                    color: "white",
                    pt: 2,
                  }}
                >
                  WineCellar estimates:{" "}
                  <Box component="span" sx={{ color: "#F95500" }}>
                    {estimateTotal?.totalWineCellar?.length}
                  </Box>
                </Typography>
                {selectedData?.content?.section2?.wineCellar?.description
                  .length && (
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "white",
                      maxHeight: "159px",
                      overflowY: "auto",
                    }}
                  >
                    {selectedData?.content?.section2?.wineCellar?.description}
                  </Typography>
                )}
                <Box sx={{ color: "white" }}>
                  {isFetched ? (
                    estimateTotal?.totalWineCellar?.length > 0 &&
                    estimateTotal?.totalWineCellar?.map((data, index) => {
                      return (
                        <SingleAccordian
                          refetchData={refetchData}
                          index={index}
                          expanded={expanded}
                          handleChangeAccordian={handleChangeAccordian}
                          data={data}
                          reCalculateTotal={reCalculateTotal}
                          locationSettings={wineCellarLocationSettings}
                          UpgradeOPtions={
                            selectedData?.additionalUpgrades?.wineCellar
                          }
                          // showersLocationSettings={showersLocationSettings}
                          // mirrorsLocationSettings={mirrorsLocationSettings}
                          // wineCellarLocationSettings={
                          //   wineCellarLocationSettings
                          // }
                          hardwareList={wineCellarHardwaresList}
                          // showerHardwaresList={showerHardwaresList}
                          // mirrorHardwaresList={mirrorHardwaresList}
                          // wineCellarHardwaresList={wineCellarHardwaresList}
                          category={EstimateCategory.WINECELLARS}
                        />
                      );
                    })
                  ) : (
                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                  )}
                </Box>
                {selectedData?.content?.section2?.wineCellar && (
                  <CustomSwiper
                    data={selectedData?.content?.section2?.wineCellar}
                    category={EstimateCategory.WINECELLARS}
                  />
                )}
              </>
            )}

            <Box sx={{ pt: 2 }}>
              {/* <Typography
                sx={{
                  fontFamily: '"Poppins" !important',
                  fontSize: "28px",
                  fontWeight: 600,
                  lineHeight: "62px",
                  color: "white",
                }}
              >
                Total number of estimates are
                <Box component="span" sx={{ color: "#F95500" }}>
                  {" "}
                  {selectedData?.estimates?.length || 0}
                </Box>{" "}
              </Typography> */}
              {/* {estimateTotal?.totalShowers?.length > 0 && (
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "28px",
                    fontWeight: 600,
                    lineHeight: "62px",
                    color: "white",
                  }}
                >
                  Shower estimates ={" "}
                  <Box component="span" sx={{ color: "#F95500" }}>
                    {estimateTotal?.totalShowers?.length}
                  </Box>
                </Typography>
              )}

              {estimateTotal?.totalMirrors?.length > 0 && (
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "28px",
                    fontWeight: 600,
                    lineHeight: "62px",
                    color: "white",
                  }}
                >
                  Mirror estimates ={" "}
                  <Box component="span" sx={{ color: "#F95500" }}>
                    {estimateTotal?.totalMirrors?.length}
                  </Box>
                </Typography>
              )}

              {estimateTotal?.totalWineCellar?.length > 0 && (
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "28px",
                    fontWeight: 600,
                    lineHeight: "62px",
                    color: "white",
                  }}
                >
                  WineCellar estimates ={" "}
                  <Box component="span" sx={{ color: "#F95500" }}>
                    {estimateTotal?.totalWineCellar?.length}
                  </Box>
                </Typography>
              )} */}

              <Typography
                sx={{
                  fontFamily: '"Poppins" !important',
                  fontSize: "28px",
                  fontWeight: 600,
                  lineHeight: "62px",
                  color: "white",
                  textAlign: "end",
                }}
              >
                Total Price is{" "}
                <Box
                  component="span"
                  sx={{ color: "#F95500", fontSize: "34px !important" }}
                >
                  $ {totalSum?.toFixed(2)}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <ChoiceGCS data={selectedData} />
      {/* <ServiceSection /> */}
      <WarrantySection />
      <LimitationsSection data={selectedData} />
      <ClaimSection />
      <ManainanceSection data={selectedData} />
      <UpgradeOPtions />
      <AggremantCondition
        data={selectedData}
        acceptTerms={acceptTerms}
        setAcceptTerms={setAcceptTerms}
      />

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

      {/* <Container maxWidth="xl" sx={{}}>
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
      </Container> */}
      <SigntureSection
        data={selectedData}
        refetchData={refetchData}
        estimatePdfs={estimatePdfs}
        acceptTerms={acceptTerms}
        totalSum={totalSum}
      />
      <Box sx={{ bgcolor: "#000000", width: "100%" }}>
        <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "end",
            p: 2,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontFamily: '"Inter" !important',
              fontSize: "24px",
              lineHeight: "26px",
              textAlign: "left",
              pb: 2,
            }}
          >
            © {new Date().getFullYear()} | All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CustomizeLandingPage;
