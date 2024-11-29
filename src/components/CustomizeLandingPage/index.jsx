import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import "./style.scss";
import React, { useEffect, useRef, useState } from "react";
import LogoNavBar from "../../Assets/purplelogo.svg";
import Img from "../../Assets/example.jpg";
import right_headerimage from "../../Assets/header-right-image.svg";
import bg_Header from "../../Assets/bg-Header.png";
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
import { Close } from "@mui/icons-material";
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
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import ShowerSummary from "./summary/summary";
import BodySectionHTML from "./TermsAndConditions";

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
  // const { id } = useParams();
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
      console.log("sd");
      return <ShowerSummary data={data} quoteNumber={quoteNumber} />;
    } else if (data?.category === EstimateCategory.MIRRORS) {
      console.log("sd");
      return <ShowerSummary data={data} quoteNumber={quoteNumber} />;
    } else if (data?.category === EstimateCategory.WINECELLARS) {
      return <ShowerSummary data={data} quoteNumber={quoteNumber} />;
    } else {
      console.log("category no found");
      return;
    }
  };

  console.log(selectedData, "selectedDataselectedDataselectedDataselectedData");

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

  const handleChangeStatus = (value) => {
    console.log(value);
    const data = {
      project_id: selectedData[0]?.project_id,
      status: value,
    };
    // statusChange({ data, apiRoute: `${backendURL}/form-request-update` });
  };
  // useEffect(() => {
  //   if (isSuccess) {
  //     setInvoiceStatusBtn(false);
  //   }
  // }, [isSuccess]);

  return (
    <>
      <Box sx={{ bgcolor: "black", width: "100%" }}>
        {/* Navigation Bar */}
        <Box
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
        </Box>
        {/* Section Header */}
        <Box
          sx={{
            width: { md: "84%", xs: "90%" },
            m: "auto",
            backgroundImage: { md: `url(${bg_Header})`, xs: "none" },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            pl: { md: 12, xs: 0 },
            pt: { md: 16, xs: 0 },
            pb: { md: 12, xs: 2 },
            mt: 3,
            borderRadius: { md: "77px", xs: "40px" },
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: 10,
            position: "relative",
          }}
        >
          {/* left side */}
          <Box sx={{ width: { lg: 580, md: 500 } }}>
            <Typography
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
            </Typography>
          </Box>
          {/* right side */}
          <Box
            sx={{
              position: { md: "absolute", xs: "static" },
              right: { lg: 200, md: 60 },
              top: 0,
              textAlign: { md: "end", xs: "center" },
              width: "100%",
            }}
          >
            <img src={right_headerimage} alt="" height="560" />
          </Box>
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{ pb: 4 }}>
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

        <Box sx={{ px: 4 }}>
          <Box
            sx={{
              pt: 5,
              pb: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: 600,
                lineHeight: "54px",
              }}
            >
              Yours quotations ({selectedData?.items?.length || 0})
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
          <Swiper
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
            }}
          >
            {isFetched ? (
              selectedData?.items?.length > 0 &&
              selectedData?.items?.map((data, index) => {
                const selectedSummary = summarySections(data, index + 1);
                return (
                  <SwiperSlide>
                    {selectedSummary}
                    {/* <PDFViewer width={"100%"} height="1200px">
                    <PDFFile
                      controls={{
                        ...controls,
                      }}
                      data={{ quote: data, location: pdfLocationData }}
                      key={`pdfFile${index}`}
                    />
                  </PDFViewer> */}
                  </SwiperSlide>
                );
              })
            ) : (
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            )}
          </Swiper>
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ pb: 4 }}>
        <BodySectionHTML />
      </Container>
      <Box sx={{ bgcolor: "#1E1B2F", py: 5, mt: 5 }}>
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
      </Box>
      <Box sx={{ bgcolor: "#000000", width: "100%" }}>
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
