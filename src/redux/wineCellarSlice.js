import {
  layoutVariants,
  notificationsVariant,
  quoteState,
  thicknessTypes,
} from "@/utilities/constants";
const { createSlice } = require("@reduxjs/toolkit");

export const getWineProjectId = (state) => state.wineCellar.projectId;
export const selectedWineItem = (state) => state.wineCellar.selectedItem;
export const getWineQuoteState = (state) => state.wineCellar.quoteState;
export const getWineDoorWidth = (state) => state.wineCellar.doorWidth;
export const getWineMeasurements = (state) => state.wineCellar.measurements;
export const getisCustomWineDoorWidth = (state) =>
  state.wineCellar.isCustomizedDoorWidth;
export const getWineAdditionalFields = (state) =>
  state.wineCellar.content.additionalFields;
export const getWineHardwareTotal = (state) => state.wineCellar.hardwarePrice;
export const getWineGlassTotal = (state) => state.wineCellar.glassPrice;
export const getWineGlassAddonsTotal = (state) =>
  state.wineCellar.glassAddonsPrice;
export const getWineHardwareAddonsTotal = (state) =>
  state.wineCellar.hardwareAddonsPrice;
export const getWineFabricationTotal = (state) =>
  state.wineCellar.fabricationPrice;
export const getWineLaborTotal = (state) => state.wineCellar.laborPrice;
export const getWineAdditionalFieldsTotal = (state) =>
  state.wineCellar.additionalFieldsPrice;
export const getWineUserProfitPercentage = (state) =>
  state.wineCellar.content.userProfitPercentage;
export const getWineDoorWeight = (state) => state.wineCellar.doorWeight;
export const getWinePanelWeight = (state) => state.wineCellar.panelWeight;
export const getWineReturnWeight = (state) => state.wineCellar.returnWeight;
export const getWineTotal = (state) => state.wineCellar.totalPrice;
export const getWineCost = (state) => state.wineCellar.actualCost;
export const getWineProfit = (state) => state.wineCellar.grossProfit;
export const getWineContent = (state) => state.wineCellar.content;
export const getWineLayoutArea = (state) => state.wineCellar.sqftArea;
export const getWineLayoutPerimeter = (state) =>
  state.wineCellar.perimeter;
export const getWineListData = (state) => state.wineCellar.listData;

