import { Box, Button, Typography } from "@mui/material";
import { ChevronLeftOutlined } from "@mui/icons-material";
import {
  getContent,
  getMeasumentSide,
  getTotal,
  selectedItem,
  setNavigation,
} from "../../redux/estimateCalculations";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";

const Summary = () => {
  const dispatch = useDispatch();
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
              paddingY: { md: 4, xs: 1 },
              paddingX: { md: 2, xs: 0 },
              background: 'white',
              margin: { md: 0, xs: "auto" },
              borderRadius: "8px",
              justifyContent: "space-between",
              flexDirection: { md: "row", xs: "column" },
              minHeight: "50vh",
              maxHeight: "62vh",
              // height: "60vh",
              // overflow: "auto"
            }}
          >
            {/* rightSide */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                // p: { md: 3, xs: 0 },
                // margin: 'auto',
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
                  // borderBottom: "1px solid #2c2c3c",
                  // height: "250px",
                }}
              >
                <img
                  width={"100px"}
                  height={"110px"}
                  // src={door}
                  src={`${backendURL}/${selectedData?.image}`}
                  alt="Selected"
                />
              </Box>
              <Box
                sx={{
                  width: "100%",

                  paddingTop: 2,
                  margin: "auto",
                  // height: "250px",
                }}
              >
                {/* <Typography>12’’/ 12’’/ 12’’ </Typography> */}
                {/* {measurements?.map((measurement, index) => (
                  <p key={index}>{measurement.value}</p>
                ))} */}
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
                    Channel: {selectedContent?.mounting?.channel?.type?.name}
                  </Typography>
                ) : (
                  <Typography>
                    Clamps: {selectedContent?.mounting?.clamps?.wallClamp?.name}{" "}
                    / {selectedContent?.mounting?.clamps?.sleeveOver?.name} /{" "}
                    {selectedContent?.mounting?.clamps?.glassToGlass?.name}
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
                  Glass Treatment: {selectedContent?.glassTreatment?.name}
                </Typography>
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
          </Box>
     
      </Box>
    </>
  );
};
export default Summary;
