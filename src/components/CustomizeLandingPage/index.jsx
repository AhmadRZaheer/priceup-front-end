import {
  Box,
  Button,
  Card,
  CardMedia,
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
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";

const pdfLocationData = {
  name: "GCS Glass & Mirror",
  street: "20634 N. 28th Street, Suite 150",
  state: "Phoenix",
  zipCode: "AZ 85050",
  website: "www.gcs.glass",
};

const DummyEstimates = [
  {
    _id: "672c664f98b2e6d2699e7384",
    name: "2024-11-7 12:3:43",
    label: "KKKK",
    category: "showers",
    project_id: "6724aa61afad60e2f15e1edb",
    status: "pending",
    cost: 723.96542,
    config: {
      doorWidth: 28,
      isCustomizedDoorWidth: false,
      additionalFields: [],
      hardwareFinishes: "66ed81d2193295a1131cbd86",
      handles: {
        type: "66ed81d2193295a1131cbdaf",
        count: 1,
      },
      hinges: {
        count: 0,
      },
      mountingClamps: {
        wallClamp: [],
        sleeveOver: [],
        glassToGlass: [],
      },
      cornerClamps: {
        wallClamp: [],
        sleeveOver: [],
        glassToGlass: [],
      },
      mountingChannel: null,
      glassType: {
        type: "66ed81d2193295a1131cbe9b",
        thickness: "3/8",
      },
      glassAddons: ["66ed81d2193295a1131cbea1"],
      slidingDoorSystem: {
        type: "66ed81d2193295a1131cbe57",
        count: 1,
      },
      header: {
        type: "66ed81d2193295a1131cbe67",
        count: 1,
      },
      oneInchHoles: 2,
      hingeCut: 0,
      clampCut: 0,
      notch: 0,
      outages: 2,
      mitre: 0,
      polish: 204,
      people: 2,
      hours: 2,
      userProfitPercentage: 0,
      hardwareAddons: [],
      measurements: [
        {
          key: "a",
          value: 34,
        },
        {
          key: "b",
          value: 34,
        },
      ],
      perimeter: 204,
      sqftArea: 8.03,
      layout_id: "66ed81d3193295a1131cc01b",
    },
    createdAt: "2024-11-07T07:03:43.900Z",
    updatedAt: "2024-11-07T07:03:43.900Z",
    settings: {
      measurementSides: 2,
      image: "images/layouts/layout_9.png",
      name: "Double Barn",
      _id: "66ed81d3193295a1131cc01b",
      variant: "doublebarn",
      heavyDutyOption: {
        heavyDutyType: null,
        threshold: 0,
        height: 0,
      },
      hinges: {
        hingesType: null,
        count: 0,
      },
      glassType: {
        type: "66ed81d2193295a1131cbe9b",
        thickness: "3/8",
      },
    },
    creatorData: {
      _id: "66ed81d2193295a1131cbd7c",
      name: "muavia",
      email: "test4565@gmail.com",
      password: "$2a$10$sE7mkhGT5Kh8Q/6g86hIferYNGpwU7ugEm7I6g1HlgKiYMV7OlNfO",
      image: "images/users/default.jpg",
      role: "admin",
      status: true,
      createdAt: "2024-09-20T14:08:18.470Z",
      updatedAt: "2024-11-01T11:23:48.599Z",
      __v: 0,
    },
    customerData: {
      _id: "6724aa49afad60e2f15e1ed1",
      name: "test maria",
      email: "test@gmail.com",
      phone: "45555",
      image: "images/others/default.png",
      address: "Test",
      lastQuotedOn: "",
      company_id: "66ed81d2193295a1131cbd7e",
      createdAt: "2024-11-01T10:15:37.682Z",
      updatedAt: "2024-11-01T10:15:37.682Z",
      __v: 0,
    },
    companyData: {
      _id: "66ed81d2193295a1131cbd7e",
      name: "lahore ",
      image: "images/others/company_default.jpg",
      address: "ahdfgaiudgfa",
      wineCellars: {
        miscPricing: {
          pricingFactor: 2.42,
          hourlyRate: 73,
          pricingFactorStatus: true,
        },
        fabricatingPricing: {
          oneHoleOneByTwoInchGlass: 7.74,
          oneHoleThreeByEightInchGlass: 6.9,
          hingeCutoutOneByTwoInch: 15.48,
          hingeCutoutThreeByEightInch: 12.89,
        },
        doorWidth: 36,
      },
      mirrors: {
        pricingFactor: 3.1,
        hourlyRate: 75,
        pricingFactorStatus: true,
        holeMultiplier: 6,
        lightHoleMultiplier: 15,
        notchMultiplier: 1,
        singleOutletCutoutMultiplier: 6.5,
        doubleOutletCutoutMultiplier: 1,
        tripleOutletCutoutMultiplier: 1,
        quadOutletCutoutMultiplier: 20,
      },
      showers: {
        miscPricing: {
          pricingFactor: 2.42,
          hourlyRate: 72,
          pricingFactorStatus: true,
        },
        fabricatingPricing: {
          oneHoleOneByTwoInchGlass: 7.74,
          oneHoleThreeByEightInchGlass: 6.9,
          clampCutoutOneByTwoInch: 11.61,
          clampCutoutThreeByEightInch: 10.79,
          hingeCutoutOneByTwoInch: 15.48,
          hingeCutoutThreeByEightInch: 12.89,
          miterOneByTwoInch: 0.62,
          miterThreeByEightInch: 0.55,
          notchOneByTwoInch: 24.51,
          notchThreeByEightInch: 21.88,
          outageOneByTwoInch: 6,
          outageThreeByEightInch: 6,
          polishPricePerOneByTwoInch: 0.16,
          polishPricePerThreeByEightInch: 0.13,
        },
        doorWidth: 36,
      },
      user_id: "66ed81d2193295a1131cbd7c",
      createdAt: "2024-09-20T14:08:18.612Z",
      updatedAt: "2024-11-06T09:38:54.060Z",
      __v: 0,
      pdfSettings: {
        cost: false,
        hours: false,
        labor: true,
        people: true,
        profit: false,
      },
    },
  },
  {
    _id: "6729ea9dd5172d8d59774f5d",
    name: "2024-11-5 14:51:25",
    label: "sdsdsd",
    category: "mirrors",
    project_id: "6724aa61afad60e2f15e1edb",
    status: "pending",
    cost: 199.02,
    config: {
      glassType: {
        type: "66ed81d2193295a1131cbea8",
        thickness: "1/4",
      },
      edgeWork: {
        type: "66ed81d2193295a1131cbee4",
        thickness: "1/4",
      },
      glassAddons: [],
      hardwares: [],
      simpleHoles: 0,
      lightHoles: 0,
      notch: 0,
      singleOutletCutout: 0,
      doubleOutletCutout: 0,
      tripleOutletCutout: 0,
      quadOutletCutout: 0,
      modifiedProfitPercentage: 0,
      additionalFields: [],
      people: 0,
      hours: 0,
      measurements: [
        {
          count: 1,
          width: "33",
          height: "33",
        },
      ],
      sqftArea: 7.56,
      layout_id: null,
    },
    createdAt: "2024-11-05T09:51:25.658Z",
    updatedAt: "2024-11-05T10:30:15.265Z",
    settings: null,
    creatorData: {
      _id: "66ed81d2193295a1131cbd7c",
      name: "muavia",
      email: "test4565@gmail.com",
      password: "$2a$10$sE7mkhGT5Kh8Q/6g86hIferYNGpwU7ugEm7I6g1HlgKiYMV7OlNfO",
      image: "images/users/default.jpg",
      role: "admin",
      status: true,
      createdAt: "2024-09-20T14:08:18.470Z",
      updatedAt: "2024-11-01T11:23:48.599Z",
      __v: 0,
    },
    customerData: {
      _id: "6724aa49afad60e2f15e1ed1",
      name: "test maria",
      email: "test@gmail.com",
      phone: "45555",
      image: "images/others/default.png",
      address: "Test",
      lastQuotedOn: "",
      company_id: "66ed81d2193295a1131cbd7e",
      createdAt: "2024-11-01T10:15:37.682Z",
      updatedAt: "2024-11-01T10:15:37.682Z",
      __v: 0,
    },
    companyData: {
      _id: "66ed81d2193295a1131cbd7e",
      name: "lahore ",
      image: "images/others/company_default.jpg",
      address: "ahdfgaiudgfa",
      wineCellars: {
        miscPricing: {
          pricingFactor: 2.42,
          hourlyRate: 73,
          pricingFactorStatus: true,
        },
        fabricatingPricing: {
          oneHoleOneByTwoInchGlass: 7.74,
          oneHoleThreeByEightInchGlass: 6.9,
          hingeCutoutOneByTwoInch: 15.48,
          hingeCutoutThreeByEightInch: 12.89,
        },
        doorWidth: 36,
      },
      mirrors: {
        pricingFactor: 3.1,
        hourlyRate: 75,
        pricingFactorStatus: true,
        holeMultiplier: 6,
        lightHoleMultiplier: 15,
        notchMultiplier: 1,
        singleOutletCutoutMultiplier: 6.5,
        doubleOutletCutoutMultiplier: 1,
        tripleOutletCutoutMultiplier: 1,
        quadOutletCutoutMultiplier: 20,
      },
      showers: {
        miscPricing: {
          pricingFactor: 2.42,
          hourlyRate: 72,
          pricingFactorStatus: true,
        },
        fabricatingPricing: {
          oneHoleOneByTwoInchGlass: 7.74,
          oneHoleThreeByEightInchGlass: 6.9,
          clampCutoutOneByTwoInch: 11.61,
          clampCutoutThreeByEightInch: 10.79,
          hingeCutoutOneByTwoInch: 15.48,
          hingeCutoutThreeByEightInch: 12.89,
          miterOneByTwoInch: 0.62,
          miterThreeByEightInch: 0.55,
          notchOneByTwoInch: 24.51,
          notchThreeByEightInch: 21.88,
          outageOneByTwoInch: 6,
          outageThreeByEightInch: 6,
          polishPricePerOneByTwoInch: 0.16,
          polishPricePerThreeByEightInch: 0.13,
        },
        doorWidth: 36,
      },
      user_id: "66ed81d2193295a1131cbd7c",
      createdAt: "2024-09-20T14:08:18.612Z",
      updatedAt: "2024-11-06T09:38:54.060Z",
      __v: 0,
      pdfSettings: {
        cost: false,
        hours: false,
        labor: true,
        people: true,
        profit: false,
      },
    },
  },
  {
    _id: "66fa4d3b29ce0c67c3a4d38c",
    name: "2024-9-30 12:3:23",
    label: "RRRRRRRRRRRRRRRRR",
    category: "wineCellars",
    project_id: "66f3cdaf8990b5e2319700de",
    status: "pending",
    cost: 802.4436,
    config: {
      doorWidth: 28,
      doorQuantity: 1,
      isCustomizedDoorWidth: false,
      additionalFields: [],
      hardwareFinishes: "66ed81d2193295a1131cbf7d",
      handles: {
        type: "66ed81d3193295a1131cc01d",
        count: 1,
      },
      doorLock: {
        type: "66ed81d3193295a1131cc05d",
        count: 1,
      },
      hinges: {
        type: "66ed81d3193295a1131cc045",
        count: 2,
      },
      mountingChannel: "66ed81d3193295a1131cc06d",
      glassType: {
        type: "66ed81d3193295a1131cc075",
        thickness: "3/8",
      },
      oneInchHoles: 2,
      hingeCut: 2,
      people: 2,
      hours: 2,
      userProfitPercentage: 0,
      measurements: [
        {
          key: "a",
          value: 55,
        },
        {
          key: "b",
          value: 33,
        },
      ],
      perimeter: 286,
      sqftArea: 12.6,
      layout_id: "66f105347bb2e689e22c5a60",
    },
    createdAt: "2024-09-30T07:03:23.341Z",
    updatedAt: "2024-09-30T07:03:23.341Z",
    settings: {
      measurementSides: 2,
      noOfHoursToCompleteSingleDoor: 1,
      image: "images/wineCellarLayouts/layout_01.png",
      name: "Inline",
      _id: "66f105347bb2e689e22c5a60",
      variant: "inline",
      heavyDutyOption: {
        heavyDutyType: "66ed81d3193295a1131cc055",
        threshold: 85,
        height: 100,
      },
      hinges: {
        hingesType: "66ed81d3193295a1131cc045",
        count: 2,
      },
      glassType: {
        type: "66ed81d3193295a1131cc075",
        thickness: "3/8",
      },
    },
    customerData: {
      _id: "66ed87db193295a1131cc732",
      name: "abc",
      email: "imyahia1999@gmail.com",
      phone: "567432989",
      image: "images/others/default.png",
      address: "30 N Gould St Ste R",
      lastQuotedOn: "",
      company_id: "66ed81d2193295a1131cbd7e",
      createdAt: "2024-09-20T14:34:03.421Z",
      updatedAt: "2024-09-20T15:46:41.775Z",
      __v: 0,
    },
    companyData: {
      _id: "66ed81d2193295a1131cbd7e",
      name: "lahore ",
      image: "images/others/company_default.jpg",
      address: "ahdfgaiudgfa",
      wineCellars: {
        miscPricing: {
          pricingFactor: 2.42,
          hourlyRate: 73,
          pricingFactorStatus: true,
        },
        fabricatingPricing: {
          oneHoleOneByTwoInchGlass: 7.74,
          oneHoleThreeByEightInchGlass: 6.9,
          hingeCutoutOneByTwoInch: 15.48,
          hingeCutoutThreeByEightInch: 12.89,
        },
        doorWidth: 36,
      },
      mirrors: {
        pricingFactor: 3.1,
        hourlyRate: 75,
        pricingFactorStatus: true,
        holeMultiplier: 6,
        lightHoleMultiplier: 15,
        notchMultiplier: 1,
        singleOutletCutoutMultiplier: 6.5,
        doubleOutletCutoutMultiplier: 1,
        tripleOutletCutoutMultiplier: 1,
        quadOutletCutoutMultiplier: 20,
      },
      showers: {
        miscPricing: {
          pricingFactor: 2.42,
          hourlyRate: 72,
          pricingFactorStatus: true,
        },
        fabricatingPricing: {
          oneHoleOneByTwoInchGlass: 7.74,
          oneHoleThreeByEightInchGlass: 6.9,
          clampCutoutOneByTwoInch: 11.61,
          clampCutoutThreeByEightInch: 10.79,
          hingeCutoutOneByTwoInch: 15.48,
          hingeCutoutThreeByEightInch: 12.89,
          miterOneByTwoInch: 0.62,
          miterThreeByEightInch: 0.55,
          notchOneByTwoInch: 24.51,
          notchThreeByEightInch: 21.88,
          outageOneByTwoInch: 6,
          outageThreeByEightInch: 6,
          polishPricePerOneByTwoInch: 0.16,
          polishPricePerThreeByEightInch: 0.13,
        },
        doorWidth: 36,
      },
      user_id: "66ed81d2193295a1131cbd7c",
      createdAt: "2024-09-20T14:08:18.612Z",
      updatedAt: "2024-11-06T09:38:54.060Z",
      __v: 0,
      pdfSettings: {
        cost: false,
        hours: false,
        labor: true,
        people: true,
        profit: false,
      },
    },
  },
];

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
  const wineCellarHardwareList = useSelector(getWineCellarsHardware);
  const mirrorsHardwareList = useSelector(getMirrorsHardware);
  const showersHardwareList = useSelector(getListData);
  const wineCellarLocationSettings = useSelector(getLocationWineCellarSettings);
  const mirrorsLocationSettings = useSelector(getLocationMirrorSettings);
  const showersLocationSettings = useSelector(getLocationShowerSettings);
  const pdfSettings = useSelector(getLocationPdfSettings);

  const generatePDF = (data) => {
    console.log("Call this function", data);
    if (data?.category === EstimateCategory.SHOWERS) {
      const formattedData = generateObjectForPDFPreview(
        showersHardwareList,
        data,
        showersLocationSettings?.miscPricing
      );
      const pricing = calculateTotal(
        formattedData,
        formattedData?.sqftArea,
        showersLocationSettings
      );
      console.log(formattedData, pricing, "formattedData");
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
        mirrorsHardwareList,
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
        wineCellarHardwareList,
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
      console.log("");
    }
  };

  const [estimatePdfs, setEstimatePdfs] = useState([]);
  useEffect(() => {
    refetchData();
  }, []);

  console.log(selectedData, "selectedData");

  useEffect(() => {
    const generatedPdfs = [];
    if (isFetched) {
      selectedData?.forEach((data, index) => {
        const singleEstimatePdf = generatePDF(data);
        if (singleEstimatePdf) {
          generatedPdfs.push(singleEstimatePdf);
        }
      });
      setEstimatePdfs(generatedPdfs);
    }
  }, [
    selectedData,
    wineCellarHardwareList,
    mirrorsHardwareList,
    showersHardwareList,
    wineCellarLocationSettings,
    mirrorsLocationSettings,
    showersLocationSettings,
    pdfSettings,
  ]);
  console.log(estimatePdfs, "estimatePdfsestimatePdfs");
  const decodedToken = getDecryptedToken();
  const [estimatePdf, setEstimatePdf] = useState([]);
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
      <Container maxWidth="xl">
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
          <Box sx={{ p: 5 }}>
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 500,
                lineHeight: "54px",
                textAlign: "center",
              }}
            >
              Quotation Pdfs
            </Typography>
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
            {isFetched
              ? estimatePdfs.length > 0 &&
                estimatePdfs.map((data, index) => (
                  <SwiperSlide>
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
                ))
              : "Loading......."}
          </Swiper>
        </Box>
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
