import { EstimateCategory } from "@/utilities/constants";
import { Box, Divider, Grid, Typography, Stack } from "@mui/material";
import React from "react";

const ShowerSummary = ({ data, quoteNumber }) => {
  return (
    <Box
      sx={{
        width: "100%",
        paddingBottom: { sm: 0, xs: "80px" },        
      }}
    >
      <Box
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #D0D5DD",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "16.41px",
              fontFamily: '"Roboto", sans-serif !important',
            }}
          >
            Quote {quoteNumber}
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "#D4DBDF" }} />
        <Box sx={{ backgroundColor: "#F3F5F6", px: 3, py: 2 }}>
          <Grid container>
            {/* {Columns[0].active && ( */}
            <Grid item md={4} className="text-xs-samibold">
              Dimensions
            </Grid>
            <Grid item md={4} className="text-xs-samibold">
              Summary
            </Grid>
            <Grid item md={4} className="text-xs-samibold">
              Pricing Subcategories
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ borderColor: "#D4DBDF" }} />
        <Box sx={{ px: 3, py: '15px' }}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Stack gap={2}>
                <Typography
                  className="text-xs-samibold"
                  sx={{ display: { sm: "none", xs: "block" } }}
                >
                  Dimensions
                </Typography>
                <Typography className="text-xs-ragular">
                  {data?.measurements}
                </Typography>
                <Box>
                  <Typography className="text-xs-ragular-bold">
                    Layout:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.layout}
                  </Typography>
                </Box>
                {data?.doorWidth ? (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Door Width:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.doorWidth}
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
                <Box>
                  <Typography className="text-xs-ragular-bold">
                    Square Foot:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.sqftArea}
                  </Typography>
                </Box>
                {/* {![undefined].includes(selectedData?.settings?.variant) && ( */}
                {/* <Box>
                    <Typography className="text-xs-ragular-bold">
                      Door Weight:
                    </Typography>
                    <Typography className="text-xs-ragular"> */}
                {/* {doorWeight} */}
                {/* </Typography>
                  </Box> */}
                {/* )} */}
                {/* {![
                  layoutVariants.DOOR,
                  layoutVariants.DOUBLEBARN,
                  layoutVariants.DOUBLEDOOR,
                ].includes(selectedData?.settings?.variant) && ( */}
                {/* <Box>
                    <Typography className="text-xs-ragular-bold">
                      Panel Weight:
                    </Typography>
                    <Typography className="text-xs-ragular"> */}
                {/* {panelWeight} */}
                {/* </Typography>
                  </Box> */}
                <Box sx={{ width: "60%" }}>
                  <Divider sx={{ borderColor: "#D4DBDF" }} />
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Typography className="text-xs-ragular-bold">
                      Total Price:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      ${data?.pricing?.totalPrice?.toFixed(2) || 0}
                    </Typography>
                  </Box>
                </Box>
                {/* )} */}
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack gap={2}>
                <Typography
                  className="text-xs-samibold"
                  sx={{ display: { sm: "none", xs: "block" } }}
                >
                  Summary
                </Typography>
                {data?.hardwareFinish && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Finish:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.hardwareFinish}
                    </Typography>
                  </Box>
                )}
                {data?.handle?.type && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Handles:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.handle?.type} ({data?.handle?.count})
                    </Typography>
                  </Box>
                )}
                {data?.hinge?.type && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Hinges:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.hinge?.type} ({data?.hinge?.count})
                    </Typography>
                  </Box>
                )}
                {data?.doorLock?.type && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Door Lock:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.doorLock?.type} ({data?.doorLock?.count})
                    </Typography>
                  </Box>
                )}

                {data?.mountingChannel !== "" && data?.mountingChannel !== null ? (
                  <>
                    {data?.mountingChannel && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Channel:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.mountingChannel}
                        </Typography>
                      </Box>
                    )}{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    {data?.mountingClamps?.wallClamp?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          WallClamps:{" "}
                        </Typography>
                        {data?.mountingClamps?.wallClamp?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.type} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.mountingClamps?.sleeveOver?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Sleeve Over:{" "}
                        </Typography>
                        {data?.mountingClamps?.sleeveOver?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.type} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.mountingClamps?.glassToGlass?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass To Glass:{" "}
                        </Typography>
                        {data?.mountingClamps?.glassToGlass?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.type} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}{" "}
                  </>
                )}
                {data?.cornerClamps?.wallClamp?.length ? (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Corner WallClamp:{" "}
                    </Typography>
                    {data?.cornerClamps?.wallClamp?.map((row) => (
                      <Typography className="text-xs-ragular">
                        {row.type} ({row.count}){" "}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  ""
                )}
                {data?.cornerClamps?.sleeveOver?.length ? (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Corner Sleeve Over:{" "}
                    </Typography>
                    {data?.cornerClamps?.sleeveOver?.map((row) => (
                      <Typography className="text-xs-ragular">
                        {row.type} ({row.count}){" "}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  ""
                )}
                {data?.cornerClamps?.glassToGlass?.length ? (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Corner Glass To Glass:{" "}
                    </Typography>
                    {data?.cornerClamps?.glassToGlass?.map((row) => (
                      <Typography className="text-xs-ragular">
                        {row.type} ({row.count}){" "}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  ""
                )}
                {data?.glassType?.type && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Glass Type:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.glassType?.type} ({data?.glassType?.thickness})
                    </Typography>
                  </Box>
                )}
                {data?.edgeWork?.type && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Edge Work:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.edgeWork?.type} ({data?.edgeWork?.thickness})
                    </Typography>
                  </Box>
                )}
                {data?.slidingDoorSystem?.type && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Sliding Door System:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.slidingDoorSystem?.type} (
                      {data?.slidingDoorSystem?.count})
                    </Typography>
                  </Box>
                )}
                {data?.transom && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Transom:{" "}
                    </Typography>
                    <Typography className="text-xs-ragular"></Typography>
                  </Box>
                )}
                {data?.header?.type && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Header:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.header?.type} ({data?.header?.count})
                    </Typography>
                  </Box>
                )}
                {data?.glassAddons?.length ? (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Glass Addons:
                    </Typography>
                    {data?.glassAddons?.map((item) => (
                      <Typography className="text-xs-ragular">{`${item} `}</Typography>
                    ))}
                  </Box>
                ) : (
                  ""
                )}
                {data?.hardwareAddons?.length > 0 && (
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      {data?.category === EstimateCategory?.MIRRORS
                        ? "Hardwares:"
                        : "Add ons:"}
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.hardwareAddons?.map(
                        (row) => ` ${row?.type} (${row?.count}),`
                      )}{" "}
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "baseline",
                    gap: 0.6,
                  }}
                >
                  <Typography className="text-xs-ragular-bold">
                    People:{" "}
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.people}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "baseline",
                    gap: 0.6,
                  }}
                >
                  <Typography className="text-xs-ragular-bold">
                    Hours:{" "}
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.hours}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack gap={2}>
                <Typography
                  className="text-xs-samibold"
                  sx={{ display: { sm: "none", xs: "block" } }}
                >
                  Pricing Subcategories
                </Typography>
                <Box>
                  <Typography className="text-xs-ragular-bold">
                    Hardware Price:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    ${data?.pricing?.hardwarePrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-xs-ragular-bold">
                    Glass Price:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    ${data?.pricing?.glassPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-xs-ragular-bold">
                    Glass Addons Price:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    ${data?.pricing?.glassAddonPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-xs-ragular-bold">
                    Fabrication Price:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    ${data?.pricing?.fabricationPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
                {/* <Box>
                  <Typography className="text-xs-ragular-bold">
                    Hardware Addons Price:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    ${data?.hardwareAddonsPrice?.toFixed(2) || 0}
                  </Typography>
                </Box> */}
                <Box>
                  <Typography className="text-xs-ragular-bold">
                    Labor Price:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    ${data?.pricing?.laborPrice?.toFixed(2) || 0}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ShowerSummary;
