import { createSlice } from "@reduxjs/toolkit";
import {
  hardwareTypes,
  layoutVariants,
  notificationTypes,
  notificationsVariant,
  quoteState,
  thicknessTypes,
} from "../utilities/constants";
import { calculateAreaAndPerimeter } from "../utilities/common";
import {
  // getHandleFabrication,
  // getHardwareFabricationQuantity,
  getHardwareSpecificFabrication,
} from "../utilities/hardwarefabrication";
export const getContent = (state) => state.estimateCalculations.content;
export const getAdditionalFields = (state) =>
  state.estimateCalculations.content.additionalFields;
export const getCost = (state) => state.estimateCalculations.actualCost;
export const getProfit = (state) => state.estimateCalculations.grossProfit;
export const getTotal = (state) => state.estimateCalculations.totalPrice;
export const getDoorWidth = (state) => state.estimateCalculations.doorWidth;
export const getHardwareTotal = (state) =>
  state.estimateCalculations.hardwarePrice;
export const getGlassTotal = (state) => state.estimateCalculations.glassPrice;
export const getGlassAddonsTotal = (state) =>
  state.estimateCalculations.glassAddonsPrice;
export const getHardwareAddonsTotal = (state) =>
  state.estimateCalculations.hardwareAddonsPrice;
export const getFabricationTotal = (state) =>
  state.estimateCalculations.fabricationPrice;
export const getMiscTotal = (state) => state.estimateCalculations.miscPrice;
export const getLaborTotal = (state) => state.estimateCalculations.laborPrice;
export const getAdditionalFieldsTotal = (state) =>
  state.estimateCalculations.additionalFieldsPrice;
export const getisCustomizedDoorWidth = (state) =>
  state.estimateCalculations.isCustomizedDoorWidth;

export const getUserProfitPercentage = (state) =>
  state.estimateCalculations.content.userProfitPercentage;
export const getMeasurementSide = (state) =>
  state.estimateCalculations.measurements;
export const selectedItem = (state) => state.estimateCalculations.selectedItem;
export const getPageNavigation = (state) =>
  state.estimateCalculations.handlePageNavigation;
export const getPageDesktopNavigation = (state) =>
  state.estimateCalculations.handlePageDesktopNavigation;
export const getQuoteId = (state) => state.estimateCalculations.quoteId;
export const getProjectId = (state) => state.estimateCalculations.projectId;
export const getQuoteState = (state) => state.estimateCalculations.quoteState;
export const getListData = (state) => state.estimateCalculations.listData;
export const getLayoutPerimeter = (state) =>
  state.estimateCalculations.perimeter;
export const getLayoutArea = (state) => state.estimateCalculations.sqftArea;
export const getPanelWidth = (state) => state.estimateCalculations.panelWidth;
export const getDoorWeight = (state) => state.estimateCalculations.doorWeight;
export const getPanelWeight = (state) => state.estimateCalculations.panelWeight;
export const getReturnWeight = (state) =>
  state.estimateCalculations.returnWeight;
