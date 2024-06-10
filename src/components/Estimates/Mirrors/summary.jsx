import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import CustomImage from "@/Assets/customlayoutimage.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { renderMeasurementSides } from "@/utilities/mirrorEstimates";
import { getEstimateMeasurements, getPricing, getSelectedContent, getSqftArea } from "@/redux/mirrorsEstimateSlice";

const Summary = () => {
  const pricing = useSelector(getPricing);
  // const additionalFieldsPrice = useSelector(getAdditionalFieldsTotal);
  // const userProfitPercentage = useSelector(getUserProfitPercentage);
  const selectedContent = useSelector(getSelectedContent);
  const measurements = useSelector(getEstimateMeasurements);
  const sqftArea = useSelector(getSqftArea);
  const layoutImage = CustomImage;

  return (
    <>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: { sm: 2, xs: 0 },
          gap: { sm: 4, xs: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            paddingY: { sm: 4, xs: 1 },
            paddingX: { sm: 2, xs: 0 },
            background: { sm: "white" },
            margin: { sm: 0, xs: "auto" },
            borderRadius: "8px",
            justifyContent: "space-between",
            flexDirection: { sm: "row", xs: "column" },
            // minHeight: "50vh",
            // maxHeight: "79vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              borderRadius: "8px",
              color: { md: "#101828", xs: "white" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "87%",
                justifyContent: "center",
                background: "rgba(217, 217, 217, 0.3)",
                margin: { sm: 0, xs: "auto" },
                p: 3,
                borderRadius: 2,
              }}
            >
              <img
                width={"300px"}
                height={"310px"}
                src={layoutImage}
                alt="Selected"
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                color: { xs: "white", sm: "black" },
                paddingTop: 2,
                margin: "auto",
              }}
            >
              {/** Dimensions Accordian */}
              <Accordion
                sx={{
                  paddingX: "6px",
                  border: "none",
                  boxShadow: "none !important",
                  ".MuiPaper-elevation": {
                    border: " none !important",
                    boxShadow: "none !important",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    padding: 0,
                    margin: 0,
                    borderBottom: "none",
                    height: "30px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                    Dimensions
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: 0,
                    borderTop: "2px solid #D0D5DD",
                    paddingY: 1,
                  }}
                >
                  <Typography>
                    {renderMeasurementSides(
                      measurements
                    )}
                  </Typography>

                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Square Foot: </span>{" "}
                    {sqftArea}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "2px solid #D0D5DD",
                  paddingY: 1,
                  paddingX: "6px",
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                  Total Price
                </Typography>
                <Typography variant="h6">
                  ${pricing.total?.toFixed(2) || 0}
                </Typography>
              </Box>{" "}
              {/* Summary  */}
              <Box sx={{ borderTop: "2px solid #D0D5DD" }}>
                {/** Selected Content Accordian */}
                <Accordion
                  sx={{
                    paddingX: "6px",
                    border: "none",
                    boxShadow: "none !important",
                    ".MuiPaper-elevation": {
                      border: " none !important",
                      boxShadow: "none !important",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      padding: 0,
                      margin: 0,
                      borderBottom: "none",
                      height: "30px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                      Summary{" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "2px solid #D0D5DD",
                        paddingY: 1,
                      }}
                    ></Box>

                    {selectedContent?.glassType?.item && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
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
                    {selectedContent?.edgeWork?.item && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Edge Work:
                        </Typography>
                        <Typography>
                          {selectedContent?.edgeWork?.item?.name} (
                          {selectedContent?.edgeWork?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {selectedContent?.floatingSize && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Floating Size:
                        </Typography>
                        <Typography>
                          {selectedContent?.floatingSize?.name}
                        </Typography>
                      </Box>
                    )}

                    <Box
                      sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        People:{" "}
                      </Typography>
                      <Typography>{selectedContent?.people}</Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", textAlign: "baseline", gap: 0.6 }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Hours:{" "}
                      </Typography>
                      <Typography>{selectedContent?.hours}</Typography>
                    </Box>
                    {/* <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                      Additional Fields
                    </Typography>
                    {selectedContent.additionalFields.map(
                      (item) =>
                        item.label !== "" && (
                          <Box
                            key={item.label}
                            sx={{
                              display: "flex",
                              textAlign: "baseline",
                              gap: 0.6,
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              {item.label || "---"}:{" "}
                            </Typography>
                            <Typography>{item.cost} * {(listData?.miscPricing?.pricingFactorStatus
                              ? listData?.miscPricing?.pricingFactor
                              : 1)}</Typography>
                          </Box>
                        )
                    )} */}
                  </AccordionDetails>
                </Accordion>

                {/* Price category Accordian */}
                <Accordion
                  sx={{
                    paddingX: "6px",
                    border: "none",
                    boxShadow: "none !important",
                    ".MuiPaper-elevation": {
                      border: " none !important",
                      boxShadow: "none !important",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{
                      padding: 0,
                      margin: 0,
                      height: "30px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                      Pricing Sub Categories{" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "2px solid #D0D5DD",
                          paddingY: 1,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Glass Price
                        </Typography>
                        <Typography variant="h6">
                          ${pricing.glass?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "2px solid #D0D5DD",
                          paddingY: 1,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Fabrication Price
                        </Typography>
                        <Typography variant="h6">
                          ${pricing.fabrication?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "2px solid #D0D5DD",
                          paddingY: 1,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Labor Price
                        </Typography>
                        <Typography variant="h6">
                          ${pricing.people?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "2px solid #D0D5DD",

                          paddingY: 1,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Misc Price
                        </Typography>
                        <Typography variant="h6">
                          ${pricing.misc?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      {/* <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "2px solid #D0D5DD",

                          paddingY: 1,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Additional Fields Price
                        </Typography>
                        <Typography variant="h6">
                          ${additionalFieldsPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box> */}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                {/** Gross Profit Accordian */}

              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Summary;
