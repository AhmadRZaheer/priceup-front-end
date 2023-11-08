import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";
import QuotesHeader from "./quotesHeader";
import CustomImage from "../../Assets/customlayoutimage.svg";
import { useEditEstimates } from "../../utilities/ApiHooks/estimate";
import {
  selectedItem,
  setNavigation,
  getContent,
  getLayoutArea,
  getQuoteState,
  getTotal,
  getMeasurementSide,
  getLayoutPerimeter,
  getQuoteId,
  getDoorWidth,
  getHardwareTotal,
  getGlassTotal,
  getGlassAddonsTotal,
  getFabricationTotal,
  getMiscTotal,
  getLaborTotal,
} from "../../redux/estimateCalculations";

const Summary = ({ handleOpen }) => {
  const hardwarePrice = useSelector(getHardwareTotal);
  const glassPrice = useSelector(getGlassTotal);
  const glassAddonsPrice = useSelector(getGlassAddonsTotal);
  const fabricationPrice = useSelector(getFabricationTotal);
  const miscPrice = useSelector(getMiscTotal);
  const laborPrice = useSelector(getLaborTotal);
  const {
    mutate: mutateEdit,
    isError: ErrorForAddEidt,
    isSuccess: CreatedSuccessfullyEdit,
  } = useEditEstimates();
  const totalPrice = useSelector(getTotal);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const selectedContent = useSelector(getContent);
  const selectedData = useSelector(selectedItem);
  const layoutImage = selectedData?.image
    ? `${backendURL}/${selectedData?.image}`
    : CustomImage;
  const estimatesContent = useSelector(getContent);
  const estimatesTotal = useSelector(getTotal);
  const measurements = useSelector(getMeasurementSide);
  const perimeter = useSelector(getLayoutPerimeter);
  const quoteId = useSelector(getQuoteId);
  const sqftArea = useSelector(getLayoutArea);
  const updatecheck = useSelector(getQuoteState);
  const doorWidth = useSelector(getDoorWidth);

  const dispatch = useDispatch();
  const handleEditEstimate = () => {
    const hardwareAddonsArray = estimatesContent?.hardwareAddons?.map((row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    });
    const wallClampArray = estimatesContent?.mountingClamps?.wallClamp?.map(
      (row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      }
    );
    const sleeveOverArray = estimatesContent?.mountingClamps?.sleeveOver?.map(
      (row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      }
    );
    const glassToGlassArray =
      estimatesContent?.mountingClamps?.glassToGlass?.map((row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      });
    const glassAddonsArray = estimatesContent?.glassAddons?.map(
      (item) => item?._id
    );
    const estimate = {
      hardwareFinishes: estimatesContent?.hardwareFinishes?._id,
      handles: {
        type: estimatesContent?.handles?.item?._id,
        count: estimatesContent?.handles?.count,
      },
      hinges: {
        type: estimatesContent?.hinges?.item?._id,
        count: estimatesContent?.hinges?.count,
      },
      mountingClamps: {
        wallClamp: [...wallClampArray],
        sleeveOver: [...sleeveOverArray],
        glassToGlass: [...glassToGlassArray],
      },
      mountingChannel: estimatesContent?.mountingChannel?.item?._id || null,
      glassType: {
        type: estimatesContent?.glassType?.item?._id,
        thickness: estimatesContent?.glassType?.thickness,
      },
      glassAddons: [...glassAddonsArray],
      slidingDoorSystem: {
        type: estimatesContent?.slidingDoorSystem?.item?._id,
        count: estimatesContent?.slidingDoorSystem?.count,
      },
      header: {
        type: estimatesContent?.header?.item?._id,
        count: estimatesContent?.slidingDoorSystem?.count,
      },
      oneInchHoles: estimatesContent?.oneInchHoles,
      hingeCut: estimatesContent?.hingeCut,
      clampCut: estimatesContent?.clampCut,
      notch: estimatesContent?.notch,
      outages: estimatesContent?.outages,
      mitre: estimatesContent?.mitre,
      polish: estimatesContent?.polish,
      people: estimatesContent?.people,
      hours: estimatesContent?.hours,
      cost: Number(estimatesTotal),
      hardwareAddons: [...hardwareAddonsArray],
      sleeveOverCount: estimatesContent?.sleeveOverCount,
      towelBarsCount: estimatesContent?.sleeveOverCount,
      measurements: measurements,
      perimeter: perimeter,
      sqftArea: sqftArea,
    };

    mutateEdit({
      customerData: {},
      estimateData: estimate,
      id: quoteId,
    });
  };
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

  React.useEffect(() => {
    if (CreatedSuccessfullyEdit) {
      showSnackbar("Estimate Updated successfully", "success");
      dispatch(setNavigation("existing"));
    } else if (ErrorForAddEidt) {
      const errorMessage = ErrorForAddEidt.message || "An error occurred";
      showSnackbar(errorMessage, "error");
    }
  }, [CreatedSuccessfullyEdit, ErrorForAddEidt]);

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
        <QuotesHeader navigateTo={"review"} />
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
          }}
        >
          <Box sx={{ width: { md: "100%", xs: "90%" }, margin: "auto" }}>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "25px" },
                color: { md: "black", xs: "white" },
                paddingBottom: 1,
              }}
            >
              Summary
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
              paddingY: { md: 4, xs: 1 },
              paddingX: { md: 2, xs: 0 },
              background: { md: "rgba(217, 217, 217, 0.3)", xs: "#100D24" },
              margin: { md: 0, xs: "auto" },
              borderRadius: "8px",
              justifyContent: "space-between",
              flexDirection: { md: "row", xs: "column" },
              minHeight: "50vh",
              maxHeight: "61vh",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { md: "45.5%", xs: "100%" },
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
                  margin: { md: 0, xs: "auto" },
                  p: 3,
                  borderBottom: "1px solid #2c2c3c",
                }}
              >
                <img
                  width={"200px"}
                  height={"210px"}
                  src={layoutImage}
                  alt="Selected"
                />
              </Box>
              <Box
                sx={{
                  width: "94%",
                  borderRadius: "8px",
                  paddingY: 4,
                  margin: { md: 0, xs: "auto" },
                }}
              >
                <Typography>
                  {measurements
                    .filter(
                      (measurement) =>
                        measurement.value !== null && measurement.value !== ""
                    )
                    .map((measurement) => measurement.value)
                    .join("’’/ ")}
                  ’’
                </Typography>
                <Typography>Door Width {doorWidth}</Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                  Summary{" "}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                    borderBottom: "2px solid #D0D5DD",
                    marginBottom: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {" "}
                    Total Price
                  </Typography>
                  <Typography variant="h6">
                    ${totalPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>{" "}
                {selectedContent?.hardwareFinishes && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>Finish:</Typography>
                    <Typography>
                      {selectedContent?.hardwareFinishes?.name}
                    </Typography>
                  </Box>
                )}
                {selectedContent?.handles?.item && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Handles:
                    </Typography>
                    <Typography>
                      {selectedContent?.handles?.item?.name} (
                      {selectedContent?.handles?.count})
                    </Typography>
                  </Box>
                )}
                {selectedContent?.hinges?.item && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>Hinges:</Typography>
                    <Typography>
                      {selectedContent?.hinges?.item?.name} (
                      {selectedContent?.hinges?.count})
                    </Typography>
                  </Box>
                )}
                {selectedContent?.mountingChannel?.item && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Channel:
                    </Typography>
                    <Typography>
                      {selectedContent?.mountingChannel?.item?.name}
                    </Typography>
                  </Box>
                )}
                {selectedContent?.mountingClamps?.wallClamp?.length ? (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      WallClamps:{" "}
                    </Typography>
                    {selectedContent?.mountingClamps?.wallClamp?.map((row) => (
                      <Typography>
                        {row.item.name} ({row.count}){" "}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  ""
                )}
                {selectedContent?.mountingClamps?.sleeveOver?.length ? (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Sleeve Over:{" "}
                    </Typography>
                    {selectedContent?.mountingClamps?.sleeveOver?.map((row) => (
                      <Typography>
                        {row.item.name} ({row.count}){" "}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  ""
                )}
                {selectedContent?.mountingClamps?.glassToGlass?.length ? (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Glass To Glass:{" "}
                    </Typography>
                    {selectedContent?.mountingClamps?.glassToGlass?.map(
                      (row) => (
                        <Typography>
                          {row.item.name} ({row.count}){" "}
                        </Typography>
                      )
                    )}
                  </Box>
                ) : (
                  ""
                )}
                {selectedContent?.glassType?.item && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Glass Type:
                    </Typography>
                    <Typography>
                      {selectedContent?.glassType?.item?.name} (
                      {selectedContent?.glassType?.thickness})
                    </Typography>
                  </Box>
                )}
                {selectedContent?.slidingDoorSystem?.item && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Sliding Door System:
                    </Typography>
                    <Typography>
                      {selectedContent?.slidingDoorSystem?.item?.name} (
                      {selectedContent?.slidingDoorSystem?.count})
                    </Typography>
                  </Box>
                )}
                {selectedContent?.transom && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Transom:{" "}
                    </Typography>
                    <Typography></Typography>
                  </Box>
                )}
                {selectedContent?.header?.item && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>Header:</Typography>
                    <Typography>
                      {selectedContent?.header?.item?.name} (
                      {selectedContent?.header?.count})
                    </Typography>
                  </Box>
                )}
                {selectedContent?.glassAddons?.length ? (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Glass Addons:
                    </Typography>
                    {selectedContent?.glassAddons?.map((item) => (
                      <Typography>{`${item?.name} `}</Typography>
                    ))}
                  </Box>
                ) : (
                  ""
                )}
                {selectedContent?.hardwareAddons?.length > 0 && (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Add ons:{" "}
                    </Typography>
                    <Typography>
                      {selectedContent?.hardwareAddons?.map(
                        (row) => ` ${row?.item?.name} (${row?.count})`
                      )}{" "}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>People: </Typography>
                  <Typography>{selectedContent?.people}</Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Hours: </Typography>
                  <Typography>{selectedContent?.hours}</Typography>
                </Box>
                <Typography> </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                  Pricing Sub Categories{" "}
                </Typography>
                <Typography> </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Hardware Price
                  </Typography>
                  <Typography variant="h6">
                    ${hardwarePrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Glass Price
                  </Typography>
                  <Typography variant="h6">
                    ${glassPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Glass Addons Price
                  </Typography>
                  <Typography variant="h6">
                    ${glassAddonsPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Fabrication Price
                  </Typography>
                  <Typography variant="h6">
                    ${fabricationPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Misc Price
                  </Typography>
                  <Typography variant="h6">
                    ${miscPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Labor Price
                  </Typography>
                  <Typography variant="h6">
                    ${laborPrice?.toFixed(2) || 0}
                  </Typography>
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
              onClick={() => {
                dispatch(setNavigation("review"));
              }}
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
              onClick={() => {
                if (["create", "custom"].includes(updatecheck)) {
                  handleOpen();
                } else {
                  handleEditEstimate();
                }
              }}
              sx={{
                backgroundColor: "#8477da",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Summary;
