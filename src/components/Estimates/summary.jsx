import { Box, Typography } from "@mui/material";
import {
  getContent,
  getMeasurementSide,
  getTotal,
  selectedItem,
} from "../../redux/estimateCalculations";
import { useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";

const Summary = () => {
  const totalPrice = useSelector(getTotal);
  const selectedContent = useSelector(getContent);
  const measurements = useSelector(getMeasurementSide);
  const selectedData = useSelector(selectedItem);

  return (
    <>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: { md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            paddingY: { md: 4, xs: 1 },
            paddingX: { md: 2, xs: 0 },
            background: "white",
            margin: { md: 0, xs: "auto" },
            borderRadius: "8px",
            justifyContent: "space-between",
            flexDirection: { md: "row", xs: "column" },
            minHeight: "50vh",
            maxHeight: "79vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              borderRadius: "8px",
              color: { md: "black", xs: "white" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "87%",
                justifyContent: "center",
                background: "rgba(217, 217, 217, 0.3)",
                margin: { md: 0, xs: "auto" },
                p: 3,
                borderRadius: 2
              }}
            >
              <img
                width={"300px"}
                height={"310px"}
                src={`${backendURL}/${selectedData?.image}`}
                alt="Selected"
              />
            </Box>
            <Box
              sx={{
                width: "100%",

                paddingTop: 2,
                margin: "auto",
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
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                Summary{" "}
              </Typography>
              {selectedContent?.hardwareFinishes && <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>Finish:</Typography>
                <Typography>
                  {selectedContent?.hardwareFinishes?.name}
                </Typography>
              </Box>}
              {selectedContent?.handles?.item && <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>Handles:</Typography>
                <Typography>
                  {selectedContent?.handles?.item?.name} (
                  {selectedContent?.handles?.count})
                </Typography>
              </Box>}
              {selectedContent?.hinges?.item && <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>Hinges:</Typography>
                <Typography>
                  {selectedContent?.hinges?.item?.name} (
                  {selectedContent?.hinges?.count})
                </Typography>
              </Box>}
              {selectedContent?.mountingChannel?.item && (
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Channel:</Typography>
                  <Typography>
                    {selectedContent?.mountingChannel?.item?.name}
                  </Typography>
                </Box>
              )}
              {selectedContent?.mountingClamps?.wallClamp?.length ?
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>WallClamps: </Typography>
                  {selectedContent?.mountingClamps?.wallClamp?.map((row)=>
                    <Typography>{row.item.name} ({row.count}) </Typography>
                  )}
                </Box> : ''}
              {selectedContent?.mountingClamps?.sleeveOver?.length ?
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Sleeve Over: </Typography>
                  {selectedContent?.mountingClamps?.sleeveOver?.map((row)=>
                    <Typography>{row.item.name} ({row.count}) </Typography>
                  )}
                </Box> : ''}
              {selectedContent?.mountingClamps?.glassToGlass?.length ?
                <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Glass To Glass: </Typography>
                  {selectedContent?.mountingClamps?.glassToGlass?.map((row)=>
                    <Typography>{row.item.name} ({row.count}) </Typography>
                  )}
                </Box> : ''}
              {selectedContent?.glassType?.item && <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>Glass Type:</Typography>
                <Typography>
                  {selectedContent?.glassType?.item?.name} (
                  {selectedContent?.glassType?.thickness})
                </Typography>
              </Box>}
              {selectedContent?.slidingDoorSystem?.item && <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>Sliding Door System:</Typography>
                <Typography>
                  {selectedContent?.slidingDoorSystem?.item?.name} (
                  {selectedContent?.slidingDoorSystem?.count})
                </Typography>
              </Box>}
              {selectedContent?.transom && <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>Transom: </Typography>
                <Typography></Typography>
              </Box>}
              {selectedContent?.header?.item && <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>Header:</Typography>
                <Typography>
                  {selectedContent?.header?.item?.name} (
                  {selectedContent?.header?.count})
                </Typography>
              </Box>}
              {selectedContent?.glassAddons?.length ? <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Glass Addons:
                </Typography>
                {selectedContent?.glassAddons?.map((item)=>
                  <Typography>
                {`${item?.name} `}
                </Typography>
                )}
              </Box> : ''}
              {(selectedContent?.hardwareAddons?.length > 0 || selectedContent?.towelBarsCount > 0 || selectedContent?.sleeveOverCount > 0) && <Box sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}>
                <Typography sx={{ fontWeight: "bold" }}>Add ons: </Typography>
                <Typography>
                  {selectedContent?.hardwareAddons?.map((item) => ` ${item?.name}`)}{" "}
                  Towel Bars ({selectedContent?.towelBarsCount}) Sleeve Over (
                  {selectedContent?.sleeveOverCount})
                </Typography>
              </Box>}
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
    </>
  );
};
export default Summary;
