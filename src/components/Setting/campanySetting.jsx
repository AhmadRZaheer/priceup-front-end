import imageUploader from "../../Assets/imageUploader.svg";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  useEditSetting,
  useFetchDataSetting,
} from "@/utilities/ApiHooks/setting";
import { backendURL } from "@/utilities/common";

import CustomToggle from "../ui-components/Toggle";
import CustomInputField from "../ui-components/CustomInput";
import { useDropzone } from "react-dropzone";
import InputImageIcon from "@/Assets/imageUploader.svg";
import { useDispatch, useSelector } from "react-redux";
import { getDataRefetch } from "@/redux/staff";
import CustomTabPanel, { a11yProps } from "@/components/CustomTabPanel";
import { setLocationSettingsRefetch } from "@/redux/refetch";
import { inputLength, inputMaxValue } from "@/utilities/constants";
import { showSnackbar } from "@/redux/snackBarSlice";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { getListData } from "@/redux/estimateCalculations";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { Delete } from "@mui/icons-material";
import { useEditDocument } from "@/utilities/ApiHooks/common";

const CampanySetting = () => {
  const dispatch = useDispatch();
  const showerGlassList = useSelector(getListData);
  const mirrorGlassList = useSelector(getMirrorsHardware);
  const wineCallerGlassList = useSelector(getWineCellarsHardware);
  const { data: settingData, refetch: reFetchDataSetting } =
    useFetchDataSetting();
  const {
    mutate: editSetting,
    isLoading: editLoading,
    isSuccess: SuccessForEdit,
  } = useEditDocument();
  const [selectedImage, setSelectedImage] = useState(null);
  const CustomerU_change = useSelector(getDataRefetch);
  const [value, setValue] = React.useState(0);

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
      // add validation for other nested fields if necessary
    }),
    wineCellars: Yup.object().shape({
      doorWidth: Yup.number()
        .required("Max door width is required")
        .min(1, "Door width must be at least 1")
        .max(39, "Door width cannot exceed 39"),
      // add validation for other nested fields if necessary
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
        // floatingSmall: settingData?.mirrors?.floatingSmall,
        // floatingMedium: settingData?.mirrors?.floatingMedium,
        // floatingLarge: settingData?.mirrors?.floatingLarge,
        // sandBlastingMultiplier: settingData?.mirrors?.sandBlastingMultiplier,
        // bevelStrip: settingData?.mirrors?.bevelStrip,
        // safetyBacking: settingData?.mirrors?.safetyBacking,
        holeMultiplier: settingData?.mirrors?.holeMultiplier ?? 0,
        // outletMultiplier: settingData?.mirrors?.outletMultiplier,
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
        // singleDuplexMultiplier: settingData?.mirrors?.singleDuplexMultiplier,
        // doubleDuplexMultiplier: settingData?.mirrors?.doubleDuplexMultiplier,
        // tripleDuplexMultiplier: settingData?.mirrors?.tripleDuplexMultiplier,
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
        shower :{
          images : settingData?.presentationSettings?.shower?.images ?? [],
          description: settingData?.presentationSettings?.shower?.description ?? ''
        },
        mirror :{
           images : settingData?.presentationSettings?.mirror?.images ?? [],
          description: settingData?.presentationSettings?.mirror?.description ?? ''
        },
        wineCellar :{
           images : settingData?.presentationSettings?.wineCellar?.images ?? [],
          description: settingData?.presentationSettings?.wineCellar?.description ?? ''
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

  // const fileInputRef = useRef(null);

  // const handleFileUpload = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(URL.createObjectURL(file));
  // };
  const handleEditSetting = (props) => {
    const formData = new FormData();
    if (props?.image) {
      formData.append("image", props.image);
      delete props?.image;
    }
    if (
      props?.image === null ??
      props?.image === undefined
    ) {
      delete props?.image;
    }
    formData.append("data", JSON.stringify(props));
    editSetting({ data: formData,apiRoute:`${backendURL}/companies/${settingData._id}` });
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
  const handleUploadPreviewImage = (event, key) => {
    const image = event.target.files[0];
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    // formData.append("key", key);
    formData.append("data", JSON.stringify({key}));  
     // Make the API call
    editSetting({ data: formData,apiRoute:`${backendURL}/companies/${settingData._id}` });
    reFetchDataSetting();
  }; 

  const handleDeleteImageFromPrevew =  (
    gallery,
    removeGalleryImage,
    key
  ) => {
    const galleryFiltered = gallery?.filter(
      (item) => item !== removeGalleryImage
    );
   const  deletItem = JSON.stringify({
      key,
      gallery: galleryFiltered ?? [],
      removeGalleryImage,
    })

    editSetting({    
      data: {data : deletItem},apiRoute:`${backendURL}/companies/${settingData._id}`      
      });
    reFetchDataSetting();  
  };

  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "#F6F5FF",
          // height: "98vh",
          // paddingLeft: 3.5,
          // pr: 3.5,
          // pt: 2.4,
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
                        <img
                          width={60}
                          src={InputImageIcon}
                          alt="icon of input image"
                        />
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
              Customer Preview Settings
            </Button>
          </Box>
          {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
            "& .MuiTab-root.Mui-selected": {
              color: '#8477DA'
            }, "& .MuiTabs-indicator": {
              backgroundColor: "#8477DA",
              height: 3,
            },
          }}>
            <Tab label="Showers" sx={{
              fontSize: '15px', fontWeight: 600
            }} {...a11yProps(0)} />
            <Tab label="Mirrors" sx={{ fontSize: '15px', fontWeight: 600 }} {...a11yProps(1)} />
          </Tabs> */}
        </Box>
        {/** end */}
        {/** Showers tab */}
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              // borderTop: "1px solid #EAECF0",
              // borderBottom: "1px solid #EAECF0",
              // paddingTop: 0,
              paddingY: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* <Typography variant="h6">Max Door Width</Typography> */}
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
              // maxHeight: "38vh",
              // overflowY: "scroll",
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
                      // label="Select Glass Type"
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
              // borderTop: "1px solid #EAECF0",
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
              // maxHeight: "38vh",
              // overflowY: "scroll",
              paddingY: 1,
            }}
          >
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Floating Small</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.floatingSmall"
                  size="small"
                  value={
                    formik.values?.mirrors?.floatingSmall
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Floating Medium</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.floatingMedium"
                  size="small"
                  value={
                    formik.values?.mirrors?.floatingMedium
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Floating Large</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.floatingLarge"
                  size="small"
                  value={
                    formik.values?.mirrors?.floatingLarge
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Sand Blasting</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.sandBlastingMultiplier"
                  size="small"
                  value={
                    formik.values?.mirrors?.sandBlastingMultiplier
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Bevel Strip</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.bevelStrip"
                  size="small"
                  value={
                    formik.values?.mirrors?.bevelStrip
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Bevel Strip</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.bevelStrip"
                  size="small"
                  value={
                    formik.values?.mirrors?.bevelStrip
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Safety Backing</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.safetyBacking"
                  size="small"
                  value={
                    formik.values?.mirrors?.safetyBacking
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
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
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Outlet</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.outletMultiplier"
                  size="small"
                  value={
                    formik.values?.mirrors?.outletMultiplier
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
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
                  } // Pass 'mirrors' here
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
                      // label="Select Glass Type"
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
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Single Duplex</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.singleDuplexMultiplier"
                  size="small"
                  value={
                    formik.values?.mirrors?.singleDuplexMultiplier
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Double Duplex</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.doubleDuplexMultiplier"
                  size="small"
                  value={
                    formik.values?.mirrors?.doubleDuplexMultiplier
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Triple Duplex</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  name="mirrors.tripleDuplexMultiplier"
                  size="small"
                  value={
                    formik.values?.mirrors?.tripleDuplexMultiplier
                  }
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
          </Box>
        </CustomTabPanel>
        {/** end */}

        {/** Wine Caller tab */}
        <CustomTabPanel value={value} index={2}>
          <Box
            sx={{
              // borderTop: "1px solid #EAECF0",
              // borderBottom: "1px solid #EAECF0",
              // paddingTop: 0,
              paddingY: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* <Typography variant="h6">Max Door Width</Typography> */}
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
              // maxHeight: "38vh",
              // overflowY: "scroll",
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
                  } // Pass 'wineCellars' here
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
                      // label="Select Glass Type"
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
          {/* <Box
            sx={{
              // borderTop: "1px solid #EAECF0",
              // borderBottom: "1px solid #EAECF0",
              // paddingTop: 0,
              paddingY: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          > */}
          {/* <Typography variant="h6">Max Door Width</Typography> */}
          {/* <Box
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
            </Box> */}
          {/* </Box> */}
          {/* <Box
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
          </Box> */}
          <Typography variant="h6" sx={{ paddingTop: 1 }}>
            Pdf Settings
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              // maxHeight: "38vh",
              // overflowY: "scroll",
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
            <Box sx={{background:'white',p:2,borderRadius:'5px'}}>
              <Typography variant="h5" fontWeight={"bold"}>
                Shower Gallery
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt:1.5,
                  gap:2,
                  width:'100%'
                }}
              >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        border: "1px solid #ccc",
                        width: '65%',
                        // background:'white'
                      }}
                    >
                      <Grid
                        container
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                   {formik.values.presentationSettings.shower.images.length > 0 ? (
                          formik.values.presentationSettings.shower.images?.map((_image) => (
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
                                    formik.values.presentationSettings.shower.images,
                                    _image,
                                    'presentationSettings.shower.images'
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
                              handleUploadPreviewImage(
                                e,
                                `presentationSettings.shower.images`
                              )
                            }
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
                    value={formik.values.presentationSettings.shower.description}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{background:'white',p:2,borderRadius:'5px'}}>
              <Typography variant="h5" fontWeight={"bold"}>
                Mirror Gallery
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt:1.5,
                  gap:2,
                  width:'100%'
                }}
              >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        border: "1px solid #ccc",
                        width: '65%',
                      }}
                    >
                      <Grid
                        container
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                         {formik.values.presentationSettings.mirror.images.length > 0 ? (
                          formik.values.presentationSettings.mirror.images?.map((_image) => (
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
                                    formik.values.presentationSettings.mirror.images,
                                    _image,
                                    'presentationSettings.mirror.images'
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
                              handleUploadPreviewImage(
                                e,
                                `presentationSettings.mirror.images`
                              )
                            }
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
                    value={formik.values.presentationSettings.mirror.description}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{background:'white',p:2,borderRadius:'5px'}}>
              <Typography variant="h5" fontWeight={"bold"}>
                Wine Cellar Gallery
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt:1.5,
                  gap:2,
                    width:'100%'
                }}
              >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        border: "1px solid #ccc",
                        width: '65%',
                      }}
                    >
                      <Grid
                        container
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                     {formik.values.presentationSettings.wineCellar.images.length > 0 ? (
                          formik.values.presentationSettings.wineCellar.images?.map((_image) => (
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
                                    formik.values.presentationSettings.wineCellar.images,
                                    _image,
                                    'presentationSettings.wineCellar.images'
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
                              handleUploadPreviewImage(
                                e,
                                `presentationSettings.wineCellar.images`
                              )
                            }
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
                    value={formik.values.presentationSettings.wineCellar.description}
                    onChange={formik.handleChange}
                  />
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
