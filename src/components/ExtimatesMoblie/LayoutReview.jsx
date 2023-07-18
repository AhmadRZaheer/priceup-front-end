import { Box, Button, TextField, Typography } from "@mui/material";
import door from "../../Assets/estimates/layout1.svg";

import MenuList from "./MenuList";
import { glassType, hinges, menuOptions } from "../../data/data";
import {
  AddCircleOutline,
  ChevronLeftOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { useFetchDataEstimate } from "../../utilities/ApiHooks/Estimate";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  getTotal,
  measumentSide,
  setInputContent,
  setNavigation,
  setTotal,
  updateMeasurements,
} from "../../redux/estimateCalculations";
import Snackbars from "../Model/SnackBar";
import ChannelType from "./channelOrClamp";

const LayoutReview = () => {
  const { data: estimatesData, refetch: estimatesRefetch } =
    useFetchDataEstimate();
  const selectedContent = useSelector(getContent);
  const totalPrice = useSelector(getTotal);

  console.log(selectedContent.mounting.activeType, "active type");
  const dispatch = useDispatch();
  // const [mountingType, setmountingType] = useState(
  //   selectedContent.mounting.activeType || "clamps"
  // );

  useEffect(() => {
    // hardware formula = ( handle finish price * handle count ) + (hinges finish price * hinges count) + ((mountingChannel * count)*active) + (((clamps1 * count) + (clamps2 * count) + (clamps3 * count))*active) + (bars finish price * hinges count) + (headers finish price * hinges count)
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

    let fabricationPrice = 0;
    if (selectedContent.glassType.thickness === "1/2") {
      // for 1/2 price
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

    const laborPrice =
      selectedContent?.people *
      selectedContent?.hours *
      estimatesData?.miscPricing?.hourlyRate;

    // total formula = (hardware's cost + glass cost + add-ons cost + fabrication + fabrication 1/2) * Company pricing factor + Labor result
    const total =
      (hardwareTotals + fabricationPrice) *
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
  console.log(estimatesData, "estimatesData12");
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
              maxHeight: "60vh",
              borderRadius: "8px",
              justifyContent: "space-between",
              flexDirection: { md: "row", xs: "column" },
              margin: { md: 0, xs: "auto" },
              overflow: "auto",
            }}
          >
            {/* LeftSide */}

            <Box
              sx={{
                display: "flex",
                width: { md: "40.5%", xs: "100%" },
                flexDirection: "column",

                // background: "red",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  gap: 1,
                }}
              >
                {/* <MenuList /> */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                      // setSelectedContent={setSelectedContent}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                      // setSelectedContent={setSelectedContent}
                      count={selectedContent.handles.count}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                      // setSelectedContent={setSelectedContent}
                      count={selectedContent.hinges.count}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    // display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    // justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  {/* mouting channel */}
                  {/* <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <MenuList
                        menuOptions={estimatesData?.wallClamp}
                        title={"Wall Clamps"}
                        type={"wallClamp"}
                        showSnackbar={showSnackbar}
                        // setSelectedContent={setSelectedContent}
                        count={selectedContent.mounting.clamps.wallClamp.count}
                      />
                      <MenuList
                        menuOptions={estimatesData?.sleeveOver}
                        title={"Sleeve Over"}
                        type={"sleeveOver"}
                        showSnackbar={showSnackbar}
                        // setSelectedContent={setSelectedContent}
                        count={selectedContent.mounting.clamps.sleeveOver.count}
                      />
                      <MenuList
                        menuOptions={estimatesData?.glassToGlass}
                        title={"Glass to Glass"}
                        type={"glassToGlass"}
                        showSnackbar={showSnackbar}
                        // setSelectedContent={setSelectedContent}
                        count={
                          selectedContent.mounting.clamps.glassToGlass.count
                        }
                      />
                      <MenuList
                        menuOptions={estimatesData?.mountingChannel}
                        title={"Channel"}
                        type={"channel"}
                        showSnackbar={showSnackbar}
                        // setSelectedContent={setSelectedContent}
                      />
                    </Box>
                  </Box> */}
                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "100%", display: "flex" }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <ChannelType
                          menuOptions={estimatesData?.channelOrClamps}
                          title={"Mounting"}
                          type={"mounting"}
                          showSnackbar={showSnackbar}
                          estimatesData={estimatesData}
                        />
                        {/* <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignContent: "space-between",
                          }}
                        >
                          {selectedContent.mounting.activeType === "clamps" && (
                            <>
                              <MenuList
                                menuOptions={estimatesData?.wallClamp}
                                title={"Wall Clamps"}
                                type={"wallClamp"}
                                showSnackbar={showSnackbar}
                                count={
                                  selectedContent.mounting.clamps.wallClamp
                                    .count
                                }
                              />
                              <MenuList
                                menuOptions={estimatesData?.sleeveOver}
                                title={"Sleeve Over"}
                                type={"sleeveOver"}
                                showSnackbar={showSnackbar}
                                count={
                                  selectedContent.mounting.clamps.sleeveOver
                                    .count
                                }
                              />
                              <MenuList
                                menuOptions={estimatesData?.glassToGlass}
                                title={"Glass to Glass"}
                                type={"glassToGlass"}
                                showSnackbar={showSnackbar}
                                count={
                                  selectedContent.mounting.clamps.glassToGlass
                                    .count
                                }
                              />
                            </>
                          )}

                          {selectedContent.mounting.activeType ===
                            "channel" && (
                            <MenuList
                              menuOptions={estimatesData?.mountingChannel}
                              title={"Channel"}
                              type={"channel"}
                              showSnackbar={showSnackbar}
                            />
                          )}
                        </Box> */}
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
                      // setSelectedContent={setSelectedContent}
                      thickness={selectedContent.glassType.thickness}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                      // setSelectedContent={setSelectedContent}
                      count={selectedContent.slidingDoorSystem.count}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                      // setSelectedContent={setSelectedContent}
                      count={selectedContent.header.count}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                      // setSelectedContent={setSelectedContent}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                {/* holes onword */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                      // InputProps={{ inputProps: { min: 0, max: 50 } }}
                      InputProps={{
                        style: {
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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
                    // gap: 4,
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
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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
                    // gap: 4,
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
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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

                      // onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, clampCut: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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
                      // onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, notch: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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

                      // onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, outages: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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

                      // onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, mitre: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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

                      // onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, polish: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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

                      // onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, people: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
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
                          color: "white", // Change the color of the input text
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)", // Change the color of the placeholder text
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

                      // onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, hours: event.target.value }))}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* rightSide */}
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: {md:"45.5%", xs: "100%"},
                background: {md:"#ffff", xs: "#100d24"},
                p: {md: 3, xs: 0},
                borderRadius: "8px",
                color: {md: "black", xs: "white"}
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "89%",
                  justifyContent: "center",
                  background: "#D9D9D9",
                  borderRadius: "8px",
                  p: 3,
                  // height: "250px",
                }}
              >
                <img
                  // width={"350px"}
                  // height={"250px"}
                  src={door}
                  alt="Selected"
                />
              </Box>
              <Box
                sx={{
                  width: "89%",

                  borderRadius: "8px",
                  p: 3,
                  // height: "250px",
                }}
              >
                <Typography>12’’/ 12’’/ 12’’ </Typography>
                <Typography variant="h6">Summary </Typography>
                <Typography> Finish: Polished Chrome</Typography>
                <Typography>Handles: 8 by 8 D-Pull </Typography>
                <Typography>Hinges: STD Bevel </Typography>
                <Typography> Channel </Typography>
                <Typography>Glass Type:Clear (3/8)</Typography>
                <Typography> Bars</Typography>
                <Typography>Transom </Typography>
                <Typography>Header </Typography>
                <Typography>Glass Treatment </Typography>
                <Typography variant="h6">Add ons </Typography>
                <Typography> People: 2</Typography>
                <Typography> Hours: 2 </Typography>
                <Typography> </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                  }}
                >
                  <Typography>Price</Typography>
                  <Typography variant="h6">$895</Typography>
                </Box>{" "}
              </Box>
            </Box> */}
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
              // onClick={() => setHandleEstimatesPages("measurements")}
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
