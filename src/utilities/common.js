import { parseJwt } from "@/components/ProtectedRoute/authVerify";
import { layoutVariants, thicknessTypes, weightMultiplier } from "./constants";

export const generateId = () => {
  return Date.now() + "";
};

export function createSlug(string) {
  return string
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\s-]+/g, "") // Remove non-word characters except spaces and hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, "") // Trim leading and trailing hyphens
    .replace(/\//g, "-"); // Replace forward slashes with hyphens
}

export const getDecryptedToken = () => {
  const token = localStorage.getItem("token");
  if(token){
   return parseJwt(token);
  }
  return null;
}

export const backendURL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// export const evaluateFormula = (
//   formulaString,
//   a = 0,
//   b = 0,
//   c = 0,
//   d = 0,
//   e = 0,
//   f = 0
// ) => {
//   try {
//     if (formulaString.length) {
//       // Replace 'a', 'b', and 'c' in the formula string with their respective values
//       const substitutedFormula = formulaString
//         .replace(/a/g, a)
//         .replace(/b/g, b)
//         .replace(/c/g, c)
//         .replace(/d/g, d)
//         .replace(/e/g, e)
//         .replace(/f/g, f);

//       // Evaluate the formula using eval()
//       const result = eval(substitutedFormula);
//       return result;
//     } else {
//       return 0;
//     }
//   } catch (error) {
//     console.error("Error evaluating formula:", error);
//     return 0;
//   }
// };

