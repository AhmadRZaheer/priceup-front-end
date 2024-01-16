import imageUploader from "../../Assets/imageUploader.svg";
import { useFormik } from "formik";

import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  useEditSetting,
  useFetchDataSetting,
} from "../../utilities/ApiHooks/setting";
import { backendURL } from "../../utilities/common";

import CustomToggle from "../ui-components/Toggle";
import CustomInputField from "../ui-components/CustomInput";
import { showSnackbar } from "../../redux/snackBarSlice";
import { useDispatch } from "react-redux";

const CampanySetting = () => {
  const { data: settingData, refetch: reFetchDataSetting } =
    useFetchDataSetting();
  const { mutate: editFinish, isSuccess: SuccessForEdit } = useEditSetting();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (SuccessForEdit) {
      reFetchDataSetting();
    }
  }, [SuccessForEdit]);
  const formik = useFormik({
    initialValues: {
      address: settingData?.address,
      image: selectedImage,

      miscPricing: {
        pricingFactor: settingData?.miscPricing?.pricingFactor,
        hourlyRate: settingData?.miscPricing?.hourlyRate,
        pricingFactorStatus: settingData?.miscPricing?.pricingFactorStatus,
      },
      fabricatingPricing: {
        oneHoleOneByTwoInchGlass:
          settingData?.fabricatingPricing?.oneHoleOneByTwoInchGlass,
        oneHoleThreeByEightInchGlass:
          settingData?.fabricatingPricing?.oneHoleThreeByEightInchGlass,
        clampCutoutOneByTwoInch:
          settingData?.fabricatingPricing?.clampCutoutOneByTwoInch,
        clampCutoutThreeByEightInch:
          settingData?.fabricatingPricing?.clampCutoutThreeByEightInch,
        hingeCutoutOneByTwoInch:
          settingData?.fabricatingPricing?.hingeCutoutOneByTwoInch,
        hingeCutoutThreeByEightInch:
          settingData?.fabricatingPricing?.hingeCutoutThreeByEightInch,
        minterOneByTwoInch: settingData?.fabricatingPricing?.minterOneByTwoInch,
        minterThreeByEightInch:
          settingData?.fabricatingPricing?.minterThreeByEightInch,
        notchOneByTwoInch: settingData?.fabricatingPricing?.notchOneByTwoInch,
        notchThreeByEightInch:
          settingData?.fabricatingPricing?.notchThreeByEightInch,
        outageOneByTwoInch: settingData?.fabricatingPricing?.outageOneByTwoInch,
        outageThreeByEightInch:
          settingData?.fabricatingPricing?.outageThreeByEightInch,
        polishPricePerOneByTwoInch:
          settingData?.fabricatingPricing?.polishPricePerOneByTwoInch,
        polishPricePerThreeByEightInch:
          settingData?.fabricatingPricing?.polishPricePerThreeByEightInch,
      },
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "editedData")
      handleEditSetting(values);
    },
  });

  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  const handleEditSetting = (props) => {
    editFinish({ data: props, id: settingData._id });
    reFetchDataSetting();
  };
  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "white",
          height: "98vh",
          paddingLeft: 3.5,
          pr: 3.5,
          pt: 2.4,
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

            <Box sx={{ display: "flex", gap: 2 }}>
              <img
                width={"40px"}
                height={"40px"}
                src={selectedImage || `${backendURL}/${settingData?.image}`}
                alt="Selected"
                style={{ borderRadius: "100%" }}
              />
              <Box sx={{ borderRadius: "100%", display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "350px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                    p: 3,
                  }}
                >
                  <img
                    width={"40px"}
                    height={"40px"}
                    src={selectedImage || imageUploader}
                    alt="Selected"
                  />
                  <Button onClick={handleFileUpload}>Click to Upload</Button>
                  <Typography variant="body2">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Typography>
                  <input
                    type="file"
                    accept="image/svg+xml,image/png,image/jpeg,image/gif"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
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
            <Typography>Location</Typography>
            <Box sx={{ width: "400px" }}>
              {" "}
              <CustomInputField
                fullWidth
                type="text"
                name="address"
                value={formik.values?.address}
                placeholder={"Add location"}
                onChange={formik.handleChange}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #EAECF0",
            borderBottom: "1px solid #EAECF0",
            paddingY: 2,
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
                name="miscPricing.pricingFactor"
                size="small"
                value={formik.values?.miscPricing?.pricingFactor}
                onChange={formik.handleChange}
              />

              <Box sx={{ ml: 2 }}>
                <CustomToggle
                  name="miscPricing.pricingFactorStatus"
                  checked={
                    formik.values?.miscPricing?.pricingFactorStatus || false
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
              <Typography>Hourly rates to be used for labour price</Typography>
              <CustomInputField
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name="miscPricing.hourlyRate"
                size="small"
                value={formik.values?.miscPricing?.hourlyRate}
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
        <Typography variant="h6">Fabrication Pricing</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            // maxHeight: "38vh",
            // overflowY: "scroll",
            pb: 6
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
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name="fabricatingPricing.oneHoleOneByTwoInchGlass"
                size="small"
                value={
                  formik.values?.fabricatingPricing?.oneHoleOneByTwoInchGlass
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
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name="fabricatingPricing.oneHoleThreeByEightInchGlass"
                size="small"
                value={
                  formik.values?.fabricatingPricing
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
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name="fabricatingPricing.clampCutoutOneByTwoInch"
                size="small"
                value={
                  formik.values?.fabricatingPricing?.clampCutoutOneByTwoInch
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
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name="fabricatingPricing.clampCutoutThreeByEightInch"
                size="small"
                value={
                  formik.values?.fabricatingPricing?.clampCutoutThreeByEightInch
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
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name="fabricatingPricing.hingeCutoutOneByTwoInch"
                value={
                  formik.values?.fabricatingPricing?.hingeCutoutOneByTwoInch
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
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name="fabricatingPricing.hingeCutoutThreeByEightInch"
                value={
                  formik.values?.fabricatingPricing?.hingeCutoutThreeByEightInch
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
                name="fabricatingPricing.minterOneByTwoInch"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={formik.values?.fabricatingPricing?.minterOneByTwoInch}
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
                name="fabricatingPricing.minterThreeByEightInch"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={
                  formik.values?.fabricatingPricing?.minterThreeByEightInch
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
                name="fabricatingPricing.notchOneByTwoInch"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={formik.values?.fabricatingPricing?.notchOneByTwoInch}
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
                name="fabricatingPricing.notchThreeByEightInch"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={formik.values?.fabricatingPricing?.notchThreeByEightInch}
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
                name="fabricatingPricing.outageOneByTwoInch"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={formik.values?.fabricatingPricing?.outageOneByTwoInch}
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
                name="fabricatingPricing.outageThreeByEightInch"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={
                  formik.values?.fabricatingPricing?.outageThreeByEightInch
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
                name="fabricatingPricing.polishPricePerOneByTwoInch"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={
                  formik.values?.fabricatingPricing?.polishPricePerOneByTwoInch
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
                name="fabricatingPricing.polishPricePerThreeByEightInch"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={
                  formik.values?.fabricatingPricing
                    ?.polishPricePerThreeByEightInch
                }
                onChange={formik.handleChange}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CampanySetting;
