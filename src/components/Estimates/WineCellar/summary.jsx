import {
  Box,
  Button,
  Divider,
  Grid,
  Popover,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { layoutVariants } from "@/utilities/constants";
import { renderMeasurementSides } from "@/utilities/estimates";
import GrayEyeIcon from "@/Assets/eye-gray-icon.svg";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { useMemo, useState } from "react";
import CustomToggle from "@/components/ui-components/Toggle";
import {
  getAdditionalFieldsTotal,
  getContent,
  getCost,
  getDoorWeight,
  getDoorWidth,
  getFabricationTotal,
  // getWineGlassAddonsTotal,
  getGlassTotal,  
  getHardwareTotal,
  getLaborTotal,
  getLayoutArea,
  getMeasurements,
  getPanelWeight,
  getProfit,
  // getWineQuoteState,
  getReturnWeight,
  getTotal,
  getUserProfitPercentage,
  selectedItem,
  setUserProfitPercentage,
} from "@/redux/wineCellarEstimateSlice";
import { getEstimateState } from "@/redux/estimateSlice";

const Summary = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const hardwarePrice = useSelector(getHardwareTotal);
  const glassPrice = useSelector(getGlassTotal);
  const fabricationPrice = useSelector(getFabricationTotal);
  const laborPrice = useSelector(getLaborTotal);
  const additionalFieldsPrice = useSelector(getAdditionalFieldsTotal);
  const userProfitPercentage = useSelector(getUserProfitPercentage);
  const doorWidth = useSelector(getDoorWidth);
  const doorWeight = useSelector(getDoorWeight);
  const panelWeight = useSelector(getPanelWeight);
  const returnWeight = useSelector(getReturnWeight);
  const totalPrice = useSelector(getTotal);
  const actualCost = useSelector(getCost);
  const grossProfit = useSelector(getProfit);
  const selectedContent = useSelector(getContent);
  const measurements = useSelector(getMeasurements);
  const selectedData = useSelector(selectedItem);
  const quoteState = useSelector(getEstimateState);
  const sqftArea = useSelector(getLayoutArea);
  const [anchorEl, setAnchorEl] = useState(null);
  const [Columns, setColumns] = useState([
    { title: "Dimensions", active: true },
    { title: "Summary", active: true },
    { title: "Total Price", active: true },
    { title: "Pricing Subcategories", active: true },
    { title: "Gross Profit Margin", active: true },
  ]);

  // Toggle handler function
  const handleToggle = (index) => {
    const updatedItems = [...Columns]; // Create a copy of the state array
    updatedItems[index].active = !updatedItems[index].active; // Toggle the 'active' property
    setColumns(updatedItems); // Update state with the modified array
  };

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const alertPopoverOpen = Boolean(anchorEl);
  const alertPopoverid = alertPopoverOpen ? "simple-popover" : undefined;
  const disable_com = useMemo(() => {
    let status = false;
    if (quoteState === "create") {
      status = !selectedData || !measurements?.length;
    } else if (quoteState === "custom") {
      let arraylength = Object.entries(measurements)?.length;
      status = arraylength > 0 ? false : true;
    }
    return status;
  }, [measurements]);

  const dispatch = useDispatch();
  const handleSetUserProfit = (event) => {
    if (Number(event.target.value) < 100) {
      dispatch(setUserProfitPercentage(Number(event.target.value)));
    }
  };
  const resetUserProfit = () => {
    dispatch(setUserProfitPercentage(0));
  };
  return (
    <>
      <Box
        className={disable_com ? "box_disaled" : ""}
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
              Estimate Details
            </Typography>
            <Box sx={{ width: "175px" }}>
              <Button
                size="small"
                startIcon={
                  <img
                    width={20}
                    height={20}
                    style={{ marginRight: 5 }}
                    src={GrayEyeIcon}
                    alt="eye icon"
                  />
                }
                endIcon={<KeyboardArrowDownOutlined />}
                variant="outlined"
                sx={{
                  padding: "5px 8px 5px 8px !important",
                  border: "1px solid #D0D5DD",
                  color: "black",
                  fontSize: "12px",
                  lineHeight: "14.06px",
                  borderRadius: "4px !important",
                  fontFamily: '"Roboto", sans-serif !important',
                  width: "fit-content",
                  ":hover": {
                    border: "1px solid #D0D5DD",
                  },
                }}
                aria-describedby={alertPopoverid}
                onClick={handleClickPopover}
              >
                View Columns
              </Button>
              <Popover
                id={alertPopoverid}
                open={alertPopoverOpen}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ borderRadius: "8px" }}
              >
                {" "}
                <Box
                  sx={{
                    p: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {Columns.map((item, index) => (
                    <Box>
                      <Box
                        sx={{
                          width: "256px",
                          height: "46px",
                          display: "flex",
                          justifyContent: "space-between",
                          px: 3,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#5D6164",
                            fontSize: "16px",
                            alignSelf: "center",
                            fontFamily: '"Roboto", sans-serif !important',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Box sx={{ height: "46px" }}>
                          <CustomToggle
                            text={""}
                            checked={item.active}
                            onChange={() => handleToggle(index)} // Pass index to identify which item to toggle
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>{" "}
              </Popover>
            </Box>
          </Box>
          <Divider sx={{ borderColor: "#D4DBDF" }} />
          <Box sx={{ backgroundColor: "#F3F5F6", px: 3, py: 2 }}>
            <Grid container>
              {Columns[0].active && (
                <Grid item md={3} className="text-xs-samibold">
                  Dimensions
                </Grid>
              )}
              {Columns[1].active && (
                <Grid item md={3} className="text-xs-samibold">
                  Summary
                </Grid>
              )}
              {Columns[3].active && (
                <Grid item md={3} className="text-xs-samibold">
                  Pricing Subcategories
                </Grid>
              )}
              {Columns[4].active && (
                <Grid item md={3} className="text-xs-samibold">
                  Gross Profit Margin
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider sx={{ borderColor: "#D4DBDF" }} />
          <Box sx={{ px: 3, py: 2 }}>
            {Columns[0].active === false &&
            Columns[1].active === false &&
            Columns[2].active === false &&
            Columns[3].active === false &&
            Columns[4].active === false ? (
              <Typography>No Estimate Detail</Typography>
            ) : (
              <Grid container spacing={2}>
                {Columns[0].active && (
                  <Grid item md={3}>
                    <Stack gap={2}>
                      <Typography
                        className="text-xs-samibold"
                        sx={{ display: { sm: "none", xs: "block" } }}
                      >
                        Dimensions
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {" "}
                        {renderMeasurementSides(
                          quoteState,
                          measurements,
                          quoteState === "edit"
                            ? selectedData?.config?.layout_id
                            : selectedData?._id
                        )}{" "}
                      </Typography>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Layout:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {(selectedData?.settings?.name ||
                            selectedData?.name) ??
                            "Custom"}
                        </Typography>
                      </Box>
                      {doorWidth && doorWidth > 0 ? (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Door Width:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {doorWidth}
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
                          {sqftArea}
                        </Typography>
                      </Box>
                      {![undefined].includes(
                        selectedData?.settings?.variant
                      ) && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Door Weight:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {doorWeight}
                          </Typography>
                        </Box>
                      )}
                      {![
                        layoutVariants.DOOR,
                        layoutVariants.DOUBLEBARN,
                        layoutVariants.DOUBLEDOOR,
                      ].includes(selectedData?.settings?.variant) && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Panel Weight:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {panelWeight}
                          </Typography>
                        </Box>
                      )}
                      {[
                        layoutVariants.DOORNOTCHEDPANELANDRETURN,
                        layoutVariants.DOORPANELANDRETURN,
                      ].includes(selectedData?.settings?.variant) && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Return Weight:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {returnWeight}
                          </Typography>
                        </Box>
                      )}
                      {Columns[2].active && (
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
                              ${totalPrice?.toFixed(2) || 0}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </Grid>
                )}
                {Columns[1].active && (
                  <Grid item md={3}>
                    <Stack gap={2}>
                      <Typography
                        className="text-xs-samibold"
                        sx={{ display: { sm: "none", xs: "block" } }}
                      >
                        Summary
                      </Typography>
                      {selectedContent?.hardwareFinishes && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Finish:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.hardwareFinishes?.name}
                          </Typography>
                        </Box>
                      )}
                      {selectedContent?.handles?.item && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Handles:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.handles?.item?.name} (
                            {selectedContent?.handles?.count})
                          </Typography>
                        </Box>
                      )}
                      {selectedContent?.hinges?.item && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Hinges:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.hinges?.item?.name} (
                            {selectedContent?.hinges?.count})
                          </Typography>
                        </Box>
                      )}
                      {selectedContent?.doorLock?.item && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Door Lock:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.doorLock?.item?.name} (
                            {selectedContent?.doorLock?.count})
                          </Typography>
                        </Box>
                      )}
                      {["channel"].includes(selectedContent?.mountingState) ? (
                        <>
                          {selectedContent?.mountingChannel?.item && (
                            <Box>
                              <Typography className="text-xs-ragular-bold">
                                Channel:
                              </Typography>
                              <Typography className="text-xs-ragular">
                                {selectedContent?.mountingChannel?.item?.name}
                              </Typography>
                            </Box>
                          )}{" "}
                        </>
                      ) : (
                        <>
                          {/* {" "}
                          {selectedContent?.mountingClamps?.wallClamp
                            ?.length ? (
                            <Box>
                              <Typography className="text-xs-ragular-bold">
                                WallClamps:{" "}
                              </Typography>
                              {selectedContent?.mountingClamps?.wallClamp?.map(
                                (row) => (
                                  <Typography className="text-xs-ragular">
                                    {row.item.name} ({row.count}){" "}
                                  </Typography>
                                )
                              )}
                            </Box>
                          ) : (
                            ""
                          )}
                          {selectedContent?.mountingClamps?.sleeveOver
                            ?.length ? (
                            <Box>
                              <Typography className="text-xs-ragular-bold">
                                Sleeve Over:{" "}
                              </Typography>
                              {selectedContent?.mountingClamps?.sleeveOver?.map(
                                (row) => (
                                  <Typography className="text-xs-ragular">
                                    {row.item.name} ({row.count}){" "}
                                  </Typography>
                                )
                              )}
                            </Box>
                          ) : (
                            ""
                          )} */}
                          {/* {selectedContent?.mountingClamps?.glassToGlass
                            ?.length ? (
                            <Box>
                              <Typography className="text-xs-ragular-bold">
                                Glass To Glass:{" "}
                              </Typography>
                              {selectedContent?.mountingClamps?.glassToGlass?.map(
                                (row) => (
                                  <Typography className="text-xs-ragular">
                                    {row.item.name} ({row.count}){" "}
                                  </Typography>
                                )
                              )}
                            </Box>
                          ) : (
                            ""
                          )}{" "} */}
                        </>
                      )}
                      {/* {selectedContent?.cornerClamps?.cornerWallClamp
                        ?.length ? (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Corner WallClamp:{" "}
                          </Typography>
                          {selectedContent?.cornerClamps?.cornerWallClamp?.map(
                            (row) => (
                              <Typography className="text-xs-ragular">
                                {row.item.name} ({row.count}){" "}
                              </Typography>
                            )
                          )}
                        </Box>
                      ) : (
                        ""
                      )} */}
                      {/* {selectedContent?.cornerClamps?.cornerSleeveOver
                        ?.length ? (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Corner Sleeve Over:{" "}
                          </Typography>
                          {selectedContent?.cornerClamps?.cornerSleeveOver?.map(
                            (row) => (
                              <Typography className="text-xs-ragular">
                                {row.item.name} ({row.count}){" "}
                              </Typography>
                            )
                          )}
                        </Box>
                      ) : (
                        ""
                      )} */}
                      {/* {selectedContent?.cornerClamps?.cornerGlassToGlass
                        ?.length ? (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Corner Glass To Glass:{" "}
                          </Typography>
                          {selectedContent?.cornerClamps?.cornerGlassToGlass?.map(
                            (row) => (
                              <Typography className="text-xs-ragular">
                                {row.item.name} ({row.count}){" "}
                              </Typography>
                            )
                          )}
                        </Box>
                      ) : (
                        ""
                      )} */}
                      {selectedContent?.glassType?.item && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Glass Type:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.glassType?.item?.name} (
                            {selectedContent?.glassType?.thickness})
                          </Typography>
                        </Box>
                      )}
                      {/* {selectedContent?.slidingDoorSystem?.item && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Sliding Door System:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.slidingDoorSystem?.item?.name} (
                            {selectedContent?.slidingDoorSystem?.count})
                          </Typography>
                        </Box>
                      )} */}
                      {selectedContent?.transom && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Transom:{" "}
                          </Typography>
                          <Typography className="text-xs-ragular"></Typography>
                        </Box>
                      )}
                      {/* {selectedContent?.header?.item && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Header:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.header?.item?.name} (
                            {selectedContent?.header?.count})
                          </Typography>
                        </Box>
                      )} */}
                      {/* {selectedContent?.glassAddons?.length ? (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Glass Addons:
                          </Typography>
                          {selectedContent?.glassAddons?.map((item) => (
                            <Typography className="text-xs-ragular">{`${item?.name} `}</Typography>
                          ))}
                        </Box>
                      ) : (
                        ""
                      )} */}
                      {/* {selectedContent?.hardwareAddons?.length > 0 && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Add ons:{" "}
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.hardwareAddons?.map(
                              (row) => ` ${row?.item?.name} (${row?.count})`
                            )}{" "}
                          </Typography>
                        </Box>
                      )} */}
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
                          {selectedContent?.people}
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
                          {selectedContent?.hours}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold" mb={1}>
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
                                <Typography className="text-xs-ragular-bold">
                                  {item.label || "---"}:{" "}
                                </Typography>
                                <Typography className="text-xs-ragular">
                                  {item.cost}
                                </Typography>
                              </Box>
                            )
                        )}
                      </Box>
                    </Stack>
                  </Grid>
                )}
                {Columns[3].active && (
                  <Grid item md={3}>
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
                          ${hardwarePrice?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${glassPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      {/* <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Addons Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${glassAddonsPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box> */}
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Fabrication Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${fabricationPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      {/* <Box>
                        <Typography className="text-xs-ragular-bold">
                          Hardware Addons Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${hardwareAddonsPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box> */}
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Labor Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${laborPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Additional Fields Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${additionalFieldsPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                )}
                {Columns[4].active && (
                  <Grid item md={3}>
                    <Stack gap={2}>
                      <Typography
                        className="text-xs-samibold"
                        sx={{ display: { sm: "none", xs: "block" } }}
                      >
                        Gross Profit Margin
                      </Typography>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Gross Total:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${totalPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Actual Cost:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${actualCost?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Gross Profit:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {grossProfit?.toFixed(2) || 0} %
                        </Typography>
                      </Box>

                      <Typography className="text-xs-samibold">
                        Adjust Profit:
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          width: "93px",
                          padddingY: 4,
                        }}
                      >
                        <TextField
                          className="custom-textfield-purple"
                          sx={{
                            "& input": {
                              p: "10px 0px 10px 10px !important",
                            },
                          }}
                          type="number"
                          InputProps={{
                            style: {
                              color: "black",
                              paddingRight: "10px !important",
                            },
                            inputProps: { min: 0, max: 100 },
                            endAdornment: <> %</>,
                          }}
                          variant="outlined"
                          size="small"
                          value={
                            userProfitPercentage > 0 ? userProfitPercentage : ""
                          }
                          onChange={(event) => handleSetUserProfit(event)}
                        />
                      </Box>
                      <Button
                        disabled={
                          userProfitPercentage === 0 ||
                          userProfitPercentage === ""
                        }
                        variant="contained"
                        onClick={resetUserProfit}
                        sx={{
                          width: "77px",
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
                    </Stack>
                  </Grid>
                )}
              </Grid>
            )}
          </Box>
        </Box>
        {isMobile ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: { sm: "96%" },
              paddingX: 2,
              py: 2,
              position: { sm: "", xs: "fixed" },
              bottom: 0,
              left: 0,
              right: 0,
              gap: 5,
              background: "#08061B",
            }}
          >
            <Box>
              <Button
                fullWidth
                onClick={() => setStep(1)}
                sx={{
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  color: "#344054",
                  textTransform: "initial",
                  border: "1px solid #D0D5DD",
                  backgroundColor: { sm: "transparent", xs: "white" },
                }}
              >
                Back
              </Button>
            </Box>
            <Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  console.log("open modal");
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
        ) : (
          ""
        )}
      </Box>
    </>
  );
};
export default Summary;