export const calculateTotal = (selectedContent, priceBySqft, estimatesData) => {
  console.log(selectedContent,'selectedContentselectedContent')
  // hardware
  const handlePrice = selectedContent?.handles?.item
    ? (selectedContent?.handles?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes?._id === item.finish_id
      )?.cost || 0) * selectedContent.handles.count
    : 0;
  const hingesPrice = selectedContent?.hinges?.item
    ? (selectedContent?.hinges?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes?._id === item.finish_id
      )?.cost || 0) * selectedContent.hinges.count
    : 0;
  const doorLockPrice = selectedContent?.doorLock?.item
  ? (selectedContent?.doorLock?.item?.finishes?.find(
      (item) => selectedContent.hardwareFinishes?._id === item.finish_id
    )?.cost || 0) * selectedContent.doorLock.count
  : 0;
  const mountingChannel = selectedContent?.mountingChannel.item
    ? selectedContent?.mountingChannel?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes?._id === item.finish_id
      )?.cost || 0
    : 0;

  let mountingWallClamps = 0;
  selectedContent?.mountingClamps?.wallClamp?.forEach((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes?._id === item.finish_id
    )?.cost;
    mountingWallClamps += price ? price * row.count : 0;
  });
  let mountingsleeveOver = 0;
  selectedContent?.mountingClamps?.sleeveOver?.forEach((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes?._id === item.finish_id
    )?.cost;
    mountingsleeveOver += price ? price * row.count : 0;
  });
  let mountingglassToGlass = 0;
  selectedContent?.mountingClamps?.glassToGlass?.forEach((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes?._id === item.finish_id
    )?.cost;
    mountingglassToGlass += price ? price * row.count : 0;
  });

  let cornerWallClamps = 0;
  selectedContent?.cornerClamps?.cornerWallClamp?.forEach((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes?._id === item.finish_id
    )?.cost;
    cornerWallClamps += price ? price * row.count : 0;
  });
  let cornerSleeveOver = 0;
  selectedContent?.cornerClamps?.cornerSleeveOver?.forEach((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes?._id === item.finish_id
    )?.cost;
    cornerSleeveOver += price ? price * row.count : 0;
  });
  let cornerGlassToGlass = 0;
  selectedContent?.cornerClamps?.cornerGlassToGlass?.forEach((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes?._id === item.finish_id
    )?.cost;
    cornerGlassToGlass += price ? price * row.count : 0;
  });
  // const mountingWallClamps = selectedContent?.mounting?.clamps?.wallClamp?.item
  //   ? (selectedContent?.mounting?.clamps?.wallClamp?.item?.finishes?.find(
  //       (item) => selectedContent.hardwareFinishes._id === item.finish_id
  //     )?.cost || 0) * selectedContent?.mounting?.clamps?.wallClamp?.count
  //   : 0;
  // const mountingsleeveOver = selectedContent?.mounting?.clamps?.sleeveOver?.item
  //   ? (selectedContent?.mounting?.clamps?.sleeveOver?.item?.finishes?.find(
  //       (item) => selectedContent.hardwareFinishes._id === item.finish_id
  //     )?.cost || 0) * selectedContent?.mounting?.clamps?.sleeveOver?.count
  //   : 0;
  // const mountingglassToGlass = selectedContent?.mounting?.clamps?.glassToGlass
  //   ?.item
  //   ? (selectedContent?.mounting?.clamps?.glassToGlass?.item?.finishes?.find(
  //       (item) => selectedContent.hardwareFinishes._id === item.finish_id
  //     )?.cost || 0) * selectedContent?.mounting?.clamps?.glassToGlass?.count
  //   : 0;
  const slidingDoorSystemPrice = selectedContent?.slidingDoorSystem?.item
    ? (selectedContent?.slidingDoorSystem?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes?._id === item.finish_id
      )?.cost || 0) * selectedContent.slidingDoorSystem.count
    : 0;
  const headerPrice = selectedContent?.header?.item
    ? (selectedContent?.header?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes?._id === item.finish_id
      )?.cost || 0) * selectedContent.header.count
    : 0;

  let mountingPrice =
    selectedContent?.mountingState === "channel"
      ? mountingChannel
      : mountingWallClamps + mountingglassToGlass + mountingsleeveOver;
  mountingPrice += cornerWallClamps + cornerGlassToGlass + cornerSleeveOver;
  const hardwareTotals =
    handlePrice +
    hingesPrice +
    doorLockPrice +
    mountingPrice +
    slidingDoorSystemPrice +
    headerPrice;

  // fabricating
  let fabricationPrice = 0;
  if (selectedContent.glassType.thickness === "1/2") {
    fabricationPrice =
      Number(selectedContent?.oneInchHoles ?? 0) *
        (estimatesData?.fabricatingPricing?.oneHoleOneByTwoInchGlass ?? 0) +
      Number(selectedContent?.hingeCut ?? 0) *
        (estimatesData?.fabricatingPricing?.hingeCutoutOneByTwoInch ?? 0) +
      Number(selectedContent?.clampCut ?? 0) *
        (estimatesData?.fabricatingPricing?.clampCutoutOneByTwoInch ?? 0) +
      Number(selectedContent?.notch ?? 0) *
        (estimatesData?.fabricatingPricing?.notchOneByTwoInch ?? 0) +
      Number(selectedContent?.outages ?? 0) *
        (estimatesData?.fabricatingPricing?.outageOneByTwoInch ?? 0) +
      Number(selectedContent?.mitre ?? 0) *
        (estimatesData?.fabricatingPricing?.miterOneByTwoInch ?? 0) +
      Number(selectedContent?.polish ?? 0) *
        (estimatesData?.fabricatingPricing?.polishPricePerOneByTwoInch ?? 0);
  } else if (selectedContent.glassType.thickness === "3/8") {
    fabricationPrice =
      Number(selectedContent?.oneInchHoles ?? 0) *
        (estimatesData?.fabricatingPricing?.oneHoleThreeByEightInchGlass ?? 0) +
      Number(selectedContent?.hingeCut ?? 0) *
        (estimatesData?.fabricatingPricing?.hingeCutoutThreeByEightInch ?? 0) +
      Number(selectedContent?.clampCut ?? 0) *
        (estimatesData?.fabricatingPricing?.clampCutoutThreeByEightInch ?? 0) +
      Number(selectedContent?.notch ?? 0) *
        (estimatesData?.fabricatingPricing?.notchThreeByEightInch ?? 0) +
      Number(selectedContent?.outages ?? 0) *
        (estimatesData?.fabricatingPricing?.outageThreeByEightInch ?? 0) +
      Number(selectedContent?.mitre ?? 0) *
        (estimatesData?.fabricatingPricing?.miterThreeByEightInch ?? 0) +
      Number(selectedContent?.polish ?? 0) *
        (estimatesData?.fabricatingPricing?.polishPricePerThreeByEightInch ?? 0);
  }

  //hardware Addons
  // const towelBar = estimatesData?.hardwareAddons?.find(
  //   (item) => item.slug === "towel-bars"
  // );
  // const sleeveOver = estimatesData?.hardwareAddons?.find(
  //   (item) => item.slug === "sleeve-over"
  // );
  // const towelBarFinish =
  //   towelBar?.finishes?.find(
  //     (item) => item?.finish_id === selectedContent?.hardwareFinishes?._id
  //   )?.cost || 0;
  // const sleeveOverFinish =
  //   sleeveOver?.finishes?.find(
  //     (item) => item?.finish_id === selectedContent?.hardwareFinishes?._id
  //   )?.cost || 0;
  let hardwareAddons = 0;
  selectedContent?.hardwareAddons?.forEach((row) => {
    const price =
      row?.item?.finishes?.find(
        (finish) => finish?.finish_id === selectedContent?.hardwareFinishes?._id
      )?.cost || 0;
    hardwareAddons = hardwareAddons + price * row?.count;
    //  * priceBySqft;  // hardware addons are not calculated by price by sqft
  });
  // const hardwareAddOnsTotal =
  //   towelBarFinish * selectedContent?.towelBarsCount +
  //   sleeveOverFinish * selectedContent?.sleeveOverCount +
  //   otherAddons;

  //glass
  const glassPrice =
    (selectedContent?.glassType?.item?.options?.find(
      (glass) => glass.thickness === selectedContent?.glassType?.thickness
    )?.cost || 0) * priceBySqft;

  //glassAddons
  let glassAddonsPrice = 0;
  selectedContent?.glassAddons?.forEach((item) => {
    let price = 0;
    if (item?.options?.length) {
      price = item?.options[0]?.cost || 0;
    }
    glassAddonsPrice = glassAddonsPrice + price * priceBySqft;
  });
  // const glassTreatmentPrice =
  //   selectedContent?.glassTreatment?.item?.options?.find(
  //     (glass) => glass.thickness === selectedContent?.glassType?.thickness
  //   )?.cost || 0;

  //labor price
  let doorLaborPrice = 0;
  if(typeof selectedContent?.laborHoursForDoor === 'number' &&  selectedContent?.laborHoursForDoor > 0 ){
    doorLaborPrice =(selectedContent?.people * selectedContent?.laborHoursForDoor)*(estimatesData?.miscPricing?.hourlyRate);
  }
  const laborPrice =
   ( selectedContent?.people *
    selectedContent?.hours) *
    estimatesData?.miscPricing?.hourlyRate;
  
  //additionalField price
  let additionalFieldPrice = 0;
  selectedContent?.additionalFields?.forEach((item) => {
    additionalFieldPrice += Number(
      item.cost 
      // *
      //   (estimatesData?.miscPricing?.pricingFactorStatus
      //     ? estimatesData?.miscPricing?.pricingFactor
      //     : 1)
    );
  });
  let total =
    (hardwareTotals +
      fabricationPrice +
      hardwareAddons +
      glassPrice +
      glassAddonsPrice) *
      (estimatesData?.miscPricing?.pricingFactorStatus
        ? estimatesData?.miscPricing?.pricingFactor
        : 1) +
    (laborPrice + doorLaborPrice);
    // + additionalFieldPrice;
  // additonal fields sum
  if (selectedContent.additionalFields.length > 0) {
    total += selectedContent.additionalFields.reduce(
      (acc, item) =>
        acc +
        Number(
          item.cost *
            (estimatesData?.miscPricing?.pricingFactorStatus
              ? estimatesData?.miscPricing?.pricingFactor
              : 1)
        ),
      0
    );
  }
  const cost =
    hardwareTotals +
    fabricationPrice +
    glassPrice +
    glassAddonsPrice +
    hardwareAddons +
    additionalFieldPrice;
  // const profit = total - cost;
  // const totalPercentage = ((total - cost) * 100) / total;
  if (
    selectedContent.userProfitPercentage > 0 &&
    selectedContent.userProfitPercentage < 100
  ) {
    total = ((cost * 100) / (selectedContent.userProfitPercentage - 100)) * -1;

    // if (totalPercentage > selectedContent.userProfitPercentage) {
    //   const newPercentage =
    //     totalPercentage - selectedContent.userProfitPercentage;
    //   const price = total * (newPercentage / 100);
    //   total = total - price;
    // }
    // if (totalPercentage < selectedContent.userProfitPercentage) {
    //   const newPercentage =
    //     selectedContent.userProfitPercentage - totalPercentage;
    //   const price = total * (newPercentage / 100);
    //   total = total + price;
    // }
  }

  return {
    hardwarePrice: hardwareTotals,
    fabricationPrice: fabricationPrice,
    glassPrice: glassPrice,
    glassAddonsPrice: glassAddonsPrice,
    miscPricing: 0,
    hardwareAddonsPrice: hardwareAddons,
    laborPrice: laborPrice,
    doorLaborPrice: doorLaborPrice,
    additionalFieldPrice: additionalFieldPrice,
    total: total,
    cost: cost,
    profit: ((total - cost) * 100) / total,
  };
};

