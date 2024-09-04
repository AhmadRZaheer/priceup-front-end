import imageUploader from "../../Assets/imageUploader.svg";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Tab,
  Tabs,
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

const CampanySetting = () => {
  const dispatch = useDispatch();
  const { data: settingData, refetch: reFetchDataSetting } =
    useFetchDataSetting();
  const { mutate: editSetting, isSuccess: SuccessForEdit } = useEditSetting();
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
          minterOneByTwoInch:
            settingData?.showers?.fabricatingPricing?.minterOneByTwoInch,
          minterThreeByEightInch:
            settingData?.showers?.fabricatingPricing?.minterThreeByEightInch,
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
        holeMultiplier: settingData?.mirrors?.holeMultiplier,
        // outletMultiplier: settingData?.mirrors?.outletMultiplier,
        lightHoleMultiplier: settingData?.mirrors?.lightHoleMultiplier,
        notchMultiplier: settingData?.mirrors?.notchMultiplier,
        singleOutletCutoutMultiplier:
          settingData?.mirrors?.singleOutletCutoutMultiplier,
        doubleOutletCutoutMultiplier:
          settingData?.mirrors?.doubleOutletCutoutMultiplier,
        tripleOutletCutoutMultiplier:
          settingData?.mirrors?.tripleOutletCutoutMultiplier,
        quadOutletCutoutMultiplier:
          settingData?.mirrors?.quadOutletCutoutMultiplier,
        // singleDuplexMultiplier: settingData?.mirrors?.singleDuplexMultiplier,
        // doubleDuplexMultiplier: settingData?.mirrors?.doubleDuplexMultiplier,
        // tripleDuplexMultiplier: settingData?.mirrors?.tripleDuplexMultiplier,
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
    editSetting({ data: props, id: settingData._id });
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
              sx={{
                backgroundColor: "#8477DA",
                boxShadow: 0,
                ":hover": { backgroundColor: "#8477DA" },
              }}
              fullWidth
              variant="contained"
              onClick={formik.handleSubmit}
            >
              Update
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
                  onChange={formik.handleChange}
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
                  value={formik.values?.showers?.miscPricing?.pricingFactor}
                  onChange={formik.handleChange}
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
                  inputProps={{
                    min: 0,
                  }}
                  name="miscPricing.hourlyRate"
                  size="small"
                  value={formik.values?.showers?.miscPricing?.hourlyRate}
                  onChange={formik.handleChange}
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
                  inputProps={{
                    min: 0,
                  }}
                  name="showers.fabricatingPricing.oneHoleOneByTwoInchGlass"
                  size="small"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.oneHoleOneByTwoInchGlass
                  }
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
              <Typography>1" Hole (3/8in Glass)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="showers.fabricatingPricing.oneHoleThreeByEightInchGlass"
                  size="small"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.oneHoleThreeByEightInchGlass
                  }
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
              <Typography>Clamp Cutout (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="showers.fabricatingPricing.clampCutoutOneByTwoInch"
                  size="small"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.clampCutoutOneByTwoInch
                  }
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
              <Typography>Clamp Cutout (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="showers.fabricatingPricing.clampCutoutThreeByEightInch"
                  size="small"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.clampCutoutThreeByEightInch
                  }
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
              <Typography>Hinge Cutout (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="showers.fabricatingPricing.hingeCutoutOneByTwoInch"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.hingeCutoutOneByTwoInch
                  }
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
              <Typography>Hinge Cutout (3/8in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="showers.fabricatingPricing.hingeCutoutThreeByEightInch"
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.hingeCutoutThreeByEightInch
                  }
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
              <Typography>Miter (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.minterOneByTwoInch"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.minterOneByTwoInch
                  }
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
              <Typography>Miter (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.minterThreeByEightInch"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.minterThreeByEightInch
                  }
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
              <Typography>Notch (1/2in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.notchOneByTwoInch"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.notchOneByTwoInch
                  }
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
              <Typography>Notch (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.notchThreeByEightInch"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.notchThreeByEightInch
                  }
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
              <Typography>Outage (1/2in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.outageOneByTwoInch"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.outageOneByTwoInch
                  }
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
              <Typography>Outage (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.outageThreeByEightInch"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.outageThreeByEightInch
                  }
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
              <Typography>Polish Price per Inch (1/2in)</Typography>
              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.polishPricePerOneByTwoInch"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.polishPricePerOneByTwoInch
                  }
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
              <Typography>Polish Price per Inch (3/8in)</Typography>

              <Box sx={{ paddingRight: 19 }}>
                <CustomInputField
                  name="showers.fabricatingPricing.polishPricePerThreeByEightInch"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={
                    formik.values?.showers?.fabricatingPricing
                      ?.polishPricePerThreeByEightInch
                  }
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
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
                  inputProps={{
                    min: 0,
                  }}
                  name="mirrors.hourlyRate"
                  size="small"
                  value={formik.values?.mirrors?.hourlyRate}
                  onChange={formik.handleChange}
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
                  inputProps={{
                    min: 0,
                  }}
                  name="mirrors.holeMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.holeMultiplier}
                  onChange={formik.handleChange}
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
                  inputProps={{
                    min: 0,
                  }}
                  name="mirrors.lightHoleMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.lightHoleMultiplier}
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
              <Typography>Notch</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="mirrors.notchMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.notchMultiplier}
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
              <Typography>Singel Outlet Cutout</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="mirrors.singleOutletCutoutMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.singleOutletCutoutMultiplier}
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
              <Typography>Double Outlet Cutout</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="mirrors.doubleOutletCutoutMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.doubleOutletCutoutMultiplier}
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
              <Typography>Triple Outlet Cutout</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="mirrors.tripleOutletCutoutMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.tripleOutletCutoutMultiplier}
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
              <Typography>Quad Outlet Cutout</Typography>
              <Box mr={19}>
                <CustomInputField
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  name="mirrors.quadOutletCutoutMultiplier"
                  size="small"
                  value={formik.values?.mirrors?.quadOutletCutoutMultiplier}
                  onChange={formik.handleChange}
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
      </Box>
    </form>
  );
};

export default CampanySetting;
