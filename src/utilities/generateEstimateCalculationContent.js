const { layoutVariants, notificationsVariant } = require("./constants");

export const generateContentForShowerEdit = (listData, estimate) => {
  let calculateChannelWarning = {
    status: false,
    variant: notificationsVariant.DEFAULT,
    message: "",
  };
  let hardwareFinishes = null;
  hardwareFinishes = listData?.hardwareFinishes?.find(
    (item) => item._id === estimate?.config?.hardwareFinishes
  );
  let handleType = null;
  handleType = listData?.handles?.find(
    (item) => item._id === estimate?.config?.handles?.type
  );
  let hingesType = null;
  hingesType = listData?.hinges?.find(
    (item) => item._id === estimate?.config?.hinges?.type
  );
  let slidingDoorSystemType = null;
  slidingDoorSystemType = listData?.slidingDoorSystem?.find(
    (item) => item._id === estimate?.config?.slidingDoorSystem?.type
  );

  let headerType = null;
  headerType = listData?.header?.find(
    (item) => item._id === estimate?.config?.header?.type
  );

  let glassTypee = null;
  glassTypee = listData?.glassType?.find(
    (item) => item._id === estimate?.config?.glassType?.type
  );

  let glassAddons = [];
  glassAddons = estimate?.config?.glassAddons?.map((item) => {
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
    ].includes(estimate?.settings?.variant)
  ) {
    wallClampArray = estimate?.config?.mountingClamps?.wallClamp?.map((row) => {
      const record = listData?.wallClamp?.find(
        (clamp) => clamp._id === row?.type
      );
      return { item: record, count: row.count };
    });
    sleeveOverArray = estimate?.config?.mountingClamps?.sleeveOver?.map(
      (row) => {
        const record = listData?.sleeveOver?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );
    glassToGlassArray = estimate?.config?.mountingClamps?.glassToGlass?.map(
      (row) => {
        const record = listData?.glassToGlass?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerWallClampArray = estimate?.config?.cornerClamps?.wallClamp?.map(
      (row) => {
        const record = listData?.cornerWallClamp?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerSleeveOverArray = estimate?.config?.cornerClamps?.sleeveOver?.map(
      (row) => {
        const record = listData?.cornerSleeveOver?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerGlassToGlassArray = estimate?.config?.cornerClamps?.glassToGlass?.map(
      (row) => {
        const record = listData?.cornerGlassToGlass?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    channelItem = listData?.mountingChannel?.find(
      (item) => item._id === estimate?.config?.mountingChannel
    );
  }
  let hardwareAddons = [];
  hardwareAddons = estimate?.config?.hardwareAddons?.map((row) => {
    const found = listData?.hardwareAddons?.find(
      (item) => item?._id === row.type
    );
    return { item: found, count: row.count };
  });
  const noGlassAddon = listData?.glassAddons?.find(
    (item) => item.slug === "no-treatment"
  );
  // const measurements = estimate.config.measurements.map(
  //   ({ _id, ...rest }) => rest
  // );

  // Generate Channel calculate warning if channel is selected
  if (channelItem) {
    calculateChannelWarning.status = true;
    calculateChannelWarning.variant = notificationsVariant.WARNING;
    calculateChannelWarning.message =
      "Current channel price is being calculated according to 1 channel stick";
  }
  return {
    content: {
      hardwareFinishes: hardwareFinishes,
      handles: {
        //   ...state.handles,
        item: handleType,
        count: estimate?.config?.handles?.count,
      },
      hinges: {
        //   ...state.hinges,
        item: hingesType,
        count: estimate?.config?.hinges?.count,
      },
      header: {
        item: headerType,
        count: estimate?.config?.header?.count,
      },
      slidingDoorSystem: {
        item: slidingDoorSystemType,
        count: estimate?.config?.slidingDoorSystem?.count,
      },
      glassType: {
        item: glassTypee,
        thickness: estimate?.config?.glassType?.thickness,
      },

      mountingClamps: {
        wallClamp: wallClampArray ? [...wallClampArray] : [],
        sleeveOver: sleeveOverArray ? [...sleeveOverArray] : [],
        glassToGlass: glassToGlassArray ? [...glassToGlassArray] : [],
      },
      cornerClamps: {
        cornerWallClamp: cornerWallClampArray ? [...cornerWallClampArray] : [],
        cornerSleeveOver: cornerSleeveOverArray
          ? [...cornerSleeveOverArray]
          : [],
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
      hingeCut: estimate?.config?.hingeCut,
      people: estimate?.config?.people,
      hours: estimate?.config?.hours,
      glassAddons: glassAddons?.length ? [...glassAddons] : [noGlassAddon],
      oneInchHoles: estimate?.config?.oneInchHoles,
      clampCut: estimate?.config?.clampCut,
      notch: estimate?.config?.notch,
      outages: estimate?.config?.outages,
      mitre: estimate?.config?.mitre,
      polish: estimate?.config?.polish,
      // sleeveOverCount: estimate?.sleeveOverCount,
      // towelBarsCount: estimate?.towelBarsCount,
      hardwareAddons: hardwareAddons ? [...hardwareAddons] : [],
      userProfitPercentage: estimate?.config?.userProfitPercentage,
      discount: {
        value: estimate?.config?.discount?.value ?? 0,
        unit: estimate?.config?.discount?.unit ?? "%",
        total: 0,
      },
      additionalFields: estimate?.config?.additionalFields,
    },
    // state.measurements = measurements;
    perimeter: estimate?.config?.perimeter,
    sqftArea: estimate?.config?.sqftArea,
    // state.selectedItem = estimate;
    doorWidth: estimate?.config?.doorWidth || 0,
    calculateChannelWarning,
  };
};

export const generateContentForMirrorEdit = (hardwaresList, estimate) => {
  let glassTypee = null;
  glassTypee = hardwaresList?.glassTypes?.find(
    (item) => item?._id === estimate?.config?.glassType?.type
  );

  let edgeWork = null;
  edgeWork = hardwaresList?.edgeWorks?.find(
    (item) => item?._id === estimate?.config?.edgeWork?.type
  );

  let glassAddons = [];
  glassAddons = estimate?.config?.glassAddons?.map((item) => {
    const record = hardwaresList?.glassAddons?.find(
      (addon) => addon?._id === item
    );
    return record;
  });
  let hardwares = [];
  hardwares = estimate?.config?.hardwares?.map((row) => {
    const found = hardwaresList?.hardwares?.find(
      (item) => item?._id === row.type
    );
    return { item: found, count: row.count };
  });

  return {
    content: {
      // ...state.content,
      glassType: {
        item: glassTypee,
        thickness: estimate?.config?.glassType?.thickness,
      },
      edgeWork: {
        item: edgeWork,
        thickness: estimate?.config?.edgeWork?.thickness,
      },
      glassAddons: glassAddons ? [...glassAddons] : [],
      hardwares: hardwares ? [...hardwares] : [],
      modifiedProfitPercentage: estimate?.config?.modifiedProfitPercentage,
      discount: {
        value: estimate?.config?.discount?.value ?? 0,
        unit: estimate?.config?.discount?.unit ?? "%",
        total: 0,
      },
      additionalFields: estimate?.config?.additionalFields,
      // floatingSize: estimate?.config?.floatingSize ?? null,
      // sandBlasting: estimate?.config?.sandBlasting,
      // bevelStrip: estimate?.config?.bevelStrip, // true, false
      // safetyBacking: estimate?.config?.safetyBacking, //true, false
      simpleHoles: estimate?.config?.simpleHoles,
      // outlets: estimate?.config?.outlets,
      lightHoles: estimate?.config?.lightHoles,
      notch: estimate?.config?.notch,
      singleOutletCutout: estimate?.config?.singleOutletCutout,
      doubleOutletCutout: estimate?.config?.doubleOutletCutout,
      tripleOutletCutout: estimate?.config?.tripleOutletCutout,
      quadOutletCutout: estimate?.config?.quadOutletCutout,
      // singleDuplex: estimate?.config?.singleDuplex,
      // doubleDuplex: estimate?.config?.doubleDuplex,
      // tripleDuplex: estimate?.config?.tripleDuplex,
      people: estimate?.config?.people,
      hours: estimate?.config?.hours,
    },
    sqftArea: estimate?.config?.sqftArea,
  };
};

export const generateContentForWineCellarEdit = (hardwaresList, estimate) => {
  console.log(hardwaresList,estimate,'ddddd')
  let calculateChannelWarning = {
    status: false,
    variant: notificationsVariant.DEFAULT,
    message: "",
  };
  let hardwareFinishes = null;
  hardwareFinishes = hardwaresList?.hardwareFinishes?.find(
    (item) => item._id === estimate?.config?.hardwareFinishes
  );
  let handleType = null;
  handleType = hardwaresList?.handles?.find(
    (item) => item._id === estimate?.config?.handles?.type
  );
  let doorLockType = null;
  doorLockType = hardwaresList?.doorLocks?.find(
    (item) => item._id === estimate?.config?.doorLock?.type
  );
  let hingesType = null;
  hingesType = hardwaresList?.hinges?.find(
    (item) => item._id === estimate?.config?.hinges?.type
  );

  let slidingDoorSystemType = null;
  slidingDoorSystemType = hardwaresList?.slidingDoorSystem?.find(
    (item) => item._id === estimate?.config?.slidingDoorSystem?.type
  );

  let headerType = null;
  headerType = hardwaresList?.header?.find(
    (item) => item._id === estimate?.config?.header?.type
  );

  let glassTypee = null;
  glassTypee = hardwaresList?.glassType?.find(
    (item) => item._id === estimate?.config?.glassType?.type
  );

  let glassAddons = [];
  glassAddons = estimate?.config?.glassAddons?.map((item) => {
    const record = hardwaresList?.glassAddons.find(
      (addon) => addon._id === item
    );
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
  if (
    ![
      layoutVariants.DOOR,
      layoutVariants.DOUBLEDOOR,
      layoutVariants.DOUBLEBARN,
    ].includes(estimate?.settings?.variant)
  ) {
    wallClampArray = estimate?.config?.mountingClamps?.wallClamp?.map((row) => {
      const record = hardwaresList?.wallClamp?.find(
        (clamp) => clamp._id === row?.type
      );
      return { item: record, count: row.count };
    });
    sleeveOverArray = estimate?.config?.mountingClamps?.sleeveOver?.map(
      (row) => {
        const record = hardwaresList?.sleeveOver?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );
    glassToGlassArray = estimate?.config?.mountingClamps?.glassToGlass?.map(
      (row) => {
        const record = hardwaresList?.glassToGlass?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerWallClampArray = estimate?.config?.cornerClamps?.wallClamp?.map(
      (row) => {
        const record = hardwaresList?.cornerWallClamp?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerSleeveOverArray = estimate?.config?.cornerClamps?.sleeveOver?.map(
      (row) => {
        const record = hardwaresList?.cornerSleeveOver?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    cornerGlassToGlassArray = estimate?.config?.cornerClamps?.glassToGlass?.map(
      (row) => {
        const record = hardwaresList?.cornerGlassToGlass?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      }
    );

    channelItem = hardwaresList?.mountingChannel?.find(
      (item) => item._id === estimate?.config?.mountingChannel
    );
  }
  let hardwareAddons = [];
  hardwareAddons = estimate?.config?.hardwareAddons?.map((row) => {
    const found = hardwaresList?.hardwareAddons?.find(
      (item) => item?._id === row.type
    );
    return { item: found, count: row.count };
  });
  const noGlassAddon = hardwaresList?.glassAddons?.find(
    (item) => item.slug === "no-treatment"
  );

  // let channelItem = null;
  // channelItem = hardwaresList?.mountingChannel?.find(
  //     (item) => item._id === estimate?.config?.mountingChannel
  // );

  // Generate Channel calculate warning if channel is selected
  if (channelItem) {
    calculateChannelWarning.status = true;
    calculateChannelWarning.variant = notificationsVariant.WARNING;
    calculateChannelWarning.message =
      "Current channel price is being calculated according to 1 channel stick";
  }

  return {
    content: {
      // ...state.content,
      hardwareFinishes: hardwareFinishes,
      handles: {
        // ...state.handles,
        item: handleType,
        count: estimate?.config?.handles?.count,
      },
      doorLock: {
        // ...state.doorLock,
        item: doorLockType,
        count: estimate?.config?.doorLock?.count,
      },
      hinges: {
        // ...state.hinges,
        item: hingesType,
        count: estimate?.config?.hinges?.count,
      },
      header: {
        item: headerType,
        count: estimate?.config?.header?.count,
      },
      slidingDoorSystem: {
        item: slidingDoorSystemType,
        count: estimate?.config?.slidingDoorSystem?.count,
      },
      glassType: {
        item: glassTypee,
        thickness: estimate?.config?.glassType?.thickness,
      },
      mountingClamps: {
        wallClamp: wallClampArray ? [...wallClampArray] : [],
        sleeveOver: sleeveOverArray ? [...sleeveOverArray] : [],
        glassToGlass: glassToGlassArray ? [...glassToGlassArray] : [],
      },
      cornerClamps: {
        cornerWallClamp: cornerWallClampArray ? [...cornerWallClampArray] : [],
        cornerSleeveOver: cornerSleeveOverArray
          ? [...cornerSleeveOverArray]
          : [],
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
      hingeCut: estimate?.config?.hingeCut,
      people: estimate?.config?.people,
      hours: estimate?.config?.hours,
      laborHoursForDoor: estimate?.config?.laborHoursForDoor ?? 0,
      glassAddons: glassAddons?.length ? [...glassAddons] : [noGlassAddon],
      oneInchHoles: estimate?.config?.oneInchHoles,
      clampCut: estimate?.config?.clampCut,
      notch: estimate?.config?.notch,
      outages: estimate?.config?.outages,
      mitre: estimate?.config?.mitre,
      polish: estimate?.config?.polish,
      hardwareAddons: hardwareAddons ? [...hardwareAddons] : [],
      userProfitPercentage: estimate?.config?.userProfitPercentage,
      discount: {
        value: estimate?.config?.discount?.value ?? 0,
        unit: estimate?.config?.discount?.unit ?? "%",
        total: 0,
      },
      additionalFields: estimate?.config?.additionalFields,
    },
    perimeter: estimate?.config?.perimeter,
    sqftArea: estimate?.config?.sqftArea,
    // state.selectedItem = estimate;
    doorWidth: estimate?.config?.doorWidth || 0,
    doorQuantity: estimate?.config?.doorQuantity || 1,
    calculateChannelWarning,
  };
};