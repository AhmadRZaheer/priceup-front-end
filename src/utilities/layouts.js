export const setItemsStatusAfterFirstLoad = (layout) => {
  const items = {};
  // hardware finish
  if (layout?.settings?.hardwareFinishes) {
    items.hardwareFinishes = { name: "Hardware Finish", status: true };
  } else {
    items.hardwareFinishes = { name: "Hardware Finish", status: false };
  }
  // handles
  if (layout?.settings?.handles?.handleType) {
    items.handles = { name: "Handles", status: true };
  } else {
    items.handles = { name: "Handles", status: false };
  }
  // hinges
  if (layout?.settings?.hinges?.hingesType) {
    items.hinges = { name: "Hinges", status: true };
  } else {
    items.hinges = { name: "Hinges", status: false };
  }
  // pivot hinge option
  if (layout?.settings?.pivotHingeOption?.pivotHingeType) {
    items.pivotHingeOption = { name: "Pivot Hinge Option", status: true };
  } else {
    items.pivotHingeOption = { name: "Pivot Hinge Option", status: false };
  }
  // heavy duty option
  if (layout?.settings?.heavyDutyOption?.heavyDutyType) {
    items.heavyDutyOption = { name: "Heavy Duty Option", status: true };
  } else {
    items.heavyDutyOption = { name: "Heavy Duty Option", status: false };
  }
  // heavy pivot option
  if (layout?.settings?.heavyPivotOption?.heavyPivotType) {
    items.heavyPivotOption = { name: "Heavy Pivot Option", status: true };
  } else {
    items.heavyPivotOption = { name: "Heavy Pivot Option", status: false };
  }
  // glass type
  if (layout?.settings?.glassType?.type) {
    items.glassType = { name: "Glass Type", status: true };
  } else {
    items.glassType = { name: "Glass Type", status: false };
  }
  // sliding door system
  if (layout?.settings?.slidingDoorSystem?.type) {
    items.slidingDoorSystem = { name: "Sliding Door System", status: true };
  } else {
    items.slidingDoorSystem = { name: "Sliding Door System", status: false };
  }
  // outages
  if (layout?.settings?.outages > 0) {
    items.outages = { name: "Outages", status: true };
  } else {
    items.outages = { name: "Outages", status: false };
  }
  // transom
  if (layout?.settings?.transom) {
    items.transom = { name: "Transom (if full height)", status: true };
  } else {
    items.transom = { name: "Transom (if full height)", status: false };
  }
  // header
  if (layout?.settings?.header) {
    items.header = { name: "Header (if not full height)", status: true };
  } else {
    items.header = { name: "Header (if not full height)", status: false };
  }
  // glass addon
  if (layout?.settings?.glassAddon) {
    items.glassAddon = { name: "Glass Addon", status: true };
  } else {
    items.glassAddon = { name: "Glass Addon", status: false };
  }
  // notch
  if (layout?.settings?.notch > 0) {
    items.notch = { name: "Notch", status: true };
  } else {
    items.notch = { name: "Notch", status: false };
  }
  // mounting
  if (layout?.settings?.mountingChannel) {
    items.mounting = { name: "Mounting", status: true };
  } else if (layout?.settings?.wallClamp?.wallClampType || layout?.settings?.sleeveOver?.sleeveOverType || layout?.settings?.glassToGlass?.glassToGlassType) {
    items.mounting = { name: "Mounting", status: true };
  } else if (layout?.settings?.cornerWallClamp?.wallClampType || layout?.settings?.cornerSleeveOver?.sleeveOverType || layout?.settings?.cornerGlassToGlass?.glassToGlassType) {
    items.mounting = { name: "Mounting", status: true };
  } else {
    items.mounting = { name: "Mounting", status: false };
  }

  return items;
};

// Wine Cellar
export const setWineItemsStatusAfterFirstLoad = (layout) => {
  const items = {};
  // hardware finish
  if (layout?.settings?.hardwareFinishes) {
    items.hardwareFinishes = { name: "Hardware Finish", status: true };
  } else {
    items.hardwareFinishes = { name: "Hardware Finish", status: false };
  }
  // handles
  if (layout?.settings?.handles?.handleType) {
    items.handles = { name: "Handles", status: true };
  } else {
    items.handles = { name: "Handles", status: false };
  }
  // doorLock
  if (layout?.settings?.doorLock?.type) {
    items.doorLock = { name: "Door Lock", status: true };
  } else {
    items.doorLock = { name: "Door Lock", status: false };
  }
  // hinges
  if (layout?.settings?.hinges?.hingesType) {
    items.hinges = { name: "Hinges", status: true };
  } else {
    items.hinges = { name: "Hinges", status: false };
  }
  // glass type
  if (layout?.settings?.glassType?.type) {
    items.glassType = { name: "Glass Type", status: true };
  } else {
    items.glassType = { name: "Glass Type", status: false };
  }
  // Channel
  if (layout?.settings?.mountingChannel) {
    items.channel = { name: "Mounting", status: true };
  } else {
    items.channel = { name: "Mounting", status: false };
  }
  return items;
};
