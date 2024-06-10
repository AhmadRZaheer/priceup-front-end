export const getAreaSqft = (measurements) => {
  let totalSqft = 0;
  let totalPerimeter = 0;

  Object.entries(measurements).forEach(([key, value]) => {
    const count = value["count"];
    const width = value["width"];
    const height = value["height"];
    for (let i = 0; i < count; i++) {
      const panel = calculatePanel(width, height);
      totalSqft += panel.sqft;
      totalPerimeter += panel.perimeter;
    }
  });

  return {
    areaSqft: Math.round((totalSqft + Number.EPSILON) * 100) / 100,
    perimeter: totalPerimeter,
  };
};

const calculatePanel = (width, height) => {
  let panelWidth = (width || 0) * 2;
  let panelHeight = (height || 0) * 2;
  let panelSqft = ((width || 0) * (height || 0)) / 144;
  panelSqft = Math.round((panelSqft + Number.EPSILON) * 100) / 100;
  let panelPerimeter = panelWidth + panelHeight;
  return { sqft: panelSqft, perimeter: panelPerimeter };
};

export const getSandBlasting = (measurements, sandBlastingMultiplier) => {
  let totalSandBalsting = 0;

  Object.entries(measurements).forEach(([key, value]) => {
    const count = value["count"];
    const width = value["width"];
    const height = value["height"];
    for (let i = 0; i < count; i++) {
      const value = ((width * height) / 144) * sandBlastingMultiplier;
      totalSandBalsting += value;
    }
  });
  return totalSandBalsting;
};

export const renderMeasurementSides = (measurements) => {
  let result = "";
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
  return result;
};

const getFloatingPrice = (size, mirrorLocationSettings) => {
  switch (size) {
    case "Small":
      return mirrorLocationSettings.floatingSmall;
    case "Medium":
      return mirrorLocationSettings.floatingMedium;
    case "Large":
      return mirrorLocationSettings.floatingLarge;
    default:
      return 0;
  }
};

export const calculateTotal = (
  selectedContent,
  sqftArea,
  mirrorLocationSettings,
  measurements
) => {
  //glass
  const glassPrice =
    (selectedContent?.glassType?.item?.options?.find(
      (glass) => glass.thickness === selectedContent?.glassType?.thickness
    )?.cost || 0) * sqftArea;

  //edgeWork
  const edgeWork =
    selectedContent?.edgeWork?.item?.options?.find(
      (polish) => polish.thickness === selectedContent?.edgeWork?.thickness
    )?.cost || 0;
  console.log(edgeWork, "edgework");
  let edgeWorkPrice = 0;

  Object.entries(measurements).forEach(([key, value]) => {
    const count = value["count"];
    const width = value["width"];
    const height = value["height"];
    for (let i = 0; i < count; i++) {
      const value = edgeWork * (width * 2 + height * 2) * 1;
      edgeWorkPrice += value;
    }
  });

  let floatingPrice = 0;
  floatingPrice = getFloatingPrice(
    selectedContent.floatingSize,
    mirrorLocationSettings
  );
  let bevelStripPrice = 0;
  Object.entries(measurements).forEach(([key, value]) => {
    const count = value["count"];
    const width = value["width"];
    const height = value["height"];
    // for (let i = 0; i < count; i++) {
    const price =
      mirrorLocationSettings.bevelStrip *
      ((Number(width) + Number(height)) * 2);
    bevelStripPrice += price;
    // }
  });

  let safetyBackingPrice = 0;
  safetyBackingPrice = mirrorLocationSettings.safetyBacking * sqftArea;

  let fabricationPrice = 0;
  fabricationPrice =
    selectedContent.simpleHoles * mirrorLocationSettings.holeMultiplier +
    selectedContent.outlets * mirrorLocationSettings.outletMultiplier +
    selectedContent.lightHoles * mirrorLocationSettings.lightHoleMultiplier +
    selectedContent.notch * mirrorLocationSettings.notchMultiplier +
    selectedContent.singleDecora *
      mirrorLocationSettings.singleDecoraMultiplier +
    selectedContent.doubleDecora *
      mirrorLocationSettings.doubleDecoraMultiplier +
    selectedContent.tripleDecora *
      mirrorLocationSettings.tripleDecoraMultiplier +
    selectedContent.quadDecora * mirrorLocationSettings.quadDecoraMultiplier +
    selectedContent.singleDuplex *
      mirrorLocationSettings.singleDuplexMultiplier +
    selectedContent.doubleDuplex *
      mirrorLocationSettings.doubleDuplexMultiplier +
    selectedContent.tripleDuplex *
      mirrorLocationSettings.tripleDuplexMultiplier;

  fabricationPrice +=
    edgeWorkPrice +
    selectedContent.sandBlasting +
    bevelStripPrice +
    safetyBackingPrice +
    floatingPrice;

  //labor price
  const laborPrice =
    selectedContent?.people *
    selectedContent?.hours *
    mirrorLocationSettings?.hourlyRate;

  const totalPrice =
    (glassPrice + fabricationPrice) *
      (mirrorLocationSettings.pricingFactorStatus
        ? mirrorLocationSettings.pricingFactor
        : 1) +
    laborPrice;
  return {
    glass: glassPrice,
    labor: laborPrice,
    fabrication: fabricationPrice,
    misc: 0,
    cost: totalPrice,
    total: totalPrice,
  };
};
