import React, {
  useEffect,
  useState,
} from 'react';

import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import * as Yup from 'yup';

import Imag1 from '@/Assets/CustomerLandingImages/2.png';
import Imag2 from '@/Assets/CustomerLandingImages/3.png';
import bgHeaderImage from '@/Assets/CustomerLandingImages/BannerHeadImg.png';
import LimitationImg from '@/Assets/CustomerLandingImages/LimitationImg.svg';
import infoBgHeaderImage from '@/Assets/CustomerLandingImages/WhyChoice.svg';
import GCSLogo from '@/Assets/GCS-logo.png';
import InputImageIcon from '@/Assets/imageUploader.svg';
import CustomTabPanel from '@/components/CustomTabPanel';
import { getListData } from '@/redux/estimateCalculations';
import { getMirrorsHardware } from '@/redux/mirrorsHardwareSlice';
import { setLocationSettingsRefetch } from '@/redux/refetch';
import { showSnackbar } from '@/redux/snackBarSlice';
import { getDataRefetch } from '@/redux/staff';
import { getWineCellarsHardware } from '@/redux/wineCellarsHardwareSlice';
import { useEditDocument } from '@/utilities/ApiHooks/common';
import { useFetchDataSetting } from '@/utilities/ApiHooks/setting';
import { backendURL } from '@/utilities/common';
import {
  inputLength,
  inputMaxValue,
} from '@/utilities/constants';
import {
  Delete,
  Edit,
} from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';

import FAQSection
  from '../ProjectInvoices/CreateEditInvoice/EditQuotePage/FAQSection';
import TextEditor
  from '../ProjectInvoices/CreateEditInvoice/EditQuotePage/TextEditor';
import ScrollToTop from '../ScrollToTop';
import CustomInputField from '../ui-components/CustomInput';
import CustomToggle from '../ui-components/Toggle';

const termsCondition = `<div style="font-family: 'Roboto', sans-serif; font-size: 17px; font-weight: 500; line-height: 25.5px; color: #6b6b6b; padding-right: 5px;">
  <div>Last Revised: December 16, 2013</div>
  <div>
    Welcome to www.lorem-ipsum.info. This site is provided as a
    service to our visitors and may be used for informational
    purposes only. Because the Terms and Conditions contain legal
    obligations, please read them carefully.
  </div>

  <div style="display: flex; flex-direction: column;">
    <div>
      <strong>1. YOUR AGREEMENT</strong> <br>
      <span>By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site. PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.</span>
    </div>

    <div>
      <strong>2. PRIVACY</strong> <br>
      <span>Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices.</span>
    </div>

    <div>
      <strong>3. LINKED SITES</strong> <br>
      <span>This Site may contain links to other independent third-party Web sites ("Linked Sites"). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under our control, and we are not responsible for and do not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites.</span>
    </div>

    <div>
      <strong>4. FORWARD LOOKING STATEMENTS</strong> <br>
      <span>All materials reproduced on this site speak as of the original date of publication or filing. The fact that a document is available on this site does not mean that the information contained in such document has not been modified or superseded by events or by a subsequent document or filing. We have no duty or policy to update any information or statements contained on this site and, therefore, such information or statements should not be relied upon as being current as of the date you access this site.</span>
    </div>

    <div>
      <strong>5. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY</strong> <br>
      <span>A. This site may contain inaccuracies and typographical errors. We does not warrant the accuracy or completeness of the materials or the reliability of any advice, opinion, statement or other information displayed or distributed through the site. You expressly understand and agree that: (i) Your use of the site, including any reliance on any such opinion, advice, statement, memorandum, or information contained herein, shall be at your sole risk; (ii) The site is provided on an "as is" and "as available" basis; (iii) Except as expressly provided herein we disclaim all warranties of any kind, whether express or implied, including, but not limited to implied warranties of merchantability, fitness for a particular purpose, workmanlike effort, title and non-infringement; (iv) We make no warranty with respect to the results that may be obtained from this site, the products or services advertised or offered or merchants involved; (v) Any material downloaded or otherwise obtained through the use of the site is done at your own discretion and risk; and (vi) You will be solely responsible for any damage to your computer system or for any loss of data that results from the download of any such material.</span>
<span>B. You understand and agree that under no circumstances, including, but not limited to, negligence, shall we be liable for any direct, indirect, incidental, special, punitive or consequential damages that result from the use of, or the inability to use, any of our sites or materials or functions on any such site, even if we have been advised of the possibility of such damages. The foregoing limitations shall apply notwithstanding any failure of essential purpose of any limited remedy.</span>      </div>
    <div>
      <strong>6. EXCLUSIONS AND LIMITATIONS</strong> <br>
<span>Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, our liability in such jurisdiction shall be limited to the maximum extent permitted by law.</span>    </div>

    <div>
      <strong>7. OUR PROPRIETARY RIGHTS</strong> <br>
      <span>This Site and all its Contents are intended solely for personal, non-commercial use. Except as expressly provided, nothing within the Site shall be construed as conferring any license under our or any third party's intellectual property rights, whether by estoppel, implication, waiver, or otherwise. Without limiting the generality of the foregoing, you acknowledge and agree that all content available through and used to operate the Site and its services is protected by copyright, trademark, patent, or other proprietary rights. You agree not to: (a) modify, alter, or deface any of the trademarks, service marks, trade dress (collectively "Trademarks") or other intellectual property made available by us in connection with the Site; (b) hold yourself out as in any way sponsored by, affiliated with, or endorsed by us, or any of our affiliates or service providers; (c) use any of the Trademarks or other content accessible through the Site for any purpose other than the purpose for which we have made it available to you; (d) defame or disparage us, our Trademarks, or any aspect of the Site; and (e) adapt, translate, modify, decompile, disassemble, or reverse engineer the Site or any software or programs used in connection with it or its products and services. The framing, mirroring, scraping or data mining of the Site or any of its content in any form and by any method is expressly prohibited.</span>
    </div>

    <div>
      <strong>8. INDEMNITY</strong> <br>
      <span>By using the Site websites you agree to indemnify us and affiliated entities (collectively "Indemnities") and hold them harmless from any and all claims and expenses, including (without limitation) attorney's fees, arising from your use of the Site websites, your use of the Products and Services, or your submission of ideas and/or related materials to us or from any person's use of any ID, membership or password you maintain with any portion of the Site, regardless of whether such use is authorized by you.</span>
    </div>

    <div>
      <strong>9. COPYRIGHT AND TRADEMARK NOTICE</strong> <br>
      <span>Except our generated dummy copy, which is free to use for private and commercial use, all other text is copyrighted. generator.lorem-ipsum.info © 2013, all rights reserved.</span>
    </div>

    <div>
      <strong>10. INTELLECTUAL PROPERTY INFRINGEMENT CLAIMS</strong> <br>
      <span>It is our policy to respond expeditiously to claims of intellectual property infringement. We will promptly process and investigate notices of alleged infringement and will take appropriate actions under the Digital Millennium Copyright Act ("DMCA") and other applicable intellectual property laws. Notices of claimed infringement should be directed to: generator.lorem-ipsum.info 126 Electricov St. Kiev, Kiev 04176 Ukraine contact@lorem-ipsum.info</span>
    </div>

    <div>
      <strong>11. PLACE OF PERFORMANCE</strong> <br>
      <span>This Site is controlled, operated and administered by us from our office in Kiev, Ukraine. We make no representation that materials at this site are appropriate or available for use at other locations outside of the Ukraine and access to them from territories where their contents are illegal is prohibited. If you access this Site from a location outside of the Ukraine, you are responsible for compliance with all local laws.</span>
    </div>
    <div>
      <strong>12. GENERAL</strong> <br>
      <span>A. If any provision of these Terms and Conditions is held to be invalid or unenforceable, the provision shall be removed (or interpreted, if possible, in a manner as to be enforceable), and the remaining provisions shall be enforced. Headings are for reference purposes only and in no way define, limit, construe or describe the scope or extent of such section. Our failure to act with respect to a breach by you or others does not waive our right to act with respect to subsequent or similar breaches. These Terms and Conditions set forth the entire understanding and agreement between us with respect to the subject matter contained herein and supersede any other agreement, proposals and communications, written or oral, between our representatives and you with respect to the subject matter hereof, including any terms and conditions on any of customer's documents or purchase orders.</span>
      <span> B. No Joint Venture, No Derogation of Rights.You agree that no joint venture, partnership, employment, or agency relationship exists between you and us as a result of these Terms and Conditions or your use of the Site. Our performance of these Terms and Conditions is subject to existing laws and legal process, and nothing contained herein is in derogation of our right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by us with respect to such use.</span>
      </div>
  </div>
</div>
`;

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

