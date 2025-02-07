import {
  generateNotificationsForCurrentEstimate,
} from '@/utilities/estimatorHelper';
import {
  generateContentForShowerEdit,
  generateContentForWineCellarEdit,
} from '@/utilities/generateEstimateCalculationContent';
import { createSlice } from '@reduxjs/toolkit';

import { calculateAreaAndPerimeter } from '../utilities/common';
import {
  EstimateCategory,
  hardwareTypes,
  layoutVariants,
  notificationsVariant,
  notificationTypes,
  quoteState,
  thicknessTypes,
} from '../utilities/constants';
import {
  getHardwareSpecificFabrication,
} from '../utilities/hardwarefabrication';

export const getContent = (state) => state.customsEstimate.content;
export const getAdditionalFields = (state) =>
  state.customsEstimate.content.additionalFields;
export const getCost = (state) => state.customsEstimate.actualCost;
export const getProfit = (state) => state.customsEstimate.grossProfit;
export const getTotal = (state) => state.customsEstimate.totalPrice;
export const getDoorWidth = (state) => state.customsEstimate.doorWidth;
export const getHardwareTotal = (state) => state.customsEstimate.hardwarePrice;
export const getGlassTotal = (state) => state.customsEstimate.glassPrice;
export const getGlassAddonsTotal = (state) =>
  state.customsEstimate.glassAddonsPrice;
export const getHardwareAddonsTotal = (state) =>
  state.customsEstimate.hardwareAddonsPrice;
export const getFabricationTotal = (state) =>
  state.customsEstimate.fabricationPrice;
export const getMiscTotal = (state) => state.customsEstimate.miscPrice;
export const getLaborTotal = (state) => state.customsEstimate.laborPrice;
export const getAdditionalFieldsTotal = (state) =>
  state.customsEstimate.additionalFieldsPrice;
export const getisCustomizedDoorWidth = (state) =>
  state.customsEstimate.isCustomizedDoorWidth;
export const getUserProfitPercentage = (state) =>
  state.customsEstimate.content.userProfitPercentage;
export const getEstimateDiscount = (state) =>
  state.customsEstimate.content.discount.value;
export const getEstimateDiscountUnit = (state) =>
  state.customsEstimate.content.discount.unit;
export const getEstimateDiscountTotal = (state) =>
  state.customsEstimate.content.discount.total;
export const getMeasurementSide = (state) => state.customsEstimate.measurements;
export const selectedItem = (state) => state.customsEstimate.selectedItem;
export const getPageNavigation = (state) =>
  state.customsEstimate.handlePageNavigation;
export const getPageDesktopNavigation = (state) =>
  state.customsEstimate.handlePageDesktopNavigation;
export const getQuoteId = (state) => state.customsEstimate.quoteId;
export const getProjectId = (state) => state.customsEstimate.projectId;
export const getQuoteState = (state) => state.customsEstimate.quoteState;
export const getListData = (state) => state.customsEstimate.listData;
export const getLayoutPerimeter = (state) => state.customsEstimate.perimeter;
export const getLayoutArea = (state) => state.customsEstimate.sqftArea;
export const getPanelWidth = (state) => state.customsEstimate.panelWidth;
export const getDoorWeight = (state) => state.customsEstimate.doorWeight;
export const getPanelWeight = (state) => state.customsEstimate.panelWeight;
export const getReturnWeight = (state) => state.customsEstimate.returnWeight;
export const getNotifications = (state) => state.customsEstimate.notifications;

