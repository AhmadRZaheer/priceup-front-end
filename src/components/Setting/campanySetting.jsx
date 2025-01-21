import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFetchDataSetting } from "@/utilities/ApiHooks/setting";
import { backendURL } from "@/utilities/common";

import CustomToggle from "../ui-components/Toggle";
import CustomInputField from "../ui-components/CustomInput";
import { useDropzone } from "react-dropzone";
import InputImageIcon from "@/Assets/imageUploader.svg";
import { useDispatch, useSelector } from "react-redux";
import { getDataRefetch } from "@/redux/staff";
import CustomTabPanel from "@/components/CustomTabPanel";
import { setLocationSettingsRefetch } from "@/redux/refetch";
import { inputLength, inputMaxValue } from "@/utilities/constants";
import { showSnackbar } from "@/redux/snackBarSlice";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { getListData } from "@/redux/estimateCalculations";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { Delete } from "@mui/icons-material";
import { useEditDocument } from "@/utilities/ApiHooks/common";
import TextEditor from "../ProjectInvoices/CreateEditInvoice/EditQuotePage/TextEditor";

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
    "presentationSettings.shower.images": false,
    "presentationSettings.mirror.images": false,
    "presentationSettings.wineCellar.images": false,
  });
  console.log(uploadLoading, "uploadLoadinguploadLoading");
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
        settingData?.presentationSettings?.termsAndConditions?.length
          ? settingData?.presentationSettings?.termsAndConditions
          : termsCondition
      );
    }
  }, [settingData]);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
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
        shower: {
          images: settingData?.presentationSettings?.shower?.images ?? [],
          description:
            settingData?.presentationSettings?.shower?.description ?? "",
        },
        mirror: {
          images: settingData?.presentationSettings?.mirror?.images ?? [],
          description:
            settingData?.presentationSettings?.mirror?.description ?? "",
        },
        wineCellar: {
          images: settingData?.presentationSettings?.wineCellar?.images ?? [],
          description:
            settingData?.presentationSettings?.wineCellar?.description ?? "",
        },
        termsAndConditions: termsText ?? termsCondition,
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
        <CustomTabPanel value={value} index={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // gap: 3,
              width: "100%",
              pt: 2,
            }}
          >
            <Box sx={{ background: "white", p: 2, borderRadius: "5px" }}>
              <Typography variant="h5" fontWeight={"bold"}>
                Shower Gallery
              </Typography>
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
                      {uploadLoading["presentationSettings.shower.images"] ? (
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
                    {formik.values.presentationSettings.shower.images.length >
                    0 ? (
                      formik.values.presentationSettings.shower.images?.map(
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
                                  formik.values.presentationSettings.shower
                                    .images,
                                  _image,
                                  "presentationSettings.shower.images"
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
                            "presentationSettings.shower.images"
                          ]
                            ? "#8477DA"
                            : "#6a5bc5",
                        },
                      }}
                      disabled={
                        uploadLoading["presentationSettings.shower.images"]
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
                            formik.values.presentationSettings.shower.images,
                            "presentationSettings.shower.images"
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
                    id="presentationSettings.shower.description"
                    name="presentationSettings.shower.description"
                    placeholder="Enter Shower Description"
                    size="large"
                    variant="outlined"
                    sx={{ padding: "10px" }}
                    value={
                      formik.values.presentationSettings.shower.description
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ background: "white", p: 2, borderRadius: "5px" }}>
              <Typography variant="h5" fontWeight={"bold"}>
                Mirror Gallery
              </Typography>
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
                      {uploadLoading["presentationSettings.mirror.images"] ? (
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
                        "presentationSettings.mirror.images"
                      ]
                        ? 0.3
                        : 1,
                    }}
                  >
                    {formik.values.presentationSettings.mirror.images.length >
                    0 ? (
                      formik.values.presentationSettings.mirror.images?.map(
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
                                  formik.values.presentationSettings.mirror
                                    .images,
                                  _image,
                                  "presentationSettings.mirror.images"
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
                            "presentationSettings.mirror.images"
                          ]
                            ? "#8477DA"
                            : "#6a5bc5",
                        },
                      }}
                      disabled={
                        uploadLoading["presentationSettings.mirror.images"]
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
                            formik.values.presentationSettings.mirror.images,
                            "presentationSettings.mirror.images"
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
                    id="presentationSettings.mirror.description"
                    name="presentationSettings.mirror.description"
                    placeholder="Enter Mirror Description"
                    size="large"
                    variant="outlined"
                    sx={{ padding: "10px" }}
                    value={
                      formik.values.presentationSettings.mirror.description
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ background: "white", p: 2, borderRadius: "5px" }}>
              <Typography variant="h5" fontWeight={"bold"}>
                Wine Cellar Gallery
              </Typography>
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
                        "presentationSettings.wineCellar.images"
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
                        "presentationSettings.wineCellar.images"
                      ]
                        ? 0.3
                        : 1,
                    }}
                  >
                    {formik.values.presentationSettings.wineCellar.images
                      .length > 0 ? (
                      formik.values.presentationSettings.wineCellar.images?.map(
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
                                  formik.values.presentationSettings.wineCellar
                                    .images,
                                  _image,
                                  "presentationSettings.wineCellar.images"
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
                            "presentationSettings.wineCellar.images"
                          ]
                            ? "#8477DA"
                            : "#6a5bc5",
                        },
                      }}
                      disabled={
                        uploadLoading["presentationSettings.wineCellar.images"]
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
                            formik.values.presentationSettings.wineCellar
                              .images,
                            "presentationSettings.wineCellar.images"
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
                    id="presentationSettings.wineCellar.description"
                    name="presentationSettings.wineCellar.description"
                    placeholder="Enter WineCellar Description"
                    size="large"
                    variant="outlined"
                    sx={{ padding: "10px" }}
                    value={
                      formik.values.presentationSettings.wineCellar.description
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ background: "white", p: 2, borderRadius: "5px" }}>
              <Typography variant="h5" fontWeight={"bold"}>
                Terms & Conditions
              </Typography>
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
          </Box>
        </CustomTabPanel>
        {/** end */}
      </Box>
    </form>
  );
};

export default CampanySetting;
