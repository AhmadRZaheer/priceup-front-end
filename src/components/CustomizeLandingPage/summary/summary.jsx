import 'swiper/css';
import 'swiper/css/navigation';
import '../style.scss';

import React, {
  useEffect,
  useMemo,
} from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import Bulb from '@/Assets/CustomerLandingImages/blubImg.png';
import CustomImage from '@/Assets/customlayoutimage.svg';
import {
  setContent,
  setCounter,
  setEstimateStatus,
  setEstimateTotal,
} from '@/redux/customerEstimateCalculation';
import {
  useCreateDocument,
  useEditDocument,
} from '@/utilities/ApiHooks/common';
import {
  backendURL,
  calculateTotal as calculateTotalForShower,
} from '@/utilities/common';
import {
  EstimateCategory,
  hardwareTypes,
  logActions,
  logResourceType,
  quoteState,
  statusTypes,
} from '@/utilities/constants';
import {
  renderMeasurementSides as renderShowerMeasurementSides,
} from '@/utilities/estimates';
import {
  generateEstimatePayloadForMirror,
  generateEstimatePayloadForShower,
  generateEstimatePayloadForWineCellar,
  getFabricationsCostForShowerItem,
  getFabricationsCostForWineCellarItem,
} from '@/utilities/generateEstimateCalculationContent';
import {
  calculateTotal as calculateTotalForMirror,
  renderMeasurementSides as renderMirrorMeasurementSides,
} from '@/utilities/mirrorEstimates';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import MenuList from './MenuListOption';

