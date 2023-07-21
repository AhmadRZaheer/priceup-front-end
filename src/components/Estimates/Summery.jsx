import { Box, Typography } from "@mui/material";
import {
  getContent,
  getMeasumentSide,
  getTotal,
  selectedItem,
} from "../../redux/estimateCalculations";
import { useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";

const Summary = () => {
  const totalPrice = useSelector(getTotal);
  const selectedContent = useSelector(getContent);
  const measurements = useSelector(getMeasumentSide);
  const selectedData = useSelector(selectedItem);

  return (
    <>
      <Box
        sx={{
          width:  "90%",
          margin: "auto",
          display: "flex",
          alignItems:"center",
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
              background: 'white',
              margin: { md: 0, xs: "auto" },
              borderRadius: "8px",
              justifyContent: "space-between",
              flexDirection: { md: "row", xs: "column" },
              minHeight: "50vh",
              maxHeight: "62vh",
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
                }}
              >
                <img
                  width={"100px"}
                  height={"110px"}
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
                <Typography variant="h6">Summary </Typography>
                <Typography>
                  Finish: {selectedContent?.hardwareFinishes?.name}
                </Typography>
                <Typography>
                  Handles: {selectedContent?.handles?.item?.name} (
                  {selectedContent?.handles?.count})
                </Typography>
                <Typography>
                  Hinges: {selectedContent?.hinges?.item?.name} (
                  {selectedContent?.hinges?.count})
                </Typography>
                {selectedContent?.mounting?.activeType === "channel" ? (
                  <Typography>
                    Channel: {selectedContent?.mounting?.channel?.item?.name}
                  </Typography>
                ) : (
                  <Typography>
                     Clamps: {selectedContent?.mounting?.clamps?.wallClamp?.item?.name} (
                  {selectedContent?.mounting?.clamps?.wallClamp?.count}){" "}
                    / {selectedContent?.mounting?.clamps?.sleeveOver?.item?.name} (
                  {selectedContent?.mounting?.clamps?.sleeveOver?.count}) /{" "}
                    {selectedContent?.mounting?.clamps?.glassToGlass?.item?.name} (
                  {selectedContent?.mounting?.clamps?.glassToGlass?.count})
                  </Typography>
                )}
                <Typography>
                  Glass Type:{selectedContent?.glassType?.item?.name} (
                  {selectedContent?.glassType?.thickness})
                </Typography>
                <Typography>
                  Bars: {selectedContent?.slidingDoorSystem?.item?.name} (
                  {selectedContent?.slidingDoorSystem?.count})
                </Typography>
                <Typography>Transom: </Typography>
                <Typography>
                  Header: {selectedContent?.header?.item?.name} (
                  {selectedContent?.header?.count})
                </Typography>
                <Typography>
                  Glass Treatment: {selectedContent?.glassTreatment?.item?.name}
                </Typography>
                <Typography variant="h6">Add ons: {selectedContent?.addOns?.map((item)=> ` ${item?.name}`)} Towel Bars ({selectedContent?.towelBarsCount}) Sleeve Over ({selectedContent?.sleeveOverCount})</Typography>
                <Typography>People: {selectedContent?.people}</Typography>
                <Typography>Hours: {selectedContent?.hours}</Typography>
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
                  <Typography>Price</Typography>
                  <Typography variant="h6">${totalPrice?.toFixed(2) || 0}</Typography>
                </Box>{" "}
              </Box>
            </Box>
          </Box>
     
      </Box>
    </>
  );
};
export default Summary;
