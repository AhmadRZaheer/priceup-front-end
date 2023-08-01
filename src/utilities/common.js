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

export const backendURL = "http://localhost:5000";

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

export const calculateTotal = (selectedContent,priceBySqft,estimatesData) => {
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
  const mountingChannel = selectedContent?.mounting?.channel.item
    ? selectedContent?.mounting?.channel?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0
    : 0;
  const mountingWallClamps = selectedContent?.mounting?.clamps?.wallClamp?.item
    ? (selectedContent?.mounting?.clamps?.wallClamp?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0) * selectedContent?.mounting?.clamps?.wallClamp?.count
    : 0;
  const mountingsleeveOver = selectedContent?.mounting?.clamps?.sleeveOver?.item
    ? (selectedContent?.mounting?.clamps?.sleeveOver?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0) * selectedContent?.mounting?.clamps?.sleeveOver?.count
    : 0;
  const mountingglassToGlass = selectedContent?.mounting?.clamps?.glassToGlass
    ?.item
    ? (selectedContent?.mounting?.clamps?.glassToGlass?.item?.finishes?.find(
        (item) => selectedContent.hardwareFinishes._id === item.finish_id
      )?.cost || 0) * selectedContent?.mounting?.clamps?.glassToGlass?.count
    : 0;
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

  const hardwareTotals =
    handlePrice +
    hingesPrice +
    mountingChannel *
      (selectedContent?.mounting?.activeType === "channel" ? 1 : 0) +
    (mountingWallClamps + mountingglassToGlass + mountingsleeveOver) *
      (selectedContent?.mounting?.activeType === "clamps" ? 1 : 0) +
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

  //addons
  const towelBar = estimatesData?.addOns?.find(
    (item) => item.slug === "towel-bars"
  );
  const sleeveOver = estimatesData?.addOns?.find(
    (item) => item.slug === "sleeve-over"
  );
  const towelBarFinish =
    towelBar?.finishes?.find(
      (item) => item.finish_id === selectedContent?.hardwareFinishes?._id
    )?.cost || 0;
  const sleeveOverFinish =
    sleeveOver?.finishes?.find(
      (item) => item.finish_id === selectedContent?.hardwareFinishes?._id
    )?.cost || 0;
  let otherAddons = 0;
  selectedContent?.addOns?.map((item) => {
    const price =
      item?.finishes?.find(
        (finish) => finish?.finish_id === selectedContent?.hardwareFinishes?._id
      )?.cost || 0;
    otherAddons = otherAddons + price * priceBySqft;
  });
  const addOnsTotal =
    towelBarFinish * selectedContent?.towelBarsCount +
    sleeveOverFinish * selectedContent?.sleeveOverCount +
    otherAddons;

  //glass
  const glassPrice =
    (selectedContent?.glassType?.item?.options?.find(
      (glass) => glass.thickness === selectedContent?.glassType?.thickness
    )?.cost || 0) * priceBySqft;

  //glassTreatment
  const glassTreatmentPrice =
    selectedContent?.glassTreatment?.item?.options?.find(
      (glass) => glass.thickness === selectedContent?.glassType?.thickness
    )?.cost || 0;

  //labor price
  const laborPrice =
    selectedContent?.people *
    selectedContent?.hours *
    estimatesData?.miscPricing?.hourlyRate;

  const total =
    (hardwareTotals +
      fabricationPrice +
      addOnsTotal +
      glassPrice +
      glassTreatmentPrice) *
      estimatesData?.miscPricing?.pricingFactor +
    laborPrice;
  return total;
};

export const calculateAreaOrPerimeter = (measurementSides,formula) => {
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
}
