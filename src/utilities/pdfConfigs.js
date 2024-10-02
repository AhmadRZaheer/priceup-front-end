export const pdfFields = {
  MEASUREMENTS: "measurements",
  DOORWIDTH: "doorWidth",
  SQFTAREA: "sqftArea",
  DOORWEIGHT: "doorWeight",
  PANELWEIGHT: "panelWeight",
  RETURNWEIGHT: "returnWeight",
  HARDWAREPRICE: "hardwarePrice",
  GLASSPRICE: "glassPrice",
  GLASSADDONSPRICE: "glassAddonsPrice",
  FABRICATIONPRICE: "fabricationPrice",
  HARDWAREADDONSPRICE: "hardwareAddonsPrice",
  LABORPRICE: "laborPrice",
  DOORLABORPRICE: "doorLaborPrice",
  ADDITIONALFIELDSPRICE: "additionalFieldPrice",
  ONEINCHHOLES: "oneInchHoles",
  HINGECUT: "hingeCut",
  ClAMPCUT: "clampCut",
  NOTCH: "notch",
  OUTAGES: "outages",
  MITRE: "mitre",
  POLISH: "polish",
  SIMPLEHOLES: "simpleHoles",
  LIGHTHOLES: "lightHoles",
  SINGLEOUTLETCUTOUT: "singleOutletCutout",
  DOUBLEOUTLETCUTOUT: "doubleOutletCutout",
  TRIPLEOUTLETCUTOUT: "tripleOutletCutout",
  QUADOUTLETCUTOUT: "quadOutletCutout",
  HARDWAREFINISHES: "hardwareFinishes",
  HANDLES: "handles",
  HINGES: "hinges",
  MOUNTINGCHANNEL: "mountingChannel",
  WALLCLAMP: "wallClamp",
  SLEEVEOVER: "sleeveOver",
  GLASSTOGLASS: "glassToGlass",
  CORNERWALLCLAMP: "cornerWallClamp",
  CORNERSLEEVEOVER: "cornerSleeveOver",
  CORNERGLASSTOGLASS: "cornerGlassToGlass",
  GLASSTYPE: "glassType",
  SLIDINGDOORSYSTEM: "slidingDoorSystem",
  HEADER: "header",
  GLASSADDONS: "glassAddons",
  HARDWAREADDONS: "hardwareAddons",
  DOORLOCK: "doorLock",
  EDGEWORK: "edgeWork",
  HARDWARES: "hardwares",
};

export const dimensionsSection = {
  showers: [
    "measurements",
    "doorWidth",
    "sqftArea",
    "panelWeight",
    "returnWeight",
    "doorWeight",
  ],
  mirrors: ["measurements", "sqftArea"],
  wineCellars: [
    "measurements",
    "doorWidth",
    "sqftArea",
    "doorWeight",
    "panelWeight",
    "returnWeight",
  ],
};

export const pricingSection = {
  showers: [
    "hardwarePrice",
    "glassPrice",
    "glassAddonsPrice",
    "fabricationPrice",
    "hardwareAddonsPrice",
    "laborPrice",
    "additionalFieldPrice",
  ],
  mirrors: [
    "glassPrice",
    "fabricationPrice",
    "laborPrice",
    "additionalFieldPrice",
  ],
  wineCellars: [
    "hardwarePrice",
    "glassPrice",
    "fabricationPrice",
    "laborPrice",
    "doorLaborPrice",
    "additionalFieldPrice",
  ],
};

export const fabricationSection = {
  showers: [
    "oneInchHoles",
    "hingeCut",
    "clampCut",
    "notch",
    "outages",
    "mitre",
    "polish",
  ],
  mirrors: [
    "simpleHoles",
    "lightHoles",
    "singleOutletCutout",
    "doubleOutletCutout",
    "tripleOutletCutout",
    "quadOutletCutout",
    "notch",
  ],
  wineCellars: ["oneInchHoles", "hingeCut"],
};

export const summarySection = {
  showers: [
    "hardwareFinishes",
    "handles",
    "hinges",
    "mountingChannel",
    "wallClamp",
    "sleeveOver",
    "glassToGlass",
    "cornerWallClamp",
    "cornerSleeveOver",
    "cornerGlassToGlass",
    "glassType",
    "slidingDoorSystem",
    "header",
    "glassAddons",
    "hardwareAddons",
  ],
  mirrors: ["glassType", "edgeWork", "hardwares", "glassAddons"],
  wineCellars: [
    "hardwareFinishes",
    "handles",
    "hinges",
    "mountingChannel",
    "glassType",
    "doorLock",
  ],
};
