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
import CustomImage from "@/Assets/customlayoutimage.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  calculateTotal,
  renderMeasurementSides,
} from "@/utilities/mirrorEstimates";
import GrayEyeIcon from "@/Assets/eye-gray-icon.svg";
import {
  getEstimateDiscountTotal,
  getEstimateDiscountUnit,
  getEstimateDiscountValue,
  getEstimateMeasurements,
  getModifiedProfitPercentage,
  getPricing,
  getSelectedContent,
  getSelectedItem,
  getSqftArea,
  setEstimateDiscountUnit,
  setEstimateDiscountValue,
  setModifiedProfitPercentage,
  setSelectedContent,
} from "@/redux/mirrorsEstimateSlice";
import {
  getLocationMirrorSettings,
  getLocationPdfSettings,
} from "@/redux/locationSlice";
import CustomToggle from "@/components/ui-components/Toggle";
import {
  ChangeCircleOutlined,
  KeyboardArrowDownOutlined,
  RestartAlt,
} from "@mui/icons-material";
import { useState } from "react";
import PDFPreviewDrawer from "@/pages/PDFPreview/PDFDrawer";
import { generateObjForMirrorPDFRuntime } from "@/utilities/estimates";
import {
  getCustomerDetail,
  getEstimateCategory,
  getEstimateState,
  getProjectId,
} from "@/redux/estimateSlice";
import { hardwareTypes, quoteState } from "@/utilities/constants";
import { useSearchParams } from "react-router-dom";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getGlassTypeDetailsByThickness } from "@/utilities/common";

