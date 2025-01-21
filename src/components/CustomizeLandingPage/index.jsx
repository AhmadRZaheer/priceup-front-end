import { Box, CircularProgress, Container, Typography } from "@mui/material";
import "./style.scss";
import React, { useEffect, useMemo, useState } from "react";
import bgHeaderImage from "../../Assets/CustomerLandingImages/BannerHeadImg.png";

import {
  backendURL,
  calculateAreaAndPerimeter,
  calculateDiscount,
  calculateTotal,
  getDecryptedToken,
  hexToRgba,
} from "@/utilities/common";
import { useSelector } from "react-redux";
import { EstimateCategory, quoteState, userRoles } from "@/utilities/constants";
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
  useEditDocument,
} from "@/utilities/ApiHooks/common";
import { loadStripe } from "@stripe/stripe-js";
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
import SingleAccordian from "./SingleAccordian";
import { getEstimatesList } from "@/redux/customerEstimateCalculation";
import CustomSwiper from "../CustomSwiper";

const CustomizeLandingPage = ({
  selectedData,
  refetchData,
  isFetched,
  isFetching,
}) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const secondaryColor = selectedData?.content?.colorSection?.secondary;
  const primaryColor = selectedData?.content?.colorSection?.primary;
  const backgroundColor = selectedData?.content?.colorSection?.default;
  const [totalSum, SetTotalSum] = useState(0);
  const estimatesList = useSelector(getEstimatesList);
  const showerHardwaresList = useSelector(getListData);
  const mirrorHardwaresList = useSelector(getMirrorsHardware);
  const wineCellarHardwaresList = useSelector(getWineCellarsHardware);
  const wineCellarLocationSettings = useSelector(getLocationWineCellarSettings);
  const mirrorsLocationSettings = useSelector(getLocationMirrorSettings);
  const showersLocationSettings = useSelector(getLocationShowerSettings);
  const pdfSettings = useSelector(getLocationPdfSettings);

  const generatePDF = (data) => {
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
  const decodedToken = getDecryptedToken();

  const authUser =
    decodedToken?.role === userRoles.ADMIN ||
    decodedToken?.role === userRoles.CUSTOM_ADMIN;
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

  const reCalculateTotal = (priceToMinus, priceToAdd) => {
    let sum = totalSum - priceToMinus;
    sum = sum + priceToAdd;
    SetTotalSum(sum);
  };

  const imageUrl = selectedData?.content?.section1?.backgroundImage
    ? `${backendURL}/${selectedData?.content?.section1?.backgroundImage}`
    : bgHeaderImage;
  console.log(imageUrl, "imageUrlimageUrl");

  return (
    <>
      <Box sx={{ bgcolor: "black", width: "100%" }}>
        <HeaderSection selectedData={selectedData} authUser={authUser} />
        <Box
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            pt: { md: "50px", xs: 0 },
            pb: { md: 12.5, xs: 2 },
            display: "block",
            gap: 10,
            position: "relative",
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
                background: hexToRgba(backgroundColor, 0.3),
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
                    color: secondaryColor,
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
                    color: secondaryColor,
                    lineHeight: "24px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  GCS Glass
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: secondaryColor,
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
                    color: secondaryColor,
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
                    color: secondaryColor,
                    lineHeight: "24px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  {selectedData?.customer?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: secondaryColor,
                    lineHeight: "24px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  {selectedData?.customer?.address}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ background: backgroundColor }}>
        <Container maxWidth="lg" sx={{ pb: 4, pt: 8 }}>
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
                  color: secondaryColor,
                }}
              >
                Hi {selectedData?.customer?.name}, we have{" "}
                <Box component="span" sx={{ color: primaryColor }}>
                  {" "}
                  {selectedData?.estimates?.length || 0} estimates
                </Box>{" "}
                for you.
              </Typography>
            </Box>
            {estimateTotal?.totalShowers?.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "28px",
                    fontWeight: 600,
                    color: secondaryColor,
                  }}
                >
                  Shower estimates:{" "}
                  <Box component="span" sx={{ color: primaryColor }}>
                    {estimateTotal?.totalShowers?.length}
                  </Box>
                </Typography>
                {selectedData?.content?.section2?.shower?.description.length &&
                  selectedData?.content?.section2?.shower?.status && (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 500,
                        color: secondaryColor,
                        mb: 1.5,
                      }}
                    >
                      {selectedData?.content?.section2?.shower?.description}
                    </Typography>
                  )}
                <Box sx={{ color: secondaryColor }}>
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
                          colorData={selectedData?.content?.colorSection}
                          hardwareList={showerHardwaresList}
                          category={EstimateCategory.SHOWERS}
                        />
                      );
                    })
                  ) : (
                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                  )}
                </Box>
                {selectedData?.content?.section2?.shower &&
                  selectedData?.content?.section2?.shower?.status && (
                    <CustomSwiper
                      data={selectedData?.content?.section2?.shower}
                      category={EstimateCategory.SHOWERS}
                      colorData={selectedData?.content?.colorSection}
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
                    color: secondaryColor,
                    pt: 2,
                  }}
                >
                  Mirrors estimates:{" "}
                  <Box component="span" sx={{ color: primaryColor }}>
                    {estimateTotal?.totalMirrors?.length}
                  </Box>
                </Typography>
                {selectedData?.content?.section2?.mirror?.description.length &&
                  selectedData?.content?.section2?.mirror?.status && (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 500,
                        color: secondaryColor,
                        mb: 1.5,
                      }}
                    >
                      {selectedData?.content?.section2?.mirror?.description}
                    </Typography>
                  )}
                <Box sx={{ color: secondaryColor }}>
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
                          colorData={selectedData?.content?.colorSection}
                          hardwareList={{
                            ...mirrorHardwaresList,
                            glassType: mirrorHardwaresList?.glassTypes ?? [],
                          }}
                          category={EstimateCategory.MIRRORS}
                        />
                      );
                    })
                  ) : (
                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                  )}
                </Box>
                {selectedData?.content?.section2?.mirror &&
                  selectedData?.content?.section2?.mirror?.status && (
                    <CustomSwiper
                      data={selectedData?.content?.section2?.mirror}
                      category={EstimateCategory.MIRRORS}
                      colorData={selectedData?.content?.colorSection}
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
                    color: secondaryColor,
                    pt: 2,
                  }}
                >
                  WineCellar estimates:{" "}
                  <Box component="span" sx={{ color: primaryColor }}>
                    {estimateTotal?.totalWineCellar?.length}
                  </Box>
                </Typography>
                {selectedData?.content?.section2?.wineCellar?.description
                  .length &&
                  selectedData?.content?.section2?.wineCellar?.status && (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 500,
                        color: secondaryColor,
                        maxHeight: "159px",
                        overflowY: "auto",
                        mb: 1.5,
                      }}
                    >
                      {selectedData?.content?.section2?.wineCellar?.description}
                    </Typography>
                  )}
                <Box sx={{ color: secondaryColor }}>
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
                          colorData={selectedData?.content?.colorSection}
                          hardwareList={wineCellarHardwaresList}
                          category={EstimateCategory.WINECELLARS}
                        />
                      );
                    })
                  ) : (
                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                  )}
                </Box>
                {selectedData?.content?.section2?.wineCellar &&
                  selectedData?.content?.section2?.wineCellar?.status && (
                    <CustomSwiper
                      data={selectedData?.content?.section2?.wineCellar}
                      category={EstimateCategory.WINECELLARS}
                      colorData={selectedData?.content?.colorSection}
                    />
                  )}
              </>
            )}

            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontFamily: '"Poppins" !important',
                  fontSize: "28px",
                  fontWeight: 600,
                  lineHeight: "62px",
                  color: secondaryColor,
                  textAlign: "end",
                }}
              >
                Total Price is{" "}
                <Box
                  component="span"
                  sx={{ color: primaryColor, fontSize: "34px !important" }}
                >
                  $ {totalSum?.toFixed(2)}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      {selectedData?.content?.section3?.status && (
        <ChoiceGCS data={selectedData} />
      )}
      {/* <ServiceSection /> */}
      {selectedData?.content?.section4?.status && (
        <WarrantySection data={selectedData} />
      )}
      {selectedData?.content?.section5?.status && (
        <LimitationsSection data={selectedData} />
      )}
      {selectedData?.content?.section6?.status && (
        <ClaimSection data={selectedData} />
      )}
      {selectedData?.content?.section7?.status && (
        <ManainanceSection data={selectedData} />
      )}
      {selectedData?.content?.section8?.status && (
        <UpgradeOPtions data={selectedData} />
      )}
      {selectedData?.content?.section9?.status && (
        <AggremantCondition
          data={selectedData}
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
        />
      )}
      {selectedData?.content?.section10?.status && (
        <SigntureSection
          data={selectedData}
          refetchData={refetchData}
          estimatePdfs={estimatePdfs}
          acceptTerms={acceptTerms}
          totalSum={totalSum}
        />
      )}
      <Box sx={{ bgcolor: backgroundColor, width: "100%" }}>
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
              color: secondaryColor,
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
