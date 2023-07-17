import { Box, Button, TextField, Typography } from "@mui/material";
import door from "../../Assets/estimates/layout1.svg";

import MenuList from "./MenuList";
import { menuOptions } from "../../data/data";
import { AddCircleOutline, ChevronLeftOutlined, RemoveCircleOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useFetchDataEstimate } from "../../utilities/ApiHooks/Estimate";
import { useDispatch, useSelector } from "react-redux";
import { getContent, getTotal, setInputContent, setTotal } from "../../redux/estimateCalculations";

const LayoutReview = ({setHandleEstimatesPages}) => {
  const [doorDetail, setDoorDetail] = useState(null);


  const { data: estimatesData, refetch: estimatesRefetch } =
  useFetchDataEstimate();
const selectedContent = useSelector(getContent);
const totalPrice = useSelector(getTotal);
const dispatch = useDispatch();

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
  return (
    <>
      <Box
        sx={{
          width: "70%",
          margin: "auto",

          display: "flex",
          alignItems: "center",
          //   background: "blue",
          // marginTop: 4,
          flexDirection: "column",
          p: 2,
          gap: 4,
        }}
      >
        <Typography textAlign={"center"} variant="h4">
          Create New Qoute
        </Typography>
        <Box
          sx={{
            width: "94%",
            margin: "auto",
            borderRadius: "12px",
            boxShadow:
              "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            border: "1px solid #EAECF0",
            paddingX: 2,
            paddingY: 4,
            rowGap: 4,
            // background: "green",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Typography sx={{ font: "18px" }}>Review</Typography>
            <Typography sx={{ color: "#667085", font: "14px" }}>
              Your new project has been created. Invite colleagues to
              collaborate on this project.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "96.5%",
              paddingY: 4,
              paddingX: 2,
              background: "rgba(217, 217, 217, 0.3)",
              gap: 4,
              borderRadius: "8px",
              justifyContent: "space-between",
            }}
          >
            {/* LeftSide */}

            <Box
        sx={{
          width:  "50%",
          margin: { md: "auto", xs: 0 },

          display: "flex",
          alignItems: { md: "center", xs: "start" },
          //   background: "blue",
          // marginTop: { md: 15, sx: 0 },
          flexDirection: "column",
          p: { md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
        }}
      >
       
          <Box
            sx={{
              display: "flex",
              width: "100%",
              paddingY: { md: 4, xs: 0 },
              paddingX: { md: 2, xs: 0 },
              background: { md: "rgba(217, 217, 217, 0.3)", xs: "#100D24" },
              gap: 4,
              borderRadius: "8px",
              justifyContent: "space-between",
              flexDirection: { md: "row", xs: "column" },
              margin: { md: 0, xs: "auto" },
            }}
          >
            {/* LeftSide */}

            <Box
              sx={{
                display: "flex",
                width: "100%",
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
                      // setSelectedContent={setSelectedContent}
                      count={selectedContent.hinges.count}
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
                  {/* mouting channel */}
                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <MenuList
                        menuOptions={estimatesData?.wallClamp}
                        title={"Wall Clamps"}
                        type={"wallClamp"}
                        // setSelectedContent={setSelectedContent}
                        count={selectedContent.mounting.clamps.wallClamp.count}
                      />
                      <MenuList
                        menuOptions={estimatesData?.sleeveOver}
                        title={"Sleeve Over"}
                        type={"sleeveOver"}
                        // setSelectedContent={setSelectedContent}
                        count={selectedContent.mounting.clamps.sleeveOver.count}
                      />
                      <MenuList
                        menuOptions={estimatesData?.glassToGlass}
                        title={"Glass to Glass"}
                        type={"glassToGlass"}
                        // setSelectedContent={setSelectedContent}
                        count={
                          selectedContent.mounting.clamps.glassToGlass.count
                        }
                      />
                    </Box>
                    <MenuList
                      menuOptions={estimatesData?.mountingChannel}
                      title={"Channel"}
                      type={"channel"}
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
                      menuOptions={estimatesData?.glassType}
                      title={" Glass type"}
                      type={"glassType"}
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
                      title={"Add ons:"}
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: "white",
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
              onClick={() => setHandleEstimatesPages("measurements")}
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
              variant="contained"
              onClick={() => setHandleEstimatesPages("summary")}
            >
              {" "}
              Next
            </Button>
          </Box>
        </Box>
      </Box>
            {/* rightSide */}
            <Box
        sx={{
          width: "50%",
          margin: 0,

          display: "flex",
          alignItems: { md: "center", xs: "start" },
          //   background: "blue",
          // marginTop: { md: 15, sx: 0 },
          flexDirection: "column",
          p: { md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
        }}
      >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                background: { md: "#ffff", xs: "rgba(37, 32, 56,0.4)" },
                p: { md: 3, xs: 0 },
                borderRadius: "8px",
                color: { md: "black", xs: "white" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "84%",
                  justifyContent: "center",
                  // background: "#D9D9D9",
                  margin: { md: 0, xs: "auto" },
                  p: 3,
                  borderBottom: "1px solid #2c2c3c"
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
                  width: "94%",

                  borderRadius: "8px",
                  paddingY: 4,
                  margin: { md: 0, xs: "auto" },
                  // height: "250px",
                }}
              >
                <Typography>12’’/ 12’’/ 12’’ </Typography>
                <Typography variant="h6">Summary </Typography>
                <Typography>Finish: {selectedContent?.hardwareFinishes?.name}</Typography>
                <Typography>Handles: {selectedContent?.handles?.item?.name} ({selectedContent?.handles?.count})</Typography>
                <Typography>Hinges: {selectedContent?.hinges?.item?.name}  ({selectedContent?.hinges?.count})</Typography>
                {selectedContent?.mounting?.activeType === 'channel' ? <Typography>Channel: {selectedContent?.mounting?.channel?.type?.name}</Typography> :
                  <Typography>Clamps: {selectedContent?.mounting?.clamps?.wallClamp?.name} / {selectedContent?.mounting?.clamps?.sleeveOver?.name} / {selectedContent?.mounting?.clamps?.glassToGlass?.name}</Typography>
                }
                <Typography>Glass Type:{selectedContent?.glassType?.item?.name} ({selectedContent?.glassType?.thickness})</Typography>
                <Typography>Bars: {selectedContent?.slidingDoorSystem?.item?.name} ({selectedContent?.slidingDoorSystem?.count})</Typography>
                <Typography>Transom: </Typography>
                <Typography>Header: {selectedContent?.header?.item?.name}  ({selectedContent?.header?.count})</Typography>
                <Typography>Glass Treatment: {selectedContent?.glassTreatment?.name}</Typography>
                <Typography variant="h6">Add ons: </Typography>
                <Typography>People: {selectedContent?.people}</Typography>
                <Typography>Hours: {selectedContent?.hours}</Typography>
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
                  <Typography variant="h6">${totalPrice}</Typography>
                </Box>{" "}
              </Box>
            </Box>
       
  
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            gap: 2,
            justifyContent: "center",
            width: "92%",
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
              onClick={() => setHandleEstimatesPages("review")}
              sx={{
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                color: "#344054",
                textTransform: "initial",
                border: "1px solid #D0D5DD",
                backgroundColor: { md: "transparent", xs: "white" },
              }}
            >
              Back
            </Button>
          </Box>

          <Box sx={{ width: { md: "150px", xs: "50%" } }}>
            <Button
              fullWidth
              variant="contained"
              // onClick={() => {
              //   setClientDetailOpen(true);
              // }}
            >
              {" "}
              Next
            </Button>
          </Box>
        </Box>
      </Box>
          </Box>
        
              <Box sx={{ width: "150px" }}>
                <Button
                  fullWidth
                  onClick={() => setHandleEstimatesPages("Measurments")}
                  sx={{
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "#344054",
                    textTransform: "initial",
                    border: "1px solid #D0D5DD",
                  }}
                >
                  Back
                </Button>
             </Box>
        </Box>
      </Box>
    </>
  );
};

export default LayoutReview;
