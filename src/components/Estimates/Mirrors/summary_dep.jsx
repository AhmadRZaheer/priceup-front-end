import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import CustomImage from "@/Assets/customlayoutimage.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { renderMeasurementSides } from "@/utilities/mirrorEstimates";
import {
  getEstimateMeasurements,
  getModifiedProfitPercentage,
  getPricing,
  getSelectedContent,
  getSqftArea,
  setModifiedProfitPercentage,
} from "@/redux/mirrorsEstimateSlice";
import { getLocationMirrorSettings } from "@/redux/locationSlice";

const Summary = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const pricing = useSelector(getPricing);
  // const mirrorLocationSettings = useSelector(getLocationMirrorSettings);
  const disable_com = false;
  const modifiedProfitPercentage = useSelector(getModifiedProfitPercentage);
  const selectedContent = useSelector(getSelectedContent);
  const measurements = useSelector(getEstimateMeasurements);
  const sqftArea = useSelector(getSqftArea);
  const layoutImage = CustomImage;
  const handleSetUserProfit = (event) => {
    if (Number(event.target.value) < 100) {
      dispatch(setModifiedProfitPercentage(Number(event.target.value)));
    }
  };
  const resetUserProfit = () => {
    dispatch(setModifiedProfitPercentage(0));
  };
  return (
    <>
      <Box
        className={disable_com ? "box_disaled" : ""}
        sx={{
          width: "100%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          // p: { sm: 2, xs: 0 },
          gap: { sm: 4, xs: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            background: { sm: "white" },
            margin: { sm: 0, xs: "auto" },
            borderRadius: "8px",
            justifyContent: "space-between",
            flexDirection: { sm: "column", xs: "column" },
            overflow: { sm: "hidden" },
            // height: "fit-content",
            boxShadow:
              "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            border: { sm: "1px solid #EAECF0", xs: "none" },
          }}
        >
          <Box
            sx={{
              background: "#D9D9D9",
              paddingY: 2,
              px: 3,
              display: { sm: "block", xs: "none" },
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Summary
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              borderRadius: "8px",
              width: { sm: "96%" },
              paddingY: { sm: 2, xs: 1 },
              paddingX: { sm: 2, xs: 0 },
              marginBottom: "50px",
              overflow: { sm: "hidden" },
              color: { md: "#101828", xs: "white" },
              // border: { sm: "1px solid #EAECF0", xs: "none" },

              // boxShadow:
              // "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
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
                  display: { sm: "none", xs: "flex" },
                  width: "87%",
                  justifyContent: "center",
                  background: { md: "rgba(217, 217, 217, 0.3)", xs: "none" },
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
                      {renderMeasurementSides(measurements)}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Layout: </span>
                      Custom
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
                      {selectedContent?.glassAddons?.length ? (
                        <Box
                          sx={{
                            display: "flex",
                            textAlign: "baseline",
                            gap: 0.6,
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold" }}>
                            Glass Addons:
                          </Typography>
                          {selectedContent?.glassAddons?.map((item, index) => (
                            <Typography>
                              {item?.name}
                              {selectedContent?.glassAddons?.length - 1 !==
                                index
                                ? ", "
                                : ""}
                            </Typography>
                          ))}
                        </Box>
                      ) : (
                        ""
                      )}
                      {selectedContent?.hardwares?.length ? (
                        <Box
                          sx={{
                            display: "flex",
                            textAlign: "baseline",
                            gap: 0.6,
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold" }}>
                            Hardwares:
                          </Typography>
                          {selectedContent?.hardwares?.map((item, index) => (
                            <Typography>
                              {item?.name}
                              {selectedContent?.hardwares?.length - 1 !== index
                                ? ", "
                                : ""}
                            </Typography>
                          ))}
                        </Box>
                      ) : (
                        ""
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          People:{" "}
                        </Typography>
                        <Typography>{selectedContent?.people}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Hours:{" "}
                        </Typography>
                        <Typography>{selectedContent?.hours}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                        Additional Fields
                      </Typography>
                      {selectedContent.additionalFields?.map(
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
                              <Typography>
                                {item.cost}
                                {/* * {(mirrorLocationSettings.pricingFactorStatus
                              ? mirrorLocationSettings.pricingFactor
                              : 1)} */}
                              </Typography>
                            </Box>
                          )
                      )}
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
                            ${pricing.labor?.toFixed(2) || 0}
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
                            Additional Fields Price
                          </Typography>
                          <Typography variant="h6">
                            ${pricing.additionalFields?.toFixed(2) || 0}
                          </Typography>
                        </Box>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  {/** Gross Profit Accordian */}
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
                        Gross Profit Margin
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        padding: 0,
                        borderTop: "2px solid #D0D5DD",
                        paddingY: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Gross Total:
                        </Typography>
                        <Typography>
                          ${pricing.total?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Actual Cost:
                        </Typography>
                        <Typography>
                          ${pricing.cost?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Gross Profit:
                        </Typography>
                        <Typography>
                          {pricing.profitPercentage?.toFixed(2) || 0} %
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "0px",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Adjust Profit:
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
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
                              inputProps: { min: 0, max: 100 },
                            }}
                            InputLabelProps={{
                              style: {
                                color: "rgba(255, 255, 255, 0.5)",
                              },
                            }}
                            sx={{
                              color: { sm: "black", xs: "white" },
                              width: "100%",
                            }}
                            variant="outlined"
                            size="small"
                            value={
                              modifiedProfitPercentage > 0
                                ? modifiedProfitPercentage
                                : ""
                            }
                            onChange={(event) => handleSetUserProfit(event)}
                          />
                          %
                        </Box>
                        <Button
                          disabled={
                            modifiedProfitPercentage === 0 ||
                            modifiedProfitPercentage === ""
                          }
                          variant="contained"
                          onClick={resetUserProfit}
                          sx={{
                            backgroundColor: "#8477da",
                            "&:hover": {
                              backgroundColor: "#8477da",
                            },
                            ":disabled": {
                              bgcolor: "#c2c2c2",
                            },
                          }}
                        >
                          Reset
                        </Button>
                        {/* <Box sx={{ width: "100px" }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handleProfitPercentage}
                          sx={{
                            backgroundColor: "#8477da",
                            "&:hover": {
                              backgroundColor: "#8477da",
                            },
                          }}
                        >
                          {" "}
                          Submit
                        </Button>
                      </Box> */}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                {/* Buttons */}
                {isMobile ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: { sm: "96%" },
                      paddingX: 2,
                      py: 2,
                      // marginY: 3,
                      position: { sm: "", xs: "fixed" },
                      bottom: 0,
                      left: 0,
                      right: 0,
                      gap: 5,
                      background: "#08061B"
                    }}
                  >
                    <Box >
                      <Button
                        fullWidth
                        // onClick={setHandleEstimatesPages}
                        onClick={() => setStep(1)}
                        sx={{
                          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                          color: "#344054",
                          textTransform: "initial",
                          border: "1px solid #D0D5DD",
                          backgroundColor: { sm: "transparent", xs: "white" },
                        }}
                      >
                        {" "}
                        Back
                      </Button>
                    </Box>
                    <Box >
                      <Button
                        fullWidth
                        // disabled={selectedContent?.hardwareFinishes === null}
                        variant="contained"
                        onClick={() => {
                          // setSummaryState(false);
                          console.log('open modal');
                        }}
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
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Summary;
