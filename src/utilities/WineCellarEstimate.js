import { setEstimateCategory, setEstimateState, setProjectId } from "@/redux/estimateSlice";
import {
  EstimateCategory,
  hardwareTypes,
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
    const record = listData?.glassAddons?.find((addon) => addon._id === item);
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

export const setStateForWineCellarEstimate = (item, dispatch, navigate,redirect = false) => {
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
    if(redirect){
      navigate(
        `/estimates/dimensions?category=${EstimateCategory.WINECELLARS}&projectId=${item?.project_id}&estimateState=${quoteState.EDIT}&estimateId=${item?._id}&layoutId=${item?.config?.layout_id}&redirectTab=all`
      );
    }else{
      navigate(
        `/estimates/dimensions?category=${EstimateCategory.WINECELLARS}&projectId=${item?.project_id}&estimateState=${quoteState.EDIT}&estimateId=${item?._id}&layoutId=${item?.config?.layout_id}`
      );
    }
    // navigate(`/estimates/dimensions?category=${EstimateCategory.WINECELLARS}&projectId=${item?.project_id}&estimateState=${quoteState.EDIT}&estimateId=${item?._id}&layoutId=${item?.config?.layout_id}`)
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


// Wine Cellar Fab

export const getHardwareFabricationQuantity = (
  selectedContent,
  currentQuoteState,
  selectedItem
) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  // for handles
  if (selectedContent.handles?.item) {
    const handleResult = getHandleFabrication(
      selectedContent.handles?.item,
      selectedContent.handles?.count
    );
    oneInchHoles += handleResult.oneInchHoles;
    hingeCut += handleResult.hingeCut;
    clampCut += handleResult.clampCut;
    notch += handleResult.notch;
    outages += handleResult.outages;
  }
  // for hinges
  if (selectedContent.hinges?.item) {
    const hingeResult = getHingeFabrication(
      selectedContent.hinges?.item,
      selectedContent.hinges?.count
    );
    oneInchHoles += hingeResult.oneInchHoles;
    hingeCut += hingeResult.hingeCut;
    clampCut += hingeResult.clampCut;
    notch += hingeResult.notch;
    outages += hingeResult.outages;
  }
  // for door lock
  if (selectedContent.doorLock?.item) {
    const doorLockResult = getGenericFabrication(
      selectedContent.doorLock?.item,
      selectedContent.doorLock?.count
    );
    oneInchHoles += doorLockResult.oneInchHoles;
    hingeCut += doorLockResult.hingeCut;
    clampCut += doorLockResult.clampCut;
    notch += doorLockResult.notch;
    outages += doorLockResult.outages;
  }
  // for mounting channel
  if (
    selectedContent.mountingState === hardwareTypes.CHANNEL &&
    selectedContent.mountingChannel?.item
  ) {
    const mountingChannelResult = getGenericFabrication(
      selectedContent.mountingChannel.item,
      selectedContent.mountingChannel.count
    );
    oneInchHoles += mountingChannelResult.oneInchHoles;
    hingeCut += mountingChannelResult.hingeCut;
    clampCut += mountingChannelResult.clampCut;
    notch += mountingChannelResult.notch;
    outages += mountingChannelResult.outages;
  } else if (selectedContent.mountingState === "clamps") {
    // for wall clamp
    if (selectedContent.mountingClamps.wallClamp?.length) {
      selectedContent.mountingClamps.wallClamp.forEach((record) => {
        const wallClampResult = getGenericFabrication(
          record.item,
          record.count
        );

        oneInchHoles += wallClampResult.oneInchHoles;
        hingeCut += wallClampResult.hingeCut;
        clampCut += wallClampResult.clampCut;
        notch += wallClampResult.notch;
        outages += wallClampResult.outages;
      });
    }
    // for sleeve over
    if (selectedContent.mountingClamps.sleeveOver?.length) {
      selectedContent.mountingClamps.sleeveOver.forEach((record) => {
        const sleeveOverResult = getGenericFabrication(
          // use generic fabrication method for sleeve over to avoid default clamp cut count
          record.item,
          record.count
        );
        oneInchHoles += sleeveOverResult.oneInchHoles;
        hingeCut += sleeveOverResult.hingeCut;
        clampCut += sleeveOverResult.clampCut;
        notch += sleeveOverResult.notch;
        outages += sleeveOverResult.outages;
      });
    }
    // for glass to glass
    if (selectedContent.mountingClamps.glassToGlass?.length) {
      selectedContent.mountingClamps.glassToGlass.forEach((record) => {
        const glassToGlassResult = getGenericFabrication(
          record.item,
          record.count
        );
        oneInchHoles += glassToGlassResult.oneInchHoles;
        hingeCut += glassToGlassResult.hingeCut;
        clampCut += glassToGlassResult.clampCut;
        notch += glassToGlassResult.notch;
        outages += glassToGlassResult.outages;
      });
    }
  }
   // for corner wall clamps
   if (selectedContent.cornerClamps.cornerWallClamp?.length) {
    selectedContent.cornerClamps.cornerWallClamp.forEach((record) => {
      const cornerWallClampResult = getGenericFabrication(
        record.item,
        record.count
      );
      oneInchHoles += cornerWallClampResult.oneInchHoles;
      hingeCut += cornerWallClampResult.hingeCut;
      clampCut += cornerWallClampResult.clampCut;
      notch += cornerWallClampResult.notch;
      outages += cornerWallClampResult.outages;
    });
  }
  // for corner sleeve over
  if (selectedContent.cornerClamps.cornerSleeveOver?.length) {
    selectedContent.cornerClamps.cornerSleeveOver.forEach((record) => {
      const cornerSleeveOverResult = getGenericFabrication(
        record.item,
        record.count
      );
      oneInchHoles += cornerSleeveOverResult.oneInchHoles;
      hingeCut += cornerSleeveOverResult.hingeCut;
      clampCut += cornerSleeveOverResult.clampCut;
      notch += cornerSleeveOverResult.notch;
      outages += cornerSleeveOverResult.outages;
    });
  }
  // for corner glass to glass
  if (selectedContent.cornerClamps.cornerGlassToGlass?.length) {
    selectedContent.cornerClamps.cornerGlassToGlass.forEach((record) => {
      const cornerGlassToGlassResult = getGenericFabrication(
        record.item,
        record.count
      );
      oneInchHoles += cornerGlassToGlassResult.oneInchHoles;
      hingeCut += cornerGlassToGlassResult.hingeCut;
      clampCut += cornerGlassToGlassResult.clampCut;
      notch += cornerGlassToGlassResult.notch;
      outages += cornerGlassToGlassResult.outages;
    });
  }
  // for sliding door system
  if (selectedContent.slidingDoorSystem?.item) {
    const slidingDoorSystemResult = getGenericFabrication(
      selectedContent.slidingDoorSystem?.item,
      selectedContent.slidingDoorSystem?.count
    );
    oneInchHoles += slidingDoorSystemResult.oneInchHoles;
    hingeCut += slidingDoorSystemResult.hingeCut;
    clampCut += slidingDoorSystemResult.clampCut;
    notch += slidingDoorSystemResult.notch;
    outages += slidingDoorSystemResult.outages;
  }
  // for header
  if (selectedContent.header?.item) {
    const headerResult = getGenericFabrication(
      selectedContent.header?.item,
      selectedContent.header?.count
    );
    oneInchHoles += headerResult.oneInchHoles;
    hingeCut += headerResult.hingeCut;
    clampCut += headerResult.clampCut;
    notch += headerResult.notch;
    outages += headerResult.outages;
  }
  // for hardware addons
  if (selectedContent.hardwareAddons.length) {
    selectedContent.hardwareAddons.forEach((record) => {
      const hardwareAddonResult = getGenericFabrication(
        record.item,
        record.count
      );
      oneInchHoles += hardwareAddonResult.oneInchHoles;
      hingeCut += hardwareAddonResult.hingeCut;
      clampCut += hardwareAddonResult.clampCut;
      notch += hardwareAddonResult.notch;
      outages += hardwareAddonResult.outages;
    });
  }
  console.log(selectedItem,'123456selectedItem')
  // for create quote
  if (currentQuoteState === quoteState.CREATE) {
    let layoutNotchValue = selectedItem?.settings?.notch ?? 0;
    notch += layoutNotchValue;
    let layoutOutageValue = selectedItem?.settings?.outages ?? 0;
    outages += layoutOutageValue;
  }

  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};


export const getHandleFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.fabrication?.oneInchHoles > 0 ? item?.fabrication?.oneInchHoles : 2;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemhingeCut = item?.fabrication?.hingeCut > 0 ? item?.fabrication?.hingeCut : 0;

  hingeCut = count * selectedItemhingeCut;

  let selectedItemClampCut = item?.fabrication?.clampCut > 0 ? item?.fabrication?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.fabrication?.notch > 0 ? item?.fabrication?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.fabrication?.outages > 0 ? item?.fabrication?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getHingeFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.fabrication?.oneInchHoles > 0 ? item?.fabrication?.oneInchHoles : 0;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemHingeCut = item?.fabrication?.hingeCut > 0 ? item?.fabrication?.hingeCut : 1;

  hingeCut = count * selectedItemHingeCut;

  let selectedItemClampCut = item?.fabrication?.clampCut > 0 ? item?.fabrication?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.fabrication?.notch > 0 ? item?.fabrication?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.fabrication?.outages > 0 ? item?.fabrication?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getGenericFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.fabrication?.oneInchHoles > 0 ? item?.fabrication?.oneInchHoles : 0;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemHingeCut = item?.fabrication?.hingeCut > 0 ? item?.fabrication?.hingeCut : 0;

  hingeCut = count * selectedItemHingeCut;
  let selectedItemClampCut = item?.fabrication?.clampCut > 0 ? item?.fabrication?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.fabrication?.notch > 0 ? item?.fabrication?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.fabrication?.outages > 0 ? item?.fabrication?.outages : 0;

  outages = count * selectedItemOutages;

   return { oneInchHoles, hingeCut, clampCut, notch, outages};
};



