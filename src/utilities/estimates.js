import {
  getEstimateCategory,
  getEstimateState,
  getProjectId,
  setEstimateCategory,
  setEstimateState,
  setProjectId,
} from "@/redux/estimateSlice";
import {
  EstimateCategory,
  layoutVariants,
  notificationsVariant,
  panelOverWeightAmount,
  quoteState,
  thicknessTypes,
  userRoles,
} from "./constants";
import {
  addSelectedItem,
  getContent,
  getDoorWidth,
  getLayoutPerimeter,
  getisCustomizedDoorWidth,
  resetNotifications,
  resetState,
  setDoorWeight,
  setDoorWidth,
  setPanelWeight,
  setQuoteState,
  setReturnWeight,
  setShowerProjectId,
  setisCustomizedDoorWidth,
  updateMeasurements,
} from "@/redux/estimateCalculations";
import { calculateAreaAndPerimeter } from "./common";
import CustomImage from "../Assets/customlayoutimage.svg";
import { renderMeasurementSides as renderMeasurementSidesOfMirror } from "@/utilities/mirrorEstimates";
export const generateNotificationsForCurrentItem = (
  estimateState,
  calculatedGlassThickness = ""
) => {
  const reduxSelectedItem = estimateState.selectedItem;
  const reduxListData = estimateState.listData;
  let selectedContent = { ...estimateState.content };
  let notifications = { ...estimateState.notifications };
  const panelWeight = estimateState.panelWeight;
  const doorWeight = estimateState.doorWeight;
  const currentState = estimateState.quoteState;

  if (currentState === quoteState.CREATE) {
    if (selectedContent.handles?.item) {
      // generate handle not available notification in current finish
      const result = getHandleNotification(selectedContent);
      if (result?.handleNotAvailable)
        notifications.handleNotAvailable = result.handleNotAvailable;
      // if (result?.handles) selectedContent.handles = result.handles;
    }
    /** switch hinges if width increases layout defaults */
    const switchHingeResult = getSwitchHingeNotification(
      selectedContent,
      reduxSelectedItem,
      doorWeight,
      reduxListData
    );
    if (switchHingeResult?.hingesSwitch)
      notifications.hingesSwitch = switchHingeResult.hingesSwitch;
    if (switchHingeResult?.hinges)
      selectedContent.hinges = switchHingeResult.hinges;
    /** end */
    if (selectedContent.hinges?.item) {
      // generate hinges not available notification in current finish
      const result = getHingeNotification(selectedContent);
      if (result?.hingeNotAvailable)
        notifications.hingeNotAvailable = result.hingeNotAvailable;
      if (result?.hinges) selectedContent.hinges = result.hinges;
    }
    if (selectedContent.slidingDoorSystem?.item) {
      // generate sliding door system not available notification in current finish
      const result = getSlidingDoorSystemNotification(selectedContent);
      if (result?.slidingDoorSystemNotAvailable)
        notifications.slidingDoorSystemNotAvailable =
          result.slidingDoorSystemNotAvailable;
      if (result?.slidingDoorSystem)
        selectedContent.slidingDoorSystem = result.slidingDoorSystem;
    }
    if (selectedContent.header?.item) {
      // generate header type not available notification in current finish
      const result = getHeaderNotification(selectedContent);
      if (result?.headerNotAvailable)
        notifications.headerNotAvailable = result.headerNotAvailable;
      if (result?.header) selectedContent.header = result.header;
    }

    /** switch glass thickness if glass size is greater than provided */
    const thicknessShiftResult = getGlassThicknessShiftNotification(
      selectedContent,
      calculatedGlassThickness
    );
    if (thicknessShiftResult?.glassThicknessSwitch)
      notifications.glassThicknessSwitch =
        thicknessShiftResult.glassThicknessSwitch;
    if (thicknessShiftResult?.glassType)
      selectedContent.glassType = thicknessShiftResult.glassType;
    /** end */

    if (selectedContent.glassType?.item) {
      // generate glass type not available notification in current thickness
      const result = getGlassTypeNotification(selectedContent);
      if (result?.glassTypeNotAvailable)
        notifications.glassTypeNotAvailable = result.glassTypeNotAvailable;
      if (result?.glassType) selectedContent.glassType = result.glassType;
    }

    if (
      selectedContent.glassAddons.length &&
      selectedContent.glassAddons?.[0]?.options?.length &&
      selectedContent.glassAddons?.[0]?.options?.[0]?.status === false
    ) {
      const noGlassAddon = reduxListData.glassAddons?.find(
        (item) => item.slug === "no-treatment"
      );
      // set Notification
      notifications.glassAddonsNotAvailable = [
        {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Glass Addon ${selectedContent.glassAddons?.[0]?.name} is not available.`,
        },
      ];
      // Unselect content from slice
      selectedContent.glassAddons = [noGlassAddon];
    }

    /** Panel overweight notification */
    const panelOverWeightResult = getPanelOverWeightNotification(panelWeight);
    if (panelOverWeightResult?.panelOverweight)
      notifications.panelOverweight = panelOverWeightResult.panelOverweight;
    /** end */

    return { notifications, selectedContent };
  } else if (currentState === quoteState.CUSTOM) {
    if (selectedContent.glassType?.item) {
      // generate glass type not available notification in current thickness
      if (
        selectedContent.glassType.item?.options.find(
          (option) => option.thickness === thicknessTypes.THREEBYEIGHT
        )?.status === false
      ) {
        // set Notification
        notifications.glassTypeNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Glass type ${selectedContent.glassType.item?.name} is not available in thickness ${thicknessTypes.THREEBYEIGHT}.`,
        };
        // Unselect content from slice
        selectedContent.glassType = {
          item: null,
          thickness: thicknessTypes.THREEBYEIGHT,
        };
      }
    }
    return { notifications, selectedContent };
  } else if (currentState === quoteState.EDIT) {
    if (selectedContent.handles?.item) {
      // generate handle not available notification in current finish
      const result = getHandleNotification(selectedContent);
      if (result?.handleNotAvailable)
        notifications.handleNotAvailable = result.handleNotAvailable;
      if (result?.handles) selectedContent.handles = result.handles;
    }
    if (selectedContent.hinges?.item) {
      // generate hinges not available notification in current finish
      const result = getHingeNotification(selectedContent);
      if (result?.hingeNotAvailable)
        notifications.hingeNotAvailable = result.hingeNotAvailable;
      if (result?.hinges) selectedContent.hinges = result.hinges;
    }
    if (selectedContent.slidingDoorSystem?.item) {
      // generate sliding door system not available notification in current finish
      const result = getSlidingDoorSystemNotification(selectedContent);
      if (result?.slidingDoorSystemNotAvailable)
        notifications.slidingDoorSystemNotAvailable =
          result.slidingDoorSystemNotAvailable;
      if (result?.slidingDoorSystem)
        selectedContent.slidingDoorSystem = result.slidingDoorSystem;
    }
    if (selectedContent.header?.item) {
      // generate header type not available notification in current finish
      const result = getHeaderNotification(selectedContent);
      if (result?.headerNotAvailable)
        notifications.headerNotAvailable = result.headerNotAvailable;
      if (result?.header) selectedContent.header = result.header;
    }
    if (selectedContent.glassType?.item) {
      // generate glass type not available notification in current thickness
      const result = getGlassTypeNotification(selectedContent);
      if (result?.glassTypeNotAvailable)
        notifications.glassTypeNotAvailable = result.glassTypeNotAvailable;
      if (result?.glassType) selectedContent.glassType = result.glassType;
    }
    /** switch glass thickness if glass size is greater than provided */
    const thicknessShiftResult = getGlassThicknessShiftNotification(
      selectedContent,
      calculatedGlassThickness
    );
    if (thicknessShiftResult?.glassThicknessSwitch)
      notifications.glassThicknessSwitch =
        thicknessShiftResult.glassThicknessSwitch;
    if (thicknessShiftResult?.glassType)
      selectedContent.glassType = thicknessShiftResult.glassType;
    /** end */
    /** Panel overweight notification */
    const panelOverWeightResult = getPanelOverWeightNotification(panelWeight);
    if (panelOverWeightResult?.panelOverweight)
      notifications.panelOverweight = panelOverWeightResult.panelOverweight;
    /** end */
    return { notifications, selectedContent };
  } else {
    return { notifications, selectedContent };
  }
};