const initialState = {
  quoteId: null,
  quoteState: "create",
  projectId: null,
  perimeter: 0,
  doorWeight: 0,
  sqftArea: 0,
  panelWeight: 0,
  returnWeight: 0,
  totalPrice: 0,
  grossProfit: 0,
  actualCost: 0,
  doorWidth: 0,
  hardwarePrice: 0,
  glassPrice: 0,
  glassAddonsPrice: 0,
  hardwareAddonsPrice: 0,
  fabricationPrice: 0,
  miscPrice: 0,
  laborPrice: 0,
  additionalFieldsPrice: 0,
  isCustomizedDoorWidth: false,
  selectedItem: null,
  measurements: [],
  listData: null,
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
  },
  content: {
    additionalFields: [],
    hardwareFinishes: null,
    handles: {
      item: null,
      count: 0,
    },
    doorLock: {
      item: null,
      count: 0,
    },
    hinges: {
      item: null,
      count: 0,
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
};

const wineCellarSlice = createSlice({
  name: "wineCellar",
  initialState,
  reducers: {
    setWineCellarProjectId: (state, action) => {
      state.projectId = action.payload;
    },
    resetNotificationsWineCaller: (state) => {
      state.notifications = initialState.notifications;
    },
    setisCustomWineDoorWidth: (state, action) => {
      state.isCustomizedDoorWidth = action.payload;
    },
    setWineDoorWidth: (state, action) => {
      state.doorWidth = action.payload;
    },
    addSelectedWineItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setWineQuoteState: (state, action) => {
      state.quoteState = action.payload;
    },
    updateWineMeasurements: (state, action) => {
      state.measurements = action.payload;
    },
    setWineUserProfitPercentage: (state, action) => {
      state.content.userProfitPercentage = action.payload;
    },
    setWineLayoutArea: (state, action) => {
      state.sqftArea = action.payload;
    },
    setWineLayoutPerimeter: (state, action) => {
      state.perimeter = action.payload;
      state.content = {
        ...state.content,
        polish: action.payload,
      };
    },
    setWineDoorWeight: (state, action) => {
      state.doorWeight = action.payload;
    },
    setWinePanelWeight: (state, action) => {
      state.panelWeight = action.payload;
    },
    setWineReturnWeight: (state, action) => {
      state.returnWeight = action.payload;
    },
    setWineMultipleNotifications: (state, action) => {
      const { selectedContent, notifications } = action.payload;
      state.notifications = notifications;
      state.content = selectedContent;
    },
    setWineHardwareFabricationQuantity: (state, action) => {
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
    setWineInputContent: (state, action) => {
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

    initializeStateForCreateWineQuote: (state, action) => {
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
      let doorLockType = null;
      doorLockType = state.listData?.type?.find(
        (item) => item._id === layoutData?.settings?.type?.handleType
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
      // let wallClampItem,
      //   sleeveOverItem,
      //   glassToGlassItem,
      //   cornerWallClampItem,
      //   cornerSleeveOverItem,
      //   cornerGlassToGlassItem,
      let channelItem;
      // wallClampItem =
      //   sleeveOverItem =
      //   glassToGlassItem =
      //   cornerWallClampItem =
      //   cornerSleeveOverItem =
      //   cornerGlassToGlassItem =
      channelItem = null;
      // do not calculate if a layout does not have mounting channel or clamp
      if (
        ![
          layoutVariants.DOOR,
          layoutVariants.DOUBLEDOOR,
          layoutVariants.DOUBLEBARN,
        ].includes(layoutData?.settings?.variant)
      ) {
        //   wallClampItem = state.listData?.wallClamp?.find(
        //     (item) => item._id === layoutData?.settings?.wallClamp?.wallClampType
        //   );

        //   sleeveOverItem = state.listData?.sleeveOver?.find(
        //     (item) =>
        //       item._id === layoutData?.settings?.sleeveOver?.sleeveOverType
        //   );

        //   glassToGlassItem = state.listData?.glassToGlass?.find(
        //     (item) =>
        //       item._id === layoutData?.settings?.glassToGlass?.glassToGlassType
        //   );

        //   cornerWallClampItem = state.listData?.cornerWallClamp?.find(
        //     (item) =>
        //       item._id === layoutData?.settings?.cornerWallClamp?.wallClampType
        //   );

        //   cornerSleeveOverItem = state.listData?.cornerSleeveOver?.find(
        //     (item) =>
        //       item._id === layoutData?.settings?.cornerSleeveOver?.sleeveOverType
        //   );

        //   cornerGlassToGlassItem = state.listData?.cornerGlassToGlass?.find(
        //     (item) =>
        //       item._id ===
        //       layoutData?.settings?.cornerGlassToGlass?.glassToGlassType
        //   );

        channelItem = state.listData?.mountingChannel?.find(
          (item) => item._id === layoutData?.settings?.mountingChannel
        );
        //   clampCutOut =
        //     layoutData?.settings?.wallClamp?.count +
        //     layoutData?.settings?.sleeveOver?.count +
        //     layoutData?.settings?.glassToGlass?.count +
        //     layoutData?.settings?.cornerWallClamp?.count +
        //     layoutData?.settings?.cornerGlassToGlass?.count;
        //   layoutData?.settings?.cornerSleeveOver?.count +
      }

      const noGlassAddon = state.listData?.glassAddons?.find(
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
        doorLock: {
          item: doorLockType || null,
          count: layoutData?.settings?.type?.count,
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
        //   mountingClamps: {
        //     wallClamp: wallClampItem
        //       ? [
        //           {
        //             item: wallClampItem,
        //             count: layoutData?.settings?.wallClamp?.count,
        //           },
        //         ]
        //       : [],
        //     sleeveOver: sleeveOverItem
        //       ? [
        //           {
        //             item: sleeveOverItem,
        //             count: layoutData?.settings?.sleeveOver?.count,
        //           },
        //         ]
        //       : [],
        //     glassToGlass: glassToGlassItem
        //       ? [
        //           {
        //             item: glassToGlassItem,
        //             count: layoutData?.settings?.glassToGlass?.count,
        //           },
        //         ]
        //       : [],
        //   },
        //   cornerClamps: {
        //     cornerWallClamp: cornerWallClampItem
        //       ? [
        //           {
        //             item: cornerWallClampItem,
        //             count: layoutData?.settings?.cornerWallClamp?.count,
        //           },
        //         ]
        //       : [],
        //     cornerSleeveOver: cornerSleeveOverItem
        //       ? [
        //           {
        //             item: cornerSleeveOverItem,
        //             count: layoutData?.settings?.cornerSleeveOver?.count,
        //           },
        //         ]
        //       : [],
        //     cornerGlassToGlass: cornerGlassToGlassItem
        //       ? [
        //           {
        //             item: cornerGlassToGlassItem,
        //             count: layoutData?.settings?.cornerGlassToGlass?.count,
        //           },
        //         ]
        //       : [],
        //   },
        mountingState:
          // wallClampItem || sleeveOverItem || glassToGlassItem
          //   ? "clamps"
          //   :
          "channel",
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

    initializeStateForEditWineQuote: (state, action) => {
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
      let doorLockType = null;
      doorLockType = state.listData?.handles?.find(
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

      // let wallClampArray,
      //   sleeveOverArray,
      //   glassToGlassArray,
      //   cornerWallClampArray,
      //   cornerSleeveOverArray,
      //   cornerGlassToGlassArray,
      let channelItem;
      // wallClampArray =
      //   sleeveOverArray =
      //   glassToGlassArray =
      //   cornerWallClampArray =
      //   cornerSleeveOverArray =
      //   cornerGlassToGlassArray =
      //     [];
      channelItem = null;
      // do not calculate if a layout does not have mounting channel or clamp
      if (
        ![
          layoutVariants.DOOR,
          layoutVariants.DOUBLEDOOR,
          layoutVariants.DOUBLEBARN,
        ].includes(estimateData?.settings?.variant)
      ) {
        //   wallClampArray = estimateData?.config?.mountingClamps?.wallClamp?.map(
        //     (row) => {
        //       const record = state.listData?.wallClamp?.find(
        //         (clamp) => clamp._id === row?.type
        //       );
        //       return { item: record, count: row.count };
        //     }
        //   );
        //   sleeveOverArray = estimateData?.config?.mountingClamps?.sleeveOver?.map(
        //     (row) => {
        //       const record = state.listData?.sleeveOver?.find(
        //         (clamp) => clamp._id === row?.type
        //       );
        //       return { item: record, count: row.count };
        //     }
        //   );
        //   glassToGlassArray =
        //     estimateData?.config?.mountingClamps?.glassToGlass?.map((row) => {
        //       const record = state.listData?.glassToGlass?.find(
        //         (clamp) => clamp._id === row?.type
        //       );
        //       return { item: record, count: row.count };
        //     });

        //   cornerWallClampArray =
        //     estimateData?.config?.cornerClamps?.wallClamp?.map((row) => {
        //       const record = state.listData?.cornerWallClamp?.find(
        //         (clamp) => clamp._id === row?.type
        //       );
        //       return { item: record, count: row.count };
        //     });

        //   cornerSleeveOverArray =
        //     estimateData?.config?.cornerClamps?.sleeveOver?.map((row) => {
        //       const record = state.listData?.cornerSleeveOver?.find(
        //         (clamp) => clamp._id === row?.type
        //       );
        //       return { item: record, count: row.count };
        //     });

        //   cornerGlassToGlassArray =
        //     estimateData?.config?.cornerClamps?.glassToGlass?.map((row) => {
        //       const record = state.listData?.cornerGlassToGlass?.find(
        //         (clamp) => clamp._id === row?.type
        //       );
        //       return { item: record, count: row.count };
        //     });

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
      state.content = {
        ...state.content,
        hardwareFinishes: hardwareFinishes,
        handles: {
          ...state.handles,
          item: handleType,
          count: estimateData?.config?.handles?.count,
        },
        doorLock: {
          ...state.doorLock,
          item: doorLockType,
          count: estimateData?.config?.type?.count,
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

        //   mountingClamps: {
        //     wallClamp: [...wallClampArray],
        //     sleeveOver: [...sleeveOverArray],
        //     glassToGlass: [...glassToGlassArray],
        //   },
        //   cornerClamps: {
        //     cornerWallClamp: [...cornerWallClampArray],
        //     cornerSleeveOver: [...cornerSleeveOverArray],
        //     cornerGlassToGlass: [...cornerGlassToGlassArray],
        //   },
        mountingChannel: {
          item: channelItem || null,
          count: channelItem ? 1 : 0,
        },
        mountingState:
          // wallClampArray?.length ||
          // sleeveOverArray?.length ||
          // glassToGlassArray?.length
          //   ? "clamps"
          //   :
          "channel",
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
      state.doorWidth = estimateData?.config?.doorWidth || 0;
    },

    resetWineCellarState: (state) => {
      return {
        ...initialState,
      };
    },
  },
});
export const {
  setWineCellarProjectId,
  resetNotificationsWineCaller,
  resetWineCellarState,
  setisCustomWineDoorWidth,
  setWineDoorWidth,
  addSelectedWineItem,
  setWineQuoteState,
  updateWineMeasurements,
  setWineUserProfitPercentage,
  setWineLayoutArea,
  setWineLayoutPerimeter,
  setWineDoorWeight,
  setWinePanelWeight,
  setWineReturnWeight,
  setWineMultipleNotifications,
  setWineHardwareFabricationQuantity,
  initializeStateForCreateWineQuote,
  initializeStateForEditWineQuote,
} = wineCellarSlice.actions;

export default wineCellarSlice.reducer;