const Summary = ({ setStep }) => {
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const pricing = useSelector(getPricing);
  // const mirrorLocationSettings = useSelector(getLocationMirrorSettings);
  const modifiedProfitPercentage = useSelector(getModifiedProfitPercentage);
  const estimateDiscount = useSelector(getEstimateDiscountValue);
  const estimateDiscountTotal = useSelector(getEstimateDiscountTotal);
  const estimateDiscountUnit = useSelector(getEstimateDiscountUnit);
  const selectedContent = useSelector(getSelectedContent);
  const measurements = useSelector(getEstimateMeasurements);
  const sqftArea = useSelector(getSqftArea);
  const selectedData = useSelector(getSelectedItem);
  const layoutImage = CustomImage;
  const [anchorEl, setAnchorEl] = useState(null);
  // const estimateState = useSelector(getEstimateState);
  const estimateState = searchParams.get("estimateState");
  // const projectId = useSelector(getProjectId);
  const projectId = searchParams.get("projectId");
  // const selectedCategory = useSelector(getEstimateCategory);
  const selectedCategory = searchParams.get("category");
  const mirrorsLocationSettings = useSelector(getLocationMirrorSettings);
  const customerData = useSelector(getCustomerDetail);
  const pdfSettings = useSelector(getLocationPdfSettings);
  const MirrorsHardware = useSelector(getMirrorsHardware);
  const [Columns, setColumns] = useState([
    { title: "Dimensions", active: true },
    { title: "Summary", active: true },
    { title: "Total Price", active: true },
    { title: "Pricing Subcategories", active: true },
    { title: "Gross Profit Margin", active: true },
  ]);
  const mirrorEstimateState = useSelector((state) => state.mirrorsEstimate);
  const disable_com = Object.entries(measurements)?.length > 0 ? false : true;

  // const getGlassTypeDetailsByThickness = (
  //   selectedIds,
  //   originalArray,
  //   selectedThickness
  // ) => {
  //   return originalArray
  //     ?.filter((glass) => selectedIds?.includes(glass._id))
  //     .map((glass) => {
  //       // Find the option with the matching thickness
  //       const matchingOption = glass.options.find(
  //         (option) => option.thickness === selectedThickness
  //       );
  //       return {
  //         name: glass.name,
  //         price: matchingOption ? sqftArea*matchingOption.cost : "N/A", // Show cost or 'N/A' if not available
  //         thickness: matchingOption ? matchingOption.thickness : "N/A", // Show thickness or 'N/A' if not available
  //       };
  //     });
  // };

  const drawerHandleClick = () => {
    const item = generateObjForMirrorPDFRuntime(
      {
        estimateState,
        projectId,
        selectedCategory: selectedData?.category ?? selectedCategory,
        customerData,
      },
      mirrorEstimateState,
      mirrorsLocationSettings
    );
    const pricingMirror = calculateTotal(
      item,
      item?.sqftArea,
      mirrorsLocationSettings,
      item.measurements
    );

    const pricing = {
      glassPrice: pricingMirror.glass,
      fabricationPrice: pricingMirror.fabrication,
      laborPrice: pricingMirror.labor,
      additionalFieldPrice: pricingMirror.additionalFields,
      cost: pricingMirror.cost,
      total: pricingMirror.total,
      profit: pricingMirror.profitPercentage,
    };
    const measurementString = renderMeasurementSides(item?.measurements);
    // const id = item?._id;
    const id = estimateState === quoteState.CREATE ? "--" : selectedData._id;
    localStorage.setItem(
      "pdf-estimate",
      JSON.stringify({
        ...item,
        measurements: measurementString,
        pricing,
        id,
        pdfSettings,
      })
    );
  };

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
  const handleSetUserProfit = (event) => {
    if (Number(event.target.value) < 100) {
      dispatch(setModifiedProfitPercentage(Number(event.target.value)));
    }
  };
  const resetUserProfit = () => {
    dispatch(setModifiedProfitPercentage(0));
  };

  const handleSetDiscount = (event) => {
    if (
      Number(event.target.value) <
      (estimateDiscountUnit === "%" ? 100 : pricing.total)
    ) {
      dispatch(setEstimateDiscountValue(Number(event.target.value)));
    }
  };
  const handleUnitChange = () => {
    const data = estimateDiscountUnit === "%" ? "$" : "%";
    dispatch(setEstimateDiscountUnit(data));
    dispatch(setEstimateDiscountValue(0));
  };
  const resetDiscount = () => {
    dispatch(setEstimateDiscountValue(0));
  };

  const glassDetails = getGlassTypeDetailsByThickness(
    mirrorsLocationSettings?.glassTypesForComparison,
    MirrorsHardware.glassTypes,
    selectedContent?.glassType?.thickness,
    selectedContent?.glassType?.item?._id
  );

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
              sx={{ fontSize: "14px", fontWeight: 700, lineHeight: "16px" }}
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
                    <Box
                      sx={{
                        width: "256px",
                        height: "46px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 3,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#5D6164",
                          fontSize: "16px",
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
              <Typography>no Esimate Details</Typography>
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
                        {renderMeasurementSides(measurements)}
                      </Typography>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Layout:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          Mirror
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Square Foot:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {sqftArea}
                        </Typography>
                      </Box>
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
                            <Typography
                              className="text-xs-ragular"
                              sx={{
                                textDecoration:
                                  estimateDiscountTotal !== pricing.total
                                    ? "line-through"
                                    : "auto",
                              }}
                            >
                              ${pricing.total?.toFixed(2) || 0}
                            </Typography>
                            {estimateDiscountTotal !== pricing.total && (
                              <Typography className="text-xs-ragular">
                                ${estimateDiscountTotal?.toFixed(2) || 0}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </Grid>
                )}
                {Columns[1].active && (
                  <Grid item md={3}>
                    {" "}
                    <Stack gap={2}>
                      <Typography
                        className="text-xs-samibold"
                        sx={{ display: { sm: "none", xs: "block" } }}
                      >
                        Summary
                      </Typography>{" "}
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
                      {selectedContent?.edgeWork?.item && (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Edge Work:
                          </Typography>
                          <Typography className="text-xs-ragular">
                            {selectedContent?.edgeWork?.item?.name} (
                            {selectedContent?.edgeWork?.thickness})
                          </Typography>
                        </Box>
                      )}
                      {selectedContent?.glassAddons?.length ? (
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Glass Addons:
                          </Typography>
                          {selectedContent?.glassAddons?.map((item, index) => (
                            <Typography className="text-xs-ragular">
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
                        <Box>
                          <Typography className="text-xs-ragular-bold">
                            Hardwares:
                          </Typography>
                          {selectedContent?.hardwares?.map((row, index) => (
                            <Typography className="text-xs-ragular">
                              {row?.item?.name}
                              {" (" + row?.count + ")"}
                              {selectedContent?.hardwares?.length - 1 !== index
                                ? ", "
                                : ""}
                            </Typography>
                          ))}
                        </Box>
                      ) : (
                        ""
                      )}
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          People:{" "}
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {selectedContent?.people}
                        </Typography>
                      </Box>
                      <Box>
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
                                <Typography className="text-xs-ragular-bold">
                                  {item.label || "---"}:{" "}
                                </Typography>
                                <Typography className="text-xs-ragular">
                                  {item.cost}
                                  {/* * {(mirrorLocationSettings.pricingFactorStatus
                              ? mirrorLocationSettings.pricingFactor
                              : 1)} */}
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
                          Glass Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {" "}
                          ${pricing.glass?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Fabrication Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${pricing.fabrication?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Labor Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${pricing.labor?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Misc Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${pricing.misc?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Additional Fields Price:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${pricing.additionalFields?.toFixed(2) || 0}
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
                        <Typography
                          className="text-xs-ragular"
                          sx={{
                            textDecoration:
                              estimateDiscountTotal !== pricing.total
                                ? "line-through"
                                : "auto",
                          }}
                        >
                          ${pricing.total?.toFixed(2) || 0}
                        </Typography>{" "}
                        {estimateDiscountTotal !== pricing.total && (
                          <Typography className="text-xs-ragular">
                            ${estimateDiscountTotal?.toFixed(2) || 0}
                          </Typography>
                        )}
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Actual Cost:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          ${pricing.cost?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Gross Profit:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {pricing.profitPercentage?.toFixed(2) || 0} %
                        </Typography>
                      </Box>

                      <Typography className="text-xs-ragular-bold">
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
                          type="number"
                          className="custom-textfield-purple"
                          InputProps={{
                            style: {
                              paddingRight: "10px",
                            },
                            inputProps: { min: 0, max: 100 },
                            endAdornment: <> %</>,
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                            "& input": {
                              p: "10px 0px 10px 10px !important",
                            },
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
                      </Box>
                      <Button
                        disabled={
                          modifiedProfitPercentage === 0 ||
                          modifiedProfitPercentage === ""
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
                      <Typography className="text-xs-samibold">
                        Discount:
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          {" "}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              width: "100%",
                              padddingY: 4,
                            }}
                          >
                            <TextField
                              fullWidth
                              className="custom-textfield-purple"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "0px !important",
                                },
                                "& input": {
                                  padding: "10px 0px 10px 10px !important",
                                },
                              }}
                              type="number"
                              InputProps={{
                                style: {
                                  color: "black",
                                  paddingRight: "10px !important",
                                  borderRadius: "0px !important",
                                },
                                inputProps: {
                                  min: 0,
                                  max:
                                    estimateDiscountUnit === "%" ? 100 : 999999,
                                },
                                endAdornment: estimateDiscountUnit === "%" && (
                                  <> %</>
                                ),
                                startAdornment: estimateDiscountUnit !==
                                  "%" && <>$</>,
                              }}
                              variant="outlined"
                              size="small"
                              value={
                                estimateDiscount > 0 ? estimateDiscount : ""
                              }
                              onChange={(event) => handleSetDiscount(event)}
                            />
                          </Box>
                          <Button
                            variant="outlined"
                            sx={{
                              borderColor: "#8477DA",
                              background: "#F6F5FF",
                              color: "#8477DA",
                              p: "0px 0px !important",
                              minWidth: "32px",
                              borderRadius: "0px 4px 4px 0px !important",
                              ":hover": {
                                background: "#F6F5FF",
                                // color: "white",
                                borderColor: "#8477DA",
                              },
                            }}
                            onClick={handleUnitChange}
                          >
                            <ChangeCircleOutlined />
                          </Button>
                        </Box>
                      </Box>

                      <Button
                        disabled={
                          estimateDiscount === 0 || estimateDiscount === ""
                        }
                        variant="contained"
                        onClick={resetDiscount}
                        sx={{
                          width: "97px",
                          gap: 0.6,
                          backgroundColor: "#8477da",
                          "&:hover": {
                            backgroundColor: "#8477da",
                          },
                          ":disabled": {
                            bgcolor: "#c2c2c2",
                          },
                        }}
                      >
                        <RestartAlt /> Reset
                      </Button>
                      <Divider sx={{ borderColor: "#D4DBDF" }} />
                      <PDFPreviewDrawer handleClick={drawerHandleClick} />
                    </Stack>
                  </Grid>
                )}
              </Grid>
            )}
          </Box>
          {glassDetails?.length > 0 && (
            <>
              <Divider sx={{ borderColor: "#D4DBDF" }} />
              <Box sx={{ px: 3, py: 2 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16.41px",
                    fontFamily: '"Roboto", sans-serif !important',
                  }}
                >
                  Note:
                </Typography>
                {/* {selectedContent?.glassType?.item?.name && (
              <Typography>
                Selected glass type '{selectedContent?.glassType?.item?.name}'
                price is '${pricing.glass?.toFixed(2) || 0}'.
              </Typography>
            )} */}

                {glassDetails.map((glass, index) => {
                  // const actualPrice =
                  //   pricing.cost - pricing.glass + sqftArea * glass.price;
                  // const price = sqftArea !== 0 ?
                  //   actualPrice * (mirrorsLocationSettings?.pricingFactorStatus ? mirrorsLocationSettings?.pricingFactor : 1) +
                  //   pricing.labor : 0;
                  const price =
                    (sqftArea * glass.price - pricing.glass) *
                    (mirrorsLocationSettings?.pricingFactorStatus
                      ? mirrorsLocationSettings?.pricingFactor
                      : 1);
                  const priceStatus = price >= 0 ? true : false;

                  return (
                    glass.status && (
                      <Typography key={index}>
                        Glass Option{" "}
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          {glass?.name || "Unknown"}
                        </Box>{" "}
                        cost{" "}
                        <Box
                          component="span"
                          sx={{
                            color: priceStatus ? "#28A745" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {priceStatus ? "+" : "-"}$
                          {Math.abs(price?.toFixed(2)) || "0.00"}
                        </Box>{" "}
                        {"=>"} Want to
                        <Box
                          component="span"
                          onClick={() =>
                            dispatch(
                              setSelectedContent({
                                type: hardwareTypes.GLASSTYPE,
                                item: glass?.selectedGlass,
                              })
                            )
                          }
                          sx={{ cursor: "pointer", color: "blue" }}
                        >
                          {" "}
                          apply
                        </Box>
                        ?
                      </Typography>
                    )
                  );
                })}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
export default Summary;