const ShowerSummary = ({
  refetchData,
  totalPrice,
  setTotalPrice,
  data,
  hardwaresList,
  locationSettings,
  UpgradeOPtions,
  colorData,
  reCalculateTotal,
}) => {
  const secondaryColor = colorData?.secondary;
  const primaryColor = colorData?.primary;
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProfitPercentage =
    data?.category === EstimateCategory.MIRRORS
      ? data?.content?.modifiedProfitPercentage
      : data?.content?.userProfitPercentage;
  const discountValue = data?.content?.discount?.value ?? 0;
  const discountUnit = data?.content?.discount?.unit ?? "%";
  const laborPrice =
    data?.category === EstimateCategory.WINECELLARS
      ? data?.laborPrice + (data?.doorLaborPrice ?? 0)
      : data?.laborPrice;
  const {
    mutateAsync: customerDecision,
    isLoading,
    isSuccess,
  } = useEditDocument();
  const { mutate: activityLog } = useCreateDocument();
  const imageData =
    data?.selectedItem?.settings !== null
      ? `${backendURL}/${data?.selectedItem?.settings?.image}`
      : null;
  const factorPrice =
    data?.category === EstimateCategory.MIRRORS
      ? locationSettings?.pricingFactorStatus
        ? locationSettings?.pricingFactor
        : 1
      : locationSettings?.miscPricing?.pricingFactorStatus
      ? locationSettings?.miscPricing?.pricingFactor
      : 1;
  const glasstypeList = useMemo(() => {
    const upgradeGlassList =
      hardwaresList?.glassType?.filter(
        (obj) =>
          UpgradeOPtions?.glassTypes?.includes(obj._id) &&
          obj.options.some(
            (option) =>
              option.thickness === data?.content?.glassType?.thickness &&
              option.status === true
          )
      ) ?? [];
    if (
      upgradeGlassList?.length === 0 ||
      !upgradeGlassList?.some(
        (glass) => glass._id === data?.selectedItem?.config?.glassType?.type
      )
    ) {
      const item = hardwaresList?.glassType?.find(
        (glass) => glass._id === data?.selectedItem?.config?.glassType?.type
      );
      if (item) {
        upgradeGlassList.push(item);
      }
      console.log(upgradeGlassList);
    }
    const glassTypedata = upgradeGlassList?.map((item) => {
      const price =
        item?.options?.find(
          (option) => option.thickness === data?.content?.glassType?.thickness
        )?.cost || 0;

      const costDifference =
        upgradeGlassList
          ?.filter((item) => item._id === data?.content?.glassType?.item?._id)
          ?.map((item) =>
            item?.options?.find(
              (option) =>
                option.thickness === data?.content?.glassType?.thickness
            )
          )
          ?.find((option) => option)?.cost || 0;
      const currentItemCost =
        (data?.cost ?? 0) -
          data?.sqftArea * costDifference +
          data?.sqftArea * price ?? 0;
      let singleItemCost = currentItemCost * factorPrice + laborPrice ?? 0;

      if (userProfitPercentage > 0 && userProfitPercentage < 100) {
        singleItemCost =
          ((currentItemCost * 100) / (userProfitPercentage - 100)) * -1;
      }
      const itemDifference = singleItemCost - data?.totalPrice;
      const singleGlassCost =
        discountValue > 0 && discountUnit === "%"
          ? itemDifference - (itemDifference * Number(discountValue)) / 100
          : itemDifference;

      return {
        ...item,
        modifiedName: (
          <span>
            {item?._id === data?.content?.glassType?.item?._id ? (
              item?.name
            ) : (
              <>
                <Tooltip
                  title={item?.name?.length > 12 ? item?.name : ""}
                  placement="top"
                >
                  <span
                    style={{
                      maxWidth: "132px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      paddingRight: "4px",
                    }}
                  >
                    {item?.name}
                  </span>
                </Tooltip>{" "}
                cost{" "}
                <b
                  style={{
                    color: singleGlassCost > 0 ? "#28A745" : "red",
                    paddingLeft: "4px",
                  }}
                >
                  {singleGlassCost > 0 ? "+" : "-"} $
                  {Math.abs(singleGlassCost ?? 0).toFixed(2)}
                </b>
              </>
            )}
          </span>
        ),
      };
    });
    return glassTypedata ?? [];
  }, [
    data?.content?.glassType,
    hardwaresList?.glassType,
    UpgradeOPtions,
    data?.cost,
  ]);

  const glassAddonsList = useMemo(() => {
    const upgradeGlassAddonsList =
      hardwaresList?.glassAddons?.filter(
        (obj) =>
          UpgradeOPtions?.glassAddons?.includes(obj._id) &&
          obj.options.some((option) => option.status === true)
      ) ?? [];

    if (data?.category !== EstimateCategory.MIRRORS) {
      const noTreatment = hardwaresList?.glassAddons?.find(
        (item) => item?.slug === "no-treatment"
      );
      if (
        noTreatment &&
        !upgradeGlassAddonsList?.some((addon) => addon._id === noTreatment._id)
      ) {
        upgradeGlassAddonsList.push(noTreatment);
      }
    }

    data?.selectedItem?.config?.glassAddons?.forEach((glassAddon) => {
      if (
        upgradeGlassAddonsList?.length === 0 ||
        !upgradeGlassAddonsList.some((addon) => addon._id === glassAddon)
      ) {
        const item = hardwaresList?.glassAddons?.find(
          (item) => item._id === glassAddon
        );
        if (item) {
          upgradeGlassAddonsList.push(item);
        }
      }
    });
    
    const glassAddonsData = upgradeGlassAddonsList?.map((item) => {
      const price = item?.options?.[0]?.cost;
      const costDifference =
        data?.content?.glassAddons
          ?.map((addon) => {
            const matchedItem = upgradeGlassAddonsList?.find(
              (firstItem) => firstItem._id === addon?.item?._id
            );
            if (matchedItem && matchedItem.options?.length > 0) {
              return matchedItem.options[0].cost;
            }
            return null;
          })
          ?.filter((cost) => cost !== null) ?? [];
      const priceToDiffer = costDifference?.reduce((acc, arr) => acc + arr, 0);

      let totalItemPrice =
        data?.sqftArea *
          (item?.slug !== "no-treatment" ? price : priceToDiffer * -1) ?? 0;
      let itemPrice = totalItemPrice * factorPrice;

      if (userProfitPercentage > 0 && userProfitPercentage < 100) {
        itemPrice =
          ((totalItemPrice * 100) / (userProfitPercentage - 100)) * -1;
      }

      const singleGlassAddonCost =
        discountValue > 0 && discountUnit === "%"
          ? itemPrice - (itemPrice * Number(discountValue)) / 100
          : itemPrice;

      return {
        ...item,
        modifiedName: (
          <span>
            {data?.content?.glassAddons?.some(
              (hardware) => hardware?.type === item._id
            ) ? (
              item?.name
            ) : (
              <>
                <Tooltip
                  title={item?.name?.length > 12 ? item?.name : ""}
                  placement="top"
                >
                  <span
                    style={{
                      maxWidth: "132px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      paddingRight: "4px",
                    }}
                  >
                    {item?.name}
                  </span>
                </Tooltip>{" "}
                cost{" "}
                <b
                  style={{
                    color: singleGlassAddonCost > 0 ? "#28A745" : "red",
                    paddingLeft: "4px",
                  }}
                >
                  {singleGlassAddonCost > 0 ? "+" : "-"} $
                  {Math.abs(singleGlassAddonCost ?? 0).toFixed(2)}
                </b>
              </>
            )}
          </span>
        ),
      };
    });
    return glassAddonsData ?? [];
  }, [data?.content?.glassAddons, hardwaresList?.glassAddons, UpgradeOPtions]);

  const handleChangeHardware = (type, value) => {
    if (type === hardwareTypes.HARDWAREADDONS) {
      if (value.counter !== undefined) {
        const item = { ...value.item };
        if ("modifiedName" in item) delete item.modifiedName;
        dispatch(
          setCounter({
            type,
            item,
            counter: value.counter,
            estimateId: data?.selectedItem?._id,
          })
        );
      }
    } else {
      const item = { ...value };
      if ("modifiedName" in item) delete item.modifiedName;
      dispatch(
        setContent({
          type,
          item,
          hardwaresList,
          estimateId: data?.selectedItem?._id,
        })
      );
    }
  };
  const handleApprove = async () => {
    const approvePayload =
      data?.category === EstimateCategory.SHOWERS
        ? generateEstimatePayloadForShower(
            quoteState.EDIT,
            data?.measurements,
            data?.content,
            data?.selectedItem?.config?.layout_id,
            data?.isCustomizedDoorWidth,
            data?.doorWidth,
            data?.perimeter,
            data?.sqftArea
          )
        : data?.category === EstimateCategory.MIRRORS
        ? generateEstimatePayloadForMirror(
            data?.measurements,
            data?.content,
            data?.sqftArea
          )
        : generateEstimatePayloadForWineCellar(
            quoteState.EDIT,
            data?.measurements,
            data?.content,
            data?.selectedItem?.config?.layout_id,
            data?.isCustomizedDoorWidth,
            data?.doorWidth,
            data?.doorQuantity,
            data?.perimeter,
            data?.sqftArea
          );

    await customerDecision({
      data: {
        approveEstimate: data?.selectedItem?._id,
        config: {
          ...approvePayload,
          layout_id: data?.selectedItem?.config?.layout_id ?? null,
        },
        total: data?.totalPrice ?? 0,
      },
      apiRoute: `${backendURL}/landing-page-preview/${id}`,
    });

    const logData = {
      action: logActions.APPROVEESTIMATE,
      resource_id: id,
      resource_type: logResourceType.PREVIEWLINK,
    };
    activityLog({
      data: logData,
      apiRoute: `${backendURL}/logs/customer`,
    });

    dispatch(
      setEstimateStatus({
        estimateId: data?.selectedItem?._id,
        status: statusTypes.CUSTOMER_APPROVED,
      })
    );
    refetchData();
  };

  useEffect(() => {
    if (
      (data && data?.category === EstimateCategory.SHOWERS) ||
      data?.category === EstimateCategory.WINECELLARS
    ) {
      const prices = calculateTotalForShower(
        data?.content,
        data?.sqftArea,
        locationSettings
      );
      dispatch(
        setEstimateTotal({
          prices,
          estimateId: data?.selectedItem?._id,
          category: data?.category,
        })
      );
    } else if (data && data?.category === EstimateCategory.MIRRORS) {
      const prices = calculateTotalForMirror(
        data?.content,
        data?.sqftArea,
        locationSettings,
        data?.measurements
      );
      dispatch(
        setEstimateTotal({
          prices,
          estimateId: data?.selectedItem?._id,
          category: data?.category,
        })
      );
    }
  }, [data?.content]);

  const hardwareAddonsList = useMemo(() => {
    const upgradeHardwareAddonList =
      hardwaresList?.hardwareAddons?.filter(
        (obj) =>
          UpgradeOPtions?.hardwareAddons?.includes(obj._id) &&
          obj.finishes.some(
            (option) =>
              option.finish_id === data?.content?.hardwareFinishes?._id &&
              option.status === true
          )
      ) ?? [];
    data?.selectedItem?.config?.hardwareAddons?.forEach((data) => {
      if (
        upgradeHardwareAddonList?.length === 0 ||
        !upgradeHardwareAddonList.some((addon) => addon._id === data?.type)
      ) {
        const item = hardwaresList?.hardwareAddons?.find(
          (item) => item._id === data?.type
        );
        if (item) {
          upgradeHardwareAddonList.push(item);
        }
      }
    });

    const glassAddonsData = upgradeHardwareAddonList?.map((item) => {
      const price = item?.finishes?.find(
        (option) => option.finish_id === data?.content?.hardwareFinishes?._id
      )?.cost;

      let fabricationsCountPrice = 0;
      if (data?.category === EstimateCategory.SHOWERS) {
        fabricationsCountPrice = getFabricationsCostForShowerItem(
          item,
          data?.content?.glassType?.thickness,
          locationSettings?.fabricatingPricing
        );
      } else if (data?.category === EstimateCategory.WINECELLARS) {
        fabricationsCountPrice = getFabricationsCostForWineCellarItem(
          item,
          data?.content?.glassType?.thickness,
          locationSettings?.fabricatingPricing
        );
      }
      let itemPrice = (price + fabricationsCountPrice) * factorPrice;
      if (userProfitPercentage > 0 && userProfitPercentage < 100) {
        itemPrice =
          (((price + fabricationsCountPrice) * 100) /
            (userProfitPercentage - 100)) *
          -1;
      }
      const singleGlassAddonCost =
        discountValue > 0 && discountUnit === "%"
          ? itemPrice - (itemPrice * Number(discountValue)) / 100
          : itemPrice;

      return {
        ...item,
        modifiedName: (
          <span style={{ display: "flex" }}>
            <Tooltip
              title={item?.name?.length > 12 ? item?.name : ""}
              placement="top"
            >
              <span
                style={{
                  maxWidth: "132px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  paddingRight: "4px",
                }}
              >
                {item?.name}
              </span>
            </Tooltip>
            cost{" "}
            <b style={{ color: "#28A745", paddingLeft: "4px" }}>
              {"+"} ${Math.abs(singleGlassAddonCost ?? 0).toFixed(2)}
            </b>
          </span>
        ),
      };
    });
    return glassAddonsData ?? [];
  }, [data?.content?.hardwareAddons, hardwaresList?.hardwareAddons]);
  const renderDimensions =
    data?.category === EstimateCategory.SHOWERS ||
    data?.category === EstimateCategory.WINECELLARS
      ? renderShowerMeasurementSides(
          quoteState.EDIT,
          data?.measurements,
          data?.selectedItem?.config?.layout_id
        )
      : data?.category === EstimateCategory.MIRRORS
      ? renderMirrorMeasurementSides(data?.measurements)
      : () => {};
  return (
    <>
      <Box
        sx={{
          borderRadius: { sm: "14px", xs: 0 },
          border: {
            sm: " 1px solid rgba(212, 219, 223, 1)",
            xs: "none",
          },
          overflow: { sm: "hidden" },
        }}
      >
        <Box
          sx={{
            background: "rgba(243, 245, 246, 1)",
            color: "black",
            paddingY: "17px",
            px: 3,
            display: { sm: "flex", xs: "none" },
            borderBottom: "1px solid rgba(212, 219, 223, 1)",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "16.34px",
              fontWeight: 700,
              fontFamily: '"Roboto", sans-serif !important',
              lineHeight: "24.51px",
            }}
          >
            Layout & Measurement
          </Typography>
        </Box>
        <Box
          sx={{
            background: "white",
            color: "black",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "50%",
                mt: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  mb: 1.5,
                }}
              >
                Layout Dimensions:
              </Typography>
              <Stack gap={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography className="text-xs-ragular-bold" sx={{}}>
                    Dimensions
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {renderDimensions}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography className="text-xs-ragular-bold">
                    Layout:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.selectedItem?.settings?.name ??
                    data?.category === EstimateCategory.MIRRORS
                      ? "Mirror"
                      : "Custom"}
                  </Typography>
                </Box>
                {data?.doorWidth ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography className="text-xs-ragular-bold">
                    Square Foot:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.sqftArea}
                  </Typography>
                </Box>
                {discountValue > 0 && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="text-xs-ragular-bold">
                        Sub Total:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        $ {(data?.totalPrice ?? 0)?.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="text-xs-ragular-bold">
                        Discount:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.content?.discount?.unit === "$" && "$"}{" "}
                        {discountValue}{" "}
                        {data?.content?.discount?.unit === "%" && "%"}
                      </Typography>
                    </Box>
                  </>
                )}

                <Box>
                  <Divider sx={{ borderColor: "#D4DBDF" }} />
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-xs-ragular-bold">
                      Total Price:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      $
                      {(
                        (discountValue > 0
                          ? data?.content?.discount?.total
                          : data?.totalPrice) ?? 0
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                {/* )} */}
              </Stack>
            </Box>
            <Box
              sx={{
                width: "40%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  py: 1,
                }}
              >
                <img
                  src={imageData ?? CustomImage}
                  alt="not"
                  style={{ height: "320px" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", gap: 3, mt: 2 }}>
        <Box
          sx={{
            width: "50%",
            paddingBottom: { sm: 0, xs: "80px" },
          }}
        >
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #D0D5DD",
              backgroundColor: "white",
              color: "black",
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
                  color: "",
                }}
              >
                Estimate Details
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "#D4DBDF" }} />
            <Box sx={{ backgroundColor: "#F3F5F6", px: 3, py: 2 }}>
              <Grid container>
                <Grid item md={7} className="text-xs-samibold">
                  Dimensions
                </Grid>
                <Grid item md={5} className="text-xs-samibold">
                  Summary
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ borderColor: "#D4DBDF" }} />
            <Box sx={{ px: 3, py: "15px" }}>
              <Grid container spacing={2}>
                <Grid item md={7}>
                  <Stack gap={2}>
                    <Typography
                      className="text-xs-samibold"
                      sx={{ display: { sm: "none", xs: "block" } }}
                    >
                      Dimensions
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {renderDimensions}
                    </Typography>
                    <Box>
                      <Typography className="text-xs-ragular-bold">
                        Layout:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.selectedItem?.settings?.name ??
                        data?.category === EstimateCategory.MIRRORS
                          ? "Mirror"
                          : "Custom"}
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
                    <Box sx={{ width: "60%" }}>
                      <Divider sx={{ borderColor: "#D4DBDF" }} />
                      <Box
                        sx={{
                          mt: 1.5,
                        }}
                      >
                        <Typography
                          className="text-xs-ragular-bold"
                          sx={{
                            color: primaryColor,
                            fontSize: "20px !important",
                            fontWeight: "bold !important",
                          }}
                        >
                          Total Price:
                        </Typography>
                        <Typography
                          className="text-xs-ragular"
                          sx={{
                            color: discountValue > 0 ? "#BFBFBD" : primaryColor,
                            fontSize:
                              discountValue > 0
                                ? "17px !important"
                                : "20px !important",
                            pt: 1,
                            fontWeight: "bold !important",
                            textDecoration:
                              discountValue > 0 ? "line-through" : "auto",
                          }}
                        >
                          $ {(data?.totalPrice ?? 0)?.toFixed(2)}
                        </Typography>
                        {discountValue > 0 && (
                          <Typography
                            className="text-xs-ragular"
                            sx={{
                              color: primaryColor,
                              fontSize: "20px !important",
                              pt: 1,
                              fontWeight: "bold !important",
                            }}
                          >
                            ${" "}
                            {(data?.content?.discount?.total ?? 0)?.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {/* )} */}
                  </Stack>
                </Grid>
                <Grid item md={5}>
                  <Stack gap={2}>
                    <Typography
                      className="text-xs-samibold"
                      sx={{ display: { sm: "none", xs: "block" } }}
                    >
                      Summary
                    </Typography>
                    {data?.content?.hardwareFinishes && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Finish:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.hardwareFinishes?.name}
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.handles?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Handles:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.handles?.item?.name} (
                          {data?.content?.handles?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.hinges?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Hinges:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.hinges?.item?.name} (
                          {data?.content?.hinges?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.doorLock?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Door Lock:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.doorLock?.item?.name} (
                          {data?.content?.doorLock?.count})
                        </Typography>
                      </Box>
                    )}

                    {["channel"].includes(data?.content?.mountingState) &&
                    data?.content?.mountingChannel?.item ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Channel:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.mountingChannel?.item?.name}
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {" "}
                        {data?.content?.mountingClamps?.wallClamp?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              WallClamps:{" "}
                            </Typography>
                            {data?.content?.mountingClamps?.wallClamp?.map(
                              (row) => (
                                <Typography className="text-xs-ragular">
                                  {row.name} ({row.count}){" "}
                                </Typography>
                              )
                            )}
                          </Box>
                        ) : (
                          ""
                        )}
                        {data?.content?.mountingClamps?.sleeveOver?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              Sleeve Over:{" "}
                            </Typography>
                            {data?.content?.mountingClamps?.sleeveOver?.map(
                              (row) => (
                                <Typography className="text-xs-ragular">
                                  {row.name} ({row.count}){" "}
                                </Typography>
                              )
                            )}
                          </Box>
                        ) : (
                          ""
                        )}
                        {data?.content?.mountingClamps?.glassToGlass?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              Glass To Glass:{" "}
                            </Typography>
                            {data?.content?.mountingClamps?.glassToGlass?.map(
                              (row) => (
                                <Typography className="text-xs-ragular">
                                  {row.name} ({row.count}){" "}
                                </Typography>
                              )
                            )}
                          </Box>
                        ) : (
                          ""
                        )}{" "}
                      </>
                    )}
                    {data?.content?.cornerClamps?.wallClamp?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner WallClamp:{" "}
                        </Typography>
                        {data?.content?.cornerClamps?.wallClamp?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.name} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.content?.cornerClamps?.sleeveOver?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner Sleeve Over:{" "}
                        </Typography>
                        {data?.content?.cornerClamps?.sleeveOver?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.name} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.content?.cornerClamps?.glassToGlass?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner Glass To Glass:{" "}
                        </Typography>
                        {data?.content?.cornerClamps?.glassToGlass?.map(
                          (row) => (
                            <Typography className="text-xs-ragular">
                              {row.name} ({row.count}){" "}
                            </Typography>
                          )
                        )}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.content?.glassType?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Type:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.glassType?.item?.name} (
                          {data?.content?.glassType?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.edgeWork?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Edge Work:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.edgeWork?.item?.name} (
                          {data?.content?.edgeWork?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.slidingDoorSystem?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Sliding Door System:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.slidingDoorSystem?.item?.name} (
                          {data?.content?.slidingDoorSystem?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.transom && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Transom:{" "}
                        </Typography>
                        <Typography className="text-xs-ragular"></Typography>
                      </Box>
                    )}
                    {data?.content?.header?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Header:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.header?.item?.name} (
                          {data?.content?.header?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.glassAddons?.length > 0 ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Addons:
                        </Typography>
                        {data?.content?.glassAddons?.map((item, index) => (
                          <Typography key={index} className="text-xs-ragular">
                            {item?.item?.name},
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.content?.hardwareAddons?.length > 0 && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          {data?.category === EstimateCategory?.MIRRORS
                            ? "Hardwares:"
                            : "Add ons:"}
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.hardwareAddons?.map(
                            (row) => ` ${row?.item?.name} (${row?.count}),`
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
                        {data?.content?.people}
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
                        {data?.category === EstimateCategory.WINECELLARS
                          ? "Hours for layout"
                          : "Hours"}{" "}
                        :{" "}
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.content?.hours}
                      </Typography>
                    </Box>
                    {data?.category === EstimateCategory.WINECELLARS && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography className="text-xs-ragular-bold">
                          Hours for door:{" "}
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.laborHoursForDoor}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {data?.selectedItem?.status !== statusTypes.CUSTOMER_APPROVED && (
            <Box sx={{ pt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleApprove}
                sx={{
                  backgroundColor: primaryColor,
                  color: secondaryColor,
                  height: "44px",
                  width: { sm: "100%", xs: "187px" },
                  "&:hover": {
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  },
                  textTransform: "capitalize",
                  borderRadius: 1,
                  fontSize: { lg: 16, md: 15, xs: 12 },
                  padding: {
                    sm: "10px 16px  !important",
                    xs: "5px 5px !important",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: secondaryColor }} />
                ) : (
                  "I approve"
                )}
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "50%", pt: 1 }}>
          {(glassAddonsList?.length >
            (data?.category !== EstimateCategory.MIRRORS ? 1 : 0) ||
            hardwareAddonsList?.length > 0 ||
            glasstypeList?.length > 0) && (
            <Typography
              sx={{
                fontFamily: '"Poppins" !important',
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "35px",
                width: "80%",
                color: secondaryColor,
              }}
            >
              Available Upgrades:
            </Typography>
          )}

          <Box sx={{ pt: 1 }}>
            {glassAddonsList?.length >
              (data?.category !== EstimateCategory.MIRRORS ? 1 : 0) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: "6px",
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    background: "white",
                    borderRadius: "11px",
                    pointerEvents:
                      data?.selectedItem?.status ===
                      statusTypes.CUSTOMER_APPROVED
                        ? "none"
                        : "auto",
                    opacity:
                      data?.selectedItem?.status ===
                      statusTypes.CUSTOMER_APPROVED
                        ? 0.5
                        : 1,
                  }}
                >
                  <MenuList
                    menuOptions={glassAddonsList ?? []}
                    title={"Glass Addons"}
                    type={"glassAddons"}
                    selectedContent={data?.content}
                    handleChange={handleChangeHardware}
                    colorData={colorData}
                  />
                </Box>
              </Box>
            )}
            {[EstimateCategory.SHOWERS, EstimateCategory.WINECELLARS].includes(
              data?.category
            ) &&
              hardwareAddonsList?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: "6px",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      background: "white",
                      borderRadius: "11px",
                      pointerEvents:
                        data?.selectedItem?.status ===
                        statusTypes.CUSTOMER_APPROVED
                          ? "none"
                          : "auto",
                      opacity:
                        data?.selectedItem?.status ===
                        statusTypes.CUSTOMER_APPROVED
                          ? 0.5
                          : 1,
                    }}
                  >
                    <MenuList
                      menuOptions={hardwareAddonsList ?? []}
                      title={"Hardware Addons"}
                      type={"hardwareAddons"}
                      selectedContent={data?.content}
                      handleChange={handleChangeHardware}
                      colorData={colorData}
                    />
                  </Box>
                </Box>
              )}
            {glasstypeList?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: "6px",
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    background: "white",
                    borderRadius: "11px",
                    pointerEvents:
                      data?.selectedItem?.status ===
                      statusTypes.CUSTOMER_APPROVED
                        ? "none"
                        : "auto",
                    opacity:
                      data?.selectedItem?.status ===
                      statusTypes.CUSTOMER_APPROVED
                        ? 0.5
                        : 1,
                  }}
                >
                  <MenuList
                    menuOptions={glasstypeList ?? []}
                    title={"Glass type"}
                    type={"glassType"}
                    thickness={data?.content?.glassType?.thickness}
                    currentItem={data?.content?.glassType?.item}
                    selectedContent={data?.content}
                    locationSettings={locationSettings}
                    handleChange={handleChangeHardware}
                    colorData={colorData}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {data?.gallery?.length > 0 ? (
        <Box>
          <Box sx={{ display: "flex", py: 4, justifyContent: "center" }}>
            <img src={Bulb} alt="not" style={{ height: "50px" }} />
            <Typography
              sx={{
                fontFamily: '"Poppins" !important',
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "35px",
                alignSelf: "end",
                borderBottom: "1px solid #F95500",
              }}
            >
              <Box component="span" sx={{ color: "#F95500" }}>
                Similar
              </Box>{" "}
              projects that we’ve worked on:
            </Typography>
          </Box>
          <Container sx={{ px: "0px !important" }}>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={3}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              style={{
                "--swiper-navigation-color": "#fff !important",
                "--swiper-pagination-color": "#fff !important",
                "--swiper-navigation-size": "28px",
                paddingLeft: "40px",
                paddingRight: "40px",
              }}
            >
              {data?.gallery?.length > 0 ? (
                data?.gallery.map((data, index) => (
                  <SwiperSlide key={index}>
                    <Card sx={{}}>
                      <img
                        src={`${backendURL}/${data}`}
                        alt="not"
                        style={{
                          height: "400px",
                          width: "100%",
                          objectFit: "fill",
                        }}
                      />
                    </Card>
                  </SwiperSlide>
                ))
              ) : (
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 500,
                    lineHeight: "54px",
                    textAlign: "center",
                  }}
                >
                  No Image Selected!
                </Typography>
              )}
            </Swiper>
          </Container>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default ShowerSummary;
