export const NOTE__MIN_LENGTH = 20;
export const NOTE__MAX_LENGTH = 300;

export const layoutVariants = {
  DOOR: "door",
  DOORANDPANEL: "doorandpanel",
  DOUBLEDOOR: "doubledoor",
  DOORANDNIB: "doorandnib",
  DOORANDNOTCHEDPANEL: "doorandnotchedpanel",
  DOORPANELANDRETURN: "doorpanelandreturn",
  DOORNOTCHEDPANELANDRETURN: "doornotchedpanelandreturn",
  SINGLEBARN: "singlebarn",
  DOUBLEBARN: "doublebarn",
  CUSTOM: "custom",
  INLINE: "inline",
  NINTYDEGREE: "90-degree",
  THREESIDEDGLASS: "3-sided-glass",
  GLASSCUBE: "glass-cube",
};

export const notificationTypes = {
  HINGESSWITCH: "hingesSwitch",
  GLASSTHICKNESSSWITCH: "glassThicknessSwitch",
  PANLEOVERWEIGHT: "panelOverWeight",
};

export const thicknessTypes = {
  THREEBYEIGHT: "3/8",
  ONEBYTWO: "1/2",
};

export const weightMultiplier = {
  THREEBYEIGHT: 4.91,
  ONEBYTWO: 6.5,
};

export const panelOverWeightAmount = 160;

// export const super_superAdmin = ["zaheer@gcs.glass","brandon@gcs.glass","chance@gcs.glass"];

export const notificationsVariant = {
  DEFAULT: "default",
  ERROR: "error",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
};

export const quoteState = {
  CREATE: "create",
  EDIT: "edit",
  CUSTOM: "custom",
};

export const userRoles = {
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  STAFF: "staff",
  CUSTOM_ADMIN: "custom_admin",
};

export const hardwareTypes = {
  HANDLES: "handles",
  DOORLOCK: "doorLock",
  HINGES: "hinges",
  SLIDINGDOORSYSTEM: "slidingDoorSystem",
  HEADER: "header",
  HARDWAREADDONS: "hardwareAddons",
  GLASSTYPE: "glassType",
  GLASSADDONS: "glassAddons",
  CHANNEL: "channel",
  CORNERWALLCLAMP: "cornerWallClamp",
  CORNERSLEEVEOVER: "cornerSleeveOver",
  CORNERGLASSTOGLASS: "cornerGlassToGlass",
  WALLCLAMP: "wallClamp",
  SLEEVEOVER: "sleeveOver",
  GLASSTOGLASS: "glassToGlass",
};

export const standardDoorWidth = 28;
export const severityColor = {
  DEFAULT: "#8477DA",
  ERROR: "rgba(226, 42, 45, 1)",
  INFO: "rgba(0, 96, 239,  0.5)",
  SUCCESS: "rgba(0, 173, 120,  1)",
  WARNING: "#FCDEC0",
};
export const severity = {
  DEFAULT: "default",
  ERROR: "error",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
};

export const EstimateCategory = {
  SHOWERS: "showers",
  MIRRORS: "mirrors",
  WINECELLARS: "wineCellars",
};

export const mirrorHardwareTypes = {
  HARDWARES: "hardwares",
  GLASSADDONS: "glassAddons",
  GLASSTYPE: "glassType",
  EDGEWORK: "edgeWork",
};
export const itemsPerPage = 10;
export const MAX_PAGES_DISPLAYED = 3;

export const socketIoChannel = {
  NOTIFICATIONS: "notifications",
};

export const notificationCategories = {
  ESTIMATES: "estimates",
};

export const projectStatus = {
  PENDING: "pending",
  VOIDED: "voided",
  APPROVED: "approved",
};
export const previewStatus = {
  PENDING: "pending",
  PREVIEW1: "first_preview",
  PREVIEW2: "second_preview",
  APPROVE: "approve",
};
export const logActions = {
  DOWNLOADPDF: "download_pdf",
  APPROVEESTIMATE: "approve_estimate",
  APPROVEPROJECT: "approve_project",
};
export const logResourceType = {
  PREVIEWLINK: "preview_link",
};

export const statusTypes = {
  PENDING: "pending",
  VOIDED: "voided",
  APPROVED: "approved",
  PAID: "Paid",
  UNPAID: "Unpaid",
  CUSTOMER_APPROVED: "customer_approved",
};

export const inputLength = 6;
export const inputMaxValue = 999999;

export const defaultNotificationState = {
  status: false,
  variant: notificationsVariant.DEFAULT,
  message: ``,
};
