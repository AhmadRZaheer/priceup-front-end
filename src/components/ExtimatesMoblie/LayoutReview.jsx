import { Box, Button, TextField, Typography } from "@mui/material";
import MenuList from "./MenuList";
import {
  ChevronLeftOutlined,
} from "@mui/icons-material";
import { useFetchDataEstimate } from "../../utilities/ApiHooks/Estimate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  getMeasumentSide,
  selectedItem,
  setInputContent,
  setNavigation,
  setTotal,
} from "../../redux/estimateCalculations";
import Snackbars from "../Model/SnackBar";
import ChannelType from "./channelOrClamp";
import { evaluateFormula } from "../../utilities/common";
import { useMemo } from "react";

const LayoutReview = () => {
  const { data: estimatesData } =
    useFetchDataEstimate();
  const selectedContent = useSelector(getContent);
  const measurementSides = useSelector(getMeasumentSide);
  const currentLayout = useSelector(selectedItem);
  const dispatch = useDispatch();
  const priceBySqft = useMemo(()=>{
   const measurementObject = measurementSides.reduce((obj, item) => {
      const { key, value } = item;
      if (!obj[key]) {
        obj[key] = [];
      }
      obj[key].push(value);
      return obj;
    }, {});
    return evaluateFormula(currentLayout?.settings?.priceBySqftFormula,measurementObject?.a,measurementObject?.b,measurementObject?.c,measurementObject?.d,measurementObject?.e,measurementObject?.f);
  },[measurementSides,currentLayout]);

  useEffect(() => {
    // hardware
    const handlePrice = selectedContent?.handles?.item
      ? (selectedContent?.handles?.item?.finishes?.find(
          (item) => selectedContent.hardwareFinishes._id === item.finish_id
        )?.cost || 0) * selectedContent.handles.count
      : 0;
    const hingesPrice = selectedContent?.hinges?.item
      ? (selectedContent?.hinges?.item?.finishes?.find(
          (item) => selectedContent.hardwareFinishes._id === item.finish_id
        )?.cost || 0) * selectedContent.hinges.count
      : 0;
    const mountingChannel = selectedContent?.mounting?.channel.item
      ? selectedContent?.mounting?.channel?.item?.finishes?.find(
          (item) => selectedContent.hardwareFinishes._id === item.finish_id
        )?.cost || 0
      : 0;
    const mountingWallClamps = selectedContent?.mounting?.clamps?.wallClamp
      ?.item
      ? (selectedContent?.mounting?.clamps?.wallClamp?.item?.finishes?.find(
          (item) => selectedContent.hardwareFinishes._id === item.finish_id
        )?.cost || 0) * selectedContent?.mounting?.clamps?.wallClamp?.count
      : 0;
    const mountingsleeveOver = selectedContent?.mounting?.clamps?.sleeveOver
      ?.item
      ? (selectedContent?.mounting?.clamps?.sleeveOver?.item?.finishes?.find(
          (item) => selectedContent.hardwareFinishes._id === item.finish_id
        )?.cost || 0) * selectedContent?.mounting?.clamps?.sleeveOver?.count
      : 0;
    const mountingglassToGlass = selectedContent?.mounting?.clamps?.glassToGlass
      ?.item
      ? (selectedContent?.mounting?.clamps?.glassToGlass?.item?.finishes?.find(
          (item) => selectedContent.hardwareFinishes._id === item.finish_id
        )?.cost || 0) * selectedContent?.mounting?.clamps?.glassToGlass?.count
      : 0;
    const slidingDoorSystemPrice = selectedContent?.slidingDoorSystem?.item
      ? (selectedContent?.slidingDoorSystem?.item?.finishes?.find(
          (item) => selectedContent.hardwareFinishes._id === item.finish_id
        )?.cost || 0) * selectedContent.slidingDoorSystem.count
      : 0;
    const headerPrice = selectedContent?.header?.item
      ? (selectedContent?.header?.item?.finishes?.find(
          (item) => selectedContent.hardwareFinishes._id === item.finish_id
        )?.cost || 0) * selectedContent.header.count
      : 0;

    const hardwareTotals =
      handlePrice +
      hingesPrice +
      (mountingChannel * selectedContent?.mounting?.activeType === "channel"
        ? 1
        : 0) +
      ((mountingWallClamps + mountingglassToGlass + mountingsleeveOver) *
        selectedContent?.mounting?.activeType ===
      "clamps"
        ? 1
        : 0) +
      slidingDoorSystemPrice +
      headerPrice;

    // fabricating
    let fabricationPrice = 0;
    if (selectedContent.glassType.thickness === "1/2") {
      fabricationPrice =
        Number(selectedContent?.oneInchHoles) *
          estimatesData?.fabricatingPricing?.oneHoleOneByTwoInchGlass +
        Number(selectedContent?.hingeCut) *
          estimatesData?.fabricatingPricing?.hingeCutoutOneByTwoInch +
        Number(selectedContent?.clampCut) *
          estimatesData?.fabricatingPricing?.clampCutoutOneByTwoInch +
        Number(selectedContent?.notch) *
          estimatesData?.fabricatingPricing?.notchOneByTwoInch +
        Number(selectedContent?.outages) *
          estimatesData?.fabricatingPricing?.outageOneByTwoInch +
        Number(selectedContent?.mitre) *
          estimatesData?.fabricatingPricing?.minterOneByTwoInch +
        Number(selectedContent?.polish) *
          estimatesData?.fabricatingPricing?.polishPricePerOneByTwoInch;
    } else if (selectedContent.glassType.thickness === "3/8") {
      fabricationPrice =
        Number(selectedContent?.oneInchHoles) *
          estimatesData?.fabricatingPricing?.oneHoleThreeByEightInchGlass +
        Number(selectedContent?.hingeCut) *
          estimatesData?.fabricatingPricing?.hingeCutoutThreeByEightInch +
        Number(selectedContent?.clampCut) *
          estimatesData?.fabricatingPricing?.clampCutoutThreeByEightInch +
        Number(selectedContent?.notch) *
          estimatesData?.fabricatingPricing?.notchThreeByEightInch +
        Number(selectedContent?.outages) *
          estimatesData?.fabricatingPricing?.outageThreeByEightInch +
        Number(selectedContent?.mitre) *
          estimatesData?.fabricatingPricing?.minterThreeByEightInch +
        Number(selectedContent?.polish) *
          estimatesData?.fabricatingPricing?.polishPricePerThreeByEightInch;
    }

    //addons
    const towelBar = estimatesData?.addOns?.find((item)=>item.slug === 'towel-bars');
    const sleeveOver = estimatesData?.addOns?.find((item)=>item.slug === 'sleeve-over');
    const towelBarFinish = (towelBar?.finishes?.find((item)=>item.finish_id === selectedContent?.hardwareFinishes?._id)?.cost || 0)
    const sleeveOverFinish = (sleeveOver?.finishes?.find((item)=>item.finish_id === selectedContent?.hardwareFinishes?._id)?.cost || 0)
    let otherAddons = 0;
    selectedContent.addOns.map((item)=>
     {
      const price = item.finishes.find((finish)=>finish.finish_id === selectedContent?.hardwareFinishes?._id)?.cost || 0;
      otherAddons = otherAddons + (price * priceBySqft);
     }
    );
    const addOnsTotal = (towelBarFinish * selectedContent.towelBarsCount) + (sleeveOverFinish * selectedContent.sleeveOverCount) + otherAddons;

    //glass
    const glassPrice = (selectedContent?.glassType?.item?.options?.find((glass)=>glass.thickness === selectedContent?.glassType?.thickness)?.cost || 0)* priceBySqft;
    
    //glassTreatment
    const glassTreatmentPrice = (selectedContent?.glassTreatment?.item?.options?.find((glass)=>glass.thickness === selectedContent?.glassType?.thickness)?.cost || 0);
    
    //labor price
    const laborPrice =
      selectedContent?.people *
      selectedContent?.hours *
      estimatesData?.miscPricing?.hourlyRate;

    const total =
      (hardwareTotals + fabricationPrice + addOnsTotal + glassPrice + glassTreatmentPrice) *
        estimatesData?.miscPricing?.pricingFactor +
      laborPrice;
    dispatch(setTotal(total));
  }, [selectedContent]);

  const handleBoxClick = () => {
    dispatch(setNavigation("summary"));
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };
  return (
    <>
      <Box
        sx={{
          width: { md: "70%", sm: "100%", sx: "100%" },
          margin: { md: "auto", xs: 0 },

          display: "flex",
          alignItems: { md: "center", xs: "start" },

          flexDirection: "column",
          p: { md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
        }}
      >
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            zIndex: 1,
            justifyContent: { md: "center", xs: "start" },
            background: "#18133b",
            width: "100%",
            color: "white",
            paddingY: 1.2,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 7.6,
          }}
        >
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <ChevronLeftOutlined
              onClick={() => {
                dispatch(setNavigation("measurements"));
              }}
              sx={{ fontSize: 34, paddingTop: 0.4 }}
            />
          </Box>
          <Typography textAlign={"center"} variant="h4">
            Create New Quote
          </Typography>
        </Box>
        <Typography
          sx={{ display: { md: "block", xs: "none" } }}
          textAlign={"center"}
          variant="h4"
        >
          Create New Qoute
        </Typography>
        <Box
          sx={{
            width: { md: "94%", sm: "100%", xs: "100%" },
            margin: "auto",
            borderRadius: { md: "12px", xs: 0 },
            boxShadow:
              "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            border: { md: "1px solid #EAECF0", xs: "none" },
            paddingX: { md: 2, xs: 0 },
            paddingY: 4,
            rowGap: 4,
            background: { md: "white", xs: "#100D24" },
            display: "flex",
            flexDirection: "column",
            paddingTop: { md: 0, xs: 6 },
            marginTop: { md: 0, xs: -3 },
            marginBottom: 4.6,
          }}
        >
          <Box sx={{ width: { md: "100%", xs: "90%" }, margin: "auto" }}>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "18px" },
                color: { md: "black", xs: "white" },
                paddingBottom: 1,
              }}
            >
              Review
            </Typography>
            <Typography
              sx={{ color: { md: "#667085", xs: "white" }, font: "14px" }}
            >
              Your new project has been created. Invite colleagues to
              collaborate on this project.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { md: "96.5%", xs: "94%" },
              paddingY: { md: 4, xs: 0 },
              paddingX: { md: 2, xs: 0 },
              background: { md: "rgba(217, 217, 217, 0.3)", xs: "#100D24" },
              gap: 4,
              maxHeight: "54ffvh",
              borderRadius: "8px",
              justifyContent: "space-between",
              flexDirection: { md: "row", xs: "column" },
              margin: { md: 0, xs: "auto" },
              overflow: "auto",
            }}
          >

            <Box
              sx={{
                display: "flex",
                width: { md: "40.5%", xs: "100%" },
                flexDirection: "column",
              }}
            >
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    color: { md: "black", xs: "white" },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.hardwareFinishes}
                      title={"Hardware Finishes"}
                      type={"hardwareFinishes"}
                      showSnackbar={showSnackbar}
                      estimatesData={estimatesData}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.handles}
                      title={"Handles"}
                      type={"handles"}
                      showSnackbar={showSnackbar}
                      count={selectedContent.handles.count}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.hinges}
                      title={"Hinges"}
                      type={"hinges"}
                      showSnackbar={showSnackbar}
                      count={selectedContent.hinges.count}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "100%", display: "flex" }}>
                      <Box sx={{  width: "100%", display: "flex", flexDirection: "column" }}>
                        <ChannelType
                          menuOptions={estimatesData?.channelOrClamps}
                          title={"Mounting"}
                          type={"mounting"}
                          showSnackbar={showSnackbar}
                          estimatesData={estimatesData}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.glassType}
                      title={" Glass type"}
                      type={"glassType"}
                      showSnackbar={showSnackbar}
                      thickness={selectedContent.glassType.thickness}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.slidingDoorSystem}
                      title={"Sliding Door System"}
                      type={"slidingDoorSystem"}
                      showSnackbar={showSnackbar}
                      count={selectedContent.slidingDoorSystem.count}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.header}
                      title={"Header"}
                      type={"header"}
                      showSnackbar={showSnackbar}
                      count={selectedContent.header.count}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.glassTreatment}
                      title={"Glass treatment"}
                      type={"glassTreatment"}
                      showSnackbar={showSnackbar}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.addOns}
                      title={"Add ons"}
                      type={"addOns"}
                      showSnackbar={showSnackbar}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>1" Holes</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", 
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.oneInchHoles}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "oneInchHoles",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Hinges Cut</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", 
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.hingeCut}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "hingeCut",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>ClampCut</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.clampCut}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "clampCut",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Notch</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.notch}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "notch",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Outages</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", 
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.outages}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "outages",
                            value: event.target.value,
                          })
                        )
                      }

                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Mitre</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.mitre}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "mitre",
                            value: event.target.value,
                          })
                        )
                      }

                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Polish</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", 
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.polish}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "polish",
                            value: event.target.value,
                          })
                        )
                      }

                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>People:</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", 
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.people}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "people",
                            value: event.target.value,
                          })
                        )
                      }

                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Hours:</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        style: {
                          color: "white", 
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", 
                        },
                      }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "#14112c",
                        width: "100%",
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.hours}
                      onChange={(event) =>
                        dispatch(
                          setInputContent({
                            type: "hours",
                            value: event.target.value,
                          })
                        )
                      }

                    />
                  </Box>
                </Box>
              </Box>
            </Box>

          </Box>
        </Box>
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            gap: 2,
            justifyContent: "center",
            width: "93%",
            paddingX: 2,
            paddingY: 2,
            position: "fixed",
            bottom: 0,
            backgroundColor: "#100d24",
            borderTop: "1px solid #423f57",
          }}
        >
          <Box sx={{ width: { md: "150px", xs: "50%" } }}>
            <Button
              fullWidth
              onClick={() => {
                dispatch(setNavigation("measurements"));
              }}
              sx={{
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                color: "#344054",
                textTransform: "initial",
                border: "1px solid #D0D5DD",
                backgroundColor: { md: "transparent", xs: "white" },
              }}
            >
              {" "}
              Back
            </Button>
          </Box>

          <Box sx={{ width: { md: "150px", xs: "50%" } }}>
            <Button
              fullWidth
              disabled={selectedContent?.hardwareFinishes === null}
              variant="contained"
              onClick={handleBoxClick}
              sx={{
                backgroundColor: "#8477da",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
            >
              {" "}
              Next
            </Button>
          </Box>
        </Box>
        <Snackbars
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          closeSnackbar={closeSnackbar}
        />
      </Box>
    </>
  );
};

export default LayoutReview;