// export const calculateAreaOrPerimeter = (measurementSides, formula) => {
//   const measurementObject = measurementSides.reduce((obj, item) => {
//     const { key, value } = item;
//     if (!obj[key]) {
//       obj[key] = [];
//     }
//     obj[key].push(value);
//     return obj;
//   }, {});
//   return evaluateFormula(
//     formula,
//     measurementObject?.a,
//     measurementObject?.b,
//     measurementObject?.c,
//     measurementObject?.d,
//     measurementObject?.e,
//     measurementObject?.f
//   );
// };

export const convertArrayKeysToObject = (array) => {
  const result = array.reduce((obj, item) => {
    obj[item.key] = item.value;
    return obj;
}, {});
return result;
};

export const calculateAreaAndPerimeter = (
  measurementSides,
  variant,
  glassThickness = thicknessTypes.THREEBYEIGHT,
  layoutConfigs = null
) => {
  console.log(measurementSides,variant,glassThickness,'dfdfdeercsf')
  let measurements =
    variant !== layoutVariants.CUSTOM
      ? convertArrayKeysToObject(measurementSides)
      : null;
  if (variant === layoutVariants.DOOR) {
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 0 ? measurements?.b : 0,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const areaSqft =
      Math.round(((door.width * door.height) / 144) * doorQuantity * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.DOOR,
      glassThickness,
      areaSqft
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeter = perimeterDoor.width + perimeterDoor.height;
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      ...weight,
    };
  } else if (variant === layoutVariants.DOORANDPANEL) {
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width:
        door?.width > 28
          ? measurements?.b - door?.width
          : measurements?.b < 29
          ? measurements?.b - door?.width
          : (measurements?.b >= 28 ? measurements?.b - door?.width : 0) < 10
          ? 10
          : measurements?.b >= 28
          ? measurements?.b - door?.width
          : 0,
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const areaSqft = Math.round((doorSqft + panelSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.DOORANDPANEL,
      glassThickness,
      { door: doorSqft, panel: panelSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  } else if (variant === layoutVariants.DOUBLEDOOR) {
    const doorLeftQuantity = measurements?.b === 0 ? 0 : 1;
    const doorLeft = {
      width: measurements?.b / 2,
      height: doorLeftQuantity === 0 ? 0 : measurements?.a,
    };
    const doorLeftSqft =
      ((doorLeft.width * doorLeft.height) / 144) * doorLeftQuantity;
    const doorRightQuantity = measurements?.b === 0 ? 0 : 1;
    const doorRight = {
      width: measurements?.b - doorLeft?.width,
      height: doorRightQuantity === 0 ? 0 : measurements?.a,
    };
    const doorRightSqft =
      ((doorRight.width * doorRight.height) / 144) * doorRightQuantity;
    const areaSqft = Math.round((doorLeftSqft + doorRightSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.DOUBLEDOOR,
      glassThickness,
      { doorLeft: doorLeftSqft, doorRight: doorRightSqft }
    );

    const perimeterDoorLeft = {
      width: doorLeft.width * 2 * doorLeftQuantity,
      height: doorLeft.height * 2 * doorLeftQuantity,
    };
    const perimeterDoorRight = {
      width: doorRight.width * 2 * doorRightQuantity,
      height: doorRight.height * 2 * doorRightQuantity,
    };
    const perimeter =
      perimeterDoorLeft.width +
      perimeterDoorLeft.height +
      (perimeterDoorRight.width + perimeterDoorRight.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: doorLeft.width,
      ...weight,
    };
  } else if (variant === layoutVariants.DOORANDNIB) {
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.d === 0 ? 0 : 1;
    const panel = {
      width: measurements?.d,
      height: measurements?.d === 0 ? 0 : measurements?.a - measurements?.c,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const areaSqft = Math.round((doorSqft + panelSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.DOORANDNIB,
      glassThickness,
      { door: doorSqft, panel: panelSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  } else if (variant === layoutVariants.DOORANDNOTCHEDPANEL) {
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;

    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      // have some issue in width
      width:
        door?.width > 28
          ? Number(measurements?.b - door?.width) + Number(measurements?.d)
          : Number(
              measurements?.b < 29
                ? measurements?.b - door?.width
                : (measurements?.b >= 28 ? measurements?.b - door?.width : 0) <
                  10
                ? 10
                : measurements?.b >= 28
                ? measurements?.b - door?.width
                : 0
            ) + Number(measurements?.d),
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const areaSqft = Math.round((doorSqft + panelSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.DOORANDNOTCHEDPANEL,
      glassThickness,
      { door: doorSqft, panel: panelSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height);

    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  } else if (variant === layoutVariants.DOORPANELANDRETURN) {
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width:
        door?.width > 28
          ? measurements?.b - door?.width
          : measurements?.b < 29
          ? measurements?.b - door?.width
          : (measurements?.b >= 28 ? measurements?.b - door?.width : 0) < 10
          ? 10
          : measurements?.b >= 28
          ? measurements?.b - door?.width
          : 0,
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const returnQuantity = measurements?.c === 0 ? 0 : 1;
    const layoutReturn = {
      width: measurements?.c === 0 ? 0 : measurements?.c,
      height: returnQuantity === 0 ? 0 : measurements?.a,
    };
    const returnSqft =
      ((layoutReturn.width * layoutReturn.height) / 144) * returnQuantity;
    const areaSqft =
      Math.round((doorSqft + panelSqft + returnSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.DOORPANELANDRETURN,
      glassThickness,
      { door: doorSqft, panel: panelSqft, return: returnSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeterReturn = {
      width: layoutReturn.width * 2 * returnQuantity,
      height: layoutReturn.height * 2 * returnQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height) +
      (perimeterReturn.width + perimeterReturn.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  } else if (variant === layoutVariants.DOORNOTCHEDPANELANDRETURN) {
    const doorQuantity = measurements?.a === 0 ? 0 : 1;
    const door = {
      width: measurements?.a > 28 ? 28 : measurements?.a,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.a > 28 ? 1 : 0;
    const panel = {
      width:
        door?.width > 28
          ? Number(measurements?.b - door?.width) + Number(measurements?.d)
          : Number(
              measurements?.b < 29
                ? measurements?.b - door?.width
                : (measurements?.b >= 28 ? measurements?.b - door?.width : 0) <
                  10
                ? 10
                : measurements?.b >= 28
                ? measurements?.b - door?.width
                : 0
            ) + Number(measurements?.d),
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const returnQuantity = measurements?.a === 0 ? 0 : 1;
    const layoutReturn = {
      width: measurements?.e === 0 ? 0 : measurements?.e,
      height: returnQuantity === 0 ? 0 : measurements?.a - measurements?.c,
    };
    const returnSqft =
      ((layoutReturn.width * layoutReturn.height) / 144) * returnQuantity;
    const areaSqft =
      Math.round((doorSqft + panelSqft + returnSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.DOORNOTCHEDPANELANDRETURN,
      glassThickness,
      { door: doorSqft, panel: panelSqft, return: returnSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeterReturn = {
      width: layoutReturn.width * 2 * returnQuantity,
      height: layoutReturn.height * 2 * returnQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height) +
      (perimeterReturn.width + perimeterReturn.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  } else if (variant === layoutVariants.SINGLEBARN) {
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width: measurements?.b - door?.width,
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const areaSqft = Math.round((doorSqft + panelSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.SINGLEBARN,
      glassThickness,
      { door: doorSqft, panel: panelSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  } else if (variant === layoutVariants.DOUBLEBARN) {
    const doorLeftQuantity = measurements?.b === 0 ? 0 : 1;
    const doorLeft = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorLeftQuantity === 0 ? 0 : measurements?.a,
    };
    const doorLeftSqft =
      ((doorLeft.width * doorLeft.height) / 144) * doorLeftQuantity;
    const doorRightQuantity = measurements?.b > 28 ? 1 : 0;
    const doorRight = {
      width: measurements?.b - doorLeft?.width,
      height: doorRightQuantity === 0 ? 0 : measurements?.a,
    };
    const doorRightSqft =
      ((doorRight.width * doorRight.height) / 144) * doorRightQuantity;
    const areaSqft = Math.round((doorLeftSqft + doorRightSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.DOUBLEBARN,
      glassThickness,
      { doorLeft: doorLeftSqft, doorRight: doorRightSqft }
    );

    const perimeterDoorLeft = {
      width: doorLeft.width * 2 * doorLeftQuantity,
      height: doorLeft.height * 2 * doorLeftQuantity,
    };
    const perimeterDoorRight = {
      width: doorRight.width * 2 * doorRightQuantity,
      height: doorRight.height * 2 * doorRightQuantity,
    };
    const perimeter =
      perimeterDoorLeft.width +
      perimeterDoorLeft.height +
      (perimeterDoorRight.width + perimeterDoorRight.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: doorLeft.width,
      panelWidth: doorRight.width,
      ...weight,
    };
  } else if (variant === layoutVariants.CUSTOM) {
    measurements = measurementSides;
    let totalSqft = 0;
    let totalPerimeter = 0;
    let panelWeight = "";

    // for (const panelKey in measurements) {
    Object.entries(measurements).forEach(([key, value]) => {
      const count = value["count"];
      const width = value["width"];
      const height = value["height"];
      for (let i = 0; i < count; i++) {
        const panel = calculatePanel(width, height);
        totalSqft += panel.sqft;
        totalPerimeter += panel.perimeter;
        panelWeight += getWeightByThickness(
          layoutVariants.CUSTOM,
          glassThickness,
          panel.sqft
        );
      }
    });
    // const { width, height } = measurements[panelKey];

    // }

    return {
      areaSqft: Math.round((totalSqft + Number.EPSILON) * 100) / 100,
      perimeter: totalPerimeter,
      panelWeight: panelWeight,
    };
  } 
  
  else if (variant === layoutVariants.INLINE) {
    const doorQuantity = measurements?.b === 0 ? 0 : layoutConfigs?.doorQuantity;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width: measurements?.b - (door.width * doorQuantity),
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const areaSqft = Math.round((doorSqft + panelSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.INLINE,
      glassThickness,
      { door: doorSqft, panel: panelSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  }
  else if (variant === layoutVariants.NINTYDEGREE) {
    const doorQuantity = measurements?.b === 0 ? 0 : layoutConfigs?.doorQuantity;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width:measurements?.b - (door.width * doorQuantity),
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const returnQuantity = measurements?.c === 0 ? 0 : 1;
    const layoutReturn = {
      width: measurements?.c === 0 ? 0 : measurements?.c,
      height: returnQuantity === 0 ? 0 : measurements?.a,
    };
    const returnSqft =
      ((layoutReturn.width * layoutReturn.height) / 144) * returnQuantity;
    const areaSqft =
      Math.round((doorSqft + panelSqft + returnSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.NINTYDEGREE,
      glassThickness,
      { door: doorSqft, panel: panelSqft, return: returnSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeterReturn = {
      width: layoutReturn.width * 2 * returnQuantity,
      height: layoutReturn.height * 2 * returnQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height) +
      (perimeterReturn.width + perimeterReturn.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  }
  else if (variant === layoutVariants.THREESIDEDGLASS) {
    const doorQuantity = measurements?.b === 0 ? 0 : layoutConfigs?.doorQuantity;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width:measurements?.b - (door.width * doorQuantity),
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const return1Quantity = measurements?.c === 0 ? 0 : 1;
    const layoutReturn1 = {
      width: measurements?.c === 0 ? 0 : measurements?.c,
      height: return1Quantity === 0 ? 0 : measurements?.a,
    };
    const return1Sqft =
      ((layoutReturn1.width * layoutReturn1.height) / 144) * return1Quantity;
    const return2Quantity = measurements?.c === 0 ? 0 : 1;
    const layoutReturn2 = {
      width: measurements?.c === 0 ? 0 : measurements?.c,
      height: return2Quantity === 0 ? 0 : measurements?.a,
    };
    const return2Sqft =
      ((layoutReturn2.width * layoutReturn2.height) / 144) * return2Quantity;
    const areaSqft =
      Math.round((doorSqft + panelSqft + return1Sqft + return2Sqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.NINTYDEGREE,
      glassThickness,
      { door: doorSqft, panel: panelSqft, return: return1Sqft + return2Sqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeterReturn1 = {
      width: layoutReturn1.width * 2 * return1Quantity,
      height: layoutReturn1.height * 2 * return1Quantity,
    };
    const perimeterReturn2 = {
      width: layoutReturn2.width * 2 * return2Quantity,
      height: layoutReturn2.height * 2 * return2Quantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height) +
      (perimeterReturn1.width + perimeterReturn1.height) +
      (perimeterReturn2.width + perimeterReturn2.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  }
  else if (variant === layoutVariants.GLASSCUBE) {
    const doorQuantity = measurements?.b === 0 ? 0 : layoutConfigs?.doorQuantity;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a,
    };
    const doorSqft = ((door.width * door.height) / 144) * doorQuantity;
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width:measurements?.b - (door.width * doorQuantity),
      height: panelQuantity === 0 ? 0 : measurements?.a,
    };
    const panelSqft = ((panel.width * panel.height) / 144) * panelQuantity;
    const return1Quantity = measurements?.c === 0 ? 0 : 1;
    const layoutReturn1 = {
      width: measurements?.c === 0 ? 0 : measurements?.c,
      height: return1Quantity === 0 ? 0 : measurements?.a,
    };
    const return1Sqft =
      ((layoutReturn1.width * layoutReturn1.height) / 144) * return1Quantity;
    const return2Quantity = measurements?.c === 0 ? 0 : 1;
    const layoutReturn2 = {
      width: measurements?.c === 0 ? 0 : measurements?.c,
      height: return2Quantity === 0 ? 0 : measurements?.a,
    };
    const return2Sqft =
      ((layoutReturn2.width * layoutReturn2.height) / 144) * return2Quantity;
    const backWallGlassQuantity = measurements?.b === 0 ? 0 : 1;
    const backWallGlass = {
      width: measurements?.b === 0 ? 0 : measurements?.b,
      height: measurements?.a === 0 ? 0 : measurements?.a
    }
    const backWallGlassSqft = ((backWallGlass.width * backWallGlass.height) / 144) * backWallGlassQuantity;
    const areaSqft =
      Math.round((doorSqft + panelSqft + return1Sqft + return2Sqft + backWallGlassSqft) * 100) / 100;
    const weight = getWeightByThickness(
      layoutVariants.GLASSCUBE,
      glassThickness,
      { door: doorSqft, panel: panelSqft, return: return1Sqft + return2Sqft, backWallGlass: backWallGlassSqft }
    );

    const perimeterDoor = {
      width: door.width * 2 * doorQuantity,
      height: door.height * 2 * doorQuantity,
    };
    const perimeterPanel = {
      width: panel.width * 2 * panelQuantity,
      height: panel.height * 2 * panelQuantity,
    };
    const perimeterReturn1 = {
      width: layoutReturn1.width * 2 * return1Quantity,
      height: layoutReturn1.height * 2 * return1Quantity,
    };
    const perimeterReturn2 = {
      width: layoutReturn2.width * 2 * return2Quantity,
      height: layoutReturn2.height * 2 * return2Quantity,
    };
    const perimeterBackWallGlass = {
      width: backWallGlass.width * 2 * backWallGlassQuantity,
      height: backWallGlass.height * 2 * backWallGlassQuantity,
    };
    const perimeter =
      perimeterDoor.width +
      perimeterDoor.height +
      (perimeterPanel.width + perimeterPanel.height) +
      (perimeterReturn1.width + perimeterReturn1.height) +
      (perimeterReturn2.width + perimeterReturn2.height) +
      (perimeterBackWallGlass.width + perimeterBackWallGlass.height);
    return {
      areaSqft: areaSqft,
      perimeter: perimeter,
      doorWidth: door.width,
      panelWidth: panel.width,
      ...weight,
    };
  }
  else {
    return 0;
  }
};

const calculatePanel = (width, height) => {
  let panelWidth = (width || 0) * 2;
  let panelHeight = (height || 0) * 2;
  let panelSqft = ((width || 0) * (height || 0)) / 144;
  panelSqft = Math.round((panelSqft + Number.EPSILON) * 100) / 100;
  let panelPerimeter = panelWidth + panelHeight;
  return { sqft: panelSqft, perimeter: panelPerimeter };
};

export const getGlassThickness = (variant, measurementSides, height) => {
  const measurements = convertArrayKeysToObject(measurementSides);
  switch (variant) {
    /** Shower Layouts */
    case layoutVariants.DOOR:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.DOORANDPANEL:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.DOUBLEDOOR:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.DOORANDNIB:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.DOORANDNOTCHEDPANEL:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.DOORPANELANDRETURN:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.DOORNOTCHEDPANELANDRETURN:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.SINGLEBARN:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.DOUBLEBARN:
      return measurements?.a < height ? "3/8" : "1/2";
    /** end */
    /** Wine Cellar Layouts */
    case layoutVariants.INLINE:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.NINTYDEGREE:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.THREESIDEDGLASS:
      return measurements?.a < height ? "3/8" : "1/2";
    case layoutVariants.GLASSCUBE:
      return measurements?.a < height ? "3/8" : "1/2";
    /** end */
    default:
      return;
  }
};

export const getweightMultiplier = (thickness) => {
  switch (thickness) {
    case thicknessTypes.ONEBYTWO:
      return weightMultiplier.ONEBYTWO;
    case thicknessTypes.THREEBYEIGHT:
      return weightMultiplier.THREEBYEIGHT;
    default:
      return weightMultiplier.THREEBYEIGHT;
  }
};

export const getWeightByThickness = (variant, glassThickness, sqft) => {
  const weightMultiplier = getweightMultiplier(glassThickness);
  let doorWeight = 0;
  let panelWeight = 0;
  let returnWeight = 0;
  let doorLeftWeight = 0;
  let doorRightWeight = 0;
  let backWallGlassWeight = 0;
  switch (variant) {
    /** Shower layouts */
    case layoutVariants.DOOR:
      doorWeight = Number((weightMultiplier * sqft)?.toFixed(2));
      return { doorWeight };
    case layoutVariants.DOORANDPANEL:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      return { doorWeight, panelWeight };
    case layoutVariants.DOUBLEDOOR:
      doorLeftWeight = Number((weightMultiplier * sqft.doorLeft)?.toFixed(2));
      doorRightWeight = Number((weightMultiplier * sqft.doorRight)?.toFixed(2));
      return { doorWeight: `${doorLeftWeight}, ${doorRightWeight}` };
    case layoutVariants.DOORANDNIB:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      return { doorWeight, panelWeight };
    case layoutVariants.DOORANDNOTCHEDPANEL:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      return { doorWeight, panelWeight };
    case layoutVariants.DOORPANELANDRETURN:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      returnWeight = Number((weightMultiplier * sqft.return)?.toFixed(2));
      return { doorWeight, panelWeight, returnWeight };
    case layoutVariants.DOORNOTCHEDPANELANDRETURN:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      returnWeight = Number((weightMultiplier * sqft.return)?.toFixed(2));
      return { doorWeight, panelWeight, returnWeight };
    case layoutVariants.SINGLEBARN:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      return { doorWeight, panelWeight };
    case layoutVariants.DOUBLEBARN:
      doorLeftWeight = Number((weightMultiplier * sqft.doorLeft)?.toFixed(2));
      doorRightWeight = Number((weightMultiplier * sqft.doorRight)?.toFixed(2));
      return { doorWeight: `${doorLeftWeight}, ${doorRightWeight}` };
    case layoutVariants.CUSTOM:
      return `${Number((weightMultiplier * sqft)?.toFixed(2))}, `;
    /** end */
    /** Wine Cellar layouts */
    case layoutVariants.INLINE:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      return { doorWeight, panelWeight };
    case layoutVariants.NINTYDEGREE:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      returnWeight = Number((weightMultiplier * sqft.return)?.toFixed(2));
      return { doorWeight, panelWeight, returnWeight };
    case layoutVariants.THREESIDEDGLASS:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      returnWeight = Number((weightMultiplier * sqft.return)?.toFixed(2));
      return { doorWeight, panelWeight, returnWeight };
    case layoutVariants.GLASSCUBE:
      doorWeight = Number((weightMultiplier * sqft.door)?.toFixed(2));
      panelWeight = Number((weightMultiplier * sqft.panel)?.toFixed(2));
      returnWeight = Number((weightMultiplier * sqft.return)?.toFixed(2));
      backWallGlassWeight = Number((weightMultiplier * sqft.backWallGlass)?.toFixed(2));
      return { doorWeight, panelWeight, returnWeight, backWallGlassWeight };
    /** end */
    default:
      return {};
  }
};

export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getLocaleDateTimeFromMongoTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  // Define options for date and time formatting
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // Use 12-hour clock format
  };

  // Format the date and time
  return date.toLocaleString('en-US', options);
}