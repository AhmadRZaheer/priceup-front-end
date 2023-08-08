import { Box, Button, Typography } from "@mui/material";
import {
  getContent,
  getMeasurementSide,
  getTotal,
  selectedItem,
  setNavigation,
} from "../../redux/estimateCalculations";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";
import QuotesHeader from "./quotesHeader";

const Summary = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const totalPrice = useSelector(getTotal);
  const selectedContent = useSelector(getContent);
  const measurements = useSelector(getMeasurementSide);
  const selectedData = useSelector(selectedItem);

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
                  src={`${backendURL}/${selectedData?.image}`}
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
                <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                  Summary{" "}
                </Typography>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Finish:</Typography>
                  <Typography>
                    {selectedContent?.hardwareFinishes?.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Handles:</Typography>
                  <Typography>
                    {selectedContent?.handles?.item?.name} (
                    {selectedContent?.handles?.count})
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Hinges:</Typography>
                  <Typography>
                    {selectedContent?.hinges?.item?.name} (
                    {selectedContent?.hinges?.count})
                  </Typography>
                </Box>
                {selectedContent?.mounting?.activeType === "channel" ? (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Channel:
                    </Typography>
                    <Typography>
                      {selectedContent?.mounting?.channel?.item?.name}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Clamps:{" "}
                    </Typography>
                    <Typography>
                      {selectedContent?.mounting?.clamps?.wallClamp?.item?.name}{" "}
                      ({selectedContent?.mounting?.clamps?.wallClamp?.count}) /{" "}
                      {
                        selectedContent?.mounting?.clamps?.sleeveOver?.item
                          ?.name
                      }{" "}
                      ({selectedContent?.mounting?.clamps?.sleeveOver?.count}) /{" "}
                      {
                        selectedContent?.mounting?.clamps?.glassToGlass?.item
                          ?.name
                      }{" "}
                      ({selectedContent?.mounting?.clamps?.glassToGlass?.count})
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Glass Type:
                  </Typography>
                  <Typography>
                    {selectedContent?.glassType?.item?.name} (
                    {selectedContent?.glassType?.thickness})
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Bars:</Typography>
                  <Typography>
                    {selectedContent?.slidingDoorSystem?.item?.name} (
                    {selectedContent?.slidingDoorSystem?.count})
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Transom: </Typography>
                  <Typography></Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Header:</Typography>
                  <Typography>
                    {selectedContent?.header?.item?.name} (
                    {selectedContent?.header?.count})
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Glass Treatment:
                  </Typography>
                  <Typography>
                    {selectedContent?.glassTreatment?.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Add ons: </Typography>
                  <Typography>
                    {selectedContent?.addOns?.map((item) => ` ${item?.name}`)}{" "}
                    Towel Bars ({selectedContent?.towelBarsCount}) Sleeve Over (
                    {selectedContent?.sleeveOverCount})
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>People: </Typography>
                  <Typography>{selectedContent?.people}</Typography>
                </Box>
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Hours: </Typography>
                  <Typography>{selectedContent?.hours}</Typography>
                </Box>
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
                  <Typography sx={{ fontWeight: "bold" }}>Price</Typography>
                  <Typography variant="h6">
                    ${totalPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>{" "}
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
              onClick={handleOpen}
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
