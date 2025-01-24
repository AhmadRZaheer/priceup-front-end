import { calculateAreaAndPerimeter } from '@/utilities/common';
import {
  hardwareTypes,
  layoutVariants,
  notificationsVariant,
  quoteState,
  thicknessTypes,
} from '@/utilities/constants';
import {
  generateContentForWineCellarEdit,
} from '@/utilities/generateEstimateCalculationContent';
import { getHardwareSpecificFabrication } from '@/utilities/WineCellarEstimate';

// import { getWineHardwareSpecificFabrication } from "@/utilities/hardwarefabrication";
  const { createSlice } = require("@reduxjs/toolkit");
  
//   export const getWineProjectId = (state) => state.wineCellarsEstimate.projectId;
  export const selectedItem = (state) => state.wineCellarsEstimate.selectedItem;
//   export const getWineQuoteState = (state) => state.wineCellarsEstimate.quoteState;
  export const getDoorWidth = (state) => state.wineCellarsEstimate.doorWidth;
  export const getDoorQuantity = (state) => state.wineCellarsEstimate.doorQuantity;
  export const getMeasurements = (state) => state.wineCellarsEstimate.measurements;
  export const getisCustomDoorWidth = (state) =>
    state.wineCellarsEstimate.isCustomizedDoorWidth;
  export const getAdditionalFields = (state) =>
    state.wineCellarsEstimate.content.additionalFields;
  export const getHardwareTotal = (state) => state.wineCellarsEstimate.hardwarePrice;
  export const getGlassTotal = (state) => state.wineCellarsEstimate.glassPrice;
  export const getFabricationTotal = (state) =>
    state.wineCellarsEstimate.fabricationPrice;
  export const getLaborTotal = (state) => state.wineCellarsEstimate.laborPrice;
  export const getDoorLaborTotal = (state) => state.wineCellarsEstimate.doorLaborPrice;
  export const getAdditionalFieldsTotal = (state) =>
    state.wineCellarsEstimate.additionalFieldsPrice;
  export const getUserProfitPercentage = (state) =>
    state.wineCellarsEstimate.content.userProfitPercentage;
  export const getEstimateDiscountValue = (state) =>
    state.wineCellarsEstimate.content.discount.value;
  export const getEstimateDiscountUnit = (state) =>
    state.wineCellarsEstimate.content.discount.unit;
  export const getEstimateDiscountTotal = (state) =>
    state.wineCellarsEstimate.content.discount.total;
  export const getDoorWeight = (state) => state.wineCellarsEstimate.doorWeight;
  export const getPanelWeight = (state) => state.wineCellarsEstimate.panelWeight;
  export const getReturnWeight = (state) => state.wineCellarsEstimate.returnWeight;
  export const getTotal = (state) => state.wineCellarsEstimate.totalPrice;
  export const getCost = (state) => state.wineCellarsEstimate.actualCost;
  export const getProfit = (state) => state.wineCellarsEstimate.grossProfit;
  export const getContent = (state) => state.wineCellarsEstimate.content;
  export const getLayoutArea = (state) => state.wineCellarsEstimate.sqftArea;
  export const getLayoutPerimeter = (state) => state.wineCellarsEstimate.perimeter;
