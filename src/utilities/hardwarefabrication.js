import { hardwareTypes, layoutVariants, quoteState } from "./constants";

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
  // for mounting channel
  if (
    selectedContent.mountingState === hardwareTypes.CHANNEL &&
    selectedContent.mountingChannel?.item
  ) {
    const mountingChannelResult = getMountingChannelFabrication(
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
        const wallClampResult = getMountingClampFabrication(
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
        const sleeveOverResult = getMountingClampFabrication(
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
        const glassToGlassResult = getMountingClampFabrication(
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
      const cornerWallClampResult = getMountingClampFabrication(
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
      const cornerSleeveOverResult = getMountingClampFabrication(
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
      const cornerGlassToGlassResult = getMountingClampFabrication(
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
  // for create quote
  if (currentQuoteState === quoteState.CREATE) {
    let layoutNotchValue = selectedItem?.settings?.notch;
    notch += layoutNotchValue;
    let layoutOutageValue = selectedItem?.settings?.outages;
    outages += layoutOutageValue;
  }
  // if selected item is SINGLE BARN
  if (selectedItem?.settings?.variant === layoutVariants.SINGLEBARN) {
    oneInchHoles += 6;
  }
  // if selected item is DOUBLE BARN
  if (selectedItem?.settings?.variant === layoutVariants.DOUBLEBARN) {
    oneInchHoles += 8;
  }
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getHandleFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 2;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemhingeCut = item?.hingeCut > 0 ? item?.hingeCut : 0;

  hingeCut = count * selectedItemhingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getHingeFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 1;

  hingeCut = count * selectedItemHingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getMountingChannelFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 0;

  hingeCut = count * selectedItemHingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getMountingClampFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 0;

  hingeCut = count * selectedItemHingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 1;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getGenericFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 0;

  hingeCut = count * selectedItemHingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
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
    outages: Number(fabricationValues.outages)
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
      currentHardwareFabrication = getMountingClampFabrication(
        currentHardware?.item,
        currentHardware?.count
      );
    else if ([hardwareTypes.CHANNEL].includes(type))
      currentHardwareFabrication = getMountingChannelFabrication(
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
        newSelectedHardwareFabrication = getMountingClampFabrication(
          newSelectedHardware?.item,
          newSelectedHardware?.count
        );
      else if ([hardwareTypes.CHANNEL].includes(type))
        newSelectedHardwareFabrication = getMountingChannelFabrication(
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