export const getNotifications = (state) =>
  state.estimateCalculations.notifications;

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
    },
    hinges: {
      item: null,
      count: 0,
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
    },
    slidingDoorSystem: {
      item: null,
      count: 0,
    },
    glassType: {
      item: null,
      thickness: thicknessTypes.THREEBYEIGHT,
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
const estimateCalcSlice = createSlice({
  name: "estimateCalculations",
  initialState,
  reducers: {
    resetState: (state) => {
      return {
        ...initialState,
        listData: state.listData,
        handlePageDesktopNavigation: state.handlePageDesktopNavigation,
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
        const found = item?._id === state.content.mountingChannel.item?._id;
        state.content = {
          ...state.content,
          mountingChannel: {
            item: found ? null : item,
            count: found ? 0 : 1,
          },
        };
      } else if (["hardwareFinishes"].includes(type)) {
        // recheck hardwares availability with current finish
        // /** handles */
        // const handleItem = state.content.handles.item;
        // let handleStatus = false;
        // if (handleItem) {
        //   handleStatus = state.content.handles.item.finishes.find(
        //     (finish) => finish.finish_id === item._id
        //   )?.status;
        // }
        // /** hinges */
        // const hingeItem = state.content.hinges.item;
        // let hingeStatus = false;
        // if (hingeItem) {
        //   hingeStatus = state.content.hinges.item.finishes.find(
        //     (finish) => finish.finish_id === item._id
        //   )?.status;
        // }
        // /** sliding door system */
        // const slidingDoorItem = state.content.slidingDoorSystem.item;
        // let slidingDoorSystemStatus = false;
        // if (slidingDoorItem) {
        //   slidingDoorSystemStatus =
        //     state.content.slidingDoorSystem.item.finishes.find(
        //       (finish) => finish.finish_id === item._id
        //     )?.status;
        // }
        // /** header */
        // const headerItem = state.content.header.item;
        // let headerStatus = false;
        // if (headerItem) {
        //   headerStatus = state.content.header.item.finishes.find(
        //     (finish) => finish.finish_id === item._id
        //   )?.status;
        // }
        state.content = {
          ...state.content,
          [type]: item,
        };
      } else if (["hardwareAddons"].includes(type)) {
        console.log("Nice Try.");
      } else if (["glassAddons"].includes(type)) {
        if (item.slug === "no-treatment") {
          const noGlassAddon = state.listData.glassAddons?.find(
            (item) => item.slug === "no-treatment"
          );
          state.content.glassAddons = [noGlassAddon];
        } else {
          const foundIndex = state.content.glassAddons?.findIndex(
            (row) => row.slug === item.slug
          );
          if (foundIndex !== -1) {
            state.content.glassAddons.splice(foundIndex, 1);
          } else {
            state.content.glassAddons.push(item);
          }
          const indexOfNoTreatment = state.content.glassAddons?.findIndex(
            (row) => row.slug === "no-treatment"
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
      } else {
        state.content = {
          ...state.content,
          [type]: {
            ...state.content[type],
            item: item,
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
          existing.push({ item: item, count: value });
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
          existing.push({ item: item, count: value });
        }
        state.content = {
          ...state.content,
          hardwareAddons: [...existing],
        };
      } else {
        state.content = {
          ...state.content,
          [type]: {
            ...state.content[type],
            count: value,
          },
        };
      }
    },

    setUserProfitPercentage: (state, action) => {
      const { payload } = action;
      state.content.userProfitPercentage = payload;
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
          },
          mountingChannel: {
            item: newChannel,
            count: newChannel ? 1 : 0,
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
            // set mounting channel
            state.content = {
              ...state.content,
              mountingChannel: {
                item: defaultItem,
                count: 1,
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

          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: wallClampItem
                ? [
                    {
                      item: wallClampItem,
                      count: state.selectedItem?.settings?.wallClamp?.count,
                    },
                  ]
                : [],
              sleeveOver: sleeveOverItem
                ? [
                    {
                      item: sleeveOverItem,
                      count: state.selectedItem?.settings?.sleeveOver?.count,
                    },
                  ]
                : [],
              glassToGlass: glassToGlassItem
                ? [
                    {
                      item: glassToGlassItem,
                      count: state.selectedItem?.settings?.glassToGlass?.count,
                    },
                  ]
                : [],
            },
            mountingChannel: {
              item: null,
              count: 0,
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
            // set moutning channel
            state.content = {
              ...state.content,
              mountingChannel: {
                item: defaultItem,
                count: 1,
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
                return { item: record, count: row.count };
              }
            );
          let sleeveOverArray = [];
          sleeveOverArray =
            state.selectedItem?.config?.mountingClamps?.sleeveOver?.map(
              (row) => {
                const record = state.listData?.sleeveOver?.find(
                  (clamp) => clamp._id === row?.type
                );
                return { item: record, count: row.count };
              }
            );
          let glassToGlassArray = [];
          glassToGlassArray =
            state.selectedItem?.config?.mountingClamps?.glassToGlass?.map(
              (row) => {
                const record = state.listData?.glassToGlass?.find(
                  (clamp) => clamp._id === row?.type
                );
                return { item: record, count: row.count };
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

          state.content = {
            ...state.content,
            mountingChannel: {
              item: null,
              count: 0,
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
      let notifications = state.notifications;
      let hardwareFinishes = null;
      hardwareFinishes = state.listData?.hardwareFinishes?.find(
        (item) => item.slug === "polished-chrome"
      );

      let glassType = null;
      glassType = state.listData?.glassType?.find(
        (item) => item.slug === "clear"
      );

      let glassAddons = null;
      glassAddons = state.listData?.glassAddons?.find(
        (item) => item.slug === "no-treatment"
      );

      state.notifications = notifications;
      state.content = {
        ...state.content,
        hardwareFinishes: hardwareFinishes,
        glassType: {
          item: glassType,
          thickness: thicknessTypes.THREEBYEIGHT,
        },
        glassAddons: glassAddons ? [glassAddons] : [],
        people: 0,
        hours: 0,
      };
    },
    initializeStateForCreateQuote: (state, action) => {
      const { layoutData } = action.payload;
      let notifications = state.notifications;
      let hardwareFinishes = null;
      hardwareFinishes = state.listData?.hardwareFinishes?.find(
        (item) => item._id === layoutData?.settings?.hardwareFinishes
      );

      let handleType = null;
      handleType = state.listData?.handles?.find(
        (item) => item._id === layoutData?.settings?.handles?.handleType
      );

      let hingesType = null;
      hingesType = state.listData?.hinges?.find(
        (item) => item._id === layoutData?.settings?.hinges?.hingesType
      );

      let slidingDoorSystemType = null;
      slidingDoorSystemType = state.listData?.slidingDoorSystem?.find(
        (item) => item._id === layoutData?.settings?.slidingDoorSystem?.type
      );

      let headerType = null;
      headerType = state.listData?.header?.find(
        (item) => item._id === layoutData?.settings?.header
      );

      let glassType = null;
      glassType = state.listData?.glassType?.find(
        (item) => item._id === layoutData?.settings?.glassType?.type
      );
      let glassThickness =
        layoutData?.settings?.glassType?.thickness ||
        thicknessTypes.THREEBYEIGHT;

      let glassAddon = null;
      glassAddon = state.listData?.glassAddons?.find(
        (item) => item._id === layoutData?.settings?.glassAddon
      );

      let clampCutOut = 0;
      let wallClampItem,
        sleeveOverItem,
        glassToGlassItem,
        cornerWallClampItem,
        cornerSleeveOverItem,
        cornerGlassToGlassItem,
        channelItem;
      wallClampItem =
        sleeveOverItem =
        glassToGlassItem =
        cornerWallClampItem =
        cornerSleeveOverItem =
        cornerGlassToGlassItem =
        channelItem =
          null;
      // do not calculate if a layout does not have mounting channel or clamp
      if (
        ![
          layoutVariants.DOOR,
          layoutVariants.DOUBLEDOOR,
          layoutVariants.DOUBLEBARN,
        ].includes(layoutData?.settings?.variant)
      ) {
        wallClampItem = state.listData?.wallClamp?.find(
          (item) => item._id === layoutData?.settings?.wallClamp?.wallClampType
        );

        sleeveOverItem = state.listData?.sleeveOver?.find(
          (item) =>
            item._id === layoutData?.settings?.sleeveOver?.sleeveOverType
        );

        glassToGlassItem = state.listData?.glassToGlass?.find(
          (item) =>
            item._id === layoutData?.settings?.glassToGlass?.glassToGlassType
        );

        cornerWallClampItem = state.listData?.cornerWallClamp?.find(
          (item) =>
            item._id === layoutData?.settings?.cornerWallClamp?.wallClampType
        );

        cornerSleeveOverItem = state.listData?.cornerSleeveOver?.find(
          (item) =>
            item._id === layoutData?.settings?.cornerSleeveOver?.sleeveOverType
        );

        cornerGlassToGlassItem = state.listData?.cornerGlassToGlass?.find(
          (item) =>
            item._id ===
            layoutData?.settings?.cornerGlassToGlass?.glassToGlassType
        );

        channelItem = state.listData?.mountingChannel?.find(
          (item) => item._id === layoutData?.settings?.mountingChannel
        );
        clampCutOut =
          layoutData?.settings?.wallClamp?.count +
          layoutData?.settings?.sleeveOver?.count +
          layoutData?.settings?.glassToGlass?.count +
          layoutData?.settings?.cornerWallClamp?.count +
          layoutData?.settings?.cornerGlassToGlass?.count;
        //   layoutData?.settings?.cornerSleeveOver?.count +
      }

      // if(channelItem){
      //   if(layoutData?.settings?.glassType?.thickness === '3/8'){
      //     channelItem = state.listData?.mountingChannel?.find((item)=>item.slug === 'u-channel-3-8');
      //   }else if(layoutData?.settings?.glassType?.thickness === '1/2'){
      //     channelItem = state.listData?.mountingChannel?.find((item)=>item.slug === 'u-channel-1-2');
      //   }
      // }
      const noGlassAddon = state.listData.glassAddons?.find(
        (item) => item.slug === "no-treatment"
      );

      state.notifications = notifications;
      state.content = {
        ...state.content,
        hardwareFinishes: hardwareFinishes,
        handles: {
          item: handleType || null,
          count: layoutData?.settings?.handles?.count,
        },
        hinges: {
          item: hingesType || null,
          count: layoutData?.settings?.hinges?.count,
        },
        header: {
          item: headerType || null,
          count: headerType ? 1 : 0,
        },
        slidingDoorSystem: {
          item: slidingDoorSystemType || null,
          count: layoutData?.settings?.slidingDoorSystem?.count,
        },
        glassType: {
          item: glassType || null,
          thickness: glassThickness,
        },
        mountingChannel: {
          item: channelItem || null,
          count: channelItem ? 1 : 0,
        },
        mountingClamps: {
          wallClamp: wallClampItem
            ? [
                {
                  item: wallClampItem,
                  count: layoutData?.settings?.wallClamp?.count,
                },
              ]
            : [],
          sleeveOver: sleeveOverItem
            ? [
                {
                  item: sleeveOverItem,
                  count: layoutData?.settings?.sleeveOver?.count,
                },
              ]
            : [],
          glassToGlass: glassToGlassItem
            ? [
                {
                  item: glassToGlassItem,
                  count: layoutData?.settings?.glassToGlass?.count,
                },
              ]
            : [],
        },
        cornerClamps: {
          cornerWallClamp: cornerWallClampItem
            ? [
                {
                  item: cornerWallClampItem,
                  count: layoutData?.settings?.cornerWallClamp?.count,
                },
              ]
            : [],
          cornerSleeveOver: cornerSleeveOverItem
            ? [
                {
                  item: cornerSleeveOverItem,
                  count: layoutData?.settings?.cornerSleeveOver?.count,
                },
              ]
            : [],
          cornerGlassToGlass: cornerGlassToGlassItem
            ? [
                {
                  item: cornerGlassToGlassItem,
                  count: layoutData?.settings?.cornerGlassToGlass?.count,
                },
              ]
            : [],
        },
        mountingState:
          wallClampItem || sleeveOverItem || glassToGlassItem
            ? "clamps"
            : "channel",
        people: layoutData?.settings?.other?.people,
        hours: layoutData?.settings?.other?.hours,
        glassAddons: glassAddon ? [glassAddon] : [noGlassAddon],
        outages: layoutData?.settings?.outages,
        notch: layoutData?.settings?.notch,
        hingeCut: layoutData?.settings?.hinges?.count,
        oneInchHoles: layoutData?.settings?.handles?.count * 2,
        //  + (layoutData?.settings?.variant === layoutVariants.SINGLEBARN
        //   ? 6
        //   : layoutData?.settings?.variant === layoutVariants.DOUBLEBARN
        //   ? 8
        //   : 0),
        clampCut: clampCutOut,
      };
    },
    initializeStateForEditQuote: (state, action) => {
      const { estimateData, quotesId } = action.payload;

      state.quoteId = quotesId;

      let hardwareFinishes = null;
      hardwareFinishes = state.listData?.hardwareFinishes?.find(
        (item) => item._id === estimateData?.config?.hardwareFinishes
      );
      let handleType = null;
      handleType = state.listData?.handles?.find(
        (item) => item._id === estimateData?.config?.handles?.type
      );
      let hingesType = null;
      hingesType = state.listData?.hinges?.find(
        (item) => item._id === estimateData?.config?.hinges?.type
      );
      let slidingDoorSystemType = null;
      slidingDoorSystemType = state.listData?.slidingDoorSystem?.find(
        (item) => item._id === estimateData?.config?.slidingDoorSystem?.type
      );

      let headerType = null;
      headerType = state.listData?.header?.find(
        (item) => item._id === estimateData?.config?.header?.type
      );

      let glassTypee = null;
      glassTypee = state.listData?.glassType?.find(
        (item) => item._id === estimateData?.config?.glassType?.type
      );

      let glassAddons = [];
      glassAddons = estimateData?.config?.glassAddons?.map((item) => {
        const record = state.listData?.glassAddons.find(
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
      // do not calculate if a layout does not have mounting channel or clamp
      if (
        ![
          layoutVariants.DOOR,
          layoutVariants.DOUBLEDOOR,
          layoutVariants.DOUBLEBARN,
        ].includes(estimateData?.settings?.variant)
      ) {
        wallClampArray = estimateData?.config?.mountingClamps?.wallClamp?.map(
          (row) => {
            const record = state.listData?.wallClamp?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          }
        );
        sleeveOverArray = estimateData?.config?.mountingClamps?.sleeveOver?.map(
          (row) => {
            const record = state.listData?.sleeveOver?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          }
        );
        glassToGlassArray =
          estimateData?.config?.mountingClamps?.glassToGlass?.map((row) => {
            const record = state.listData?.glassToGlass?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          });

        cornerWallClampArray =
          estimateData?.config?.cornerClamps?.wallClamp?.map((row) => {
            const record = state.listData?.cornerWallClamp?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          });

        cornerSleeveOverArray =
          estimateData?.config?.cornerClamps?.sleeveOver?.map((row) => {
            const record = state.listData?.cornerSleeveOver?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          });

        cornerGlassToGlassArray =
          estimateData?.config?.cornerClamps?.glassToGlass?.map((row) => {
            const record = state.listData?.cornerGlassToGlass?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          });

        channelItem = state.listData?.mountingChannel?.find(
          (item) => item._id === estimateData?.config?.mountingChannel
        );
      }
      let hardwareAddons = [];
      hardwareAddons = estimateData?.config?.hardwareAddons?.map((row) => {
        const found = state.listData?.hardwareAddons?.find(
          (item) => item?._id === row.type
        );
        return { item: found, count: row.count };
      });
      const noGlassAddon = state.listData.glassAddons?.find(
        (item) => item.slug === "no-treatment"
      );
      const measurements = estimateData.config.measurements.map(
        ({ _id, ...rest }) => rest
      );
      state.content = {
        ...state.content,
        hardwareFinishes: hardwareFinishes,
        handles: {
          ...state.handles,
          item: handleType,
          count: estimateData?.config?.handles?.count,
        },
        hinges: {
          ...state.hinges,
          item: hingesType,
          count: estimateData?.config?.hinges?.count,
        },
        header: {
          item: headerType,
          count: estimateData?.config?.header?.count,
        },
        slidingDoorSystem: {
          item: slidingDoorSystemType,
          count: estimateData?.config?.slidingDoorSystem?.count,
        },
        glassType: {
          item: glassTypee,
          thickness: estimateData?.config?.glassType?.thickness,
        },

        mountingClamps: {
          wallClamp: [...wallClampArray],
          sleeveOver: [...sleeveOverArray],
          glassToGlass: [...glassToGlassArray],
        },
        cornerClamps: {
          cornerWallClamp: [...cornerWallClampArray],
          cornerSleeveOver: [...cornerSleeveOverArray],
          cornerGlassToGlass: [...cornerGlassToGlassArray],
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
        hingeCut: estimateData?.config?.hingeCut,
        people: estimateData?.config?.people,
        hours: estimateData?.config?.hours,
        glassAddons: glassAddons?.length ? [...glassAddons] : [noGlassAddon],
        oneInchHoles: estimateData?.config?.oneInchHoles,
        clampCut: estimateData?.config?.clampCut,
        notch: estimateData?.config?.notch,
        outages: estimateData?.config?.outages,
        mitre: estimateData?.config?.mitre,
        polish: estimateData?.config?.polish,
        // sleeveOverCount: estimateData?.sleeveOverCount,
        // towelBarsCount: estimateData?.towelBarsCount,
        hardwareAddons: [...hardwareAddons],
        userProfitPercentage: estimateData?.config?.userProfitPercentage,
        additionalFields: estimateData?.config?.additionalFields,
      };
      state.quoteState = quoteState.EDIT;
      // state.measurements = measurements;
      state.perimeter = estimateData.config.perimeter;
      state.sqftArea = estimateData.config.sqftArea;
      state.selectedItem = estimateData;
    },
  },
});
export const {
  resetState,
  setGlassPrice,
  setHardwarePrice,
  setGlassAddonsPrice,
  setHardwareAddonsPrice,
  setFabricationPrice,
  setMiscPrice,
  setLaborPrice,
  setUserProfitPercentage,
  setLayoutArea,
  setLayoutPerimeter,
  setContent,
  setTotal,
  setCost,
  setProfit,
  setCounters,
  setInputContent,
  setThickness,
  setListData,
  setDoorWidth,
  // updateAddOnCount,
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
  setShowerProjectId
} = estimateCalcSlice.actions;
export default estimateCalcSlice.reducer;
