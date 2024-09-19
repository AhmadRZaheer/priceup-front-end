import { setEstimateCategory, setEstimateState } from "@/redux/estimateSlice";
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

export const generateWineNotificationsForCurrentItem = (
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

export const renderWineMeasurementSides = (
  quoteState,
  measurements,
  layoutID
) => {
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

export const setStateForWineCellarEstimate = (item, dispatch, navigate) => {
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
  navigate("/estimates/dimensions");
  // }
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