const getHandleNotification = (selectedContent) => {
  if (
    selectedContent.handles.item?.finishes.find(
      (row) => row.finish_id === selectedContent.hardwareFinishes?._id
    )?.status === false
  ) {
    // set Notification
    const handleNotAvailable = {
      status: true,
      variant: notificationsVariant.WARNING,
      message: `Handle ${selectedContent.handles.item?.name} is not available in finish ${selectedContent.hardwareFinishes?.name}.`,
    };
    // Unselect content from slice
    const handles = {
      ...selectedContent.handles,
      item: null,
    };
    return { handleNotAvailable, handles };
  } else {
    return null;
  }
};

const getHingeNotification = (selectedContent) => {
  if (
    selectedContent.hinges.item?.finishes.find(
      (row) => row.finish_id === selectedContent.hardwareFinishes?._id
    )?.status === false
  ) {
    // set Notification
    const hingeNotAvailable = {
      status: true,
      variant: notificationsVariant.WARNING,
      message: `Hinge ${selectedContent.hinges.item?.name} is not available in finish ${selectedContent.hardwareFinishes?.name}.`,
    };
    // Unselect content from slice
    const hinges = {
      ...selectedContent.hinges,
      item: null,
    };
    return { hingeNotAvailable, hinges };
  } else {
    return null;
  }
};

const getSlidingDoorSystemNotification = (selectedContent) => {
  if (
    selectedContent.slidingDoorSystem.item?.finishes.find(
      (row) => row.finish_id === selectedContent.hardwareFinishes?._id
    )?.status === false
  ) {
    // set Notification
    const slidingDoorSystemNotAvailable = {
      status: true,
      variant: notificationsVariant.WARNING,
      message: `Sliding Door System ${selectedContent.slidingDoorSystem.item?.name} is not available in finish ${selectedContent.hardwareFinishes?.name}.`,
    };
    // Unselect content from slice
    const slidingDoorSystem = {
      ...selectedContent.slidingDoorSystem,
      item: null,
    };
    return { slidingDoorSystemNotAvailable, slidingDoorSystem };
  } else {
    return null;
  }
};

const getHeaderNotification = (selectedContent) => {
  if (
    selectedContent.header.item?.finishes.find(
      (row) => row.finish_id === selectedContent.hardwareFinishes?._id
    )?.status === false
  ) {
    // set Notification
    const headerNotAvailable = {
      status: true,
      variant: notificationsVariant.WARNING,
      message: `Header ${selectedContent.header.item?.name} is not available in finish ${selectedContent.hardwareFinishes?.name}.`,
    };
    // Unselect content from slice
    const header = {
      ...selectedContent.header,
      item: null,
    };
    return { headerNotAvailable, header };
  } else {
    return null;
  }
};

const getGlassTypeNotification = (selectedContent) => {
  if (
    selectedContent.glassType.item?.options.find(
      (option) => option.thickness === selectedContent.glassType?.thickness
    )?.status === false
  ) {
    // set Notification
    const glassTypeNotAvailable = {
      status: true,
      variant: notificationsVariant.WARNING,
      message: `Glass type ${selectedContent.glassType.item?.name} is not available in thickness ${selectedContent.glassType?.thickness}.`,
    };
    // Unselect content from slice
    const glassType = {
      ...selectedContent.glassType,
      item: null,
    };
    return { glassTypeNotAvailable, glassType };
  } else {
    return null;
  }
};

const getGlassThicknessShiftNotification = (
  selectedContent,
  calculatedGlassThickness
) => {
  if (
    calculatedGlassThickness &&
    calculatedGlassThickness === thicknessTypes.ONEBYTWO
  ) {
    //set notification
    const glassThicknessSwitch = {
      status: true,
      variant: notificationsVariant.INFO,
      message: `Glass thickness switched from ${thicknessTypes.THREEBYEIGHT} to ${thicknessTypes.ONEBYTWO}`,
    };
    // set glass thickness
    const glassType = {
      ...selectedContent.glassType,
      thickness: calculatedGlassThickness,
    };
    return { glassThicknessSwitch, glassType };
  } else {
    return null;
  }
};

const getPanelOverWeightNotification = (panelWeight) => {
  if (panelWeight > panelOverWeightAmount) {
    const panelOverweight = {
      status: true,
      variant: notificationsVariant.INFO,
      message: `Panel weight is over ${panelOverWeightAmount}lb check your labor`,
    };
    return { panelOverweight };
  } else {
    return null;
  }
};

