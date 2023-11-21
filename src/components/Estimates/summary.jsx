import { Box, Typography } from "@mui/material";
import {
  getContent,
  getFabricationTotal,
  getGlassAddonsTotal,
  getGlassTotal,
  getHardwareTotal,
  getLaborTotal,
  getMeasurementSide,
  getMiscTotal,
  getTotal,
  getCost,
  getProfit,
  selectedItem,
  getDoorWidth,
  getQuoteState,
  getLayoutArea,
} from "../../redux/estimateCalculations";
import { useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";
import CustomImage from "../../Assets/customlayoutimage.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Summary = () => {
  const hardwarePrice = useSelector(getHardwareTotal);
  const glassPrice = useSelector(getGlassTotal);
  const glassAddonsPrice = useSelector(getGlassAddonsTotal);
  const fabricationPrice = useSelector(getFabricationTotal);
  const miscPrice = useSelector(getMiscTotal);
  const laborPrice = useSelector(getLaborTotal);
  const doorWidth = useSelector(getDoorWidth);
  const totalPrice = useSelector(getTotal);
  const actualCost = useSelector(getCost);
  const grossProfit = useSelector(getProfit);

  const selectedContent = useSelector(getContent);
  const measurements = useSelector(getMeasurementSide);
  const selectedData = useSelector(selectedItem);
  const quoteState = useSelector(getQuoteState);
  const sqftArea = useSelector(getLayoutArea);
  const layoutImage =
    quoteState === "create"
      ? `${backendURL}/${selectedData?.image}`
      : quoteState === "edit" && selectedData?.layoutData?.image
      ? `${backendURL}/${selectedData?.layoutData?.image}`
      : CustomImage;
  // const layoutImage = selectedData?.image ? `${backendURL}/${selectedData?.image}` : CustomImage;
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
                    {measurements
                      .filter(
                        (measurement) =>
                          measurement.value !== null && measurement.value !== ""
                      )
                      .map((measurement) => measurement.value)
                      .join("’’/ ")}
                  </Typography>
                  {doorWidth ? (
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Door Width: </span>
                      {doorWidth}
                    </Typography>
                  ) : (
                    ""
                  )}
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
                  ${totalPrice?.toFixed(2) || 0}
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
                    ></Box>{" "}
                    {selectedContent?.hardwareFinishes && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Finish:
                        </Typography>
                        <Typography>
                          {selectedContent?.hardwareFinishes?.name}
                        </Typography>
                      </Box>
                    )}
                    {selectedContent?.handles?.item && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
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
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Hinges:
                        </Typography>
                        <Typography>
                          {selectedContent?.hinges?.item?.name} (
                          {selectedContent?.hinges?.count})
                        </Typography>
                      </Box>
                    )}
                    {["channel"].includes(selectedContent?.mountingState) ? (
                      <>
                        {selectedContent?.mountingChannel?.item && (
                          <Box
                            sx={{
                              display: "flex",
                              textAlign: "baseline",
                              gap: 0.6,
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              Channel:
                            </Typography>
                            <Typography>
                              {selectedContent?.mountingChannel?.item?.name}
                            </Typography>
                          </Box>
                        )}{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        {selectedContent?.mountingClamps?.wallClamp?.length ? (
                          <Box
                            sx={{
                              display: "flex",
                              textAlign: "baseline",
                              gap: 0.6,
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              WallClamps:{" "}
                            </Typography>
                            {selectedContent?.mountingClamps?.wallClamp?.map(
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
                        {selectedContent?.mountingClamps?.sleeveOver?.length ? (
                          <Box
                            sx={{
                              display: "flex",
                              textAlign: "baseline",
                              gap: 0.6,
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              Sleeve Over:{" "}
                            </Typography>
                            {selectedContent?.mountingClamps?.sleeveOver?.map(
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
                        {selectedContent?.mountingClamps?.glassToGlass
                          ?.length ? (
                          <Box
                            sx={{
                              display: "flex",
                              textAlign: "baseline",
                              gap: 0.6,
                            }}
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
                        )}{" "}
                      </>
                    )}
                    {selectedContent?.cornerClamps?.cornerWallClamp?.length ? (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Corner WallClamp:{" "}
                        </Typography>
                        {selectedContent?.cornerClamps?.cornerWallClamp?.map(
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
                    {selectedContent?.cornerClamps?.cornerSleeveOver?.length ? (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Corner Sleeve Over:{" "}
                        </Typography>
                        {selectedContent?.cornerClamps?.cornerSleeveOver?.map(
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
                    {selectedContent?.cornerClamps?.cornerGlassToGlass
                      ?.length ? (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Corner Glass To Glass:{" "}
                        </Typography>
                        {selectedContent?.cornerClamps?.cornerGlassToGlass?.map(
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
                    {selectedContent?.slidingDoorSystem?.item && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
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
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Transom:{" "}
                        </Typography>
                        <Typography></Typography>
                      </Box>
                    )}
                    {selectedContent?.header?.item && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Header:
                        </Typography>
                        <Typography>
                          {selectedContent?.header?.item?.name} (
                          {selectedContent?.header?.count})
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
                        {selectedContent?.glassAddons?.map((item) => (
                          <Typography>{`${item?.name} `}</Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {selectedContent?.hardwareAddons?.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
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
                      <Typography>${totalPrice?.toFixed(2) || 0}</Typography>
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
                      <Typography>${actualCost?.toFixed(2) || 0}</Typography>
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
                      <Typography>${grossProfit?.toFixed(2) || 0}</Typography>
                    </Box>
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
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Summary;
