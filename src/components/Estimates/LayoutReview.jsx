import { Box, Button, TextField, Typography } from "@mui/material";
import MenuList from "./MenuList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "../Model/SnackBar";
import {
  getContent,
  getTotal,
  setInputContent,
  setNavigation,
  setTotal,
} from "../../redux/estimateCalculations";
import { useFetchDataEstimate } from "../../utilities/ApiHooks/Estimate";
import Summary from "./Summery";
import ChannelTypeDesktop from "./ChannelorClamp";

const LayoutReview = ({ setClientDetailOpen, setHandleEstimatesPages }) => {
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
  console.log(
    estimatesData,
    "estimatesData",
    selectedContent,
    "selected items",
    totalPrice
  );
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
          width: 900,
          margin: { md: "auto", xs: 0 },

          display: "flex",
          alignItems: "center",

          flexDirection: "column",
          p: 2,
          gap: 4,
        }}
      >
        <Typography
          sx={{ display: { md: "block", xs: "none" } }}
          textAlign={"center"}
          variant="h4"
        >
          Create New Qoute
        </Typography>
        <Box
          sx={{
            width: "100%",
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
            paddingTop: 2,

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
              // gap: 6,
              maxHeight: 1400,
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
                width: "42%",
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
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                      <ChannelTypeDesktop
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
                                selectedContent.mounting.clamps.wallClamp.count
                              }
                            />
                            <MenuList
                              menuOptions={estimatesData?.sleeveOver}
                              title={"Sleeve Over"}
                              type={"sleeveOver"}
                              showSnackbar={showSnackbar}
                              count={
                                selectedContent.mounting.clamps.sleeveOver.count
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

                        {selectedContent.mounting.activeType === "channel" && (
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
                          color: "black",
                          borderRadius: 10,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { md: "black", xs: "white" },
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
            <Box sx={{ width: "46%" }}>
              <Summary />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              // gap: 2,
              justifyContent: "space-between",
              width: "96%",
              paddingX: 2,
            }}
          >
            <Box sx={{ width: { md: "150px", xs: "50%" } }}>
              <Button
                fullWidth
                onClick={() => setHandleEstimatesPages("Measurments")}
                // onClick={() => {
                //   dispatch(setNavigation("measurements"));
                // }}
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
                onClick={() => setClientDetailOpen(true)}
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