const initialState = {
  quoteId: null,
  quoteState: "create",
  handlePageNavigation: "existing",
  handlePageDesktopNavigation: "existing",
  projectId: null,
  perimeter: 0,
  sqftArea: 0,
  doorWidth: 0,
  panelWidth: 0,
  doorWeight: 0,
  isCustomizedDoorWidth: false,
  panelWeight: 0,
  returnWeight: 0,
  measurements: [],
  notifications: {
    finishNotSelected: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    hingesSwitch: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    glassThicknessSwitch: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    panelOverweight: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    handleNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    doorLockNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    hingeNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    glassTypeNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    slidingDoorSystemNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    headerNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    channelNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    calculateChannelWarning: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    glassAddonsNotAvailable: [],
    hardwareAddonsNotAvailable: [],
    wallClampNotAvailable: [],
    sleeveOverNotAvailable: [],
    glassToGlassNotAvailable: [],
    cornerWallClampNotAvailable: [],
    cornerSleeveOverNotAvailable: [],
    cornerGlassToGlassNotAvailable: [],
  },
  selectedItem: null,
  listData: null,
  content: {
    additionalFields: [],
    hardwareFinishes: null,
    handles: {
      item: null,
      count: 0,
      cost: 0,
    },
    doorLock: {
      item: null,
      count: 0,
      cost: 0,
    },
    hinges: {
      item: null,
      count: 0,
      cost: 0,
    },
    mountingClamps: {
      wallClamp: [],
      sleeveOver: [],
      glassToGlass: [],
    },
    cornerClamps: {
      cornerWallClamp: [],
      cornerSleeveOver: [],
      cornerGlassToGlass: [],
    },
    mountingChannel: {
      item: null,
      count: 0,
    },
    header: {
      item: null,
      count: 0,
      cost: 0,
    },
    slidingDoorSystem: {
      item: null,
      count: 0,
      cost: 0,
    },
    glassType: {
      item: null,
      thickness: thicknessTypes.THREEBYEIGHT,
      cost: 0,
    },
    glassAddons: [],
    oneInchHoles: 0,
    hingeCut: 0,
    clampCut: 0,
    notch: 0,
    outages: 0,
    mitre: 0,
    polish: 0,
    people: 0,
    hours: 0,
    hardwareAddons: [],
    mountingState: "channel",
    userProfitPercentage: 0,
    sufferCostDifference: false,
    discount: {
      value: 0,
      unit: "%",
      total: 0,
    },
  },
  actualCost: 0,
  grossProfit: 0,
  totalPrice: 0,
  hardwarePrice: 0,
  glassPrice: 0,
  glassAddonsPrice: 0,
  hardwareAddonsPrice: 0,
  fabricationPrice: 0,
  miscPrice: 0,
  laborPrice: 0,
  additionalFieldsPrice: 0,
};
const customsEstimateSlice = createSlice({
  name: "customsEstimate",
  initialState,
  reducers: {
    resetCustomsEstimateState: (state) => {
      return {
        ...initialState,
      };
    },
    setDoorWidth: (state, action) => {
      state.doorWidth = action.payload;
    },
    setPanelWidth: (state, action) => {
      state.panelWidth = action.payload;
    },
    setDoorWeight: (state, action) => {
      state.doorWeight = action.payload;
    },
    setPanelWeight: (state, action) => {
      state.panelWeight = action.payload;
    },
    setReturnWeight: (state, action) => {
      state.returnWeight = action.payload;
    },
    setisCustomizedDoorWidth: (state, action) => {
      state.isCustomizedDoorWidth = action.payload;
    },
    setSingleNotification: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case notificationTypes.HINGESSWITCH:
          state.notifications = {
            ...state.notifications,
            hingesSwitch: payload,
          };
          break;
        case notificationTypes.GLASSTHICKNESSSWITCH:
          state.notifications = {
            ...state.notifications,
            glassThicknessSwitch: payload,
          };
          break;
        case notificationTypes.PANLEOVERWEIGHT:
          state.notifications = {
            ...state.notifications,
            panelOverweight: payload,
          };
          break;
        default:
          state.notifications = initialState.notifications;
          break;
      }
    },
    setMultipleNotifications: (state, action) => {
      const { selectedContent, notifications } = action.payload;
      state.notifications = notifications;
      state.content = selectedContent;
    },
    resetNotifications: (state) => {
      state.notifications = initialState.notifications;
    },
    setContent: (state, action) => {
      const { type, item } = action.payload;
      /** Calculate and modify fabrication values according to current hardware selected or unselected  */
      const fabricationsCount = {
        oneInchHoles: state.content.oneInchHoles,
        hingeCut: state.content.hingeCut,
        clampCut: state.content.clampCut,
        notch: state.content.notch,
        outages: state.content.outages,
      };

      if (
        [
          hardwareTypes.HANDLES,
          hardwareTypes.HINGES,
          hardwareTypes.SLIDINGDOORSYSTEM,
          hardwareTypes.HEADER,
          hardwareTypes.CHANNEL,
          hardwareTypes.DOORLOCK,
        ].includes(type)
      ) {
        let currentHardware = null;
        let newHardware = null;
        if ([hardwareTypes.CHANNEL].includes(type)) {
          const selectedSameItem =
            item?._id === state.content.mountingChannel.item?._id;
          currentHardware = {
            item: state.content.mountingChannel.item,
            count: state.content.mountingChannel.item ? 1 : 0,
          };
          newHardware = {
            item: selectedSameItem ? null : item,
            count: selectedSameItem ? 0 : 1,
          };
          // Generate / remove Channel calculate warning upon selecting or unselecting channel
          state.notifications.calculateChannelWarning = {
            status: selectedSameItem ? false : true,
            variant: selectedSameItem
              ? notificationsVariant.DEFAULT
              : notificationsVariant.WARNING,
            message: selectedSameItem
              ? ""
              : "Current channel price is being calculated according to 1 channel stick",
          };
        } else if ([hardwareTypes.DOORLOCK].includes(type)) {
          const selectedSameItem =
            item?._id === state.content.doorLock.item?._id;
          currentHardware = {
            item: state.content.doorLock.item,
            count: state.content.doorLock.item ? 1 : 0,
          };
          newHardware = {
            item: selectedSameItem ? null : item,
            count: selectedSameItem ? 0 : 1,
          };
        } else {
          currentHardware = {
            item: state.content?.[type]?.item,
            count: state.content?.[type]?.count ?? 0,
          };
          newHardware = {
            item: item,
            count: state.content?.[type]?.count ?? 0,
          };
        }
        const hardwareFabrication = getHardwareSpecificFabrication(
          type,
          fabricationsCount,
          currentHardware,
          newHardware
        );

        if (hardwareFabrication) {
          state.content = {
            ...state.content,
            oneInchHoles: hardwareFabrication.oneInchHoles,
            hingeCut: hardwareFabrication.hingeCut,
            clampCut: hardwareFabrication.clampCut,
            notch: hardwareFabrication.notch,
            outages: hardwareFabrication.outages,
          };
        }
      }
      if (["wallClamp", "sleeveOver", "glassToGlass"].includes(type)) {
        console.log("Nice Try.");
      } else if (["channel"].includes(type)) {
        let itemCost = 0;
        itemCost = item?.finishes?.find(
          (item) => item?.finish_id === state.content.hardwareFinishes._id
        )?.cost;
        const found = item?._id === state.content.mountingChannel.item?._id;
        state.content = {
          ...state.content,
          mountingChannel: {
            item: found ? null : item,
            count: found ? 0 : 1,
            cost: itemCost,
          },
        };
      } else if ([hardwareTypes.DOORLOCK].includes(type)) {
        let itemCost = 0;
        itemCost = item?.finishes?.find(
          (item) => item?.finish_id === state.content.hardwareFinishes._id
        )?.cost;
        const found = item?._id === state.content.doorLock.item?._id;
        state.content = {
          ...state.content,
          doorLock: {
            item: found ? null : item,
            count: found ? 0 : 1,
            cost: itemCost ?? 0,
          },
        };
      } else if (["hardwareFinishes"].includes(type)) {
        const notificationsResult = generateNotificationsForCurrentEstimate(
          {
            ...state,
            content: {
              ...state.content,
              hardwareFinishes: item,
            },
          },
          state.content.glassType.thickness
        );
        state.notifications = notificationsResult.notifications;
        state.content = {
          ...state.content,
          [type]: item,
        };
      } else if (["hardwareAddons"].includes(type)) {
        console.log("Nice Try.");
      } else if (["glassAddons"].includes(type)) {
        let glassAddonCost = 0;
        glassAddonCost = item?.options?.[0]?.cost;
        if (item.slug === "no-treatment") {
          const noGlassAddon = state.listData.glassAddons?.find(
            (item) => item.slug === "no-treatment"
          );
          state.content.glassAddons = [{ item: noGlassAddon, cost: 0 }];
        } else {
          const foundIndex = state.content.glassAddons?.findIndex(
            (row) => row.item.slug === item.slug
          );
          if (foundIndex !== -1) {
            state.content.glassAddons.splice(foundIndex, 1);
          } else {
            state.content.glassAddons.push({
              item: item,
              cost: glassAddonCost,
            });
          }
          const indexOfNoTreatment = state.content.glassAddons?.findIndex(
            (row) => row.item.slug === "no-treatment"
          );
          if (indexOfNoTreatment !== -1) {
            state.content.glassAddons.splice(indexOfNoTreatment, 1);
          }
        }
      } else if (["additionalFields"].includes(type)) {
        state.content = {
          ...state.content,
          [type]: item,
        };
      } else if (["glassType"].includes(type)) {
        let itemCost = item?.options?.find(
          (item) => item?.thickness === state.content.glassType.thickness
        )?.cost;
        state.content = {
          ...state.content,
          glassType: {
            ...state.content.glassType,
            item: item,
            cost: itemCost ?? 0,
          },
        };
      } else {
        let itemCost = 0;
        itemCost = item?.finishes?.find(
          (item) => item?.finish_id === state.content.hardwareFinishes._id
        )?.cost;
        state.content = {
          ...state.content,
          [type]: {
            ...state.content[type],
            item: item,
            cost: itemCost,
          },
        };
      }
    },
    setCounters: (state, action) => {
      const { type, value, item } = action.payload;
      /** Calculate and modify fabrication values according to current hardware selected or unselected  */
      const fabricationsCount = {
        oneInchHoles: state.content.oneInchHoles,
        hingeCut: state.content.hingeCut,
        clampCut: state.content.clampCut,
        notch: state.content.notch,
        outages: state.content.outages,
      };

      if (
        [
          hardwareTypes.HANDLES,
          hardwareTypes.HINGES,
          hardwareTypes.DOORLOCK,
          hardwareTypes.SLIDINGDOORSYSTEM,
          hardwareTypes.HEADER,
          hardwareTypes.HARDWAREADDONS,
          hardwareTypes.WALLCLAMP,
          hardwareTypes.SLEEVEOVER,
          hardwareTypes.GLASSTOGLASS,
          hardwareTypes.CORNERWALLCLAMP,
          hardwareTypes.CORNERSLEEVEOVER,
          hardwareTypes.CORNERGLASSTOGLASS,
        ].includes(type)
      ) {
        let currentHardware = null;
        let newHardware = null;
        let oldCounterValue = 0;
        if (
          [
            hardwareTypes.WALLCLAMP,
            hardwareTypes.SLEEVEOVER,
            hardwareTypes.GLASSTOGLASS,
          ].includes(type)
        ) {
          const oldItem = state.content.mountingClamps[type]?.find(
            (row) => row?.item?._id === item._id
          );
          oldCounterValue = oldItem?.count ?? 0;
        } else if (
          [
            hardwareTypes.CORNERWALLCLAMP,
            hardwareTypes.CORNERSLEEVEOVER,
            hardwareTypes.CORNERGLASSTOGLASS,
          ].includes(type)
        ) {
          const oldItem = state.content.cornerClamps[type]?.find(
            (row) => row?.item?._id === item._id
          );
          oldCounterValue = oldItem?.count ?? 0;
        } else if ([hardwareTypes.HARDWAREADDONS].includes(type)) {
          const oldItem = state.content.hardwareAddons?.find(
            (row) => row?.item?._id === item._id
          );
          oldCounterValue = oldItem?.count ?? 0;
        } else {
          oldCounterValue = state.content?.[type]?.count ?? 0;
        }
        currentHardware = {
          item,
          count: oldCounterValue,
        };
        newHardware = {
          item,
          count: value ?? 0,
        };

        const hardwareFabrication = getHardwareSpecificFabrication(
          type,
          fabricationsCount,
          currentHardware,
          newHardware
        );

        if (hardwareFabrication) {
          state.content = {
            ...state.content,
            oneInchHoles: hardwareFabrication.oneInchHoles,
            hingeCut: hardwareFabrication.hingeCut,
            clampCut: hardwareFabrication.clampCut,
            notch: hardwareFabrication.notch,
            outages: hardwareFabrication.outages,
          };
        }
      }
      let allClamps = ["wallClamp", "sleeveOver", "glassToGlass"];
      let allCorners = [
        "cornerWallClamp",
        "cornerSleeveOver",
        "cornerGlassToGlass",
      ];

      if (allClamps.includes(type) || allCorners.includes(type)) {
        let existing;
        let clampsCost = 0;
        clampsCost = item?.finishes?.find(
          (item) => item?.finish_id === state.content.hardwareFinishes._id
        )?.cost;
        if (allClamps.includes(type)) {
          existing = state.content.mountingClamps[type];
        } else {
          existing = state.content.cornerClamps[type];
        }

        const foundIndex = existing.findIndex(
          (row) => row?.item?.slug === item.slug
        );
        if (foundIndex !== -1) {
          if (value <= 0) {
            existing.splice(foundIndex, 1);
          } else {
            existing[foundIndex].count = value;
          }
        } else {
          existing.push({ item: item, count: value, cost: clampsCost });
        }

        if (allClamps.includes(type)) {
          state.content.mountingClamps = {
            ...state.content.mountingClamps,
            [type]: existing,
          };
        } else {
          state.content.cornerClamps = {
            ...state.content.cornerClamps,
            [type]: existing,
          };
        }
      } else if (["hardwareAddons"].includes(type)) {
        let existing = state.content.hardwareAddons;
        let hardwareAddonCost = 0;
        hardwareAddonCost = item?.finishes?.find(
          (item) => item?.finish_id === state.content.hardwareFinishes._id
        )?.cost;
        const foundIndex = existing.findIndex(
          (row) => row?.item?.slug === item.slug
        );
        if (foundIndex !== -1) {
          if (value <= 0) {
            existing.splice(foundIndex, 1);
          } else {
            existing[foundIndex].count = value;
          }
        } else {
          existing.push({ item: item, count: value, cost: hardwareAddonCost });
        }
        state.content = {
          ...state.content,
          hardwareAddons: [...existing],
        };
      } else {
        let itemCost = 0;
        itemCost = item?.finishes?.find(
          (item) => item?.finish_id === state.content.hardwareFinishes._id
        )?.cost;
        state.content = {
          ...state.content,
          [type]: {
            ...state.content[type],
            count: value,
            cost: itemCost,
          },
        };
      }
    },
    setSufferCostDifference: (state, action) => {
      const calculateNewCost = (type, identifierKey, identifierValue) => {
        const cost = state.content[type]?.cost;
        const currentCost = state.content[type]?.item?.[identifierKey]?.find(
          (item) => item[identifierValue.key] === identifierValue?.value
        )?.cost;

        return cost >= 0 && cost !== currentCost ? currentCost : cost;
      };

      // Update glass cost
      const newGlassCost = calculateNewCost("glassType", "options", {
        key: "thickness",
        value: state.content.glassType.thickness,
      });

      // Update handle cost
      const newHandleCost = calculateNewCost("handles", "finishes", {
        key: "finish_id",
        value: state.content.hardwareFinishes._id,
      });

      // Update hinge cost
      const newHingCost = calculateNewCost("hinges", "finishes", {
        key: "finish_id",
        value: state.content.hardwareFinishes._id,
      });
      // Update Door Lock cost
      const newDoorLockCost = calculateNewCost("doorLock", "finishes", {
        key: "finish_id",
        value: state.content.hardwareFinishes._id,
      });
      // Update Header cost
      const newHeaderCost = calculateNewCost("header", "finishes", {
        key: "finish_id",
        value: state.content.hardwareFinishes._id,
      });
      const newSlidingDoorSystemCost = calculateNewCost(
        "slidingDoorSystem",
        "finishes",
        {
          key: "finish_id",
          value: state.content.hardwareFinishes._id,
        }
      );
      const newMountingChannelCost = calculateNewCost(
        "mountingChannel",
        "finishes",
        {
          key: "finish_id",
          value: state.content.hardwareFinishes._id,
        }
      );
      const newCornerWallClampCost =
        state?.content?.cornerClamps?.cornerWallClamp?.map((item, index) => {
          const cost = calculateNewCost(
            `cornerClamps.cornerWallClamp[${index}]`,
            "finishes",
            {
              key: "finish_id",
              value: state.content.hardwareFinishes._id,
            }
          );
          return {
            ...item,
            cost: cost ?? 0,
          };
        });
      const newCornerSleeveOverCost =
        state?.content?.cornerClamps?.cornerSleeveOver?.map((item, index) => {
          const cost = calculateNewCost(
            `cornerClamps.cornerSleeveOver[${index}]`,
            "finishes",
            {
              key: "finish_id",
              value: state.content.hardwareFinishes._id,
            }
          );
          return {
            ...item,
            cost: cost ?? 0,
          };
        });
      const newCornerGlassToGlassCost =
        state?.content?.cornerClamps?.cornerGlassToGlass?.map((item, index) => {
          const cost = calculateNewCost(
            `cornerClamps.cornerGlassToGlass[${index}]`,
            "finishes",
            {
              key: "finish_id",
              value: state.content.hardwareFinishes._id,
            }
          );
          return {
            ...item,
            cost: cost ?? 0,
          };
        });
      const newWallClampCost = state?.content?.mountingClamps?.wallClamp?.map(
        (item, index) => {
          const cost = calculateNewCost(
            `mountingClamps.wallClamp[${index}]`,
            "finishes",
            {
              key: "finish_id",
              value: state.content.hardwareFinishes._id,
            }
          );
          return {
            ...item,
            cost: cost ?? 0,
          };
        }
      );
      const newSleeveOverCost = state?.content?.mountingClamps?.sleeveOver?.map(
        (item, index) => {
          const cost = calculateNewCost(
            `mountingClamps.sleeveOver[${index}]`,
            "finishes",
            {
              key: "finish_id",
              value: state.content.hardwareFinishes._id,
            }
          );
          return {
            ...item,
            cost: cost ?? 0,
          };
        }
      );
      const newGlassToGlassCost =
        state?.content?.mountingClamps?.glassToGlass?.map((item, index) => {
          const cost = calculateNewCost(
            `mountingClamps.glassToGlass[${index}]`,
            "finishes",
            {
              key: "finish_id",
              value: state.content.hardwareFinishes._id,
            }
          );
          return {
            ...item,
            cost: cost ?? 0,
          };
        });
      const glassAddonsCost = state?.content?.glassAddons?.map((item) => {
        const itemCost = item?.cost;
        const currentCost = item?.item?.options[0]?.cost;
        let newCost =
          itemCost >= 0 && itemCost !== currentCost ? currentCost : itemCost;
        return {
          ...item,
          cost: newCost ?? 0,
        };
      });
      const hardwareAddonsCost = state?.content?.hardwareAddons?.map(
        (item, index) => {
          const cost = calculateNewCost(
            `hardwareAddons[${index}]`,
            "finishes",
            {
              key: "finish_id",
              value: state.content.hardwareFinishes._id,
            }
          );
          return {
            ...item,
            cost: cost ?? 0,
          };
        }
      );
      state.content = {
        ...state.content,
        handles: {
          ...state.content.handles,
          cost: newHandleCost ?? 0,
        },
        hinges: {
          ...state.content.hinges,
          cost: newHingCost ?? 0,
        },
        doorLock: {
          ...state.content.doorLock,
          cost: newDoorLockCost ?? 0,
        },
        header: {
          ...state.content.header,
          cost: newHeaderCost ?? 0,
        },
        slidingDoorSystem: {
          ...state.content.slidingDoorSystem,
          cost: newSlidingDoorSystemCost ?? 0,
        },
        glassType: {
          ...state.content.glassType,
          cost: newGlassCost ?? 0,
        },
        mountingChannel: {
          ...state.content.mountingChannel,
          cost: newMountingChannelCost || 0,
        },
        mountingClamps: {
          ...state.content.mountingClamps,
          wallClamp: newWallClampCost ?? [],
          sleeveOver: newSleeveOverCost ?? [],
          glassToGlass: newGlassToGlassCost ?? [],
        },
        cornerClamps: {
          ...state.content.cornerClamps,
          cornerWallClamp: newCornerWallClampCost ?? [],
          cornerSleeveOver: newCornerSleeveOverCost ?? [],
          cornerGlassToGlass: newCornerGlassToGlassCost ?? [],
        },
        glassAddons: glassAddonsCost ?? [],
        hardwareAddons: hardwareAddonsCost ?? [],
        sufferCostDifference: false,
      };
    },
    setUserProfitPercentage: (state, action) => {
      const { payload } = action;
      state.content.userProfitPercentage = payload;
    },
    setEstimateDiscount: (state, action) => {
      const { payload } = action;
      state.content.discount.value = payload;
    },
    setEstimateDiscountUnit: (state, action) => {
      const { payload } = action;
      state.content.discount.unit = payload;
    },
    setEstimateDiscountTotal: (state, action) => {
      const { payload } = action;
      state.content.discount.total = payload;
    },
    setTotal: (state, action) => {
      const { payload } = action;
      state.totalPrice = payload;
    },
    setCost: (state, action) => {
      const { payload } = action;
      state.actualCost = payload;
    },
    setProfit: (state, action) => {
      const { payload } = action;
      state.grossProfit = payload;
    },
    setHardwarePrice: (state, action) => {
      const { payload } = action;
      state.hardwarePrice = payload;
    },
    setGlassPrice: (state, action) => {
      const { payload } = action;
      state.glassPrice = payload;
    },
    setGlassAddonsPrice: (state, action) => {
      const { payload } = action;
      state.glassAddonsPrice = payload;
    },
    setHardwareAddonsPrice: (state, action) => {
      const { payload } = action;
      state.hardwareAddonsPrice = payload;
    },
    setFabricationPrice: (state, action) => {
      const { payload } = action;
      state.fabricationPrice = payload;
    },
    setMiscPrice: (state, action) => {
      const { payload } = action;
      state.miscPrice = payload;
    },
    setLaborPrice: (state, action) => {
      const { payload } = action;
      state.laborPrice = payload;
    },
    setAdditionalFieldsPrice: (state, action) => {
      const { payload } = action;
      state.additionalFieldsPrice = payload;
    },

    setInputContent: (state, action) => {
      const { type, value } = action.payload;
      if (["mitre"].includes(type)) {
        // const mitre = value;
        const polish = state.perimeter - value;
        state.content = {
          ...state.content,
          mitre: value,
          polish: polish,
        };
      } else {
        state.content = {
          ...state.content,
          [type]: value,
        };
      }
    },
    setThickness: (state, action) => {
      const { payload } = action;
      /** on change glass thickness shift active channel of layout */
      const currentChannel = state.content.mountingChannel.item;
      let newChannel = null;
      if (payload === thicknessTypes.ONEBYTWO) {
        if (currentChannel) {
          newChannel = state.listData?.mountingChannel?.find(
            (item) => item.slug === "u-channel-1-2"
          );
        }
      } else if (payload === thicknessTypes.THREEBYEIGHT) {
        if (currentChannel) {
          newChannel = state.listData?.mountingChannel?.find(
            (item) => item.slug === "u-channel-3-8"
          );
        }
      }
      /** end */
      /** Calculate fabrication of newly selected mounting after glass thickness shift */
      const fabricationsCount = {
        oneInchHoles: state.content.oneInchHoles,
        hingeCut: state.content.hingeCut,
        clampCut: state.content.clampCut,
        notch: state.content.notch,
        outages: state.content.outages,
      };
      const hardwareFabrication = getHardwareSpecificFabrication(
        hardwareTypes.CHANNEL,
        fabricationsCount,
        { item: currentChannel, count: currentChannel ? 1 : 0 },
        { item: newChannel, count: newChannel ? 1 : 0 }
      );

      /** Calculate all weights on shifting glass thickness */
      const result = calculateAreaAndPerimeter(
        state.measurements,
        state.selectedItem?.settings?.variant ?? layoutVariants.CUSTOM,
        payload
      );
      let channelCost = newChannel?.finishes?.find(
        (finish) => finish.finish_id === state.content.hardwareFinishes?._id
      )?.cost;
      let glassCost = state.content.glassType?.item?.options?.find(
        (option) => option.thickness === payload
      )?.cost;
      /** end */
      return {
        ...state,
        doorWeight: result?.doorWeight ?? state.doorWeight,
        panelWeight: result?.panelWeight ?? state.panelWeight,
        returnWeight: result?.returnWeight ?? state.returnWeight,
        content: {
          ...state.content,
          glassType: {
            ...state.content.glassType,
            thickness: payload,
            cost: glassCost ?? 0,
          },
          mountingChannel: {
            item: newChannel,
            count: newChannel ? 1 : 0,
            cost: channelCost ?? 0,
          },
          oneInchHoles: hardwareFabrication.oneInchHoles,
          hingeCut: hardwareFabrication.hingeCut,
          clampCut: hardwareFabrication.clampCut,
          notch: hardwareFabrication.notch,
          outages: hardwareFabrication.outages,
        },
      };
    },
    setHardwareFabricationQuantity: (state, action) => {
      const { oneInchHoles, hingeCut, clampCut, notch, outages } =
        action.payload;
      state.content = {
        ...state.content,
        oneInchHoles,
        hingeCut,
        clampCut,
        notch,
        outages,
      };
    },
    updateMeasurements: (state, action) => {
      const newMeasurements = action.payload;
      state.measurements = newMeasurements;
    },
    setListData: (state, action) => {
      const list = action.payload;
      state.listData = list;
    },
    addSelectedItem: (state, action) => {
      const itemData = action.payload;
      state.selectedItem = itemData;
    },
    setNavigation: (state, action) => {
      state.handlePageNavigation = action.payload;
    },
    setNavigationDesktop: (state, action) => {
      state.handlePageDesktopNavigation = action.payload;
    },
    setQuoteState: (state, action) => {
      state.quoteState = action.payload;
    },
    setShowerProjectId: (state, action) => {
      state.projectId = action.payload;
    },
    setLayoutArea: (state, action) => {
      state.sqftArea = action.payload;
    },
    setLayoutPerimeter: (state, action) => {
      state.perimeter = action.payload;
      state.content = {
        ...state.content,
        polish: action.payload,
      };
    },
    setActiveMounting: (state, action) => {
      const { payload } = action;
      state.content.mountingState = payload;
      /* switch to default selected data of a layout or existing estimate */

      if (["create"].includes(state.quoteState)) {
        let fabricationsCount = {
          oneInchHoles: state.content.oneInchHoles,
          hingeCut: state.content.hingeCut,
          clampCut: state.content.clampCut,
          notch: state.content.notch,
          outages: state.content.outages,
        };

        // if state is create quote
        if (["channel"].includes(payload?.toLowerCase())) {
          // for channel
          console.log("shifting to channel");

          /** on shifting to default channel, remove fabrication of already selected clamps */
          state.content.mountingClamps.wallClamp.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.WALLCLAMP,
              fabricationsCount,
              { item: record.item, count: record?.count ?? 0 },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
            console.log("current fabrication wall clamp", fabricationsCount);
          });
          state.content.mountingClamps.sleeveOver.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.SLEEVEOVER,
              fabricationsCount,
              { item: record.item, count: record?.count ?? 0 },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
            console.log("current fabrication sleeve over", fabricationsCount);
          });
          state.content.mountingClamps.glassToGlass.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.GLASSTOGLASS,
              fabricationsCount,
              { item: record.item, count: record?.count ?? 0 },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
            console.log(
              "current fabrication glass to glass",
              fabricationsCount
            );
          });
          /** end */

          let mountingAccordingToThickness = null;
          if (state.content.glassType.thickness === thicknessTypes.ONEBYTWO) {
            mountingAccordingToThickness =
              state.listData?.mountingChannel?.find(
                (item) => item.slug === "u-channel-1-2"
              );
          } else if (
            state.content.glassType.thickness === thicknessTypes.THREEBYEIGHT
          ) {
            mountingAccordingToThickness =
              state.listData?.mountingChannel?.find(
                (item) => item.slug === "u-channel-3-8"
              );
          }

          const defaultItem = state.listData?.mountingChannel?.find(
            (item) => item._id === state.selectedItem?.settings?.mountingChannel
          );

          // perform fabrication and update only if layout default channel is according to current glass thickness
          if (
            defaultItem &&
            defaultItem?.slug === mountingAccordingToThickness?.slug
          ) {
            /** on shifting to default channel add fabrication of default selected channel */
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.CHANNEL,
              fabricationsCount,
              { item: null, count: 0 },
              { item: defaultItem, count: defaultItem ? 1 : 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
            //Generating channel calculate warning on shifting to layout default
            state.notifications.calculateChannelWarning = {
              status: true,
              variant: notificationsVariant.WARNING,
              message:
                "Current channel price is being calculated according to 1 channel stick",
            };

            let channelCost = defaultItem?.finishes?.find(
              (finish) =>
                finish.finish_id === state.content.hardwareFinishes?._id
            )?.cost;
            // set mounting channel
            state.content = {
              ...state.content,
              mountingChannel: {
                item: defaultItem,
                count: 1,
                cost: channelCost ?? 0,
              },
            };
            /** end */
            console.log(
              "default channel selected fabrication",
              fabricationsCount
            );
          }
          // set new fabrication with remove selected mounting clamps
          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: [],
              sleeveOver: [],
              glassToGlass: [],
            },
            oneInchHoles: fabricationsCount.oneInchHoles,
            hingeCut: fabricationsCount.hingeCut,
            clampCut: fabricationsCount.clampCut,
            notch: fabricationsCount.notch,
            outages: fabricationsCount.outages,
          };
        } else if (["clamps"].includes(payload?.toLowerCase())) {
          // for clamps
          console.log("shifting to clamps");
          /** on shifting to default clamps remove fabrication of selected channel */
          const hardwareFabrication = getHardwareSpecificFabrication(
            hardwareTypes.CHANNEL,
            fabricationsCount,
            {
              item: state.content.mountingChannel.item,
              count: state.content.mountingChannel.item ? 1 : 0,
            },
            { item: null, count: 0 }
          );
          fabricationsCount = { ...hardwareFabrication };
          console.log("current febrication", fabricationsCount);
          /** end */

          let wallClampItem = null;
          wallClampItem = state.listData?.wallClamp?.find(
            (item) =>
              item._id ===
              state.selectedItem?.settings?.wallClamp?.wallClampType
          );
          let sleeveOverItem = null;
          sleeveOverItem = state.listData?.sleeveOver?.find(
            (item) =>
              item._id ===
              state.selectedItem?.settings?.sleeveOver?.sleeveOverType
          );
          let glassToGlassItem = null;
          glassToGlassItem = state.listData?.glassToGlass?.find(
            (item) =>
              item._id ===
              state.selectedItem?.settings?.glassToGlass?.glassToGlassType
          );
          /** on shifting to default clamps, add fabrication of default selected clamps  */
          if (wallClampItem) {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.WALLCLAMP,
              fabricationsCount,
              { item: null, count: 0 },
              {
                item: wallClampItem,
                count: state.selectedItem?.settings?.wallClamp?.count,
              }
            );
            fabricationsCount = { ...hardwareFabrication };
            console.log("wall clamp item fabrication", fabricationsCount);
          }
          if (sleeveOverItem) {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.SLEEVEOVER,
              fabricationsCount,
              { item: null, count: 0 },
              {
                item: sleeveOverItem,
                count: state.selectedItem?.settings?.sleeveOver?.count,
              }
            );
            fabricationsCount = { ...hardwareFabrication };
            console.log("sleeve over item fabrication", fabricationsCount);
          }
          if (glassToGlassItem) {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.GLASSTOGLASS,
              fabricationsCount,
              { item: null, count: 0 },
              {
                item: glassToGlassItem,
                count: state.selectedItem?.settings?.glassToGlass?.count,
              }
            );
            fabricationsCount = { ...hardwareFabrication };
            console.log("glass to glass item fabrication", fabricationsCount);
          }

          /** end */

          //Remove Channel calculate warning upon shifting channel to clamps
          state.notifications.calculateChannelWarning = {
            status: false,
            variant: notificationsVariant.DEFAULT,
            message: "",
          };

          let wallClampCost = wallClampItem?.finishes?.find(
            (finish) => finish.finish_id === state.content.hardwareFinishes?._id
          )?.cost;
          let sleeveOverCost = sleeveOverItem?.finishes?.find(
            (finish) => finish.finish_id === state.content.hardwareFinishes?._id
          )?.cost;
          let glassToGlassCost = glassToGlassItem?.finishes?.find(
            (finish) => finish.finish_id === state.content.hardwareFinishes?._id
          )?.cost;
          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: wallClampItem
                ? [
                    {
                      item: wallClampItem,
                      count: state.selectedItem?.settings?.wallClamp?.count,
                      cost: wallClampCost ?? 0,
                    },
                  ]
                : [],
              sleeveOver: sleeveOverItem
                ? [
                    {
                      item: sleeveOverItem,
                      count: state.selectedItem?.settings?.sleeveOver?.count,
                      cost: sleeveOverCost ?? 0,
                    },
                  ]
                : [],
              glassToGlass: glassToGlassItem
                ? [
                    {
                      item: glassToGlassItem,
                      count: state.selectedItem?.settings?.glassToGlass?.count,
                      cost: glassToGlassCost ?? 0,
                    },
                  ]
                : [],
            },
            mountingChannel: {
              item: null,
              count: 0,
              cost: 0,
            },
            oneInchHoles: fabricationsCount.oneInchHoles,
            hingeCut: fabricationsCount.hingeCut,
            clampCut: fabricationsCount.clampCut,
            notch: fabricationsCount.notch,
            outages: fabricationsCount.outages,
          };
        }
      }
      // if state is edit quote
      else if (["edit"].includes(state.quoteState)) {
        let fabricationsCount = {
          oneInchHoles: state.content.oneInchHoles,
          hingeCut: state.content.hingeCut,
          clampCut: state.content.clampCut,
          notch: state.content.notch,
          outages: state.content.outages,
        };

        if (["channel"].includes(payload?.toLowerCase())) {
          // for channel

          /** on shifting to default channel, remove fabrication of already selected clamps */
          state.content.mountingClamps.wallClamp.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.WALLCLAMP,
              fabricationsCount,
              { item: record.item, count: record.count },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          state.content.mountingClamps.sleeveOver.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.SLEEVEOVER,
              fabricationsCount,
              { item: record.item, count: record.count },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          state.content.mountingClamps.glassToGlass.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.GLASSTOGLASS,
              fabricationsCount,
              { item: record.item, count: record.count },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          /** end */

          let mountingAccordingToThickness = null;
          if (state.content.glassType.thickness === thicknessTypes.ONEBYTWO) {
            mountingAccordingToThickness =
              state.listData?.mountingChannel?.find(
                (item) => item.slug === "u-channel-1-2"
              );
          } else if (
            state.content.glassType.thickness === thicknessTypes.THREEBYEIGHT
          ) {
            mountingAccordingToThickness =
              state.listData?.mountingChannel?.find(
                (item) => item.slug === "u-channel-3-8"
              );
          }

          const defaultItem = state.listData?.mountingChannel?.find(
            (item) => item._id === state.selectedItem?.config?.mountingChannel
          );

          // perform fabrication and update only if layout default channel is according to current glass thickness
          if (
            defaultItem &&
            defaultItem?.slug === mountingAccordingToThickness?.slug
          ) {
            /** on shifting to default channel add fabrication of default selected channel */
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.CHANNEL,
              fabricationsCount,
              { item: null, count: 0 },
              { item: defaultItem, count: defaultItem ? 1 : 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
            //Generating channel calculate warning on shifting to layout default
            state.notifications.calculateChannelWarning = {
              status: true,
              variant: notificationsVariant.WARNING,
              message:
                "Current channel price is being calculated according to 1 channel stick",
            };
            let channelCost = defaultItem?.finishes?.find(
              (finish) =>
                finish.finish_id === state.content.hardwareFinishes?._id
            )?.cost;
            // set moutning channel
            state.content = {
              ...state.content,
              mountingChannel: {
                item: defaultItem,
                count: 1,
                cost: channelCost ?? 0,
              },
            };
          }
          // set new fabrication with remove selected mounting clamps
          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: [],
              sleeveOver: [],
              glassToGlass: [],
            },
            oneInchHoles: fabricationsCount.oneInchHoles,
            hingeCut: fabricationsCount.hingeCut,
            clampCut: fabricationsCount.clampCut,
            notch: fabricationsCount.notch,
            outages: fabricationsCount.outages,
          };
        } else if (["clamps"].includes(payload?.toLowerCase())) {
          // for clamps

          /** on shifting to default clamps remove fabrication of selected channel */
          const hardwareFabrication = getHardwareSpecificFabrication(
            hardwareTypes.CHANNEL,
            fabricationsCount,
            {
              item: state.content.mountingChannel.item,
              count: state.content.mountingChannel.item ? 1 : 0,
            },
            { item: null, count: 0 }
          );
          fabricationsCount = { ...hardwareFabrication };
          /** end */

          let wallClampArray = [];
          wallClampArray =
            state.selectedItem?.config?.mountingClamps?.wallClamp?.map(
              (row) => {
                const record = state.listData?.wallClamp?.find(
                  (clamp) => clamp._id === row?.type
                );
                let cost = record?.finishes?.find(
                  (finish) =>
                    finish.finish_id === state.content.hardwareFinishes?._id
                )?.cost;
                return { item: record, count: row.count, cost: cost ?? 0 };
              }
            );
          let sleeveOverArray = [];
          sleeveOverArray =
            state.selectedItem?.config?.mountingClamps?.sleeveOver?.map(
              (row) => {
                const record = state.listData?.sleeveOver?.find(
                  (clamp) => clamp._id === row?.type
                );
                let cost = record?.finishes?.find(
                  (finish) =>
                    finish.finish_id === state.content.hardwareFinishes?._id
                )?.cost;
                return { item: record, count: row.count, cost: cost ?? 0 };
              }
            );
          let glassToGlassArray = [];
          glassToGlassArray =
            state.selectedItem?.config?.mountingClamps?.glassToGlass?.map(
              (row) => {
                const record = state.listData?.glassToGlass?.find(
                  (clamp) => clamp._id === row?.type
                );
                let cost = record?.finishes?.find(
                  (finish) =>
                    finish.finish_id === state.content.hardwareFinishes?._id
                )?.cost;
                return { item: record, count: row.count, cost: cost ?? 0 };
              }
            );

          /** on shifting to default clamps, add fabrication of default shifted clamps  */
          wallClampArray.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.WALLCLAMP,
              fabricationsCount,
              { item: null, count: 0 },
              { item: record.item, count: record.count }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          sleeveOverArray.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.SLEEVEOVER,
              fabricationsCount,
              { item: null, count: 0 },
              { item: record.item, count: record.count }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          glassToGlassArray.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.GLASSTOGLASS,
              fabricationsCount,
              { item: null, count: 0 },
              { item: record.item, count: record.count }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          //Remove Channel calculate warning upon shifting channel to clamps
          state.notifications.calculateChannelWarning = {
            status: false,
            variant: notificationsVariant.DEFAULT,
            message: "",
          };
          /** end */
          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: [...wallClampArray],
              sleeveOver: [...sleeveOverArray],
              glassToGlass: [...glassToGlassArray],
            },
            mountingChannel: {
              item: null,
              count: 0,
              cost: 0,
            },
            oneInchHoles: fabricationsCount.oneInchHoles,
            hingeCut: fabricationsCount.hingeCut,
            clampCut: fabricationsCount.clampCut,
            notch: fabricationsCount.notch,
            outages: fabricationsCount.outages,
          };
        }
      } else if (["custom"].includes(state.quoteState)) {
        let fabricationsCount = {
          oneInchHoles: state.content.oneInchHoles,
          hingeCut: state.content.hingeCut,
          clampCut: state.content.clampCut,
          notch: state.content.notch,
          outages: state.content.outages,
        };
        if (["channel"].includes(payload?.toLowerCase())) {
          // for  channel

          /** on shifting to channel, remove fabrication of already selected clamps */
          state.content.mountingClamps.wallClamp.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.WALLCLAMP,
              fabricationsCount,
              { item: record.item, count: record.count },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          state.content.mountingClamps.sleeveOver.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.SLEEVEOVER,
              fabricationsCount,
              { item: record.item, count: record.count },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          state.content.mountingClamps.glassToGlass.forEach((record) => {
            const hardwareFabrication = getHardwareSpecificFabrication(
              hardwareTypes.GLASSTOGLASS,
              fabricationsCount,
              { item: record.item, count: record.count },
              { item: null, count: 0 }
            );
            fabricationsCount = { ...hardwareFabrication };
          });
          /** end */

          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: [],
              sleeveOver: [],
              glassToGlass: [],
            },
            oneInchHoles: fabricationsCount.oneInchHoles,
            hingeCut: fabricationsCount.hingeCut,
            clampCut: fabricationsCount.clampCut,
            notch: fabricationsCount.notch,
            outages: fabricationsCount.outages,
          };
        } else if (["clamps"].includes(payload?.toLowerCase())) {
          // for clamps

          /** on shifting to clamps remove fabrication of selected channel */
          const hardwareFabrication = getHardwareSpecificFabrication(
            hardwareTypes.CHANNEL,
            fabricationsCount,
            {
              item: state.content.mountingChannel.item,
              count: state.content.mountingChannel.item ? 1 : 0,
            },
            { item: null, count: 0 }
          );
          //Remove Channel calculate warning upon shifting channel to clamps
          state.notifications.calculateChannelWarning = {
            status: false,
            variant: notificationsVariant.DEFAULT,
            message: "",
          };
          state.content = {
            ...state.content,
            mountingChannel: {
              item: null,
              count: 0,
              cost: 0,
            },
            oneInchHoles: hardwareFabrication.oneInchHoles,
            hingeCut: hardwareFabrication.hingeCut,
            clampCut: hardwareFabrication.clampCut,
            notch: hardwareFabrication.notch,
            outages: hardwareFabrication.outages,
          };
        }
      }
    },
    initializeStateForCustomQuote: (state, action) => {
      const { listData } = action.payload;

      console.log(listData, "listData2");

      let hardwareFinishes = listData?.hardwareFinishes?.find(
        (item) => item.slug === "polished-chrome"
      );

      let glassType = listData?.glassType?.find(
        (item) => item.slug === "clear"
      );

      console.log(glassType, "glassTypeglassTypeglassType");

      let glassTypeCost =
        glassType?.options?.find(
          (option) => option?.thickness === thicknessTypes.THREEBYEIGHT
        )?.cost || 0;

      let glassAddons = listData?.glassAddons?.find(
        (item) => item.slug === "no-treatment"
      );

      state.content = {
        ...state.content, // previous state maintain karna zaroori hai
        hardwareFinishes,
        glassType: {
          item: glassType || {}, // yeh ensure karega ke object null na ho
          thickness: thicknessTypes.THREEBYEIGHT,
          cost: glassTypeCost,
        },
        glassAddons: glassAddons ? [{ item: glassAddons, cost: 0 }] : [],
        people: 0,
        hours: 0,
      };
    },

    initializeStateForEditQuote: (state, action) => {
      const { estimateData, quotesId, hardwaresList } = action.payload;
      console.log(estimateData,'121212qwqwqwqwq')
      state.quoteId = quotesId;
      state.quoteState = quoteState.EDIT;
      state.content.sufferCostDifference = estimateData?.sufferCostDifference;
      const resp =
        estimateData?.category === EstimateCategory.SHOWERS
          ? generateContentForShowerEdit(hardwaresList, estimateData)
          : generateContentForWineCellarEdit(hardwaresList, estimateData);
      console.log(resp, "reppp",{...resp.content});
      // state.measurements = measurements;
      state.content = {
        ...state.content,
        ...resp.content,
        sufferCostDifference : estimateData?.sufferCostDifference
      };
      state.perimeter = resp.perimeter;
      state.sqftArea = resp.sqftArea;
      // state.selectedItem = estimateData;
      state.doorWidth = resp.doorWidth || 0;
      state.doorQuantity = resp.doorQuantity || 1;
    },
  },
});
export const {
  resetCustomsEstimateState,
  setGlassPrice,
  setHardwarePrice,
  setGlassAddonsPrice,
  setHardwareAddonsPrice,
  setFabricationPrice,
  setMiscPrice,
  setLaborPrice,
  setUserProfitPercentage,
  setEstimateDiscount,
  setEstimateDiscountUnit,
  setEstimateDiscountTotal,
  setLayoutArea,
  setLayoutPerimeter,
  setContent,
  setTotal,
  setSufferCostDifference,
  setCost,
  setProfit,
  setCounters,
  setInputContent,
  setThickness,
  setListData,
  setDoorWidth,
  updateMeasurements,
  addSelectedItem,
  setNavigationDesktop,
  setNavigation,
  setQuoteState,
  setActiveMounting,
  initializeStateForCustomQuote,
  initializeStateForCreateQuote,
  initializeStateForEditQuote,
  setPanelWidth,
  setDoorWeight,
  setPanelWeight,
  setReturnWeight,
  setSingleNotification,
  setMultipleNotifications,
  resetNotifications,
  setHardwareFabricationQuantity,
  setisCustomizedDoorWidth,
  setAdditionalFieldsPrice,
  setShowerProjectId,
} = customsEstimateSlice.actions;
export default customsEstimateSlice.reducer;