const getSwitchHingeNotification = (
  selectedContent,
  reduxSelectedItem,
  doorWeight,
  reduxListData
) => {
  console.log(
    "hinges switch",
    doorWeight > (reduxSelectedItem?.settings?.heavyDutyOption?.height || 80),
    doorWeight,
    reduxSelectedItem?.settings?.heavyDutyOption?.height || 80
  );
  if (
    // reduxSelectedItem?.settings?.heavyDutyOption?.threshold > 0 &&
    // doorWidth > reduxSelectedItem?.settings?.heavyDutyOption?.threshold
    doorWeight > (reduxSelectedItem?.settings?.heavyDutyOption?.height || 80)
  ) {
    let hinge = reduxListData?.hinges?.find(
      (item) =>
        item._id === reduxSelectedItem?.settings?.heavyDutyOption?.heavyDutyType
    );
    if (hinge) {
      // set Notification
      const hingesSwitch = {
        status: true,
        variant: notificationsVariant.WARNING,
        message: `Hinges switched from standard to heavy`,
      };
      // Unselect content from slice
      const hinges = {
        ...selectedContent.hinges,
        item: hinge,
      };
      return { hingesSwitch, hinges };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const generateObjectForPDFPreview = (
  listData,
  estimateData,
  showerMiscPricing
) => {
  console.log(listData, estimateData, showerMiscPricing, "sdsdsdsddd");
  let estimateInfoObject;
  let hardwareFinishes = null;
  hardwareFinishes = listData?.hardwareFinishes?.find(
    (item) => item._id === estimateData?.config?.hardwareFinishes
  );
  let handleType = null;
  handleType = listData?.handles?.find(
    (item) => item._id === estimateData?.config?.handles?.type
  );
  let doorLock = null;
  doorLock = listData?.doorLocks?.find(
    (item) => item._id === estimateData?.config?.doorLock?.type
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
    doorLock: {
      item: doorLock,
      count: estimateData?.config?.doorLock?.count,
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
      wallClamp: wallClampArray ? [...wallClampArray] : [],
      sleeveOver: sleeveOverArray ? [...sleeveOverArray] : [],
      glassToGlass: glassToGlassArray ? [...glassToGlassArray] : [],
    },
    cornerClamps: {
      cornerWallClamp: cornerWallClampArray ? [...cornerWallClampArray] : [],
      cornerSleeveOver: cornerSleeveOverArray ? [...cornerSleeveOverArray] : [],
      cornerGlassToGlass: cornerGlassToGlassArray
        ? [...cornerGlassToGlassArray]
        : [],
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
    hardwareAddons: hardwareAddons ? [...hardwareAddons] : [],
    oneInchHoles: estimateData?.config?.oneInchHoles,
    hingeCut: estimateData?.config?.hingeCut,
    clampCut: estimateData?.config?.clampCut,
    notch: estimateData?.config?.notch,
    outages: estimateData?.config?.outages,
    mitre: estimateData?.config?.mitre,
    polish: estimateData?.config?.polish,
    people: estimateData?.config?.people,
    hours: estimateData?.config?.hours,
    laborHoursForDoor: estimateData?.config?.laborHoursForDoor ?? 0,
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

export const renderMeasurementSides = (quoteState, measurements, layoutID) => {
  let result = "";
  if ((quoteState === "create" || quoteState === "edit") && layoutID) {
    result = measurements
      .filter(
        (measurement) => measurement.value !== null && measurement.value !== ""
      )
      .map((measurement) => measurement.value)
      .join("’’/ ");
  } else if (quoteState === "edit" || quoteState === "custom") {
    Object.entries(measurements).forEach(([key, value]) => {
      const { count, width, height } = value;

      // Iterate until the count value of the current element is reached
      for (let i = 1; i <= count; i++) {
        result += `${width}'' / ${height}'' `;
        // Perform any other operations with the current element and count value

        if (i === count) {
          break; // Exit the loop when the count value is reached
        }
      }
    });
    // Object.entries(measurements).forEach(([key, value]) => {
    //   result += `${value["width"]}’’ / ${value["height"]}’’  `;
    // });
  }
  return result;
};

export const setStateForShowerEstimate = (
  item,
  dispatch,
  navigate,
  flag = true
) => {
  // if (item?.category === EstimateCategory.SHOWERS) {
  dispatch(resetNotifications());
  dispatch(setEstimateCategory(EstimateCategory.SHOWERS));
  dispatch(setEstimateState(quoteState.EDIT));
  dispatch(resetState());
  dispatch(setisCustomizedDoorWidth(item.config.isCustomizedDoorWidth));
  dispatch(updateMeasurements(item.config.measurements));
  dispatch(addSelectedItem(item));
  dispatch(setShowerProjectId(item?.project_id));
  dispatch(setQuoteState("edit"));
  const result = calculateAreaAndPerimeter(
    item.config.measurements,
    item?.settings?.variant,
    item.config.glassType.thickness
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
  // navigate(`/estimates/dimensions`);
  if (flag) {
    navigate(
      `/estimates/dimensions?category=${EstimateCategory.SHOWERS}&projectId=${item?.project_id}&quoteState=${quoteState.EDIT}&estimateId=${item?._id}&layoutId=${item?.config?.layout_id}`
    );
  }
  // }
};

export const showEditButtonForEstimateStatus = (decryptedToken) => {
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

export const generateObjectForPDFRuntime = (
  state,
  showerState,
  showersLocationSettings
) => {
  console.log(showerState, state, "showerStateshowerState");
  return {
    category: state.selectedCategory,
    companyData: {},
    cost: showerState.totalPrice,
    customerData: state?.customerData,
    project_id: state.projectId,
    settings: {
      name:
        state.estimateState === quoteState.CREATE
          ? showerState?.selectedItem?.name
          : showerState?.selectedItem?.settings?.name,
      image:
        state.estimateState === quoteState.CREATE
          ? showerState?.selectedItem?.image
          : showerState?.selectedItem?.settings?.image,
    },
    additionalFields: showerState?.content?.additionalFields,
    clampCut: showerState?.content?.clampCut,
    cornerClamps: showerState?.content?.cornerClamps,
    doorWidth: showerState?.doorWidth,
    glassType: showerState?.content?.glassType,
    glassAddons: showerState?.content?.glassAddons,
    handles: showerState?.content?.handles,
    doorLock: showerState?.content?.doorLock,
    hardwareAddons: showerState?.content?.hardwareAddons,
    hardwareFinishes: showerState?.content?.hardwareFinishes,
    header: showerState?.content?.header,
    hingeCut: showerState?.content?.hingeCut,
    hinges: showerState?.content?.hinges,
    hours: showerState?.content?.hours,
    laborHoursForDoor: showerState?.content?.laborHoursForDoor ?? 0,
    people: showerState?.content?.people,
    mitre: showerState?.content?.mitre,
    mountingChannel: showerState?.content?.mountingChannel,
    mountingClamps: showerState?.content?.mountingClamps,
    mountingState: showerState?.content?.mountingState,
    outages: showerState?.content?.outages,
    slidingDoorSystem: showerState?.content?.slidingDoorSystem,
    userProfitPercentage: showerState?.content?.userProfitPercentage,
    sqftArea: showerState?.sqftArea,
    polish: showerState?.content?.polish,
    oneInchHoles: showerState?.content?.oneInchHoles,
    notch: showerState?.content?.notch,
    oneInchHoles: showerState?.content?.oneInchHoles,
    slidingDoorSystem: showerState?.content?.slidingDoorSystem,
    isCustomizedDoorWidth: showerState?.isCustomizedDoorWidth,
    layout_id:
      state.estimateState === quoteState.CREATE
        ? showerState?.selectedItem?._id
        : showerState?.selectedItem?.settings?._id,
    perimeter: showerState?.perimeter,
    measurements: showerState?.measurements,
    updatedAt: new Date(),
    pricingFactor: showersLocationSettings?.miscPricing?.pricingFactor,
    panelWeight: showerState.panelWeight,
    doorWeight: showerState.doorWeight,
    returnWeight: showerState.returnWeight,
  };
};

export const generateObjForMirrorPDFRuntime = (
  state,
  mirrorState,
  mirrorsLocationSettings
) => {
  return {
    additionalFields: mirrorState?.content?.additionalFields,
    category: state.selectedCategory,
    cost: mirrorState?.pricing?.total,
    creatorData: {},
    customerData: state.customerData,
    doubleOutletCutout: mirrorState?.content?.doubleOutletCutout,
    edgeWork: mirrorState?.content?.edgeWork,
    glassType: mirrorState?.content?.glassType,
    glassAddons: mirrorState?.content?.glassAddons,
    hardwares: mirrorState?.content?.hardwares,
    hours: mirrorState?.content?.hours,
    layout_id: null,
    lightHoles: mirrorState?.content?.lightHoles,
    measurements: mirrorState?.measurements,
    notch: mirrorState?.content?.notch,
    people: mirrorState?.content?.people,
    pricingFactor: mirrorsLocationSettings?.miscPricing?.pricingFactor,
    project_id: state.projectId,
    quadOutletCutout: mirrorState?.content?.quadOutletCutout,
    settings: {},
    simpleHoles: mirrorState?.content?.simpleHoles,
    modifiedProfitPercentage: mirrorState?.content?.modifiedProfitPercentage,
    singleOutletCutout: mirrorState?.content?.singleOutletCutout,
    sqftArea: mirrorState?.sqftArea,
    tripleOutletCutout: mirrorState?.content?.tripleOutletCutout,
    updatedAt: new Date(),
  };
};

export const generateInvoiceItemsFromEstimates = (
  estimatesList,
  hardwaresList,
  companySettings
) => {
  let items = [];
  estimatesList.forEach(async (estimate) => {
    switch (estimate.category) {
      case EstimateCategory.SHOWERS:
        const showerResp = await generateInvoiceItemForShowers(
          estimate,
          hardwaresList.showers,
          companySettings.showers
        );
        items.push(showerResp);
        break;
      case EstimateCategory.MIRRORS:
        const mirrorResp = await generateInvoiceItemForMirrors(
          estimate,
          hardwaresList.mirrors,
          companySettings.mirrors
        );
        items.push(mirrorResp);
        break;
      case EstimateCategory.WINECELLARS:
        const wineCellarResp = await generateInvoiceItemForWineCellars(
          estimate,
          hardwaresList.wineCellars,
          companySettings.wineCellars
        );
        items.push(wineCellarResp);
        break;
      default:
        break;
    }
  });
  return items;
};

const generateInvoiceItemForShowers = async (
  estimate,
  hardwaresList,
  companySettings
) => {
  let summaryObject = {};
  let hardwarePrice = 0;
  let glassPrice = 0;
  let glassAddonPrice = 0;
  const measurementString = renderMeasurementSides(
    quoteState.EDIT,
    estimate.config.measurements,
    estimate.config.layout_id
  );
  summaryObject.estimate_id= estimate._id;
  summaryObject.config= estimate;
  summaryObject.name= estimate.name;
  summaryObject.label= estimate.label;
  summaryObject.category= estimate.category;
  summaryObject.measurements = measurementString;
  summaryObject.doorWidth = estimate.config.doorWidth;
  summaryObject.layout = estimate?.settings?.name ?? "Custom shower";
  summaryObject.image = estimate?.settings?.image ?? null;
  summaryObject.sqftArea = estimate.config?.sqftArea;
  summaryObject.perimeter = estimate.config?.perimeter;
  summaryObject.oneInchHoles = estimate.config.oneInchHoles;
  summaryObject.hingeCut = estimate.config.hingeCut;
  summaryObject.clampCut = estimate.config.clampCut;
  summaryObject.notch = estimate.config.notch;
  summaryObject.outages = estimate.config.outages;
  summaryObject.mitre = estimate.config.mitre;
  summaryObject.polish = estimate.config.polish;
  summaryObject.people = estimate.config.people;
  summaryObject.hours = estimate.config.hours;
  summaryObject.additionalFields = estimate.config.additionalFields;
  summaryObject.creatorData = estimate.creatorData;
  summaryObject.customerData = estimate.customerData;
  // hardware finish
  const hardwareFinish = hardwaresList.hardwareFinishes.find(
    (item) => item._id === estimate.config.hardwareFinishes
  );
  if (hardwareFinish) {
    summaryObject.hardwareFinish = hardwareFinish.name;
  }
  // handle
  const handle = hardwaresList.handles.find(
    (item) => item._id === estimate.config?.handles?.type
  );
  if (handle) {
    summaryObject.handle = {
      type: handle.name,
      count: estimate.config?.handles?.count,
    };
    const handlePrice =
      (handle?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.handles?.count || 0);
    hardwarePrice += handlePrice;
  }
  // hinge
  const hinge = hardwaresList.hinges.find(
    (item) => item._id === estimate.config?.hinges?.type
  );
  if (hinge) {
    summaryObject.hinge = {
      type: handle.name,
      count: estimate.config?.hinges?.count,
    };
    const hingePrice =
      (hinge?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.hinges?.count || 0);
    hardwarePrice += hingePrice;
  }
  // Mounting clamp wall clamp
  if (estimate.config.mountingClamps?.wallClamp?.length) {
    let data = [];
    estimate.config.mountingClamps?.wallClamp?.forEach((item) => {
      const record = hardwaresList.wallClamp.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      wallClamp: data,
    };
  } else {
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      wallClamp: [],
    };
  }
  // Mounting clamp sleeve over
  if (estimate.config.mountingClamps?.sleeveOver?.length) {
    let data = [];
    estimate.config.mountingClamps?.sleeveOver?.forEach((item) => {
      const record = hardwaresList.sleeveOver.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      sleeveOver: data,
    };
  } else {
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      sleeveOver: [],
    };
  }
  // Mounting clamp Glass to Glass
  if (estimate.config.mountingClamps?.glassToGlass?.length) {
    let data = [];
    estimate.config.mountingClamps?.glassToGlass?.forEach((item) => {
      const record = hardwaresList.glassToGlass.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      glassToGlass: data,
    };
  } else {
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      glassToGlass: [],
    };
  }
  // Corner Wall clamp
  if (estimate.config.cornerClamps?.wallClamp?.length) {
    let data = [];
    estimate.config.cornerClamps?.wallClamp?.forEach((item) => {
      const record = hardwaresList.cornerWallClamp.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      wallClamp: data,
    };
  } else {
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      wallClamp: [],
    };
  }
  // Corner Sleeve over
  if (estimate.config.cornerClamps?.sleeveOver?.length) {
    let data = [];
    estimate.config.cornerClamps?.sleeveOver?.forEach((item) => {
      const record = hardwaresList.cornerSleeveOver.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      sleeveOver: data,
    };
  } else {
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      sleeveOver: [],
    };
  }
  // Corner Glass to Glass
  if (estimate.config.cornerClamps?.glassToGlass?.length) {
    let data = [];
    estimate.config.cornerClamps?.glassToGlass?.forEach((item) => {
      const record = hardwaresList.cornerGlassToGlass.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      glassToGlass: data,
    };
  } else {
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      glassToGlass: [],
    };
  }
  // mounting channel
  const mountingChannel = hardwaresList.mountingChannel.find(
    (item) => item._id === estimate.config?.mountingChannel
  );
  if (mountingChannel) {
    summaryObject.mountingChannel = mountingChannel.name;
    const price =
      (mountingChannel?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * 1;
    hardwarePrice += price;
  } else {
    summaryObject.mountingChannel = null;
  }
  // glass Type
  const glassType = hardwaresList.glassType.find(
    (item) => item._id === estimate.config?.glassType?.type
  );
  if (glassType) {
    summaryObject.glassType = {
      type: glassType.name,
      thickness: estimate.config?.glassType?.thickness,
    };
    const price =
      (glassType?.options?.find(
        (glass) => glass.thickness === estimate.config?.glassType?.thickness
      )?.cost || 0) * estimate.config?.sqftArea;
    glassPrice = price;
  }
  // glassAddons
  let glassAddonsNameArray = [];
  estimate.config?.glassAddons?.forEach((glassAddonId) => {
    const item = hardwaresList.glassAddons.find(
      (_item) => _item._id === glassAddonId
    );
    if (item) {
      glassAddonsNameArray.push(item.name);
      glassAddonPrice +=
        (item?.options[0]?.cost || 0) * estimate.config?.sqftArea;
    }
  });

  summaryObject.glassAddons = glassAddonsNameArray;

  // sliding Door System
  const slidingDoorSystem = hardwaresList.slidingDoorSystem.find(
    (item) => item._id === estimate.config?.slidingDoorSystem?.type
  );
  if (slidingDoorSystem) {
    summaryObject.slidingDoorSystem = {
      type: slidingDoorSystem.name,
      count: estimate.config?.slidingDoorSystem?.count,
    };
    const price =
      (slidingDoorSystem?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.slidingDoorSystem?.count || 0);
    hardwarePrice += price;
  }
  // header
  const header = hardwaresList.header.find(
    (item) => item._id === estimate.config?.header?.type
  );
  if (header) {
    summaryObject.header = {
      type: header.name,
      count: estimate.config?.header?.count,
    };
    const price =
      (header?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.header?.count || 0);
    hardwarePrice += price;
  }
  //hardwareAddons
  if (estimate.config?.hardwareAddons?.length) {
    let data = [];
    estimate.config?.hardwareAddons?.forEach((item) => {
      const record = hardwaresList.hardwareAddons.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.hardwareAddons = data;
  } else {
    summaryObject.hardwareAddons = [];
  }
  // fabrication price
  let fabricationPrice = 0;
  if (estimate.config?.glassType?.thickness === thicknessTypes.ONEBYTWO) {
    fabricationPrice =
      Number(estimate.config?.oneInchHoles ?? 0) *
        (companySettings?.fabricatingPricing?.oneHoleOneByTwoInchGlass ?? 0) +
      Number(estimate.config?.hingeCut ?? 0) *
        (companySettings?.fabricatingPricing?.hingeCutoutOneByTwoInch ?? 0) +
      Number(estimate.config?.clampCut ?? 0) *
        (companySettings?.fabricatingPricing?.clampCutoutOneByTwoInch ?? 0) +
      Number(estimate.config?.notch ?? 0) *
        (companySettings?.fabricatingPricing?.notchOneByTwoInch ?? 0) +
      Number(estimate.config?.outages ?? 0) *
        (companySettings?.fabricatingPricing?.outageOneByTwoInch ?? 0) +
      Number(estimate.config?.mitre ?? 0) *
        (companySettings?.fabricatingPricing?.miterOneByTwoInch ?? 0) +
      Number(estimate.config?.polish ?? 0) *
        (companySettings?.fabricatingPricing?.polishPricePerOneByTwoInch ?? 0);
  } else if (
    estimate.config?.glassType?.thickness === thicknessTypes.THREEBYEIGHT
  ) {
    fabricationPrice =
      Number(estimate.config?.oneInchHoles ?? 0) *
        (companySettings?.fabricatingPricing?.oneHoleThreeByEightInchGlass ??
          0) +
      Number(estimate.config?.hingeCut ?? 0) *
        (companySettings?.fabricatingPricing?.hingeCutoutThreeByEightInch ??
          0) +
      Number(estimate.config?.clampCut ?? 0) *
        (companySettings?.fabricatingPricing?.clampCutoutThreeByEightInch ??
          0) +
      Number(estimate.config?.notch ?? 0) *
        (companySettings?.fabricatingPricing?.notchThreeByEightInch ?? 0) +
      Number(estimate.config?.outages ?? 0) *
        (companySettings?.fabricatingPricing?.outageThreeByEightInch ?? 0) +
      Number(estimate.config?.mitre ?? 0) *
        (companySettings?.fabricatingPricing?.miterThreeByEightInch ?? 0) +
      Number(estimate.config?.polish ?? 0) *
        (companySettings?.fabricatingPricing?.polishPricePerThreeByEightInch ??
          0);
  }
  const laborPrice =
    estimate.config?.people *
    estimate.config?.hours *
    (companySettings?.miscPricing?.hourlyRate ?? 0);
  let totalPrice =
    (hardwarePrice + fabricationPrice + glassPrice + glassAddonPrice) *
      (companySettings?.miscPricing?.pricingFactorStatus
        ? companySettings?.miscPricing?.pricingFactor
        : 1) +
    laborPrice;
  if (estimate.config?.additionalFields?.length > 0) {
    totalPrice += estimate.config.additionalFields.reduce(
      (acc, item) =>
        acc +
        Number(
          item.cost *
            (companySettings?.miscPricing?.pricingFactorStatus
              ? companySettings?.miscPricing?.pricingFactor
              : 1)
        ),
      0
    );
  }
  summaryObject.pricing = {
    hardwarePrice,
    fabricationPrice,
    glassPrice,
    glassAddonPrice,
    laborPrice,
    totalPrice,
  };
  return summaryObject;
};

const generateInvoiceItemForMirrors = async (
  estimate,
  hardwaresList,
  companySettings
) => {
  let summaryObject = {};
  let hardwarePrice = 0;
  let glassPrice = 0;
  let edgeWorkPrice = 0;
  let glassAddonPrice = 0;
  const measurementString = renderMeasurementSidesOfMirror(
    estimate.config?.measurements
  );
  summaryObject.estimate_id= estimate._id;
  summaryObject.config= estimate;
  summaryObject.name= estimate.name;
  summaryObject.label= estimate.label;
  summaryObject.category= estimate.category;
  summaryObject.measurements = measurementString;
  summaryObject.layout = "Mirror";
  summaryObject.image = null;
  summaryObject.sqftArea = estimate.config?.sqftArea;
  summaryObject.simpleHoles = estimate.config.simpleHoles;
  summaryObject.lightHoles = estimate.config.lightHoles;
  summaryObject.notch = estimate.config.notch;
  summaryObject.singleOutletCutout = estimate.config.singleOutletCutout;
  summaryObject.doubleOutletCutout = estimate.config.doubleOutletCutout;
  summaryObject.tripleOutletCutout = estimate.config.tripleOutletCutout;
  summaryObject.quadOutletCutout = estimate.config.quadOutletCutout;
  summaryObject.people = estimate.config.people;
  summaryObject.hours = estimate.config.hours;
  summaryObject.additionalFields = estimate.config.additionalFields;
  summaryObject.creatorData = estimate.creatorData;
  summaryObject.customerData = estimate.customerData;

  // glass Type
  const glassType = hardwaresList.glassTypes.find(
    (item) => item._id === estimate.config?.glassType?.type
  );
  if (glassType) {
    summaryObject.glassType = {
      type: glassType.name,
      thickness: estimate.config?.glassType?.thickness,
    };
    const price =
      (glassType?.options?.find(
        (glass) => glass.thickness === estimate.config?.glassType?.thickness
      )?.cost || 0) * estimate.config?.sqftArea;
    glassPrice = price;
  }
  // edgeWork
  const edgeWork = hardwaresList.edgeWorks.find(
    (item) => item._id === estimate.config?.edgeWork?.type
  );
  if (edgeWork) {
    summaryObject.edgeWork = {
      type: edgeWork.name,
      thickness: estimate.config?.edgeWork?.thickness,
    };
    const price =
      (edgeWork?.options?.find(
        (glass) => glass.thickness === estimate.config?.edgeWork?.thickness
      )?.cost || 0);
      estimate.config?.measurements.forEach((value) => {
        const count = value.count;
        const width = value.width;
        const height = value.height;
        for (let i = 0; i < count; i++) {
          const value = price * (width * 2 + height * 2) * 1;
          edgeWorkPrice += value;
        }
      });
    // edgeWorkPrice = price;
  }
  // glassAddons
  let glassAddonsNameArray = [];
  estimate.config?.glassAddons?.forEach((glassAddonId) => {
    const item = hardwaresList.glassAddons.find(
      (_item) => _item._id === glassAddonId
    );
    if (item) {
      glassAddonsNameArray.push(item.name);
      glassAddonPrice +=
        (item?.options[0]?.cost || 0) * estimate.config?.sqftArea;
    }
  });

  summaryObject.glassAddons = glassAddonsNameArray;

  //hardwares
  if (estimate.config?.hardwares?.length) {
    let data = [];
    estimate.config?.hardwares?.forEach((item) => {
      const record = hardwaresList.hardwares.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price = (record?.options[0]?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.hardwareAddons = data;
  } else {
    summaryObject.hardwareAddons = [];
  }

  // fabrication price
  let fabricationPrice = 0;
  fabricationPrice =
    (estimate.config?.simpleHoles ?? 0) *
      (companySettings?.holeMultiplier ?? 0) +
    (estimate.config?.lightHoles ?? 0) *
      (companySettings?.lightHoleMultiplier ?? 0) +
    (estimate.config?.notch ?? 0) * (companySettings?.notchMultiplier ?? 0) +
    (estimate.config?.singleOutletCutout ?? 0) *
      (companySettings?.singleOutletCutoutMultiplier ?? 0) +
    (estimate.config?.doubleOutletCutout ?? 0) *
      (companySettings?.doubleOutletCutoutMultiplier ?? 0) +
    (estimate.config?.tripleOutletCutout ?? 0) *
      (companySettings?.tripleOutletCutoutMultiplier ?? 0) +
    (estimate.config.quadOutletCutout ?? 0) *
      (companySettings?.quadOutletCutoutMultiplier ?? 0) ;

    fabricationPrice +=  edgeWorkPrice;

    console.log(fabricationPrice,edgeWorkPrice,'fabricationPricefabricationPrice',edgeWork)

  const laborPrice =
    estimate.config?.people *
    estimate.config?.hours *
    (companySettings?.hourlyRate ?? 0);
  let totalPrice =
    (hardwarePrice + fabricationPrice + glassPrice + glassAddonPrice) *
      (companySettings?.pricingFactorStatus
        ? companySettings?.pricingFactor
        : 1) +
    laborPrice;
  if (estimate.config?.additionalFields?.length > 0) {
    totalPrice += estimate.config.additionalFields.reduce(
      (acc, item) =>
        acc +
        Number(
          item.cost *
            (companySettings?.pricingFactorStatus
              ? companySettings?.pricingFactor
              : 1)
        ),
      0
    );
  }
  summaryObject.pricing = {
    hardwarePrice,
    fabricationPrice,
    glassPrice,
    glassAddonPrice,
    laborPrice,
    totalPrice,
  };
  return summaryObject;
};

const generateInvoiceItemForWineCellars = async (
  estimate,
  hardwaresList,
  companySettings
) => {
  let summaryObject = {};
  let hardwarePrice = 0;
  let glassPrice = 0;
  let glassAddonPrice = 0;
  const measurementString = renderMeasurementSides(
    quoteState.EDIT,
    estimate.config.measurements,
    estimate.config.layout_id
  );
  summaryObject.estimate_id= estimate._id;
  summaryObject.config= estimate;
  summaryObject.name= estimate.name;
  summaryObject.label= estimate.label;
  summaryObject.category= estimate.category;
  summaryObject.measurements = measurementString;
  summaryObject.doorWidth = estimate.config.doorWidth;
  summaryObject.layout = estimate?.settings?.name ?? "Custom shower";
  summaryObject.image = estimate?.settings?.image ?? null;
  summaryObject.sqftArea = estimate.config?.sqftArea;
  summaryObject.perimeter = estimate.config?.perimeter;
  summaryObject.oneInchHoles = estimate.config.oneInchHoles;
  summaryObject.hingeCut = estimate.config.hingeCut;
  summaryObject.clampCut = estimate.config.clampCut;
  summaryObject.notch = estimate.config.notch;
  summaryObject.outages = estimate.config.outages;
  summaryObject.mitre = estimate.config.mitre;
  summaryObject.polish = estimate.config.polish;
  summaryObject.people = estimate.config.people;
  summaryObject.hours = estimate.config.hours;
  summaryObject.laborHoursForDoor = estimate.config.laborHoursForDoor;
  summaryObject.additionalFields = estimate.config.additionalFields;
  summaryObject.creatorData = estimate.creatorData;
  summaryObject.customerData = estimate.customerData;
  // hardware finish
  const hardwareFinish = hardwaresList.hardwareFinishes.find(
    (item) => item._id === estimate.config.hardwareFinishes
  );
  if (hardwareFinish) {
    summaryObject.hardwareFinish = hardwareFinish.name;
  }
  // handle
  const handle = hardwaresList.handles.find(
    (item) => item._id === estimate.config?.handles?.type
  );
  if (handle) {
    summaryObject.handle = {
      type: handle.name,
      count: estimate.config?.handles?.count,
    };
    const handlePrice =
      (handle?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.handles?.count || 0);
    hardwarePrice += handlePrice;
  }
  // hinge
  const hinge = hardwaresList.hinges.find(
    (item) => item._id === estimate.config?.hinges?.type
  );
  if (hinge) {
    summaryObject.hinge = {
      type: handle.name,
      count: estimate.config?.hinges?.count,
    };
    const hingePrice =
      (hinge?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.hinges?.count || 0);
    hardwarePrice += hingePrice;
  }
  // door lock
  const doorLock = hardwaresList.doorLocks.find(
    (item) => item._id === estimate.config?.doorLock?.type
  );
  if (doorLock) {
    summaryObject.doorLock = {
      type: doorLock.name,
      count: estimate.config?.doorLock?.count,
    };
    const price =
      (doorLock?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.doorLock?.count || 0);
    hardwarePrice += price;
  }
  // Mounting clamp wall clamp
  if (estimate.config.mountingClamps?.wallClamp?.length) {
    let data = [];
    estimate.config.mountingClamps?.wallClamp?.forEach((item) => {
      const record = hardwaresList.wallClamp.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      wallClamp: data,
    };
  } else {
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      wallClamp: [],
    };
  }
  // Mounting clamp sleeve over
  if (estimate.config.mountingClamps?.sleeveOver?.length) {
    let data = [];
    estimate.config.mountingClamps?.sleeveOver?.forEach((item) => {
      const record = hardwaresList.sleeveOver.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      sleeveOver: data,
    };
  } else {
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      sleeveOver: [],
    };
  }
  // Mounting clamp Glass to Glass
  if (estimate.config.mountingClamps?.glassToGlass?.length) {
    let data = [];
    estimate.config.mountingClamps?.glassToGlass?.forEach((item) => {
      const record = hardwaresList.glassToGlass.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      glassToGlass: data,
    };
  } else {
    summaryObject.mountingClamps = {
      ...summaryObject.mountingClamps,
      glassToGlass: [],
    };
  }
  // Corner Wall clamp
  if (estimate.config.cornerClamps?.wallClamp?.length) {
    let data = [];
    estimate.config.cornerClamps?.wallClamp?.forEach((item) => {
      const record = hardwaresList.cornerWallClamp.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      wallClamp: data,
    };
  } else {
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      wallClamp: [],
    };
  }
  // Corner Sleeve over
  if (estimate.config.cornerClamps?.sleeveOver?.length) {
    let data = [];
    estimate.config.cornerClamps?.sleeveOver?.forEach((item) => {
      const record = hardwaresList.cornerSleeveOver.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      sleeveOver: data,
    };
  } else {
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      sleeveOver: [],
    };
  }
  // Corner Glass to Glass
  if (estimate.config.cornerClamps?.glassToGlass?.length) {
    let data = [];
    estimate.config.cornerClamps?.glassToGlass?.forEach((item) => {
      const record = hardwaresList.cornerGlassToGlass.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      glassToGlass: data,
    };
  } else {
    summaryObject.cornerClamps = {
      ...summaryObject.cornerClamps,
      glassToGlass: [],
    };
  }
  // mounting channel
  const mountingChannel = hardwaresList.mountingChannel.find(
    (item) => item._id === estimate.config?.mountingChannel
  );
  if (mountingChannel) {
    summaryObject.mountingChannel = mountingChannel.name;
    const price =
      (mountingChannel?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * 1;
    hardwarePrice += price;
  } else {
    summaryObject.mountingChannel = null;
  }
  // glass Type
  const glassType = hardwaresList.glassType.find(
    (item) => item._id === estimate.config?.glassType?.type
  );
  if (glassType) {
    summaryObject.glassType = {
      type: glassType.name,
      thickness: estimate.config?.glassType?.thickness,
    };
    const price =
      (glassType?.options?.find(
        (glass) => glass.thickness === estimate.config?.glassType?.thickness
      )?.cost || 0) * estimate.config?.sqftArea;
    glassPrice = price;
  }
  // glassAddons
  let glassAddonsNameArray = [];
  estimate.config?.glassAddons?.forEach((glassAddonId) => {
    const item = hardwaresList.glassAddons.find(
      (_item) => _item._id === glassAddonId
    );
    if (item) {
      glassAddonsNameArray.push(item.name);
      glassAddonPrice +=
        (item?.options[0]?.cost || 0) * estimate.config?.sqftArea;
    }
  });

  summaryObject.glassAddons = glassAddonsNameArray;

  // sliding Door System
  const slidingDoorSystem = hardwaresList.slidingDoorSystem.find(
    (item) => item._id === estimate.config?.slidingDoorSystem?.type
  );
  if (slidingDoorSystem) {
    summaryObject.slidingDoorSystem = {
      type: slidingDoorSystem.name,
      count: estimate.config?.slidingDoorSystem?.count,
    };
    const price =
      (slidingDoorSystem?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.slidingDoorSystem?.count || 0);
    hardwarePrice += price;
  }
  // header
  const header = hardwaresList.header.find(
    (item) => item._id === estimate.config?.header?.type
  );
  if (header) {
    summaryObject.header = {
      type: header.name,
      count: estimate.config?.header?.count,
    };
    const price =
      (header?.finishes?.find(
        (item) => item.finish_id === estimate.config.hardwareFinishes
      )?.cost || 0) * (estimate.config?.header?.count || 0);
    hardwarePrice += price;
  }
  //hardwareAddons
  if (estimate.config?.hardwareAddons?.length) {
    let data = [];
    estimate.config?.hardwareAddons?.forEach((item) => {
      const record = hardwaresList.hardwareAddons.find(
        (_item) => _item._id === item.type
      );
      if (record) {
        data.push({ type: record.name, count: item.count });
        const price =
          (record?.finishes?.find(
            (item) => item.finish_id === estimate.config.hardwareFinishes
          )?.cost || 0) * (item.count || 0);
        hardwarePrice += price;
      }
    });
    summaryObject.hardwareAddons = data;
  } else {
    summaryObject.hardwareAddons = [];
  }
  // fabrication price
  let fabricationPrice = 0;
  if (estimate.config?.glassType?.thickness === thicknessTypes.ONEBYTWO) {
    fabricationPrice =
      Number(estimate.config?.oneInchHoles ?? 0) *
        (companySettings?.fabricatingPricing?.oneHoleOneByTwoInchGlass ?? 0) +
      Number(estimate.config?.hingeCut ?? 0) *
        (companySettings?.fabricatingPricing?.hingeCutoutOneByTwoInch ?? 0) +
      Number(estimate.config?.clampCut ?? 0) *
        (companySettings?.fabricatingPricing?.clampCutoutOneByTwoInch ?? 0) +
      Number(estimate.config?.notch ?? 0) *
        (companySettings?.fabricatingPricing?.notchOneByTwoInch ?? 0) +
      Number(estimate.config?.outages ?? 0) *
        (companySettings?.fabricatingPricing?.outageOneByTwoInch ?? 0) +
      Number(estimate.config?.mitre ?? 0) *
        (companySettings?.fabricatingPricing?.miterOneByTwoInch ?? 0) +
      Number(estimate.config?.polish ?? 0) *
        (companySettings?.fabricatingPricing?.polishPricePerOneByTwoInch ?? 0);
  } else if (
    estimate.config?.glassType?.thickness === thicknessTypes.THREEBYEIGHT
  ) {
    fabricationPrice =
      Number(estimate.config?.oneInchHoles ?? 0) *
        (companySettings?.fabricatingPricing?.oneHoleThreeByEightInchGlass ??
          0) +
      Number(estimate.config?.hingeCut ?? 0) *
        (companySettings?.fabricatingPricing?.hingeCutoutThreeByEightInch ??
          0) +
      Number(estimate.config?.clampCut ?? 0) *
        (companySettings?.fabricatingPricing?.clampCutoutThreeByEightInch ??
          0) +
      Number(estimate.config?.notch ?? 0) *
        (companySettings?.fabricatingPricing?.notchThreeByEightInch ?? 0) +
      Number(estimate.config?.outages ?? 0) *
        (companySettings?.fabricatingPricing?.outageThreeByEightInch ?? 0) +
      Number(estimate.config?.mitre ?? 0) *
        (companySettings?.fabricatingPricing?.miterThreeByEightInch ?? 0) +
      Number(estimate.config?.polish ?? 0) *
        (companySettings?.fabricatingPricing?.polishPricePerThreeByEightInch ??
          0);
  }
  const laborPrice =
    estimate.config?.people *
    estimate.config?.hours *
    (companySettings?.miscPricing?.hourlyRate ?? 0);
  const doorLaborPrice =
    estimate.config?.people *
    estimate.config?.laborHoursForDoor *
    (companySettings?.miscPricing?.hourlyRate ?? 0);
  let totalPrice =
    (hardwarePrice + fabricationPrice + glassPrice + glassAddonPrice) *
      (companySettings?.miscPricing?.pricingFactorStatus
        ? companySettings?.miscPricing?.pricingFactor
        : 1) +
    laborPrice + doorLaborPrice;
  if (estimate.config?.additionalFields?.length > 0) {
    totalPrice += estimate.config.additionalFields.reduce(
      (acc, item) =>
        acc +
        Number(
          item.cost *
            (companySettings?.miscPricing?.pricingFactorStatus
              ? companySettings?.miscPricing?.pricingFactor
              : 1)
        ),
      0
    );
  }
  summaryObject.pricing = {
    hardwarePrice,
    fabricationPrice,
    glassPrice,
    glassAddonPrice,
    laborPrice,
    doorLaborPrice,
    totalPrice,
  };
  return summaryObject;
};