//   export const getWineListData = (state) => state.wineCellarsEstimate.listData;
  export const getQuoteId = (state) => state.wineCellarsEstimate.quoteId;
  export const getNotifications = (state) =>
    state.wineCellarsEstimate.notifications;
  export const getHardwareAddonsTotal = (state) =>
    state.wineCellarsEstimate.hardwareAddonsPrice;
  export const getGlassAddonsTotal = (state) =>
    state.wineCellarsEstimate.glassAddonsPrice;
  
  const initialState = {
    quoteId: null,
    quoteState: "create",
    // projectId: null,
    perimeter: 0,
    doorWeight: 0,
    sqftArea: 0,
    panelWeight: 0,
    returnWeight: 0,
    backWallGlassWeight:0,
    totalPrice: 0,
    grossProfit: 0,
    actualCost: 0,
    doorWidth: 0,
    doorQuantity:1,
    hardwarePrice: 0,
    glassPrice: 0,
    glassAddonsPrice: 0,
    hardwareAddonsPrice: 0,
    fabricationPrice: 0,
    miscPrice: 0,
    laborPrice: 0,
    doorLaborPrice:0,
    additionalFieldsPrice: 0,
    isCustomizedDoorWidth: false,
    selectedItem: null,
    measurements: [],
    // listData: null,
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
    },
    content: {
      additionalFields: [],
      hardwareFinishes: null,
      handles: {
        item: null,
        count: 0,
        cost:0
      },
      doorLock: {
        item: null,
        count: 0,
        cost:0
      },
      hinges: {
        item: null,
        count: 0,
        cost:0
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
        cost:0
      },
      header: {
        item: null,
        count: 0,
        cost:0
      },
      slidingDoorSystem: {
        item: null,
        count: 0,
        cost:0
      },
      glassType: {
        item: null,
        thickness: thicknessTypes.THREEBYEIGHT,
        cost:0
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
      laborHoursForDoor: 0,
      hardwareAddons: [],
      mountingState: "channel",
      userProfitPercentage: 0,
      discount: {
        value: 0,
        unit: "%",
        total:0,
      },
    },
  };
  
  const wineCellarsEstimateSlice = createSlice({
    name: "wineCellarsEstimate",
    initialState,
    reducers: {
    //   setWineCellarProjectId: (state, action) => {
    //     state.projectId = action.payload;
    //   },
      resetNotifications: (state) => {
        state.notifications = initialState.notifications;
      },
      setisCustomizedDoorWidth: (state, action) => {
        state.isCustomizedDoorWidth = action.payload;
      },
      setDoorWidth: (state, action) => {
        state.doorWidth = action.payload;
      },
      setDoorQuantity: (state, action) => {
        state.doorQuantity = action.payload;
      },
      setSelectedItem: (state, action) => {
        state.selectedItem = action.payload;
      },
      setQuoteState: (state, action) => {
        state.quoteState = action.payload;
      },
      updateMeasurements: (state, action) => {
        state.measurements = action.payload;
      },
      setUserProfitPercentage: (state, action) => {
        state.content.userProfitPercentage = action.payload;
      },
      setEstimateDiscountValue: (state, action) => {
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
      setSelectedItem: (state, action) => {
        const itemData = action.payload;
        state.selectedItem = itemData;
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
      setBackWallGlassWeight: (state, action) => {
        state.backWallGlassWeight = action.payload;
      },
      setMultipleNotifications: (state, action) => {
        const { selectedContent, notifications } = action.payload;
        state.notifications = notifications;
        state.content = selectedContent;
      },
      setHardwareFabricationQuantity: (state, action) => {
        const { oneInchHoles, hingeCut ,clampCut,
          notch,
          outages, } =
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
                message: 'Current channel price is being calculated according to 1 channel stick'       
              }
  
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
  
            //Remove Channel calculate warning upon shifting channel to clamps
            state.notifications.calculateChannelWarning = {
              status: false,
              variant: notificationsVariant.DEFAULT,
              message: '',
            }
  
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
              //Generating channel calculate warning on shifting to layout default
              state.notifications.calculateChannelWarning = {
                status: true,
                variant: notificationsVariant.WARNING,
                message: 'Current channel price is being calculated according to 1 channel stick'       
              }
  
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
            //Remove Channel calculate warning upon shifting channel to clamps
            state.notifications.calculateChannelWarning = {
              status: false,
              variant: notificationsVariant.DEFAULT,
              message: '',
            }
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
            //Remove Channel calculate warning upon shifting channel to clamps
            state.notifications.calculateChannelWarning = {
              status: false,
              variant: notificationsVariant.DEFAULT,
              message: '',
            }
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

  
      initializeStateForCreateQuote: (state, action) => { 
        const { layoutData, hardwaresList } = action.payload;
        let notifications = state.notifications;
        let hardwareFinishes = null;
        hardwareFinishes = hardwaresList?.hardwareFinishes?.find(
          (item) => item._id === layoutData?.settings?.hardwareFinishes
        );
  
        let handleType = null;
        handleType = hardwaresList?.handles?.find(
          (item) => item._id === layoutData?.settings?.handles?.handleType
        );
        let handleTypeCost = null;
        handleTypeCost = handleType?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id )?.cost;

        let doorLockType = null;
        doorLockType = hardwaresList?.doorLocks?.find(
          (item) => item._id === layoutData?.settings?.doorLock?.type
        );
        let doorLockCost = null;
         doorLockCost = doorLockType?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id )?.cost;

        let hingesType = null;
        hingesType = hardwaresList?.hinges?.find(
          (item) => item._id === layoutData?.settings?.hinges?.hingesType
        );
        let hingesCost = null;
      hingesCost = hingesType?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;

        let slidingDoorSystemType = null;
        slidingDoorSystemType = hardwaresList?.slidingDoorSystem?.find(
          (item) => item._id === layoutData?.settings?.slidingDoorSystem?.type
        );
        let slidingDoorSystemCost = null;
        slidingDoorSystemCost = slidingDoorSystemType?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;

        let headerType = null;
        headerType = hardwaresList?.header?.find(
          (item) => item._id === layoutData?.settings?.header
        );
        let headerCost = null;
         headerCost = headerType?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;
  
        let glassType = null;
        glassType = hardwaresList?.glassType?.find(
          (item) => item._id === layoutData?.settings?.glassType?.type
        );
        let glassThickness =
          layoutData?.settings?.glassType?.thickness ||
          thicknessTypes.THREEBYEIGHT;
          let glassCost = null;
          glassCost = glassType?.options?.find((option) => option?.thickness === glassThickness)?.cost; 
  
        let glassAddon = null;
        glassAddon = hardwaresList?.glassAddons?.find(
          (item) => item._id === layoutData?.settings?.glassAddon
        );
        let glassAddonCost = null;
        glassAddonCost = glassAddon?.options?.[0]?.cost;
 
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
            let wallClampCost = 0;
            let sleeveOverCost = 0;
            let glassToGlassCost = 0;
            let  cornerWallClampCost = 0;
            let  cornerSleeveOverCost = 0;
            let  cornerGlassToGlassCost = 0;
            let  channelCost = 0;
            if (
              ![
                layoutVariants.DOOR,
                layoutVariants.DOUBLEDOOR,
                layoutVariants.DOUBLEBARN,
              ].includes(layoutData?.settings?.variant)
            ) {
              wallClampItem = hardwaresList?.wallClamp?.find(
                (item) => item._id === layoutData?.settings?.wallClamp?.wallClampType
              );
              wallClampCost = wallClampItem?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;
              sleeveOverItem = hardwaresList?.sleeveOver?.find(
                (item) =>
                  item._id === layoutData?.settings?.sleeveOver?.sleeveOverType
              );
              sleeveOverCost = sleeveOverItem?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;

              glassToGlassItem = hardwaresList?.glassToGlass?.find(
                (item) =>
                  item._id === layoutData?.settings?.glassToGlass?.glassToGlassType
              );
              glassToGlassCost = glassToGlassItem?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;

              cornerWallClampItem = hardwaresList?.cornerWallClamp?.find(
                (item) =>
                  item._id === layoutData?.settings?.cornerWallClamp?.wallClampType
              );
              cornerWallClampCost = cornerWallClampItem?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;

              cornerSleeveOverItem = hardwaresList?.cornerSleeveOver?.find(
                (item) =>
                  item._id === layoutData?.settings?.cornerSleeveOver?.sleeveOverType
              );
              cornerSleeveOverCost = cornerSleeveOverItem?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;

              cornerGlassToGlassItem = hardwaresList?.cornerGlassToGlass?.find(
                (item) =>
                  item._id ===
                  layoutData?.settings?.cornerGlassToGlass?.glassToGlassType
              );
              cornerGlassToGlassCost = cornerGlassToGlassItem?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;

              channelItem = hardwaresList?.mountingChannel?.find(
                (item) => item._id === layoutData?.settings?.mountingChannel
              );
              channelCost = channelItem?.finishes?.find((item) => item?.finish_id === hardwareFinishes?._id)?.cost;

              clampCutOut =
                layoutData?.settings?.wallClamp?.count +
                layoutData?.settings?.sleeveOver?.count +
                layoutData?.settings?.glassToGlass?.count +
                layoutData?.settings?.cornerWallClamp?.count +
                layoutData?.settings?.cornerGlassToGlass?.count;
              //   layoutData?.settings?.cornerSleeveOver?.count +
            }
      
        // let channelItem;
        // channelItem = null;
        //   channelItem = hardwaresList?.mountingChannel?.find(
        //     (item) => item._id === layoutData?.settings?.mountingChannel
        //   );       

        const noGlassAddon = hardwaresList?.glassAddons?.find(
          (item) => item.slug === "no-treatment"
        );
  
        state.notifications = notifications;
        state.content = {
          ...state.content,
          hardwareFinishes: hardwareFinishes,
          handles: {
            item: handleType || null,
            count: layoutData?.settings?.handles?.count,
            cost : handleTypeCost
          },
          doorLock: {
            item: doorLockType || null,
            count: layoutData?.settings?.doorLock?.count,
            cost: doorLockCost
          },
          hinges: {
            item: hingesType || null,
            count: layoutData?.settings?.hinges?.count,
              cost : hingesCost
          },
          header: {
            item: headerType || null,
            count: headerType ? 1 : 0,
            cost : headerCost
          },
          slidingDoorSystem: {
            item: slidingDoorSystemType || null,
            count: layoutData?.settings?.slidingDoorSystem?.count ?? 0,
            cost : slidingDoorSystemCost
          },
          glassType: {
            item: glassType || null,
            thickness: glassThickness,
            cost : glassCost
          },
          mountingChannel: {
            item: channelItem || null,
            count: channelItem ? 1 : 0,
            cost: channelCost || 0
          },
          mountingClamps: {
            wallClamp: wallClampItem
              ? [
                  {
                    item: wallClampItem,
                    count: layoutData?.settings?.wallClamp?.count,
                    cost: wallClampCost,
                  },
                ]
              : [],
            sleeveOver: sleeveOverItem
              ? [
                  {
                    item: sleeveOverItem,
                    count: layoutData?.settings?.sleeveOver?.count,
                    cost: sleeveOverCost,
                  },
                ]
              : [],
            glassToGlass: glassToGlassItem
              ? [
                  {
                    item: glassToGlassItem,
                    count: layoutData?.settings?.glassToGlass?.count,
                    cost: glassToGlassCost
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
                    cost: cornerWallClampCost
                  },
                ]
              : [],
            cornerSleeveOver: cornerSleeveOverItem
              ? [
                  {
                    item: cornerSleeveOverItem,
                    count: layoutData?.settings?.cornerSleeveOver?.count,
                    cost: cornerSleeveOverCost,
                  },
                ]
              : [],
            cornerGlassToGlass: cornerGlassToGlassItem
              ? [
                  {
                    item: cornerGlassToGlassItem,
                    count: layoutData?.settings?.cornerGlassToGlass?.count,
                    cost: cornerGlassToGlassCost,
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
          laborHoursForDoor: state.doorQuantity > 1 ? layoutData?.settings?.noOfHoursToCompleteSingleDoor : 0,
          outages: layoutData?.settings?.outages,
          notch: layoutData?.settings?.notch,
          glassAddons: glassAddon ? [{item:glassAddon , cost: glassAddonCost }] : [{item: noGlassAddon ,cost:0}],
          hingeCut: layoutData?.settings?.hinges?.count,
          oneInchHoles: layoutData?.settings?.handles?.count * 2,
          clampCut: clampCutOut,
        };
      },
  
      // initializeStateForCreateQuote: (state, action) => {
      //   const { layoutData, hardwaresList } = action.payload;
      //   let notifications = state.notifications;
      //   let hardwareFinishes = null;
      //   hardwareFinishes = hardwaresList?.hardwareFinishes?.find(
      //     (item) => item._id === layoutData?.settings?.hardwareFinishes
      //   );
  
      //   let handleType = null;
      //   handleType = hardwaresList?.handles?.find(
      //     (item) => item._id === layoutData?.settings?.handles?.handleType
      //   );
      //   let doorLockType = null;
      //   doorLockType = hardwaresList?.doorLocks?.find(
      //     (item) => item._id === layoutData?.settings?.doorLock?.type
      //   );
  
      //   let hingesType = null;
      //   hingesType = hardwaresList?.hinges?.find(
      //     (item) => item._id === layoutData?.settings?.hinges?.hingesType
      //   );
        
  
      //   let glassType = null;
      //   glassType = hardwaresList?.glassType?.find(
      //     (item) => item._id === layoutData?.settings?.glassType?.type
      //   );
      //   let glassThickness =
      //     layoutData?.settings?.glassType?.thickness ||
      //     thicknessTypes.THREEBYEIGHT;
  
      //   // let glassAddon = null;
      //   // glassAddon = state.listData?.glassAddons?.find(
      //   //   (item) => item._id === layoutData?.settings?.glassAddon
      //   // );
      //    // const noGlassAddon = state.listData?.glassAddons?.find(
      //   //   (item) => item.slug === "no-treatment"
      //   // );

      //   let channelItem;
      //   channelItem = null;
      //     channelItem = hardwaresList?.mountingChannel?.find(
      //       (item) => item._id === layoutData?.settings?.mountingChannel
      //     );
  
      //   state.notifications = notifications;
      //   state.content = {
      //     ...state.content,
      //     hardwareFinishes: hardwareFinishes,
      //     handles: {
      //       item: handleType || null,
      //       count: layoutData?.settings?.handles?.count,
      //     },
      //     doorLock: {
      //       item: doorLockType || null,
      //       count: layoutData?.settings?.doorLock?.count,
      //     },
      //     hinges: {
      //       item: hingesType || null,
      //       count: layoutData?.settings?.hinges?.count,
      //     },
      //     glassType: {
      //       item: glassType || null,
      //       thickness: glassThickness,
      //     },
      //     mountingChannel: {
      //       item: channelItem || null,
      //       count: channelItem ? 1 : 0,
      //     },
      //     mountingState: "channel",
      //     people: layoutData?.settings?.other?.people,
      //     hours: layoutData?.settings?.other?.hours,
      //     laborHoursForDoor: layoutData?.settings?.noOfHoursToCompleteSingleDoor,
      //     // glassAddons: glassAddon ? [glassAddon] : [noGlassAddon],
      //     hingeCut: layoutData?.settings?.hinges?.count,
      //     oneInchHoles: layoutData?.settings?.handles?.count * 2,
      //   };
      // },
  

      initializeStateForEditQuote: (state, action) => {
        const { estimateData, quotesId, hardwaresList } = action.payload;
        state.quoteId = quotesId;
        state.quoteState = quoteState.EDIT;
        const resp = generateContentForWineCellarEdit(hardwaresList,estimateData);
        // state.measurements = measurements;
        state.content ={
          ...state.content,
          ...resp.content
        }
        state.perimeter = resp.perimeter;
        state.sqftArea = resp.sqftArea;
        // state.selectedItem = estimateData;
        state.doorWidth = resp.doorWidth || 0;
        state.doorQuantity = resp.doorQuantity || 1;
      },
  
      setInputContent: (state, action) => {
        const { type, value } = action.payload;
        if (["mitre"].includes(type)) {
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
      setTotal: (state, action) => {
        state.totalPrice = action.payload;
      },
      setHardwarePrice: (state, action) => {
        state.hardwarePrice = action.payload;
      },
      setGlassPrice: (state, action) => {
        state.glassPrice = action.payload;
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
        state.fabricationPrice = action.payload;
      },
      setLaborPrice: (state, action) => {
        state.laborPrice = action.payload;
      },
      setDoorLaborPrice: (state, action) => {
        state.doorLaborPrice = action.payload;
      },
      setCost: (state, action) => {
        state.actualCost = action.payload;
      },
      sethoursForSingleDoor: (state, action) => {
        state.content.laborHoursForDoor = action.payload;
      },
      setProfit: (state, action) => {
        state.grossProfit = action.payload;
      },
      setAdditionalFieldsPrice: (state, action) => {
        state.additionalFieldsPrice = action.payload;
      },
      setThickness: (state, action) => {
        const { thickness, hardwaresList } = action.payload;
        /** on change glass thickness shift active channel of layout */
        const currentChannel = state.content.mountingChannel.item;
        let newChannel = null;
        if (thickness === thicknessTypes.ONEBYTWO) {
          if (currentChannel) {
            newChannel = hardwaresList?.mountingChannel?.find(
              (item) => item.slug === "u-channel-1-2"
            );
          }
        } else if (thickness === thicknessTypes.THREEBYEIGHT) {
          if (currentChannel) {
            newChannel = hardwaresList?.mountingChannel?.find(
              (item) => item.slug === "u-channel-3-8"
            );
          }
        }
        /** end */
        /** Calculate fabrication of newly selected mounting after glass thickness shift */
        const fabricationsCount = {
          oneInchHoles: state.content.oneInchHoles,
          hingeCut: state.content.hingeCut,
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
          thickness,
          {doorQuantity:state.doorQuantity}
        );
        /** end */
        return {
          ...state,
          doorWeight: result?.doorWeight ?? state.doorWeight,
          panelWeight: result?.panelWeight ?? state.panelWeight,
          returnWeight: result?.returnWeight ?? state.returnWeight,
          backWallGlassWeight: result?.backWallGlassWeight ?? state.backWallGlassWeight,
          content: {
            ...state.content,
            glassType: {
              ...state.content.glassType,
              thickness: thickness,
            },
            mountingChannel: {
              item: newChannel,
              count: newChannel ? 1 : 0,
            },
            oneInchHoles: hardwareFabrication.oneInchHoles,
            hingeCut: hardwareFabrication.hingeCut
          },
        };
      },
  
      setContent: (state, action) => {
        const { type, item, listdata = null } = action.payload;
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
            hardwareTypes.DOORLOCK
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
              variant:  selectedSameItem ? notificationsVariant.DEFAULT : notificationsVariant.WARNING ,
              message: selectedSameItem ? '' : 'Current channel price is being calculated according to 1 channel stick',
            }
          } else if ([hardwareTypes.DOORLOCK].includes(type)){
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
        if ([hardwareTypes.CHANNEL].includes(type)) {
          let itemCost = 0;
          itemCost = item?.finishes?.find((item) => item?.finish_id === state.content.hardwareFinishes._id)?.cost;
          const found = item?._id === state.content.mountingChannel.item?._id;
          state.content = {
            ...state.content,
            mountingChannel: {
              item: found ? null : item,
              count: found ? 0 : 1,
              cost : itemCost ?? 0
            },
          };
        } else if ([hardwareTypes.DOORLOCK].includes(type)) {
          let itemCost = 0;
          itemCost = item?.finishes?.find((item) => item?.finish_id === state.content.hardwareFinishes._id)?.cost; 
          const found = item?._id === state.content.doorLock.item?._id;
          state.content = {
            ...state.content,
            doorLock: {
              item: found ? null : item,
              count: found ? 0 : 1,
              cost : itemCost ?? 0
            },
          };
        } else if (["hardwareFinishes"].includes(type)) {
          state.content = {
            ...state.content,
            [type]: item,
          };
        } else if (["hardwareAddons"].includes(type)) {
          console.log("Nice Try.");
        } else if (["glassAddons"].includes(type)) {
          let glassAddonCost = 0 ;
        glassAddonCost = item?.options?.[0]?.cost;
          if (item.slug === "no-treatment") {
            const noGlassAddon = listdata.glassAddons?.find(
              (item) => item.slug === "no-treatment"
            );
            state.content.glassAddons = [{item : noGlassAddon ,cost : 0}];
          } else {
            const foundIndex = state.content.glassAddons?.findIndex(
              (row) => row.slug === item.slug
            );
            if (foundIndex !== -1) {
              state.content.glassAddons.splice(foundIndex, 1);
            } else {
              state.content.glassAddons.push({ item: item, cost : glassAddonCost });
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
          let itemCost = 0;
          itemCost = item?.finishes?.find((item) => item?.finish_id === state.content.hardwareFinishes._id)?.cost; 
          state.content = {
            ...state.content,
            [type]: {
              ...state.content[type],
              item: item,
              cost : itemCost
            },
          };
        }
      },
      setCounters: (state, action) => {
        const { type, value, item } = action.payload;
        console.log(type, value, item ,'type, value, item')
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
          // oldCounterValue = state.content?.[type]?.count ?? 0;

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
          // state.content = {
          //   ...state.content,
          //   [type]: {
          //     ...state.content[type],
          //     count: value,
          //   },
          // };

          let allClamps = ["wallClamp", "sleeveOver", "glassToGlass"];
          let allCorners = [
            "cornerWallClamp",
            "cornerSleeveOver",
            "cornerGlassToGlass",
          ];
    
          if (allClamps.includes(type) || allCorners.includes(type)) {
            let existing;
            let cornerCost = 0 ;
            cornerCost = item?.finishes?.find((item) => item?.finish_id === state.content.hardwareFinishes?._id)?.cost
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
              existing.push({ item: item, count: value , cost : cornerCost  });
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
            console.log('dfdfdfdfdf');
            let existing = state.content.hardwareAddons;
            let hardwareAddonCost = 0 ;
            hardwareAddonCost = item?.finishes?.find((item) => item?.finish_id === state.content.hardwareFinishes._id)?.cost;
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
              existing.push({ item: item, count: value,cost : hardwareAddonCost  });
            }
            state.content = {
              ...state.content,
              hardwareAddons: [...existing],
            };
          } else {
            let itemCost = 0;
            itemCost = item?.finishes?.find((item) => item?.finish_id === state.content.hardwareFinishes._id)?.cost; 
            state.content = {
              ...state.content,
              [type]: {
                ...state.content[type],
                count: value,
                cost : itemCost
              },
            };
          }        
      },
      resetWineCellarEstimateState: (state) => {
        return {
          ...initialState,
        };
      },
    },
  });
  export const {
    // setWineCellarProjectId,
    resetNotifications,
    resetWineCellarEstimateState,
    setisCustomizedDoorWidth,
    setDoorWidth,
    setDoorQuantity,
    setSelectedItem,
    setQuoteState,
    updateMeasurements,
    setUserProfitPercentage,
    setEstimateDiscountValue,
    setEstimateDiscountUnit,
    setEstimateDiscountTotal,
    setLayoutArea,
    setLayoutPerimeter,
    setDoorWeight,
    setPanelWeight,
    setReturnWeight,
    setBackWallGlassWeight,
    setMultipleNotifications,
    setHardwareFabricationQuantity,
    initializeStateForCreateQuote,
    initializeStateForEditQuote,
    setInputContent,
    setTotal,
    setGlassAddonsPrice,
    setHardwareAddonsPrice,
    setHardwarePrice,
    setGlassPrice,
    setFabricationPrice,
    setLaborPrice,
    setDoorLaborPrice,
    setCost,
    setProfit,  
    setAdditionalFieldsPrice,
    setContent,
    setThickness,
    setCounters,
    setActiveMounting,
    sethoursForSingleDoor
  } = wineCellarsEstimateSlice.actions;
  
  export default wineCellarsEstimateSlice.reducer;
  