export const getHardwareSpecificFabrication = (
  type,
  fabricationValues,
  currentHardware,
  newSelectedHardware
) => {
  let existingFabricationValues = {
    oneInchHoles: Number(fabricationValues.oneInchHoles),
    hingeCut: Number(fabricationValues.hingeCut),
    clampCut: Number(fabricationValues.clampCut),
    notch: Number(fabricationValues.notch),
    outages: Number(fabricationValues.outages),
  };
  let currentHardwareFabrication = null;

  if (currentHardware?.item) {
    if ([hardwareTypes.HANDLES].includes(type))
      currentHardwareFabrication = getHandleFabrication(
        currentHardware?.item,
        currentHardware?.count
      );
    else if ([hardwareTypes.HINGES].includes(type))
      currentHardwareFabrication = getHingeFabrication(
        currentHardware?.item,
        currentHardware?.count
      );
    else if ([hardwareTypes.DOORLOCK].includes(type))
        currentHardwareFabrication = getGenericFabrication(
          currentHardware?.item,
          currentHardware?.count
    );
    else if (
      [
        hardwareTypes.WALLCLAMP,
        // hardwareTypes.SLEEVEOVER,   // comment sleeve over here to use getGenericFabrication for calcluating its fabrication
        hardwareTypes.GLASSTOGLASS,
        hardwareTypes.CORNERWALLCLAMP,
        hardwareTypes.CORNERSLEEVEOVER,
        hardwareTypes.CORNERGLASSTOGLASS,
      ].includes(type)
    )
      currentHardwareFabrication = getGenericFabrication(
        currentHardware?.item,
        currentHardware?.count
      );
    else if ([hardwareTypes.CHANNEL].includes(type))
      currentHardwareFabrication = getGenericFabrication(
        currentHardware?.item,
        currentHardware?.count
      );
    else
      currentHardwareFabrication = getGenericFabrication(
        currentHardware?.item,
        currentHardware?.count
      );
  }

  if (currentHardwareFabrication) {
    existingFabricationValues.oneInchHoles -=
      currentHardwareFabrication.oneInchHoles;
    existingFabricationValues.hingeCut -= currentHardwareFabrication.hingeCut;
    existingFabricationValues.clampCut -= currentHardwareFabrication.clampCut;
    existingFabricationValues.notch -= currentHardwareFabrication.notch;
    existingFabricationValues.outages -= currentHardwareFabrication.outages; 
  }

  /* check to avoid negative value **/
  if (existingFabricationValues.oneInchHoles < 0)
    existingFabricationValues.oneInchHoles = 0;
  if (existingFabricationValues.hingeCut < 0)
    existingFabricationValues.hingeCut = 0;
  if (existingFabricationValues.clampCut < 0)
    existingFabricationValues.clampCut = 0;
  if (existingFabricationValues.notch < 0) existingFabricationValues.notch = 0;
  if (existingFabricationValues.outages < 0)
    existingFabricationValues.outages = 0;
   /* end **/

  if (newSelectedHardware) {
    let newSelectedHardwareFabrication = null;

    if (newSelectedHardware?.item) {
      if ([hardwareTypes.HANDLES].includes(type))
        newSelectedHardwareFabrication = getHandleFabrication(
          newSelectedHardware?.item,
          newSelectedHardware?.count
        );
      else if ([hardwareTypes.HINGES].includes(type))
        newSelectedHardwareFabrication = getHingeFabrication(
          newSelectedHardware?.item,
          newSelectedHardware?.count
        );
      else if ([hardwareTypes.DOORLOCK].includes(type))
        newSelectedHardwareFabrication = getGenericFabrication(
          newSelectedHardware?.item,
          newSelectedHardware?.count
        );
        else if (
          [
            hardwareTypes.WALLCLAMP,
            // hardwareTypes.SLEEVEOVER,   // comment sleeve over here to use getGenericFabrication for calcluating its fabrication
            hardwareTypes.GLASSTOGLASS,
            hardwareTypes.CORNERWALLCLAMP,
            hardwareTypes.CORNERSLEEVEOVER,
            hardwareTypes.CORNERGLASSTOGLASS,
          ].includes(type)
        )
          newSelectedHardwareFabrication = getGenericFabrication(
            newSelectedHardware?.item,
            newSelectedHardware?.count
          );
        else if ([hardwareTypes.CHANNEL].includes(type))
        newSelectedHardwareFabrication = getGenericFabrication(
          newSelectedHardware?.item,
          newSelectedHardware?.count
        );
      else
        newSelectedHardwareFabrication = getGenericFabrication(
          newSelectedHardware?.item,
          newSelectedHardware?.count
        );
    }

    if (newSelectedHardwareFabrication) {
      existingFabricationValues.oneInchHoles +=
      newSelectedHardwareFabrication.oneInchHoles;
    existingFabricationValues.hingeCut +=
      newSelectedHardwareFabrication.hingeCut;
    existingFabricationValues.clampCut +=
      newSelectedHardwareFabrication.clampCut;
    existingFabricationValues.notch += newSelectedHardwareFabrication.notch;
    existingFabricationValues.outages +=
      newSelectedHardwareFabrication.outages;
      }
  }

  return existingFabricationValues;
};