const CampanySetting = () => {
  const dispatch = useDispatch();
  const showerGlassList = useSelector(getListData);
  const mirrorGlassList = useSelector(getMirrorsHardware);
  const wineCallerGlassList = useSelector(getWineCellarsHardware);
  const { data: settingData, refetch: reFetchDataSetting } =
    useFetchDataSetting();
  const {
    mutateAsync: editSetting,
    isLoading: editLoading,
    isSuccess: SuccessForEdit,
  } = useEditDocument();
  const [selectedImage, setSelectedImage] = useState(null);

  const CustomerU_change = useSelector(getDataRefetch);
  const [value, setValue] = React.useState(0);
  const [termsText, setTermsText] = useState("");
  const [uploadLoading, setUploadLoading] = useState({
    "presentationSettings.section1.logo": false,
    "presentationSettings.section1.backgroundImage": false,
    "presentationSettings.section3.backgroundImage": false,
    "presentationSettings.section5.image": false,
    "presentationSettings.section8.image1": false,
    "presentationSettings.section8.image2": false,
    "presentationSettings.section2.shower.images": false,
    "presentationSettings.section2.mirror.images": false,
    "presentationSettings.section2.wineCellar.images": false,
  });
  const [warrantyText, setWarrantyText] = useState(
    settingData?.presentationSettings?.section4?.description ?? WarrantyText
  );
  const [accordionData, setAccordionData] = useState(
    settingData?.presentationSettings?.section5?.faqs ?? accordionDefaultData
  );
  const [claimData, setClaimData] = useState(
    settingData?.presentationSettings?.section6?.claimData ?? claimDefaultData
  );
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (SuccessForEdit) {
      reFetchDataSetting();
      dispatch(setLocationSettingsRefetch());
    }
  }, [SuccessForEdit]);

  useEffect(() => {
    reFetchDataSetting();
  }, [CustomerU_change]);

  useEffect(() => {
    if (settingData) {
      setTermsText(
        settingData?.presentationSettings?.section9?.termsAndConditions?.length
          ? settingData?.presentationSettings?.section9?.termsAndConditions
          : termsCondition
      );
      setAccordionData(
        settingData?.presentationSettings?.section5?.faqs ??
          accordionDefaultData
      );
      setClaimData(
        settingData?.presentationSettings?.section6?.claimData ??
          claimDefaultData
      );
      setWarrantyText(
        settingData?.presentationSettings?.section4?.description ?? WarrantyText
      );
    }
  }, [settingData]);

  const onDrop = async (acceptedFiles) => {
    const image = acceptedFiles[0];
    if (image) {
      setSelectedImage(image);
      // formik.setFieldValue("image", image);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("data", JSON.stringify({}));
      await editSetting({
        data: formData,
        apiRoute: `${backendURL}/companies/${settingData._id}`,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    showers: Yup.object().shape({
      doorWidth: Yup.number()
        .required("Max door width is required")
        .min(1, "Door width must be at least 1")
        .max(39, "Door width cannot exceed 39"),
    }),
    wineCellars: Yup.object().shape({
      doorWidth: Yup.number()
        .required("Max door width is required")
        .min(1, "Door width must be at least 1")
        .max(39, "Door width cannot exceed 39"),
    }),
  });
  const { getInputProps } = useDropzone({ onDrop });
  const formik = useFormik({
    initialValues: {
      name: settingData?.name,
      address: settingData?.address,
      image: selectedImage,
      showers: {
        doorWidth: settingData?.showers?.doorWidth,
        miscPricing: {
          pricingFactor: settingData?.showers?.miscPricing?.pricingFactor,
          hourlyRate: settingData?.showers?.miscPricing?.hourlyRate,
          pricingFactorStatus:
            settingData?.showers?.miscPricing?.pricingFactorStatus,
        },
        fabricatingPricing: {
          oneHoleOneByTwoInchGlass:
            settingData?.showers?.fabricatingPricing?.oneHoleOneByTwoInchGlass,
          oneHoleThreeByEightInchGlass:
            settingData?.showers?.fabricatingPricing
              ?.oneHoleThreeByEightInchGlass,
          clampCutoutOneByTwoInch:
            settingData?.showers?.fabricatingPricing?.clampCutoutOneByTwoInch,
          clampCutoutThreeByEightInch:
            settingData?.showers?.fabricatingPricing
              ?.clampCutoutThreeByEightInch,
          hingeCutoutOneByTwoInch:
            settingData?.showers?.fabricatingPricing?.hingeCutoutOneByTwoInch,
          hingeCutoutThreeByEightInch:
            settingData?.showers?.fabricatingPricing
              ?.hingeCutoutThreeByEightInch,
          miterOneByTwoInch:
            settingData?.showers?.fabricatingPricing?.miterOneByTwoInch,
          miterThreeByEightInch:
            settingData?.showers?.fabricatingPricing?.miterThreeByEightInch,
          notchOneByTwoInch:
            settingData?.showers?.fabricatingPricing?.notchOneByTwoInch,
          notchThreeByEightInch:
            settingData?.showers?.fabricatingPricing?.notchThreeByEightInch,
          outageOneByTwoInch:
            settingData?.showers?.fabricatingPricing?.outageOneByTwoInch,
          outageThreeByEightInch:
            settingData?.showers?.fabricatingPricing?.outageThreeByEightInch,
          polishPricePerOneByTwoInch:
            settingData?.showers?.fabricatingPricing
              ?.polishPricePerOneByTwoInch,
          polishPricePerThreeByEightInch:
            settingData?.showers?.fabricatingPricing
              ?.polishPricePerThreeByEightInch,
        },
        glassTypesForComparison:
          settingData?.showers?.glassTypesForComparison || [],
      },
      mirrors: {
        pricingFactor: settingData?.mirrors?.pricingFactor,
        hourlyRate: settingData?.mirrors?.hourlyRate,
        pricingFactorStatus: settingData?.mirrors?.pricingFactorStatus,
        holeMultiplier: settingData?.mirrors?.holeMultiplier ?? 0,
        lightHoleMultiplier: settingData?.mirrors?.lightHoleMultiplier ?? 0,
        notchMultiplier: settingData?.mirrors?.notchMultiplier ?? 0,
        singleOutletCutoutMultiplier:
          settingData?.mirrors?.singleOutletCutoutMultiplier ?? 0,
        doubleOutletCutoutMultiplier:
          settingData?.mirrors?.doubleOutletCutoutMultiplier ?? 0,
        tripleOutletCutoutMultiplier:
          settingData?.mirrors?.tripleOutletCutoutMultiplier ?? 0,
        quadOutletCutoutMultiplier:
          settingData?.mirrors?.quadOutletCutoutMultiplier ?? 0,
        glassTypesForComparison:
          settingData?.mirrors?.glassTypesForComparison || [],
      },
      // Wine Caller
      wineCellars: {
        doorWidth: settingData?.wineCellars?.doorWidth || 0,
        miscPricing: {
          pricingFactor:
            settingData?.wineCellars?.miscPricing?.pricingFactor || 0,
          hourlyRate: settingData?.wineCellars?.miscPricing?.hourlyRate || 0,
          pricingFactorStatus:
            settingData?.wineCellars?.miscPricing?.pricingFactorStatus,
        },
        fabricatingPricing: {
          oneHoleOneByTwoInchGlass:
            settingData?.wineCellars?.fabricatingPricing
              ?.oneHoleOneByTwoInchGlass || 0,
          oneHoleThreeByEightInchGlass:
            settingData?.wineCellars?.fabricatingPricing
              ?.oneHoleThreeByEightInchGlass || 0,
          clampCutoutOneByTwoInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.clampCutoutOneByTwoInch || 0,
          clampCutoutThreeByEightInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.clampCutoutThreeByEightInch || 0,
          hingeCutoutOneByTwoInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.hingeCutoutOneByTwoInch || 0,
          hingeCutoutThreeByEightInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.hingeCutoutThreeByEightInch || 0,
          miterOneByTwoInch:
            settingData?.wineCellars?.fabricatingPricing?.miterOneByTwoInch ||
            0,
          miterThreeByEightInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.miterThreeByEightInch || 0,
          notchOneByTwoInch:
            settingData?.wineCellars?.fabricatingPricing?.notchOneByTwoInch ||
            0,
          notchThreeByEightInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.notchThreeByEightInch || 0,
          outageOneByTwoInch:
            settingData?.wineCellars?.fabricatingPricing?.outageOneByTwoInch ||
            0,
          outageThreeByEightInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.outageThreeByEightInch || 0,
          polishPricePerOneByTwoInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.polishPricePerOneByTwoInch || 0,
          polishPricePerThreeByEightInch:
            settingData?.wineCellars?.fabricatingPricing
              ?.polishPricePerThreeByEightInch || 0,
        },
        glassTypesForComparison:
          settingData?.wineCellars?.glassTypesForComparison || [],
      },
      pdfSettings: {
        cost: settingData?.pdfSettings?.cost,
        hours: settingData?.pdfSettings?.hours,
        labor: settingData?.pdfSettings?.labor,
        people: settingData?.pdfSettings?.people,
        profit: settingData?.pdfSettings?.profit,
      },
      highlevelSettings: {
        locationReference:
          settingData?.highlevelSettings?.locationReference ?? "",
        apiKey: settingData?.highlevelSettings?.apiKey ?? "",
      },
      presentationSettings: {
        colorSection: {
          primary:
            settingData?.presentationSettings?.colorSection?.primary ??
            "#F95500",
          secondary:
            settingData?.presentationSettings?.colorSection?.secondary ??
            "#FFFFFF",
          default:
            settingData?.presentationSettings?.colorSection?.default ??
            "#000000",
        },
        section1: {
          text1:
            settingData?.presentationSettings?.section1?.text1 ||
            "Your GCS Estimate Presentation",
          text2:
            settingData?.presentationSettings?.section1?.text2 ||
            "Turning your Vision into reality– Get a Precise Estimate for Your Next Project Today!",
          logo: settingData?.presentationSettings?.section1?.logo,
          backgroundImage:
            settingData?.presentationSettings?.section1?.backgroundImage,
        },
        section2: {
          shower: {
            images:
              settingData?.presentationSettings?.section2?.shower?.images ?? [],
            description:
              settingData?.presentationSettings?.section2?.shower
                ?.description ?? "",
            status:
              settingData?.presentationSettings?.section2?.shower?.status ??
              true,
          },
          mirror: {
            images:
              settingData?.presentationSettings?.section2?.mirror?.images ?? [],
            description:
              settingData?.presentationSettings?.section2?.mirror
                ?.description ?? "",
            status:
              settingData?.presentationSettings?.section2?.mirror?.status ??
              true,
          },
          wineCellar: {
            images:
              settingData?.presentationSettings?.section2?.wineCellar?.images ??
              [],
            description:
              settingData?.presentationSettings?.section2?.wineCellar
                ?.description ?? "",
            status:
              settingData?.presentationSettings?.section2?.wineCellar?.status ??
              true,
          },
        },
        section3: {
          heading:
            settingData?.presentationSettings?.section3?.heading ||
            "Why Choose GCS?",
          subHeading:
            settingData?.presentationSettings?.section3?.subHeading ||
            "The Highest Quality Residential Glass Services",
          description:
            settingData?.presentationSettings?.section3?.description ||
            "Founded in 2013 in Phoenix Arizona, GCS has had a tremendous amount of success due to our “can do it” attitude along with our innovative approach to every aspect of the business.",
          backgroundImage:
            settingData?.presentationSettings?.section3?.backgroundImage,
          status: settingData?.presentationSettings?.section3?.status ?? true,
          card1: {
            text1:
              settingData?.presentationSettings?.section3?.card1?.text1 ||
              "Lasting Impressions",
            text2:
              settingData?.presentationSettings?.section3?.card1?.text2 ||
              "Replacing just the glass in your shower will give your bathroom a million-dollar look.",
          },
          card2: {
            text1:
              settingData?.presentationSettings?.section3?.card2?.text1 ||
              "Customer Care",
            text2:
              settingData?.presentationSettings?.section3?.card2?.text2 ||
              "When you work with us, it’s an experience you will love from the initial contact to the final install.",
          },
          card3: {
            text1:
              settingData?.presentationSettings?.section3?.card3?.text1 ||
              "Fast Response",
            text2:
              settingData?.presentationSettings?.section3?.card3?.text2 ||
              "Schedule today and let us help you design and install your next project.",
          },
          card4: {
            text1:
              settingData?.presentationSettings?.section3?.card4?.text1 ||
              "High Clarity",
            text2:
              settingData?.presentationSettings?.section3?.card4?.text2 ||
              "Don’t forget to ask about our starphire ultra-clear glass. It will change your life.",
          },
        },
        section4: {
          heading:
            settingData?.presentationSettings?.section4?.heading ||
            "Lifetime Craftsmanship Warranty – Our Promise to You",
          subHeading:
            settingData?.presentationSettings?.section4?.subHeading ||
            "At GCS Glass & Mirror, we stand by our commitment to superior craftsmanship, customized design, and unparalleled customer satisfaction.",
          status: settingData?.presentationSettings?.section4?.status ?? true,
          description: warrantyText ?? WarrantyText,
        },
        section5: {
          image: settingData?.presentationSettings?.section5?.image,
          status: settingData?.presentationSettings?.status ?? true,
          faqs: accordionData ?? accordionDefaultData,
        },
        section6: {
          heading:
            settingData?.presentationSettings?.section6?.heading ||
            "How to File a Claim",
          subHeading:
            settingData?.presentationSettings?.section6?.subHeading ||
            "Submitting a warranty claim is easy! Simply contact your local GCS Glass & Mirror location to begin the process:",
          bottomText:
            settingData?.presentationSettings?.section6?.bottomText ||
            "At GCS Glass & Mirror, we value your trust and strive to provide only the highest-quality products and services. Thank you for choosing us to transform your spaces!",
          status: settingData?.presentationSettings?.section6?.status ?? true,
          claimData: claimData ?? claimDefaultData,
        },
        section7: {
          heading:
            settingData?.presentationSettings?.section7?.heading ??
            "Glass & shower maintenance",
          description:
            settingData?.presentationSettings?.section7?.description ??
            "Please note, acid etched/frosted glass is extremely susceptible to fingerprints and spotting due to the oil on your hands and other environmental factors such as steam.",
          status: settingData?.presentationSettings?.section7?.status ?? true,
          card1: {
            text1:
              settingData?.presentationSettings?.section7?.card1?.text1 ||
              "WAIT BEFORE FIRST USE",
            text2:
              settingData?.presentationSettings?.section7?.card1?.text2 ||
              "If silicone was used on your project, give your silicone at least 24 hours to completely dry before first use",
          },
          card2: {
            text1:
              settingData?.presentationSettings?.section7?.card2?.text1 ||
              "DAILY MAINTENANCE",
            text2:
              settingData?.presentationSettings?.section7?.card2?.text2 ||
              "Crack your door after use or keep a squeegee handy to dry the inside of the shower to help with mold/mildew buildup. If your bathroom has a vent fan, use it when showering to keep the area as dry as possible. Wipe away moisture from your mirrors to maximize the life of the silver backing",
          },
          card3: {
            text1:
              settingData?.presentationSettings?.section7?.card3?.text1 ||
              "ROUTINE CLEANING",
            text2:
              settingData?.presentationSettings?.section7?.card3?.text2 ||
              "Never use aggressive cleaning materials (razorblades, steel wool, abrasives, etc.) to clean glass. Always use non-ammonia glass cleaner and/or alcohol to clean glass. Never use products containing hydrofluoric acid, fluorine, chlorine, or ammonia derivatives. They can damage the surface of the glass. Always clean the full surface of the glass. Spot cleaning might create halos. Never try to remove impurities with a dry or dirty cloth, as this may cause scratches or scuffs on the glass surface.",
          },
        },
        section8: {
          status: settingData?.presentationSettings?.section8?.status ?? true,
          product: {
            title:
              settingData?.presentationSettings?.section8?.product?.title ||
              "GCS ARMOR THE ULTIMATE GLASS PROTECTION SOLUTION",
            description1:
              settingData?.presentationSettings?.section8?.product
                ?.description1 ||
              "Glass is naturally porous, allowing water and contaminants to seep in, but GCS Armor's hydrophobic nano coating fills and seals these pores, leaving surfaces smooth and protected. Backed by a 10-year warranty, it ensures long-lasting durability.",
            description2:
              settingData?.presentationSettings?.section8?.product
                ?.description2 ||
              "Ask about our GCS Armor Bath Kit for easy maintenance, and experience the next level of glass protection today. Contact us to get started!",
          },
          image1: settingData?.presentationSettings?.section8?.image1,
          image2: settingData?.presentationSettings?.section8?.image2,
        },
        section9: {
          status: settingData?.presentationSettings?.section9?.status ?? true,
          termsAndConditions: termsText ?? termsCondition,
        },
        section10: {
          status: settingData?.presentationSettings?.section10?.status ?? true,
        },
      },
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "editedData");
      handleEditSetting(values);
    },
  });

  const handleEditSetting = async (props) => {
    const formData = new FormData();
    if (props?.image) {
      formData.append("image", props.image);
      delete props?.image;
    }
    if (props?.image === null ?? props?.image === undefined) {
      delete props?.image;
    }
    formData.append("data", JSON.stringify(props));
    await editSetting({
      data: formData,
      apiRoute: `${backendURL}/companies/${settingData._id}`,
    });
    reFetchDataSetting();
  };
  const handleCopy = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() =>
        dispatch(
          showSnackbar({ message: "Copied to clipboard ", severity: "success" })
        )
      )
      .catch((err) => console.error("Failed to copy text: ", err));
  };
  const optionsData = showerGlassList?.glassType || [];
  const mirrorGlass = mirrorGlassList?.glassTypes || [];
  const wineCallerGlass = wineCallerGlassList?.glassType || [];

  const handleChangeGlass = (fieldName, newValue) => {
    const selectedOptionIds = newValue.map((option) => option._id);
    formik.setFieldValue(fieldName, {
      ...formik.values[fieldName],
      glassTypesForComparison: selectedOptionIds,
    });
  };
  // Preview images
  const handleUploadPreviewImage = async (event, images, key) => {
    if (images?.length < 5) {
      const image = event.target.files[0];
      if (image) {
        setUploadLoading((prevState) => ({
          ...prevState,
          [key]: true,
        }));
        const formData = new FormData();
        formData.append("image", image);
        // formData.append("key", key);
        formData.append("data", JSON.stringify({ key }));
        // Make the API call
        await editSetting({
          data: formData,
          apiRoute: `${backendURL}/companies/${settingData._id}`,
        });
        reFetchDataSetting();
      }
    } else {
      dispatch(
        showSnackbar({
          message: "You can upload a maximum of 5 images.",
          severity: "error",
        })
      );
    }
    setUploadLoading((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };

  const handleDeleteImageFromPrevew = async (
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
      const deletItem = JSON.stringify({
        key,
        gallery: galleryFiltered ?? [],
        removeGalleryImage,
      });

      await editSetting({
        data: { data: deletItem },
        apiRoute: `${backendURL}/companies/${settingData._id}`,
      });
      reFetchDataSetting();
    }
    setUploadLoading((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };

  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "#F6F5FF",
        }}
      >
        {/* setting */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Setting</Typography>
          <Box sx={{ width: "200px" }}>
            <Button
              disabled={editLoading}
              sx={{
                backgroundColor: "#8477DA",
                boxShadow: 0,
                ":hover": { backgroundColor: "#8477DA" },
              }}
              fullWidth
              variant="contained"
              onClick={formik.handleSubmit}
            >
              {editLoading ? (
                <CircularProgress size={20} sx={{ color: "#8477DA" }} />
              ) : (
                "Update"
              )}
            </Button>
          </Box>
        </Box>
        {/* profile */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "70%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {" "}
              <Typography>Profile </Typography>
              <Typography sx={{ color: "#667085" }}>
                This will be displayed on your profile.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, width: 410, mr: 5 }}>
              <img
                width={"40px"}
                height={"40px"}
                src={
                  selectedImage instanceof File
                    ? URL.createObjectURL(selectedImage)
                    : `${backendURL}/${settingData?.image}`
                }
                alt="Selected"
                style={{ borderRadius: "100%" }}
              />
              <Box sx={{ width: "100%" }}>
                <Box>
                  <input
                    accept="image/*"
                    id="image-input"
                    type="file"
                    {...getInputProps()}
                    style={{ display: "none" }}
                  />

                  <label htmlFor="image-input">
                    <Box
                      sx={{
                        border: "1px solid #EAECF0",
                        textAlign: "center",
                        padding: 2,
                      }}
                    >
                      <Box sx={{ height: 60 }}>
                        <img width={60} src={InputImageIcon} alt="not found" />
                      </Box>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Typography sx={{ color: "#8477DA" }}>
                          Click to {selectedImage ? "Eidt" : "Upload"}
                        </Typography>
                      </span>
                      <Typography variant="body2" sx={{ color: "#667085" }}>
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </Typography>
                    </Box>
                  </label>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Location name</Typography>
            <Box sx={{ width: "400px" }}>
              {" "}
              <CustomInputField
                fullWidth
                type="text"
                name="name"
                value={formik.values?.name}
                placeholder={"Enter Name"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Location Address</Typography>
            <Box sx={{ width: "400px" }}>
              {" "}
              <CustomInputField
                fullWidth
                type="text"
                name="address"
                value={formik.values?.address}
                placeholder={"Enter Address"}
                onChange={formik.handleChange}
              />
            </Box>
          </Box>
        </Box>

        {/** Tabs Switch */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              p: "2px",
              background: "#F3F5F6",
              border: "1px solid #D0D5DD",
              borderRadius: "6px",
              width: "fit-content",
            }}
          >
            <Button
              sx={{
                height: "36px",
                color: "black",
                backgroundColor: value === 0 ? "white" : "transparent",
                borderRadius: "4px !important",
                padding: "7px 12px 7px 12px !important",
                ":hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleChange(0)}
            >
              Showers
            </Button>
            <Button
              sx={{
                height: "36px",
                color: "black",
                backgroundColor: value === 1 ? "white" : "transparent",
                borderRadius: "4px !important",
                padding: "7px 12px 7px 12px !important",
                ":hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleChange(1)}
            >
              Mirrors
            </Button>
            <Button
              sx={{
                height: "36px",
                color: "black",
                backgroundColor: value === 2 ? "white" : "transparent",
                borderRadius: "4px !important",
                padding: "7px 12px 7px 12px !important",
                ":hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleChange(2)}
            >
              Wine Cellar
            </Button>
            <Button
              sx={{
                height: "36px",
                color: "black",
                backgroundColor: value === 3 ? "white" : "transparent",
                borderRadius: "4px !important",
                padding: "7px 12px 7px 12px !important",
                ":hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleChange(3)}
            >
              Pdf Settings
            </Button>
            <Button
              sx={{
                height: "36px",
                color: "black",
                backgroundColor: value === 4 ? "white" : "transparent",
                borderRadius: "4px !important",
                padding: "7px 12px 7px 12px !important",
                ":hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleChange(4)}
            >
              High Level Settings
            </Button>
            <Button
              sx={{
                height: "36px",
                color: "black",
                backgroundColor: value === 5 ? "white" : "transparent",
                borderRadius: "4px !important",
                padding: "7px 12px 7px 12px !important",
                ":hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleChange(5)}
            >
              Presentation Settings
            </Button>
          </Box>
        </Box>
        {/** end */}
        {/** Showers tab */}
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              paddingY: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Max Door Width</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <p className="explain">
                  Door width value must be in range between 1-39{" "}
                </p>
                <CustomInputField
                  type="number"
                  name="showers.doorWidth"
                  size="small"
                  value={formik.values?.showers?.doorWidth}
                  onChange={(e) => {
                    if (e.target.value.length <= 2) {
                      formik.handleChange(e);
                    }
                  }}
                  inputProps={{ min: 1, max: 39, style: { width: "200px" } }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched?.showers?.doorWidth &&
                    Boolean(formik.errors?.showers?.doorWidth)
                  }
                  helperText={
                    formik.touched?.showers?.doorWidth &&
                    formik.errors?.showers?.doorWidth
                  }
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: "1px solid #EAECF0",
              borderBottom: "1px solid #EAECF0",
              paddingY: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6">Misc. Pricing</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Pricing factor</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <p className="explain">Factor to multiply price </p>
                <CustomInputField
                  type="number"
                  name="showers.miscPricing.pricingFactor"
                  size="small"
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  value={formik.values?.showers?.miscPricing?.pricingFactor}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />

                <Box sx={{ ml: 2 }}>
                  <CustomToggle
                    name="showers.miscPricing.pricingFactorStatus"
                    checked={
                      formik.values?.showers?.miscPricing
                        ?.pricingFactorStatus || false
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Default Hourly rate</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography>
                  Hourly rates to be used for labour price
                </Typography>
                <CustomInputField
                  type="number"
                  name="showers.miscPricing.hourlyRate"
                  size="small"
                  value={formik.values?.showers?.miscPricing?.hourlyRate}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
                <FormControlLabel
                  sx={{ visibility: "hidden" }}
                  control={<Switch color="success" />}
                  label={"active"}
                />
              </Box>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ paddingTop: 1 }}>
            Fabrication Pricing
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>1" Hole (1/2in Glass)</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="showers.fabricatingPricing.oneHoleOneByTwoInchGlass"
                  size="small"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.oneHoleOneByTwoInchGlass
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>1" Hole (3/8in Glass)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  name="showers.fabricatingPricing.oneHoleThreeByEightInchGlass"
                  size="small"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.oneHoleThreeByEightInchGlass
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Clamp Cutout (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  name="showers.fabricatingPricing.clampCutoutOneByTwoInch"
                  size="small"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.clampCutoutOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Clamp Cutout (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  name="showers.fabricatingPricing.clampCutoutThreeByEightInch"
                  size="small"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.clampCutoutThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Hinge Cutout (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  size="small"
                  type="number"
                  name="showers.fabricatingPricing.hingeCutoutOneByTwoInch"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.hingeCutoutOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Hinge Cutout (3/8in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  size="small"
                  type="number"
                  name="showers.fabricatingPricing.hingeCutoutThreeByEightInch"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.hingeCutoutThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Miter (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.miterOneByTwoInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.miterOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Miter (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.miterThreeByEightInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.miterThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Notch (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.notchOneByTwoInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.notchOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Notch (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.notchThreeByEightInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.notchThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Outage (1/2in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.outageOneByTwoInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.outageOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Outage (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.outageThreeByEightInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.outageThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Polish Price per Inch (1/2in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.polishPricePerOneByTwoInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.polishPricePerOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Polish Price per Inch (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.polishPricePerThreeByEightInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.polishPricePerThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Glass price multiple comparison</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <Autocomplete
                  multiple
                  options={optionsData}
                  getOptionLabel={(option) => option.name}
                  value={optionsData?.filter((option) =>
                    formik.values.showers.glassTypesForComparison?.includes(
                      option._id
                    )
                  )}
                  onChange={(event, newValue) =>
                    handleChangeGlass("showers", newValue)
                  } // Pass 'showers' here
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
                    width: "400px",
                    ".MuiOutlinedInput-root": { p: "2px !important" },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="custom-textfield"
                      placeholder={
                        formik.values.showers.glassTypesForComparison?.length >
                        0
                          ? ""
                          : "Select Glass Type"
                      }
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        </CustomTabPanel>
        {/** end */}
        {/** Mirrors tab */}
        <CustomTabPanel value={value} index={1}>
          <Box
            sx={{
              borderBottom: "1px solid #EAECF0",
              paddingY: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6">Misc. Pricing</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Pricing factor</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <p className="explain">Factor to multiply price </p>
                <CustomInputField
                  type="number"
                  name="mirrors.pricingFactor"
                  size="small"
                  value={formik.values?.mirrors?.pricingFactor}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />

                <Box sx={{ ml: 2 }}>
                  <CustomToggle
                    name="mirrors.pricingFactorStatus"
                    checked={
                      formik.values?.mirrors?.pricingFactorStatus || false
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Default Hourly rate</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography>
                  Hourly rates to be used for labour price
                </Typography>
                <CustomInputField
                  type="number"
                  name="mirrors.hourlyRate"
                  size="small"
                  value={formik.values?.mirrors?.hourlyRate}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
                <FormControlLabel
                  sx={{ visibility: "hidden" }}
                  control={<Switch color="success" />}
                  label={"active"}
                />
              </Box>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ paddingTop: 1 }}>
            Fabrication Pricing
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              paddingY: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Hole</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="mirrors.holeMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.holeMultiplier}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Light Hole</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="mirrors.lightHoleMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.lightHoleMultiplier}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Notch</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="mirrors.notchMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.notchMultiplier}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Singel Outlet Cutout</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="mirrors.singleOutletCutoutMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.singleOutletCutoutMultiplier}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Double Outlet Cutout</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="mirrors.doubleOutletCutoutMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.doubleOutletCutoutMultiplier}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Triple Outlet Cutout</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="mirrors.tripleOutletCutoutMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.tripleOutletCutoutMultiplier}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Quad Outlet Cutout</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="mirrors.quadOutletCutoutMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.quadOutletCutoutMultiplier}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Glass price multiple comparison</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <Autocomplete
                  multiple
                  options={mirrorGlass}
                  getOptionLabel={(option) => option.name}
                  value={mirrorGlass?.filter((option) =>
                    formik.values.mirrors.glassTypesForComparison?.includes(
                      option._id
                    )
                  )}
                  onChange={(event, newValue) =>
                    handleChangeGlass("mirrors", newValue)
                  }
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
                    width: "400px",
                    ".MuiOutlinedInput-root": { p: "2px !important" },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="custom-textfield"
                      placeholder={
                        formik.values.mirrors.glassTypesForComparison?.length >
                        0
                          ? ""
                          : "Select Glass Type"
                      }
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        </CustomTabPanel>
        {/** end */}
        {/** Wine Caller tab */}
        <CustomTabPanel value={value} index={2}>
          <Box
            sx={{
              paddingY: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Max Door Width</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <p className="explain">
                  Door width value must be in range between 1-39{" "}
                </p>
                <CustomInputField
                  type="number"
                  name="wineCellars.doorWidth"
                  size="small"
                  value={formik.values?.wineCellars?.doorWidth}
                  onChange={(e) => {
                    if (e.target.value.length <= 2) {
                      formik.handleChange(e);
                    }
                  }}
                  inputProps={{
                    min: 1,
                    max: 39,
                    step: "any",
                    style: { width: "200px" },
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched?.wineCellars?.doorWidth &&
                    Boolean(formik.errors?.wineCellars?.doorWidth)
                  }
                  helperText={
                    formik.touched?.wineCellars?.doorWidth &&
                    formik.errors?.wineCellars?.doorWidth
                  }
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: "1px solid #EAECF0",
              borderBottom: "1px solid #EAECF0",
              paddingY: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6">Misc. Pricing</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Pricing factor</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <p className="explain">Factor to multiply price </p>
                <CustomInputField
                  type="number"
                  name="wineCellars.miscPricing.pricingFactor"
                  size="small"
                  value={formik.values?.wineCellars?.miscPricing?.pricingFactor}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />

                <Box sx={{ ml: 2 }}>
                  <CustomToggle
                    name="wineCellars.miscPricing.pricingFactorStatus"
                    checked={
                      formik.values?.wineCellars?.miscPricing
                        ?.pricingFactorStatus || false
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Default Hourly rate</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography>
                  Hourly rates to be used for labour price
                </Typography>
                <CustomInputField
                  type="number"
                  name="wineCellars.miscPricing.hourlyRate"
                  size="small"
                  value={formik.values?.wineCellars?.miscPricing?.hourlyRate}
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
                <FormControlLabel
                  sx={{ visibility: "hidden" }}
                  control={<Switch color="success" />}
                  label={"active"}
                />
              </Box>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ paddingTop: 1 }}>
            Fabrication Pricing
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>1" Hole (1/2in Glass)</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  name="wineCellars.fabricatingPricing.oneHoleOneByTwoInchGlass"
                  size="small"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.oneHoleOneByTwoInchGlass
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>1" Hole (3/8in Glass)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  name="wineCellars.fabricatingPricing.oneHoleThreeByEightInchGlass"
                  size="small"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.oneHoleThreeByEightInchGlass
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Clamp Cutout (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  name="wineCellars.fabricatingPricing.clampCutoutOneByTwoInch"
                  size="small"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.clampCutoutOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Clamp Cutout (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  name="wineCellars.fabricatingPricing.clampCutoutThreeByEightInch"
                  size="small"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.clampCutoutThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Hinge Cutout (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  size="small"
                  type="number"
                  name="wineCellars.fabricatingPricing.hingeCutoutOneByTwoInch"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.hingeCutoutOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Hinge Cutout (3/8in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  size="small"
                  type="number"
                  name="wineCellars.fabricatingPricing.hingeCutoutThreeByEightInch"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.hingeCutoutThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Miter (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="wineCellars.fabricatingPricing.miterOneByTwoInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.miterOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Miter (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="wineCellars.fabricatingPricing.miterThreeByEightInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.miterThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Notch (1/2in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="wineCellars.fabricatingPricing.notchOneByTwoInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.notchOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Notch (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="wineCellars.fabricatingPricing.notchThreeByEightInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.notchThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Outage (1/2in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="wineCellars.fabricatingPricing.outageOneByTwoInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.outageOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Outage (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="wineCellars.fabricatingPricing.outageThreeByEightInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.outageThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Polish Price per Inch (1/2in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="wineCellars.fabricatingPricing.polishPricePerOneByTwoInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.polishPricePerOneByTwoInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Polish Price per Inch (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="wineCellars.fabricatingPricing.polishPricePerThreeByEightInch"
                  size="small"
                  type="number"
                  value={
                    formik.values?.wineCellars?.fabricatingPricing
                      ?.polishPricePerThreeByEightInch
                  }
                  InputProps={{
                    inputProps: { min: 0, max: inputMaxValue, step: "any" },
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= inputLength) {
                      formik.handleChange(e);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Glass price multiple comparison</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <Autocomplete
                  multiple
                  options={wineCallerGlass}
                  getOptionLabel={(option) => option.name}
                  value={wineCallerGlass?.filter((option) =>
                    formik.values.wineCellars.glassTypesForComparison?.includes(
                      option._id
                    )
                  )}
                  onChange={(event, newValue) =>
                    handleChangeGlass("wineCellars", newValue)
                  }
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
                    width: "400px",
                    ".MuiOutlinedInput-root": { p: "2px !important" },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="custom-textfield"
                      placeholder={
                        formik.values.wineCellars.glassTypesForComparison
                          ?.length > 0
                          ? ""
                          : "Select Glass Type"
                      }
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        </CustomTabPanel>
        {/** Pdf Setting tab */}
        <CustomTabPanel value={value} index={3}>
          <Typography variant="h6" sx={{ paddingTop: 1 }}>
            Pdf Settings
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>People</Typography>
              <Box mr={19}>
                <CustomToggle
                  name="pdfSettings.people"
                  checked={formik.values?.pdfSettings?.people || false}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Hours</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomToggle
                  name="pdfSettings.hours"
                  checked={formik.values?.pdfSettings?.hours || false}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Labor Price</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomToggle
                  name="pdfSettings.labor"
                  checked={formik.values?.pdfSettings?.labor || false}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Profit</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomToggle
                  name="pdfSettings.profit"
                  checked={formik.values?.pdfSettings?.profit || false}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Actual Cost</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomToggle
                  name="pdfSettings.cost"
                  checked={formik.values?.pdfSettings?.cost || false}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
          </Box>
        </CustomTabPanel>
        {/** High Level Setting tab */}
        <CustomTabPanel value={value} index={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "70%",
              pt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Location Reference</Typography>
              <Box sx={{ width: "450px", display: "flex", gap: 1 }}>
                <CustomInputField
                  fullWidth
                  type="text"
                  name="highlevelSettings.locationReference"
                  value={
                    formik.values?.highlevelSettings?.locationReference ?? ""
                  }
                  placeholder={"Enter Location Reference"}
                  onChange={formik.handleChange}
                />
                <Button
                  onClick={() =>
                    handleCopy(
                      formik.values?.highlevelSettings?.locationReference ?? ""
                    )
                  }
                  sx={{
                    background: "#8477DA",
                    color: "white",
                    p: "6px 8px !important",
                    minWidth: "40px",
                    ":hover": {
                      background: "#8477DA",
                    },
                  }}
                >
                  <ContentCopyIcon />
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>API Key</Typography>
              <Box sx={{ width: "450px", display: "flex", gap: 1 }}>
                <CustomInputField
                  fullWidth
                  type="text"
                  name="highlevelSettings.apiKey"
                  value={formik.values?.highlevelSettings?.apiKey ?? ""}
                  placeholder={"Enter API Key"}
                  onChange={formik.handleChange}
                />
                <Button
                  onClick={() =>
                    handleCopy(formik.values?.highlevelSettings?.apiKey ?? "")
                  }
                  sx={{
                    background: "#8477DA",
                    color: "white",
                    p: "4px !important",
                    minWidth: "40px",
                    ":hover": {
                      background: "#8477DA",
                    },
                  }}
                >
                  <ContentCopyIcon />
                </Button>
              </Box>
            </Box>
          </Box>
        </CustomTabPanel>
        {/** Presentation Setting tab */}
        <CustomTabPanel value={value} index={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              background: "white",
            }}
          >
            {/*Section 0 */}
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
                    value={
                      formik.values.presentationSettings.colorSection.primary
                    }
                    onChange={(e) =>
                      formik.setFieldValue(
                        "presentationSettings.colorSection.primary",
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
                    value={
                      formik.values.presentationSettings.colorSection.secondary
                    }
                    onChange={(e) =>
                      formik.setFieldValue(
                        "presentationSettings.colorSection.secondary",
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
                    value={
                      formik.values.presentationSettings.colorSection.default
                    }
                    onChange={(e) =>
                      formik.setFieldValue(
                        "presentationSettings.colorSection.default",
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
            {/*Section 1 */}
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
                      name="presentationSettings.section1.text1"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={28}
                      value={
                        formik.values.presentationSettings.section1.text1 || ""
                      }
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
                      name="presentationSettings.section1.text2"
                      maxLength={90}
                      value={
                        formik.values.presentationSettings.section1.text2 || ""
                      }
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
                          document.getElementById("image-upload-logo").click()
                        }
                      >
                        <input
                          id="image-upload-logo"
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={(e) =>
                            handleUploadPreviewImage(
                              e,
                              [],
                              "presentationSettings.section1.logo"
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
                              disabled={
                                uploadLoading[
                                  "presentationSettings.section1.logo"
                                ]
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
                                "presentationSettings.section1.logo"
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

                          {formik.values.presentationSettings?.section1
                            ?.logo ? (
                            <img
                              src={`${backendURL}/${formik.values.presentationSettings.section1?.logo}`}
                              width={115}
                              height={115}
                              alt="section logo"
                              style={{
                                border: "1px solid  #ccc",
                                borderRadius: "10px",
                                opacity: uploadLoading[
                                  "presentationSettings.section1.logo"
                                ]
                                  ? 0.3
                                  : 1,
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
                                opacity: uploadLoading[
                                  "presentationSettings.section1.logo"
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                          handleUploadPreviewImage(
                            e,
                            [],
                            "presentationSettings.section1.backgroundImage"
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
                            disabled={
                              uploadLoading[
                                "presentationSettings.section1.backgroundImage"
                              ]
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
                              "presentationSettings.section1.backgroundImage"
                            ] ? (
                              <CircularProgress
                                sx={{ color: "#8477DA" }}
                                size={32}
                              />
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>

                        {formik.values.presentationSettings.section1
                          ?.backgroundImage ? (
                          <img
                            src={`${backendURL}/${formik.values.presentationSettings.section1.backgroundImage}`}
                            width="100%"
                            height={400}
                            alt="section backgroundImage"
                            style={{
                              border: "1px solid  #ccc",
                              borderRadius: "10px",
                              opacity: uploadLoading[
                                "presentationSettings.section1.backgroundImage"
                              ]
                                ? 0.3
                                : 1,
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
                              opacity: uploadLoading[
                                "presentationSettings.section1.backgroundImage"
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
            {/* section 2 */}
            <Box sx={{ background: "white", p: 2, borderRadius: "5px" }}>
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
                  checked={
                    formik.values.presentationSettings.section2.shower.status
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section2.shower.status",
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
                        "presentationSettings.section2.shower.images"
                      ] ? (
                        <CircularProgress sx={{ color: "#8477DA" }} size={42} />
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
                        "presentationSettings.shower.images"
                      ]
                        ? 0.3
                        : 1,
                    }}
                  >
                    {formik.values.presentationSettings.section2.shower.images
                      .length > 0 ? (
                      formik.values.presentationSettings.section2.shower.images?.map(
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
                                handleDeleteImageFromPrevew(
                                  formik.values.presentationSettings.section2
                                    .shower.images,
                                  _image,
                                  "presentationSettings.section2.shower.images"
                                )
                              }
                            >
                              <Delete />
                            </Box>
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={`${backendURL}/${_image}`}
                              alt="not found"
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
                            "presentationSettings.section2.shower.images"
                          ]
                            ? "#8477DA"
                            : "#6a5bc5",
                        },
                      }}
                      disabled={
                        uploadLoading[
                          "presentationSettings.section2.shower.images"
                        ]
                      }
                    >
                      Upload image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          handleUploadPreviewImage(
                            e,
                            formik.values.presentationSettings.section2.shower
                              .images,
                            "presentationSettings.section2.shower.images"
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
                    id="presentationSettings.section2.shower.description"
                    name="presentationSettings.section2.shower.description"
                    placeholder="Enter Shower Description"
                    size="large"
                    variant="outlined"
                    sx={{ padding: "10px" }}
                    value={
                      formik.values.presentationSettings.section2.shower
                        .description
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ background: "white", p: 2, borderRadius: "5px" }}>
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
                  checked={
                    formik.values.presentationSettings.section2.mirror.status
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section2.mirror.status",
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
                        "presentationSettings.section2.mirror.images"
                      ] ? (
                        <CircularProgress sx={{ color: "#8477DA" }} size={42} />
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
                        "presentationSettings.section2.mirror.images"
                      ]
                        ? 0.3
                        : 1,
                    }}
                  >
                    {formik.values.presentationSettings.section2.mirror.images
                      .length > 0 ? (
                      formik.values.presentationSettings.section2.mirror.images?.map(
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
                                handleDeleteImageFromPrevew(
                                  formik.values.presentationSettings.section2
                                    .mirror.images,
                                  _image,
                                  "presentationSettings.section2.mirror.images"
                                )
                              }
                            >
                              <Delete />
                            </Box>
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={`${backendURL}/${_image}`}
                              alt="not found"
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
                            "presentationSettings.section2.mirror.images"
                          ]
                            ? "#8477DA"
                            : "#6a5bc5",
                        },
                      }}
                      disabled={
                        uploadLoading[
                          "presentationSettings.section2.mirror.images"
                        ]
                      }
                    >
                      Upload image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          handleUploadPreviewImage(
                            e,
                            formik.values.presentationSettings.section2.mirror
                              .images,
                            "presentationSettings.section2.mirror.images"
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
                    id="presentationSettings.section2.mirror.description"
                    name="presentationSettings.section2.mirror.description"
                    placeholder="Enter Mirror Description"
                    size="large"
                    variant="outlined"
                    sx={{ padding: "10px" }}
                    value={
                      formik.values.presentationSettings.section2.mirror
                        .description
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ background: "white", p: 2, borderRadius: "5px" }}>
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
                  checked={
                    formik.values.presentationSettings.section2.wineCellar
                      .status
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section2.wineCellar.status",
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
                        "presentationSettings.section2.wineCellar.images"
                      ] ? (
                        <CircularProgress sx={{ color: "#8477DA" }} size={42} />
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
                        "presentationSettings.section2.wineCellar.images"
                      ]
                        ? 0.3
                        : 1,
                    }}
                  >
                    {formik.values.presentationSettings.section2.wineCellar
                      .images.length > 0 ? (
                      formik.values.presentationSettings.section2.wineCellar.images?.map(
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
                                handleDeleteImageFromPrevew(
                                  formik.values.presentationSettings.section2
                                    .wineCellar.images,
                                  _image,
                                  "presentationSettings.section2.wineCellar.images"
                                )
                              }
                            >
                              <Delete />
                            </Box>
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={`${backendURL}/${_image}`}
                              alt="not found"
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
                            "presentationSettings.section2.wineCellar.images"
                          ]
                            ? "#8477DA"
                            : "#6a5bc5",
                        },
                      }}
                      disabled={
                        uploadLoading[
                          "presentationSettings.section2.wineCellar.images"
                        ]
                      }
                    >
                      Upload image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          handleUploadPreviewImage(
                            e,
                            formik.values.presentationSettings.section2
                              .wineCellar.images,
                            "presentationSettings.section2.wineCellar.images"
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
                    id="presentationSettings.section2.wineCellar.description"
                    name="presentationSettings.section2.wineCellar.description"
                    placeholder="Enter WineCellar Description"
                    size="large"
                    variant="outlined"
                    sx={{ padding: "10px" }}
                    value={
                      formik.values.presentationSettings.section2.wineCellar
                        .description
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            {/* section 3 */}
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Info Cards
                </Typography>
                <CustomToggle
                  title={"Info Cards Status"}
                  isText={false}
                  checked={formik.values.presentationSettings.section3.status}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section3.status",
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section3.heading"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={15}
                      value={
                        formik.values.presentationSettings.section3.heading ||
                        ""
                      }
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section3.subHeading"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={49}
                      value={
                        formik.values.presentationSettings.section3
                          .subHeading || ""
                      }
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section3.description"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={196}
                      value={
                        formik.values.presentationSettings.section3
                          .description || ""
                      }
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
                        name="presentationSettings.section3.card1.text1"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        maxLength={20}
                        value={
                          formik.values.presentationSettings.section3.card1
                            .text1 || ""
                        }
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
                        name="presentationSettings.section3.card1.text2"
                        maxLength={50}
                        value={
                          formik.values.presentationSettings.section3.card1
                            .text2 || ""
                        }
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
                        name="presentationSettings.section3.card2.text1"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        maxLength={13}
                        value={
                          formik.values.presentationSettings.section3.card2
                            .text1 || ""
                        }
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
                        name="presentationSettings.section3.card2.text2"
                        maxLength={127}
                        value={
                          formik.values.presentationSettings.section3.card2
                            .text2 || ""
                        }
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
                        name="presentationSettings.section3.card3.text1"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        maxLength={12}
                        value={
                          formik.values.presentationSettings.section3.card3
                            .text1 || ""
                        }
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
                        name="presentationSettings.section3.card3.text2"
                        maxLength={50}
                        value={
                          formik.values.presentationSettings.section3.card3
                            .text2 || ""
                        }
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
                        name="presentationSettings.section3.card4.text1"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        maxLength={12}
                        value={
                          formik.values.presentationSettings.section3.card4
                            .text1 || ""
                        }
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
                        name="presentationSettings.section3.card4.text2"
                        maxLength={50}
                        value={
                          formik.values.presentationSettings.section3.card4
                            .text2 || ""
                        }
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
                        width: "100%",
                        display: "flex",
                        // cursor: "pointer",
                      }}
                      onClick={() =>
                        document.getElementById("info-image-upload").click()
                      }
                    >
                      <input
                        id="info-image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={(e) => {
                          handleUploadPreviewImage(
                            e,
                            [],
                            "presentationSettings.section3.backgroundImage"
                            // { height: 400, width: 700 }
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
                              uploadLoading[
                                "presentationSettings.section3.backgroundImage"
                              ]
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
                              "presentationSettings.section3.backgroundImage"
                            ] ? (
                              <CircularProgress
                                sx={{ color: "#8477DA" }}
                                size={32}
                              />
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>

                        {formik.values.presentationSettings.section3
                          ?.backgroundImage ? (
                          <img
                            src={`${backendURL}/${formik.values.presentationSettings.section3?.backgroundImage}`}
                            width="400"
                            height={380}
                            alt="not found"
                            style={{
                              border: "1px solid  #ccc",
                              borderRadius: "10px",
                              opacity: uploadLoading[
                                "presentationSettings.section3.backgroundImage"
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
                                "presentationSettings.section3.backgroundImage"
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Craftsmanship Warranty
                </Typography>
                <CustomToggle
                  title={"Craftsmanship Warranty Status"}
                  isText={false}
                  checked={formik.values.presentationSettings.section4.status}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section4.status",
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
                <Box sx={{ display: "flex", gap: 2, pb: 2, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.2,
                      width: "33%",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section4.heading"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={69}
                      value={
                        formik.values.presentationSettings.section4.heading ||
                        ""
                      }
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section4.subHeading"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={154}
                      value={
                        formik.values.presentationSettings.section4
                          .subHeading || ""
                      }
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextEditor text={warrantyText} setText={setWarrantyText} />
                </Box>
              </Box>
            </Box>
            {/* section 5 */}
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  FAQs
                </Typography>
                <CustomToggle
                  title={"FAQs Status"}
                  isText={false}
                  checked={formik.values.presentationSettings.section5.status}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section5.status",
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
                        document.getElementById("faqs-image-upload").click()
                      }
                    >
                      <input
                        id="faqs-image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={(e) => {
                          handleUploadPreviewImage(
                            e,
                            [],
                            "presentationSettings.section5.image"
                            // { height: 380, width: 380 }
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
                              uploadLoading[
                                "presentationSettings.section5.image"
                              ]
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
                              "presentationSettings.section5.image"
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

                        {formik.values.presentationSettings.section5?.image ? (
                          <img
                            src={`${backendURL}/${formik.values.presentationSettings.section5?.image}`}
                            width="100%"
                            height={380}
                            alt="not found"
                            style={{
                              border: "1px solid  #ccc",
                              borderRadius: "10px",
                              opacity: uploadLoading[
                                "presentationSettings.section5.image"
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
                                "presentationSettings.section5.image"
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  File a Claim
                </Typography>
                <CustomToggle
                  title={"File a Claim Status"}
                  isText={false}
                  checked={formik.values.presentationSettings.section6.status}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section6.status",
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section6.heading"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={20}
                      value={
                        formik.values.presentationSettings.section6.heading ||
                        ""
                      }
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section6.subHeading"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={142}
                      value={
                        formik.values.presentationSettings.section6
                          .subHeading || ""
                      }
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section6.bottomText"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={197}
                      value={
                        formik.values.presentationSettings.section6
                          .bottomText || ""
                      }
                      onChange={formik.handleChange}
                    />
                  </Box>{" "}
                </Box>
              </Box>
            </Box>
            {/* section 7 */}
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Maintenance Cards
                </Typography>
                <CustomToggle
                  title={"Maintenance Cards Status"}
                  isText={false}
                  checked={formik.values.presentationSettings.section7.status}
                  onChange={(e) => {
                    formik.setFieldValue("section7.status", e.target.checked);
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section7.heading"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={26}
                      value={
                        formik.values.presentationSettings.section7.heading ||
                        ""
                      }
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
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                      name="presentationSettings.section7.description"
                      placeholder="Enter Text"
                      size="large"
                      variant="outlined"
                      maxLength={181}
                      value={
                        formik.values.presentationSettings.section7
                          .description || ""
                      }
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
                        name="presentationSettings.section7.card1.text1"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        maxLength={23}
                        value={
                          formik.values.presentationSettings.section7.card1
                            .text1 || ""
                        }
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
                        name="presentationSettings.section7.card1.text2"
                        maxLength={139}
                        value={
                          formik.values.presentationSettings.section7.card1
                            .text2 || ""
                        }
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
                        name="presentationSettings.section7.card2.text1"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        maxLength={23}
                        value={
                          formik.values.presentationSettings.section7.card2
                            .text1 || ""
                        }
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
                        name="presentationSettings.section7.card2.text2"
                        maxLength={258}
                        value={
                          formik.values.presentationSettings.section7.card2
                            .text2 || ""
                        }
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
                        name="presentationSettings.section7.card3.text1"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        maxLength={23}
                        value={
                          formik.values.presentationSettings.section7.card3
                            .text1 || ""
                        }
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
                        name="presentationSettings.section7.card3.text2"
                        maxLength={500}
                        value={
                          formik.values.presentationSettings.section7.card3
                            .text2 || ""
                        }
                        onChange={formik.handleChange}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Glass Upgrade Product
                </Typography>
                <CustomToggle
                  title={"Glass Upgrade Product Status"}
                  isText={false}
                  checked={formik.values.presentationSettings.section8.status}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section8.status",
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
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                        name="presentationSettings.section8.product.title"
                        placeholder="Enter Text"
                        size="large"
                        variant="outlined"
                        maxLength={62}
                        value={
                          formik.values.presentationSettings.section8.product
                            .title || ""
                        }
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
                        name="presentationSettings.section8.product.description1"
                        maxLength={276}
                        value={
                          formik.values.presentationSettings.section8.product
                            .description1 || ""
                        }
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
                        name="presentationSettings.section8.product.description2"
                        maxLength={184}
                        value={
                          formik.values.presentationSettings.section8.product
                            .description2 || ""
                        }
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
                              handleUploadPreviewImage(
                                e,
                                [],
                                "presentationSettings.section8.image1"
                                // { height: 380, width: 296 }
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
                                  uploadLoading[
                                    "presentationSettings.section8.image1"
                                  ]
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
                                  "presentationSettings.section8.image1"
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
                            {formik.values.presentationSettings.section8
                              ?.image1 ? (
                              <img
                                src={`${backendURL}/${formik.values.presentationSettings.section8?.image1}`}
                                width="100%"
                                height={380}
                                alt="not found"
                                style={{
                                  border: "1px solid  #ccc",
                                  borderRadius: "10px",
                                  opacity: uploadLoading[
                                    "presentationSettings.section8.image1"
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
                                    "presentationSettings.section8.image1"
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
                              .getElementById("product-result-image-upload")
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
                              handleUploadPreviewImage(
                                e,
                                [],
                                "presentationSettings.section8.image2"
                                // { height: 380, width: 442 }
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
                                  uploadLoading[
                                    "presentationSettings.section8.image2"
                                  ]
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
                                  "presentationSettings.section8.image2"
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

                            {formik.values.presentationSettings.section8
                              ?.image2 ? (
                              <img
                                src={`${backendURL}/${formik.values.presentationSettings.section8?.image2}`}
                                width="100%"
                                height={380}
                                alt="not found"
                                style={{
                                  border: "1px solid  #ccc",
                                  borderRadius: "10px",
                                  opacity: uploadLoading[
                                    "presentationSettings.section8.image2"
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
                                    "presentationSettings.section8.image2"
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
            <Box sx={{ background: "white", p: 2, borderRadius: "5px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Terms and Conditions
                </Typography>
                <CustomToggle
                  title={"Status"}
                  isText={false}
                  checked={formik.values.presentationSettings.section9.status}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section9.status",
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
                <Box sx={{ width: "100%" }}>
                  <TextEditor text={termsText} setText={setTermsText} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ px: 2, pb: 6 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Signature and Payment
                </Typography>
                <CustomToggle
                  title={"Status"}
                  isText={false}
                  checked={formik.values.presentationSettings.section10.status}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "presentationSettings.section10.status",
                      e.target.checked
                    );
                  }}
                />
              </Box>
            </Box>
          </Box>
          <ScrollToTop color={"#fff"} background={"#8477DA"} />
        </CustomTabPanel>
        {/** end */}
      </Box>
    </form>
  );
};

export default CampanySetting;
