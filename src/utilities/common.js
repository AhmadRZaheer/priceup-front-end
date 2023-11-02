import { layoutVariants } from "./constants";

export const generateId = () => {
  return Date.now() + "";
};

export function createSlug(string) {
  return string
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove non-word characters except hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens
}

export const backendURL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const evaluateFormula = (
  formulaString,
  a = 0,
  b = 0,
  c = 0,
  d = 0,
  e = 0,
  f = 0
) => {
  try {
    if (formulaString.length) {
      // Replace 'a', 'b', and 'c' in the formula string with their respective values
      const substitutedFormula = formulaString
        .replace(/a/g, a)
        .replace(/b/g, b)
        .replace(/c/g, c)
        .replace(/d/g, d)
        .replace(/e/g, e)
        .replace(/f/g, f);

      // Evaluate the formula using eval()
      const result = eval(substitutedFormula);
      return result;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error evaluating formula:", error);
    return 0;
  }
};

export const calculateTotal = (selectedContent, priceBySqft, estimatesData) => {
  // hardware
  const handlePrice = selectedContent?.handles?.item
    ? (selectedContent?.handles?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0) * selectedContent.handles.count
    : 0;
  const hingesPrice = selectedContent?.hinges?.item
    ? (selectedContent?.hinges?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0) * selectedContent.hinges.count
    : 0;
  const mountingChannel = selectedContent?.mountingChannel.item
    ? selectedContent?.mountingChannel?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0
    : 0;

  let mountingWallClamps = 0;
  selectedContent?.mountingClamps?.wallClamp?.map((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes._id === item.finish_id
    )?.cost;
    mountingWallClamps += price ? price * row.count : 0;
  });
  let mountingsleeveOver = 0;
  selectedContent?.mountingClamps?.sleeveOver?.map((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes._id === item.finish_id
    )?.cost;
    mountingsleeveOver += price ? price * row.count : 0;
  });
  let mountingglassToGlass = 0;
  selectedContent?.mountingClamps?.glassToGlass?.map((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes._id === item.finish_id
    )?.cost;
    mountingglassToGlass += price ? price * row.count : 0;
  });

  let cornerWallClamps = 0;
  selectedContent?.cornerClamps?.cornerWallClamp?.map((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes._id === item.finish_id
    )?.cost;
    cornerWallClamps += price ? price * row.count : 0;
  });
  let cornerSleeveOver = 0;
  selectedContent?.cornerClamps?.cornerSleeveOver?.map((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes._id === item.finish_id
    )?.cost;
    cornerSleeveOver += price ? price * row.count : 0;
  });
  let cornerGlassToGlass = 0;
  selectedContent?.cornerClamps?.cornerGlassToGlass?.map((row) => {
    const price = row.item.finishes?.find(
      (item) => selectedContent.hardwareFinishes._id === item.finish_id
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
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0) * selectedContent.slidingDoorSystem.count
    : 0;
  const headerPrice = selectedContent?.header?.item
    ? (selectedContent?.header?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0) * selectedContent.header.count
    : 0;
  
  let mountingPrice = selectedContent?.mountingState === 'channel' ? mountingChannel : (mountingWallClamps + mountingglassToGlass + mountingsleeveOver);
  mountingPrice += (cornerWallClamps + cornerGlassToGlass + cornerSleeveOver);
  const hardwareTotals =
    handlePrice +
    hingesPrice +
    mountingPrice +
    slidingDoorSystemPrice +
    headerPrice;

  // fabricating
  let fabricationPrice = 0;
  if (selectedContent.glassType.thickness === "1/2") {
    fabricationPrice =
      Number(selectedContent?.oneInchHoles) *
        estimatesData?.fabricatingPricing?.oneHoleOneByTwoInchGlass +
      Number(selectedContent?.hingeCut) *
        estimatesData?.fabricatingPricing?.hingeCutoutOneByTwoInch +
      Number(selectedContent?.clampCut) *
        estimatesData?.fabricatingPricing?.clampCutoutOneByTwoInch +
      Number(selectedContent?.notch) *
        estimatesData?.fabricatingPricing?.notchOneByTwoInch +
      Number(selectedContent?.outages) *
        estimatesData?.fabricatingPricing?.outageOneByTwoInch +
      Number(selectedContent?.mitre) *
        estimatesData?.fabricatingPricing?.minterOneByTwoInch +
      Number(selectedContent?.polish) *
        estimatesData?.fabricatingPricing?.polishPricePerOneByTwoInch;
  } else if (selectedContent.glassType.thickness === "3/8") {
    fabricationPrice =
      Number(selectedContent?.oneInchHoles) *
        estimatesData?.fabricatingPricing?.oneHoleThreeByEightInchGlass +
      Number(selectedContent?.hingeCut) *
        estimatesData?.fabricatingPricing?.hingeCutoutThreeByEightInch +
      Number(selectedContent?.clampCut) *
        estimatesData?.fabricatingPricing?.clampCutoutThreeByEightInch +
      Number(selectedContent?.notch) *
        estimatesData?.fabricatingPricing?.notchThreeByEightInch +
      Number(selectedContent?.outages) *
        estimatesData?.fabricatingPricing?.outageThreeByEightInch +
      Number(selectedContent?.mitre) *
        estimatesData?.fabricatingPricing?.minterThreeByEightInch +
      Number(selectedContent?.polish) *
        estimatesData?.fabricatingPricing?.polishPricePerThreeByEightInch;
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
  selectedContent?.hardwareAddons?.map((row) => {
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
  selectedContent?.glassAddons?.map((item) => {
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
  const laborPrice =
    selectedContent?.people *
    selectedContent?.hours *
    estimatesData?.miscPricing?.hourlyRate;
  console.log(fabricationPrice, "fabricat", glassPrice);
  const total =
    (hardwareTotals +
      fabricationPrice +
      hardwareAddons +
      glassPrice +
      glassAddonsPrice) *
      estimatesData?.miscPricing?.pricingFactor +
    laborPrice;
  return {
    hardwarePrice: hardwareTotals,
    fabricationPrice: fabricationPrice,
    glassPrice: glassPrice,
    glassAddonsPrice: glassAddonsPrice,
    miscPricing: 0,
    laborPrice: laborPrice,
    total: total,
  };
};

export const calculateAreaOrPerimeter = (measurementSides, formula) => {
  const measurementObject = measurementSides.reduce((obj, item) => {
    const { key, value } = item;
    if (!obj[key]) {
      obj[key] = [];
    }
    obj[key].push(value);
    return obj;
  }, {});
  return evaluateFormula(
    formula,
    measurementObject?.a,
    measurementObject?.b,
    measurementObject?.c,
    measurementObject?.d,
    measurementObject?.e,
    measurementObject?.f
  );
};

export const convertArrayKeysToObject = (array) => {
  const obj = array.reduce((result, item) => {
    const { key, value } = item;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(value);
    return result;
  }, {});
  return obj;
};

export const calculateAreaAndPerimeter = (measurementSides, variant) => {
  let measurements = convertArrayKeysToObject(measurementSides);
  if(variant === layoutVariants.DOOR){
    const doorQuantity =  measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 0 ? measurements?.b : 0,
      height: doorQuantity === 0 ? 0 : measurements?.a
    };
    const areaSqft = Math.round(((door.width*door.height)/144*doorQuantity) * 100) / 100;
    const perimeterDoor = {width:(door.width*2*doorQuantity),height:(door.height*2*doorQuantity)};
    const perimeter = perimeterDoor.width+perimeterDoor.height;  
    return {
      areaSqft: areaSqft,
      perimeter:perimeter,
      doorWidth: door.width
    };
  }
   else if (variant === layoutVariants.DOORANDPANEL){
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a
    }
    const doorSqft = ((door.width*door.height)/144*doorQuantity);
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width:door?.width > 28 ?  measurements?.b-door?.width : (measurements?.b < 29 ? measurements?.b-door?.width : ((measurements?.b >= 28 ? measurements?.b-door?.width : 0) < 10 ? 10 : (measurements?.b >= 28 ? measurements?.b-door?.width : 0))),
      height:panelQuantity === 0 ? 0 : measurements?.a
    }
    const panleSqft = ((panel.width*panel.height)/144*panelQuantity);
    const areaSqft = Math.round((doorSqft+panleSqft) * 100) / 100;
    const perimeterDoor = {
      width: (door.width*2*doorQuantity),height:(door.height*2*doorQuantity)
    }
    const perimeterPanel = {
      width: (panel.width*2*panelQuantity),height:(panel.height*2*panelQuantity)
    }
    const perimeter = (perimeterDoor.width+perimeterDoor.height)+(perimeterPanel.width+perimeterPanel.height);
    return {
      areaSqft:areaSqft,
      perimeter:perimeter,
      doorWidth: door.width ,
      panelWidth: panel.width 

    };
    
   }
   else if (variant === layoutVariants.DOUBLEDOOR)
   {
    const doorLeftQuantity = measurements?.b === 0 ? 0 : 1;
    const doorLeft = {
      width: measurements?.b / 2,
      height: doorLeftQuantity === 0 ? 0 : measurements?.a
    }
    const doorLeftSqft = ((doorLeft.width*doorLeft.height)/144*doorLeftQuantity);
    const doorRightQuantity = measurements?.b === 0 ? 0 : 1;
    const doorRight = {
      width:measurements?.b-doorLeft?.width,
      height:doorRightQuantity === 0 ? 0 : measurements?.a
    }
    const doorRightSqft = ((doorRight.width*doorRight.height)/144*doorRightQuantity);
    const areaSqft = Math.round((doorLeftSqft+doorRightSqft) * 100) / 100;
    const perimeterDoorLeft = {
      width: (doorLeft.width*2*doorLeftQuantity),height:(doorLeft.height*2*doorLeftQuantity)
    }
    const perimeterDoorRight = {
      width: (doorRight.width*2*doorRightQuantity),height:(doorRight.height*2*doorRightQuantity)
    }
    const perimeter = (perimeterDoorLeft.width+perimeterDoorLeft.height)+(perimeterDoorRight.width+perimeterDoorRight.height);
    return {
      areaSqft:areaSqft,
      perimeter:perimeter,
      doorWidth: doorLeft.width 
    };
   }
   else if(variant === layoutVariants.DOORANDNIB){
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a
    }
    const doorSqft = ((door.width*door.height)/144*doorQuantity);
    const panelQuantity = measurements?.d === 0 ? 0 : 1;
    const panel = {
      width: measurements?.d,
      height: measurements?.d === 0 ? 0 : measurements?.a-measurements?.c
    }
    const panleSqft = ((panel.width*panel.height)/144*panelQuantity);
    const areaSqft = Math.round((doorSqft+panleSqft) * 100) / 100;
    const perimeterDoor = {
      width: (door.width*2*doorQuantity),height:(door.height*2*doorQuantity)
    }
    const perimeterPanel = {
      width: (panel.width*2*panelQuantity),height:(panel.height*2*panelQuantity)
    }
    const perimeter = (perimeterDoor.width+perimeterDoor.height)+(perimeterPanel.width+perimeterPanel.height);
    return {
      areaSqft:areaSqft,
      perimeter:perimeter,
      doorWidth: door.width ,
      panelWidth: panel.width 
    };
   }
   else if (variant === layoutVariants.DOORANDNOTCHEDPANEL){ 
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a
    }
    const doorSqft = ((door.width*door.height)/144*doorQuantity);

    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {  // have some issue in width
      width: door?.width > 28 ? (Number(measurements?.b-door?.width) + Number(measurements?.d)) : Number((measurements?.b < 29 ? (measurements?.b-door?.width) : ((measurements?.b >=28 ? (measurements?.b-door?.width) : 0) < 10 ? 10 : (measurements?.b >=28 ? (measurements?.b-door?.width) : 0)))) + Number(measurements?.d),
      height: panelQuantity === 0 ? 0 : measurements?.a
    }
    const panelSqft = ((panel.width*panel.height)/144*panelQuantity);
    const areaSqft = Math.round((doorSqft+panelSqft) * 100) / 100;
    const perimeterDoor = {
      width: (door.width*2*doorQuantity),height:(door.height*2*doorQuantity)
    }
    const perimeterPanel = {
      width: (panel.width*2*panelQuantity),height:(panel.height*2*panelQuantity)
    }
    const perimeter = (perimeterDoor.width+perimeterDoor.height)+(perimeterPanel.width+perimeterPanel.height);
    console.log(door, panel,panelSqft,doorSqft,perimeterPanel,perimeterDoor,areaSqft,"dorr");
    return {
      areaSqft:areaSqft,
      perimeter:perimeter,
      doorWidth: door.width ,
      panelWidth: panel.width 
    };
   }
   else if (variant === layoutVariants.DOORPANELANDRETURN){
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a
    }
    const doorSqft = ((door.width*door.height)/144*doorQuantity);
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
        width: door?.width > 28 ? (measurements?.b-door?.width) : (measurements?.b < 29 ? (measurements?.b-door?.width) : ((measurements?.b >= 28 ? measurements?.b-door?.width : 0) < 10 ? 10 : (measurements?.b >= 28 ? measurements?.b-door?.width : 0))),
        height: panelQuantity === 0 ? 0 : measurements?.a
      }
    const panelSqft = ((panel.width*panel.height)/144*panelQuantity);
    const returnQuantity = measurements?.c === 0 ? 0 : 1;
    const layoutReturn = {
      width:measurements?.c === 0 ? 0 : measurements?.c,
      height:returnQuantity === 0 ? 0 : measurements?.a
    }
    const returnSqft = ((layoutReturn.width*layoutReturn.height)/144*returnQuantity);
    const areaSqft = Math.round((doorSqft+panelSqft+returnSqft) * 100) / 100;
    const perimeterDoor = {
      width: (door.width*2*doorQuantity),height:(door.height*2*doorQuantity)
    }
    const perimeterPanel = {
      width: (panel.width*2*panelQuantity),height:(panel.height*2*panelQuantity)
    }
    const perimeterReturn = {
      width: (layoutReturn.width*2*returnQuantity),height:(layoutReturn.height*2*returnQuantity)
    }
    const perimeter = (perimeterDoor.width+perimeterDoor.height)+(perimeterPanel.width+perimeterPanel.height)+(perimeterReturn.width+perimeterReturn.height);
    return {
      areaSqft:areaSqft,
      perimeter:perimeter,
      doorWidth: door.width ,
      panelWidth: panel.width 
    }; 
  }
  else if (variant === layoutVariants.DOORNOTCHEDPANELANDRETURN){
    const doorQuantity = measurements?.a === 0 ? 0 : 1;
    const door = {
      width: measurements?.a > 28 ? 28 : measurements?.a,
      height: doorQuantity === 0 ? 0 : measurements?.a
    }
    const doorSqft = ((door.width*door.height)/144*doorQuantity);
    const panelQuantity = measurements?.a > 28 ? 1 : 0;
    const panel = {
        width: door?.width > 28 ? (Number(measurements?.b-door?.width)+Number(measurements?.d)) : Number((measurements?.b < 29 ? (measurements?.b-door?.width) : ((measurements?.b >= 28 ? measurements?.b-door?.width : 0) < 10 ? 10 : (measurements?.b >= 28 ? measurements?.b-door?.width : 0))))+Number(measurements?.d),
        height: panelQuantity === 0 ? 0 : measurements?.a
      }
    const panelSqft = ((panel.width*panel.height)/144*panelQuantity);
    const returnQuantity = measurements?.a === 0 ? 0 : 1;
    const layoutReturn = {
      width:measurements?.e === 0 ? 0 : measurements?.e,
      height:returnQuantity === 0 ? 0 : measurements?.a-measurements?.c
    }
    const returnSqft = ((layoutReturn.width*layoutReturn.height)/144*returnQuantity);
    const areaSqft = Math.round((doorSqft+panelSqft+returnSqft) * 100) / 100;
    const perimeterDoor = {
      width: (door.width*2*doorQuantity),height:(door.height*2*doorQuantity)
    }
    const perimeterPanel = {
      width: (panel.width*2*panelQuantity),height:(panel.height*2*panelQuantity)
    }
    const perimeterReturn = {
      width: (layoutReturn.width*2*returnQuantity),height:(layoutReturn.height*2*returnQuantity)
    }
    const perimeter = (perimeterDoor.width+perimeterDoor.height)+(perimeterPanel.width+perimeterPanel.height)+(perimeterReturn.width+perimeterReturn.height);
    return {
      areaSqft:areaSqft,
      perimeter:perimeter,
      doorWidth: door.width ,
      panelWidth: panel.width 
    }; 
  }
  else if (variant === layoutVariants.SINGLEBARN){
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a
    }
    const doorSqft = ((door.width*door.height)/144*doorQuantity);
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width:measurements?.b-door?.width,
      height:panelQuantity === 0 ? 0 : measurements?.a
    }
    const panleSqft = ((panel.width*panel.height)/144*panelQuantity);
    const areaSqft = Math.round((doorSqft+panleSqft) * 100) / 100;
    const perimeterDoor = {
      width: (door.width*2*doorQuantity),height:(door.height*2*doorQuantity)
    }
    const perimeterPanel = {
      width: (panel.width*2*panelQuantity),height:(panel.height*2*panelQuantity)
    }
    const perimeter = (perimeterDoor.width+perimeterDoor.height)+(perimeterPanel.width+perimeterPanel.height);
    return {
      areaSqft:areaSqft,
      perimeter:perimeter,
      doorWidth: door.width ,
      panelWidth: panel.width 
    };
  }
  else if (variant === layoutVariants.DOUBLEBARN){
    const doorQuantity = measurements?.b === 0 ? 0 : 1;
    const door = {
      width: measurements?.b > 28 ? 28 : measurements?.b,
      height: doorQuantity === 0 ? 0 : measurements?.a
    }
    const doorSqft = ((door.width*door.height)/144*doorQuantity);
    const panelQuantity = measurements?.b > 28 ? 1 : 0;
    const panel = {
      width:measurements?.b-door?.width,
      height:panelQuantity === 0 ? 0 : measurements?.a
    }
    const panleSqft = ((panel.width*panel.height)/144*panelQuantity);
    const areaSqft = Math.round((doorSqft+panleSqft) * 100) / 100;
    const perimeterDoor = {
      width: (door.width*2*doorQuantity),height:(door.height*2*doorQuantity)
    }
    const perimeterPanel = {
      width: (panel.width*2*panelQuantity),height:(panel.height*2*panelQuantity)
    }
    const perimeter = (perimeterDoor.width+perimeterDoor.height)+(perimeterPanel.width+perimeterPanel.height);
    return {
      areaSqft:areaSqft,
      perimeter:perimeter,
      doorWidth: door.width,
      doorWidth: door.width ,
      panelWidth: panel.width 
    };
  } else if (variant === layoutVariants.CUSTOM) {
    measurements = measurementSides;
    console.log(measurements, 'cal')
    let totalSqft = 0;
    let totalPerimeter = 0;

    for (const panelKey in measurements) {
      const { width, height } = measurements[panelKey];
      console.log({ width, height }, 'loop')
      const panel = calculatePanel(width, height);
      console.log("panel",panel)
      totalSqft += panel.sqft;
      totalPerimeter += panel.perimeter;
    }

    return {
      areaSqft: Math.round((totalSqft + Number.EPSILON) * 100) / 100,
      perimeter: totalPerimeter,
    };
  } else {
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
