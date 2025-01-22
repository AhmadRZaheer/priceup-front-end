import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useMemo, useState } from "react";
import {
  useEditDocument,
  useFetchAllDocuments,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import {
  backendURL,
  estimateTotalWithCategory,
  frontendURL,
} from "@/utilities/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import EditEstimateTable from "./EditEstimateTable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ContentCopy, Delete, DoneOutlined, Edit } from "@mui/icons-material";
import bgHeaderImage from "@/Assets/CustomerLandingImages/BannerHeadImg.png";
import GCSLogo from "@/Assets/GCS-logo.png";
import FAQSection from "./FAQSection";
import { showSnackbar } from "@/redux/snackBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getListData } from "@/redux/estimateCalculations";
import { getLocationPresentationSettings } from "@/redux/locationSlice";
import Imag1 from "@/Assets/CustomerLandingImages/2.png";
import Imag2 from "@/Assets/CustomerLandingImages/3.png";
import LimitationImg from "@/Assets/CustomerLandingImages/LimitationImg.svg";
import infoBgHeaderImage from "@/Assets/CustomerLandingImages/WhyChoice.svg";
import TextEditor from "./TextEditor";
import CustomToggle from "@/components/ui-components/Toggle";
import { previewStatus } from "@/utilities/constants";
import ScrollToTop from "@/components/ScrollToTop";

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
const claimDefaultData = [
  {
    title: "Phoenix, AZ",
    desc: "20634 N. 28th Street, Ste. 150 (602) 828-8276 | phoenix@gcs.glass",
  },
  {
    title: "Austin, TXn",
    desc: "10509 Circle Drive, Unit 1440 (512) 480-9585 | austin@gcs.glass",
  },
  {
    title: "Denver, CO",
    desc: "10500 E. 54th Ave, Unit H (720) 601-1124 | denver@gcs.glass",
  },
  {
    title: "Long Island, NY",
    desc: "1347 Lincoln Avenue, Unit 7 (516) 400-2514 | longisland@gcs.glass",
  },
  {
    title: "Santa Cruz, CA",
    desc: "1970 17th Avenue (831) 353-6486 | santacruz@gcs.glass",
  },
];
const WarrantyText = `
          <h2 style="font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 700; line-height: 24px; color: white; padding-bottom: 32px; padding-top: 40px;">
            What Our Warranty Covers
          </h2>
          <br>
          <p style="font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 400; line-height: 24px; color: white;">
            At GCS Glass & Mirror, we are dedicated to ensuring your peace of mind. That’s why we offer a Limited Lifetime Craftsmanship Warranty. This warranty guarantees:
          </p>
          <div style="padding-top: 1.6rem;">
            <ul style="display: flex; flex-direction: column; gap: 8px;">
              <li style="font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 400; line-height: 24px; color: white;">
                Protection against defects in materials and workmanship under normal use for as long as you own the product.
              </li>
              <li style="font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 400; line-height: 24px; color: white;">
                A promise to repair or replace defective products free of charge if your claim is valid.
              </li>
              <li style="font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 400; line-height: 24px; color: white;">
                Assurance that we stand behind our superior products and services.
              </li>
            </ul>
          </div>
          <p style="font-family: 'Poppins', sans-serif; font-size: 24px; line-height: 24px; font-weight: 700; color: white; padding-top: 16px;">
            Note: This warranty is non-transferable unless otherwise specified.
          </p>
        `;

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedItemId = searchParams.get("item_id");
  const apiPath = `${backendURL}/projects/landing-page-preview/${selectedItemId}`;
  const [uploadLoading, setUploadLoading] = useState({
    logo: false,
    background: false,
    "content.section3.bgimage": false,
    "content.section5.image": false,
    "content.section8.image1": false,
    "content.section8.image2": false,
    "content.section2.shower.images": false,
    "content.section2.mirror.images": false,
    "content.section2.wineCellar.images": false,
  });
  const { data: singleItemData, refetch: refetchSingleItem } =
    useFetchSingleDocument(apiPath);
  const {
    data: logsData,
    refetch: logsRefetch,
    isFetching: logsFetching,
  } = useFetchAllDocuments(`${backendURL}/logs?resource_id=${selectedItemId}`);
  const [warrantyText, setWarrantyText] = useState(
    singleItemData?.content?.section4?.description ?? WarrantyText
  );
  const WinelistData = useSelector(getWineCellarsHardware);
  const MirrorsHardwareList = useSelector(getMirrorsHardware);
  const ShowerHardwareList = useSelector(getListData);
  const locationPresentationSettings = useSelector(
    getLocationPresentationSettings
  );

  const estimatesWithCategory = useMemo(() => {
    return estimateTotalWithCategory(singleItemData?.estimateDetailArray);
  }, [singleItemData?.estimateDetailArray]);

  const [accordionData, setAccordionData] = useState(
    singleItemData?.content?.section5?.faqs ?? accordionDefaultData
  );
  const [claimData, setClaimData] = useState(
    singleItemData?.content?.section6?.claimData ?? claimDefaultData
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
        singleItemData?.content?.section5?.faqs ?? accordionDefaultData
      );
      setClaimData(
        singleItemData?.content?.section6?.claimData ?? claimDefaultData
      );
      setWarrantyText(
        singleItemData?.content?.section4?.description ?? WarrantyText
      );
    }
  }, [singleItemData]);

  useEffect(() => {
    logsRefetch();
  }, []);

  const filterByShowInUpgrades = (list, key) =>
    list?.[key]?.filter((item) => item.showInUpgrades === true) || [];
  const filteredShowerGlassType = filterByShowInUpgrades(
    ShowerHardwareList,
    "glassType"
  );
  const filteredShowerGlassAddon = filterByShowInUpgrades(
    ShowerHardwareList,
    "glassAddons"
  );
  const filteredShowerHardwareAddon = filterByShowInUpgrades(
    ShowerHardwareList,
    "hardwareAddons"
  );
  const filteredMirrorGlassType = filterByShowInUpgrades(
    MirrorsHardwareList,
    "glassTypes"
  );
  const filteredMirrorGlassAddon = filterByShowInUpgrades(
    MirrorsHardwareList,
    "glassAddons"
  );
  const filteredWineGlassType = filterByShowInUpgrades(
    WinelistData,
    "glassType"
  );
  const filteredWineGlassAddon = filterByShowInUpgrades(
    WinelistData,
    "glassAddons"
  );
  const filteredWineHardwareAddon = filterByShowInUpgrades(
    WinelistData,
    "hardwareAddons"
  );

  const { mutateAsync: EditInvoice, isSuccess, isLoading } = useEditDocument();
  const formik = useFormik({
    initialValues: {
      customer: singleItemData?.customer?.name || "",
      project: singleItemData?.project?.projectName || "",
      dueDate: dayjs(singleItemData?.customerPreview?.expiresAt) || null,
      notes: singleItemData?.description || "",
      status: singleItemData?.status || "pending",
      additionalUpgrades: { 
        shower: {
          glassTypes:
            singleItemData?.additionalUpgrades?.shower?.glassTypes ?? [],
          glassAddons:
            singleItemData?.additionalUpgrades?.shower?.glassAddons ?? [],
          hardwareAddons:
            singleItemData?.additionalUpgrades?.shower?.hardwareAddons ?? [],
        },
        mirror: {
          glassTypes:
            singleItemData?.additionalUpgrades?.mirror?.glassTypes ?? [],
          glassAddons:
            singleItemData?.additionalUpgrades?.mirror?.glassAddons ?? [],
        },
        wineCellar: {
          glassTypes:
            singleItemData?.additionalUpgrades?.wineCellar?.glassTypes ?? [],
          glassAddons:
            singleItemData?.additionalUpgrades?.wineCellar?.glassAddons ?? [],
          hardwareAddons:
            singleItemData?.additionalUpgrades?.wineCellar?.hardwareAddons ??
            [],
        },
      },
      colorSection: {
        primary: singleItemData?.content?.colorSection?.primary ?? "#F95500",
        secondary:
          singleItemData?.content?.colorSection?.secondary ?? "#FFFFFF",
        default: singleItemData?.content?.colorSection?.default ?? "#000000",
      },
      section1: {
        text1:
          singleItemData?.content?.section1?.text1 ||
          "Your GCS Estimate Presentation",
        text2:
          singleItemData?.content?.section1?.text2 ||
          "Turning your Vision into reality– Get a Precise Estimate for Your Next Project Today!",
      },
      section2: {
        shower: {
          images: singleItemData?.content?.section2?.shower?.images ?? [],
          description:
            singleItemData?.content?.section2?.shower?.description ??
            locationPresentationSettings?.shower?.description,
          status: singleItemData?.content?.section2?.shower?.status ?? true,
        },
        mirror: {
          images: singleItemData?.content?.section2?.mirror?.images ?? [],
          description:
            singleItemData?.content?.section2?.mirror?.description ??
            locationPresentationSettings?.mirror?.description,
          status: singleItemData?.content?.section2?.mirror?.status ?? true,
        },
        wineCellar: {
          images: singleItemData?.content?.section2?.wineCellar?.images ?? [],
          description:
            singleItemData?.content?.section2?.wineCellar?.description ??
            locationPresentationSettings?.wineCellar?.description,
          status: singleItemData?.content?.section2?.wineCellar?.status ?? true,
        },
      },
      section3: {
        heading:
          singleItemData?.content?.section3?.heading || "Why Choose GCS?",
        subheading:
          singleItemData?.content?.section3?.subheading ||
          "The Highest Quality Residential Glass Services",
        description:
          singleItemData?.content?.section3?.description ||
          "Founded in 2013 in Phoenix Arizona, GCS has had a tremendous amount of success due to our “can do it” attitude along with our innovative approach to every aspect of the business.",
        bgimage: singleItemData?.content?.section3?.bgimage,
        status: singleItemData?.content?.section3?.status ?? true,
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
      section4: {
        heading:
          singleItemData?.content?.section4?.heading ||
          "Lifetime Craftsmanship Warranty – Our Promise to You",
        subheading:
          singleItemData?.content?.section4?.subheading ||
          "At GCS Glass & Mirror, we stand by our commitment to superior craftsmanship, customized design, and unparalleled customer satisfaction.",
        status: singleItemData?.content?.section4?.status ?? true,
      },
      section5: {
        image: singleItemData?.content?.section5?.image,
        status: singleItemData?.content?.section5?.status ?? true,
      },
      section6: {
        heading:
          singleItemData?.content?.section6?.heading || "How to File a Claim",
        subheading:
          singleItemData?.content?.section6?.subheading ||
          "Submitting a warranty claim is easy! Simply contact your local GCS Glass & Mirror location to begin the process:",
        bottomtext:
          singleItemData?.content?.section6?.bottomtext ||
          "At GCS Glass & Mirror, we value your trust and strive to provide only the highest-quality products and services. Thank you for choosing us to transform your spaces!",
        status: singleItemData?.content?.section6?.status ?? true,
      },
      section7: {
        heading:
          singleItemData?.content?.section7?.heading ??
          "Glass & shower maintenance",
        description:
          singleItemData?.content?.section7?.description ??
          "Please note, acid etched/frosted glass is extremely susceptible to fingerprints and spotting due to the oil on your hands and other environmental factors such as steam.",
        status: singleItemData?.content?.section7?.status ?? true,
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
      section8: {
        status: singleItemData?.content?.section8?.status ?? true,
        product: {
          title:
            singleItemData?.content?.section8?.product?.title ||
            "GCS ARMOR THE ULTIMATE GLASS PROTECTION SOLUTION",
          desc1:
            singleItemData?.content?.section8?.product?.desc1 ||
            "Glass is naturally porous, allowing water and contaminants to seep in, but GCS Armor's hydrophobic nano coating fills and seals these pores, leaving surfaces smooth and protected. Backed by a 10-year warranty, it ensures long-lasting durability.",
          desc2:
            singleItemData?.content?.section8?.product?.desc2 ||
            "Ask about our GCS Armor Bath Kit for easy maintenance, and experience the next level of glass protection today. Contact us to get started!",
        },
        image1: singleItemData?.content?.section8?.image1,
        image2: singleItemData?.content?.section8?.image2,
      },
      section9: {
        status: singleItemData?.content?.section9?.status ?? true,
      },
      section10: {
        status: singleItemData?.content?.section10?.status ?? true,
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
    const data = {
      customerPreview: {
        ...singleItemData?.customerPreview,
        expiresAt: values.dueDate,
        link: `${frontendURL}/customer-landing-page-preview/${selectedItemId}`,
      },
      description: values.notes,
      status: values.status,
      additionalUpgrades: values.additionalUpgrades,
      content: {
        ...singleItemData?.content,
        colorSection: {
          primary: values.colorSection?.primary ?? "#F95500",
          secondary: values.colorSection?.secondary ?? "#FFFFFF",
          default: values.colorSection?.default ?? "#000000",
        },
        section1: {
          ...singleItemData?.content?.section1,
          text1: values.section1?.text1,
          text2: values.section1?.text2,
        },
        section2: {
          shower: {
            ...singleItemData?.content?.section2?.shower,
            description: values?.section2?.shower?.description,
            status: values?.section2?.shower?.status,
          },
          mirror: {
            ...singleItemData?.content?.section2?.mirror,
            description: values?.section2?.mirror?.description,
            status: values?.section2?.mirror?.status,
          },
          wineCellar: {
            ...singleItemData?.content?.section2?.wineCellar,
            description: values?.section2?.wineCellar?.description,
            status: values?.section2?.wineCellar?.status,
          },
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
          heading: values.section3?.heading,
          subheading: values.section3?.subheading,
          description: values.section3?.description,
          status: values.section3?.status,
        },
        section4: {
          ...singleItemData?.content?.section4,
          heading: values.section4?.heading,
          subheading: values.section4?.subheading,
          description: warrantyText,
          status: values.section4?.status,
        },
        section7: {
          ...singleItemData?.content?.section7,
          heading: values.section7?.heading,
          description: values.section7?.description,
          status: values.section7?.status,
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
        section8: {
          ...singleItemData?.content?.section8,
          status: values.section8?.status,
          product: {
            title: values.section8.product.title,
            desc1: values.section8.product.desc1,
            desc2: values.section8.product.desc2,
          },
        },
        section5: {
          ...singleItemData?.content?.section5,
          status: values.section5?.status,
          faqs: accordionData,
        },
        section6: {
          claimData: claimData,
          heading: values.section6?.heading,
          subheading: values.section6?.subheading,
          bottomtext: values.section6?.bottomtext,
          status: values.section6?.status,
        },
        section9: {
          status: values.section9?.status,
        },
        section10: {
          status: values.section10?.status,
        },
      },
    };
    try {
      await EditInvoice({
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

    if (image) {
      setUploadLoading((prevState) => ({
        ...prevState,
        logo: true,
      }));
      const img = new Image();
      const objectUrl = URL.createObjectURL(image);

      img.onload = async () => {
        // Check if image dimensions are less than or equal to 100x100
        if (img.width <= 110 && img.height <= 110) {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("key", key);

          await EditInvoice({
            apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
            data: formData,
          });
          refetchSingleItem();
        } else {
          dispatch(
            showSnackbar({
              message: "Image dimensions must not exceed 100x100 pixels.",
              severity: "error",
            })
          );
        }
        URL.revokeObjectURL(objectUrl);
        setUploadLoading((prev) => ({ ...prev, logo: false }));
      };

      img.src = objectUrl;
    }
  };

  const handleImageUploadBackgroundImage = async (event, key) => {
    const image = event.target.files[0];

    if (image) {
      setUploadLoading((prevState) => ({
        ...prevState,
        background: true,
      }));
      const img = new Image();
      const objectUrl = URL.createObjectURL(image);

      img.onload = async () => {
        // Check if image dimensions are at least 700x400
        if (img.width >= 700 && img.height >= 400) {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("key", key);

          await EditInvoice({
            apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
            data: formData,
          });
          refetchSingleItem();
        } else {
          dispatch(
            showSnackbar({
              message: "Image dimensions must be at least 700x400 pixels.",
              severity: "error",
            })
          );
        }
        URL.revokeObjectURL(objectUrl);
        setUploadLoading((prevState) => ({
          ...prevState,
          background: false,
        }));
      };
      img.src = objectUrl;
    }
  };

  const handleUploadEstimatesImage = async (
    event,
    key,
    dimension = { height: 400, width: 700 }
  ) => {
    const image = event.target.files[0];

    if (image) {
      setUploadLoading((prevState) => ({
        ...prevState,
        [key]: true,
      }));
      const img = new Image();
      const objectUrl = URL.createObjectURL(image);

      img.onload = async () => {
        // Check if image dimensions are within the max dimension
        if (img.width >= dimension.width && img.height >= dimension.height) {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("key", key);

          await EditInvoice({
            apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
            data: formData,
          });
          refetchSingleItem();
        } else {
          dispatch(
            showSnackbar({
              message: `Image dimensions should be at least ${dimension.width}x${dimension.height} pixels to proceed.`,
              severity: "error",
            })
          );
        }
        URL.revokeObjectURL(objectUrl);
        setUploadLoading((prevState) => ({
          ...prevState,
          [key]: false,
        }));
      };
      img.src = objectUrl;
    }
  };

  const handleDeleteImageFromEstimate = async (
    gallery,
    removeGalleryImage,
    key
  ) => {
    const galleryFiltered = gallery?.filter(
      (item) => item !== removeGalleryImage
    );
    if (galleryFiltered) {
      setUploadLoading((prevState) => ({
        ...prevState,
        [key]: true,
      }));
      await EditInvoice({
        apiRoute: `${backendURL}/projects/landing-page-preview/${selectedItemId}`,
        data: {
          key,
          gallery: galleryFiltered ?? [],
          removeGalleryImage,
        },
      });
      refetchSingleItem();
    }
    setUploadLoading((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };
  const checkPreviewStatus =
    singleItemData?.status === previewStatus.PENDING ||
    singleItemData?.status === previewStatus.PREVIEW1;

  const getHumanReadableDate = (date) => {
    const newDate = new Date(date);
    const formattedDateTime = newDate.toLocaleString("en-US", {
      weekday: "long", // Full weekday name
      month: "long", // Full month name
      day: "numeric", // Numeric day
      year: "numeric", // Full year
      hour: "numeric", // Hour
      minute: "2-digit", // Minute
      hour12: true, // 12-hour format
    });
    return formattedDateTime;
  };
  //Scroll Shadow
  const [scrollShadow, setScrollShadow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollShadow(true);
      } else {
        setScrollShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
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
            <form
              onSubmit={formik.handleSubmit}
              style={{ position: "relative", paddingTop: "70px" }}
            >
              <Box
                sx={{
                  p: { sm: "22px 0px 20px 0px", xs: "20px 0px 20px 0px" },
                  display: "flex",
                  justifyContent: "space-between",
                  position: "fixed",
                  top: "70px",
                  width: "-webkit-fill-available",
                  marginRight: "22px",
                  zIndex: 100,
                  boxShadow: scrollShadow
                    ? "0px 3px 1px -1px rgba(0,0,0,0.2),0px 0px 0px 0px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12)"
                    : "none",
                  background: "#F6F5FF",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Button
                    sx={{ minWidth: "auto", p: "0px !important" }}
                    onClick={() =>
                      navigate(`/projects/${singleItemData?.project_id}`)
                    }
                  >
                    <KeyboardArrowLeftIcon
                      sx={{ fontSize: "35px", color: "black" }}
                    />
                  </Button>
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
                        `/preview/${selectedItemId}/customer-preview`,
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
                    justifyContent: "space-between",
                    width: "100%",
                    maxHeight: "300px",
                  }}
                >
                  <Box sx={{ width: "50%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        alignItems: "baseline",
                        padding: "16px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: "column",
                          width: { sm: "65%", xs: "100%" },
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              flexDirection: "column",
                              width: { sm: "50%", xs: "100%" },
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
                              <Typography>
                                {singleItemData?.customer?.name}
                              </Typography>
                              <Typography>
                                {singleItemData?.customer?.email}
                              </Typography>
                              <Typography>
                                {singleItemData?.customer?.address}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              flexDirection: "column",
                              width: { sm: "50%", xs: "100%" },
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
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: { sm: "35%", xs: "100%" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Due Date:
                          </Typography>
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
                        alignItems: "baseline",
                        px: "16px",
                        pb: "16px",
                      }}
                    >
                      <Box sx={{ width: { sm: "65%", xs: "100%" } }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
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
                      <Box sx={{ width: { sm: "35%", xs: "100%" } }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Status:
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
                            <FormControl
                              size="small"
                              className="custom-textfield"
                              fullWidth
                            >
                              <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                size="small"
                                sx={{ height: "40px" }}
                                value={formik.values.status}
                                onChange={(event) =>
                                  formik.setFieldValue(
                                    "status",
                                    event.target.value
                                  )
                                }
                                fullWidth
                              >
                                <MenuItem
                                  value={previewStatus.PENDING}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  Pending
                                </MenuItem>
                                <MenuItem
                                  value={previewStatus.PREVIEW1}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  First Preview
                                </MenuItem>
                                <MenuItem
                                  value={previewStatus.PREVIEW2}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  Second Preview
                                </MenuItem>
                                <MenuItem
                                  value={previewStatus.APPROVE}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  Approved
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        px: "16px",
                        gap: "10px",
                        mb: 1.5,
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
                        Payment Status :{" "}
                      </Typography>
                      <Typography
                        sx={{
                          backgroundColor: singleItemData?.invoice_id
                            ? "#daf4e9"
                            : "#FCDEC0",
                          borderRadius: "70px",
                          color: singleItemData?.invoice_id
                            ? "#3ac688"
                            : "#503000",
                          p: "6px 8px",
                          height: "21px",
                          display: "grid",
                          gap: 1,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "21px",
                          }}
                        >
                          {singleItemData?.invoice_id ? "Paid" : "Unpaid"}
                        </p>
                      </Typography>{" "}
                    </Box>
                  </Box>
                  <Box sx={{ width: "50%", mt: 2 }}>
                    <Card sx={{ mr: 2, p: 2 }}>
                      <Typography
                        sx={{ fontSize: 21, fontWeight: "bold", pb: 1 }}
                      >
                        Activity Logs
                      </Typography>
                      <Box sx={{ maxHeight: "210px", overflow: "auto" }}>
                        {logsFetching ? (
                          <Box
                            sx={{
                              height: "200px",
                              alignContent: "center",
                              textAlign: "center",
                            }}
                          >
                            <CircularProgress
                              size={30}
                              sx={{ color: "#8477DA" }}
                            />
                          </Box>
                        ) : logsData.length > 0 ? (
                          logsData?.map((data, index) => (
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                              }}
                            >
                              <FiberManualRecordIcon
                                sx={{ color: "#8477DA", fontSize: "15px" }}
                              />
                              <Typography sx={{ fontSize: 16 }} key={index}>
                                {data?.title +
                                  getHumanReadableDate(data?.createdAt)}
                              </Typography>
                            </Box>
                          ))
                        ) : (
                          <Typography
                            sx={{
                              fontSize: 16,
                              pb: 1,
                              height: "200px",
                              alignContent: "center",
                              textAlign: "center",
                            }}
                          >
                            No Activity Log Found!
                          </Typography>
                        )}
                      </Box>
                    </Card>
                  </Box>
                </Box>
                {/** Estimate Table */}
                <Box sx={{ py: 3, px: "16px" }}>
                  <EditEstimateTable
                    projectId={singleItemData?.project_id}
                    selectedEstimateRows={[]}
                    selectedEstimates={singleItemData?.estimateDetailArray}
                  />
                </Box>

                <Box sx={{ py: 3, px: "16px" }}>
                  <Typography sx={{ fontSize: 21, fontWeight: "bold", pb: 1 }}>
                    Choose upgrades for each category
                  </Typography>
                  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                    {estimatesWithCategory?.totalShowers?.length > 0 && (
                      <Box sx={{ width: "33.3%" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Shower
                        </Typography>
                        <Box sx={{ pt: 1 }}>
                          <Autocomplete
                            multiple
                            options={filteredShowerGlassType ?? []}
                            getOptionLabel={(glassType) => glassType.name}
                            value={filteredShowerGlassType?.filter(
                              (glassType) =>
                                formik.values.additionalUpgrades.shower.glassTypes?.includes(
                                  glassType._id
                                )
                            )}
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "additionalUpgrades.shower.glassTypes",
                                newValue.map((item) => item._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={option._id}
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            sx={{
                              width: "100%",
                              ".MuiOutlinedInput-root": { p: "2px !important" },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="custom-textfield"
                                placeholder={
                                  formik.values.additionalUpgrades.shower
                                    .glassTypes?.length > 0
                                    ? ""
                                    : "Select Glass Type"
                                }
                              />
                            )}
                          />
                        </Box>
                        <Box sx={{ pt: 2 }}>
                          <Autocomplete
                            multiple
                            options={
                              filteredShowerGlassAddon.filter(
                                (item) => item?.slug !== "no-treatment"
                              ) ?? []
                            }
                            getOptionLabel={(glassAddon) => glassAddon.name}
                            value={filteredShowerGlassAddon?.filter(
                              (glassAddon) =>
                                formik.values.additionalUpgrades.shower.glassAddons?.includes(
                                  glassAddon._id
                                )
                            )}
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "additionalUpgrades.shower.glassAddons",
                                newValue.map((item) => item._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={option._id}
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            sx={{
                              width: "100%",
                              ".MuiOutlinedInput-root": { p: "2px !important" },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="custom-textfield"
                                placeholder={
                                  formik.values.additionalUpgrades.shower
                                    .glassAddons?.length > 0
                                    ? ""
                                    : "Select Glass Addon"
                                }
                              />
                            )}
                          />
                        </Box>
                        <Box sx={{ pt: 2 }}>
                          <Autocomplete
                            multiple
                            options={filteredShowerHardwareAddon ?? []}
                            getOptionLabel={(hardwareAddon) =>
                              hardwareAddon.name
                            }
                            value={filteredShowerHardwareAddon?.filter(
                              (hardwareAddon) =>
                                formik.values.additionalUpgrades.shower.hardwareAddons?.includes(
                                  hardwareAddon._id
                                )
                            )}
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "additionalUpgrades.shower.hardwareAddons",
                                newValue.map((item) => item._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={option._id}
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            sx={{
                              width: "100%",
                              ".MuiOutlinedInput-root": { p: "2px !important" },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="custom-textfield"
                                placeholder={
                                  formik.values.additionalUpgrades.shower
                                    .hardwareAddons?.length > 0
                                    ? ""
                                    : "Select Hardware Addon"
                                }
                              />
                            )}
                          />
                        </Box>
                      </Box>
                    )}
                    {estimatesWithCategory?.totalMirrors?.length > 0 && (
                      <Box sx={{ width: "33.3%" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Mirror
                        </Typography>
                        <Box sx={{ pt: 1 }}>
                          <Autocomplete
                            multiple
                            options={filteredMirrorGlassType ?? []}
                            getOptionLabel={(glassType) => glassType.name}
                            value={filteredMirrorGlassType?.filter(
                              (glassType) =>
                                formik.values.additionalUpgrades.mirror.glassTypes?.includes(
                                  glassType._id
                                )
                            )}
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "additionalUpgrades.mirror.glassTypes",
                                newValue.map((item) => item._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={option._id}
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            sx={{
                              width: "100%",
                              ".MuiOutlinedInput-root": { p: "2px !important" },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="custom-textfield"
                                placeholder={
                                  formik.values.additionalUpgrades.mirror
                                    .glassTypes?.length > 0
                                    ? ""
                                    : "Select Glass Type"
                                }
                              />
                            )}
                          />
                        </Box>
                        <Box sx={{ pt: 2 }}>
                          <Autocomplete
                            multiple
                            options={filteredMirrorGlassAddon ?? []}
                            getOptionLabel={(glassAddon) => glassAddon.name}
                            value={filteredMirrorGlassAddon?.filter(
                              (glassAddon) =>
                                formik.values.additionalUpgrades.mirror.glassAddons?.includes(
                                  glassAddon._id
                                )
                            )}
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "additionalUpgrades.mirror.glassAddons",
                                newValue.map((item) => item._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={option._id}
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            sx={{
                              width: "100%",
                              ".MuiOutlinedInput-root": { p: "2px !important" },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="custom-textfield"
                                placeholder={
                                  formik.values.additionalUpgrades.mirror
                                    .glassAddons?.length > 0
                                    ? ""
                                    : "Select Glass Addon"
                                }
                              />
                            )}
                          />
                        </Box>
                      </Box>
                    )}
                    {estimatesWithCategory?.totalWineCellar?.length > 0 && (
                      <Box sx={{ width: "33.3%" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          WineCaller
                        </Typography>
                        <Box sx={{ pt: 1 }}>
                          <Autocomplete
                            multiple
                            options={filteredWineGlassType ?? []}
                            getOptionLabel={(glassType) => glassType.name}
                            value={filteredWineGlassType?.filter((glassType) =>
                              formik.values.additionalUpgrades.wineCellar.glassTypes?.includes(
                                glassType._id
                              )
                            )}
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "additionalUpgrades.wineCellar.glassTypes",
                                newValue.map((item) => item._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={option._id}
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            sx={{
                              width: "100%",
                              ".MuiOutlinedInput-root": { p: "2px !important" },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="custom-textfield"
                                placeholder={
                                  formik.values.additionalUpgrades.wineCellar
                                    .glassTypes?.length > 0
                                    ? ""
                                    : "Select Glass Type"
                                }
                              />
                            )}
                          />
                        </Box>
                        <Box sx={{ pt: 2 }}>
                          <Autocomplete
                            multiple
                            options={
                              filteredWineGlassAddon.filter(
                                (item) => item?.slug !== "no-treatment"
                              ) ?? []
                            }
                            getOptionLabel={(glassAddon) => glassAddon.name}
                            value={filteredWineGlassAddon?.filter(
                              (glassAddon) =>
                                formik.values.additionalUpgrades.wineCellar.glassAddons?.includes(
                                  glassAddon._id
                                )
                            )}
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "additionalUpgrades.wineCellar.glassAddons",
                                newValue.map((item) => item._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={option._id}
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            sx={{
                              width: "100%",
                              ".MuiOutlinedInput-root": { p: "2px !important" },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="custom-textfield"
                                placeholder={
                                  formik.values.additionalUpgrades.wineCellar
                                    .glassAddons?.length > 0
                                    ? ""
                                    : "Select Glass Addon"
                                }
                              />
                            )}
                          />
                        </Box>
                        <Box sx={{ pt: 2 }}>
                          <Autocomplete
                            multiple
                            options={filteredWineHardwareAddon ?? []}
                            getOptionLabel={(hardwareAddon) =>
                              hardwareAddon.name
                            }
                            value={filteredWineHardwareAddon?.filter(
                              (hardwareAddon) =>
                                formik.values.additionalUpgrades.wineCellar.hardwareAddons?.includes(
                                  hardwareAddon._id
                                )
                            )}
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "additionalUpgrades.wineCellar.hardwareAddons",
                                newValue.map((item) => item._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={option._id}
                                  label={option.name}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            sx={{
                              width: "100%",
                              ".MuiOutlinedInput-root": { p: "2px !important" },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="custom-textfield"
                                placeholder={
                                  formik.values.additionalUpgrades.wineCellar
                                    .hardwareAddons?.length > 0
                                    ? ""
                                    : "Select Hardware Addon"
                                }
                              />
                            )}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box>
                  {/* section 0 */}
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h5" fontWeight={"bold"}>
                      Theme Colors
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        border: "1px solid #ccc",
                        p: 1.5,
                        mt: 1,
                      }}
                    >
                      <Box sx={{ width: "10%" }}>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: 500, pb: "8px" }}
                        >
                          Primary
                        </Typography>
                        <input
                          type="color"
                          value={formik.values.colorSection.primary}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "colorSection.primary",
                              e.target.value
                            )
                          }
                          style={{
                            margin: 0,
                            cursor: "pointer",
                            padding: "2px",
                            width: "100%",
                            height: "40px",
                          }}
                        />
                      </Box>
                      <Box sx={{ width: "10%" }}>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: 500, pb: "8px" }}
                        >
                          Secondary
                        </Typography>
                        <input
                          type="color"
                          value={formik.values.colorSection.secondary}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "colorSection.secondary",
                              e.target.value
                            )
                          }
                          style={{
                            width: "100%",
                            height: "40px",
                            margin: 0,
                            cursor: "pointer",
                            padding: "2px",
                          }}
                        />
                      </Box>
                      <Box sx={{ width: "10%" }}>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: 500, pb: "8px" }}
                        >
                          Background
                        </Typography>
                        <input
                          type="color"
                          value={formik.values.colorSection.default}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "colorSection.default",
                              e.target.value
                            )
                          }
                          style={{
                            width: "100%",
                            height: "40px",
                            margin: 0,
                            cursor: "pointer",
                            padding: "2px",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* section 1 */}
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h5" fontWeight={"bold"}>
                      Hero Section
                    </Typography>
                    <Box sx={{ border: "1px solid #ccc", p: 1.5, mt: 1 }}>
                      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "39%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500, pb: 0.8 }}
                          >
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
                            minRows={5}
                            maxRows={7}
                            name="section1.text1"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={28}
                            value={formik.values.section1.text1 || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "39%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500, pb: 0.8 }}
                          >
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
                            minRows={5}
                            maxRows={7}
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            name="section1.text2"
                            maxLength={90}
                            value={formik.values.section1.text2 || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "20%",
                          }}
                        >
                          {/* section logo */}
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500, pb: 0.8 }}
                          >
                            Company Logo
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                document
                                  .getElementById("image-upload-logo")
                                  .click()
                              }
                            >
                              <input
                                id="image-upload-logo"
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(e) =>
                                  handleImageUploadLogo(
                                    e,
                                    "content.section1.logo"
                                  )
                                }
                              />
                              <Box sx={{ position: "relative" }}>
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "-10px",
                                    zIndex: 3,
                                    right: "-5px",
                                  }}
                                >
                                  <IconButton
                                    disabled={uploadLoading.logo}
                                    sx={{
                                      background: "#8477DA",
                                      color: "white",
                                      p: "5px",
                                      ":hover": {
                                        background: "#8477DA",
                                      },
                                    }}
                                  >
                                    <Edit sx={{ fontSize: "20px" }} />
                                  </IconButton>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    height: "100%",
                                    width: "100%",
                                    position: "absolute",
                                    zIndex: 3,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box>
                                    {uploadLoading.logo ? (
                                      <CircularProgress
                                        sx={{ color: "#8477DA" }}
                                        size={24}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Box>
                                </Box>

                                {singleItemData?.content?.section1?.logo ||
                                uploadedImageLogo?.content?.section1?.logo ? (
                                  <img
                                    src={`${backendURL}/${
                                      singleItemData?.content?.section1?.logo ??
                                      uploadedImageLogo?.content?.section1?.logo
                                    }`}
                                    width={115}
                                    height={115}
                                    alt="section logo"
                                    style={{
                                      border: "1px solid  #ccc",
                                      borderRadius: "10px",
                                      opacity: uploadLoading.logo ? 0.3 : 1,
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={GCSLogo}
                                    width={120}
                                    height={120}
                                    alt="section  logo"
                                    style={{
                                      border: "1px solid  #ccc",
                                      borderRadius: "10px",
                                      opacity: uploadLoading.logo ? 0.3 : 1,
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        {/* section background image */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Background Image
                          </Typography>

                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                            }}
                            onClick={() =>
                              document
                                .getElementById("image-upload-background")
                                .click()
                            }
                          >
                            <input
                              id="image-upload-background"
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
                            <Box sx={{ position: "relative" }}>
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: "-10px",
                                  zIndex: 3,
                                  right: "-5px",
                                }}
                              >
                                <IconButton
                                  disabled={uploadLoading.background}
                                  sx={{
                                    background: "#8477DA",
                                    color: "white",
                                    p: "5px",
                                    ":hover": {
                                      background: "#8477DA",
                                    },
                                  }}
                                >
                                  <Edit sx={{ fontSize: "20px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  height: "100%",
                                  width: "100%",
                                  position: "absolute",
                                  zIndex: 3,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  {uploadLoading.background ? (
                                    <CircularProgress
                                      sx={{ color: "#8477DA" }}
                                      size={32}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Box>
                              </Box>

                              {singleItemData?.content?.section1
                                ?.backgroundImage ||
                              uploadedImageBackgroundImage?.content?.section1
                                ?.backgroundImage ? (
                                <img
                                  src={`${backendURL}/${
                                    singleItemData?.content?.section1
                                      ?.backgroundImage ??
                                    uploadedImageBackgroundImage?.content
                                      ?.section1?.backgroundImage
                                  }`}
                                  width="100%"
                                  height={400}
                                  alt="section backgroundImage"
                                  style={{
                                    border: "1px solid  #ccc",
                                    borderRadius: "10px",
                                    opacity: uploadLoading.background ? 0.3 : 1,
                                  }}
                                />
                              ) : (
                                <img
                                  src={bgHeaderImage}
                                  width="100%"
                                  height={400}
                                  alt="section logo"
                                  style={{
                                    border: "1px solid  #ccc",
                                    borderRadius: "10px",
                                    opacity: uploadLoading.background ? 0.3 : 1,
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      pt: 2,
                    }}
                  >
                    {estimatesWithCategory?.totalShowers?.length > 0 && (
                      <Box
                        sx={{ background: "white", p: 2, borderRadius: "5px" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h5" fontWeight={"bold"}>
                            Shower Gallery
                          </Typography>
                          <CustomToggle
                            title={"Shower Gallery Status"}
                            isText={false}
                            checked={formik.values.section2.shower.status}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "section2.shower.status",
                                e.target.checked
                              );
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            pt: 1.5,
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              border: "1px solid #ccc",
                              width: "65%",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                                zIndex: 3,
                                justifyContent: "center",
                                alignItems: "center",
                                pointerEvents: "none",
                              }}
                            >
                              <Box>
                                {uploadLoading[
                                  "content.section2.shower.images"
                                ] ? (
                                  <CircularProgress
                                    sx={{ color: "#8477DA" }}
                                    size={42}
                                  />
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Box>
                            <Grid
                              container
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                opacity: uploadLoading[
                                  "content.section2.shower.images"
                                ]
                                  ? 0.3
                                  : 1,
                              }}
                            >
                              {formik.values.section2.shower.images.length &&
                              formik.values.section2.shower.images.length >
                                0 ? (
                                formik.values.section2.shower.images?.map(
                                  (_image) => (
                                    <Box
                                      sx={{
                                        width: "200px",
                                        height: "200px",
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
                                            formik.values.section2.shower
                                              .images,
                                            _image,
                                            "content.section2.shower.images"
                                          )
                                        }
                                      >
                                        <Delete />
                                      </Box>
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                        src={`${backendURL}/${_image}`}
                                        alt="section  backgroundImage"
                                      />
                                    </Box>
                                  )
                                )
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
                                    background: uploadLoading[
                                      "content.section2.shower.images"
                                    ]
                                      ? "#8477DA"
                                      : "#6a5bc5",
                                  },
                                }}
                                disabled={
                                  uploadLoading[
                                    "content.section2.shower.images"
                                  ]
                                }
                              >
                                Upload image
                                <input
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  onChange={(e) => {
                                    handleUploadEstimatesImage(
                                      e,
                                      "content.section2.shower.images",
                                      { height: 200, width: 200 }
                                    );
                                    e.target.value = "";
                                  }}
                                />
                              </Button>
                            </Box>
                          </Box>
                          <Box sx={{ width: "35%", display: "flex", gap: 1 }}>
                            <TextareaAutosize
                              fullWidth
                              style={{
                                padding: "10px",
                                borderColor: "#cccc",
                                borderRadius: "5px",
                                width: "100%",
                              }}
                              className="custom-textfield"
                              color="neutral"
                              minRows={7}
                              maxRows={10}
                              id="section2.shower.description"
                              name="section2.shower.description"
                              placeholder="Enter Shower Description"
                              size="large"
                              variant="outlined"
                              sx={{ padding: "10px" }}
                              value={
                                formik.values.section2.shower.description ?? ""
                              }
                              onChange={formik.handleChange}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {estimatesWithCategory?.totalMirrors?.length > 0 && (
                      <Box
                        sx={{ background: "white", p: 2, borderRadius: "5px" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h5" fontWeight={"bold"}>
                            Mirror Gallery
                          </Typography>
                          <CustomToggle
                            title={"Mirror Gallery Status"}
                            isText={false}
                            checked={formik.values.section2.mirror.status}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "section2.mirror.status",
                                e.target.checked
                              );
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            pt: 1.5,
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              border: "1px solid #ccc",
                              width: "65%",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                                zIndex: 3,
                                justifyContent: "center",
                                alignItems: "center",
                                pointerEvents: "none",
                              }}
                            >
                              <Box>
                                {uploadLoading[
                                  "content.section2.mirror.images"
                                ] ? (
                                  <CircularProgress
                                    sx={{ color: "#8477DA" }}
                                    size={42}
                                  />
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Box>
                            <Grid
                              container
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                opacity: uploadLoading[
                                  "content.section2.mirror.images"
                                ]
                                  ? 0.3
                                  : 1,
                              }}
                            >
                              {formik.values.section2.mirror.images.length &&
                              formik.values.section2.mirror.images.length >
                                0 ? (
                                formik.values.section2.mirror.images?.map(
                                  (_image) => (
                                    <Box
                                      sx={{
                                        width: "200px",
                                        height: "200px",
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
                                            formik.values.section2.mirror
                                              .images,
                                            _image,
                                            "content.section2.mirror.images"
                                          )
                                        }
                                      >
                                        <Delete />
                                      </Box>
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                        src={`${backendURL}/${_image}`}
                                        alt="section backgroundImage"
                                      />
                                    </Box>
                                  )
                                )
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
                                    background: uploadLoading[
                                      "content.section2.mirror.images"
                                    ]
                                      ? "#8477DA"
                                      : "#6a5bc5",
                                  },
                                }}
                                disabled={
                                  uploadLoading[
                                    "content.section2.mirror.images"
                                  ]
                                }
                              >
                                Upload image
                                <input
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  onChange={(e) => {
                                    handleUploadEstimatesImage(
                                      e,
                                      "content.section2.mirror.images",
                                      { height: 200, width: 200 }
                                    );
                                    e.target.value = "";
                                  }}
                                />
                              </Button>
                            </Box>
                          </Box>
                          <Box sx={{ width: "35%", display: "flex", gap: 1 }}>
                            <TextareaAutosize
                              fullWidth
                              style={{
                                padding: "10px",
                                borderColor: "#cccc",
                                borderRadius: "5px",
                                width: "100%",
                              }}
                              className="custom-textfield"
                              color="neutral"
                              minRows={7}
                              maxRows={10}
                              id="section2.mirror.description"
                              name="section2.mirror.description"
                              placeholder="Enter Mirror Description"
                              size="large"
                              variant="outlined"
                              sx={{ padding: "10px" }}
                              value={
                                formik.values.section2.mirror.description ?? ""
                              }
                              onChange={formik.handleChange}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {estimatesWithCategory?.totalWineCellar?.length > 0 && (
                      <Box
                        sx={{ background: "white", p: 2, borderRadius: "5px" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h5" fontWeight={"bold"}>
                            Wine Cellar Gallery
                          </Typography>
                          <CustomToggle
                            title={"Wine Cellar Gallery Status"}
                            isText={false}
                            checked={formik.values.section2.wineCellar.status}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "section2.wineCellar.status",
                                e.target.checked
                              );
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            pt: 1.5,
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              border: "1px solid #ccc",
                              width: "65%",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                                zIndex: 3,
                                justifyContent: "center",
                                alignItems: "center",
                                pointerEvents: "none",
                              }}
                            >
                              <Box>
                                {uploadLoading[
                                  "content.section2.wineCellar.images"
                                ] ? (
                                  <CircularProgress
                                    sx={{ color: "#8477DA" }}
                                    size={42}
                                  />
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Box>
                            <Grid
                              container
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                opacity: uploadLoading[
                                  "content.section2.wineCellar.images"
                                ]
                                  ? 0.3
                                  : 1,
                              }}
                            >
                              {formik.values.section2.wineCellar.images
                                .length &&
                              formik.values.section2.wineCellar.images.length >
                                0 ? (
                                formik.values.section2.wineCellar.images?.map(
                                  (_image) => (
                                    <Box
                                      sx={{
                                        width: "200px",
                                        height: "200px",
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
                                            formik.values.section2.wineCellar
                                              .images,
                                            _image,
                                            `content.section2.wineCellar.images`
                                          )
                                        }
                                      >
                                        <Delete />
                                      </Box>
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                        src={`${backendURL}/${_image}`}
                                        alt="section  backgroundImage"
                                      />
                                    </Box>
                                  )
                                )
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
                                    background: uploadLoading[
                                      "content.section2.wineCellar.images"
                                    ]
                                      ? "#8477DA"
                                      : "#6a5bc5",
                                  },
                                }}
                                disabled={
                                  uploadLoading[
                                    "content.section2.wineCellar.images"
                                  ]
                                }
                              >
                                Upload image
                                <input
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  onChange={(e) => {
                                    handleUploadEstimatesImage(
                                      e,
                                      "content.section2.wineCellar.images",
                                      { height: 200, width: 200 }
                                    );
                                    e.target.value = "";
                                  }}
                                />
                              </Button>
                            </Box>
                          </Box>
                          <Box sx={{ width: "35%", display: "flex", gap: 1 }}>
                            <TextareaAutosize
                              fullWidth
                              style={{
                                padding: "10px",
                                borderColor: "#cccc",
                                borderRadius: "5px",
                                width: "100%",
                              }}
                              className="custom-textfield"
                              color="neutral"
                              minRows={7}
                              maxRows={10}
                              id="section2.wineCellar.description"
                              name="section2.wineCellar.description"
                              placeholder="Enter WineCellar Description"
                              size="large"
                              variant="outlined"
                              sx={{ padding: "10px" }}
                              value={
                                formik.values.section2.wineCellar.description ??
                                ""
                              }
                              onChange={formik.handleChange}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  {/* section 3 */}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" fontWeight={"bold"}>
                        Info Cards
                      </Typography>
                      <CustomToggle
                        title={"Info Cards Status"}
                        isText={false}
                        checked={formik.values.section3.status}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "section3.status",
                            e.target.checked
                          );
                        }}
                      />
                    </Box>

                    <Box sx={{ border: "1px solid #ccc", mt: 2, px: 3, pt: 2 }}>
                      <Box sx={{ display: "flex", gap: 2, pb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Heading
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
                            name="section3.heading"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={15}
                            value={formik.values.section3.heading || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>{" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Sub Heading
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
                            name="section3.subheading"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={49}
                            value={formik.values.section3.subheading || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>{" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Description
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
                            name="section3.description"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={196}
                            value={formik.values.section3.description || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            pb: 2,
                            width: "25%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            sx={{ alignContent: "center" }}
                          >
                            Card 1:{" "}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                              maxLength={50}
                              value={formik.values.section3.card1.text2 || ""}
                              onChange={formik.handleChange}
                            />
                          </Box>
                        </Box>{" "}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            pb: 2,
                            flexDirection: "column",
                            width: "25%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            sx={{ alignContent: "center" }}
                          >
                            Card 2:{" "}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                              maxLength={13}
                              value={formik.values.section3.card2.text1 || ""}
                              onChange={formik.handleChange}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                              maxLength={127}
                              value={formik.values.section3.card2.text2 || ""}
                              onChange={formik.handleChange}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            pb: 2,
                            flexDirection: "column",
                            width: "25%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            sx={{ alignContent: "center" }}
                          >
                            Card 3:{" "}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                              maxLength={12}
                              value={formik.values.section3.card3.text1 || ""}
                              onChange={formik.handleChange}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                              maxLength={50}
                              value={formik.values.section3.card3.text2 || ""}
                              onChange={formik.handleChange}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            pb: 2,
                            flexDirection: "column",
                            width: "25%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            sx={{ alignContent: "center" }}
                          >
                            Card 4:{" "}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                              maxLength={12}
                              value={formik.values.section3.card4.text1 || ""}
                              onChange={formik.handleChange}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                              maxLength={50}
                              value={formik.values.section3.card4.text2 || ""}
                              onChange={formik.handleChange}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500, pb: 0.8 }}
                          >
                            Image
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              document
                                .getElementById("info-image-upload")
                                .click()
                            }
                          >
                            <input
                              id="info-image-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              hidden
                              onChange={(e) => {
                                handleUploadEstimatesImage(
                                  e,
                                  "content.section3.bgimage",
                                  { height: 400, width: 700 }
                                );
                                e.target.value = "";
                              }}
                            />
                            <Box sx={{ position: "relative" }}>
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: "-10px",
                                  zIndex: 3,
                                  right: "-5px",
                                }}
                              >
                                <IconButton
                                  disabled={
                                    uploadLoading["content.section3.bgimage"]
                                  }
                                  sx={{
                                    background: "#8477DA",
                                    color: "white",
                                    p: "5px",
                                    ":hover": {
                                      background: "#8477DA",
                                    },
                                  }}
                                >
                                  <Edit sx={{ fontSize: "20px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  height: "100%",
                                  width: "100%",
                                  position: "absolute",
                                  zIndex: 3,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  {uploadLoading["content.section3.bgimage"] ? (
                                    <CircularProgress
                                      sx={{ color: "#8477DA" }}
                                      size={32}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Box>
                              </Box>

                              {formik.values.section3?.bgimage ? (
                                <img
                                  src={`${backendURL}/${formik.values.section3?.bgimage}`}
                                  width="400"
                                  height={380}
                                  alt="not found"
                                  style={{
                                    border: "1px solid  #ccc",
                                    borderRadius: "10px",
                                    opacity: uploadLoading[
                                      "content.section3.bgimage"
                                    ]
                                      ? 0.3
                                      : 1,
                                  }}
                                />
                              ) : (
                                <img
                                  src={infoBgHeaderImage}
                                  width="100%"
                                  height={380}
                                  alt="not found"
                                  style={{
                                    border: "1px solid  #ccc",
                                    borderRadius: "10px",
                                    opacity: uploadLoading[
                                      "content.section3.bgimage"
                                    ]
                                      ? 0.3
                                      : 1,
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* section 4 */}{" "}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" fontWeight={"bold"}>
                        Craftsmanship Warranty
                      </Typography>
                      <CustomToggle
                        title={"Craftsmanship Warranty Status"}
                        isText={false}
                        checked={formik.values.section4.status}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "section4.status",
                            e.target.checked
                          );
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        gap: 1,
                        border: "1px solid #ccc",
                        mt: 2,
                        px: 3,
                        py: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", gap: 2, pb: 2, width: "100%" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Heading
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
                            name="section4.heading"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={69}
                            value={formik.values.section4.heading || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>{" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Sub Heading
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
                            name="section4.subheading"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={154}
                            value={formik.values.section4.subheading || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <TextEditor
                          text={warrantyText}
                          setText={setWarrantyText}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* section 5 */}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" fontWeight={"bold"}>
                        FAQs
                      </Typography>
                      <CustomToggle
                        title={"FAQs Status"}
                        isText={false}
                        checked={formik.values.section5.status}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "section5.status",
                            e.target.checked
                          );
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        border: "1px solid #ccc",
                        mt: 2,
                        px: 3,
                        py: 2,
                      }}
                    >
                      {" "}
                      <Box sx={{ width: "70%" }}>
                        {" "}
                        <FAQSection
                          accordionData={accordionData}
                          setAccordionData={setAccordionData}
                        />
                      </Box>
                      <Box sx={{ width: "30%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500, pb: 0.8 }}
                          >
                            Image
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              document
                                .getElementById("faqs-image-upload")
                                .click()
                            }
                          >
                            <input
                              id="faqs-image-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              hidden
                              onChange={(e) => {
                                handleUploadEstimatesImage(
                                  e,
                                  "content.section5.image",
                                  { height: 380, width: 380 }
                                );
                                e.target.value = "";
                              }}
                            />
                            <Box sx={{ position: "relative" }}>
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: "-10px",
                                  zIndex: 3,
                                  right: "-5px",
                                }}
                              >
                                <IconButton
                                  disabled={
                                    uploadLoading["content.section5.image"]
                                  }
                                  sx={{
                                    background: "#8477DA",
                                    color: "white",
                                    p: "5px",
                                    ":hover": {
                                      background: "#8477DA",
                                    },
                                  }}
                                >
                                  <Edit sx={{ fontSize: "20px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  height: "100%",
                                  width: "100%",
                                  position: "absolute",
                                  zIndex: 3,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  {uploadLoading["content.section5.image"] ? (
                                    <CircularProgress
                                      sx={{ color: "#8477DA" }}
                                      size={24}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Box>
                              </Box>

                              {formik.values.section5?.image ? (
                                <img
                                  src={`${backendURL}/${formik.values.section5?.image}`}
                                  width="100%"
                                  height={380}
                                  alt="not found"
                                  style={{
                                    border: "1px solid  #ccc",
                                    borderRadius: "10px",
                                    opacity: uploadLoading[
                                      "content.section5.image"
                                    ]
                                      ? 0.3
                                      : 1,
                                  }}
                                />
                              ) : (
                                <img
                                  src={LimitationImg}
                                  width="100%"
                                  height={380}
                                  alt="not found"
                                  style={{
                                    border: "1px solid  #ccc",
                                    borderRadius: "10px",
                                    opacity: uploadLoading[
                                      "content.section5.image"
                                    ]
                                      ? 0.3
                                      : 1,
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* section 6 */}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" fontWeight={"bold"}>
                        File a Claim
                      </Typography>
                      <CustomToggle
                        title={"File a Claim Status"}
                        isText={false}
                        checked={formik.values.section6.status}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "section6.status",
                            e.target.checked
                          );
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        border: "1px solid #ccc",
                        mt: 2,
                        px: 3,
                        py: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2, pb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Heading
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
                            name="section6.heading"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={20}
                            value={formik.values.section6.heading || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>{" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Sub Heading
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
                            name="section6.subheading"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={142}
                            value={formik.values.section6.subheading || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>{" "}
                      </Box>{" "}
                      <FAQSection
                        accordionData={claimData}
                        setAccordionData={setClaimData}
                      />
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Bottom Text
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
                            name="section6.bottomtext"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={197}
                            value={formik.values.section6.bottomtext || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>{" "}
                      </Box>
                    </Box>
                  </Box>
                  {/* section 7 */}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" fontWeight={"bold"}>
                        Maintenance Cards
                      </Typography>
                      <CustomToggle
                        title={"Maintenance Cards Status"}
                        isText={false}
                        checked={formik.values.section7.status}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "section7.status",
                            e.target.checked
                          );
                        }}
                      />
                    </Box>
                    <Box sx={{ border: "1px solid #ccc", mt: 2, px: 3, pt: 2 }}>
                      <Box sx={{ display: "flex", gap: 2, pb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Heading
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
                            name="section7.heading"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={26}
                            value={formik.values.section7.heading || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>{" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                            width: "33%",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500 }}
                          >
                            Description
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
                            name="section7.description"
                            placeholder="Enter Text"
                            size="large"
                            variant="outlined"
                            maxLength={181}
                            value={formik.values.section7.description || ""}
                            onChange={formik.handleChange}
                          />
                        </Box>{" "}
                      </Box>
                      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            pb: 2,
                            width: "33%",
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
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                            flexDirection: "column",
                            gap: 2,
                            pb: 2,
                            width: "33%",
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
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                            flexDirection: "column",
                            gap: 2,
                            pb: 2,
                            width: "33%",
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
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
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
                  {/* section 8 */}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" fontWeight={"bold"}>
                        Glass Upgrade Product
                      </Typography>
                      <CustomToggle
                        title={"Glass Upgrade Product Status"}
                        isText={false}
                        checked={formik.values.section8.status}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "section8.status",
                            e.target.checked
                          );
                        }}
                      />
                    </Box>
                    <Box sx={{ border: "1px solid #ccc", mt: 2, px: 3, pt: 2 }}>
                      <Box
                        sx={{
                          gap: 2,
                          pb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                              width: "30%",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
                              Product Title
                            </Typography>
                            <TextareaAutosize
                              style={{
                                padding: "10px",
                                borderColor: "#cccc",
                                borderRadius: "5px",
                              }}
                              className="custom-textfield"
                              color="neutral"
                              minRows={4}
                              maxRows={4}
                              name="section8.product.title"
                              placeholder="Enter Text"
                              size="large"
                              variant="outlined"
                              maxLength={62}
                              value={formik.values.section8.product.title || ""}
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
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
                              Product Description
                            </Typography>
                            <TextareaAutosize
                              style={{
                                padding: "10px",
                                borderColor: "#cccc",
                                borderRadius: "5px",
                              }}
                              className="custom-textfield"
                              color="neutral"
                              minRows={4}
                              maxRows={4}
                              placeholder="Enter Text"
                              size="large"
                              variant="outlined"
                              name="section8.product.desc1"
                              maxLength={276}
                              value={formik.values.section8.product.desc1 || ""}
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
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500 }}
                            >
                              Result Description
                            </Typography>
                            <TextareaAutosize
                              style={{
                                padding: "10px",
                                borderColor: "#cccc",
                                borderRadius: "5px",
                              }}
                              className="custom-textfield"
                              color="neutral"
                              minRows={4}
                              maxRows={4}
                              placeholder="Enter Text"
                              size="large"
                              variant="outlined"
                              name="section8.product.desc2"
                              maxLength={184}
                              value={formik.values.section8.product.desc2 || ""}
                              onChange={formik.handleChange}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 3, pt: 1.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                pb: 0.8,
                              }}
                            >
                              Product image
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  document
                                    .getElementById("product-image-upload")
                                    .click()
                                }
                              >
                                <input
                                  id="product-image-upload"
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  hidden
                                  onChange={(e) => {
                                    handleUploadEstimatesImage(
                                      e,
                                      "content.section8.image1",
                                      { height: 380, width: 296 }
                                    );
                                    e.target.value = "";
                                  }}
                                />
                                <Box sx={{ position: "relative" }}>
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "-10px",
                                      zIndex: 3,
                                      right: "-5px",
                                    }}
                                  >
                                    <IconButton
                                      disabled={
                                        uploadLoading["content.section8.image1"]
                                      }
                                      sx={{
                                        background: "#8477DA",
                                        color: "white",
                                        p: "5px",
                                        ":hover": {
                                          background: "#8477DA",
                                        },
                                      }}
                                    >
                                      <Edit sx={{ fontSize: "20px" }} />
                                    </IconButton>
                                  </Box>{" "}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      height: "100%",
                                      width: "100%",
                                      position: "absolute",
                                      zIndex: 3,
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box>
                                      {uploadLoading[
                                        "content.section8.image1"
                                      ] ? (
                                        <CircularProgress
                                          sx={{ color: "#8477DA" }}
                                          size={24}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </Box>
                                  </Box>
                                  {formik.values.section8?.image1 ? (
                                    <img
                                      src={`${backendURL}/${formik.values.section8?.image1}`}
                                      width="100%"
                                      height={380}
                                      alt="not found"
                                      style={{
                                        border: "1px solid  #ccc",
                                        borderRadius: "10px",
                                        opacity: uploadLoading[
                                          "content.section8.image1"
                                        ]
                                          ? 0.3
                                          : 1,
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={Imag1}
                                      width="100%"
                                      height={380}
                                      alt="not found"
                                      style={{
                                        border: "1px solid  #ccc",
                                        borderRadius: "10px",
                                        opacity: uploadLoading[
                                          "content.section8.image1"
                                        ]
                                          ? 0.3
                                          : 1,
                                      }}
                                    />
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                pb: 0.8,
                              }}
                            >
                              Result Image
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  document
                                    .getElementById(
                                      "product-result-image-upload"
                                    )
                                    .click()
                                }
                              >
                                <input
                                  id="product-result-image-upload"
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  hidden
                                  onChange={(e) => {
                                    handleUploadEstimatesImage(
                                      e,
                                      "content.section8.image2",
                                      { height: 380, width: 442 }
                                    );
                                    e.target.value = "";
                                  }}
                                />
                                <Box sx={{ position: "relative" }}>
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "-10px",
                                      zIndex: 3,
                                      right: "-5px",
                                    }}
                                  >
                                    <IconButton
                                      disabled={
                                        uploadLoading["content.section8.image2"]
                                      }
                                      sx={{
                                        background: "#8477DA",
                                        color: "white",
                                        p: "5px",
                                        ":hover": {
                                          background: "#8477DA",
                                        },
                                      }}
                                    >
                                      <Edit sx={{ fontSize: "20px" }} />
                                    </IconButton>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      height: "100%",
                                      width: "100%",
                                      position: "absolute",
                                      zIndex: 3,
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box>
                                      {uploadLoading[
                                        "content.section8.image2"
                                      ] ? (
                                        <CircularProgress
                                          sx={{ color: "#8477DA" }}
                                          size={24}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </Box>
                                  </Box>

                                  {formik.values.section8?.image2 ? (
                                    <img
                                      src={`${backendURL}/${formik.values.section8?.image2}`}
                                      width="100%"
                                      height={380}
                                      alt="not found"
                                      style={{
                                        border: "1px solid  #ccc",
                                        borderRadius: "10px",
                                        opacity: uploadLoading[
                                          "content.section8.image2"
                                        ]
                                          ? 0.3
                                          : 1,
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={Imag2}
                                      width="100%"
                                      height={380}
                                      alt="not found"
                                      style={{
                                        border: "1px solid  #ccc",
                                        borderRadius: "10px",
                                        opacity: uploadLoading[
                                          "content.section8.image2"
                                        ]
                                          ? 0.3
                                          : 1,
                                      }}
                                    />
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ px: 2 }}>
                    <Typography
                      sx={{
                        fontSize: { lg: 17, md: 14 },
                        fontWeight: 600,
                        lineHeight: "21.86px",
                      }}
                    >
                      Note:
                    </Typography>
                    <Typography
                      sx={{
                        color: "#212528",
                        fontSize: { lg: 17, md: 14 },
                        fontWeight: 600,
                        lineHeight: "21.86px",
                        opacity: "70%",
                        pt: 1,
                      }}
                    >
                      The following sections are dedicated to the Second Preview
                      page.
                    </Typography>
                  </Box>
                  {/* section 9 */}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" fontWeight={"bold"}>
                        Terms and Conditions
                      </Typography>
                      <CustomToggle
                        title={
                          checkPreviewStatus
                            ? "Dedicated to Second Preview"
                            : "Terms and Conditions Status"
                        }
                        isText={false}
                        checked={formik.values.section9.status}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "section9.status",
                            e.target.checked
                          );
                        }}
                        disabled={checkPreviewStatus}
                      />
                    </Box>
                  </Box>
                  {/* section 10 */}
                  <Box sx={{ px: 2, pb: 6 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" fontWeight={"bold"}>
                        Signature and Payment
                      </Typography>
                      <CustomToggle
                        title={
                          checkPreviewStatus
                            ? "Dedicated to Second Preview"
                            : "Signature and Payment Status"
                        }
                        isText={false}
                        checked={formik.values.section10.status}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "section10.status",
                            e.target.checked
                          );
                        }}
                        disabled={checkPreviewStatus}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
      <ScrollToTop color={"#fff"} background={"#8477DA"} />
    </>
  );
};
export default EditQuoteInvoice;
