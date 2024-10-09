import { setEstimateCategory, setEstimateState, setProjectId } from "@/redux/estimateSlice";
import {
  EstimateCategory,
  layoutVariants,
  // notificationsVariant,
  // panelOverWeightAmount,
  quoteState,
  // thicknessTypes,
  userRoles,
} from "./constants";
import {
  setSelectedItem,
  resetNotifications,
  // resetState,
  setDoorWeight,
  setDoorWidth,
  setPanelWeight,
  // setQuoteState,
  setReturnWeight,
  setisCustomizedDoorWidth,
  updateMeasurements,
  setBackWallGlassWeight
} from "@/redux/wineCellarEstimateSlice";
import { calculateAreaAndPerimeter } from "./common";

export const generateWIneObjectForPDFPreview = (
  listData,
  estimateData,
  showerMiscPricing
) => {
  let estimateInfoObject;
  let hardwareFinishes = null;
  hardwareFinishes = listData?.hardwareFinishes?.find(
    (item) => item._id === estimateData?.config?.hardwareFinishes
  );
  let handleType = null;
  handleType = listData?.handles?.find(
    (item) => item._id === estimateData?.config?.handles?.type
  );
  let hingesType = null;
  hingesType = listData?.hinges?.find(
    (item) => item._id === estimateData?.config?.hinges?.type
  );
  let slidingDoorSystemType = null;
  slidingDoorSystemType = listData?.slidingDoorSystem?.find(
    (item) => item._id === estimateData?.config?.slidingDoorSystem?.type
  );

  let headerType = null;
  headerType = listData?.header?.find(
    (item) => item._id === estimateData?.config?.header?.type
  );

  let glassTypee = null;
  glassTypee = listData?.glassType?.find(
    (item) => item._id === estimateData?.config?.glassType?.type
  );

  let glassAddons = [];
  glassAddons = estimateData?.config?.glassAddons?.map((item) => {
    const record = listData?.glassAddons.find((addon) => addon._id === item);
    return record;
  });

  let wallClampArray,
    sleeveOverArray,
    glassToGlassArray,
    cornerWallClampArray,
    cornerSleeveOverArray,
    cornerGlassToGlassArray,
    channelItem;
  wallClampArray =
    sleeveOverArray =
    glassToGlassArray =
    cornerWallClampArray =
    cornerSleeveOverArray =
    cornerGlassToGlassArray =
      [];
  channelItem = null;
  // do not calculate if a layout does not have mounting channel or clamp
  if (
    ![
      layoutVariants.DOOR,
      layoutVariants.DOUBLEDOOR,
      layoutVariants.DOUBLEBARN,
    ].includes(estimateData?.layoutData?.variant)
  ) {
    wallClampArray = estimateData?.config?.mountingClamps?.wallClamp?.map(
      (row) => {
        const record = listData?.wallClamp?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );
    sleeveOverArray = estimateData?.config?.mountingClamps?.sleeveOver?.map(
      (row) => {
        const record = listData?.sleeveOver?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );
    glassToGlassArray = estimateData?.config?.mountingClamps?.glassToGlass?.map(
      (row) => {
        const record = listData?.glassToGlass?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerWallClampArray = estimateData?.config?.cornerClamps?.wallClamp?.map(
      (row) => {
        const record = listData?.cornerWallClamp?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerSleeveOverArray = estimateData?.config?.cornerClamps?.sleeveOver?.map(
      (row) => {
        const record = listData?.cornerSleeveOver?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerGlassToGlassArray =
      estimateData?.config?.cornerClamps?.glassToGlass?.map((row) => {
        const record = listData?.cornerGlassToGlass?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      });

    channelItem = listData?.mountingChannel?.find(
      (item) => item._id === estimateData?.config?.mountingChannel
    );
  }
  let hardwareAddons = [];
  hardwareAddons = estimateData?.config?.hardwareAddons?.map((row) => {
    const found = listData?.hardwareAddons?.find(
      (item) => item?._id === row.type
    );
    return { item: found, count: row.count };
  });
  const noGlassAddon = listData?.glassAddons?.find(
    (item) => item.slug === "no-treatment"
  );
  // const measurements = estimateData.measurements.map(
  //   ({ _id, ...rest }) => rest
  // );

  estimateInfoObject = {
    name: estimateData?.name,
    projectId: estimateData?.project_id,
    category: estimateData?.category,
    cost: estimateData?.cost,
    creatorData: estimateData?.creatorData,
    creator_type: estimateData?.creator_type,
    customerData: estimateData?.customerData,
    settings: estimateData?.settings,
    status: estimateData?.status,
    updatedAt: estimateData?.updatedAt,
    doorWidth: estimateData?.config?.doorWidth,
    isCustomizedDoorWidth: estimateData?.config?.isCustomizedDoorWidth,
    additionalFields: estimateData?.config?.additionalFields,
    hardwareFinishes: hardwareFinishes,
    handles: {
      item: handleType,
      count: estimateData?.config?.handles?.count,
    },
    hinges: {
      item: hingesType,
      count: estimateData?.config?.hinges?.count,
    },
    header: {
      item: headerType,
      count: estimateData?.config?.header?.count,
    },
    slidingDoorSystem: {
      item: slidingDoorSystemType,
      count: estimateData?.config?.slidingDoorSystem?.count,
    },
    glassType: {
      item: glassTypee,
      thickness: estimateData?.config?.glassType?.thickness,
    },

    mountingClamps: {
      wallClamp: [...wallClampArray],
      sleeveOver: [...sleeveOverArray],
      glassToGlass: [...glassToGlassArray],
    },
    cornerClamps: {
      cornerWallClamp: [...cornerWallClampArray],
      cornerSleeveOver: [...cornerSleeveOverArray],
      cornerGlassToGlass: [...cornerGlassToGlassArray],
    },
    mountingChannel: {
      item: channelItem || null,
      count: channelItem ? 1 : 0,
    },
    mountingState:
      wallClampArray?.length ||
      sleeveOverArray?.length ||
      glassToGlassArray?.length
        ? "clamps"
        : "channel",
    glassAddons: glassAddons?.length ? [...glassAddons] : [noGlassAddon],
    hardwareAddons: [...hardwareAddons],
    oneInchHoles: estimateData?.config?.oneInchHoles,
    hingeCut: estimateData?.config?.hingeCut,
    clampCut: estimateData?.config?.clampCut,
    notch: estimateData?.config?.notch,
    outages: estimateData?.config?.outages,
    mitre: estimateData?.config?.mitre,
    polish: estimateData?.config?.polish,
    people: estimateData?.config?.people,
    hours: estimateData?.config?.hours,
    perimeter: estimateData?.config?.perimeter,
    sqftArea: estimateData?.config?.sqftArea,
    userProfitPercentage: estimateData?.config?.userProfitPercentage,
    label: estimateData?.config?.label,
    layout_id: estimateData?.config?.layout_id,
    measurements: estimateData?.config?.measurements,
    pricingFactor: showerMiscPricing?.pricingFactorStatus
      ? showerMiscPricing?.pricingFactor
      : 1,
  };
  return estimateInfoObject;
};

export const setStateForWineCellarEstimate = (item, dispatch, navigate) => {
  dispatch(resetNotifications());
  dispatch(setEstimateCategory(EstimateCategory.WINECELLARS));
  dispatch(setEstimateState(quoteState.EDIT));
  // dispatch(resetState());
  dispatch(setisCustomizedDoorWidth(item.config.isCustomizedDoorWidth));
  dispatch(updateMeasurements(item.config.measurements));
  dispatch(setSelectedItem(item));
  dispatch(setProjectId(item?.project_id));
  const result = calculateAreaAndPerimeter(
    item.config.measurements,
    item?.settings?.variant,
    item.config.glassType.thickness,
    {doorQuantity:item.config?.doorQuantity}
  );
  if (result?.doorWidth && item.config.isCustomizedDoorWidth === false) {
    dispatch(setDoorWidth(result?.doorWidth));
  } else {
    dispatch(setDoorWidth(item?.doorWidth));
  }
  if (result?.doorWeight) {
    dispatch(setDoorWeight(result?.doorWeight));
  }
  if (result?.panelWeight) {
    dispatch(setPanelWeight(result?.panelWeight));
  }
  if (result?.returnWeight) {
    dispatch(setReturnWeight(result?.returnWeight));
  }
  if (result?.backWallGlassWeight) {
    dispatch(setBackWallGlassWeight(result?.backWallGlassWeight));
  }
  if(navigate){
    // navigate("/estimates/dimensions");
    navigate(`/estimates/dimensions?category=${EstimateCategory.WINECELLARS}&projectId=${item?.project_id}&estimateState=${quoteState.EDIT}&estimateId=${item?._id}&layoutId=${item?.config?.layout_id}`)
  }
};

export const showEditButtonForWineEstimateStatus = (decryptedToken) => {
  switch (decryptedToken?.role) {
    case userRoles.SUPER_ADMIN:
      return false;
    case userRoles.ADMIN:
      return true;
    case userRoles.STAFF:
      return true;
    case userRoles.CUSTOM_ADMIN:
      if (decryptedToken?.company_id) {
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
};
